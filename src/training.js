import {GROUP_LABELS,isLiveSite,makePayload,sendInterest} from './training-form.js';
// Carry only campaign attribution to class-interest links; never names, emails, or form values.
const campaign=new URLSearchParams(location.search);
for(const anchor of document.querySelectorAll('a[href]')){
  const dest=new URL(anchor.href,location.href);
  if(dest.origin===location.origin && dest.pathname.startsWith('/ai-training/')){
    for(const key of ['utm_source','utm_medium','utm_campaign','ref']) if(campaign.has(key))dest.searchParams.set(key,campaign.get(key).slice(0,120));
    anchor.href=dest.pathname+dest.search+dest.hash;
  }
}
for(const button of document.querySelectorAll('[data-copy]'))button.addEventListener('click',async()=>{
  const content=document.getElementById(button.dataset.copy);
  const status=button.parentElement.querySelector('[data-copy-status]');
  try{await navigator.clipboard.writeText(content.textContent);status.textContent='Copied. Paste into an AI tool you are allowed to use.';}
  catch{status.textContent='Select the prompt text and copy it manually.';}
});
for(const button of document.querySelectorAll('[data-print]'))button.addEventListener('click',()=>{
  const items=[...document.querySelectorAll('details')];
  const opened=items.map(d=>d.open);
  items.forEach(d=>d.open=true);
  const restore=()=>{items.forEach((d,i)=>d.open=opened[i]);window.removeEventListener('afterprint',restore);};
  window.addEventListener('afterprint',restore);window.print();
});
const form=document.getElementById('training-interest');
if(form){
  const live=isLiveSite(location),notice=document.getElementById('preview-note'),button=form.querySelector('[type=submit]'),status=document.getElementById('interest-status');
  notice.hidden=live;
  button.disabled=false;
  button.textContent=live?'Join the interest list':'Try the interest form';
  const group=campaign.get('group');if(GROUP_LABELS[group])form.elements.group.value=group;
  let sending=false,submitted=false;
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(sending||submitted||!form.reportValidity())return;
    status.textContent='';status.dataset.state='';
    try{
      const payload=makePayload(Object.fromEntries(new FormData(form)),location.search,location.pathname);
      if(!live){status.textContent=`Preview complete. You chose ${GROUP_LABELS[form.elements.group.value]}. Nothing was sent or saved. On the live site, this request will go to LifeQuest AI for group matching.`;status.dataset.state='preview';status.focus();return;}
      sending=true;button.disabled=true;button.textContent='Sending…';
      const result=await sendInterest(form.action,payload);
      if(result.duplicate){
        status.textContent='A recent request from this email is already on file. This new request was not saved. If you were changing your details, wait at least two minutes and try again.';
      }else{
        status.textContent='Your class interest was received. We’ll use your details to match a group of 10 people with similar needs, then contact you about the date, format, and price. No seat is reserved and no payment is due.';
        submitted=true;button.textContent='Interest received';
      }
      status.dataset.state='success';
    }catch(error){status.textContent=error.name==='TimeoutError'?'We could not confirm receipt in time. Please try again, or use the contact page.':error.message||'We could not confirm receipt. Please try again.';status.dataset.state='error';}
    finally{sending=false;button.disabled=submitted;if(!submitted)button.textContent=live?'Join the interest list':'Try the interest form';status.focus();}
  });
}

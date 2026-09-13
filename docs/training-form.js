export const GROUP_LABELS = {
  'small-business':'Small businesses & solopreneurs',
  'insurance-accounting':'Insurance & accounting professionals',
  educators:'Educators & learning teams',nonprofits:'Nonprofits & community organizations',
  other:'Another field / match requested'
};
export function isLiveSite(location){return location.protocol==='https:' && ['lifequestai.com','www.lifequestai.com'].includes(location.hostname);}
export function makePayload(values, search='', pathname='/ai-training/join/'){
  if(!GROUP_LABELS[values.group]) throw new Error('Choose a learning group.');
  if(!values.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((values.email||'').trim())) throw new Error('Please enter your name and a valid email.');
  if(!values.role?.trim() || (values.goal||'').trim().length<10) throw new Error('Tell us your role and a little more about the task you want to improve.');
  if(values.company?.trim()) throw new Error('We could not validate this request. Please reload the page or use the contact page.');
  if(!values.consent) throw new Error('Please confirm that we may contact you about a class.');
  const clean=(v,max)=>String(v||'').replace(/[\r\n]+/g,' ').trim().slice(0,max);
  const params=new URLSearchParams(search);
  const source=['utm_source','utm_medium','utm_campaign','ref','topic'].filter(k=>params.has(k)).map(k=>`${k}: ${clean(params.get(k),120)}`).join('; ');
  return {name:clean(values.name,120),email:clean(values.email,200),company:clean(values.company,200),
    topic:`October 2026 class interest: ${GROUP_LABELS[values.group]}`.slice(0,120),
    message:[`Learning group: ${GROUP_LABELS[values.group]}`,`Role / specialty: ${clean(values.role,120)}`,`Organization: ${clean(values.organization,160)||'Not provided'}`,`Task / goal: ${clean(values.goal,1200)}`,`Format preference: ${clean(values.format,60)}`,`Potential team size (unconfirmed): ${clean(values.team,20)}`,`Location / time zone / availability: ${clean(values.availability,300)||'Not provided'}`,'Permission: contact me about matching a class and confirming details. Interest only; no registration or newsletter signup.',source?`Source: ${source}`:'Source: direct / not specified'].join('\n'),page:pathname.slice(0,300)};
}
export async function sendInterest(endpoint,payload,fetcher=fetch){
  const response=await fetcher(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
  let data;try{data=await response.json();}catch{throw new Error('We could not confirm receipt. Please try again, or use the contact page.');}
  if(!response.ok || !data.ok) throw new Error(response.status===422?'Please check your details and try again.':'Your request was not confirmed. Please try again, or use the contact page.');
  return {duplicate:!!data.duplicate};
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {makePayload,sendInterest,isLiveSite} from '../src/training-form.mjs';
import worker from '../worker/worker.js';
const values={name:'Sample Learner',email:'sample@example.com',group:'insurance-accounting',role:'Accountant',organization:'Example practice',goal:'Draft a fictional client document reminder',format:'Live online',team:'10+',availability:'Eastern time, weekday evenings',consent:'on',company:''};
const endpoint='https://lifequest-forms.jrnewsome.workers.dev/contact';
function fakeDB({duplicate=false,fail=false}={}){
 const inserted=[];
 return {inserted,prepare(sql){return{bind(...args){return{async first(){return duplicate?{id:1}:null;},async run(){if(fail)throw new Error('DB unavailable');inserted.push(args);}};}};}};
}
function transport(DB){return async(url,init)=>worker.fetch(new Request(url,{...init,headers:{...init.headers,Origin:'https://lifequestai.com'}}),{DB});}
test('local and arbitrary hosting cannot send through the live UI path',()=>{
 for(const value of ['http://localhost:8080','http://127.0.0.1:8080','https://preview.example.com','https://lifequestai.com.example.com','http://lifequestai.com'])assert.equal(isLiveSite(new URL(value)),false);
 assert.equal(isLiveSite(new URL('https://lifequestai.com/ai-training/join/')),true);
 assert.equal(isLiveSite(new URL('https://www.lifequestai.com/ai-training/join/')),true);
});
test('group, work goals, permission, and campaign survive the existing worker contract',async()=>{
 const db=fakeDB();const payload=makePayload(values,'?utm_source=x&utm_campaign=october-2026&email=private@example.com');
 assert.equal(payload.company,'');assert.ok(payload.message.includes('Organization: Example practice'));assert.ok(payload.message.includes('Potential team size (unconfirmed): 10+'));
 assert.ok(payload.message.includes('utm_source: x'));assert.ok(!payload.message.includes('private@example.com'));
 assert.equal(payload.topic,'October 2026 class interest: Insurance & accounting professionals');
 assert.deepEqual(await sendInterest(endpoint,payload,transport(db)),{duplicate:false});
 assert.equal(db.inserted.length,1);assert.equal(db.inserted[0][0],'contact');assert.equal(db.inserted[0][5],payload.message);
});
test('duplicate is distinct from a newly saved record',async()=>{
 const db=fakeDB({duplicate:true});assert.deepEqual(await sendInterest(endpoint,makePayload(values),transport(db)),{duplicate:true});assert.equal(db.inserted.length,0);
});
test('failed database write never reports success',async()=>{
 const db=fakeDB({fail:true});await assert.rejects(sendInterest(endpoint,makePayload(values),transport(db)),/not confirmed/);assert.equal(db.inserted.length,0);
});
test('missing permission, bad group, missing goal and invalid email are rejected',()=>{
 for(const patch of [{consent:''},{group:'unknown'},{goal:'short'},{email:'not-an-email'}])assert.throws(()=>makePayload({...values,...patch}));
});
test('bounded user fields remain within the worker limits',()=>{
 const p=makePayload({...values,name:'N'.repeat(300),goal:'G'.repeat(10000),organization:'O'.repeat(1000),availability:'A'.repeat(1000)},'?utm_campaign='+ 'C'.repeat(1000));
 assert.ok(p.name.length<=120);assert.ok(p.topic.length<=120);assert.ok(p.message.length<=5000);assert.ok(p.page.length<=300);
});
test('validation, malformed response, and network error never become a receipt',async()=>{
 await assert.rejects(sendInterest(endpoint,makePayload(values),async()=>new Response(JSON.stringify({ok:false}),{status:422})),/check your details/);
 await assert.rejects(sendInterest(endpoint,makePayload(values),async()=>new Response('not-json')),/could not confirm/);
 await assert.rejects(sendInterest(endpoint,makePayload(values),async()=>{throw new Error('offline');}),/offline/);
});

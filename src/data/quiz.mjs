/* Assessment questions. Each option's `v` adds points to learning tracks;
   `lvl` estimates how far along the learner already is (0 = new, 3 = advanced). */

const QUIZ = [
  {q:'How often do you currently use AI?', k:'freq', opts:[
    {t:'Never — I’m just getting curious', v:{me:1,families:1}, lvl:0},
    {t:'Occasionally, for simple questions', v:{me:2,work:1}, lvl:1},
    {t:'Most weeks, for real work', v:{work:2,'small-business':1}, lvl:2},
    {t:'Daily — I’m ready to automate', v:{work:2,'small-business':2}, lvl:3}
  ]},
  {q:'Where would AI help you most?', k:'where', multi:true, opts:[
    {t:'My personal life and productivity', v:{me:3}},
    {t:'My family and household', v:{families:3}},
    {t:'My career and workplace', v:{work:3}},
    {t:'My business or side venture', v:{'small-business':3}},
    {t:'A nonprofit or community organization', v:{nonprofits:3}}
  ]},
  {q:'Which tools do you already use?', k:'tools', multi:true, opts:[
    {t:'ChatGPT, Claude, or Gemini', v:{}, lvl:1},
    {t:'Microsoft 365 or Google Workspace', v:{work:1}, lvl:1},
    {t:'A CRM, spreadsheets, or a database', v:{'small-business':1}, lvl:2},
    {t:'Zapier, Make, or other automation tools', v:{'small-business':1,work:1}, lvl:3},
    {t:'None of these yet', v:{families:1}, lvl:0}
  ]},
  {q:'What would you most like AI to help you accomplish?', k:'goal', opts:[
    {t:'Understand AI well enough to start using it', v:{me:1,families:1}, lvl:0},
    {t:'Get time back on everyday tasks', v:{me:2,work:1}, lvl:1},
    {t:'Run my household or family life more smoothly', v:{families:3}, lvl:0},
    {t:'Make my organization measurably more effective', v:{'small-business':2,nonprofits:2}, lvl:2},
    {t:'Build automations and AI assistants that work for me', v:{work:2,'small-business':2}, lvl:3}
  ]}
];

export {QUIZ};

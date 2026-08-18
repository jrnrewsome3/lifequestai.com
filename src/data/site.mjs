/* LifeQuest AI — content data. Edit these files to change site content. */

const RESOURCES = [
  {type:'Guide', title:'The LifeQuest AI Tool Guide', desc:'A plain-language comparison of the major AI tools, updated as the landscape shifts. What each is best at, what it costs, and who should use it.', meta:'Updated monthly'},
  {type:'Template', title:'50 Prompts for Real Life', desc:'A starter prompt library organized by situation — work, home, money, learning, and decisions — ready to copy and adapt.', meta:'Free download'},
  {type:'Guide', title:'What Not to Share With AI', desc:'A short, practical privacy guide for individuals, families, and small organizations. Read it before you paste anything sensitive.', meta:'8 min read'},
  {type:'Article', title:'Why AI Gets Things Confidently Wrong', desc:'An honest explanation of hallucination, plus the two-minute verification habit that catches most of it.', meta:'6 min read'},
  {type:'Template', title:'Family AI Ground Rules', desc:'A fill-in-the-blank agreement households can adapt together, covering privacy, schoolwork, and honest use.', meta:'Free download'},
  {type:'Guide', title:'AI Opportunity Map Worksheet', desc:'The scoring worksheet from Class 07 — rank your organization’s processes by value and effort to find where to start.', meta:'For organizations'},
  {type:'Article', title:'Automation vs. Agent: What’s the Difference?', desc:'Where a workflow ends and agency begins, and how to tell which one your problem actually needs.', meta:'7 min read'},
  {type:'FAQ', title:'LifeQuest AI: Common Questions', desc:'Do I need to code? Which class first? Are these tools safe? Do I need paid subscriptions? Straight answers.', meta:'FAQ'},
  {type:'Guide', title:'Responsible AI at Work', desc:'A short internal-policy starter for small teams: disclosure, review, client data, and what stays human.', meta:'For organizations'}
];

const EVENTS = [
  {date:'Sep 9', day:'Wed', time:'12:00 PM ET', title:'Live Workshop: Prompting Clinic', desc:'Bring a prompt that is not working. We fix it live.', kind:'Workshop'},
  {date:'Sep 16', day:'Wed', time:'7:00 PM ET', title:'Family AI Night', desc:'A one-hour session designed for households to attend together.', kind:'Community'},
  {date:'Sep 23', day:'Wed', time:'12:00 PM ET', title:'Office Hours: Automation Lab', desc:'Open help session for learners building their first automation.', kind:'Office Hours'},
  {date:'Oct 1', day:'Thu', time:'1:00 PM ET', title:'Small Business AI Roundtable', desc:'Owners share what is actually working in their operations.', kind:'Roundtable'},
  {date:'Oct 8', day:'Thu', time:'12:00 PM ET', title:'Agent Build Session', desc:'Guided build session for the Class 10 capstone.', kind:'Lab'}
];

const NEWSLETTER_ISSUES = [
  {no:'Issue 24', title:'The five-minute meeting prep', teaser:'One prompt, your calendar, and a habit that makes you the most prepared person in the room.'},
  {no:'Issue 23', title:'Stop starting over', teaser:'Why your second prompt should almost never be a rewrite of your first — plus the five follow-ups that fix most answers.'},
  {no:'Issue 22', title:'A spreadsheet, a statement, and an afternoon', teaser:'How one learner found $214 a month in forgotten subscriptions.'}
];

const TESTIMONIALS = [
  {quote:'I came in able to use ChatGPT for maybe one thing. By the end of the automation class I had a workflow that handles my weekly reporting on its own. The progression is what made it stick — nothing ever felt like a leap.',
   name:'Sample Persona — Working Professional', role:'Illustrative testimonial for prototype', initials:'WP'},
  {quote:'We are a team of four doing the work of ten. The opportunity map alone changed how we spend our week. We stopped experimenting randomly and started fixing the three processes that were actually costing us money.',
   name:'Sample Persona — Small Business Owner', role:'Illustrative testimonial for prototype', initials:'SB'},
  {quote:'My mother and my fifteen-year-old took the family class with me. That has never happened with any technology before. We came out with actual household rules instead of everybody guessing.',
   name:'Sample Persona — Family & Community Learner', role:'Illustrative testimonial for prototype', initials:'FC'}
];

const OUTCOMES = [
  {icon:'clock', title:'Save Time', desc:'Use AI to eliminate repetitive work and simplify everyday tasks.', tone:''},
  {icon:'compass', title:'Make Better Decisions', desc:'Turn information into useful insights, comparisons, and action plans.', tone:'teal'},
  {icon:'message', title:'Communicate Better', desc:'Create stronger emails, documents, presentations, and ideas.', tone:''},
  {icon:'layers', title:'Organize Your Life', desc:'Use AI for planning, research, learning, finances, projects, and family needs.', tone:'teal'},
  {icon:'zap', title:'Automate Your Work', desc:'Connect AI with the tools you already use and automate repeatable processes.', tone:'amber'},
  {icon:'bot', title:'Build AI Assistants', desc:'Progress toward personalized assistants and agents capable of helping manage real responsibilities.', tone:'amber'}
];

const JOURNEY = [
  {k:'CONNECT', d:'Discover what AI can do and identify opportunities in your life or organization.', pts:['Take the starting-point assessment','Map where your time actually goes','Choose your learning path']},
  {k:'LEARN', d:'Develop practical skills through short, understandable lessons.', pts:['Plain-language classes','No coding required','Learn at your own pace']},
  {k:'APPLY', d:'Use those skills on real projects, workflows, problems, and decisions.', pts:['Hands-on labs','Your own real work as the assignment','Something finished every week']},
  {k:'ELEVATE', d:'Build automation, assistants, and increasingly advanced AI systems.', pts:['Workflows that run without you','A Chief of Staff system','Your first working agent']}
];

const METRICS = [
  {num:'Time', label:'TIME SAVED', desc:'Hours returned each week from work you no longer do by hand.'},
  {num:'Skills', label:'SKILLS DEVELOPED', desc:'Capabilities you can demonstrate, not modules you clicked through.'},
  {num:'Flows', label:'WORKFLOWS IMPROVED', desc:'Real processes at home or at work that now run better.'},
  {num:'Built', label:'SOLUTIONS BUILT', desc:'Assistants, automations, and agents you created and still use.'}
];

export {RESOURCES, EVENTS, NEWSLETTER_ISSUES, TESTIMONIALS, OUTCOMES, JOURNEY, METRICS};

const LADDER = ['AI Literacy','AI Assistance','AI Productivity','AI Workflows','AI Automation','AI Agents'];
export {LADDER};

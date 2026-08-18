/* LifeQuest AI — content data. Edit these files to change site content. */

const LABS = [
  {slug:'morning-brief', title:'Build Your AI Morning Brief', level:'Beginner', duration:'60 min', classId:3,
   desc:'Assemble a single daily brief that pulls together your calendar, priorities, and the two or three things you actually need to know before 9am.',
   deliverable:'A repeatable morning brief you receive or generate daily.', tools:['ChatGPT','Calendar']},
  {slug:'research-assistant', title:'Create a Personal Research Assistant', level:'Beginner', duration:'75 min', classId:3,
   desc:'Configure an assistant that researches a topic properly — gathering, comparing, citing, and summarizing into a one-page brief you can act on.',
   deliverable:'A research assistant plus a finished one-page brief.', tools:['Claude','ChatGPT']},
  {slug:'spending-analysis', title:'Analyze Your Monthly Spending', level:'Beginner', duration:'90 min', classId:6,
   desc:'Turn one month of anonymized transactions into a clear picture: categories, patterns, recurring costs, and three findings worth acting on.',
   deliverable:'A spending analysis and three documented findings.', tools:['ChatGPT','Spreadsheet']},
  {slug:'meeting-prep', title:'Build a Meeting Preparation Assistant', level:'Intermediate', duration:'90 min', classId:8,
   desc:'Create an assistant that prepares you before every meeting: who is attending, what happened last time, what is outstanding, and what you should ask.',
   deliverable:'An automated meeting-prep packet.', tools:['ChatGPT','Calendar','Email']},
  {slug:'newsletter-workflow', title:'Create an AI Newsletter Workflow', level:'Intermediate', duration:'2 hours', classId:7,
   desc:'Build the full pipeline for a recurring newsletter — source gathering, drafting, review, and scheduling — with a human approval step before anything sends.',
   deliverable:'A working newsletter workflow with approval.', tools:['Claude','Zapier','Email platform']},
  {slug:'family-planning', title:'Build a Family Planning Assistant', level:'Beginner', duration:'75 min', classId:5,
   desc:'Set up a shared assistant for meals, schedules, activities, and household logistics that the whole family can actually use.',
   deliverable:'A shared family planning assistant.', tools:['ChatGPT','Shared calendar']},
  {slug:'office-automation', title:'Automate a Repetitive Office Task', level:'Intermediate', duration:'2 hours', classId:9,
   desc:'Pick one genuinely tedious recurring task, map it, and automate it end to end — including error handling and a notification when something goes wrong.',
   deliverable:'One automation running in production.', tools:['Zapier or Make','Sheets','ChatGPT']},
  {slug:'chief-of-staff', title:'Build an AI Chief of Staff', level:'Intermediate', duration:'3 hours', classId:8,
   desc:'Stand up three modules of a Chief of Staff system — monitoring, preparation, and a daily briefing — and run them for a week.',
   deliverable:'Three live modules and a daily brief.', tools:['Claude','Zapier','Email','Calendar']},
  {slug:'knowledge-library', title:'Create a Knowledge Library', level:'Beginner', duration:'90 min', classId:7,
   desc:'Turn scattered documents, notes, and institutional knowledge into a searchable library your AI tools can reason over.',
   deliverable:'A working knowledge library with a query workflow.', tools:['Claude Projects','Google Drive or SharePoint']},
  {slug:'first-agent', title:'Build Your First AI Agent', level:'Advanced', duration:'4 hours', classId:10,
   desc:'Design and ship an agent with real tools, real data, real guardrails, and a human approval checkpoint on anything consequential.',
   deliverable:'A working agent or complete agent blueprint.', tools:['Agent platform','Zapier','Your data source']}
];

export {LABS};

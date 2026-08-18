/* LifeQuest AI — content data. Edit these files to change site content. */

const TRACKS = [
  {slug:'me', title:'AI for Me', short:'Personal', icon:'user',
   desc:'Personal productivity, learning, organization, and everyday life.',
   forWho:'Individuals who want AI to help them think, plan, write, learn, and get time back.',
   duration:'6–8 weeks at a relaxed pace', classIds:[1,2,3,4], labSlugs:['morning-brief','research-assistant','knowledge-library'],
   outcome:'A personal AI assistant, a reusable prompt library, and a daily brief that runs itself.'},
  {slug:'families', title:'AI for Families', short:'Families',icon:'home',
   desc:'Digital literacy and practical AI for households and multiple generations.',
   forWho:'Parents, grandparents, caregivers, and teens learning together.',
   duration:'5–7 weeks, designed for shared sessions', classIds:[1,2,5,6],
   labSlugs:['family-planning','spending-analysis','knowledge-library'],
   outcome:'A family planning assistant, safer AI habits across generations, and shared household workflows.'},
  {slug:'work', title:'AI for Work', short:'Work', icon:'briefcase',
   desc:'Productivity, communication, research, Microsoft 365, and workplace automation.',
   forWho:'Professionals, managers, and teams who want to work faster without cutting corners.',
   duration:'8–10 weeks alongside a full-time role', classIds:[2,4,8,9],
   labSlugs:['meeting-prep','office-automation','chief-of-staff'],
   outcome:'A meeting-prep assistant, one live automation, and a Chief of Staff blueprint for your role.'},
  {slug:'small-business', title:'AI for Small Business', short:'Business', icon:'store',
   desc:'Marketing, operations, customer service, automation, and decision support.',
   forWho:'Owners and operators of small teams who wear every hat.',
   duration:'8–10 weeks', classIds:[2,7,9,10],
   labSlugs:['newsletter-workflow','office-automation','first-agent'],
   outcome:'A prioritized AI opportunity map, two automated workflows, and your first working agent.'},
  {slug:'nonprofits', title:'AI for Nonprofits & Communities', short:'Nonprofit', icon:'heart',
   desc:'AI adoption, communications, fundraising support, program development, and community impact.',
   forWho:'Nonprofit staff, volunteers, faith and community leaders, and civic groups.',
   duration:'7–9 weeks, team-friendly', classIds:[1,2,7,9],
   labSlugs:['newsletter-workflow','research-assistant','knowledge-library'],
   outcome:'A communications workflow, a grant-research assistant, and a shared organizational knowledge library.'}
];

export {TRACKS};

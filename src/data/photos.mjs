/* Photography — free-license Unsplash photos. */

const U = 'https://images.unsplash.com/photo-';
const PHOTOS = {
  hero:            {id:'1758270705518-b61b40527e76', alt:'A group of adult learners gathered around a laptop together'},
  'ai-made-simple':{id:'1623679681421-6db68b92d5f5', alt:'An older adult working at a laptop in a bright office'},
  'prompting-for-real-life':{id:'1758874573150-05c1b6b56407', alt:'Close-up of hands typing on a laptop keyboard'},
  'your-ai-personal-assistant':{id:'1758876020200-1e19cddaf656', alt:'A person taking notes beside a laptop at a tidy desk'},
  'ai-for-everyday-productivity':{id:'1758598304540-1ac6fd7d477b', alt:'A professional working intently at a laptop at her desk'},
  'ai-for-family-and-personal-life':{id:'1629360021730-3d258452c425', alt:'A family sitting together at a table with a laptop'},
  'ai-for-financial-empowerment':{id:'1772588627327-1eeddcf73c11', alt:'Hands reviewing financial paperwork beside a calculator'},
  'ai-for-small-business-and-nonprofits':{id:'1555953348-ab36203d4cad', alt:'A shop owner preparing an order behind his café counter'},
  'build-your-ai-chief-of-staff':{id:'1653669486397-b802144ae64a', alt:'A professional standing at a desk with a notebook and laptop'},
  'ai-automation-lab':{id:'1743385779347-1549dabf1320', alt:'A hand-drawn workflow diagram on paper at a desk'},
  'build-your-first-ai-agent':{id:'1749044122857-38a33c7aaaee', alt:'A person working at a desk with dual monitors and dashboards'},
  me:              {id:'1664575198308-3959904fa430', alt:'A woman working alone at a laptop beside a sunny window'},
  families:        {id:'1758598738092-a7cd486baadd', alt:'A parent and child looking at a laptop together'},
  work:            {id:'1517048676732-d65bc937f952', alt:'A small team collaborating around a meeting table'},
  'small-business':{id:'1757691918960-e1ff33f70e3e', alt:'Staff working behind the counter of a small shop'},
  nonprofits:      {id:'1529209076408-5a115ec9f1c6', alt:'A community group gathered around a table for a meeting'}
};
function photoUrl(key,w,h){
  const p = PHOTOS[key];
  if(!p) return null;
  return U + p.id + '?w=' + w + '&h=' + h + '&fit=crop&crop=entropy&auto=format&q=68&fm=jpg';
}
function photoAlt(key){ return (PHOTOS[key]||{}).alt || ''; }
export {PHOTOS, photoUrl, photoAlt};

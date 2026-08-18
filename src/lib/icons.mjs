/* Inline SVG icon set. */

const I = (n,s=20)=>{
  const p={
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    message:'<path d="M21 12a8 8 0 01-8 8H8l-5 3 1.2-4.2A8 8 0 1121 12z"/>',
    layers:'<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    zap:'<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/>',
    bot:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 5V8M9 14h.01M15 14h.01M9 17h6"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    chev:'<path d="M6 9l6 6 6-6"/>',
    x:'<path d="M6 6l12 12M18 6L6 18"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    home:'<path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z"/>',
    briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 12h18"/>',
    store:'<path d="M4 9h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1z"/><path d="M3 9l2-5h14l2 5"/><path d="M9 20v-6h6v6"/>',
    heart:'<path d="M12 20s-7-4.5-7-9.5A3.9 3.9 0 0112 8a3.9 3.9 0 017 2.5C19 15.5 12 20 12 20z"/>',
    book:'<path d="M4 5a2 2 0 012-2h13v18H6a2 2 0 01-2-2z"/><path d="M9 3v18"/>',
    flask:'<path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 001.3 2h11.4A1.5 1.5 0 0019 19l-5-10V3"/><path d="M7.5 14h9"/>',
    check:'<path d="M20 6L9 17l-5-5"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    file:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/>',
    play:'<circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3z"/>',
    grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    trend:'<path d="M4 17l6-6 4 4 6-7"/><path d="M20 8h-4M20 8v4"/>',
    shield:'<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'
  };
  return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(p[n]||'')+'</svg>';
};

const MARK = `<svg class="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
  <rect width="40" height="40" rx="11" fill="url(#lqg)"/>
  <path d="M11 27.5V12.5" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M11 27.5h8.4" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="26" cy="15.5" r="4.6" stroke="#fff" stroke-width="2.4"/>
  <path d="M29.4 19.2L32 22" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
  <defs><linearGradient id="lqg" x1="0" y1="0" x2="40" y2="40">
    <stop stop-color="#1F6FB2"/><stop offset="1" stop-color="#2C8F86"/></linearGradient></defs>
</svg>`;


export {I, MARK};

const fs = require('fs');

// 1. Fix FormCheckScreen (Target/Push icon)
const file1 = 'src/pages/FormCheckScreen.jsx';
if (fs.existsSync(file1)) {
  let content = fs.readFileSync(file1, 'utf8');
  const svg1 = `
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>`;
  const regex1 = /(background:\s*'linear-gradient\(135deg,\s*#FFF5F0\s*0%,\s*#FFEEDD\s*100%\)',[\s\S]*?)>\s*<\/div>/;
  if (regex1.test(content)) {
    content = content.replace(regex1, `$1>${svg1}\n  </div>`);
    fs.writeFileSync(file1, content, 'utf8');
    console.log('Fixed FormCheck icon!');
  }
}

// 2. Fix TodaysPlanScreen (Trophy icon)
const file2 = 'src/pages/TodaysPlanScreen.jsx';
if (fs.existsSync(file2)) {
  let content = fs.readFileSync(file2, 'utf8');
  const svg2 = `
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"></path>
      <path d="M12 2v12.66"></path>
      <path d="M12 7H7.5a2.5 2.5 0 1 1 0-5H12V7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 1 0 0-5H12V7z"></path>
    </svg>`;
  // The trophy SVGs are sometimes complex, let's use a simpler one.
  const svg2Simple = `
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"></path>
      <path d="M12 2v12.66"></path>
    </svg>`;
    // Actually let's use a standard Trophy
    const svgTrophy = `
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"></path>
      <path d="M12 2v12.66"></path>
    </svg>`;
    
    // Better Trophy SVG
    const svgBestTrophy = `
    <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8"></path>
      <path d="M12 17v4"></path>
      <path d="M7 4h10"></path>
      <path d="M17 4v8a5 5 0 0 1-10 0V4"></path>
      <path d="M15 9h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"></path>
      <path d="M9 9H5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1"></path>
    </svg>`;

  const regex2 = /(background:\s*'linear-gradient\(135deg,\s*#22C55E\s*0%,\s*#16A34A\s*100%\)',[\s\S]*?)>\s*<\/div>/;
  if (regex2.test(content)) {
    content = content.replace(regex2, `$1>${svgBestTrophy}\n  </div>`);
    fs.writeFileSync(file2, content, 'utf8');
    console.log('Fixed TodaysPlan icon!');
  }
}

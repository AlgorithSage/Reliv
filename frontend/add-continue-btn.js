const fs = require('fs');
const file = 'src/pages/ReturnExpiredScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add the "Continue with Existing Plan" button
// We'll insert it after the "Try a Different Plan" button
const searchBtn = `    Try a Different Plan
  </MaterialButton>`;

const newBtn = `    Try a Different Plan
  </MaterialButton>

  <MaterialButton
  onClick={() => navigate('/return-active')}
  style={{
    width: '100%',
    color: '#F06922',
    borderRadius: 14,
    padding: '16px',
    fontSize: 15,
    fontWeight: 600,
  }}
  >
    Continue with Existing Plan
  </MaterialButton>`;

if (content.includes(searchBtn)) {
    content = content.replace(searchBtn, newBtn);
    console.log("Button added successfully!");
}

// 2. Proactively replace the ⏰ emoji with a nice SVG Clock icon
const clockSvg = `
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#F06922" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
      <path d="M16.5 2.1l1.5 1.5"></path>
      <path d="M7.5 2.1l-1.5 1.5"></path>
    </svg>`;

const clockRegex = /<div style={{[\s\S]*?fontSize: 50,[\s\S]*?}}>\s*⏰\s*<\/div>/;
if (clockRegex.test(content)) {
    content = content.replace(clockRegex, (match) => {
        return match.replace('⏰', clockSvg);
    });
    console.log("Clock icon updated!");
}

fs.writeFileSync(file, content);
console.log("File updated.");

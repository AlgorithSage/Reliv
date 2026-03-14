const fs = require('fs');
const path = require('path');
const file = 'src/pages/ReturnActiveScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

const svg = `
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <polyline points="17 11 19 13 23 9"></polyline>
    </svg>`;

// Use a more flexible regex that ignores exact whitespace/tabs
const regex = /(background:\s*'linear-gradient\(135deg,\s*#22C55E\s*0%,\s*#16A34A\s*100%\)',[\s\S]*?)>\s*<\/div>/;

if (regex.test(content)) {
  content = content.replace(regex, `$1>${svg}\n  </div>`);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed Welcome Back icon!');
} else {
  console.log('Could not find the target code.');
}

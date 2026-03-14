const fs = require('fs');
const path = require('path');
const file = 'src/pages/ReturningPayScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

const svg = `
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path>
      <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path>
      <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
    </svg>`;

const regex = /(background:\s*'linear-gradient\(135deg,\s*#F06922\s*0%,\s*#E85C25\s*100%\)',[\s\S]*?)>\s*<\/div>/;

if (regex.test(content)) {
  content = content.replace(regex, `$1>${svg}\n  </div>`);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed Returning Pay icon!');
} else {
  console.log('Could not find the target code.');
}

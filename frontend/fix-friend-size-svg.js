const fs = require('fs');
const file = 'src/pages/FriendSizeScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

const svg = `
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`;

const regex = /(background:\s*'linear-gradient\(135deg,\s*#8B5CF6\s*0%,\s*#7C3AED\s*100%\)',[\s\S]*?)>\s*<\/div>/;

if (regex.test(content)) {
    content = content.replace(regex, `$1>${svg}\n  </div>`);
    fs.writeFileSync(file, content);
    console.log("FriendSizeScreen icon added!");
} else {
    console.log("Could not find container in FriendSizeScreen");
}

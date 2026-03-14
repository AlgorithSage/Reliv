const fs = require('fs');
const file = 'src/pages/ReturnDailyAgainScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

// Use a regex that is very loose on whitespace
const regex = /<MaterialButton\s+onClick=\{\(\)\s*=>\s*navigate\('\/group-type'\)\}\s+style=\{\{\s*width:\s*'100%',\s*background:\s*'#FAFAF8',\s*border:\s*'none',\s*borderRadius:\s*14,\s*padding:\s*'16px',\s*fontSize:\s*15,\s*fontWeight:\s*600,\s*color:\s*'#666',\s*cursor:\s*'pointer',\s*\}\}\s*>\s*Switch to Weekly Plan\s*<\/MaterialButton>/;

const replacement = `  <MaterialButton
  onClick={() => navigate('/group-type')}
  style={{
    width: '100%',
    color: '#F06922',
    borderRadius: 14,
    padding: '16px',
    fontSize: 15,
    fontWeight: 600,
  }}
  >
    Switch to Weekly Plan
  </MaterialButton>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log("Success!");
} else {
    // Attempt fallback - just find Switch to Weekly Plan button
    const fallbackRegex = /<MaterialButton[^>]*>\s*Switch to Weekly Plan\s*<\/MaterialButton>/;
    if (fallbackRegex.test(content)) {
        content = content.replace(fallbackRegex, replacement);
        console.log("Fallback Success!");
    } else {
        console.log("Both failed");
    }
}

// Also fix the stray icon
content = content.replace(/<div style=\{\{\s*display:\s*'grid',\s*gap:\s*14\s*\}\}><Icon name="calendar" size=\{18\}\s*\/>/g, '<div style={{ display: "grid", gap: 14 }}>');

fs.writeFileSync(file, content);

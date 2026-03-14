const fs = require('fs');
const file = 'src/pages/ReturnDailyAgainScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove stray calendar icon
content = content.replace(/<div style={{ display: 'grid', gap: 14 }}><Icon name="calendar" size={18} \/>/g, '<div style={{ display: "grid", gap: 14 }}>');

// 2. Fix the "Switch to Weekly Plan" button
const searchStr = `  <MaterialButton
  onClick={() => navigate('/group-type')}
  style={{
  width: '100%',
  background: '#FAFAF8',
  border: 'none',
  borderRadius: 14,
  padding: '16px',
  fontSize: 15,
  fontWeight: 600,
  color: '#666',
  cursor: 'pointer',
  }}
  >
  Switch to Weekly Plan
  </MaterialButton>`;

const replacementStr = `  <MaterialButton
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

if (content.indexOf(searchStr) !== -1) {
  content = content.replace(searchStr, replacementStr);
  console.log('Button replaced successfully');
} else {
  // Try a more flexible regex just in case
  const regex = /<MaterialButton\s*onClick={\(\) => navigate\('\/group-type'\)}\s*style={{[\s\S]*?color: '#666'[\s\S]*?}}>\s*Switch to Weekly Plan\s*<\/MaterialButton>/;
  if (regex.test(content)) {
     content = content.replace(regex, replacementStr);
     console.log('Button replaced via regex');
  } else {
     console.log('Button not found');
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('File updated');

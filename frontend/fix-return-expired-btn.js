const fs = require('fs');
const file = 'src/pages/ReturnExpiredScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `  <MaterialButton
  onClick={() => navigate('/change-plan')}
  style={{
    width: '100%',
    color: '#F06922',
    borderRadius: 14,
    padding: '16px',
    fontSize: 15,
    fontWeight: 600,
  }}
  >
    Try a Different Plan
  </MaterialButton>`;

const regex = /<MaterialButton[\s\S]*?Try a Different Plan[\s\S]*?<\/MaterialButton>/;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log("ReturnExpiredScreen fixed!");
} else {
    console.log("Could not find button in ReturnExpiredScreen");
}

const fs = require('fs');
const file = 'src/pages/ActivationScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

const target = `  <MaterialButton
  onClick={() => navigate('/')}
  style={{
  width: '100%',
  background: '#FAFAF8',
  border: 'none',
  borderRadius: 14,
  padding: '16px',
  fontSize: 15,
  fontWeight: 600,
  color: '#666666',
  cursor: 'pointer',
  }}
  >
  Back to Home
  </MaterialButton>`;

const replacement = `  <MaterialButton
  onClick={() => navigate('/')}
  style={{
    width: '100%',
    color: '#F06922',
    borderRadius: 14,
    padding: '16px',
    fontSize: 15,
    fontWeight: 600,
  }}
  >
    Back to Home
  </MaterialButton>`;

if (content.includes("Back to Home")) {
    // Just find the whole block starting from MaterialButton to /MaterialButton that contains "Back to Home"
    const regex = /<MaterialButton[\s\S]*?Back to Home[\s\S]*?<\/MaterialButton>/;
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log("ActivationScreen fixed definitively!");
} else {
    console.log("Back to Home text not found");
}

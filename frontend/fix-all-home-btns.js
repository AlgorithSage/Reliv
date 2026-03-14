const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/ActivationScreen.jsx',
  'src/pages/TrialUsedScreen.jsx',
  'src/pages/OTPFailScreen.jsx',
  'src/pages/WhatsAppPreviewScreen.jsx'
];

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
    {BTH_TEXT}
  </MaterialButton>`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check for "Back to Home" or "Got It! Back to Home"
    let text = "Back to Home";
    if (content.includes("Got It! Back to Home")) {
        text = "Got It! Back to Home";
    }

    const currentReplacement = replacement.replace("{BTH_TEXT}", text);
    
    // Loose regex to find the MaterialButton block containing the text
    const regex = new RegExp('<MaterialButton[\\s\\S]*?' + text + '[\\s\\S]*?<\\/MaterialButton>', 'g');
    
    if (regex.test(content)) {
        content = content.replace(regex, currentReplacement);
        fs.writeFileSync(file, content);
        console.log(`Fixed ${file}`);
    } else {
        console.log(`Could not find button in ${file}`);
    }
  }
});

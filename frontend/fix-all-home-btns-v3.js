const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/ActivationScreen.jsx',
  'src/pages/TrialUsedScreen.jsx',
  'src/pages/OTPFailScreen.jsx',
  'src/pages/WhatsAppPreviewScreen.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Determine the text to look for
    let text = "";
    if (content.includes("Got It! Back to Home")) {
        text = "Got It! Back to Home";
    } else if (content.includes("Back to Home")) {
        text = "Back to Home";
    }

    if (text) {
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
    ${text}
  </MaterialButton>`;

        // Escape regex special chars in the search text
        const safeText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp('<MaterialButton((?!<MaterialButton)[\\s\\S])*?' + safeText + '[\\s\\S]*?<\\/MaterialButton>');
        
        if (regex.test(content)) {
            content = content.replace(regex, replacement);
            fs.writeFileSync(file, content);
            console.log(`SUCCESS: Fixed ${file}`);
        } else {
            console.log(`FAILURE: Regex match failed in ${file}`);
        }
    } else {
        console.log(`SKIP: No "Back to Home" text found in ${file}`);
    }
  } else {
    console.log(`SKIP: ${file} does not exist`);
  }
});

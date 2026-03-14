const fs = require('fs');
const file = 'src/pages/ActivationScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

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

// Flexible regex for the Back to Home button
const regex = /<MaterialButton\s*onClick={\(\) => navigate\('\/'\)}\s*style={{[\s\S]*?color: '#666666'[\s\S]*?}}>\s*Back to Home\s*<\/MaterialButton>/;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log("ActivationScreen fixed!");
} else {
    // Try without the specific color if it failed
    const fallbackRegex = /<MaterialButton[^>]*>\s*Back to Home\s*<\/MaterialButton>/;
    if (fallbackRegex.test(content)) {
        content = content.replace(fallbackRegex, replacement);
        fs.writeFileSync(file, content);
        console.log("ActivationScreen fixed via fallback!");
    } else {
        console.log("Could not find button in ActivationScreen");
    }
}

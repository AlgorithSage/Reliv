const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, filesList);
    } else if (fullPath.endsWith('.jsx')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

const files = getFiles(srcDir);
let fixedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Skip the MaterialButton component itself
  if (path.basename(file) === 'MaterialButton.jsx') continue;

  // If file uses MaterialButton but doesn't import it
  if (content.includes('<MaterialButton') && !content.includes('import MaterialButton')) {
    
    // Calculate relative path to components/material/MaterialButton
    const dirLevel = file.replace(srcDir, '').split(/[\\\/]/).length - 2;
    // e.g. srcDir/pages/Screen.jsx -> file.replace(srcDir,'') = /pages/Screen.jsx -> split = ['', 'pages', 'Screen.jsx'] (length 3). dirLevel = 1. -> '../'
    
    let relativePath = '';
    if (dirLevel <= 0) {
      relativePath = './components/material/MaterialButton';
    } else {
      relativePath = '../'.repeat(dirLevel) + 'components/material/MaterialButton';
    }
    // Clean up paths for Layout which is in components/
    if (file.includes('components') && !file.includes('pages')) {
      // Special case for Layout.jsx inside components/
      if (path.basename(file) === 'Layout.jsx') {
        relativePath = './material/MaterialButton';
      }
    }

    const importStatement = `import MaterialButton from '${relativePath}';\n`;
    content = importStatement + content;
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Added import to: ${path.basename(file)}`);
    fixedCount++;
  }
}

console.log(`Fixed missing imports in ${fixedCount} files!`);

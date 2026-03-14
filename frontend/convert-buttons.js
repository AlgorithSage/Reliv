const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// A list of all JSX files
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
let changedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  // Check if file has instances of native `<button`
  // We exclude strings or comments, but for simplicity assuming clear JSX
  if (content.match(/<button[\s>]/) || content.match(/<\/button>/)) {
    
    // Replace <button to <MaterialButton
    content = content.replace(/<button([\s>])/g, '<MaterialButton$1');
    content = content.replace(/<\/button>/g, '</MaterialButton>');

    // Import MaterialButton
    if (!content.includes('MaterialButton')) {
      // Calculate relative path to components/material/MaterialButton
      const dirLevel = file.replace(srcDir, '').split(/[\\\/]/).length - 2;
      const relativePath = (dirLevel <= 0 ? './' : '../'.repeat(dirLevel)) + 'components/material/MaterialButton';
      
      // Attempt to inject at the top with other imports
      const importStatement = `import MaterialButton from '${relativePath}';\n`;
      if (content.startsWith('import')) {
        content = importStatement + content;
      } else {
        content = importStatement + content;
      }
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated: ${path.basename(file)}`);
      changedCount++;
    }
  }
}

console.log(`Successfully converted <button> tags to <MaterialButton> in ${changedCount} files!`);

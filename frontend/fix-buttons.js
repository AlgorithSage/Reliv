const fs = require('fs');
const glob = require('glob');
const path = require('path');

const pagesDir = path.join(__dirname, 'src/pages');
const componentsDir = path.join(__dirname, 'src/components');

// Helper to process a single file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // We want to wrap native <button> with our new <MaterialButton>
  // But wait, they might be deeply nested and have various props.
  // Instead, let's inject a global CSS class to buttons.
  
  // Actually, we can use regex to find `<button ... style={{...}}>`
  // and inject `className="global-premium-btn"` and `onMouseEnter` / `onMouseLeave`.
  
  // A simpler approach: Just add `className="premium-hover-btn"` to ALL buttons that don't have it.
  // And we will define .premium-hover-btn in index.css.
  
  // Find all <button> tags that don't have premium-hover-btn
  content = content.replace(/<button(?![^>]*premium-hover-btn)/g, (match) => {
    // If it already has className, append to it
    if (match.includes('className=')) {
      return match; // To avoid complex parsing of existing classNames via simple regex, we'll skip or handle safely
    }
    return match + ' className="premium-hover-btn"';
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
  }
}

// Find files
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walk(pagesDir);
walk(componentsDir);

console.log('Button sweep complete!');

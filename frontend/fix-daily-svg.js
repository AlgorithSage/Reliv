const fs = require('fs');
const file = 'src/pages/ReturnDailyAgainScreen.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetRegex = /boxShadow:\s*'0 12px 40px rgba\(245, 158, 11, 0\.3\)',\s*}}>\s*<\/div>/g;
const replacement = `boxShadow: '0 12px 40px rgba(245, 158, 11, 0.3)',
}}>
  <svg width="48" height="48" viewBox="0 0 24 24" fill="#FFFFFF" stroke="none">
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 01-1.06-1.06l1.59-1.591a.75.75 0 111.061 1.06l-1.59 1.591zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM5.106 6.166a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591z" />
  </svg>
</div>`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('SVG inserted successfully!');
} else {
  console.log('Could not find the target code to replace.');
}

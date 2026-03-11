const fs = require('fs');
const path = require('path');
const p = 'c:/Users/USER/Desktop/Reliv/frontend/src/pages';
const files = fs.readdirSync(p).filter(f => f.endsWith('.jsx'));
let out = '';
for(const f of files) {
  const content = fs.readFileSync(path.join(p, f), 'utf-8');
  // Match navigate('/path'...) or navigate(`/path`...)
  const navRegex = /navigate\(\s*['"`]([^'"`]+)['"`]/g;
  const navMatches = [...content.matchAll(navRegex)];
  if(navMatches.length > 0) {
    out += f + ':\n  ' + navMatches.map(m => m[1]).join('\n  ') + '\n\n';
  }
}
fs.writeFileSync('c:/Users/USER/Desktop/Reliv/frontend/routes_audit.txt', out, 'utf-8');
console.log('done');

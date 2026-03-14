const fs = require('fs');

function fixFile(file) {
  let c = fs.readFileSync(file, 'utf8');
  // It's the empty <div style={{...}}></div> before the h2 that has "Solo Plan", "Me + Partner", etc.
  
  // WeeklySoloPayScreen
  c = c.replace(
    /<div style={{\s*width: 72,\s*height: 72,\s*background: 'linear-gradient\(135deg, #F06922 0%, #E85C25 100%\)',\s*borderRadius: 20,\s*display: 'flex',\s*alignItems: 'center',\s*justifyContent: 'center',\s*fontSize: 36,\s*boxShadow: '8px 8px 20px rgba\(0,0,0,0\.15\), -6px -6px 16px rgba\(255,255,255,0\.4\), inset 0 1px 0 rgba\(255,255,255,0\.15\)',\s*}}>\s*<\/div>/g,
    `<div style={{
  width: 72,
  height: 72,
  background: 'linear-gradient(135deg, #F06922 0%, #E85C25 100%)',
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 36,
  boxShadow: '8px 8px 20px rgba(0,0,0,0.15), -6px -6px 16px rgba(255,255,255,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
}}>
  <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF" stroke="none"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
</div>`
  );
  
  fs.writeFileSync(file, c);
}

fixFile('src/pages/WeeklySoloPayScreen.jsx');
try { fixFile('src/pages/WeeklyCouplePayScreen.jsx'); } catch(e){}
try { fixFile('src/pages/WeeklyFriendsPayScreen.jsx'); } catch(e){}

console.log("SVGs injected!");

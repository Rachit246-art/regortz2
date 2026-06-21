const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'marketing', 'style.css');
let css = fs.readFileSync(cssPath, 'utf-8');

// Replace Root Variables
css = css.replace('--bg-dark: #020205;', '--bg-dark: #ffffff;');
css = css.replace('--bg-surface: #0a0a0f;', '--bg-surface: #f5f5f7;');
css = css.replace('--text-primary: #ffffff;', '--text-primary: #1d1d1f;');
css = css.replace('--text-secondary: #a0a0b0;', '--text-secondary: #515154;');
css = css.replace('--neon-purple: #B983FF;', '--neon-purple: #4CBB17;');
css = css.replace('--neon-blue: #94B3FD;', '--neon-blue: #70e000;');
css = css.replace('--glass-bg: rgba(255, 255, 255, 0.03);', '--glass-bg: rgba(0, 0, 0, 0.03);');
css = css.replace('--glass-border: rgba(255, 255, 255, 0.08);', '--glass-border: rgba(0, 0, 0, 0.08);');

// Replace specific RGBA for purple (185, 131, 255) -> green (76, 187, 23)
css = css.replace(/185,\s*131,\s*255/g, '76, 187, 23');

// Replace specific RGBA for blue (148, 179, 253) -> light green (112, 224, 0)
css = css.replace(/148,\s*179,\s*253/g, '112, 224, 0');

// Replace violet with dark green in button
css = css.replace(/#8A2BE2/gi, '#388E3C');

// Header scrolled background
css = css.replace('rgba(2, 2, 5, 0.85)', 'rgba(255, 255, 255, 0.85)');
css = css.replace('box-shadow: 0 10px 30px rgba(0,0,0,0.5);', 'box-shadow: 0 10px 30px rgba(0,0,0,0.1);');

// Button outline
css = css.replace('border: 1px solid rgba(255, 255, 255, 0.2);', 'border: 1px solid rgba(0, 0, 0, 0.2);');
css = css.replace('background: rgba(255, 255, 255, 0.05);', 'background: rgba(0, 0, 0, 0.05);');
css = css.replace('border-color: rgba(255, 255, 255, 0.4);', 'border-color: rgba(0, 0, 0, 0.4);');

// Various text color overrides in css
css = css.replace(/color:\s*white;/g, 'color: var(--text-primary);');

// Process visual background
css = css.replace('background: rgba(0,0,0,0.2);', 'background: rgba(0,0,0,0.05);');
css = css.replace('border: 1px solid rgba(255,255,255,0.05);', 'border: 1px solid rgba(0,0,0,0.05);');

// Form inputs
css = css.replace('background: rgba(255,255,255,0.03);', 'background: rgba(0,0,0,0.03);');
css = css.replace('background: rgba(255,255,255,0.08);', 'background: rgba(0,0,0,0.08);');
css = css.replace('border-top: 1px solid rgba(255,255,255,0.1);', 'border-top: 1px solid rgba(0,0,0,0.1);');

// Modal
css = css.replace('background: rgba(0,0,0,0.8);', 'background: rgba(255,255,255,0.8);');

fs.writeFileSync(cssPath, css);
console.log('Theme updated successfully.');

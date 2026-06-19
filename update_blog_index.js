const fs = require('fs');

const filePath = 'c:/Users/HP/OneDrive/Desktop/nss/web/blog/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replace relative paths for root-level files and directories
const rootReplacements = [
  { regex: /href="assets\//g, replace: 'href="../assets/' },
  { regex: /src="assets\//g, replace: 'src="../assets/' },
  { regex: /href="activities\//g, replace: 'href="../activities/' },
  { regex: /src="activities\//g, replace: 'src="../activities/' },
  { regex: /href="style\.css"/g, replace: 'href="../style.css"' },
  { regex: /href="index\.html/g, replace: 'href="../index.html' },
  { regex: /href="about\.html"/g, replace: 'href="../about.html"' },
  { regex: /href="gallery\.html"/g, replace: 'href="../gallery.html"' },
  { regex: /href="achievements\.html"/g, replace: 'href="../achievements.html"' },
  { regex: /href="news\.html"/g, replace: 'href="../news.html"' },
  { regex: /href="team\.html"/g, replace: 'href="../team.html"' },
  { regex: /href="volanteer\/volunteer\.html"/g, replace: 'href="../volanteer/volunteer.html"' },
  // Since it was updated to blog/index.html earlier, we need to fix it for blog/index.html itself
  // "blog/index.html" -> "index.html" (since we are in blog folder)
  { regex: /href="blog\/index\.html"/g, replace: 'href="index.html"' }
];

rootReplacements.forEach(r => {
  content = content.replace(r.regex, r.replace);
});

// Remove modal overlay HTML
// The modal starts with id="reading-modal" and ends before footer. We can use regex or string methods.
const modalStartStr = '<!-- Reading Modal Overlay (Hidden by Default) -->';
const footerStartStr = '<!-- Footer -->';
const modalStartIndex = content.indexOf(modalStartStr);
const footerStartIndex = content.indexOf(footerStartStr);

if (modalStartIndex !== -1 && footerStartIndex !== -1 && footerStartIndex > modalStartIndex) {
  content = content.slice(0, modalStartIndex) + content.slice(footerStartIndex);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed blog/index.html paths and removed modal.');

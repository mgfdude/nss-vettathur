const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/HP/OneDrive/Desktop/nss/web';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace ../blog/index.html with ../blog/index.html
  content = content.replace(/\.\.\/blogs\.html/g, '../blog/index.html');
  
  // Replace "blog/index.html" with "blog/index.html"
  content = content.replace(/"blogs\.html/g, '"blog/index.html');
  // Replace 'blog/index.html' with 'blog/index.html'
  content = content.replace(/'blogs\.html/g, "'blog/index.html");

  // Fix schema / absolute links
  content = content.replace(/techora\.in\/blogs\.html/g, 'techora.in/blog/index.html');

  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        walk(fullPath);
      }
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.json') || fullPath.endsWith('.xml')) {
      replaceInFile(fullPath);
    }
  }
}

walk(directory);
console.log('Links updated.');

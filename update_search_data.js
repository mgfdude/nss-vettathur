const fs = require('fs');

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const searchDataPath = 'c:/Users/HP/OneDrive/Desktop/nss/web/data/search-data/search-blogs.json';
let searchData = JSON.parse(fs.readFileSync(searchDataPath, 'utf8'));

searchData = searchData.map(item => {
  if (item.type === 'blog' && item.url === 'blog/index.html') {
    item.url = 'blog/' + generateSlug(item.title) + '.html';
  } else if (item.title === 'Environment Awareness' && item.url === 'blog/index.html') {
    item.url = 'blog/restoring-local-ecology-planting-native-trees-in-melattur.html';
  }
  return item;
});

fs.writeFileSync(searchDataPath, JSON.stringify(searchData, null, 2), 'utf8');
console.log('data/search-data/search-blogs.json updated');

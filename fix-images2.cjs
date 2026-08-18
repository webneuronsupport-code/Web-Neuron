const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src').filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('\\${import.meta.env.BASE_URL}')) {
    content = content.replace(/\\\$\{import\.meta\.env\.BASE_URL\}/g, '${import.meta.env.BASE_URL}');
    fs.writeFileSync(f, content);
    console.log('Fixed', f);
  }
});

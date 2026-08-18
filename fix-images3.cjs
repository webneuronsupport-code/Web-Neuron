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
  let changed = false;
  
  // Replace single-quoted property values: src: '/images/...' -> src: `${import.meta.env.BASE_URL}images/...`
  const regex = /(src|image|href)\s*:\s*'\/([^']+)'/g;
  if (regex.test(content)) {
    content = content.replace(regex, "$1: `${import.meta.env.BASE_URL}$2`");
    changed = true;
  }

  // Also catch double quoted ones if any
  const regex2 = /(src|image|href)\s*:\s*"\/([^"]+)"/g;
  if (regex2.test(content)) {
    content = content.replace(regex2, "$1: `${import.meta.env.BASE_URL}$2`");
    changed = true;
  }

  // Also catch <img src='/...' /> (single quotes in jsx attributes)
  const regex3 = /(src|href)='\/([^']+)'/g;
  if (regex3.test(content)) {
    content = content.replace(regex3, "$1={`\\${import.meta.env.BASE_URL}$2`}");
    changed = true;
  }

  if (changed) {
    // Need to do the fix-images2.cjs replacement just in case regex3 matched
    content = content.replace(/\\\$\{import\.meta\.env\.BASE_URL\}/g, '${import.meta.env.BASE_URL}');
    fs.writeFileSync(f, content);
    console.log('Fixed', f);
  }
});

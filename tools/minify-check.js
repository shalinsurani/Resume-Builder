const fs = require('fs');
const postcss = require('postcss');
const cssnano = require('cssnano');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node tools/minify-check.js <css-file>');
  process.exit(2);
}

const css = fs.readFileSync(file, 'utf8');

postcss([cssnano({ preset: 'default' })])
  .process(css, { from: file, to: 'out.css' })
  .then(result => {
    fs.writeFileSync('out.css', result.css);
    console.log('Minification succeeded, output written to out.css');
  })
  .catch(err => {
    console.error('Minification failed:');
    console.error(err && err.message ? err.message : err);
    console.error('Full error object:', err);
    if (err && err.name === 'CssSyntaxError') {
      console.error(`at ${err.file}:${err.line}:${err.column}`);
      try { console.error(err.showSourceCode()); } catch (e) {}
    }
    process.exit(1);
  });

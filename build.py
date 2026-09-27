"""Inline src/styles.css and src/app.js into a single index.html so it also works when opened from disk."""
import pathlib, re
root = pathlib.Path(__file__).parent
html = (root / 'src' / 'index.html').read_text(encoding='utf-8')
css = (root / 'src' / 'styles.css').read_text(encoding='utf-8')
js = (root / 'src' / 'app.js').read_text(encoding='utf-8')
html = html.replace('<!--STYLES-->', '<style>\n' + css + '\n</style>')
html = html.replace('<!--SCRIPT-->', '<script type="module">\n' + js + '\n</script>')
(root / 'index.html').write_text(html, encoding='utf-8')
bad = [c for c in html if c in '—–']
print('index.html', len(html) // 1024, 'KB | em/en dashes:', len(bad))

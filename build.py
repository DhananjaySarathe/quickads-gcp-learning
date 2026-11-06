"""Build the portable GitHub Pages site using only Python's standard library."""
from pathlib import Path
import shutil
import hashlib

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / 'docs'
OUTPUT.mkdir(exist_ok=True)
style_hash = hashlib.sha256((ROOT/'src/styles.css').read_bytes()).hexdigest()[:10]
head = '''<!doctype html>
<html lang="en" style="color-scheme:only light;background:#fff">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="theme-color" content="#eef3ff">
<meta name="description" content="Learn Google Cloud with a visual roadmap, step-by-step request animations, educational GIFs, and short practical lessons. Dhananjay’s QuickAds Cloud Lab.">
<title>QuickAds Cloud Lab · Learn by seeing and doing</title>
<link rel="stylesheet" href="./styles.css?v=STYLE_HASH">
</head>
<body>
'''.replace('STYLE_HASH', style_hash)
tail = '''
<script src="./data.js?v=DATA_HASH" defer></script>
<script src="./app.js?v=APP_HASH" defer></script>
</body>
</html>
'''.replace('DATA_HASH', hashlib.sha256((ROOT/'src/data.js').read_bytes()).hexdigest()[:10]).replace('APP_HASH', hashlib.sha256((ROOT/'src/app.js').read_bytes()).hexdigest()[:10])
(OUTPUT / 'index.html').write_text(head + (ROOT/'src/roadmap.html').read_text(encoding='utf-8') + tail, encoding='utf-8')
shutil.copyfile(ROOT/'src/styles.css', OUTPUT/'styles.css')
for name in ('data.js', 'app.js'):
    shutil.copyfile(ROOT/'src'/name, OUTPUT/name)
shutil.copytree(ROOT/'src/assets', OUTPUT/'assets', dirs_exist_ok=True)
(OUTPUT/'.nojekyll').write_text('', encoding='utf-8')
print('Built the standalone Cloud Lab in docs/ for GitHub Pages.')

"""Build the portable GitHub Pages site using only Python's standard library."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / 'docs'
OUTPUT.mkdir(exist_ok=True)
head = '''<!doctype html>
<html lang="en" style="color-scheme:only light;background:#f6f8fc">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="only light">
<meta name="theme-color" content="#f6f8fc">
<meta name="description" content="Dhananjay’s practical Google Cloud learning roadmap for working toward service ownership at QuickAds.">
<title>QuickAds GCP Learning Roadmap</title>
<link rel="stylesheet" href="./styles.css">
</head>
<body>
'''
tail = '''
<script src="https://unpkg.com/lucide@1.17.0/dist/umd/lucide.js" onload="lucide.createIcons({attrs:{width:20,height:20}})"></script>
</body>
</html>
'''
(OUTPUT / 'index.html').write_text(head + (ROOT/'src/roadmap.html').read_text(encoding='utf-8') + tail, encoding='utf-8')
shutil.copyfile(ROOT/'src/styles.css', OUTPUT/'styles.css')
(OUTPUT/'.nojekyll').write_text('', encoding='utf-8')
print('Built docs/index.html and docs/styles.css for GitHub Pages.')

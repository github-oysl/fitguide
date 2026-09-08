from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
files = [root / name for name in ('index.html', 'style.css', 'data.js', 'extra-data.js', 'training.js', 'guide.js', 'plans.js', 'checkin-stats.js', 'dashboard.js', '使用说明.txt', 'LICENSE', 'server.mjs', 'guidance-status.json', '.env.example', 'COMPARISON.md')]
for folder in ('assets', 'comparison', 'server', 'vendor'):
    files.extend(sorted((root / folder).rglob('*')))
files = [file for file in files if file.is_file()]
archive = root / 'gym-guide-offline.zip'
with ZipFile(archive, 'w', ZIP_DEFLATED) as bundle:
    for file in files:
        bundle.write(file, file.relative_to(root).as_posix())
with ZipFile(archive) as bundle:
    assert bundle.testzip() is None
    for file in files:
        assert bundle.read(file.relative_to(root).as_posix()) == file.read_bytes()
print(f'PASS: {len(files)} files bundled and verified against source; {archive.stat().st_size:,} bytes.')

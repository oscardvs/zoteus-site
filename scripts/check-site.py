"""Validate the static export, including local links, fragments, assets and page metadata."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import sys
import xml.etree.ElementTree as ET

root = Path(sys.argv[1] if len(sys.argv) > 1 else 'out').resolve()
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.links, self.assets = path, set(), [], []
        self.canonical, self.description, self.title, self.h1 = '', '', '', 0
        self.in_title, self.in_json, self.json_text, self.schemas = False, False, '', []
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.add(a['id'])
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag in ('script', 'img', 'source', 'video') and a.get('src'): self.assets.append(a['src'])
        if tag == 'video' and a.get('poster'): self.assets.append(a['poster'])
        if tag == 'link' and a.get('rel') == 'stylesheet': self.assets.append(a['href'])
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a['href']
        if tag == 'meta' and a.get('name') == 'description': self.description = a.get('content','')
        if tag == 'h1': self.h1 += 1
        if tag == 'title': self.in_title = True
        if tag == 'script' and a.get('type') == 'application/ld+json': self.in_json, self.json_text = True, ''
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_json: self.json_text += data
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.in_json:
            self.schemas.append(json.loads(self.json_text))
            self.in_json = False

pages = {p.resolve(): Page(p) for p in root.rglob('*.html')}
errors, checks, public = [], 0, []
for path, page in pages.items():
    rel = path.relative_to(root).as_posix()
    # Utility pages that are noindex and deliberately left out of the sitemap.
    if rel in ('404.html', '404/index.html', '_not-found/index.html', 'thanks/index.html'): continue
    if path.name != 'index.html': continue
    public.append(page)
    for requirement, valid in [('title', bool(page.title.strip())), ('description', bool(page.description)), ('one h1', page.h1 == 1), ('canonical', page.canonical.startswith('https://zoteus.com/') and page.canonical.endswith('/'))]:
        if not valid: errors.append(f'{rel}: missing/invalid {requirement}')
    for href in page.links + page.assets:
        u = urlsplit(href)
        if u.scheme or u.netloc: continue
        target = root / unquote(u.path.lstrip('/')) if u.path.startswith('/') else path.parent / unquote(u.path)
        if not u.path: target = path
        if target.is_dir(): target = target / 'index.html'
        if not target.exists():
            errors.append(f'{rel}: missing {href}')
        elif u.fragment and target.resolve() in pages and unquote(u.fragment) not in pages[target.resolve()].ids:
            errors.append(f'{rel}: missing fragment {href}')
        checks += 1
    if rel.startswith('docs/') and not any(x.get('@type') == 'TechArticle' for x in page.schemas): errors.append(f'{rel}: missing TechArticle')

for field in ('canonical', 'title'):
    values = [getattr(p,field) for p in public]
    if len(values) != len(set(values)): errors.append(f'Duplicate public {field}')
sitemap = ET.parse(root/'sitemap.xml')
urls = {x.text for x in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
for page in public:
    if page.canonical not in urls: errors.append(f'Missing sitemap URL: {page.canonical}')
print(f'Checked {len(public)} public pages, {checks} local links/assets, metadata, structured data and sitemap.')
if errors:
    print('\n'.join(sorted(set(errors))))
    sys.exit(1)
print('All checks passed.')

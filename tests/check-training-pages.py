from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
root=Path('docs')
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.ids=[];self.links=[];self.h1=0;self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='h1':self.h1+=1
        if tag in ('a','link','script','img'):
            value=a.get('href',a.get('src',''))
            if value:self.links.append(value)
pages={p:Page(p.read_text()) for p in root.rglob('*.html')}
targets=[root/'index.html',root/'resources/index.html',*root.glob('ai-training/**/index.html'),root/'resources/ai-starter-kit/index.html']
checked=0
for p in targets:
    page=pages[p]
    assert page.h1==1,(p,'one h1 required',page.h1)
    assert len(page.ids)==len(set(page.ids)),(p,'duplicate IDs')
    text=p.read_text()
    assert 'undefined' not in text and '__LQ_' not in text,p
    for link in page.links:
        u=urlsplit(link)
        if u.scheme or u.netloc:continue
        target=(root/unquote(u.path.lstrip('/'))) if u.path.startswith('/') else p.parent/unquote(u.path)
        if not u.path:target=p
        if target.is_dir():target=target/'index.html'
        assert target.exists(),(p,link,'missing destination')
        if u.fragment and target.suffix=='.html':assert unquote(u.fragment) in pages[target].ids,(p,link,'missing anchor')
        checked+=1
assert len(pages[root/'resources/ai-starter-kit/index.html'].ids)>=30
assert '25. Build an event checklist' in (root/'resources/ai-starter-kit/25-practice-prompts.txt').read_text()
for p in root.glob('ai-training/**/index.html'):
    t=p.read_text();assert 'October 2026' in t and '10' in t,p
print(f'PASS: {len(targets)} pages; {checked} internal links/assets; heading/ID integrity; 25-prompt download; cohort wording.')

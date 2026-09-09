#!/usr/bin/env python3
"""Generate print-ready workshop PDFs from the same content used by the website.

Requires reportlab and pypdf. Ordinary site builds use the checked-in PDFs.
"""
import hashlib
import json
import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src/workshop/toolkit.json"
OUT = ROOT / "output/pdf"
ASSETS = ROOT / "src/workshop/downloads"
OUT.mkdir(parents=True, exist_ok=True)
ASSETS.mkdir(parents=True, exist_ok=True)
data = json.loads(SOURCE.read_text())
full = OUT / "my-everyday-ai-toolkit.pdf"
c = canvas.Canvas(str(full), pagesize=(612, 792), invariant=1)
c.setTitle(data['title'] + " | LifeQuest AI")
c.setAuthor("LifeQuest AI")
c.setSubject("Large-print workshop activities and family safety planning")
navy = HexColor('#173b5c')
ink = HexColor('#202d38')
gray = HexColor('#53616c')
rule = HexColor('#a8b1b8')
y = 0

def para(text, size=13.5, leading=18, color=ink, bold=False, after=10, x=48, width=516):
    global y
    style = ParagraphStyle('body', fontName='Helvetica-Bold' if bold else 'Helvetica',
                           fontSize=size, leading=leading, textColor=color)
    p = Paragraph(escape(text), style)
    _, h = p.wrap(width, 700)
    p.drawOn(c, x, y - h)
    y -= h + after

for i, page in enumerate(data['pages'], 1):
    c.setFillColor(navy)
    c.rect(48, 748, 44, 5, fill=1, stroke=0)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(104, 746, 'LIFEQUEST AI')
    c.setFont('Helvetica', 10)
    c.drawRightString(564, 746, 'AI FOR EVERYDAY LIFE')
    y = 716
    para(page['label'], size=10.5, leading=14, color=gray, bold=True, after=10)
    para(page['title'], size=25, leading=29, color=navy, bold=True, after=13)
    para(page['intro'], after=17)
    for b in page['blocks']:
        if 'heading' in b:
            para(b['heading'], size=11.5, leading=15, color=navy, bold=True, after=6)
        if 'text' in b:
            para(b['text'])
        for item in b.get('items', []):
            para('- ' + item, after=5)
        if 'field' in b:
            para(b['field'], size=12, leading=16, bold=True, after=0)
            for _ in range(b['lines']):
                y -= 23
                c.setStrokeColor(rule)
                c.setLineWidth(.6)
                c.line(48, y, 564, y)
            y -= 16
        if 'check' in b:
            c.setStrokeColor(navy)
            c.setLineWidth(.8)
            c.rect(48, y - 12, 10, 10, fill=0, stroke=1)
            para(b['check'], x=67, width=497, after=12)
        if 'note' in b:
            para(b['note'], size=10.5, leading=14, color=gray, after=8)
        if 'link' in b:
            c.setFillColor(navy)
            c.setFont('Helvetica-Bold', 11)
            c.drawString(48, y-10, b['linkLabel'])
            c.linkURL(b['link'], (48, y-14, 280, y+2), relative=0, thickness=0)
            y -= 24
    if y < 58:
        raise RuntimeError(f"Page {i} content exceeds safe area: {y:.1f}")
    c.setStrokeColor(rule)
    c.line(48, 43, 564, 43)
    c.setFillColor(gray)
    c.setFont('Helvetica', 9)
    c.drawString(48, 27, 'lifequestai.com/workshop/ | ' + data['edition'])
    c.drawRightString(564, 27, f'Toolkit page {i} of {len(data["pages"])}')
    c.showPage()
    print(f'Page {i}: {page["title"]}; content ends at {y:.0f} pt')
c.save()
reader = PdfReader(full)
for i, page in enumerate(data['pages']):
    writer = PdfWriter()
    writer.add_page(reader.pages[i])
    writer.add_metadata({'/Title': page['title'] + ' | LifeQuest AI', '/Author': 'LifeQuest AI'})
    with (OUT / page['file']).open('wb') as f:
        writer.write(f)
files = ['my-everyday-ai-toolkit.pdf'] + [p['file'] for p in data['pages']]
for name in files:
    shutil.copyfile(OUT / name, ASSETS / name)
(ASSETS / 'manifest.json').write_text(json.dumps({
    'sourceSha256': hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
    'files': {name: hashlib.sha256((ASSETS/name).read_bytes()).hexdigest() for name in files}
}, indent=2) + '\n')
print(f'Wrote {len(files)} PDFs to {OUT}')

"""Author the two educational animations and their static posters.

Optional art build: pip install Pillow==11.3.0, then python scripts/build_gifs.py.
The website's normal build uses the committed output and needs no Pillow.
These are original deterministic teaching diagrams, not edited photographs.
"""
from pathlib import Path
from math import hypot
from PIL import Image, ImageDraw, ImageFont, PngImagePlugin

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'src' / 'assets'
W, H = 960, 560
INK, MUTED, BLUE, GREEN, ORANGE = '#172a43', '#506079', '#3055d9', '#27765e', '#c97936'
FONTS = {}
for size in (22, 25, 28, 30, 34, 38):
    FONTS[size] = ImageFont.truetype(str(OUT/'manrope.ttf'), size)
    FONTS[size].set_variation_by_axes([650 if size >= 34 else 550])


def text(d, xy, value, size=28, color=INK, anchor=None):
    d.text(xy, value, font=FONTS[size], fill=color, anchor=anchor)


def line(d, pts, fill, width=4, arrow=True):
    d.line(pts, fill=fill, width=width, joint='curve')
    if arrow:
        x, y = pts[-1]; px, py = pts[-2]
        dx, dy = x-px, y-py; length = hypot(dx, dy) or 1
        ux, uy = dx/length, dy/length
        d.polygon([(x,y),(x-13*ux+6*uy,y-13*uy-6*ux),(x-13*ux-6*uy,y-13*uy+6*ux)],fill=fill)


def packet(d, pts, progress, color=ORANGE):
    distances=[hypot(b[0]-a[0], b[1]-a[1]) for a,b in zip(pts,pts[1:])]
    target=sum(distances)*progress
    for i,length in enumerate(distances):
        if target <= length or i == len(distances)-1:
            t=min(1,target/length) if length else 1
            x=pts[i][0]+(pts[i+1][0]-pts[i][0])*t
            y=pts[i][1]+(pts[i+1][1]-pts[i][1])*t
            d.ellipse((x-11,y-11,x+11,y+11),fill=color,outline='white',width=3)
            return
        target-=length


def node(d, x, y, label, kind, active=False, dim=False):
    fill = '#ffffff' if not dim else '#edf4ef'
    stroke = GREEN if active else '#bccfc3'
    d.rounded_rectangle((x-90,y-68,x+90,y+68),radius=23,fill=fill,outline=stroke,width=4 if active else 2)
    c = GREEN if not dim else '#839b8c'
    if kind=='app':
        d.rounded_rectangle((x-31,y-43,x+31,y+1),radius=6,outline=c,width=3)
        d.line((x-31,y-30,x+31,y-30),fill=c,width=3)
        d.line([(x-10,y-19),(x-18,y-13),(x-10,y-7)],fill=c,width=3)
        d.line([(x+10,y-19),(x+18,y-13),(x+10,y-7)],fill=c,width=3)
    elif kind=='cache':
        for dy in (-31,-12):
            d.rounded_rectangle((x-31,y+dy,x+31,y+dy+13),radius=4,fill='#cae9d8',outline=c,width=2)
    else:
        d.rectangle((x-28,y-31,x+28,y-1),fill='#e4f2eb',outline=c,width=3)
        d.ellipse((x-28,y-9,x+28,y+8),fill='#e4f2eb',outline=c,width=3)
        d.ellipse((x-28,y-40,x+28,y-23),fill='#e4f2eb',outline=c,width=3)
    text(d,(x,y+19),label,28,c,anchor='mt')


def cache_frame(stage, t):
    im=Image.new('RGB',(W,H),'#e3f2e9');d=ImageDraw.Draw(im)
    text(d,(44,30),'Caching: miss to hit',38)
    subtitles=['1. Check for a saved answer','2. No copy? Read the database','3. Save a reusable copy','4. Next time, reuse the answer']
    text(d,(44,85),subtitles[stage],28,GREEN)
    app=(160,266);cache=(480,209);db=(800,266)
    cachepath=[(250,244),(350,209),(390,209)]
    dbpath=[(160,334),(160,384),(800,384),(800,334)]
    hitpath=list(reversed(cachepath))
    line(d,cachepath,'#accdb9',3)
    line(d,dbpath,'#bdd5c7',3)
    route = dbpath if stage == 1 else hitpath if stage == 3 else cachepath
    line(d,route,ORANGE if stage<3 else GREEN,4)
    node(d,*app,'App','app',stage==3)
    node(d,*cache,'Cache','cache',stage in (0,2,3))
    node(d,*db,'Database','db',stage==1,stage==3)
    packet(d,route,t,GREEN if stage==3 else ORANGE)
    notes=['Cache miss: the answer is not here yet.','The app fetches the source data.','Future requests may reuse this copy.','Cache hit: one database read avoided.']
    text(d,(44,427),notes[stage],28,GREEN)
    text(d,(916,520),f'{stage+1} / 4',22,MUTED,anchor='ra')
    return im


def scaling_frame(stage,t):
    im=Image.new('RGB',(W,H),'#edf0fc');d=ImageDraw.Draw(im)
    text(d,(44,30),'Autoscaling: meet the demand',38)
    subtitles=['1. A quiet moment','2. A traffic rush','3. Traffic eases','4. No active traffic']
    text(d,(44,85),subtitles[stage],28,BLUE)
    counts=[1,3,1,0]; count=counts[stage]
    d.rounded_rectangle((44,165,280,340),radius=23,fill='white',outline='#c9d4eb',width=2)
    text(d,(162,186),'Requests',30,INK,anchor='mt')
    dots=[4,18,4,0][stage]
    for i in range(dots):
        x=77+(i%6)*33;y=250+(i//6)*28
        d.ellipse((x-7,y-7,x+7,y+7),fill=BLUE)
    if not dots:text(d,(162,263),'none',28,MUTED,anchor='mm')
    for i,x in enumerate((447,642,837)):
        enabled=i<count
        points=[(280,270),(320,270),(320,145),(x,145),(x,185)]
        line(d,points,BLUE if enabled else '#d2daec',3,enabled)
        d.rounded_rectangle((x-77,185,x+77,332),radius=20,fill='white' if enabled else '#e3e8f4',outline=BLUE if enabled else '#c9d3e6',width=3 if enabled else 2)
        for y in (208,231):
            d.rounded_rectangle((x-34,y,x+34,y+14),radius=4,outline=BLUE if enabled else '#94a6c6',width=2)
            d.ellipse((x-25,y+5,x-21,y+9),fill=BLUE if enabled else '#94a6c6')
        text(d,(x,275),f'App {i+1}',25,INK if enabled else '#677c9c',anchor='mt')
        if enabled:packet(d,points,(t+i*.28)%1,ORANGE)
    notes=['1 running instance handles the load.','More instances share the incoming work.','Unneeded instances can scale down.','With suitable settings, scale down to zero.']
    text(d,(44,386),notes[stage],28,BLUE)
    text(d,(44,434),'Illustrative — real scaling takes time.',22,MUTED)
    text(d,(916,520),f'{stage+1} / 4',22,MUTED,anchor='ra')
    return im


for name,renderer in (('cache',cache_frame),('scaling',scaling_frame)):
    provenance = f'Original educational diagram authored for QuickAds Cloud Lab. Source: scripts/build_gifs.py ({name}_frame). Rendered with Pillow. No generative image input.'
    frames=[renderer(stage,j/35) for stage in range(4) for j in range(36)]
    frames[0].save(OUT/f'{name}-flow.gif',save_all=True,append_images=frames[1:],duration=100,loop=0,optimize=True,disposal=1,comment=provenance.encode())
    poster=renderer(0 if name=='cache' else 1,.5)
    metadata=PngImagePlugin.PngInfo();metadata.add_text('Origin',provenance)
    poster.save(OUT/f'{name}-poster.png',pnginfo=metadata,optimize=True)
    print(f'{name}: 14.4 second GIF + static poster, {(OUT/f"{name}-flow.gif").stat().st_size//1024} KB')

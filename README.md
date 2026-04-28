# eronnvideo.hu

Statikus weboldal Padányi Áron esküvői videós szolgáltatásához. Tiszta HTML/CSS/JS, GitHub Pages-en hostolva.

## 🚀 Migrációs útmutató (WordPress → GitHub Pages)

### 1. lépés — GitHub repo létrehozása

1. Jelentkezz be a [github.com](https://github.com)-ra az új accountoddal
2. Kattints a `+` ikonra jobb felül → **New repository**
3. Repository neve: `eronnvideo.hu` (vagy `eronnvideo-website` — bármi lehet)
4. Tedd **Public**-ra
5. **NE** generálj README-t, gitignore-t vagy LICENSE-t
6. **Create repository**

### 2. lépés — Fájlok feltöltése

**A. opció — egyszerűbb (drag & drop):**
1. A repo főoldalán kattints az "uploading an existing file" linkre
2. Húzd be a teljes mappa tartalmát (kivéve a `.git` mappát ha van)
3. Commit message: `initial commit`
4. **Commit changes**

**B. opció — terminálból:**
```bash
cd eronnvideo
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/USERNEVED/eronnvideo.hu.git
git push -u origin main
```

### 3. lépés — GitHub Pages bekapcsolása

1. Repo → **Settings** → **Pages** (bal oldali menü)
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `(root)` → **Save**
4. Várj 1-2 percet, az oldal elérhető lesz: `https://USERNEVED.github.io/eronnvideo.hu/`

### 4. lépés — Custom domain beállítása

1. Settings → Pages → **Custom domain**
2. Írd be: `eronnvideo.hu` → **Save**
3. **Enforce HTTPS** legyen pipálva (lehet pár perc, mire elérhető)

### 5. lépés — DNS beállítás (Cloudflare-en keresztül)

> ⚠️ **FONTOS**: ezt csak akkor csináld meg, ha az új oldal már elkészült és tesztelted!
> Amíg nem módosítod a DNS-t, a régi WordPress oldalad zavartalanul fut.

**Cloudflare-en:**
1. Add hozzá a `eronnvideo.hu` domain-t a Cloudflare accountodhoz
2. Cloudflare megadja a 2 nameservert — ezeket állítsd be a domain regisztrátorodnál (ahol a domaint vetted)
3. Várj amíg propagálódik (1-24 óra)

**DNS rekordok Cloudflare-en (DNS → Records):**

| Type  | Name | Content              | Proxy |
|-------|------|----------------------|-------|
| A     | @    | 185.199.108.153      | DNS only (szürke felhő) |
| A     | @    | 185.199.109.153      | DNS only |
| A     | @    | 185.199.110.153      | DNS only |
| A     | @    | 185.199.111.153      | DNS only |
| CNAME | www  | USERNEVED.github.io  | DNS only |

> ⚠️ Először mindenképp **DNS only** (szürke felhő) — később kapcsolhatod proxy-ra (narancs felhő), de először az SSL tanúsítványt hadd generálja le a GitHub.

### 6. lépés — WordPress lemondása

Csak akkor mondd le a WordPress hosting-ot, amikor:
- ✅ Az új oldal elérhető a `eronnvideo.hu` címen
- ✅ HTTPS működik
- ✅ Minden szekció jól néz ki
- ✅ A kapcsolati űrlap teszt e-mailje megérkezett

---

## 📝 Tartalom feltöltés

### YouTube videók beillesztése

Nyisd meg az `index.html`-t, és keresd meg ezt a 4 sort:
```html
data-video-id="PLACEHOLDER_VIDEO_ID_1"
data-video-id="PLACEHOLDER_VIDEO_ID_2"
data-video-id="PLACEHOLDER_VIDEO_ID_3"
data-video-id="PLACEHOLDER_VIDEO_ID_4"
```

Cseréld le a YouTube videó ID-jára. Pl. ha a videó URL-je:
`https://www.youtube.com/watch?v=dQw4w9WgXcQ`
akkor az ID: `dQw4w9WgXcQ`

→ `data-video-id="dQw4w9WgXcQ"`

### Képek

Tedd be a képeket az `assets/images/` mappába az alábbi nevekkel:
- `aron-portrait.jpg` — portré rólad (3:4 arány, kb. 800×1066 px)
- `film-1-cover.jpg` — Gabriella & Bence cover (16:9, kb. 1280×720 px)
- `film-2-cover.jpg` — Barbi & Peti cover
- `film-3-cover.jpg` — Noémi & Sándor cover
- `film-4-cover.jpg` — Zsuzsi & Gyula cover
- `og-image.jpg` — Open Graph kép közösségi médiához (1200×630 px)
- `logo.png` — logo (transparens háttérrel)

> 💡 **Tipp**: tömörítsd a képeket [tinypng.com](https://tinypng.com)-en, hogy gyors maradjon az oldal.
> WebP formátum még jobb lenne, de a JPG is tökéletes.

### Formspree űrlap

1. Hozz létre egy New Form-ot a [formspree.io](https://formspree.io)-on
2. Kapsz egy endpoint URL-t, pl: `https://formspree.io/f/abcd1234`
3. `index.html`-ben keresd meg ezt a sort:
   ```html
   <form ... action="https://formspree.io/f/PLACEHOLDER_FORM_ID" ...>
   ```
4. Cseréld le a `PLACEHOLDER_FORM_ID`-t a tied azonosítójára

### Vélemények

Az `index.html`-ben a `testimonial-grid` szekcióban 3 placeholder vélemény van.
Cseréld le valódi visszajelzésekre a párjaidtól.

---

## 🎨 Design

- **Tipográfia**: Fraunces (display serif) + Inter Tight (body)
- **Színek**: Warm off-white (`#f6f3ee`), near-black ink, terracotta accent (`#b8755a`)
- **Stílus**: editorial, cinematic, minimal

A színeket a `styles.css` legtetején a `:root` blokkban tudod módosítani.

---

## 🔍 SEO funkciók

✅ Schema.org `LocalBusiness` markup esküvő-specifikus mezőkkel
✅ Open Graph tagek (Facebook/Messenger megosztáshoz)
✅ Twitter Cards
✅ Magyar `lang="hu"` attribútum
✅ Semantic HTML5 (header, nav, main, section, article, footer)
✅ Sitemap.xml + robots.txt
✅ Alt tagek minden képhez
✅ Mobile-first reszponzív design
✅ Lazy loading a képeknél és YouTube embed-eknél
✅ Canonical URL
✅ Strukturált árazási adatok (Offer schema)

### Ajánlott extra lépések a launch után

1. **Google Search Console**: regisztráld a domain-t, küldd be a sitemap.xml-t
   → [search.google.com/search-console](https://search.google.com/search-console)
2. **Google Business Profile**: hozz létre egy ingyenes profilt esküvői videósként
   → [business.google.com](https://business.google.com)
3. **Bing Webmaster Tools**: ide is érdemes beküldeni a sitemap-et

---

## 🔧 Lokális fejlesztés

Egyszerűen nyisd meg az `index.html`-t a böngészőben, vagy futtass egy egyszerű HTTP szervert:

```bash
# Python
python3 -m http.server 8000

# Node.js (ha van npx)
npx serve .

# VS Code: Live Server extension
```

Aztán nyisd meg: `http://localhost:8000`

---

## 📁 Fájl struktúra

```
eronnvideo/
├── index.html              # fő oldal
├── styles.css              # design
├── script.js               # interakciók (mobil menü, YouTube lazy load, form)
├── robots.txt              # SEO: keresőrobotoknak
├── sitemap.xml             # SEO: sitemap
├── CNAME                   # GitHub Pages: custom domain
├── .nojekyll               # GitHub Pages: ne használjon Jekyll-t
├── README.md               # ez a fájl
└── assets/
    ├── images/             # fotók, cover képek
    └── icons/              # favicon, apple-touch-icon
```

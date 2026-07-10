# Agency — Digital Growth for Schools & Colleges

Our own brand website + project workspace. We build websites and run
social media (Instagram / Facebook) for schools and colleges.

## Structure
```
agency/
├── index.html        # Landing page (single page)
├── css/styles.css    # All styling — theme vars at top of file
├── js/main.js        # Small interactions (nav, year)
├── agency_notes.txt  # Full business context, pricing, roadmap
└── README.md         # This file
```

## Run it locally
Just open `index.html` in a browser. Or serve it:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before it goes live — TODO
- [ ] Pick the real **brand name**, then find-and-replace `Brandname` everywhere
- [ ] Replace contact links: email, WhatsApp number, Instagram, Facebook
- [ ] Explore a visual **style** (edit the theme variables in `css/styles.css` `:root`)
- [ ] Add a logo (swap the text logo in the nav/footer)
- [ ] Add real screenshots / case study once the first school site is done

## Styling / exploring looks
All colors, fonts, and radius live in `css/styles.css` under `:root`.
Change those first to try different vibes before touching layout.

## Current status
Phase 0 — building the brand. See `agency_notes.txt` for the full roadmap.

# ITZFIZZ — Scroll-driven hero

React (Vite) + Tailwind v4 + GSAP ScrollTrigger (black / orange / white theme).

## Run
    npm install
    npm run dev        # http://localhost:5173

## Deploy to GitHub Pages
    git init && git add . && git commit -m "init"
    git branch -M main
    git remote add origin https://github.com/<you>/<repo>.git
    git push -u origin main
    npm run deploy     # builds + publishes /dist to the gh-pages branch
Then GitHub → Settings → Pages → Branch: gh-pages / root.

## How it works
- App.jsx: one intro timeline (time-based) + one scrubbed timeline pinned to scroll (progress-based).
- Everything animates with transform/opacity only (no layout reflow).
- `scrub: 1.2` smooths the scroll value so motion eases instead of snapping.
- Near the end, progress > 94% triggers the one-shot "payment successful" burst.

# Portfolio

Single-page portfolio for Abdulrahman Alsyami. Static: `index.html` + `assets/`.

- Edit `src/index.html`, `src/styles.css`, `src/app.js`, then run `python build.py` to regenerate `index.html` (inlines CSS and JS so the file also opens from disk).
- Project screenshots live in `assets/` (`p-<id>.jpg` 1600px, `p-<id>-t.jpg` 800px thumb).
- Add a photo at `assets/me.jpg` (portrait, 4:5) and it appears in About automatically.
- Volunteering logos live in `assets/org-*.png|svg` and are shown on a white plate inside each `.org` card. To replace one, overwrite the file (about 160px tall is enough).
- Deploy: push to GitHub, enable Pages on the branch root.

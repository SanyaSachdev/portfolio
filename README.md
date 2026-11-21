# Sanya Sachdev — Product Portfolio

A static, single-page portfolio. There is no build step and no backend: the browser loads `index.html`, one stylesheet and four small scripts. It can be hosted as-is on GitHub Pages.

## Folder structure

```
index.html                     Page structure: home sections, the three project pages, the case-study viewer
assets/
  css/styles.css               Shared classes, animations, the partner-app mockup styles
  js/content.js                EDIT THIS: skills, case studies, journey, hobbies, photos
  js/render.js                 Builds those sections from content.js
  js/site.js                   Page switching, case-study viewer, top bar, journey line
  js/partner-app-mockup.js     Interactive mockup on the Payout project page
  portrait.jpg                 Photo on the first screen (4:5)
  slides/                      Case-study slides, named <id>-01.jpg, <id>-02.jpg, ...
  photos/                      "Off the clock" pictures
```

How the page loads: `index.html` contains every page. `content.js` holds the data, `render.js` fills the data-driven sections, then `site.js` shows the right page for the link (`#payout`, `#amazon`, and so on).

## Common edits

All of these are in `assets/js/content.js` unless stated. Keep quotes and commas as they are; items are separated by commas.

**Change the journey (timeline).** Edit the `journey` list. Each stop has `years`, `title`, `text`, and optional `items` for the smaller entries under it. Add, remove or reorder stops freely; the line and circles adjust on their own.

**Add a case study or teardown.**
1. Export the deck slides as JPG images (1600 × 900 works best) and name them `<id>-01.jpg`, `<id>-02.jpg`, ... for example `swiggy-01.jpg`.
2. Put them in `assets/slides/`.
3. Add a block to `caseStudies` with the same `id`, the number of `slides`, `kind` (`"case study"` or `"teardown"`), and the three lines of text.

The card on the home page, the viewer page and the "More case studies & teardowns" list all update from that one block. To remove one, delete its block.

**Replace a deck.** Overwrite its slide images and update the `slides` count.

**Change skills, hobbies or photos.** Edit `skills`, `hobbies`, `photos` and `photoInset`. The photo collage is designed for five pictures (one large, four small) plus the small inset.

**Change the portrait.** Replace `assets/portrait.jpg` with another 4:5 image of the same name.

**Change text on the first screen, About, the project rows, or the footer (email, LinkedIn).** These are written directly in `index.html`. Search for the sentence you want to change and edit it in place. The email and LinkedIn link appear in the home footer and in each page footer, so use "replace all".

**Edit a project page.** Each project is a block in `index.html` that starts with `<div data-view="...">`: `case-study` (Next-Day Delivery), `payout`, `ai-ops`.

**Add a new project page.**
1. In `index.html`, copy one whole project block (`<div data-view="ai-ops" hidden> ... </div>`) and give the copy a new name, for example `data-view="returns"`.
2. Copy one project row in the home page's Projects list and point its link at `#returns`.
3. Update the "Next project" links at the bottom of the project pages if you want the new page in that chain.

No script changes are needed: any `data-view` name works as a link.

**Colours.** The accent colour is `--accent` at the top of `assets/css/styles.css`. The page background is `#F3ECE2`; it is written inline in `index.html`, so use "replace all" to change it.

## Preview on your computer

Open `index.html` in a browser. Nothing needs to be installed.

## Publish with GitHub Pages

1. Create a repository (for example `portfolio`) and upload everything in this folder, keeping the folder structure.
2. In the repository: Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)` → Save.
3. After a minute the site is live at `https://<your-username>.github.io/portfolio/`.

Every later change you commit to `main` is published automatically.

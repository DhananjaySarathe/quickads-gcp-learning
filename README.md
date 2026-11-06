# QuickAds GCP Learning Roadmap

A visual, interactive Google Cloud learning space for Dhananjay: from creating an account to deploying, operating, and optimizing a service while learning toward ownership of QuickAds workloads.

## Website

https://DhananjaySarathe.github.io/quickads-gcp-learning/

The site is published from `main` → `/docs` using GitHub Pages. It works without ChatGPT or a ChatGPT login.

## Included

- A two-day starting plan and an 8–12 week practice path.
- Thirty milestones with practical completion criteria.
- A connected chapter map and focused, in-page lessons with practical actions.
- A playable browser → API → data → response explanation with manual stepping.
- Two original educational GIFs: cache misses/hits and autoscaling. Each has a static poster, on-demand playback, written explanation, and download link.
- A request-work experiment and a least-privilege knowledge check.
- Fixed light styling, self-hosted type, and layouts for desktop and mobile.
- Official learning references and lesson prompts to continue learning in chat.
- Local progress tracking, plus JSON export/import for moving progress between devices.

Progress is stored in the current browser. It does not automatically sync between devices. Importing a backup merges completed milestones with the existing checklist. Progress from the former ChatGPT Sites address cannot automatically cross to this new origin.

## Edit and publish

1. Edit `src/roadmap.html` for layout, `src/styles.css` for styling, `src/data.js` for milestone data, and `src/app.js` for lessons and interactions.
2. Run `python3 build.py`.
3. Preview with `python3 -m http.server 8765 --directory docs`.
4. Commit the source and generated `docs/` files, then push to `main`.
5. GitHub Pages publishes the updated `/docs` directory automatically.

Python's standard library is the only site build requirement. Fonts, icons, scripts and animations are served from this repository. There are no runtime JavaScript dependencies, third-party font requests, analytics, or cloud credentials.

## Educational animation sources

`scripts/build_gifs.py` renders the original teaching diagrams. To regenerate the GIFs and posters, install `Pillow==11.3.0` in a virtual environment, run `python scripts/build_gifs.py`, then rebuild the site. Animation is user-initiated; motion preferences stop active motion when changed, and the request diagram has manual stepping. The GIFs have text equivalents and do not load until played.

The simulations are conceptual. The work experiment sums request durations, not billable instance time, and never estimates a dollar charge. The scaling GIF illustrates parallel instances and does not promise specific instance counts or timing. Cached data needs expiry/invalidation, and running a cache itself has a cost.

Sora and Manrope are self-hosted from the official Google Fonts repository under the SIL Open Font License; the license files are included in `src/assets/` and `docs/assets/`. The raster diagrams carry their source provenance in metadata; `scripts/build_gifs.py` is their editable source. No decorative AI-generated image is shipped.

## QuickAds learning material

This first version contains general cloud foundations. It does not claim to document QuickAds' production architecture. Add company-specific service names and lessons only after the stack is confirmed and the material is appropriate to publish publicly.

Future lessons can use confirmed QuickAds service names to add request maps, incident exercises, and measured cost experiments. Animation sources should be retained with the assets, and motion should respect reduced-motion preferences.

Do not commit credentials, billing exports, customer information, or internal production configuration to this public repository.

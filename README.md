# QuickAds GCP Learning Roadmap

A readable, static learning roadmap for Dhananjay: from creating a Google Cloud account to deploying, operating, and optimizing a service while learning toward ownership of QuickAds workloads.

## Website

https://DhananjaySarathe.github.io/quickads-gcp-learning/

The site is published from `main` → `/docs` using GitHub Pages. It works without ChatGPT or a ChatGPT login.

## Included

- A two-day starting plan and an 8–12 week practice path.
- Thirty milestones with practical completion criteria.
- Fixed light styling, larger text, and layouts for desktop and mobile.
- Official learning references and lesson prompts to continue learning in chat.
- Local progress tracking, plus JSON export/import for moving progress between devices.

Progress is stored in the current browser. It does not automatically sync between devices. Importing a backup merges completed milestones with the existing checklist. Progress from the former ChatGPT Sites address cannot automatically cross to this new origin.

## Edit and publish

1. Edit `src/roadmap.html` for content and behavior, or `src/styles.css` for styling.
2. Run `python3 build.py`.
3. Preview with `python3 -m http.server 8765 --directory docs`.
4. Commit the source and generated `docs/` files, then push to `main`.
5. GitHub Pages publishes the updated `/docs` directory automatically.

Python's standard library is the only build requirement. The site uses a pinned Lucide icon script from a public CDN; the text and learning controls work without it.

## QuickAds learning material

This first version contains general cloud foundations. It does not claim to document QuickAds' production architecture. Add company-specific service names and lessons only after the stack is confirmed and the material is appropriate to publish publicly.

The next learning-material pass can add mind maps, request-flow animations, GIFs, incident exercises, and cost experiments based on confirmed QuickAds use cases. Animation sources should be retained with the assets, and motion should respect reduced-motion preferences.

Do not commit credentials, billing exports, customer information, or internal production configuration to this public repository.

---
name: QuickAds Cloud Lab
description: A light, readable field guide for learning how cloud services work.
colors:
  ink: "#172a43"
  muted: "#506079"
  blue: "#3055d9"
  blue-dark: "#2343b5"
  sky: "#eef3ff"
  green: "#17604e"
  line: "#dce3ed"
  paper: "#ffffff"
  lesson-surface: "#f4f7fd"
  lab-surface: "#f2f8f5"
  mint: "#e1f3eb"
  apricot: "#ffeadb"
  request-packet: "#d47b36"
  lilac: "#eee9ff"
  yellow: "#fff2cb"
  small-numeral: "#596c88"
  focus: "#b75820"
typography:
  display:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "68px"
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  lesson-body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 750
    lineHeight: 1.5
  navigation:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.7
  field:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  compact-control: "7px"
  field: "8px"
  button: "9px"
  inset: "10px"
  tile: "12px"
  diagram-node: "14px"
  panel: "16px"
  exhibit: "18px"
  station: "22px"
  circle: "50%"
spacing:
  space-8: "8px"
  space-12: "12px"
  space-16: "16px"
  space-20: "20px"
  space-24: "24px"
  space-28: "28px"
  space-32: "32px"
  space-36: "36px"
  space-48: "48px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "13px 19px"
  button-primary-hover:
    backgroundColor: "{colors.blue-dark}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "13px 19px"
  button-secondary-hover:
    backgroundColor: "{colors.sky}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "13px 19px"
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    padding: "0"
  prompt-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.field}"
    padding: "12px"
    width: "100%"
  navigation:
    textColor: "{colors.muted}"
    typography: "{typography.navigation}"
  progress-badge:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.blue}"
    rounded: "{rounded.button}"
    padding: "9px 13px"
  lesson-pane:
    backgroundColor: "{colors.lesson-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "28px 30px 22px"
  lesson-row-current:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.blue}"
    rounded: "{rounded.compact-control}"
    padding: "18px 12px 18px 10px"
  journey-station:
    rounded: "{rounded.station}"
    width: "72px"
    height: "72px"
  request-exhibit:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.exhibit}"
    padding: "24px 26px 18px"
---

# Design System: QuickAds Cloud Lab

## Overview

**Creative North Star: "Science-museum field guide"**

An approachable, readable guide that makes cloud behavior visible. White and ice-blue surfaces give explanations room; rounded stations, fine connectors, and purposeful color make relationships easy to follow. Generous Sora headings establish hierarchy above clear Manrope reading text.

Visuals earn their place by teaching. A diagram shows a request moving between services; a short, user-controlled animation reveals a change in work or capacity. Explanations remain available as ordinary text. This system follows the user's confirmed preference for light surfaces and educational motion, and excludes the rejected decorative cloud artwork.

**Key Characteristics:**

- Light reading surfaces with navy text and clear contrast.
- Rounded diagram stations connected by fine causal paths.
- Open lesson and resource rows beside a focused reading pane.
- User-controlled educational motion with static and textual alternatives.

Extracted from `src/styles.css`, `src/roadmap.html`, and `src/app.js` after the reviewed redesign. The frontmatter records reused values; the sidecar records motion, responsive behavior, component previews, and provenance. The surface brief retains page-specific composition.

## Colors

The palette combines cool, quiet reading surfaces with distinct colors for action, successful outcomes, and teaching diagrams.

### Primary

- **Cobalt** (`blue`) identifies actions, links, the current lesson, selected chapters, and overall progress. **Deep cobalt** (`blue-dark`) is its primary-button hover state.
- **Ice blue** (`sky`) supports selected rows, progress badges, and the opening surface.

### Secondary

- **Deep learning green** (`green`) identifies completion, useful feedback, and visual-lab controls.
- **Mint paper** (`lab-surface`) separates the visual lab; **mint** appears in data and successful-response imagery.

### Tertiary

- **Apricot** supports API and chapter stations; **request packet** supplies the moving request marker.
- **Lilac** and **soft yellow** distinguish later chapter stations. They support labels and sequence rather than replacing them.

### Neutral

- **Navy ink** (`ink`) is the principal text color; **slate** (`muted`) carries supporting explanations.
- **Small numeral slate** (`small-numeral`) is the reviewed color for unfinished lesson numbers and chapter progress counts.
- **White paper** (`paper`), **lesson paper** (`lesson-surface`), and **fine rule** (`line`) separate content without heavy boxes.
- **Burnt orange focus** (`focus`) supplies the common keyboard outline.

**The Visible State Rule.** Pair color changes with a label, number, check mark, outline, or explanatory feedback. Selection and completion must remain understandable without color alone.

## Typography

**Display Font:** Sora, with Arial and sans-serif fallbacks.  
**Body Font:** Manrope, with Arial and sans-serif fallbacks. Both are self-hosted variable fonts.

Sora supplies compact, friendly headings; Manrope supports extended reading and small controls. Headings use balanced wrapping and slight negative tracking. Labels use sentence case, and changing counts use tabular numerals.

### Hierarchy

- **Display:** the opening title uses the frontmatter display role. It responds to the established breakpoints: 56px at 1100px, 57px at 850px, 49px at 600px, and 44px at 360px. The 850px increase belongs to the wider stacked composition.
- **Headline:** section headings use the headline role, stepping to 30px at 850px and 28px at 600px.
- **Title:** the base title role serves subsection headings. Chapter and lesson titles use 25px on desktop; lesson titles use a 1.4 line height. Specific lab headings range from 22–23px.
- **Body:** the root role establishes the rhythm. Explanations commonly use 15–17px with 1.85–1.9 line height; section introductions and chapter outcomes are capped at 65ch where appropriate.
- **Label:** controls use the label role; navigation uses its own slightly lighter role. Supporting metadata is usually 11–13px and never substitutes for the lesson explanation.

**The Reading First Rule.** Keep the explanation in live text with generous line height; diagrams reinforce the text instead of carrying essential instructions alone.

## Layout

The standard content shell is centered at a maximum width of 1280px, including 48px side padding. The header has a 1440px maximum; the opening grid has a 1360px maximum and 56px side padding. Desktop content uses open two-column arrangements, fine horizontal rules, and generous section spacing. The lesson workspace uses a 1:1.05 column ratio with a 48px gap; the lab uses equal columns with 36px gaps. Major vertical section padding is generally 65–78px.

The spacing tokens describe the recurring rhythm, not an exclusive scale. Small icon-label gaps are typically 6–10px, reading-pane spacing is 15–24px, and structural gaps are 26–48px.

- **At 1100px:** standard side padding becomes 32px; large gaps tighten.
- **At 850px:** the opening and lesson workspace stack. The lesson list uses two columns. Animation lessons become image-and-copy rows, with one lesson per row.
- **At 600px:** standard side padding becomes 22px; navigation wraps into its own row. The chapter map becomes a vertical connected sequence, lesson rows return to one column, and experiments and animation lessons stack. The opening copy is centered; long lesson text stays left-aligned.
- **At 360px:** standard side padding becomes 18px and crowded controls stack further.

## Elevation & Depth

Depth comes mainly from tinted surfaces, white insets, and fine borders. Soft shadows are limited to the request exhibit and the animation control. Lesson panes and list rows remain flat; hover changes color rather than lifting the surface.

### Shadow Vocabulary

- **Exhibit ambient** (`0 12px 32px rgba(38,65,117,.07)`): separates the white request demonstration from the ice-blue field.
- **Animation control** (`0 3px 10px rgba(27,76,55,.05)`): a restrained shadow on the white play/stop control.

**The Quiet Depth Rule.** Use tonal surfaces and thin rules as the default separators; reserve the existing soft shadows for the exhibit and its controls.

## Shapes

Corners are gently rounded rather than pill-shaped. Buttons and badges use the button radius; fields and compact controls are slightly tighter. Lesson panes, animation canvases, and the request exhibit use larger radii. Diagram stations have a distinctive rounded-square silhouette; only numbered badges, packet dots, and small status marks are circular.

Borders are usually 1px. The chapter station includes a white 5px rim on desktop; its dimensions in the frontmatter describe its content box. Selection adds a cobalt outline, while completion changes the numbered badge to green. Connectors use thin solid or dashed lines. Icons are outlined inline SVGs, generally 16–32px, with round caps and joins.

## Components

### Buttons

Compact, clear controls with an explicit verb. The primary, secondary, and quiet variants share the button shape, 48px minimum height, and a 10px icon gap. The small variant uses 44px minimum height, 9px by 13px padding, and 13px type.

Primary buttons use cobalt with white text and deepen on hover. Secondary buttons use white with a pale blue border and ice-blue hover. Quiet buttons use navy text with a pale neutral hover. Text links provide lighter actions with a 44px minimum height and an underline on hover. Disabled buttons have 0.55 opacity.

All keyboard-operable controls share a 3px burnt-orange focus outline with a 5px offset. Color transitions take 0.18s when motion is permitted; there is no scale or lift effect.

### Chips

The header progress badge is an ice-blue linked count, with cobalt text and an inline chart icon. It uses tabular numerals and a descriptive accessible label. It is a compact navigation target, not a filter collection.

### Cards / Containers

The focused lesson pane uses lesson paper, a thin cool border, and the panel radius. Its white inset contains a small three-node diagram; explanation, action, evidence, and completion controls remain visibly separate. On phones its padding becomes 23px by 20px and its radius becomes 13px.

The request exhibit uses white paper, the exhibit radius, and the exhibit ambient shadow. Animation canvases use the panel radius and clip their media. Play/stop controls sit below the image inside the canvas rather than covering its teaching content.

### Inputs / Fields

The tutor prompt is a full-width, vertically resizable textarea with a white background, 1px blue-gray border, and the field role. It is read-only because it contains a prepared prompt to copy. The visible label and common focus outline remain present.

Completion uses a native 20px checkbox with green accent. The lab uses labeled native range inputs, green accents, visible numeric outputs, and a separate work-result bar. No custom error-field visual system is established.

### Navigation

Desktop navigation is a simple row of muted Manrope links with a 32px gap and cobalt hover. The header combines a rounded cloud mark, the wordmark, navigation, and a linked progress count. At 600px the links occupy a full-width second row. There is no persistent active-section indicator in the current header.

### Chapter map and lesson rows

Each chapter button combines a numbered station, timing, title, explanatory caption, and progress. Chapter identity uses soft colored station fills; `aria-pressed` selection adds the cobalt outline and text treatment. Completed chapters turn the numbered badge green. The mobile map preserves sequence through a vertical dashed connector.

Lesson rows use separators and numbered circles. The current row gains ice-blue fill and cobalt text; completed rows replace the number with a green check. These states can coexist. The reading pane exposes the step position and a short evidence statement.

### Causal diagrams and educational motion

Service nodes stay in a stable order; request and response paths connect the same services. Active nodes gain an outline, a packet moves along the connector, and a nearby explanation updates. The request journey starts on demand, supports pause and single-step controls, and ends after four steps. Packet motion takes 1.35s; automatic step cadence is 3.6s.

Educational GIFs start as static posters, play only after activation, and return to posters after 14.4s. Only one GIF plays at a time. Each lesson includes alt text and an expandable written explanation. Hiding the page stops motion. Reduced-motion mode disables smooth scrolling and interpolated packet movement; explicitly requested GIF playback remains available, and switching to reduced motion stops any current playback.

## Do's and Don'ts

### Do:

- **Do** keep white or pale reading surfaces, navy text, and the established common focus outline.
- **Do** use cobalt for actions and selection, and green for completion and learning feedback.
- **Do** preserve visible labels, numbered position, and non-color evidence of state.
- **Do** use stable, labeled diagram nodes and connector paths that explain a relationship.
- **Do** provide user-controlled motion, a static starting state, and a written explanation.
- **Do** stack complex teaching layouts at the established breakpoints while keeping lesson text left-aligned.

### Don't:

- **Don't** introduce a dark theme or replace the confirmed educational visuals with decorative cloud artwork.
- **Don't** put essential lesson instructions only inside a raster image or animation.
- **Don't** turn every lesson or resource row into a separate elevated card.
- **Don't** auto-start educational animation or use ambient movement without a teaching purpose.
- **Don't** promote an isolated small metadata size into the body-text scale.

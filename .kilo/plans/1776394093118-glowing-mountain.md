# Vooglaadija Video Player Integration Plan

## Context
The countdown page at `/vooglaadija-presentation-1` currently shows a countdown timer targeting `2026-04-17T12:00:00+03:00`. When the countdown completes, it displays "VIDEO ON KOOS!" message. The page needs a proper video player to play `vooglaadija-presentation-1.mp4` when the video is ready.

## Research Summary

### Top Video Player Options for React (2026)

| Library | GitHub Stars | npm Downloads | Weight | Best For |
|---------|-------------|---------------|--------|----------|
| **react-player** | 9.6k | 1M/week | ~40kb gzipped | Versatile, multi-URL support |
| **Video.js v10 (@videojs/react)** | 38.5k | 596k/week | Modular, tree-shakeable | Professional, extensible, skins |
| **Vidstack** | 2.7k | 16k/week | Modern, highly customizable | Performance-focused, modular |
| **mux-player-react** | 287 | 161k/week | ~15kb | Mux integration, analytics |
| **video-react** | 2.7k | 100k/week | Simple | Basic needs |

### Recommendations

**Option A: Video.js v10 (Recommended)**
- Modern React-first approach with hooks
- Modular architecture (pay for what you use)
- Minimal skin looks clean
- Strong accessibility (WCAG)
- CSS custom properties for theming

**Option B: Native HTML5 `<video>` element**
- Zero dependencies
- Full browser control
- Custom UI overlay possible
- Lightest possible

**Option C: Vidstack**
- Newer, modern API
- Good performance
- Less mature than Video.js

## Implementation Plan

### Step 1: Create VideoPlayer Component
Create `src/components/VooglaadijaVideoPlayer.tsx`:
- Use Video.js v10 with minimal skin
- Accept `src` prop for video URL
- Theme: dark styling matching countdown page aesthetic
- Auto-play on mount (for when countdown completes)
- Fullscreen support
- Responsive sizing

### Step 2: Create Video Presentation Component
Create `src/components/VooglaadijaPresentation.tsx`:
- Wraps the VideoPlayer
- Adds page title/header "VOOGLAADIJA - Video Esitlus"
- Back to home link
- Matches the countdown page visual theme

### Step 3: Integrate into Countdown Component
Modify `src/components/VooglaadijaCountdown.tsx`:
- When `isComplete === true`, render `<VooglaadijaVideoPlayer src="/vooglaadija-presentation-1.mp4" />` instead of static message
- Or render a "Play Presentation" button that loads the video

### Step 4: Video Placement
- Place `vooglaadija-presentation-1.mp4` in `/public/` folder
- Serve via GitHub Pages static hosting

### Step 5: Update pub/ build artifacts
- Run `npm run build` to generate updated static files

## File Structure Changes

```
src/components/
+   VooglaadijaVideoPlayer.tsx    (new)
+   VooglaadijaPresentation.tsx  (new)
  VooglaadijaCountdown.tsx       (modified - add video play state)

public/
+   vooglaadija-presentation-1.mp4  (video file - user provides)
```

## Decisions Made

- **Library**: Video.js v10 (@videojs/react)
- **Playback behavior**: Show play button when countdown completes
- **Video location**: `/public/vooglaadija-presentation-1.mp4`

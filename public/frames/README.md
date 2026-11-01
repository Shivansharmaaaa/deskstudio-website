# Pencil line frames go here

This folder is where your scroll-driven "drawing pencil line" animation lives.
The site plays these images like a video as the user scrolls — Apple-style.

## How to add your Higgsfield video

1. Generate the pencil-line video (the prompt you have), on a **flat off-white
   or white background**. White blends into the page automatically (the canvas
   uses `mix-blend-mode: multiply`), so only the graphite line shows.

2. Cut the video into a numbered image sequence with ffmpeg:

   ```bash
   ffmpeg -i pencil.mp4 -vf "fps=24,scale=900:-1" public/frames/frame_%04d.jpg
   ```

   That produces `frame_0001.jpg`, `frame_0002.jpg`, …

3. Count how many frames you got, then open
   `components/ScrollLine.js` and set:

   ```js
   const TOTAL_FRAMES = 120; // <- your actual frame count
   ```

   If you use a different name or extension (e.g. `.png`), update `framePath`
   in the same file.

## Until you add frames

The site automatically falls back to a hand-coded animated SVG pencil line, so
it looks finished out of the box. Drop frames in and refresh — it switches to
your video sequence with no other changes.

## Tips

- 80–150 frames is a good range. Too few looks choppy; too many is heavy.
- Keep each frame ~100–250 KB (JPG quality is fine for graphite-on-paper).
- The frames are drawn full-screen with a "cover" fit and stay fixed while the
  page scrolls, so a tall/vertical composition maps best to the scroll.

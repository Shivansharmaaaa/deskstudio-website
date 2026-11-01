# Reel images

Drop images you want in the Instagram reel into this folder
(`public/reel/`). PNG / JPG / WebP all work.

In the reel they're loaded with Remotion's `staticFile()` + `<Img>`:

```jsx
import { Img, staticFile } from "remotion";
<Img src={staticFile("reel/my-screenshot.png")} />
```

## How to give them to me

Just put the files here and tell me, for each one:
- the **filename**, and
- **where it should appear** (e.g. "inside the phone mockup", "a full-screen
  case-study shot", "founder photo in the testimonial", "logo on the end card").

Tips for vertical reel (1080×1920):
- Full-screen shots look best tall/portrait; landscape shots get letterboxed
  or cropped (I can do either).
- For the phone mockup, an app/dashboard screenshot ~600px wide is ideal.
- Logos: transparent PNG.

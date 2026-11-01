"use client";

/**
 * A single pencil-line frame, rendered INLINE in the page flow (not a fixed
 * overlay). Frames stack down the page and act as a connecting thread between
 * content blocks. Each frame "draws" itself (clip-path wipe) as it scrolls
 * through the viewport — the scroll handler lives in app/page.js.
 *
 * Props:
 *  - n        frame number (1..15) in /public/frames
 *  - size     "sm" | "md" | "lg"  (line height on screen)
 *  - aside    optional JSX shown to the LEFT of the frame (kept off the line)
 *  - asideSide "left" | "right"
 */
export default function Frame({ n, size = "md", aside = null, asideSide = "left" }) {
  return (
    <div className={`frame frame-${size} ${aside ? "frame-has-aside" : ""}`}>
      <img
        className="frame-img"
        src={`/frames/${n}.png`}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      {aside && (
        <div className={`frame-aside frame-aside-${asideSide} reveal`}>
          {aside}
        </div>
      )}
    </div>
  );
}

import React from "react";
import { Composition } from "remotion";
import { PencilLine } from "./PencilLine";
import { Reel, REEL_DURATION } from "./Reel";

/* ---------------------------------------------------------------------------
   Tune these and the line re-renders live in the Remotion Studio (npm run studio).
   FPS * DURATION_SECONDS = number of frames you'll get when rendering a
   PNG sequence. Update TOTAL_FRAMES in components/ScrollLine.js to match
   (or just run `npm run frames`, which prints the count for you).
   --------------------------------------------------------------------------- */
export const FPS = 30;
export const DURATION_SECONDS = 4; // -> 120 frames
export const WIDTH = 1080;
export const HEIGHT = 1920; // vertical, maps to a scrolling page

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="PencilLine"
        component={PencilLine}
        durationInFrames={Math.round(FPS * DURATION_SECONDS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          paper: "#f5f3ee",
          ink: "#2a2824",
          accent: "#bf552b",
        }}
      />
      {/* Instagram Reel — vertical 1080x1920, 20s */}
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={REEL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

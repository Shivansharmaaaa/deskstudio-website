import React, { useEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

const PATH_D = `M 560 60
  C 360 280, 770 400, 600 620
  C 470 800, 300 920, 470 1140
  C 650 1340, 830 1380, 650 1580
  C 580 1670, 540 1720, 560 1770`;

const END = { x: 560, y: 1770 };

/* a small hand-drawn "spark" that resolves at the bottom (matches the site's
   contact section). Eight rays of varying length. */
const Spark = ({ scale, color }) => {
  const rays = [
    [0, 70],
    [45, 42],
    [90, 60],
    [135, 40],
    [180, 66],
    [225, 44],
    [270, 56],
    [315, 38],
  ];
  return (
    <g
      transform={`translate(${END.x} ${END.y}) scale(${scale})`}
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
    >
      {rays.map(([deg, r], i) => {
        const a = (deg * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={0}
            y1={0}
            x2={Math.cos(a) * r}
            y2={Math.sin(a) * r}
          />
        );
      })}
    </g>
  );
};

export const PencilLine = ({
  paper = "#f5f3ee",
  ink = "#2a2824",
  accent = "#bf552b",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  // steady, near-linear draw with the gentlest ease at the ends
  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // measure the path once so we can place the moving pencil tip
  const pathRef = useRef(null);
  const [len, setLen] = useState(0);
  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  let tip = null;
  if (pathRef.current && len) {
    const pt = pathRef.current.getPointAtLength(len * Math.min(progress, 1));
    tip = { x: pt.x, y: pt.y };
  }

  const sparkScale = interpolate(progress, [0.88, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.6)),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: paper }}>
      {/* paper grain */}
      <AbsoluteFill
        style={{
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <filter id="graphite">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.014"
              numOctaves="2"
              seed="7"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
          </filter>
        </defs>

        <g filter="url(#graphite)">
          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke={ink}
            strokeWidth={5}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - progress}
          />
        </g>

        {/* moving pencil tip */}
        {tip && progress > 0.002 && progress < 0.995 && (
          <circle cx={tip.x} cy={tip.y} r={6} fill={ink} />
        )}

        {/* resolving spark at the bottom */}
        {sparkScale > 0 && <Spark scale={sparkScale} color={accent} />}
      </svg>
    </AbsoluteFill>
  );
};

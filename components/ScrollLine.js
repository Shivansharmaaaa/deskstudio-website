"use client";

import { useEffect, useRef } from "react";

/**
 * One continuous hand-drawn line generated from the real on-page positions of
 * each section's anchor ([data-line]). Between anchors it swings out to the
 * extreme left / right edges (big sweeping curves) and curls into loops in the
 * empty margins. It draws/undraws with eased animation as you scroll up & down.
 */

function splinePath(pts, tension = 4) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || pts[i + 1];
    const c1x = p1.x + (p2.x - p0.x) / tension;
    const c1y = p1.y + (p2.y - p0.y) / tension;
    const c2x = p2.x - (p3.x - p1.x) / tension;
    const c2y = p2.y - (p3.y - p1.y) / tension;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(
      1
    )}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

// a clean cursive loop (self-crossing) centred at cx,cy
function loop(cx, cy, r, dir = 1) {
  return [
    { x: cx - r * 0.5 * dir, y: cy + r * 0.9 },
    { x: cx - r * 1.0 * dir, y: cy },
    { x: cx, y: cy - r * 1.05 },
    { x: cx + r * 1.0 * dir, y: cy },
    { x: cx + r * 0.35 * dir, y: cy + r * 0.85 },
    { x: cx - r * 0.25 * dir, y: cy + r * 1.15 },
  ];
}

export default function ScrollLine() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const lenRef = useRef(0);
  const samplesRef = useRef(null);
  const cur = useRef(0); // current drawn length (px along path)

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      const docW = document.documentElement.clientWidth;
      const docH = document.documentElement.scrollHeight;
      svg.setAttribute("width", docW);
      svg.setAttribute("height", docH);
      svg.style.width = docW + "px";
      svg.style.height = docH + "px";

      const anchors = Array.from(document.querySelectorAll("[data-line]"));
      if (anchors.length < 2) return;
      const sy = window.scrollY;
      const sx = window.scrollX;
      const margin = Math.min(70, docW * 0.05);
      const farL = docW * 0.06;
      const farR = docW * 0.94;

      // anchor connection points
      const aps = anchors.map((el) => {
        const r = el.getBoundingClientRect();
        // connect to the CENTRE of each text block / illustration
        let x = r.left + sx + r.width / 2;
        let y = r.top + sy + r.height / 2;
        x = Math.max(30, Math.min(docW - 30, x));
        return { x, y, loop: el.hasAttribute("data-loop") };
      });

      // varied, asymmetric per-gap styles (deterministic so it's stable on
      // resize). mix of straight runs, small curves, big sweeps and one-sided
      // curls — never a predictable alternating zig-zag.
      const STYLES = [
        "smallR",
        "straight",
        "bigR",
        "curlR",
        "smallL",
        "straight",
        "bigL",
        "loopL",
        "smallR",
        "straight",
        "bigR",
        "smallL",
        "loopR",
        "straight",
      ];
      const xOf = (tok) =>
        ({
          smallL: docW * 0.3,
          smallR: docW * 0.7,
          bigL: farL,
          bigR: farR,
          curlL: docW * 0.16,
          curlR: docW * 0.84,
          loopL: docW * 0.12,
          loopR: docW * 0.88,
        }[tok]);
      const r = Math.min(54, docW * 0.04);

      const pts = [];
      pts.push({ x: aps[0].x, y: Math.max(0, aps[0].y - 130) });

      aps.forEach((a, i) => {
        if (i > 0) {
          const prev = aps[i - 1];
          const midY = (prev.y + a.y) / 2;
          const s = a.loop ? (i % 2 ? "loopR" : "loopL") : STYLES[(i - 1) % STYLES.length];
          if (s === "straight") {
            // no waypoint — gentle direct run (sometimes nearly straight)
          } else if (s.startsWith("loop")) {
            const dir = s.endsWith("R") ? -1 : 1;
            loop(xOf(s), midY, r, dir).forEach((p) => pts.push(p));
          } else if (s.startsWith("curl")) {
            const dir = s.endsWith("R") ? -1 : 1;
            const cx = xOf(s);
            // come to one side, curl a little, and stay on that side
            pts.push({ x: cx, y: prev.y + (a.y - prev.y) * 0.32 });
            loop(cx, midY, r * 0.7, dir).forEach((p) => pts.push(p));
            pts.push({ x: cx, y: prev.y + (a.y - prev.y) * 0.8 });
          } else {
            pts.push({ x: xOf(s), y: midY });
          }
        }
        pts.push({ x: a.x, y: a.y });
      });

      // the final anchor is the closing star — tuck the line up into it so the
      // drawing resolves right on the star
      const last = aps[aps.length - 1];
      pts.push({ x: last.x, y: last.y - 34 });

      path.setAttribute("d", splinePath(pts, 4));
      const total = path.getTotalLength();
      lenRef.current = total;
      path.style.strokeDasharray = `${total}`;

      // sample the path so we can map a document-Y to a length-along-path
      const N = 500;
      const samples = new Array(N + 1);
      for (let i = 0; i <= N; i++) {
        const l = (i / N) * total;
        const pt = path.getPointAtLength(l);
        samples[i] = { l, y: pt.y };
      }
      samplesRef.current = samples;

      if (reduce) path.style.strokeDashoffset = "0";
    };

    // length-along-path at the first point the line reaches document-Y = yr
    const lenAtY = (yr) => {
      const s = samplesRef.current;
      if (!s || !s.length) return 0;
      for (let i = 1; i < s.length; i++) {
        if (s[i].y > yr) {
          const a = s[i - 1];
          const b = s[i];
          const t = b.y === a.y ? 0 : (yr - a.y) / (b.y - a.y);
          return a.l + (b.l - a.l) * Math.max(0, Math.min(1, t));
        }
      }
      return lenRef.current;
    };

    let raf;
    const tick = () => {
      const total = lenRef.current;
      if (total) {
        // draw the line up to the point that is ~1/3 down the viewport, so the
        // drawing tip tracks the scroll (forward when going down, back when up)
        const revealY = window.scrollY + (window.innerHeight * 2) / 3;
        const targetLen = lenAtY(revealY);
        cur.current += (targetLen - cur.current) * 0.14;
        if (Math.abs(targetLen - cur.current) < 0.5) cur.current = targetLen;
        path.style.strokeDashoffset = `${total - cur.current}`;
      }
      raf = requestAnimationFrame(tick);
    };

    build();
    if (!reduce) {
      cur.current = 0;
      raf = requestAnimationFrame(tick);
    }

    const t1 = setTimeout(build, 350);
    const t2 = setTimeout(build, 1200);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    window.addEventListener("load", build);

    let rt = null;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(rt);
      window.removeEventListener("load", build);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="line-svg-layer" aria-hidden="true">
      <svg ref={svgRef} className="line-svg" fill="none">
        <path
          ref={pathRef}
          d=""
          stroke="var(--ink)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "url(#pencilLine)" }}
        />
      </svg>
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <filter id="pencilLine">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed="4"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

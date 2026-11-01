/* Hand-drawn line illustrations. All inherit `currentColor` and the global
   #sketch filter (defined once in page.js) for a wobbly pencil look. */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  filter: "url(#sketch)",
};

export const Desk = (props) => (
  <svg viewBox="0 -64 200 224" style={{ overflow: "visible" }} {...props}>
    <style>{`
      @keyframes dsk-smoke {
        0%   { opacity: 0; transform: translateY(0) scaleX(1); }
        25%  { opacity: .75; }
        100% { opacity: 0; transform: translateY(-22px) scaleX(1.35); }
      }
      @keyframes dsk-check {
        0%   { opacity: 0; transform: scale(0); }
        8%   { opacity: 1; transform: scale(1.3); }
        16%  { transform: scale(1); }
        90%  { opacity: 1; }
        100% { opacity: 0; transform: scale(1); }
      }
      @keyframes dsk-pop {
        0%   { opacity: 0; transform: translateY(8px) scale(.7); }
        14%  { opacity: 1; transform: translateY(0) scale(1); }
        68%  { opacity: 1; }
        100% { opacity: 0; transform: translateY(-12px) scale(1); }
      }
      @keyframes dsk-fall {
        0%   { opacity: 0; transform: translate(0,0) rotate(0deg); }
        12%  { opacity: 1; }
        100% { opacity: 0; transform: translate(26px,86px) rotate(140deg); }
      }
      @keyframes dsk-bounce {
        0%,100% { transform: translateY(-34px); animation-timing-function: cubic-bezier(.5,0,1,.5); }
        45%     { transform: translateY(0);     animation-timing-function: cubic-bezier(0,.5,.5,1); }
        55%     { transform: translateY(-2px); }
      }
      .dsk-smoke { animation: dsk-smoke 3s ease-in-out infinite; transform-box: fill-box; transform-origin: bottom center; }
      .dsk-smoke.s2 { animation-delay: 1s; }
      .dsk-smoke.s3 { animation-delay: 2s; }
      .dsk-paper { animation: dsk-fall 4.2s ease-in infinite; transform-box: fill-box; transform-origin: center; }
      .dsk-paper.p2 { animation-delay: 2.1s; }
      .dsk-ball { animation: dsk-bounce 1.5s infinite; transform-box: fill-box; transform-origin: center; }
      .dsk-check { animation: dsk-check 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; opacity: 0; }
      .dsk-check.c2 { animation-delay: 1.2s; }
      .dsk-check.c3 { animation-delay: 2.4s; }
      .dsk-check.c4 { animation-delay: 3.4s; }
      .dsk-word { animation: dsk-pop 4.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; opacity: 0; font-family: var(--font-body); font-size: 9px; letter-spacing: .3px; }
      .dsk-word.w2 { animation-delay: 1s; }
      .dsk-word.w3 { animation-delay: 2s; }
      .dsk-word.w4 { animation-delay: 3s; }
      .dsk-word.w5 { animation-delay: 3.9s; }
      @media (prefers-reduced-motion: reduce) {
        .dsk-smoke, .dsk-paper, .dsk-ball, .dsk-check, .dsk-word { animation: none; opacity: 1; }
        .dsk-smoke { opacity: .4; }
      }
    `}</style>

    {/* desk */}
    <g {...base}>
      <path d="M20 70 L180 70" />
      <path d="M20 70 L40 58 L172 58 L180 70" />
      <path d="M30 70 L30 130 M40 70 L40 120" />
      <path d="M170 70 L170 130 M150 70 L150 122" />
      <rect x="120" y="74" width="40" height="46" rx="3" />
      <path d="M126 96 L140 96" />
    </g>

    {/* coffee mug */}
    <g {...base}>
      <path d="M62 46 L64 60 Q74 64 84 60 L86 46" />
      <ellipse cx="74" cy="46" rx="12" ry="3.5" />
      <path d="M86 49 q9 1 7 8 q-1 4 -7 3.5" />
    </g>

    {/* rising smoke */}
    <g {...base} strokeWidth={1.6}>
      <path className="dsk-smoke s1" d="M70 44 q-5 -6 0 -12 q5 -6 0 -12" />
      <path className="dsk-smoke s2" d="M74 44 q5 -6 0 -12 q-5 -6 0 -12" />
      <path className="dsk-smoke s3" d="M78 44 q-4 -6 0 -11 q4 -6 0 -11" />
    </g>

    {/* papers fluttering off the edge */}
    <g {...base} strokeWidth={1.6}>
      <g className="dsk-paper p1">
        <rect x="150" y="54" width="18" height="13" rx="1.5" />
        <path d="M153 58 H165 M153 61 H162" />
      </g>
      <g className="dsk-paper p2">
        <rect x="156" y="56" width="18" height="13" rx="1.5" />
        <path d="M159 60 H171 M159 63 H168" />
      </g>
    </g>

    {/* bouncing ball */}
    <g {...base} strokeWidth={1.6}>
      <circle className="dsk-ball" cx="112" cy="54" r="5" />
    </g>

    {/* calendar floating above the desk */}
    <g {...base} strokeWidth={1.7}>
      <rect x="86" y="-42" width="58" height="46" rx="3" />
      <path d="M99 -48 L99 -38 M131 -48 L131 -38" />
      <path d="M86 -30 H144" />
      <path d="M92 -36 H118" />
      {/* grid */}
      <path d="M105 -30 V4 M124 -30 V4 M86 -18 H144 M86 -6 H144" />
    </g>

    {/* booking check-marks popping in */}
    <g {...base} strokeWidth={2}>
      <path className="dsk-check c1" d="M93 -25 l2 2.5 l5 -6" />
      <path className="dsk-check c2" d="M112 -25 l2 2.5 l5 -6" />
      <path className="dsk-check c3" d="M131 -13 l2 2.5 l5 -6" />
      <path className="dsk-check c4" d="M93 -1 l2 2.5 l5 -6" />
    </g>

    {/* words popping around the calendar */}
    <g fill="currentColor" stroke="none" textAnchor="middle">
      <text className="dsk-word w1" x="46" y="-46">Booking ✓</text>
      <text className="dsk-word w2" x="170" y="-34">Reminder</text>
      <text className="dsk-word w3" x="40" y="-2">Call scheduled</text>
      <text className="dsk-word w4" x="176" y="6">Client found</text>
      <text className="dsk-word w5" x="150" y="-54">New lead</text>
    </g>
  </svg>
);

export const Monitor = (props) => (
  <svg viewBox="0 -44 200 224" style={{ overflow: "visible" }} {...props}>
    <style>{`
      @keyframes mon-grow {
        0%   { transform: scaleY(.12); }
        45%  { transform: scaleY(1); }
        60%  { transform: scaleY(1); }
        100% { transform: scaleY(.12); }
      }
      @keyframes mon-draw {
        0%   { stroke-dashoffset: 230; opacity: 0; }
        8%   { opacity: 1; }
        45%  { stroke-dashoffset: 0; }
        85%  { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
      }
      @keyframes mon-pop {
        0%   { opacity: 0; transform: translateY(8px) scale(.7); }
        14%  { opacity: 1; transform: translateY(0) scale(1); }
        68%  { opacity: 1; }
        100% { opacity: 0; transform: translateY(-12px) scale(1); }
      }
      .mon-bar { animation: mon-grow 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
      .mon-bar.b2 { animation-delay: .3s; }
      .mon-bar.b3 { animation-delay: .6s; }
      .mon-bar.b4 { animation-delay: .9s; }
      .mon-line { stroke-dasharray: 230; animation: mon-draw 3.4s ease-in-out infinite; }
      .mon-word { animation: mon-pop 4.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; opacity: 0; font-family: var(--font-body); font-size: 10px; letter-spacing: .3px; }
      .mon-word.m2 { animation-delay: 1.1s; }
      .mon-word.m3 { animation-delay: 2.2s; }
      .mon-word.m4 { animation-delay: 3.2s; }
      @media (prefers-reduced-motion: reduce) {
        .mon-bar, .mon-line, .mon-word { animation: none; opacity: 1; }
        .mon-bar { transform: none; }
      }
    `}</style>

    {/* monitor frame + stand */}
    <g {...base}>
      <rect x="34" y="24" width="132" height="86" rx="6" />
      <path d="M100 110 L100 132" />
      <path d="M72 140 L128 140" />
      <path d="M88 132 L112 132 L120 140 L80 140 Z" />
      <path d="M44 100 H156" />
    </g>

    {/* growing bar chart */}
    <g {...base} strokeWidth={1.6} fill="none">
      <rect className="mon-bar b1" x="52" y="74" width="13" height="26" />
      <rect className="mon-bar b2" x="74" y="60" width="13" height="40" />
      <rect className="mon-bar b3" x="96" y="68" width="13" height="32" />
      <rect className="mon-bar b4" x="118" y="48" width="13" height="52" />
    </g>

    {/* self-drawing rising trend line + arrow */}
    <g {...base} strokeWidth={1.8}>
      <path className="mon-line" d="M48 92 L72 78 L96 82 L120 58 L150 44" />
      <path className="mon-line" d="M150 44 L140 46 M150 44 L150 56" />
    </g>

    {/* popping metric words */}
    <g fill="currentColor" stroke="none" textAnchor="middle">
      <text className="mon-word m1" x="176" y="2">+128%</text>
      <text className="mon-word m2" x="26" y="34">Traffic ↑</text>
      <text className="mon-word m3" x="184" y="64">Leads</text>
      <text className="mon-word m4" x="40" y="-14">Automated ✓</text>
    </g>
  </svg>
);

/* tiny tool glyphs inside the hub-network nodes */
const hubGlyph = (i, x, y) => {
  switch (i % 6) {
    case 0: // envelope
      return (
        <g key="g">
          <rect x={x - 7} y={y - 5} width="14" height="10" rx="1.5" />
          <path d={`M ${x - 7} ${y - 4} L ${x} ${y + 2} L ${x + 7} ${y - 4}`} />
        </g>
      );
    case 1: // chat
      return (
        <g key="g">
          <rect x={x - 7} y={y - 6} width="14" height="10" rx="3" />
          <path d={`M ${x - 3} ${y + 4} L ${x - 5} ${y + 7} L ${x - 1} ${y + 4}`} />
        </g>
      );
    case 2: // calendar
      return (
        <g key="g">
          <rect x={x - 7} y={y - 5} width="14" height="11" rx="1.5" />
          <path
            d={`M ${x - 7} ${y - 1} H ${x + 7} M ${x - 3} ${y - 8} V ${y - 4} M ${x + 3} ${y - 8} V ${y - 4}`}
          />
        </g>
      );
    case 3: // gear
      return (
        <g key="g">
          <circle cx={x} cy={y} r="4" />
          <path
            d={`M ${x} ${y - 8} V ${y - 5} M ${x} ${y + 5} V ${y + 8} M ${x - 8} ${y} H ${x - 5} M ${x + 5} ${y} H ${x + 8}`}
          />
        </g>
      );
    case 4: // document
      return (
        <g key="g">
          <rect x={x - 6} y={y - 8} width="12" height="16" rx="1.5" />
          <path d={`M ${x - 3} ${y - 3} H ${x + 3} M ${x - 3} ${y + 1} H ${x + 3} M ${x - 3} ${y + 5} H ${x + 1}`} />
        </g>
      );
    default: // phone
      return (
        <g key="g">
          <rect x={x - 5} y={y - 8} width="10" height="16" rx="3" />
          <path d={`M ${x - 2} ${y + 5} H ${x + 2}`} />
        </g>
      );
  }
};

export const HubNetwork = (props) => {
  const C = 150;
  const R = 116;
  const angles = [-90, -34, 30, 90, 150, 214];
  const nodes = angles.map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { x: C + Math.cos(a) * R, y: C + Math.sin(a) * R };
  });
  const wire = (n, i) =>
    `M ${n.x.toFixed(1)} ${n.y.toFixed(1)} Q ${((n.x + C) / 2 + (i % 2 ? 22 : -22)).toFixed(1)} ${((n.y + C) / 2).toFixed(1)} ${C} ${C}`;

  return (
    <svg viewBox="0 0 300 300" style={{ overflow: "visible" }} {...props}>
      <style>{`
        @keyframes hub-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        .hub { animation: hub-breathe 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .hub { animation: none; } .hub-pulse { display: none; } }
      `}</style>

      {/* wires */}
      <g {...base} strokeWidth={1.6}>
        {nodes.map((n, i) => (
          <path key={i} d={wire(n, i)} opacity="0.45" />
        ))}
      </g>

      {/* pulses of data flowing into the hub */}
      <g fill="currentColor" stroke="none">
        {nodes.map((n, i) => (
          <circle key={i} className="hub-pulse" r="3.4" opacity="0">
            <animateMotion
              dur="2.6s"
              begin={`${(i * 0.42).toFixed(2)}s`}
              repeatCount="indefinite"
              path={wire(n, i)}
            />
            <animate
              attributeName="opacity"
              dur="2.6s"
              begin={`${(i * 0.42).toFixed(2)}s`}
              repeatCount="indefinite"
              values="0;1;1;0"
              keyTimes="0;0.15;0.8;1"
            />
          </circle>
        ))}
      </g>

      {/* outer tool nodes */}
      <g {...base} strokeWidth={1.6}>
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="16" />
            {hubGlyph(i, n.x, n.y)}
          </g>
        ))}
      </g>

      {/* central hub with a spark */}
      <g className="hub" {...base} strokeWidth={2}>
        <rect x={C - 26} y={C - 26} width="52" height="52" rx="13" />
        <path
          d={`M ${C} ${C - 13} V ${C + 13} M ${C - 13} ${C} H ${C + 13} M ${C - 9} ${C - 9} L ${C + 9} ${C + 9} M ${C + 9} ${C - 9} L ${C - 9} ${C + 9}`}
        />
      </g>
    </svg>
  );
};

const gearTeeth = (cx, cy, r, n, len = 6) =>
  Array.from({ length: n }).map((_, i) => {
    const a = (i / n) * Math.PI * 2;
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * r}
        y1={cy + Math.sin(a) * r}
        x2={cx + Math.cos(a) * (r + len)}
        y2={cy + Math.sin(a) * (r + len)}
      />
    );
  });

const Gear = ({ cx, cy, r, n, cls }) => (
  <g className={cls} {...base} strokeWidth={2}>
    <circle cx={cx} cy={cy} r={r} />
    <circle cx={cx} cy={cy} r={r * 0.3} />
    {gearTeeth(cx, cy, r, n)}
  </g>
);

export const Gears = (props) => (
  <svg viewBox="0 0 200 200" style={{ overflow: "visible" }} {...props}>
    <style>{`
      @keyframes gear-cw  { to { transform: rotate(360deg); } }
      @keyframes gear-ccw { to { transform: rotate(-360deg); } }
      @keyframes gear-pop {
        0%   { opacity: 0; transform: translateY(8px) scale(.7); }
        16%  { opacity: 1; transform: translateY(0) scale(1); }
        70%  { opacity: 1; }
        100% { opacity: 0; transform: translateY(-12px) scale(1); }
      }
      .gear-a { animation: gear-cw 9s linear infinite;  transform-box: fill-box; transform-origin: center; }
      .gear-b { animation: gear-ccw 6.5s linear infinite; transform-box: fill-box; transform-origin: center; }
      .gear-c { animation: gear-cw 5s linear infinite;  transform-box: fill-box; transform-origin: center; }
      .gear-word { animation: gear-pop 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; opacity: 0; font-family: var(--font-body); font-size: 10px; letter-spacing: .3px; }
      .gear-word.g2 { animation-delay: 1.6s; }
      .gear-word.g3 { animation-delay: 3.2s; }
      @media (prefers-reduced-motion: reduce) {
        .gear-a, .gear-b, .gear-c, .gear-word { animation: none; opacity: 1; }
      }
    `}</style>
    <Gear cx={80} cy={112} r={36} n={11} cls="gear-a" />
    <Gear cx={134} cy={130} r={22} n={8} cls="gear-b" />
    <Gear cx={122} cy={70} r={18} n={7} cls="gear-c" />
    <g fill="currentColor" stroke="none" textAnchor="middle">
      <text className="gear-word g1" x="78" y="40">Build</text>
      <text className="gear-word g2" x="176" y="118">Grow</text>
      <text className="gear-word g3" x="150" y="176">Scale</text>
    </g>
  </svg>
);

export const Lightbulb = (props) => (
  <svg viewBox="0 0 160 224" style={{ overflow: "visible" }} {...props}>
    <style>{`
      @keyframes bulb-ring { 0% { opacity: .55; transform: scale(.35); } 75% { opacity: 0; } 100% { opacity: 0; transform: scale(1.5); } }
      @keyframes bulb-flicker { 0%,17%,21%,59%,63%,100% { opacity: 1; } 19% { opacity: .3; } 61% { opacity: .55; } }
      @keyframes ray-twinkle { 0%,100% { opacity: .25; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.15); } }
      .glow-ring { animation: bulb-ring 3s ease-out infinite; transform-box: fill-box; transform-origin: center; }
      .glow-ring.r2 { animation-delay: 1s; }
      .glow-ring.r3 { animation-delay: 2s; }
      .fil { animation: bulb-flicker 3.6s ease-in-out infinite; }
      .ray { animation: ray-twinkle 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
      .ray.y2 { animation-delay: .35s; }
      .ray.y3 { animation-delay: .7s; }
      .ray.y4 { animation-delay: 1.05s; }
      .ray.y5 { animation-delay: 1.4s; }
      @media (prefers-reduced-motion: reduce) {
        .glow-ring, .fil, .ray { animation: none; }
        .glow-ring { opacity: 0; }
      }
    `}</style>

    {/* expanding glow rings */}
    <g {...base} strokeWidth={1.3}>
      <circle className="glow-ring r1" cx="80" cy="84" r="30" />
      <circle className="glow-ring r2" cx="80" cy="84" r="30" />
      <circle className="glow-ring r3" cx="80" cy="84" r="30" />
    </g>

    {/* bulb */}
    <g {...base}>
      <path d="M80 30 C 40 30, 24 64, 40 96 C 50 116, 56 120, 58 140 L102 140 C 104 120, 110 116, 120 96 C 136 64, 120 30, 80 30 Z" />
      <path d="M62 152 L98 152 M64 164 L96 164" />
      <path d="M70 176 C 74 184, 86 184, 90 176" />
      <path className="fil" d="M68 96 C 74 84, 78 108, 80 90 C 82 108, 86 84, 92 96" />
    </g>

    {/* twinkling rays */}
    <g {...base} strokeWidth={2}>
      <path className="ray y1" d="M80 4 L80 18" />
      <path className="ray y2" d="M30 18 L39 29" />
      <path className="ray y3" d="M130 18 L121 29" />
      <path className="ray y4" d="M10 58 L23 61" />
      <path className="ray y5" d="M150 58 L137 61" />
    </g>
  </svg>
);

export const Photo = (props) => (
  <svg viewBox="0 0 120 100" {...props}>
    <g {...base}>
      <rect x="8" y="8" width="104" height="84" rx="4" />
      <circle cx="40" cy="34" r="8" />
      <path d="M18 80 L46 50 L66 70 L84 52 L102 80" />
    </g>
  </svg>
);

export const Article = (props) => (
  <svg viewBox="0 0 110 140" {...props}>
    <g {...base}>
      <rect x="10" y="8" width="90" height="124" rx="5" />
      <circle cx="38" cy="40" r="8" />
      <path d="M20 64 L40 44 L56 60 L70 48 L90 64" />
      <path d="M22 86 L88 86 M22 100 L88 100 M22 114 L66 114" />
    </g>
  </svg>
);

export const Spark = (props) => (
  <svg viewBox="0 0 80 80" {...props}>
    <g {...base}>
      <path d="M40 8 L40 72 M8 40 L72 40 M17 17 L63 63 M63 17 L17 63" />
    </g>
  </svg>
);

export const Newspaper = (props) => {
  // text lines that "print in" (left col under image, full-width rows, right col)
  const lines = [
    { x1: 110, y: 92, x2: 170 },
    { x1: 110, y: 102, x2: 170 },
    { x1: 110, y: 112, x2: 168 },
    { x1: 110, y: 122, x2: 170 },
    { x1: 44, y: 140, x2: 170 },
    { x1: 44, y: 150, x2: 170 },
    { x1: 44, y: 160, x2: 166 },
    { x1: 44, y: 170, x2: 150 },
  ];
  return (
    <svg viewBox="0 0 220 210" style={{ overflow: "visible" }} {...props}>
      <style>{`
        @keyframes np-print {
          0%   { stroke-dashoffset: 160; opacity: 0; }
          6%   { opacity: 1; }
          38%  { stroke-dashoffset: 0; }
          86%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes np-edition {
          0%   { opacity: 0; transform: translateY(26px); }
          18%  { opacity: .45; }
          60%  { opacity: .45; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(0); }
        }
        @keyframes np-curl { 0%,70%,100% { transform: scale(1); } 82% { transform: scale(1.18) rotate(-6deg); } }
        @keyframes np-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .np-line { stroke-dasharray: 160; animation: np-print 6s ease-in-out infinite; }
        .np-edition { animation: np-edition 6s ease-in-out infinite; transform-box: fill-box; }
        .np-curl { animation: np-curl 6s ease-in-out infinite; transform-box: fill-box; transform-origin: top right; }
        .np-sheet { animation: np-bob 5s ease-in-out infinite; transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) {
          .np-line, .np-edition, .np-curl, .np-sheet { animation: none; opacity: 1; }
          .np-edition { opacity: 0; }
          .np-line { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* fresh edition sliding up behind */}
      <g className="np-edition" {...base} strokeWidth={1.6}>
        <rect x="40" y="22" width="160" height="176" rx="3" />
      </g>

      <g className="np-sheet">
        {/* sheet */}
        <g {...base} strokeWidth={1.8}>
          <rect x="30" y="18" width="160" height="178" rx="3" />
          {/* masthead */}
          <path d="M44 30 H176" />
          <path d="M64 39 H156" strokeWidth={4} />
          <path d="M44 48 H176" />
        </g>
        {/* headline (bold) */}
        <g {...base} strokeLinecap="round">
          <path className="np-line" d="M44 62 H160" strokeWidth={3.4} />
          <path className="np-line" d="M44 73 H126" strokeWidth={3.4} style={{ animationDelay: ".2s" }} />
        </g>
        {/* image box with mini mountain */}
        <g {...base} strokeWidth={1.6}>
          <rect x="44" y="84" width="56" height="42" rx="2" />
          <circle cx="58" cy="98" r="4" />
          <path d="M48 120 L66 102 L80 114 L96 96" />
        </g>
        {/* printing text lines */}
        <g {...base} strokeWidth={1.5} strokeLinecap="round">
          {lines.map((l, i) => (
            <path
              key={i}
              className="np-line"
              d={`M${l.x1} ${l.y} H${l.x2}`}
              style={{ animationDelay: `${(i * 0.18).toFixed(2)}s` }}
            />
          ))}
        </g>
        {/* flipping corner */}
        <g className="np-curl" {...base} strokeWidth={1.6}>
          <path d="M176 18 L190 18 L190 32 Z" />
        </g>
      </g>
    </svg>
  );
};

export const CareerSteps = (props) => {
  const J = "M24 180 C 78 172, 52 112, 110 110 C 168 108, 146 58, 198 50";
  return (
    <svg viewBox="0 0 230 200" style={{ overflow: "visible" }} {...props}>
      <style>{`
        @keyframes cp-flow { to { stroke-dashoffset: -27; } }
        @keyframes cp-wave { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(.68); } }
        .cp-trail { stroke-dasharray: 2 7; animation: cp-flow 1.4s linear infinite; }
        .cp-flag { animation: cp-wave 1.3s ease-in-out infinite; transform-box: fill-box; transform-origin: left center; }
        @media (prefers-reduced-motion: reduce) { .cp-trail, .cp-flag { animation: none; } }
      `}</style>

      {/* dotted journey trail */}
      <g {...base} strokeWidth={2.2} strokeLinecap="round">
        <path className="cp-trail" d={J} />
      </g>

      {/* milestone markers */}
      <g {...base} strokeWidth={1.8} fill="var(--paper)">
        <circle cx="24" cy="180" r="4.5" />
        <circle cx="110" cy="110" r="4.5" />
      </g>

      {/* goal flag */}
      <g {...base} strokeWidth={2}>
        <path d="M198 50 V16" />
        <path className="cp-flag" d="M198 18 L224 26 L198 34 Z" />
      </g>

      {/* traveling location pin */}
      <g {...base} strokeWidth={2} opacity="0">
        <path d="M0 0 C -9 -12, -9 -25, 0 -29 C 9 -25, 9 -12, 0 0 Z" fill="var(--paper)" />
        <circle cx="0" cy="-18" r="4.2" fill="var(--paper)" />
        <animateMotion dur="5s" repeatCount="indefinite" path={J} />
        <animate
          attributeName="opacity"
          dur="5s"
          repeatCount="indefinite"
          values="0;1;1;1;0"
          keyTimes="0;0.05;0.5;0.92;1"
        />
      </g>
    </svg>
  );
};

export const Whisper = (props) => {
  const words = ["Made life easier", "Saved us hours", "Highly recommend"];
  return (
    <svg viewBox="0 0 270 200" style={{ overflow: "visible" }} {...props}>
      <style>{`
        @keyframes ws-lean { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(4deg); } }
        @keyframes ws-dot  { 0%,100% { opacity: .15; } 50% { opacity: 1; } }
        @keyframes ws-flow {
          0%   { opacity: 0; transform: translate(0,0); }
          7%   { opacity: 1; transform: translate(16px,-5px); }
          26%  { opacity: 1; transform: translate(92px,-7px); }
          33%  { opacity: 0; transform: translate(112px,-2px); }
          100% { opacity: 0; transform: translate(112px,-2px); }
        }
        .ws-lean { animation: ws-lean 4.5s ease-in-out infinite; transform-box: fill-box; transform-origin: 64px 168px; }
        .ws-dot  { animation: ws-dot 1.6s ease-in-out infinite; }
        .ws-dot.d2 { animation-delay: .3s; }
        .ws-dot.d3 { animation-delay: .6s; }
        .ws-word { animation: ws-flow 9s ease-in-out infinite; transform-box: fill-box; transform-origin: center; opacity: 0; }
        .ws-word.w2 { animation-delay: 3s; }
        .ws-word.w3 { animation-delay: 6s; }
        @media (prefers-reduced-motion: reduce) {
          .ws-lean, .ws-dot, .ws-word { animation: none; }
          .ws-word.w1 { opacity: 1; }
        }
      `}</style>

      {/* person A — leaning in to whisper */}
      <g className="ws-lean">
        <g {...base}>
          {/* hair + head */}
          <path d="M44 56 Q46 36 64 36 Q82 36 84 56" />
          <circle cx="64" cy="62" r="19" />
          {/* neck + shoulders (bust) */}
          <path d="M57 80 L57 100 M71 80 L71 100" />
          <path d="M32 168 C 34 116, 48 100, 64 100 C 80 100, 94 116, 96 168" />
          {/* smile */}
          <path d="M55 70 q9 7 18 0" />
        </g>
        {/* eyes */}
        <g fill="currentColor" stroke="none">
          <circle cx="57" cy="60" r="1.9" />
          <circle cx="69" cy="60" r="1.9" />
        </g>
        {/* whisper dots */}
        <g fill="currentColor" stroke="none">
          <circle className="ws-dot d1" cx="90" cy="66" r="2.2" />
          <circle className="ws-dot d2" cx="96" cy="63" r="2.2" />
          <circle className="ws-dot d3" cx="102" cy="60" r="2.2" />
        </g>
      </g>

      {/* person B — listening, smiling */}
      <g>
        <g {...base}>
          <path d="M186 54 Q188 36 206 36 Q222 36 224 52" />
          <circle cx="204" cy="62" r="19" />
          <path d="M197 80 L197 100 M211 80 L211 100" />
          <path d="M172 168 C 174 116, 188 100, 204 100 C 220 100, 234 116, 236 168" />
          {/* smile */}
          <path d="M194 70 q10 7 20 0" />
        </g>
        <g fill="currentColor" stroke="none">
          <circle cx="197" cy="60" r="1.9" />
          <circle cx="211" cy="60" r="1.9" />
        </g>
      </g>

      {/* kind words flowing from A to B, one at a time */}
      <g fill="currentColor" stroke="none" textAnchor="middle">
        {words.map((w, i) => (
          <text
            key={i}
            className={`ws-word w${i + 1}`}
            x="92"
            y="34"
            fontFamily="var(--font-body)"
            fontSize="11"
          >
            {w}
          </text>
        ))}
      </g>
    </svg>
  );
};

/* What-we-do icons */
export const IconBuild = (props) => (
  <svg viewBox="0 0 48 48" {...props}>
    <g {...base} strokeWidth={1.8}>
      <path d="M24 6l16 9v18l-16 9-16-9V15z" />
      <path d="M24 6v18M24 24l16-9M24 24L8 15" />
    </g>
  </svg>
);
export const IconGrow = (props) => (
  <svg viewBox="0 0 48 48" {...props}>
    <g {...base} strokeWidth={1.8}>
      <path d="M8 40h32M12 40V28M22 40V18M32 40V24M42 40V12" />
      <path d="M12 26l10-10 8 6 12-12" />
    </g>
  </svg>
);
export const IconScale = (props) => (
  <svg viewBox="0 0 48 48" {...props}>
    <g {...base} strokeWidth={1.8}>
      <path d="M24 40c8-6 14-13 14-22a14 14 0 00-28 0c0 9 6 16 14 22z" />
      <circle cx="24" cy="18" r="5" />
    </g>
  </svg>
);
export const IconLearn = (props) => (
  <svg viewBox="0 0 48 48" {...props}>
    <g {...base} strokeWidth={1.8}>
      <path d="M4 18L24 9l20 9-20 9z" />
      <path d="M12 22v9c0 2 5 5 12 5s12-3 12-5v-9M44 18v9" />
    </g>
  </svg>
);

/* Social glyphs */
export const Twitter = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <g {...base} strokeWidth={1.6}>
      <path d="M22 5.5c-.7.4-1.5.6-2.3.8.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 8.5c0 .3 0 .6.1.9A11 11 0 0 1 4 4.5a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.7-.5a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 3 18a11 11 0 0 0 6 1.8c7.2 0 11.1-6 11.1-11.1v-.5c.8-.6 1.4-1.3 1.9-2.2z" />
    </g>
  </svg>
);
export const LinkedIn = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <g {...base} strokeWidth={1.6}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" />
    </g>
  </svg>
);
export const Instagram = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <g {...base} strokeWidth={1.6}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7v.01" />
    </g>
  </svg>
);
export const Dribbble = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <g {...base} strokeWidth={1.6}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5 7c4 3 9 4 14 3M8 21c1.5-7 4-10 9-11M3.5 13c5-1 9 .5 12 5" />
    </g>
  </svg>
);

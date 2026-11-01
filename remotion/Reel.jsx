import React, { Fragment } from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import PINS from "../public/reel/pinterest/manifest.json";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { flip } from "@remotion/transitions/flip";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { loadFont as loadKalam } from "@remotion/google-fonts/Kalam";

const { fontFamily: CAVEAT } = loadCaveat();
const { fontFamily: KALAM } = loadKalam();

const PAPER = "#f4f1ea";
const INK = "#1d1b16";
const GREY = "#8a857c";
const MUTED = "#b9b4a8";
const ACCENT = "#f2552c";

/* ===================== wrappers / motion ===================== */
const Grain = ({ light = true }) => (
  <AbsoluteFill
    style={{
      opacity: light ? 0.05 : 0.07,
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />
);

const Slide = ({ bg = PAPER, children, swipe = false, zoom = true, align = "center" }) => {
  const frame = useCurrentFrame();
  const scale = zoom
    ? interpolate(frame, [0, 70], [1.06, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.ease) })
    : 1;
  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      <Grain light={bg === PAPER} />
      {swipe && <Swipe />}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          alignItems: "center",
          justifyContent: align === "center" ? "center" : align,
          padding: "120px 90px",
          textAlign: "center",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Rise = ({ children, delay = 0, y = 42, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200, mass: 0.6 } });
  return <div style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [y, 0])}px)`, ...style }}>{children}</div>;
};

const Pop = ({ children, delay = 0, from = 0.5, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 11, stiffness: 130, mass: 0.7 } });
  return <div style={{ opacity: Math.min(1, s * 1.5), transform: `scale(${interpolate(s, [0, 1], [from, 1])})`, ...style }}>{children}</div>;
};

const SlideInX = ({ children, delay = 0, from = 200, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 110 } });
  return <div style={{ opacity: s, transform: `translateX(${interpolate(s, [0, 1], [from, 0])}px)`, ...style }}>{children}</div>;
};

const Swipe = ({ delay = 0, color = ACCENT }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [delay, delay + 20], [-130, 130], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const op = interpolate(frame, [delay, delay + 5, delay + 15, delay + 20], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${x}%`, width: "55%", background: color, opacity: op * 0.9, transform: "skewX(-12deg)" }} />
    </AbsoluteFill>
  );
};

const Dots = ({ color = ACCENT }) => {
  const frame = useCurrentFrame();
  const items = [{ x: 12, y: 22, r: 10, s: 0 }, { x: 84, y: 16, r: 14, s: 20 }, { x: 22, y: 80, r: 8, s: 40 }, { x: 80, y: 74, r: 12, s: 12 }, { x: 50, y: 10, r: 7, s: 30 }];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {items.map((d, i) => {
        const t = (frame + d.s) % 90;
        const op = interpolate(t, [0, 20, 70, 90], [0, 0.8, 0.8, 0]);
        const dy = interpolate(t, [0, 90], [0, -40]);
        return <div key={i} style={{ position: "absolute", left: `${d.x}%`, top: `${d.y}%`, width: d.r * 2, height: d.r * 2, borderRadius: "50%", background: color, opacity: op, transform: `translateY(${dy}px)` }} />;
      })}
    </AbsoluteFill>
  );
};

const Title = ({ children, size = 140, color = INK }) => (
  <div style={{ fontFamily: CAVEAT, fontWeight: 700, fontSize: size, lineHeight: 1.0, color, letterSpacing: 1 }}>{children}</div>
);
const Body = ({ children, size = 48, color = GREY, style }) => (
  <div style={{ fontFamily: KALAM, fontSize: size, color, lineHeight: 1.45, ...style }}>{children}</div>
);

const Mark = ({ children, delay = 6, color = ACCENT, text = INK }) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <span style={{ position: "relative", display: "inline-block", padding: "0 .1em" }}>
      <span style={{ position: "absolute", left: 0, right: 0, top: "16%", bottom: "14%", background: color, transform: `scaleX(${w})`, transformOrigin: "left", zIndex: 0 }} />
      <span style={{ position: "relative", zIndex: 1, color: text }}>{children}</span>
    </span>
  );
};

const Icon = ({ type, size = 92, color = INK, sw = 4 }) => {
  const c = { fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  const p = {
    build: <path d="M24 6l16 9v18l-16 9-16-9V15z M24 6v18M24 24l16-9M24 24L8 15" />,
    grow: <path d="M8 40h32M12 40V28M22 40V18M32 40V24M42 40V12 M12 26l10-10 8 6 12-12" />,
    scale: (<><path d="M24 40c8-6 14-13 14-22a14 14 0 00-28 0c0 9 6 16 14 22z" /><circle cx="24" cy="18" r="5" /></>),
    learn: <path d="M4 18L24 9l20 9-20 9z M12 22v9c0 2 5 5 12 5s12-3 12-5v-9M44 18v9" />,
    mail: <><rect x="6" y="12" width="36" height="26" rx="3" /><path d="M6 14 L24 28 L42 14" /></>,
    cal: <><rect x="8" y="12" width="32" height="30" rx="3" /><path d="M8 20 H40 M16 8 V14 M32 8 V14" /></>,
    bell: <path d="M24 8 a10 10 0 0 1 10 10 c0 8 4 10 4 14 H10 c0-4 4-6 4-14 a10 10 0 0 1 10-10z M20 42 a4 4 0 0 0 8 0" />,
    doc: <><rect x="12" y="8" width="24" height="32" rx="2" /><path d="M18 18 H30 M18 24 H30 M18 30 H26" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 48 48"><g {...c}>{p[type]}</g></svg>;
};

const Spark = ({ delay = 2, color = INK }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 150 } });
  return (
    <div style={{ transform: `scale(${s}) rotate(${interpolate(s, [0, 1], [-50, 0])}deg)` }}>
      <svg width="120" height="120" viewBox="0 0 80 80"><g stroke={color} strokeWidth="4" strokeLinecap="round"><path d="M40 8 L40 72 M8 40 L72 40 M17 17 L63 63 M63 17 L17 63" /></g></svg>
    </div>
  );
};

const CountNum = ({ to, suffix = "", delay = 0, size = 300, color = ACCENT }) => {
  const frame = useCurrentFrame();
  const v = Math.round(interpolate(frame, [delay, delay + 24], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return <div style={{ fontFamily: CAVEAT, fontWeight: 700, fontSize: size, color, lineHeight: 0.8 }}>{v}{suffix}</div>;
};

/* ===================== distinct scene compositions ===================== */

// PAIN — notifications pile up, then an AUTOMATED stamp slams over them
const NOTIFS = [
  { ic: "mail", t: "New email — reply needed" },
  { ic: "cal", t: "Booking request" },
  { ic: "bell", t: "Follow-up overdue" },
  { ic: "doc", t: "Weekly report due" },
];
const PainStack = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampS = spring({ frame: frame - (dur - 26), fps, config: { damping: 9, stiffness: 140 } });
  return (
    <Slide>
      <Rise delay={2}><Body size={44} color={GREY}>Your day, every day…</Body></Rise>
      <div style={{ height: 40 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        {NOTIFS.map((n, i) => {
          const s = spring({ frame: frame - (6 + i * 9), fps, config: { damping: 14, stiffness: 120 } });
          return (
            <div key={n.t} style={{ opacity: s, transform: `translateX(${interpolate(s, [0, 1], [220, 0])}px) rotate(${interpolate(i, [0, 3], [-2.5, 2.5])}deg)`, width: 780, display: "flex", alignItems: "center", gap: 26, background: PAPER, border: `3px solid ${INK}`, borderRadius: "24px 16px 26px 14px", padding: "26px 32px", boxShadow: "9px 11px 0 rgba(29,27,22,0.12)" }}>
              <div style={{ width: 78, height: 78, border: `3px solid ${INK}`, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon type={n.ic} size={48} sw={3} />
              </div>
              <div style={{ fontFamily: KALAM, fontSize: 46, color: INK, textAlign: "left" }}>{n.t}</div>
              <div style={{ marginLeft: "auto", width: 22, height: 22, borderRadius: "50%", background: ACCENT }} />
            </div>
          );
        })}
      </div>
      {/* AUTOMATED stamp */}
      <div style={{ position: "absolute", transform: `scale(${stampS}) rotate(-12deg)`, opacity: stampS, border: `7px solid ${ACCENT}`, color: ACCENT, fontFamily: CAVEAT, fontWeight: 700, fontSize: 120, padding: "14px 50px", borderRadius: 18, background: "rgba(244,241,234,0.86)" }}>
        AUTOMATED ✓
      </div>
    </Slide>
  );
};

// PRODUCT — phone mockup with a live dashboard
const Device = () => {
  const frame = useCurrentFrame();
  const bars = [0.55, 0.8, 0.45, 0.95];
  const lineP = interpolate(frame, [18, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const { fps } = useVideoConfig();
  const badge = spring({ frame: frame - 40, fps, config: { damping: 10, stiffness: 140 } });
  return (
    <Slide bg={INK}>
      <Pop delay={0} from={0.8}>
        <div style={{ width: 600, height: 1080, border: `8px solid ${PAPER}`, borderRadius: 64, background: "#26241e", padding: 30, position: "relative", boxShadow: "0 0 0 4px #000" }}>
          <div style={{ width: 150, height: 14, background: PAPER, borderRadius: 10, margin: "6px auto 26px" }} />
          <div style={{ fontFamily: CAVEAT, fontWeight: 700, fontSize: 70, color: PAPER, textAlign: "left", paddingLeft: 14 }}>Dashboard</div>
          <Body size={34} color={MUTED} style={{ textAlign: "left", paddingLeft: 14, marginTop: 4 }}>running on autopilot</Body>
          {/* bars */}
          <div style={{ display: "flex", gap: 28, alignItems: "flex-end", height: 320, padding: "40px 30px 0" }}>
            {bars.map((b, i) => {
              const h = interpolate(frame, [10 + i * 6, 40 + i * 6], [0, b * 260], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
              return <div key={i} style={{ flex: 1, height: h, background: i === 3 ? ACCENT : PAPER, borderRadius: "10px 10px 0 0" }} />;
            })}
          </div>
          {/* line */}
          <svg width="100%" height="160" viewBox="0 0 520 160" style={{ marginTop: 20 }}>
            <path d="M20 130 L150 90 L280 110 L520 30" fill="none" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" strokeDasharray="600" strokeDashoffset={600 * (1 - lineP)} />
          </svg>
          {/* badge */}
          <div style={{ position: "absolute", right: 36, top: 150, transform: `scale(${badge}) rotate(8deg)`, opacity: badge, background: ACCENT, color: INK, fontFamily: KALAM, fontWeight: 700, fontSize: 38, padding: "12px 26px", borderRadius: 40 }}>
            Automated ✓
          </div>
        </div>
      </Pop>
    </Slide>
  );
};

// PILLARS — 2x2 card grid
const PILLARS = [
  { t: "build", label: "Build", b: "Sites · apps · agents" },
  { t: "grow", label: "Grow", b: "SEO · content · outreach" },
  { t: "scale", label: "Scale", b: "Workflows on autopilot" },
  { t: "learn", label: "Learn", b: "Training · audits" },
];
const PillarGrid = () => (
  <Slide>
    <Rise delay={0}><Title size={120}>What we do</Title></Rise>
    <div style={{ height: 50 }} />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
      {PILLARS.map((p, i) => (
        <Pop key={p.label} delay={6 + i * 9} from={0.6}>
          <div style={{ width: 400, border: `4px solid ${INK}`, borderRadius: "30px 18px 32px 16px", padding: "44px 34px", background: PAPER, textAlign: "left", boxShadow: "8px 10px 0 rgba(29,27,22,0.12)" }}>
            <Icon type={p.t} size={86} />
            <div style={{ fontFamily: CAVEAT, fontWeight: 700, fontSize: 96, color: INK, lineHeight: 0.9, marginTop: 10 }}>{p.label}</div>
            <Body size={34} color={GREY}>{p.b}</Body>
          </div>
        </Pop>
      ))}
    </div>
  </Slide>
);

// STAT — circular progress ring
const Ring = ({ pct, label }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [6, 38], [0, pct / 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const R = 200;
  const C = 2 * Math.PI * R;
  return (
    <Slide bg={INK}>
      <svg width="520" height="520" viewBox="0 0 520 520">
        <circle cx="260" cy="260" r={R} fill="none" stroke="#3a382f" strokeWidth="26" />
        <circle cx="260" cy="260" r={R} fill="none" stroke={ACCENT} strokeWidth="26" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform="rotate(-90 260 260)" />
        <text x="260" y="300" textAnchor="middle" style={{ fontFamily: CAVEAT, fontWeight: 700, fontSize: 180, fill: PAPER }}>{Math.round(p * 100)}%</text>
      </svg>
      <Rise delay={16}><Body size={56} color={MUTED}>{label}</Body></Rise>
    </Slide>
  );
};

// TESTIMONIAL — chat bubbles
const ChatQuote = () => (
  <Slide align="center">
    <Pop delay={0} from={0.6} style={{ alignSelf: "flex-start" }}>
      <div style={{ maxWidth: 720, background: PAPER, border: `4px solid ${INK}`, borderRadius: "34px 34px 34px 8px", padding: "34px 40px", fontFamily: KALAM, fontSize: 56, color: INK, textAlign: "left" }}>
        They mapped our chaos…
      </div>
    </Pop>
    <div style={{ height: 30 }} />
    <Pop delay={14} from={0.6} style={{ alignSelf: "flex-end" }}>
      <div style={{ maxWidth: 720, background: ACCENT, border: `4px solid ${INK}`, borderRadius: "34px 34px 8px 34px", padding: "34px 40px", fontFamily: KALAM, fontWeight: 700, fontSize: 56, color: INK, textAlign: "left" }}>
        …and gave back a system that just runs.
      </div>
    </Pop>
    <div style={{ height: 44 }} />
    <Rise delay={28}>
      <div style={{ display: "flex", alignItems: "center", gap: 22, justifyContent: "center" }}>
        <div style={{ width: 84, height: 84, borderRadius: "50%", border: `4px solid ${INK}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CAVEAT, fontWeight: 700, fontSize: 54, color: INK }}>S</div>
        <Body size={44} color={GREY}>Sarah L. · Founder</Body>
      </div>
    </Rise>
  </Slide>
);

// PROCESS — 3-step timeline with a traveling dot
const STEPS = ["Audit", "Build", "Automate"];
const Timeline = () => {
  const frame = useCurrentFrame();
  const prog = interpolate(frame, [8, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const xs = [0.12, 0.5, 0.88];
  return (
    <Slide bg={INK}>
      <Rise delay={0}><Title size={104} color={PAPER}>How it works</Title></Rise>
      <div style={{ height: 80 }} />
      <div style={{ position: "relative", width: 860, height: 220 }}>
        <div style={{ position: "absolute", top: 40, left: 0, right: 0, height: 5, background: "#3a382f" }} />
        <div style={{ position: "absolute", top: 40, left: 0, width: `${prog * 100}%`, height: 5, background: ACCENT }} />
        {xs.map((x, i) => {
          const reached = prog >= x - 0.02;
          return (
            <div key={i} style={{ position: "absolute", left: `${x * 100}%`, top: 0, transform: "translateX(-50%)", textAlign: "center" }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", border: `5px solid ${reached ? ACCENT : "#3a382f"}`, background: reached ? ACCENT : INK, color: reached ? INK : MUTED, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CAVEAT, fontWeight: 700, fontSize: 44, margin: "5px auto 0" }}>{i + 1}</div>
              <div style={{ fontFamily: KALAM, fontSize: 46, color: reached ? PAPER : MUTED, marginTop: 20 }}>{STEPS[i]}</div>
            </div>
          );
        })}
        {/* traveling spark */}
        <div style={{ position: "absolute", top: 30, left: `${prog * 100}%`, transform: "translateX(-50%)", width: 26, height: 26, borderRadius: "50%", background: PAPER, boxShadow: `0 0 0 6px ${ACCENT}` }} />
      </div>
    </Slide>
  );
};

// SELECTED WORK — manifest-driven gallery (Pinterest images, or drawn placeholders)
const KenImg = ({ src, delay = 0 }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [delay, delay + 90], [1.14, 1], { extrapolateRight: "clamp" });
  return <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${s})` }} />;
};
const DrawnFrame = () => (
  <svg width="100%" height="100%" viewBox="0 0 120 130" preserveAspectRatio="xMidYMid slice">
    <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="42" r="9" />
      <path d="M14 104 L48 64 L70 88 L92 60 L110 104" />
    </g>
  </svg>
);
const Gallery = () => {
  const slots = PINS.length ? PINS.slice(0, 4) : [null, null, null, null];
  return (
    <Slide>
      <Rise delay={0}><Title size={118}>Selected work</Title></Rise>
      <div style={{ height: 44 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
        {slots.map((p, i) => (
          <Pop key={i} delay={4 + i * 8} from={0.7}>
            <div style={{ width: 400, height: 440, border: `4px solid ${INK}`, borderRadius: "26px 16px 28px 14px", overflow: "hidden", background: PAPER, boxShadow: "8px 10px 0 rgba(29,27,22,0.12)" }}>
              {p ? <KenImg src={staticFile(p.file)} delay={4 + i * 8} /> : <DrawnFrame />}
            </div>
            {p?.title ? <Body size={28} color={GREY} style={{ marginTop: 10, maxWidth: 400 }}>{p.title}</Body> : null}
          </Pop>
        ))}
      </div>
    </Slide>
  );
};

/* ===================== scene list ===================== */
const SCENES = [
  { d: 54, el: (
    <Slide swipe><Dots />
      <Rise delay={2}><Body size={42} color={ACCENT}>FOR BUSY TEAMS</Body></Rise>
      <div style={{ height: 16 }} />
      <Pop delay={8}><Title size={150}>Drowning in</Title><Title size={150}>busywork?</Title></Pop>
    </Slide>
  )},
  { d: 92, el: <PainStack dur={92} /> },
  { d: 50, el: (
    <Slide bg={INK} swipe>
      <Pop delay={2}><div style={{ fontFamily: CAVEAT, fontWeight: 700, fontSize: 120, color: PAPER }}>DS.</div></Pop>
      <Rise delay={10}><Title size={150} color={PAPER}>Meet DeskStudio.</Title></Rise>
      <div style={{ height: 14 }} />
      <Rise delay={18}><Body size={50} color={MUTED}>Automation that <span style={{ color: ACCENT }}>connects.</span></Body></Rise>
    </Slide>
  )},
  { d: 86, el: <Device /> },
  { d: 78, el: <PillarGrid /> },
  { d: 74, el: <Gallery /> },
  { d: 46, el: (
    <Slide bg={INK} swipe>
      <Pop delay={2}><CountNum to={40} suffix="k+" /></Pop>
      <Rise delay={12}><Body size={54} color={MUTED}>hours of busywork — gone</Body></Rise>
    </Slide>
  )},
  { d: 64, el: <Ring pct={98} label="process accuracy" /> },
  { d: 70, el: <ChatQuote /> },
  { d: 78, el: <Timeline /> },
  { d: 72, el: (
    <Slide bg={ACCENT} zoom={false}>
      <Spark delay={2} color={INK} />
      <div style={{ height: 26 }} />
      <Pop delay={8}><Title size={150} color={INK}>Book a free</Title><Title size={150} color={INK}>AI audit.</Title></Pop>
      <div style={{ height: 20 }} />
      <Rise delay={20}><Body size={48} color={INK}>We'll show you what to automate first.</Body></Rise>
    </Slide>
  )},
  { d: 52, el: (
    <Slide bg={INK}>
      <Pop delay={2}><div style={{ fontFamily: CAVEAT, fontWeight: 700, fontSize: 100, color: PAPER, marginBottom: 26 }}>DS.</div></Pop>
      <Rise delay={10}>
        <div style={{ fontFamily: KALAM, fontSize: 60, color: INK, background: PAPER, borderRadius: "255px 18px 225px 18px/18px 225px 18px 255px", padding: "24px 58px", display: "inline-block" }}>deskstudio.ai</div>
      </Rise>
    </Slide>
  )},
];

const W = 1080, H = 1920;
const TRANS = [
  { d: 12, p: fade() },                              // hook -> pain
  { d: 16, p: clockWipe({ width: W, height: H }) },  // pain -> meet (to dark)
  { d: 12, p: fade() },                              // meet -> device
  { d: 16, p: slide({ direction: "from-right" }) },  // device -> pillars (to light)
  { d: 12, p: fade() },                              // pillars -> gallery
  { d: 16, p: wipe({ direction: "from-bottom" }) },  // gallery -> 40k (to dark)
  { d: 14, p: flip() },                              // 40k -> ring
  { d: 16, p: slide({ direction: "from-bottom" }) }, // ring -> chat (to light)
  { d: 16, p: wipe({ direction: "from-left" }) },    // chat -> timeline (to dark)
  { d: 18, p: slide({ direction: "from-bottom" }) }, // timeline -> cta (to accent)
  { d: 12, p: fade() },                              // cta -> end card
];

export const REEL_DURATION = SCENES.reduce((a, s) => a + s.d, 0) - TRANS.reduce((a, t) => a + t.d, 0);

export const Reel = () => (
  <AbsoluteFill style={{ backgroundColor: PAPER }}>
    <TransitionSeries>
      {SCENES.map((s, i) => (
        <Fragment key={i}>
          <TransitionSeries.Sequence durationInFrames={s.d}>{s.el}</TransitionSeries.Sequence>
          {i < TRANS.length && (
            <TransitionSeries.Transition timing={linearTiming({ durationInFrames: TRANS[i].d })} presentation={TRANS[i].p} />
          )}
        </Fragment>
      ))}
    </TransitionSeries>
  </AbsoluteFill>
);

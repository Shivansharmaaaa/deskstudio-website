"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import ScrollLine from "@/components/ScrollLine";
import {
  Desk,
  Monitor,
  Gears,
  HubNetwork,
  Whisper,
  Newspaper,
  CareerSteps,
  Lightbulb,
  Photo,
  Spark,
  IconBuild,
  IconGrow,
  IconScale,
  IconLearn,
  Twitter,
  LinkedIn,
  Instagram,
  Dribbble,
} from "@/components/Sketch";

const WWD = [
  { icon: <IconBuild />, h: "Build", p: "Websites, apps, chatbots, and AI voice agents." },
  { icon: <IconGrow />, h: "Grow", p: "SEO, content, social, and outbound on autopilot." },
  { icon: <IconScale />, h: "Scale", p: "Workflow automation, internal tools, dashboards." },
  { icon: <IconLearn />, h: "Learn", p: "AI training, consulting, and audits for your team." },
];

const THUMBS = [
  { cap: "24/7 booking agent" },
  { cap: "3× qualified leads" },
  { cap: "12 hrs/week saved" },
];

const FAQS = [
  {
    q: "What services do you offer?",
    a: "Four divisions under one roof: Build (sites, apps, agents), Grow (SEO, content, outbound), Scale (automation, internal tools), and Learn (AI training & audits).",
  },
  {
    q: "How long does a project take?",
    a: "Most automations and sites launch in about three weeks. Larger systems are scoped in phases so you see value early.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes — from solo founders to scaling teams. We right-size the system to your stage and budget.",
  },
  {
    q: "Where are you located?",
    a: "We're remote-first and work with clients worldwide. Async by default, calls when it helps.",
  },
];

export default function Page() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* global hand-drawn filter for all sketch illustrations */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="sketch">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              seed="7"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
          </filter>
        </defs>
      </svg>

      <span id="top" />
      <Header />

      <main>
        <ScrollLine />

        {/* 1 — HERO */}
        <section className="panel hero">
          <div className="wrap">
            <div className="reveal">
              <span className="plabel">DeskStudio — AI Automation Studio</span>
              <h1 className="ptitle big" data-line="left">
                Automation
                <br />
                that connects.
              </h1>
              <p className="ptext">
                We design AI systems that quietly run your business in the
                background — so your team gets back to the work only people can do.
              </p>
              <div className="pactions">
                <a href="#contact" className="btn">
                  Book a free audit
                </a>
                <a href="#work" className="link-arrow">
                  See our work <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <HubNetwork />
          </div>
        </section>

        {/* 2 — OUR WORK */}
        <section id="work" className="panel">
          <div className="wrap">
            <div className="reveal">
              <h2 className="ptitle" data-line="left">Our Work</h2>
              <p className="ptext">
                Websites, AI agents, and automations we're proud to ship for
                businesses that want to move faster.
              </p>
              <div className="pactions">
                <a href="#selected" className="btn">
                  View projects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3 — FEATURED PROJECT (desk) */}
        <section className="panel">
          <div className="wrap">
            <div className="panel-grid left">
              <div className="reveal">
                <span className="plabel">Featured Project</span>
                <h2 className="ptitle">AI Front Desk</h2>
                <p className="ptext">
                  A booking and support agent that never sleeps — handling
                  enquiries, scheduling, and reminders for a busy wellness brand.
                </p>
                <div className="pactions">
                  <a href="#contact" className="link-arrow">
                    View case study <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="col-art reveal" data-line="right">
                <Desk />
              </div>
            </div>
          </div>
        </section>

        {/* 4 — OUR APPROACH */}
        <section className="panel">
          <div className="wrap">
            <div className="panel-grid right">
              <div className="reveal">
                <span className="plabel">Our Approach</span>
                <h2 className="ptitle" data-line="left">
                  Build, grow, scale — together.
                </h2>
                <p className="ptext">
                  Strategy, design, and automation working as one team, from the
                  first idea to launch and beyond.
                </p>
                <div className="pactions">
                  <a href="#whatwedo" className="link-arrow">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="col-art reveal">
                <Gears />
              </div>
            </div>
          </div>
        </section>

        {/* 5 — ABOUT */}
        <section id="about" className="panel center">
          <div className="wrap">
            <div className="panel-inner reveal">
              <h2 className="ptitle" data-line="center">About Us</h2>
              <p className="ptext">
                We're a small team of builders and thinkers obsessed with clean
                systems that give people their time back — no bloat, no
                buzzwords, no babysitting.
              </p>
              <div className="pactions">
                <a href="#contact" className="link-arrow">
                  Meet the team <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6 — WHAT WE DO (monitor) */}
        <section id="whatwedo" className="panel">
          <div className="wrap">
            <div className="panel-grid left">
              <div className="reveal">
                <h2 className="ptitle">What We Do</h2>
                <div className="wwd">
                  {WWD.map((w) => (
                    <div className="wwd-item" key={w.h}>
                      <span className="wwd-icon">{w.icon}</span>
                      <div>
                        <h3>{w.h}</h3>
                        <p>{w.p}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-art reveal" data-line="right">
                <Monitor />
              </div>
            </div>
          </div>
        </section>

        {/* 7 — SELECTED WORK */}
        <section id="selected" className="panel">
          <div className="wrap">
            <div className="reveal">
              <h2 className="ptitle" data-line="left">Selected Work</h2>
              <p className="ptext">A few outcomes we've brought to life.</p>
              <div className="thumbs">
                {THUMBS.map((t) => (
                  <div className="thumb" key={t.cap}>
                    <Photo />
                    <div className="cap">{t.cap}</div>
                  </div>
                ))}
              </div>
              <div className="pactions">
                <a href="#contact" className="link-arrow">
                  View all work <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8 — TESTIMONIALS */}
        <section className="panel">
          <div className="wrap">
            <div className="panel-grid right">
              <div className="reveal" data-line="center" data-loop>
                <div className="quote-mark">&ldquo;</div>
                <p className="quote-body">
                  They mapped our chaos and handed back a system that just runs.
                  We got our evenings back.
                </p>
                <div className="quote-by">— Sarah L., Founder</div>
                <div className="dots">
                  <i className="on" />
                  <i />
                  <i />
                </div>
              </div>
              <div className="col-art reveal">
                <Whisper />
              </div>
            </div>
          </div>
        </section>

        {/* 9 — LET'S WORK TOGETHER (lightbulb) */}
        <section id="contact" className="panel">
          <div className="wrap">
            <div className="panel-grid left">
              <div className="reveal">
                <h2 className="ptitle">Let's work together</h2>
                <p className="ptext">
                  Have a process you're tired of? Book a free 30-minute audit and
                  we'll show you exactly what we'd automate first.
                </p>
                <div className="pactions">
                  <a href="mailto:hello@deskstudio.ai" className="btn">
                    Get in touch
                  </a>
                </div>
              </div>
              <div className="col-art reveal" data-line="right" data-loop>
                <Lightbulb />
              </div>
            </div>
          </div>
        </section>

        {/* 10 — BLOG & INSIGHTS */}
        <section className="panel">
          <div className="wrap">
            <div className="panel-grid left">
              <div className="reveal">
                <h2 className="ptitle">Blog &amp; Insights</h2>
                <p className="ptext">
                  Thoughts, ideas, and resources on AI, automation, and building
                  lean.
                </p>
                <div className="pactions">
                  <a href="#contact" className="link-arrow">
                    Read articles <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="col-art reveal" data-line="right">
                <Newspaper />
              </div>
            </div>
          </div>
        </section>

        {/* 11 — CAREERS */}
        <section className="panel">
          <div className="wrap">
            <div className="panel-grid right">
              <div className="reveal">
                <h2 className="ptitle" data-line="left">Careers</h2>
                <p className="ptext">
                  We're always looking for curious, creative builders to join the
                  studio.
                </p>
                <div className="pactions">
                  <a href="#contact" className="link-arrow">
                    View open positions <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="col-art reveal">
                <CareerSteps />
              </div>
            </div>
          </div>
        </section>

        {/* 12 — FAQ */}
        <section className="panel faq-panel">
          <div className="faq-floats" aria-hidden="true">
            <span style={{ left: "7%", top: "26%", fontSize: "84px" }}>?</span>
            <span style={{ right: "9%", top: "16%", fontSize: "60px", animationDelay: "1.4s" }}>?</span>
            <span style={{ left: "13%", top: "64%", fontSize: "52px", animationDelay: "2.8s" }}>?</span>
            <span style={{ right: "6%", top: "58%", fontSize: "72px", animationDelay: "2s" }}>?</span>
            <span style={{ left: "47%", top: "4%", fontSize: "46px", animationDelay: "3.6s" }}>?</span>
          </div>
          <div className="wrap">
            <div className="reveal faq-center">
              <h2 className="ptitle" data-line="left">FAQ</h2>
              <div className="faq">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q} <span className="pm">+</span>
                    </summary>
                    <div className="ans">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13 — STAY CONNECTED */}
        <section className="panel center">
          <div className="wrap">
            <div className="panel-inner reveal" data-line="center">
              <h2 className="ptitle">Stay Connected</h2>
              <p className="ptext">
                Get occasional notes on automation and what we're building.
              </p>
              <form className="subscribe" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" aria-label="Email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </section>

        {/* 14 — FOLLOW US */}
        <section className="panel center">
          <div className="wrap">
            <div className="panel-inner reveal" data-line="center">
              <h2 className="ptitle">Follow Us</h2>
              <p className="ptext">Find us on social media.</p>
              <div className="socials">
                <a href="#" aria-label="Twitter"><Twitter /></a>
                <a href="#" aria-label="LinkedIn"><LinkedIn /></a>
                <a href="#" aria-label="Instagram"><Instagram /></a>
                <a href="#" aria-label="Dribbble"><Dribbble /></a>
              </div>
            </div>
          </div>
        </section>

        {/* 15 — THANKS */}
        <section className="panel center">
          <div className="wrap">
            <div className="panel-inner reveal">
              <div
                className="col-art"
                data-line="center"
                style={{ maxWidth: 70, marginBottom: 10 }}
              >
                <Spark />
              </div>
              <h2 className="ptitle">Thanks for visiting</h2>
              <p className="ptext">Let's build something great together.</p>
              <div className="pactions">
                <a href="#top" className="btn">
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="wrap">
          <div className="footer">
            <span>© {new Date().getFullYear()} DeskStudio. All rights reserved.</span>
            <span className="links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookies</a>
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}

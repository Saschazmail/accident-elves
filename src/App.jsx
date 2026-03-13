import { useState, useEffect, useRef } from "react";



// ─── SCROLL ANIMATION HOOK ────────────────────────────────────────
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}
function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "🚐", title: "Rides & Towing", short: "We come to you — now", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", desc: "Stranded after your accident? We dispatch Uber, Zoox, or Vay rideshare plus licensed towing — directly to your location, 24/7.", bullets: ["24/7 dispatch — real humans answer", "Uber, Zoox & Vay coordination in Las Vegas", "Licensed towing, zero price gouging", "Roadside assistance while you wait"], cta: "Get a Ride Now" },
  { icon: "🚗", title: "Rental Cars", short: "Back on the road today", color: "#A78BFA", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)", desc: "Don't let a wrecked car wreck your week. We unlock exclusive discounts with rental partners so you're moving again — today.", bullets: ["Up to 40% off standard rates", "Same-day pickup available", "Insurance billing coordination", "Economy to SUV — your choice"], cta: "Unlock My Discount" },
  { icon: "🔧", title: "Honest Body Shops", short: "No surprises, ever", color: "#34D399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.25)", desc: "We only send you to vetted, honest shops. Fair estimates. Quality work. No hidden fees — just your car fixed right.", bullets: ["Pre-screened & rated partners only", "Free second-opinion estimates", "All insurers accepted", "Text updates on your repair"], cta: "Find a Body Shop" },
  { icon: "🩺", title: "Medical & Chiro", short: "Treatment now, pay later", color: "#F87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.25)", desc: "Injuries aren't always visible. Our medical network sees you fast — most work on a lien basis, meaning $0 out of pocket until your case settles.", bullets: ["Same-day appointments", "Chiropractors, urgent care & specialists", "Lien-based care — $0 upfront", "Documentation that protects your claim"], cta: "See a Doctor Today" },
  { icon: "⚖️", title: "Free Legal Consult", short: "Know your rights", color: "#FFD700", bg: "rgba(255,215,0,0.08)", border: "rgba(255,215,0,0.25)", desc: "Not sure what your situation is worth? Our partners at In Your Corner Consulting connect you with trusted Las Vegas PI attorneys — free, no pressure, no obligation.", bullets: ["100% free consultation", "No fees unless you win", "Experienced Nevada attorneys", "Bilingual staff available"], cta: "Get Free Consult" },
];

const STEPS = [
  { n: "01", icon: "📞", label: "Call or text us — we answer 24/7" },
  { n: "02", icon: "🔍", label: "We assess your needs instantly" },
  { n: "03", icon: "🤝", label: "We connect you with the right help" },
  { n: "04", icon: "✨", label: "Problems disappear — like magic" },
];

const HELP_OPT = ["Ride / Towing", "Rental Car", "Body Shop", "Medical / Chiro", "Legal Consult"];

// ─── SERVICE CARD ─────────────────────────────────────────────────
function ServiceCard({ svc, idx }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  return (
    <div ref={ref} onClick={() => setOpen(!open)} style={{ background: open ? svc.bg : "rgba(255,255,255,0.03)", border: `1.5px solid ${open ? svc.border : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: "26px 24px", cursor: "pointer", transition: "all 0.3s cubic-bezier(.4,0,.2,1)", boxShadow: open ? `0 12px 40px ${svc.color}18` : "none", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transitionDelay: `${idx * 0.07}s` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 50, height: 50, background: svc.bg, border: `1.5px solid ${svc.border}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{svc.icon}</div>
          <div>
            <div style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{svc.title}</div>
            <div style={{ fontSize: 11, color: svc.color, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "system-ui" }}>{svc.short}</div>
          </div>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: "50%", border: `1.5px solid ${svc.color}55`, display: "flex", alignItems: "center", justifyContent: "center", color: svc.color, fontSize: 18, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</div>
      </div>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.75, margin: "0 0 14px", fontFamily: "system-ui" }}>{svc.desc}</p>
      {open && (
        <div style={{ animation: "fadeUp 0.3s ease" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px" }}>
            {svc.bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: 10, padding: "5px 0", fontSize: 13, color: "rgba(255,255,255,0.78)", fontFamily: "system-ui" }}>
                <span style={{ color: svc.color, fontWeight: 800, flexShrink: 0 }}>✓</span>{b}
              </li>
            ))}
          </ul>
          <button onClick={e => e.stopPropagation()} style={{ width: "100%", background: svc.color, color: "#0a1f12", border: "none", borderRadius: 50, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "system-ui", letterSpacing: "0.03em" }}>{svc.cta} →</button>
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function AccidentElves() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", type: "", help: [], notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleHelp = h => setForm(p => ({ ...p, help: p.help.includes(h) ? p.help.filter(x => x !== h) : [...p.help, h] }));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0a1a0f", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes floatL { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-14px) rotate(1.5deg)} }
        @keyframes floatR { 0%,100%{transform:translateY(-8px) rotate(1.5deg)} 50%{transform:translateY(6px) rotate(-1.5deg)} }
        @keyframes wingBeat { 0%,100%{transform:scaleX(1);opacity:0.75} 50%{transform:scaleX(0.65);opacity:0.95} }
        @keyframes glowPulse { 0%,100%{opacity:0.35} 50%{opacity:0.9} }
        @keyframes sparkle { 0%{opacity:0;transform:scale(0.2) rotate(0deg)} 35%{opacity:1;transform:scale(1.3) rotate(20deg)} 65%{opacity:0.7;transform:scale(1) rotate(-8deg)} 100%{opacity:0;transform:scale(0.1) rotate(45deg)} }
        @keyframes arcShimmer { 0%,100%{opacity:0.2} 50%{opacity:0.6} }
        @keyframes titleGlow { 0%,100%{filter:drop-shadow(0 0 8px rgba(255,210,0,0.5))} 50%{filter:drop-shadow(0 0 28px rgba(255,210,0,0.95))} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes callPulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,215,0,0.4)} 50%{box-shadow:0 0 0 10px rgba(255,215,0,0)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(10,26,15,0.96)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,215,0,0.12)" : "none", padding: "12px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.4s ease" }}>
        {/* Nav logo — mini fairy SVG */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo-dark.jpg" alt="Accident Elves" style={{ width: "120px", maxWidth: 120, display: "block" }} />
        </div>
        <a href="tel:7029964996" style={{ background: "linear-gradient(135deg,#FFD700,#C8860A)", color: "#0a1a0f", padding: "10px 22px", borderRadius: 50, fontWeight: 800, fontSize: 14, textDecoration: "none", letterSpacing: "0.03em", animation: "callPulse 2.5s infinite", whiteSpace: "nowrap" }}>
          📞 (702) 996-4996
        </a>
      </nav>

      {/* HERO */}
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#071210 0%,#0f2418 45%,#091824 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "130px 24px 90px", position: "relative", overflow: "hidden" }}>
        {/* Orbs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle,rgba(255,215,0,0.07) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 320, height: 320, background: "radial-gradient(circle,rgba(90,184,232,0.08) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Main logo */}
        <div style={{ position: "relative", width: "100%", maxWidth: 580, marginBottom: 8 }}>
          <img src="/logo-dark.jpg" alt="Accident Elves" style={{ width: "100%", maxWidth: 580, display: "block", margin: "0 auto", maskImage: "radial-gradient(ellipse 85% 88% at 50% 42%, black 45%, rgba(0,0,0,0.7) 65%, transparent 90%)", WebkitMaskImage: "radial-gradient(ellipse 85% 88% at 50% 42%, black 45%, rgba(0,0,0,0.7) 65%, transparent 90%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #071210 0%, transparent 20%, transparent 80%, #071210 100%), linear-gradient(to bottom, #071210 0%, transparent 15%, transparent 85%, #071210 100%)", pointerEvents: "none", zIndex: 2 }} />
          {/* Sparkle overlay */}
          <svg viewBox="0 0 580 230" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
            <defs>
              <filter id="spkGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="1.2" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <style>{`
                @keyframes spk1 { 0%,100%{opacity:1;transform:scale(1) rotate(0deg)} 50%{opacity:0.3;transform:scale(0.55) rotate(22deg)} }
                @keyframes spk2 { 0%,100%{opacity:0.7;transform:scale(0.8) rotate(0deg)} 50%{opacity:1;transform:scale(1.2) rotate(-18deg)} }
                @keyframes spk3 { 0%,100%{opacity:0.4;transform:scale(1.1) rotate(0deg)} 50%{opacity:0.9;transform:scale(0.6) rotate(30deg)} }
                @keyframes spk4 { 0%,100%{opacity:0.9;transform:scale(0.7) rotate(0deg)} 50%{opacity:0.2;transform:scale(1.15) rotate(-25deg)} }
              `}</style>
            </defs>
            {/* Gold stars */}
            <polygon points="290,22 292.5,29 300,29 294,33.5 296.5,41 290,36.5 283.5,41 286,33.5 280,29 287.5,29" fill="#FFD700" filter="url(#spkGlow)" style={{ transformOrigin: "290px 31px", animation: "spk1 1.8s ease-in-out infinite" }} />
            <polygon points="265,36 266.8,41.5 272.5,41.5 268,44.8 269.8,50.5 265,47 260.2,50.5 262,44.8 257.5,41.5 263.2,41.5" fill="#FFD700" filter="url(#spkGlow)" style={{ transformOrigin: "265px 43px", animation: "spk2 2.3s ease-in-out 0.4s infinite" }} />
            <polygon points="315,36 316.8,41.5 322.5,41.5 318,44.8 319.8,50.5 315,47 310.2,50.5 312,44.8 307.5,41.5 313.2,41.5" fill="#FFD700" filter="url(#spkGlow)" style={{ transformOrigin: "315px 43px", animation: "spk3 2.1s ease-in-out 0.9s infinite" }} />
            <polygon points="278,14 279.4,18.3 284,18.3 280.3,21 281.7,25.3 278,22.5 274.3,25.3 275.7,21 272,18.3 276.6,18.3" fill="#FFF5B0" filter="url(#spkGlow)" style={{ transformOrigin: "278px 19px", animation: "spk4 1.6s ease-in-out 0.2s infinite" }} />
            <polygon points="302,14 303.4,18.3 308,18.3 304.3,21 305.7,25.3 302,22.5 298.3,25.3 299.7,21 296,18.3 300.6,18.3" fill="#FFF5B0" filter="url(#spkGlow)" style={{ transformOrigin: "302px 19px", animation: "spk1 2.5s ease-in-out 1.1s infinite" }} />
            {/* Blue-white stars */}
            <polygon points="250,26 251.5,30.5 256.5,30.5 252.5,33.3 254,38 250,35 246,38 247.5,33.3 243.5,30.5 248.5,30.5" fill="#AEF0FF" filter="url(#spkGlow)" style={{ transformOrigin: "250px 32px", animation: "spk2 1.9s ease-in-out 0.6s infinite" }} />
            <polygon points="330,26 331.5,30.5 336.5,30.5 332.5,33.3 334,38 330,35 326,38 327.5,33.3 323.5,30.5 328.5,30.5" fill="#AEF0FF" filter="url(#spkGlow)" style={{ transformOrigin: "330px 32px", animation: "spk3 2.2s ease-in-out 1.3s infinite" }} />
            <polygon points="290,6 291,9 294,9 291.5,10.8 292.5,14 290,12.2 287.5,14 288.5,10.8 286,9 289,9" fill="#AEF0FF" filter="url(#spkGlow)" style={{ transformOrigin: "290px 10px", animation: "spk4 1.7s ease-in-out 0.8s infinite" }} />
          </svg>
        </div>

        <div style={{ display: "inline-block", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", borderRadius: 40, padding: "7px 20px", marginBottom: 28, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FFD700", fontWeight: 700 }}>
          Available 24/7 · Las Vegas, NV & Surrounding Areas
        </div>

        <h1 style={{ fontSize: "clamp(30px,5.5vw,62px)", fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontWeight: 700, lineHeight: 1.15, color: "#fff", marginBottom: 22, maxWidth: 760, letterSpacing: "-0.02em" }}>
          Had an Accident?<br />
          <span style={{ background: "linear-gradient(90deg,#FFD700,#FFF5B0,#FFD700)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "arcShimmer 3s linear infinite" }}>
            Our Elves Make Problems Disappear.
          </span>
        </h1>

        <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,0.68)", lineHeight: 1.8, maxWidth: 540, marginBottom: 44 }}>
          From rides and rentals to body shops, medical care, and free legal consultations — one call puts our whole team to work for you.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 52 }}>
          <a href="#get-help" style={{ background: "linear-gradient(135deg,#FFD700,#C8860A)", color: "#0a1a0f", padding: "16px 40px", borderRadius: 50, fontWeight: 800, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 32px rgba(255,215,0,0.3)", letterSpacing: "0.02em" }}>Get Help Now — It's Free</a>
          <a href="tel:7029964996" style={{ background: "transparent", color: "#FFD700", padding: "16px 40px", borderRadius: 50, fontWeight: 700, fontSize: 16, textDecoration: "none", border: "2px solid rgba(255,215,0,0.35)", letterSpacing: "0.02em" }}>📞 Call 24/7</a>
        </div>

        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
          {["Zero Upfront Cost", "Real Humans 24/7", "We're On YOUR Side", "Tourists Welcome"].map(b => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              <span style={{ color: "#FFD700", fontWeight: 800 }}>✓</span>{b}
            </div>
          ))}
        </div>
      </div>

      {/* URGENT BANNER */}
      <div style={{ background: "rgba(255,215,0,0.1)", borderTop: "1px solid rgba(255,215,0,0.2)", borderBottom: "1px solid rgba(255,215,0,0.2)", padding: "14px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#FFD700" }}>
          ⚠️ Just had an accident? <span style={{ color: "#fff" }}>Don't speak to the other driver's insurance before calling us.</span>
          <a href="tel:7029964996" style={{ color: "#FFD700", marginLeft: 8, textDecoration: "underline" }}>(702) 996-4996</a> — We'll guide you for free.
        </p>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: "90px 24px", background: "#0d1f14" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFD700", fontWeight: 700, marginBottom: 14 }}>The Process</div>
              <h2 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, letterSpacing: "-0.02em" }}>How the Magic Works</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ textAlign: "center", padding: "32px 20px", background: "rgba(255,255,255,0.03)", borderRadius: 20, border: "1px solid rgba(255,215,0,0.1)" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,215,0,0.3)", letterSpacing: "0.12em", marginBottom: 14 }}>{step.n}</div>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{step.icon}</div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>{step.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div style={{ padding: "90px 24px", background: "#0a1a0f" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFD700", fontWeight: 700, marginBottom: 14 }}>Five Services, One Call</div>
              <h2 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Everything You Need After an Accident</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 12, fontSize: 15 }}>Tap any card to see full details</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            {SERVICES.map((svc, i) => <ServiceCard key={i} svc={svc} idx={i} />)}
          </div>
        </div>
      </div>

      {/* TRUST STATS */}
      <div style={{ background: "linear-gradient(135deg,#071210,#0f2418)", padding: "80px 24px", borderTop: "1px solid rgba(255,215,0,0.1)", borderBottom: "1px solid rgba(255,215,0,0.1)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ textAlign: "center", fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, marginBottom: 52, letterSpacing: "-0.02em" }}>
              Las Vegas Trusts the Elves <span style={{ color: "#FFD700" }}>✨</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 20 }}>
            {[
              { icon: "⚡", stat: "< 5 min", label: "Response time" },
              { icon: "📞", stat: "24/7", label: "Always available" },
              { icon: "💛", stat: "$0", label: "Upfront cost" },
              { icon: "🌎", stat: "Bilingual", label: "English & Spanish" },
              { icon: "🏆", stat: "100%", label: "Free consults" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.12)", borderRadius: 18, padding: "28px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#FFD700", marginBottom: 4 }}>{item.stat}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>{item.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* LEAD FORM */}
      <div id="get-help" style={{ padding: "90px 24px", background: "#0d1f14" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          {!submitted ? (
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFD700", fontWeight: 700, marginBottom: 14 }}>Send the Elves</div>
                <h2 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>Get Help Right Now</h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15 }}>Fill this out and a friendly advisor calls you within minutes.</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: 24, padding: "38px 32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[{ label: "Full Name *", key: "name", placeholder: "Jane Smith", type: "text" }, { label: "Phone Number *", key: "phone", placeholder: "(702) 555-0000", type: "tel" }].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.label}</label>
                      <input type={f.type} value={form[f.key]} placeholder={f.placeholder} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,215,0,0.2)", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#fff", outline: "none" }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>Date of Accident</label>
                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,215,0,0.2)", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#fff", outline: "none", colorScheme: "dark" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>Incident Type</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,215,0,0.2)", fontSize: 14, background: "#0d1f14", color: "#fff", outline: "none" }}>
                      <option value="">Select one...</option>
                      <option>Car Accident</option><option>Motorcycle Accident</option><option>Truck / Commercial Vehicle</option><option>Pedestrian / Bicycle</option><option>Slip & Fall</option><option>Other Personal Injury</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>I need help with...</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {HELP_OPT.map(opt => (
                      <button key={opt} onClick={() => toggleHelp(opt)} style={{ padding: "8px 16px", borderRadius: 50, fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em", border: `1.5px solid ${form.help.includes(opt) ? "#FFD700" : "rgba(255,255,255,0.15)"}`, background: form.help.includes(opt) ? "rgba(255,215,0,0.15)" : "transparent", color: form.help.includes(opt) ? "#FFD700" : "rgba(255,255,255,0.55)", transition: "all 0.2s" }}>
                        {form.help.includes(opt) ? "✓ " : ""}{opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>Brief description (optional)</label>
                  <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Tell us what happened..." rows={3}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,215,0,0.2)", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#fff", resize: "vertical", outline: "none" }} />
                </div>
                <button onClick={() => { if (form.name && form.phone) setSubmitted(true); }} style={{ width: "100%", background: "linear-gradient(135deg,#FFD700,#C8860A)", color: "#0a1a0f", border: "none", borderRadius: 12, padding: "17px", fontWeight: 800, fontSize: 16, cursor: "pointer", letterSpacing: "0.02em", boxShadow: "0 8px 28px rgba(255,215,0,0.3)" }}>
                  Send the Elves My Way ✨
                </button>
                <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>🔒 Your info is private and never sold. This is not legal advice.</p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div style={{ textAlign: "center", background: "rgba(255,215,0,0.07)", border: "2px solid rgba(255,215,0,0.25)", borderRadius: 24, padding: "60px 40px" }}>
                <div style={{ fontSize: 64, marginBottom: 16, animation: "floatL 3s ease-in-out infinite" }}>✨</div>
                <h2 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: 28, fontWeight: 700, color: "#FFD700", marginBottom: 12 }}>The Elves Are On It, {form.name.split(" ")[0]}!</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>An advisor will call <strong style={{ color: "#fff" }}>{form.phone}</strong> within minutes. Need immediate help?</p>
                <a href="tel:7029964996" style={{ display: "inline-block", background: "linear-gradient(135deg,#FFD700,#C8860A)", color: "#0a1a0f", padding: "16px 36px", borderRadius: 50, fontWeight: 800, fontSize: 15, textDecoration: "none" }}>📞 (702) 996-4996</a>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* IN YOUR CORNER */}
      <div style={{ background: "#0a0a1a", padding: "70px 24px", textAlign: "center", borderTop: "1px solid rgba(255,215,0,0.08)" }}>
        <Reveal>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>⚖️</div>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.8)", fontWeight: 700, marginBottom: 16 }}>Legal Consultations Powered By</div>
            <h3 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", color: "#fff", fontSize: 26, fontWeight: 700, marginBottom: 14, letterSpacing: "-0.02em" }}>In Your Corner Consulting</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
              Our legal consultation partner connects you with experienced, trusted Nevada personal injury attorneys — completely free, no pressure, no obligation.<br />
              <em style={{ color: "rgba(255,255,255,0.4)" }}>"We fight for you and help you through."</em>
            </p>
            <a href="#get-help" style={{ display: "inline-block", background: "transparent", color: "rgba(167,139,250,0.9)", border: "1.5px solid rgba(167,139,250,0.3)", padding: "13px 32px", borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Get a Free Legal Consultation →</a>
          </div>
        </Reveal>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#060f09", color: "rgba(255,255,255,0.3)", padding: "36px 24px", textAlign: "center", borderTop: "1px solid rgba(255,215,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontWeight: 700, color: "#FFD700", fontSize: 16, letterSpacing: "0.05em" }}>ACCIDENT ELVES</span>
          <span style={{ color: "rgba(255,215,0,0.4)", fontSize: 12 }}>· Las Vegas, NV</span>
        </div>
        <p style={{ fontSize: 11, maxWidth: 640, margin: "0 auto 12px", lineHeight: 1.9, color: "rgba(255,255,255,0.25)" }}>
          <strong style={{ color: "rgba(255,255,255,0.4)" }}>Disclaimer:</strong> Accident Elves is not a law firm and does not provide legal advice. We are an independent concierge and referral service. Legal consultations are facilitated through In Your Corner Consulting, which refers to licensed Nevada attorneys. All consultations are free and non-obligatory.
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          © 2026 Accident Elves LLC · <a href="#" style={{ color: "rgba(255,215,0,0.25)" }}>Privacy Policy</a> · <a href="#" style={{ color: "rgba(255,215,0,0.25)" }}>Terms of Service</a>
        </p>
      </div>
    </div>
  );
}

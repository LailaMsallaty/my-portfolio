/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from "react";

const SKILLS = [
  { category: "Languages & Frameworks", items: ["PHP", "Laravel", "JavaScript", "React.js", "HTML/CSS", "CodeIgniter", "Delphi Pascal"] },
  { category: "Databases & APIs", items: ["MySQL", "SQL", "RESTful APIs", "JSON", "Webhooks"] },
  { category: "Integrations", items: ["Shopify", "WooCommerce", "Salla", "Wix", "MyFatoorah", "Neoleap"] },
  { category: "Tools & Practices", items: ["Git / GitHub", "Agile", "Multi-tenancy", "Code Review", "Junior Mentoring"] },
];

const FREELANCE = [
  { title: "Structural Integrity Survey", url: "structuralintegritysurvey.co.uk", desc: "Professional website for a London structural engineering consultancy covering nine specialist services, with custom HTML sections embedded into Hostinger.", tags: ["HTML", "CSS", "JS", "Hostinger"], icon: "🏚️", category: "Freelance" },
  { title: "Build and Ventilation Ltd", url: "buildandventilation.co.uk", desc: "Full business website for a London-based HVAC & mechanical contracting company — services pages, project gallery, and contact/quote form.", tags: ["HTML", "CSS", "JS", "Hostinger"], icon: "🏗️", category: "Freelance" },
  { title: "Bensham Pharmacy", url: "benshampharmacy.co.uk", desc: "Online presence for a UK pharmacy client — professional site covering services, opening hours, and patient information.", tags: ["HTML", "CSS", "JS", "Hostinger"], icon: "💊", category: "Freelance" },
  { title: "Electric Bike Hakim", url: "electricbikehakim.co.uk", desc: "Full e-commerce website & online store for a UK electric bikes and scooters shop — new & used sales, accessories, parts, and repair/servicing.", tags: ["HTML", "CSS", "JS", "Hostinger", "E-Commerce"], icon: "🚲", category: "Freelance" },
];

const PHENIX = [
  { title: "E-Commerce Integrations", url: null, desc: "Integration modules connecting Ph.S with Shopify, WooCommerce, Wix, and Salla — real-time product sync, stock updates, order import, and customer data sync.", tags: ["Delphi Pascal", "SQL", "REST API", "Shopify", "WooCommerce"], icon: "🛒", category: "Phenix Systems" },
  { title: "Wasfaty Integration App", url: null, desc: "App enabling pharmacists to retrieve and dispense NHS-style prescriptions directly within Ph.S with minimal clicks.", tags: ["Delphi Pascal", "SQL", "API Integration", "Healthcare"], icon: "🩺", category: "Phenix Systems" },
  { title: "Phenix Appointments App", url: null, desc: "Integration app that auto-exports appointment data into Ph.S, eliminating manual data entry for clinic and service businesses.", tags: ["CodeIgniter", "SQL", "Automation"], icon: "📅", category: "Phenix Systems" },
  { title: "Payment Gateway Integrations", url: null, desc: "Integrated MyFatoorah and Neoleap payment gateways via REST API into Ph.S, enabling secure online transactions for clients.", tags: ["Delphi Pascal", "SQL", "REST API", "MyFatoorah", "Neoleap"], icon: "💳", category: "Phenix Systems" },
  { title: "Microsoft Dynamics 365 Loyalty", url: null, desc: "Module for redeeming customer loyalty points through Phenix POS — fetching points from Ph.S and updating them in D365 via API.", tags: ["Delphi Pascal", "SQL", "REST API", "POS"], icon: "⭐", category: "Phenix Systems" },
  { title: "Phenix Menu Web App", url: null, desc: "Multi-tenant online ordering platform built from scratch — full admin dashboard, analytics, and user management.", tags: ["PHP", "Laravel", "MySQL", "Multi-tenancy"], icon: "🍽️", category: "Phenix Systems" },
  { title: "Healthcare Module", url: null, desc: "Led a team of 3 developers to build a healthcare module for medical institutions — managed task planning, code reviews, and client delivery.", tags: ["Delphi Pascal", "SQL", "Team Lead", "Healthcare"], icon: "🏥", category: "Phenix Systems" },
  { title: "MySQL Query Optimisation", url: null, desc: "Optimised complex MySQL queries across the Ph.S platform, significantly improving reporting performance on high-volume datasets.", tags: ["SQL", "Performance", "Backend"], icon: "⚙️", category: "Phenix Systems" },
];

const ALL = [...FREELANCE, ...PHENIX];

const C = {
  bg: "#ffffff", bgAlt: "#fdf8fb", bgHero: "#fef6f9", surface: "#ffffff",
  border: "#e8d5e8", text: "#1a0a2e", muted: "#5a3f6e", subtle: "#9070a8",
  pink: "#d4547a", purple: "#5a2d82",
  grad: "linear-gradient(135deg,#e8607a,#8040b0)",
  pinkSoft: "rgba(212,84,122,0.10)", purpleSoft: "rgba(90,45,130,0.08)",
  pinkBorder: "rgba(212,84,122,0.25)", purpleBorder: "rgba(90,45,130,0.20)",
};

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useTyping(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const delay = del ? speed / 2 : ci === w.length ? pause : speed;
    const t = setTimeout(() => {
      if (!del && ci < w.length) { setDisplay(w.slice(0, ci + 1)); setCi(c => c + 1); }
      else if (!del && ci === w.length) { setDel(true); }
      else if (del && ci > 0) { setDisplay(w.slice(0, ci - 1)); setCi(c => c - 1); }
      else { setDel(false); setWi(i => (i + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return display;
}

function Particles() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const init = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const count = Math.floor((canvas.width * canvas.height) / 18000);
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.8, dx: (Math.random() - 0.5) * 0.4, dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.45 + 0.12,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,120,154,${p.o})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(200,130,170,${0.1 * (1 - d / 100)})`; ctx.lineWidth = 0.6; ctx.stroke();
        }
      }));
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, []);
  useEffect(() => {
    init();
    const onR = () => { cancelAnimationFrame(animRef.current); init(); };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", onR); };
  }, [init]);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img src="/logo-lt.png" alt="LailaTech" style={{ height: 58, objectFit: "contain" }} />
        {/* Desktop */}
        <div className="desk-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["about","skills","projects","contact"].map(id => (
            <button key={id} onClick={() => go(id)} style={{ background: "none", border: "none", color: C.muted, fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer" }}>{id}</button>
          ))}
          <button onClick={() => go("contact")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 6, padding: "0.45rem 1.25rem", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>Get a Quote</button>
        </div>
        {/* Mobile hamburger */}
        <button className="mob-nav" onClick={() => setOpen(o => !o)} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, width: 36, height: 36, display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer" }}>
          <span style={{ width: 18, height: 2, background: C.text, borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ width: 18, height: 2, background: C.text, borderRadius: 2, opacity: open ? 0 : 1, transition: "all 0.3s" }} />
          <span style={{ width: 18, height: 2, background: C.text, borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>
      {open && (
        <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {["about","skills","projects","contact"].map(id => (
            <button key={id} onClick={() => go(id)} style={{ background: "none", border: "none", borderBottom: `1px solid ${C.border}`, color: C.text, fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", textAlign: "left", cursor: "pointer", padding: "0.5rem 0", textTransform: "capitalize" }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const typed = useTyping(["Full Stack Developer","Backend Engineer","API Integration Expert","Freelance Developer"]);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" style={{ minHeight: "100vh", background: C.bgHero, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <Particles />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(240,135,154,0.12),transparent 70%)", top: "-15%", right: "-10%", pointerEvents: "none", animation: "floatBlob 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(107,61,143,0.08),transparent 70%)", bottom: "-5%", left: "-5%", pointerEvents: "none", animation: "floatBlob 10s ease-in-out infinite reverse" }} />

      <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem 1.5rem 3rem", width: "100%", position: "relative", zIndex: 1 }}>

        {/* ── LEFT ── */}
        <div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(14px)", transition: "all 0.6s ease", marginBottom: "1.75rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.pinkSoft, border: `1px solid ${C.pinkBorder}`, borderRadius: 100, padding: "0.3rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", fontWeight: 600, color: C.pink, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
              Available for Freelance
            </span>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(22px)", transition: "all 0.75s ease 0.1s" }}>
            <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(3rem,6vw,5.2rem)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 0.75rem", letterSpacing: "-0.03em", color: C.text }}>
              Laila{" "}<span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Msallaty</span>
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem", minHeight: "2rem" }}>
              <div style={{ height: 2, width: 36, background: C.grad, borderRadius: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.88rem,1.8vw,1rem)", color: C.muted, fontWeight: 500 }}>
                {typed}<span style={{ animation: "blink 1s infinite", borderRight: `2px solid ${C.pink}`, marginLeft: 2 }} />
              </span>
            </div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.95rem,1.6vw,1.08rem)", color: C.muted, lineHeight: 1.8, maxWidth: 480, margin: "0 0 2.5rem", fontWeight: 450 }}>
              5+ years building scalable web applications and complex API integrations. Based in{" "}
              <span style={{ color: C.pink, fontWeight: 600 }}>London, UK</span>.
            </p>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.75s ease 0.2s", display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <button onClick={() => go("projects")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 8, padding: "0.85rem 2rem", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", boxShadow: "0 6px 20px rgba(240,135,154,0.28)", transition: "transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(240,135,154,0.38)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(240,135,154,0.28)"; }}>
              View Projects →
            </button>
            <button onClick={() => go("contact")} style={{ background: C.surface, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "0.85rem 2rem", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer", transition: "border-color 0.2s,transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.pink; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}>
              Contact Me
            </button>
          </div>

          <div className="stats-row" style={{ opacity: loaded ? 1 : 0, transition: "all 1s ease 0.4s", paddingTop: "2rem", borderTop: `1px solid ${C.border}` }}>
            {[["5+","Years Experience"],["12+","Projects Delivered"],["4","E-Commerce Platforms"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center", minWidth: 70 }}>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "2.6rem", fontWeight: 800, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: C.subtle, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4, fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT CARD ── */}
        <div className="hero-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24, padding: "2.5rem 2rem", boxShadow: "0 12px 50px rgba(45,21,64,0.1)", width: 290, display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center", textAlign: "center", opacity: loaded ? 1 : 0, transition: "all 1s ease 0.5s", flexShrink: 0 }}>
          <div style={{ width: 130, height: 130, borderRadius: "50%", background: C.bgAlt, border: `2px solid ${C.pinkBorder}`, display: "flex", alignItems: "center", justifyContent: "center", padding: 14, boxShadow: "0 8px 24px rgba(240,135,154,0.18)" }}>
            <img src="/logo-lt.png" alt="LailaTech" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: C.text }}>Laila Msallaty</div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: C.muted, marginTop: 4 }}>Full Stack Developer</div>
          </div>
          {[["🇬🇧","London, UK"],["⚡","PHP · Laravel · React"],["🔗","API Integration Expert"]].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: C.muted }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
          <button onClick={() => go("contact")} style={{ background: C.grad, color: "#fff", borderRadius: 8, padding: "0.65rem 1.5rem", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 600, border: "none", cursor: "pointer", width: "100%", transition: "opacity 0.2s" }}>
            Get a Quote
          </button>
        </div>

      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about-section" ref={ref} style={{ padding: "4rem 1.5rem", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all 0.7s ease" }} className="about-grid">

          {/* Left — text */}
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>About Me</p>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, color: C.text, margin: "0 0 1.25rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Developer & <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Business Owner</span>
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.97rem", color: C.muted, lineHeight: 1.85, marginBottom: "1.25rem" }}>
              I'm Laila Msallaty, a backend and integration engineer with 5+ years of experience building scalable web applications and complex API integrations for clients across the UK and beyond.
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.97rem", color: C.muted, lineHeight: 1.85, marginBottom: "2rem" }}>
              I'm also the founder of <span style={{ color: C.text, fontWeight: 700 }}>LailaTech</span> — a web design & development business based in London, UK, where I help businesses of all sizes build professional, high-performing websites tailored to their goals.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ background: C.pinkSoft, border: `1px solid ${C.pinkBorder}`, borderRadius: 8, padding: "0.6rem 1.2rem" }}>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: C.pink, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Based in</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: C.text, fontWeight: 600, marginTop: 2 }}>🇬🇧 London, UK</div>
              </div>
              <div style={{ background: C.purpleSoft, border: `1px solid ${C.purpleBorder}`, borderRadius: 8, padding: "0.6rem 1.2rem" }}>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: C.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Business</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: C.text, fontWeight: 600, marginTop: 2 }}>💼 LailaTech</div>
              </div>
              <div style={{ background: C.pinkSoft, border: `1px solid ${C.pinkBorder}`, borderRadius: 8, padding: "0.6rem 1.2rem" }}>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: C.pink, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Available</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: C.text, fontWeight: 600, marginTop: 2 }}>✅ Freelance</div>
              </div>
            </div>
          </div>

          {/* Right — LailaTech card */}
          <div style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 20, padding: "2.5rem", textAlign: "center", boxShadow: "0 4px 24px rgba(45,21,64,0.06)" }}>
            <img src="/logo-lt.png" alt="LailaTech" style={{ width: 140, height: 140, objectFit: "contain", marginBottom: "1.5rem" }} />
            <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.5rem", fontWeight: 800, color: C.text, margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>LailaTech</h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", color: C.muted, marginBottom: "1.5rem", lineHeight: 1.65 }}>
              Web Design & Development · London, UK<br />
              Building smart, modern websites that grow your business.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[["🌐","Web Design & Development"],["⚡","API Integrations"],["📱","Responsive & Mobile-First"],["🔧","Ongoing Support"]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0.6rem 1rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", color: C.text, fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: "4rem 1.5rem", background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: "all 0.6s ease" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>Expertise</p>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>Skills & Tech Stack</h2>
        </div>
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div key={s.category} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `all 0.55s ease ${i * 0.1}s`, boxShadow: "0 2px 12px rgba(45,21,64,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <div style={{ width: 3, height: 16, background: C.grad, borderRadius: 2, flexShrink: 0 }} />
                <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: C.muted, margin: 0 }}>{s.category}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {s.items.map((item, j) => (
                  <span key={item} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 4, padding: "0.25rem 0.7rem", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: C.text, fontWeight: 600, opacity: inView ? 1 : 0, transform: inView ? "none" : "scale(0.8)", transition: `all 0.4s ease ${i * 0.1 + j * 0.05}s`, display: "inline-block" }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i, inView }) {
  const isF = p.category === "Freelance";
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.surface, border: `1px solid ${hov ? (isF ? C.pink : C.purple) : C.border}`, borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", opacity: inView ? 1 : 0, transform: inView ? (hov ? "translateY(-4px)" : "none") : "translateY(22px)", transition: `all 0.5s ease ${i * 0.06}s`, boxShadow: hov ? "0 8px 28px rgba(45,21,64,0.1)" : "0 2px 12px rgba(45,21,64,0.04)" }}>
      <div style={{ height: 3, background: isF ? C.grad : "linear-gradient(135deg,#6b3d8f,#4f6dc8)" }} />
      <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "0.85rem", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: isF ? C.pinkSoft : C.purpleSoft, border: `1px solid ${isF ? C.pinkBorder : C.purpleBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0, transition: "transform 0.3s", transform: hov ? "scale(1.1)" : "scale(1)" }}>{p.icon}</div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", fontWeight: 700, color: C.text, margin: "0 0 0.18rem" }}>{p.title}</h3>
              {p.url && <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.76rem", color: C.pink, textDecoration: "none", fontWeight: 500 }}>↗ {p.url}</a>}
            </div>
          </div>
          <span style={{ flexShrink: 0, background: isF ? C.pinkSoft : C.purpleSoft, border: `1px solid ${isF ? C.pinkBorder : C.purpleBorder}`, borderRadius: 4, padding: "0.15rem 0.5rem", fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", color: isF ? C.pink : C.purple, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{p.category}</span>
        </div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: C.muted, lineHeight: 1.65, margin: 0, flex: 1 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", paddingTop: "0.6rem", borderTop: `1px solid ${C.border}` }}>
          {p.tags.map(t => <span key={t} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 4, padding: "0.16rem 0.55rem", fontFamily: "'Inter',sans-serif", fontSize: "0.67rem", color: C.muted, fontWeight: 600 }}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, inView] = useInView();
  const [filter, setFilter] = useState("Freelance");
  const TABS = [{ label: "Freelance", count: FREELANCE.length }, { label: "Phenix Systems", count: PHENIX.length }, { label: "All", count: ALL.length }];
  const visible = filter === "Freelance" ? FREELANCE : filter === "Phenix Systems" ? PHENIX : ALL;
  return (
    <section id="projects" ref={ref} style={{ padding: "4rem 1.5rem", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="projects-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1.25rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: "all 0.6s ease" }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>Work</p>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>Selected Projects</h2>
          </div>
          <div className="filter-tabs" style={{ display: "flex", border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
            {TABS.map((t, i) => (
              <button key={t.label} onClick={() => setFilter(t.label)} style={{ background: filter === t.label ? C.grad : C.bgAlt, color: filter === t.label ? "#fff" : C.muted, border: "none", borderRight: i < TABS.length - 1 ? `1px solid ${C.border}` : "none", padding: "0.5rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: filter === t.label ? 600 : 500, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                {t.label} ({t.count})
              </button>
            ))}
          </div>
        </div>
        <div className="projects-grid">
          {visible.map((p, i) => <ProjectCard key={p.title} p={p} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async () => {
    if (!form.name || !form.email || !form.message) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);
    try {
      await window.emailjs.send("service_h9q2s18", "template_wj0fafa", { name: form.name, email: form.email, message: form.message, title: `Message from ${form.name}` }, "C_-NFAoORxTbo4OmQ");
      setSent(true); setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch { setError("Something went wrong. Please try again."); }
    setLoading(false);
  };
  const inp = { background: C.bgAlt, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "0.82rem 1rem", color: C.text, fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", width: "100%", boxSizing: "border-box", outline: "none" };
  return (
    <section id="contact" ref={ref} style={{ padding: "4rem 1.5rem", background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transition: "all 0.7s ease" }}>
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>Contact</p>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: C.text, margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>Let's Build Something Great</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: C.muted, fontSize: "0.92rem", lineHeight: 1.75, maxWidth: 420, margin: 0 }}>Available for freelance projects and contract engagements.</p>
        </div>
        <div className="contact-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[["📧","lailamsallaty607@gmail.com","mailto:lailamsallaty607@gmail.com"],["💼","linkedin.com/in/laila-msallaty","https://linkedin.com/in/laila-msallaty"],["📞","+44 7857 392770","tel:+447857392770"]].map(([icon, label, href]) => (
              <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: "0.85rem", color: C.muted, fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.pink}
                onMouseLeave={e => e.currentTarget.style.color = C.muted}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{icon}</div>
                {label}
              </a>
            ))}
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "2rem", boxShadow: "0 4px 24px rgba(45,21,64,0.05)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <input name="name" value={form.name} onChange={handle} placeholder="Your name" style={inp} />
              <input name="email" value={form.email} onChange={handle} placeholder="Your email" style={inp} />
              <textarea name="message" value={form.message} onChange={handle} placeholder="Tell me about your project..." rows={5} style={{ ...inp, resize: "vertical" }} />
              {error && <p style={{ color: "#ef4444", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", margin: 0 }}>{error}</p>}
              <button onClick={submit} disabled={loading} style={{ background: sent ? "rgba(34,197,94,0.1)" : C.grad, color: sent ? "#16a34a" : "#fff", border: sent ? "1.5px solid rgba(34,197,94,0.3)" : "none", borderRadius: 8, padding: "0.88rem", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.3s" }}>
                {sent ? "✓ Message Sent!" : loading ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    s.onload = () => window.emailjs.init("C_-NFAoORxTbo4OmQ");
    document.head.appendChild(s);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { font-family:'Inter',sans-serif; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes floatBlob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
        input::placeholder, textarea::placeholder { color:#b09ac0; }
        input:focus, textarea:focus { border-color:rgba(240,135,154,0.5)!important; box-shadow:0 0 0 3px rgba(240,135,154,0.08); }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#e8789a; border-radius:2px; }
        .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:start; }
        .projects-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1.1rem; }
        .skills-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; }
        .hero-grid { display:grid; grid-template-columns:1fr auto; gap:3rem; align-items:center; }
        .stats-row { display:flex; gap:2rem; flex-wrap:nowrap; align-items:center; }
        .hero-card { display:flex !important; }
        .desk-nav { display:flex !important; }
        .mob-nav { display:none !important; }
        @media (max-width: 900px) {
          .hero-card { display:none !important; }
          .hero-grid { grid-template-columns:1fr !important; }
        }
        @media (max-width: 768px) {
          .desk-nav { display:none !important; }
          .mob-nav { display:flex !important; }
          .projects-grid { grid-template-columns:1fr !important; }
          .skills-grid { grid-template-columns:1fr !important; }
          .contact-grid { grid-template-columns:1fr !important; }
          .about-grid { grid-template-columns:1fr !important; gap:2rem !important; }
          .stats-row { gap:1.5rem !important; }
          .hero-grid { padding-top:5rem !important; padding-bottom:2rem !important; }
          .projects-header { flex-direction:column !important; align-items:flex-start !important; }
          .filter-tabs { width:100% !important; }
          .filter-tabs button { flex:1 !important; font-size:0.72rem !important; padding:0.45rem 0.5rem !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer style={{ textAlign: "center", padding: "1.5rem", borderTop: `1px solid ${C.border}`, fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", color: C.subtle, background: C.bg }}>
        © 2026 Laila Msallaty · All rights reserved · Backend & Integration Engineer · London, UK
      </footer>
    </div>
  );
}
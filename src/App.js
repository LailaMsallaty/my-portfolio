/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

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
  border: "#f0e4ee", text: "#2d1540", muted: "#7a5f8a", subtle: "#b09ac0",
  pink: "#e8789a", purple: "#6b3d8f",
  grad: "linear-gradient(135deg,#f0879a,#9b6bbf)",
  pinkSoft: "rgba(240,135,154,0.10)", purpleSoft: "rgba(107,61,143,0.08)",
  pinkBorder: "rgba(240,135,154,0.25)", purpleBorder: "rgba(107,61,143,0.20)",
};

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useTyping(words, speed = 100, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === current.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────

function Particles() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const count = Math.floor((canvas.width * canvas.height) / 18000);
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.8,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.15,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,120,154,${p.o})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      // lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200,130,170,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, []);

  useEffect(() => {
    init();
    const onResize = () => { cancelAnimationFrame(animRef.current); init(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", onResize); };
  }, [init]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img src="/logo-lt.png" alt="LailaTech" style={{ height: 38, objectFit: "contain" }} />

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {["about","skills","projects","contact"].map(id => (
            <button key={id} onClick={() => go(id)} style={{ background: "none", border: "none", color: C.muted, fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", transition: "color 0.2s" }}>
              {id}
            </button>
          ))}
          <button onClick={() => go("contact")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 6, padding: "0.45rem 1.25rem", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
            Get a Quote
          </button>
        </div>

        {/* Mobile: hamburger only */}
        <div style={{ display: "flex", alignItems: "center" }} className="mobile-nav">
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, width: 36, height: 36, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer", padding: "0 8px" }}>
            <span style={{ width: 18, height: 2, background: C.text, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ width: 18, height: 2, background: C.text, borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 18, height: 2, background: C.text, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {["about","skills","projects","contact"].map(id => (
            <button key={id} onClick={() => go(id)} style={{ background: "none", border: "none", color: C.text, fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", textAlign: "left", cursor: "pointer", padding: "0.5rem 0", textTransform: "capitalize", borderBottom: `1px solid ${C.border}` }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const typed = useTyping(["Full Stack Developer", "Backend Engineer", "API Integration Expert", "Freelance Developer"], 80, 2000);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" style={{ minHeight: "100vh", background: C.bgHero, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <Particles />
      {/* blobs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(240,135,154,0.13),transparent 70%)", top: "-15%", right: "-10%", pointerEvents: "none", animation: "floatBlob 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(107,61,143,0.09),transparent 70%)", bottom: "-5%", left: "-5%", pointerEvents: "none", animation: "floatBlob 10s ease-in-out infinite reverse" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 1.5rem 4rem", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(14px)", transition: "all 0.6s ease", marginBottom: "1.75rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.pinkSoft, border: `1px solid ${C.pinkBorder}`, borderRadius: 100, padding: "0.3rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", fontWeight: 600, color: C.pink, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
            Available for Freelance
          </span>
        </div>

        {/* Name */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(22px)", transition: "all 0.75s ease 0.1s" }}>
          <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(2.8rem,7vw,5rem)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 0.75rem", letterSpacing: "-0.03em", color: C.text }}>
            Laila{" "}
            <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Msallaty</span>
          </h1>

          {/* Typing */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem", minHeight: "2rem" }}>
            <div style={{ height: 2, width: 36, background: C.grad, borderRadius: 2, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.9rem,2vw,1.05rem)", color: C.muted, fontWeight: 500 }}>
              {typed}
              <span style={{ animation: "blink 1s infinite", borderRight: `2px solid ${C.pink}`, marginLeft: 2 }} />
            </span>
          </div>

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.9rem,1.8vw,1rem)", color: C.muted, lineHeight: 1.8, maxWidth: 520, margin: "0 0 2.5rem" }}>
            5+ years building scalable web applications and complex API integrations. Based in{" "}
            <span style={{ color: C.pink, fontWeight: 600 }}>London, UK</span>.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.75s ease 0.2s", display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          <button onClick={() => go("projects")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 8, padding: "0.85rem 2rem", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", boxShadow: "0 6px 20px rgba(240,135,154,0.28)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(240,135,154,0.38)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(240,135,154,0.28)"; }}>
            View Projects →
          </button>
          <button onClick={() => go("contact")} style={{ background: C.surface, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "0.85rem 2rem", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer", transition: "border-color 0.2s, transform 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.pink; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}>
            Contact Me
          </button>
        </div>

        {/* Stats */}
        <div style={{ opacity: loaded ? 1 : 0, transition: "all 1s ease 0.4s", display: "flex", gap: "2rem", paddingTop: "2rem", borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {[["5+","Years Experience"],["12+","Projects Delivered"],["4","E-Commerce Platforms"],["2","Countries"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "2rem", fontWeight: 800, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", color: C.subtle, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: "6rem 1.5rem", background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: "all 0.6s ease" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>Expertise</p>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>Skills & Tech Stack</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1rem" }}>
          {SKILLS.map((s, i) => (
            <div key={s.category} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `all 0.55s ease ${i * 0.08}s`, boxShadow: "0 2px 12px rgba(45,21,64,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <div style={{ width: 3, height: 16, background: C.grad, borderRadius: 2, flexShrink: 0 }} />
                <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: C.muted, margin: 0 }}>{s.category}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {s.items.map(item => (
                  <span key={item} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 4, padding: "0.22rem 0.65rem", fontFamily: "'Inter',sans-serif", fontSize: "0.76rem", color: C.text, fontWeight: 500, transition: "background 0.2s" }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({ p, i, inView }) {
  const isF = p.category === "Freelance";
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: C.surface, border: `1px solid ${hovered ? (isF ? C.pink : C.purple) : C.border}`, borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", opacity: inView ? 1 : 0, transform: inView ? (hovered ? "translateY(-4px)" : "none") : "translateY(22px)", transition: `all 0.5s ease ${i * 0.06}s`, boxShadow: hovered ? `0 8px 28px rgba(45,21,64,0.1)` : "0 2px 12px rgba(45,21,64,0.04)" }}>
      <div style={{ height: 3, background: isF ? C.grad : "linear-gradient(135deg,#6b3d8f,#4f6dc8)" }} />
      <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "0.85rem", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: isF ? C.pinkSoft : C.purpleSoft, border: `1px solid ${isF ? C.pinkBorder : C.purpleBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0, transition: "transform 0.3s", transform: hovered ? "scale(1.1)" : "scale(1)" }}>
              {p.icon}
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.92rem", fontWeight: 700, color: C.text, margin: "0 0 0.18rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</h3>
              {p.url && <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", color: C.pink, textDecoration: "none", fontWeight: 500 }}>↗ {p.url}</a>}
            </div>
          </div>
          <span style={{ flexShrink: 0, background: isF ? C.pinkSoft : C.purpleSoft, border: `1px solid ${isF ? C.pinkBorder : C.purpleBorder}`, borderRadius: 4, padding: "0.15rem 0.5rem", fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", color: isF ? C.pink : C.purple, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{p.category}</span>
        </div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.83rem", color: C.muted, lineHeight: 1.65, margin: 0, flex: 1 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", paddingTop: "0.6rem", borderTop: `1px solid ${C.border}` }}>
          {p.tags.map(t => (
            <span key={t} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 4, padding: "0.16rem 0.55rem", fontFamily: "'Inter',sans-serif", fontSize: "0.67rem", color: C.muted, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects() {
  const [ref, inView] = useInView();
  const [filter, setFilter] = useState("Freelance");
  const TABS = [{ label: "Freelance", count: FREELANCE.length }, { label: "Phenix Systems", count: PHENIX.length }, { label: "All", count: ALL.length }];
  const visible = filter === "Freelance" ? FREELANCE : filter === "Phenix Systems" ? PHENIX : ALL;
  return (
    <section id="projects" ref={ref} style={{ padding: "6rem 1.5rem", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1.25rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: "all 0.6s ease" }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>Work</p>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>Selected Projects</h2>
          </div>
          <div style={{ display: "flex", border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
            {TABS.map((t, i) => (
              <button key={t.label} onClick={() => setFilter(t.label)} style={{ background: filter === t.label ? C.grad : C.bgAlt, color: filter === t.label ? "#fff" : C.muted, border: "none", borderRight: i < TABS.length - 1 ? `1px solid ${C.border}` : "none", padding: "0.5rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", fontWeight: filter === t.label ? 600 : 500, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                {t.label} ({t.count})
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.1rem" }}>
          {visible.map((p, i) => <ProjectCard key={p.title} p={p} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

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
  const inp = { background: C.bgAlt, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "0.82rem 1rem", color: C.text, fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", width: "100%", boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" };
  return (
    <section id="contact" ref={ref} style={{ padding: "6rem 1.5rem", background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transition: "all 0.7s ease" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>Contact</p>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: C.text, margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>Let's Build Something Great</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", color: C.muted, fontSize: "0.92rem", lineHeight: 1.75, maxWidth: 420, margin: 0 }}>
            Available for freelance projects and contract engagements. Let's talk about your next project.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "3rem", alignItems: "start" }}>
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
              <input name="name" value={form.name} onChange={handle} placeholder="Your name" style={inp}
                onFocus={e => e.target.style.borderColor = "rgba(240,135,154,0.5)"}
                onBlur={e => e.target.style.borderColor = C.border} />
              <input name="email" value={form.email} onChange={handle} placeholder="Your email" style={inp}
                onFocus={e => e.target.style.borderColor = "rgba(240,135,154,0.5)"}
                onBlur={e => e.target.style.borderColor = C.border} />
              <textarea name="message" value={form.message} onChange={handle} placeholder="Tell me about your project..." rows={5} style={{ ...inp, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "rgba(240,135,154,0.5)"}
                onBlur={e => e.target.style.borderColor = C.border} />
              {error && <p style={{ color: "#ef4444", fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", margin: 0 }}>{error}</p>}
              <button onClick={submit} disabled={loading}
                style={{ background: sent ? "rgba(34,197,94,0.1)" : C.grad, color: sent ? "#16a34a" : "#fff", border: sent ? "1.5px solid rgba(34,197,94,0.3)" : "none", borderRadius: 8, padding: "0.88rem", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.3s, transform 0.2s" }}
                onMouseEnter={e => { if (!loading && !sent) e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                {sent ? "✓ Message Sent!" : loading ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

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
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#e8789a; border-radius:2px; }
        .desktop-nav { display:flex !important; }
        .mobile-nav { display:none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display:none !important; }
          .mobile-nav { display:flex !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <footer style={{ textAlign:"center", padding:"1.5rem", borderTop:`1px solid ${C.border}`, fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", color:C.subtle, background:C.bg }}>
        © 2026 Laila Msallaty · All rights reserved · Backend & Integration Engineer · London, UK
      </footer>
    </div>
  );
}

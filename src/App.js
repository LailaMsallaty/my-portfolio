import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { category: "Languages & Frameworks", items: ["PHP", "Laravel", "JavaScript", "React.js", "HTML/CSS", "CodeIgniter", "Delphi Pascal"] },
  { category: "Databases & APIs", items: ["MySQL", "SQL", "RESTful APIs", "JSON", "Webhooks"] },
  { category: "Integrations", items: ["Shopify", "WooCommerce", "Salla", "Wix", "MyFatoorah", "Neoleap"] },
  { category: "Enterprise Systems", items: ["Microsoft Dynamics 365", "Wasfaty", "POS Systems"] },
  { category: "Tools & Practices", items: ["Git / GitHub", "Agile", "Multi-tenancy", "Code Review", "Junior Mentoring"] },
];

const FREELANCE = [
  { title: "Structural Integrity Survey", url: "structuralintegritysurvey.co.uk", desc: "Professional website for a London structural engineering consultancy covering nine specialist services, with custom HTML sections embedded into Hostinger.", tags: ["HTML", "CSS", "JS", "Hostinger"], icon: "🏚️", category: "Freelance" },
  { title: "Build and Ventilation Ltd", url: "buildandventilation.co.uk", desc: "Full business website for a London-based HVAC & mechanical contracting company — services pages, project gallery, and contact/quote form.", tags: ["HTML", "CSS", "JS", "Hostinger"], icon: "🏗️", category: "Freelance" },
  { title: "Bensham Pharmacy", url: "benshampharmacy.co.uk", desc: "Online presence for a UK pharmacy client — professional site covering services, opening hours, and patient information.", tags: ["HTML", "CSS", "JS", "Hostinger"], icon: "💊", category: "Freelance" },
  { title: "Electric Bike Hakim", url: "electricbikehakim.co.uk", desc: "Full e-commerce website & online store for a UK electric bikes and scooters shop — covering new & used sales, accessories, parts, and a repair/servicing section.", tags: ["HTML", "CSS", "JS", "Hostinger", "E-Commerce"], icon: "🚲", category: "Freelance" },
];

const PHENIX = [
  { title: "E-Commerce Integrations", url: null, desc: "Integration modules connecting the Ph.S accounting platform with Shopify, WooCommerce, Wix, and Salla — real-time product sync, automated stock updates, order import, and customer data synchronisation.", tags: ["Delphi Pascal", "SQL", "REST API", "Shopify", "WooCommerce"], icon: "🛒", category: "Phenix Systems" },
  { title: "Wasfaty Integration App", url: null, desc: "App enabling pharmacists to retrieve and dispense NHS-style prescriptions directly within Ph.S with minimal clicks.", tags: ["Delphi Pascal", "SQL", "API Integration", "Healthcare"], icon: "🩺", category: "Phenix Systems" },
  { title: "Phenix Appointments App", url: null, desc: "Integration app that auto-exports appointment data into Ph.S, eliminating manual data entry for clinic and service businesses.", tags: ["CodeIgniter", "SQL", "Automation"], icon: "📅", category: "Phenix Systems" },
  { title: "Payment Gateway Integrations", url: null, desc: "Integrated MyFatoorah and Neoleap payment gateways via REST API into the Ph.S platform, enabling secure online transactions for clients.", tags: ["Delphi Pascal", "SQL", "REST API", "MyFatoorah", "Neoleap"], icon: "💳", category: "Phenix Systems" },
  { title: "Microsoft Dynamics 365 Loyalty Module", url: null, desc: "Module for redeeming customer loyalty points through Phenix POS — fetching points from Ph.S and updating them in D365 Loyalty via API.", tags: ["Delphi Pascal", "SQL", "REST API", "POS"], icon: "⭐", category: "Phenix Systems" },
  { title: "Phenix Menu Web App", url: null, desc: "Multi-tenant online ordering platform built from scratch without external packages — full admin dashboard, analytics, and user management.", tags: ["PHP", "Laravel", "MySQL", "Multi-tenancy"], icon: "🍽️", category: "Phenix Systems" },
  { title: "Healthcare Module", url: null, desc: "Led a team of 3 developers to build a healthcare module for medical institutions within Ph.S — managed task planning, code reviews, and client delivery.", tags: ["Delphi Pascal", "SQL", "Team Lead", "Healthcare"], icon: "🏥", category: "Phenix Systems" },
  { title: "MySQL Query Optimisation", url: null, desc: "Optimised complex MySQL queries across the Ph.S platform, significantly improving reporting performance on high-volume datasets.", tags: ["SQL", "Performance", "Backend"], icon: "⚙️", category: "Phenix Systems" },
];

const ALL_PROJECTS = [...FREELANCE, ...PHENIX];

const C = {
  bg: "#ffffff",
  bgAlt: "#fdf8fb",
  bgHero: "#fef6f8",
  surface: "#ffffff",
  border: "#f0e4ee",
  text: "#2d1540",
  muted: "#7a5f8a",
  subtle: "#b09ac0",
  pink: "#e8789a",
  purple: "#6b3d8f",
  grad: "linear-gradient(135deg, #f0879a, #9b6bbf)",
  pinkSoft: "rgba(240,135,154,0.1)",
  purpleSoft: "rgba(107,61,143,0.08)",
  pinkBorder: "rgba(240,135,154,0.25)",
  purpleBorder: "rgba(107,61,143,0.2)",
};

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 3rem", background: scrolled ? "rgba(255,255,255,0.96)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 0.3s" }}>
      <img src="/logo-lt.png" alt="LailaTech" style={{ height: 40, width: "auto", objectFit: "contain" }} />
      <div className="nav-links">
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", color: C.muted, fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: C.grad, color: "#fff", borderRadius: 6, padding: "0.5rem 1.4rem", fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "0.03em" }}>Get a Quote</button>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: C.bgHero }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,135,154,0.1), transparent 70%)", top: "-10%", right: "-10%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(107,61,143,0.07), transparent 70%)", bottom: "0%", left: "-5%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #e0c8d8 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.3, pointerEvents: "none" }} />

      <div className="hero-grid" style={{ maxWidth: 1150, margin: "0 auto", padding: "8rem 3rem 5rem", width: "100%", position: "relative", zIndex: 1 }}>
        <div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(14px)", transition: "all 0.6s ease", marginBottom: "1.75rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.pinkSoft, border: `1px solid ${C.pinkBorder}`, borderRadius: 100, padding: "0.3rem 1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: C.pink, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
              Available for Freelance
            </span>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(22px)", transition: "all 0.75s ease 0.1s" }}>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.8rem,7vw,5.2rem)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 1rem", letterSpacing: "-0.03em", color: C.text }}>
              Laila{" "}
              <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Msallaty</span>
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem" }}>
              <div style={{ height: 2, width: 36, background: C.grad, borderRadius: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: C.muted, fontWeight: 400 }}>Backend & Integration Engineer · Full Stack Developer</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: C.muted, lineHeight: 1.8, maxWidth: 500, margin: "0 0 2.5rem" }}>
              5+ years building scalable web applications and complex API integrations. Based in <span style={{ color: C.pink, fontWeight: 600 }}>London, UK</span>.
            </p>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.75s ease 0.2s", display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}>
            <button onClick={() => scrollTo("projects")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 8, padding: "0.85rem 2rem", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", boxShadow: "0 6px 20px rgba(240,135,154,0.3)" }}>
              View Projects →
            </button>
            <button onClick={() => scrollTo("contact")} style={{ background: C.surface, color: C.text, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "0.85rem 2rem", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer" }}>
              Contact Me
            </button>
          </div>

          <div className="stats-row" style={{ opacity: loaded ? 1 : 0, transition: "all 1s ease 0.4s", paddingTop: "2rem", borderTop: `1px solid ${C.border}`, justifyContent: "center" }}>
            {[["5+", "Years Experience"], ["12+", "Projects Delivered"], ["4", "E-Commerce Platforms"], ["2", "Countries"]].map(([n, l], i) => (
              <div key={l} style={{ paddingRight: "2.5rem", marginRight: "2.5rem", borderRight: i < 3 ? `1px solid ${C.border}` : "none", marginBottom: "0.5rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "2rem", fontWeight: 800, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: C.subtle, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "2rem", boxShadow: "0 8px 40px rgba(45,21,64,0.08)", minWidth: 220, flexDirection: "column", gap: "1.5rem", alignItems: "center", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>👩‍💻</div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", color: C.text }}>Laila Msallaty</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: C.muted, marginTop: 3 }}>Full Stack Developer</div>
          </div>
          {[["🇬🇧", "London, UK"], ["⚡", "PHP · Laravel · React"], ["🔗", "API Integration Expert"]].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: C.muted }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: C.grad, color: "#fff", borderRadius: 8, padding: "0.6rem 1.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 600, border: "none", cursor: "pointer", width: "100%" }}>
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: "7rem 3rem", background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-header" style={{ marginBottom: "3.5rem" }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>Expertise</p>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>Skills & Tech Stack</h2>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", color: C.muted, fontSize: "0.88rem", maxWidth: 320, lineHeight: 1.7, margin: 0 }}>
            Full-stack capabilities with a backend focus — from API integrations to production-grade web apps.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1px", background: C.border, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 20px rgba(45,21,64,0.05)" }}>
          {SKILLS.map((s, i) => (
            <div key={s.category} style={{ background: C.surface, padding: "1.75rem 2rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: `all 0.5s ease ${i * 0.07}s` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <div style={{ width: 3, height: 16, background: C.grad, borderRadius: 2, flexShrink: 0 }} />
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: C.muted, margin: 0 }}>{s.category}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {s.items.map(item => (
                  <span key={item} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 4, padding: "0.25rem 0.7rem", fontFamily: "'Inter', sans-serif", fontSize: "0.77rem", color: C.text, fontWeight: 500 }}>{item}</span>
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
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transition: `all 0.55s ease ${i * 0.06}s`, display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(45,21,64,0.04)" }}>
      <div style={{ height: 3, background: isF ? C.grad : "linear-gradient(135deg,#6b3d8f,#4f6dc8)" }} />
      <div style={{ padding: "1.6rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: isF ? C.pinkSoft : C.purpleSoft, border: `1px solid ${isF ? C.pinkBorder : C.purpleBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>
              {p.icon}
            </div>
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: C.text, margin: "0 0 0.2rem" }}>{p.title}</h3>
              {p.url && (
                <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.71rem", color: C.pink, textDecoration: "none", fontWeight: 500 }}>
                  ↗ {p.url}
                </a>
              )}
            </div>
          </div>
          <span style={{ background: isF ? C.pinkSoft : C.purpleSoft, border: `1px solid ${isF ? C.pinkBorder : C.purpleBorder}`, borderRadius: 4, padding: "0.18rem 0.55rem", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: isF ? C.pink : C.purple, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{p.category}</span>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", color: C.muted, lineHeight: 1.7, margin: 0, flex: 1 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", paddingTop: "0.75rem", borderTop: `1px solid ${C.border}` }}>
          {p.tags.map(t => (
            <span key={t} style={{ background: C.bgAlt, border: `1px solid ${C.border}`, borderRadius: 4, padding: "0.18rem 0.58rem", fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: C.muted, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, inView] = useInView();
  const [activeFilter, setActiveFilter] = useState("Freelance");
  const FILTERS = [{ label: "Freelance", count: FREELANCE.length }, { label: "Phenix Systems", count: PHENIX.length }, { label: "All", count: ALL_PROJECTS.length }];
  const visible = activeFilter === "Freelance" ? FREELANCE : activeFilter === "Phenix Systems" ? PHENIX : ALL_PROJECTS;
  return (
    <section id="projects" ref={ref} style={{ padding: "7rem 3rem", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>Work</p>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>Selected Projects</h2>
          </div>
          <div style={{ display: "flex", gap: "0", border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
            {FILTERS.map((f, i) => (
              <button key={f.label} onClick={() => setActiveFilter(f.label)} style={{ background: activeFilter === f.label ? C.grad : C.bgAlt, color: activeFilter === f.label ? "#fff" : C.muted, border: "none", borderRight: i < FILTERS.length - 1 ? `1px solid ${C.border}` : "none", padding: "0.55rem 1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: activeFilter === f.label ? 600 : 500, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                {f.label} <span style={{ opacity: 0.65, fontSize: "0.68rem" }}>({f.count})</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.2rem" }}>
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
  const inp = { background: C.bgAlt, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "0.85rem 1rem", color: C.text, fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", width: "100%", boxSizing: "border-box", outline: "none" };
  return (
    <section id="contact" ref={ref} style={{ padding: "7rem 3rem", background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transition: "all 0.7s ease" }}>
        <div className="contact-grid">
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", color: C.pink, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>Contact</p>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, color: C.text, margin: "0 0 1.25rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Let's Build<br />Something Great
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: C.muted, fontSize: "0.92rem", lineHeight: 1.8, margin: "0 0 2.5rem", maxWidth: 360 }}>
              Available for freelance projects and contract engagements. Let's talk about your next project.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[["📧", "lailamsallaty607@gmail.com", "mailto:lailamsallaty607@gmail.com"], ["💼", "linkedin.com/in/laila-msallaty", "https://linkedin.com/in/laila-msallaty"], ["📞", "+44 7857 392770", "tel:+447857392770"]].map(([icon, label, href]) => (
                <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: "0.85rem", color: C.muted, fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", textDecoration: "none" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{icon}</div>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "2.5rem", boxShadow: "0 4px 24px rgba(45,21,64,0.06)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input name="name" value={form.name} onChange={handle} placeholder="Your name" style={inp} />
              <input name="email" value={form.email} onChange={handle} placeholder="Your email" style={inp} />
              <textarea name="message" value={form.message} onChange={handle} placeholder="Tell me about your project..." rows={5} style={{ ...inp, resize: "vertical" }} />
              {error && <p style={{ color: "#ef4444", fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", margin: 0 }}>{error}</p>}
              <button onClick={submit} disabled={loading} style={{ background: sent ? "rgba(34,197,94,0.1)" : C.grad, color: sent ? "#16a34a" : "#fff", border: sent ? "1.5px solid rgba(34,197,94,0.3)" : "none", borderRadius: 8, padding: "0.9rem", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: loading ? "wait" : "pointer", transition: "all 0.3s", opacity: loading ? 0.7 : 1, boxShadow: sent ? "none" : "0 4px 16px rgba(240,135,154,0.25)" }}>
                {sent ? "✓ Message Sent!" : loading ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.onload = () => window.emailjs.init("C_-NFAoORxTbo4OmQ");
    document.head.appendChild(script);
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        input::placeholder, textarea::placeholder { color: #b09ac0; }
        input:focus, textarea:focus { border-color: rgba(240,135,154,0.5) !important; box-shadow: 0 0 0 3px rgba(240,135,154,0.08); }
        button:hover { opacity: 0.88; }
        a:hover { opacity: 0.8; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #fdf8fb; }
        ::-webkit-scrollbar-thumb { background: #e8789a; border-radius: 2px; }

        .hero-grid { display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        .hero-card { display: flex; }
        .nav-links { display: flex; gap: 2.5rem; }
        .section-header { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .stats-row { display: flex; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hero-card { display: none !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .section-header { flex-direction: column; align-items: flex-start !important; }
        }

        @media (max-width: 640px) {
          nav { padding: 0 1.25rem !important; }
          .nav-links { display: none !important; }
          section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; padding-top: 5rem !important; padding-bottom: 5rem !important; }
          footer { padding-left: 1.25rem !important; padding-right: 1.25rem !important; flex-direction: column; text-align: center; }
          .stats-row { gap: 1.5rem !important; justify-content: center; }
          .stats-row > div { padding-right: 1.5rem !important; margin-right: 1.5rem !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", padding: "1.5rem 3rem", borderTop: `1px solid ${C.border}`, fontFamily: "'Inter', sans-serif", fontSize: "0.76rem", color: C.subtle, background: C.bg }}>
        <span>© 2026 Laila Msallaty. All rights reserved.</span>
        <span>Backend & Integration Engineer · London, UK</span>
      </footer>
    </div>
  );
}

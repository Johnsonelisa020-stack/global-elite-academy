============================================================
// GLOBAL ELITE ACADEMY — App.jsx PART 1 of 4
// Navigation + Hero + Announcement Bar + Auth Modal
// Design: World-class 2026–2030 Educational Platform
// Contact: johnsonelisa020@gmail.com
// ============================================================

import { useState, useEffect, useRef } from "react";

// ── LANGUAGE STRINGS ────────────────────────────────────────
const LANGS = {
  en: {
    nav: {
      home: "Home", courses: "Courses", tutorials: "Tutorials",
      exams: "Exams", library: "Library", tutors: "Tutors",
      pricing: "Pricing", blog: "Blog", about: "About", contact: "Contact",
      login: "Sign In", signup: "Get Started Free",
    },
    hero: {
      badge: "🌍 Ranked #1 African EdTech Platform 2026",
      h1a: "Learn Without",
      h1b: "Limits.",
      sub: "World-class education from Primary to University level. 500+ courses, live tutors, and AI-powered learning — all in one place.",
      cta1: "Start Learning Free",
      cta2: "Browse Courses",
      stat1: "Students", stat2: "Courses", stat3: "Countries", stat4: "Tutors",
    },
    announce: "🎉 First 10 Exams FREE for every student — No credit card needed!",
  },
  sw: {
    nav: {
      home: "Nyumbani", courses: "Kozi", tutorials: "Mafunzo",
      exams: "Mitihani", library: "Maktaba", tutors: "Walimu",
      pricing: "Bei", blog: "Blogu", about: "Kuhusu", contact: "Mawasiliano",
      login: "Ingia", signup: "Anza Bure",
    },
    hero: {
      badge: "🌍 Jukwaa #1 la Elimu Afrika 2026",
      h1a: "Jifunze Bila",
      h1b: "Mipaka.",
      sub: "Elimu ya daraja la kwanza kuanzia Shule ya Msingi hadi Chuo Kikuu. Kozi 500+, walimu wa moja kwa moja, na AI.",
      cta1: "Anza Kujifunza Bure",
      cta2: "Angalia Kozi",
      stat1: "Wanafunzi", stat2: "Kozi", stat3: "Nchi", stat4: "Walimu",
    },
    announce: "🎉 Mitihani 10 ya kwanza BURE kwa kila mwanafunzi!",
  },
  fr: {
    nav: {
      home: "Accueil", courses: "Cours", tutorials: "Tutoriels",
      exams: "Examens", library: "Bibliothèque", tutors: "Tuteurs",
      pricing: "Tarifs", blog: "Blog", about: "À propos", contact: "Contact",
      login: "Connexion", signup: "Commencer Gratuitement",
    },
    hero: {
      badge: "🌍 Plateforme EdTech #1 en Afrique 2026",
      h1a: "Apprenez Sans",
      h1b: "Limites.",
      sub: "Éducation de classe mondiale du primaire à l'université. 500+ cours, tuteurs en direct et apprentissage par IA.",
      cta1: "Commencer Gratuitement",
      cta2: "Explorer les Cours",
      stat1: "Étudiants", stat2: "Cours", stat3: "Pays", stat4: "Tuteurs",
    },
    announce: "🎉 Les 10 premiers examens GRATUITS pour chaque étudiant!",
  },
  de: {
    nav: {
      home: "Startseite", courses: "Kurse", tutorials: "Tutorials",
      exams: "Prüfungen", library: "Bibliothek", tutors: "Tutoren",
      pricing: "Preise", blog: "Blog", about: "Über uns", contact: "Kontakt",
      login: "Anmelden", signup: "Kostenlos starten",
    },
    hero: {
      badge: "🌍 #1 Afrikanische EdTech-Plattform 2026",
      h1a: "Lernen ohne",
      h1b: "Grenzen.",
      sub: "Weltklasse-Bildung von der Grundschule bis zur Universität. 500+ Kurse, Live-Tutoren und KI-gestütztes Lernen.",
      cta1: "Kostenlos starten",
      cta2: "Kurse entdecken",
      stat1: "Studenten", stat2: "Kurse", stat3: "Länder", stat4: "Tutoren",
    },
    announce: "🎉 Die ersten 10 Prüfungen KOSTENLOS für jeden Studenten!",
  },
  zh: {
    nav: {
      home: "首页", courses: "课程", tutorials: "教程",
      exams: "考试", library: "图书馆", tutors: "导师",
      pricing: "价格", blog: "博客", about: "关于", contact: "联系",
      login: "登录", signup: "免费开始",
    },
    hero: {
      badge: "🌍 2026年非洲第一教育平台",
      h1a: "无限制",
      h1b: "学习。",
      sub: "从小学到大学的世界级教育。500+课程、现场导师和AI驱动学习。",
      cta1: "免费开始学习",
      cta2: "浏览课程",
      stat1: "学生", stat2: "课程", stat3: "国家", stat4: "导师",
    },
    announce: "🎉 每位学生前10次考试免费！",
  },
};

// ── COUNTER ANIMATION HOOK ────────────────────────────────────
function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// ── AUTH MODAL ───────────────────────────────────────────────
function AuthModal({ mode, onClose, onAuth, lang }) {
  const [tab, setTab] = useState(mode); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "", level: "primary" });
  const [loading, setLoading] = useState(false);

  const levels = [
    { value: "primary", label: "Primary School" },
    { value: "secondary", label: "Secondary School (O-Level)" },
    { value: "advanced", label: "Advanced Level (A-Level)" },
    { value: "diploma", label: "Diploma" },
    { value: "degree", label: "Undergraduate Degree" },
    { value: "masters", label: "Masters / Postgraduate" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({ name: form.name || form.email.split("@")[0], email: form.email, level: form.level, plan: "free", freeExams: 10, freeBooks: 10 });
      onClose();
    }, 1200);
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>✕</button>
        <div style={styles.modalLogo}>🎓 Global Elite Academy</div>

        <div style={styles.tabRow}>
          {["login", "signup"].map(t => (
            <button key={t} style={{ ...styles.tabBtn, ...(tab === t ? styles.tabActive : {}) }}
              onClick={() => setTab(t)}>
              {t === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {tab === "signup" && (
          <input style={styles.input} placeholder="Full Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
        )}
        <input style={styles.input} placeholder="Email Address" type="email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input style={styles.input} placeholder="Password" type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} />

        {tab === "signup" && (
          <select style={styles.input} value={form.level}
            onChange={e => setForm({ ...form, level: e.target.value })}>
            {levels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        )}

        <button style={styles.authBtn} onClick={handleSubmit} disabled={loading}>
          {loading ? "⏳ Please wait..." : tab === "login" ? "Sign In" : "Create Free Account"}
        </button>

        {tab === "signup" && (
          <p style={styles.authNote}>
            ✅ Free account includes: <strong>10 free exams</strong> + <strong>10 free books</strong>
          </p>
        )}

        <div style={styles.socialAuth}>
          <p style={{ color: "#888", fontSize: 13, marginBottom: 10 }}>Or continue with</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {["Google", "Facebook"].map(s => (
              <button key={s} style={styles.socialBtn}>
                {s === "Google" ? "🔴" : "🔵"} {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ANNOUNCEMENT BAR ─────────────────────────────────────────
function AnnouncementBar({ lang }) {
  const [visible, setVisible] = useState(true);
  const t = LANGS[lang] || LANGS.en;
  if (!visible) return null;
  return (
    <div style={styles.announcebar}>
      <span>{t.announce}</span>
      <button style={styles.announceClose} onClick={() => setVisible(false)}>✕</button>
    </div>
  );
}

// ── NAVBAR ───────────────────────────────────────────────────
function Navbar({ lang, setLang, user, onLogin, onSignup, onLogout, onNav, currentPage }) {
  const t = (LANGS[lang] || LANGS.en).nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { key: "home", label: t.home, page: "home" },
    { key: "courses", label: t.courses, page: "courses", dropdown: ["Primary", "Secondary", "A-Level", "Diploma", "Degree", "Masters"] },
    { key: "tutorials", label: t.tutorials, page: "tutorials" },
    { key: "exams", label: t.exams, page: "exams" },
    { key: "library", label: t.library, page: "library" },
    { key: "tutors", label: t.tutors, page: "tutors" },
    { key: "pricing", label: t.pricing, page: "pricing" },
    { key: "blog", label: t.blog, page: "blog" },
    { key: "about", label: t.about, page: "about" },
    { key: "contact", label: t.contact, page: "contact" },
  ];

  const langFlags = { en: "🇺🇸", sw: "🇹🇿", fr: "🇫🇷", de: "🇩🇪", zh: "🇨🇳" };

  return (
    <nav style={{ ...styles.navbar, ...(scrolled ? styles.navScrolled : {}) }}>
      <div style={styles.navInner}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => onNav("home")}>
          <span style={styles.logoIcon}>🎓</span>
          <span style={styles.logoText}>Global Elite <span style={{ color: "#00d4aa" }}>Academy</span></span>
        </div>

        {/* Desktop Links */}
        <div style={styles.navLinks}>
          {navLinks.map(link => (
            <div key={link.key} style={styles.navItem}
              onMouseEnter={() => link.dropdown && setDropdownOpen(link.key)}
              onMouseLeave={() => setDropdownOpen(null)}>
              <button style={{ ...styles.navLink, ...(currentPage === link.page ? styles.navLinkActive : {}) }}
                onClick={() => { onNav(link.page); setMenuOpen(false); }}>
                {link.label} {link.dropdown && "▾"}
              </button>
              {link.dropdown && dropdownOpen === link.key && (
                <div style={styles.dropdown}>
                  {link.dropdown.map(item => (
                    <button key={item} style={styles.dropdownItem}
                      onClick={() => { onNav("courses", item); setDropdownOpen(null); }}>
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div style={styles.navRight}>
          {/* Language Switcher */}
          <select style={styles.langSelect} value={lang} onChange={e => setLang(e.target.value)}>
            {Object.entries(langFlags).map(([code, flag]) => (
              <option key={code} value={code}>{flag} {code.toUpperCase()}</option>
            ))}
          </select>

          {user ? (
            <div style={styles.userChip}>
              <span style={styles.userAvatar}>{user.name[0].toUpperCase()}</span>
              <span style={{ fontSize: 13, color: "#fff" }}>{user.name}</span>
              <button style={styles.logoutBtn} onClick={onLogout}>Sign Out</button>
            </div>
          ) : (
            <>
              <button style={styles.loginBtn} onClick={onLogin}>{t.login}</button>
              <button style={styles.signupBtn} onClick={onSignup}>{t.signup}</button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button style={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(link => (
            <button key={link.key} style={styles.mobileLink}
              onClick={() => { onNav(link.page); setMenuOpen(false); }}>
              {link.label}
            </button>
          ))}
          <div style={{ borderTop: "1px solid #333", paddingTop: 12, marginTop: 8 }}>
            {user ? (
              <button style={styles.mobileAuthBtn} onClick={onLogout}>Sign Out</button>
            ) : (
              <>
                <button style={styles.mobileAuthBtn} onClick={onLogin}>Sign In</button>
                <button style={{ ...styles.mobileAuthBtn, background: "#00d4aa", color: "#000" }} onClick={onSignup}>Create Account</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// ── HERO SECTION ─────────────────────────────────────────────
function HeroSection({ lang, user, onSignup, onNav }) {
  const t = (LANGS[lang] || LANGS.en).hero;
  const [heroLoaded, setHeroLoaded] = useState(false);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const s1 = useCounter(124000, 2500, statsVisible);
  const s2 = useCounter(500, 2000, statsVisible);
  const s3 = useCounter(47, 1800, statsVisible);
  const s4 = useCounter(320, 2000, statsVisible);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { num: s1, label: t.stat1, suffix: "+" },
    { num: s2, label: t.stat2, suffix: "+" },
    { num: s3, label: t.stat3, suffix: "" },
    { num: s4, label: t.stat4, suffix: "+" },
  ];

  // Floating particles
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 6,
  }));

  return (
    <section style={styles.hero}>
      {/* Animated Background */}
      <div style={styles.heroBg} />
      <div style={styles.heroGlow1} />
      <div style={styles.heroGlow2} />

      {/* Floating Particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: p.left, top: p.top,
          width: p.size, height: p.size, borderRadius: "50%",
          background: "rgba(0, 212, 170, 0.4)",
          animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          pointerEvents: "none",
        }} />
      ))}

      <div style={styles.heroContent}>
        {/* Badge */}
        <div style={{ ...styles.heroBadge, opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
          {t.badge}
        </div>

        {/* Headline */}
        <h1 style={{ ...styles.heroH1, opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s 0.2s ease" }}>
          {t.h1a}<br />
          <span style={styles.heroGradientText}>{t.h1b}</span>
        </h1>

        {/* Subtitle */}
        <p style={{ ...styles.heroSub, opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s 0.4s ease" }}>
          {t.sub}
        </p>

        {/* CTA Buttons */}
        <div style={{ ...styles.heroCtas, opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s 0.6s ease" }}>
          <button style={styles.ctaPrimary} onClick={user ? () => onNav("courses") : onSignup}>
            🚀 {t.cta1}
          </button>
          <button style={styles.ctaSecondary} onClick={() => onNav("courses")}>
            📚 {t.cta2}
          </button>
        </div>

        {/* Trust Badges */}
        <div style={{ ...styles.trustRow, opacity: heroLoaded ? 1 : 0, transition: "all 0.9s 0.8s ease" }}>
          {["✅ No credit card required", "✅ 10 free exams", "✅ 10 free books", "✅ Cancel anytime"].map((item, i) => (
            <span key={i} style={styles.trustItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div ref={statsRef} style={styles.statsRow}>
        {stats.map((s, i) => (
          <div key={i} style={styles.statCard}>
            <div style={styles.statNum}>
              {s.num.toLocaleString()}{s.suffix}
            </div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div style={styles.scrollIndicator} onClick={() => window.scrollBy({ top: 600, behavior: "smooth" })}>
        <div style={styles.scrollDot} />
      </div>

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          to { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}

// ── STYLES ────────────────────────────────────────────────────
const styles = {
  // Announce
  announcebar: { background: "linear-gradient(90deg, #00d4aa, #0066ff, #8b00ff)", color: "#fff", textAlign: "center", padding: "10px 20px", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, position: "relative", zIndex: 1001 },
  announceClose: { background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, marginLeft: 10 },

  // Navbar
  navbar: { position: "fixed", top: 36, left: 0, right: 0, zIndex: 1000, transition: "all 0.3s ease", background: "transparent", padding: "0 20px" },
  navScrolled: { top: 0, background: "rgba(5, 10, 20, 0.95)", backdropFilter: "blur(20px)", boxShadow: "0 2px 30px rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(255,255,255,0.08)" },
  navInner: { maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70, gap: 20 },
  logo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 },
  logoIcon: { fontSize: 28 },
  logoText: { fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", fontFamily: "'Segoe UI', sans-serif" },
  navLinks: { display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center", flexWrap: "nowrap", overflow: "hidden" },
  navItem: { position: "relative" },
  navLink: { background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: 13.5, fontWeight: 500, padding: "8px 10px", borderRadius: 8, transition: "all 0.2s", fontFamily: "inherit", whiteSpace: "nowrap" },
  navLinkActive: { color: "#00d4aa", background: "rgba(0,212,170,0.1)" },
  dropdown: { position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 0", minWidth: 160, zIndex: 100, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" },
  dropdownItem: { display: "block", width: "100%", padding: "9px 18px", background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", textAlign: "left", fontSize: 13, fontFamily: "inherit", transition: "all 0.2s" },
  navRight: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
  langSelect: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", borderRadius: 8, padding: "6px 10px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
  loginBtn: { background: "none", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s", fontFamily: "inherit" },
  signupBtn: { background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "all 0.2s", fontFamily: "inherit", boxShadow: "0 4px 15px rgba(0,212,170,0.3)" },
  userChip: { display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "5px 12px" },
  userAvatar: { width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #00d4aa, #0066ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" },
  logoutBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, fontFamily: "inherit" },
  burger: { display: "none", background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" },
  mobileMenu: { background: "#0d1117", borderTop: "1px solid rgba(255,255,255,0.1)", padding: 20, display: "flex", flexDirection: "column", gap: 4 },
  mobileLink: { background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: "10px 0", textAlign: "left", fontSize: 15, fontFamily: "inherit", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  mobileAuthBtn: { background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", borderRadius: 8, padding: "12px", cursor: "pointer", width: "100%", fontSize: 15, fontFamily: "inherit", marginTop: 8, fontWeight: 600 },

  // Hero
  hero: { position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#020817" },
  heroBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(0,102,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,212,170,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(139,0,255,0.1) 0%, transparent 50%)" },
  heroGlow1: { position: "absolute", top: "15%", left: "10%", width: 600, height: 600, borderRadius: "50%", background: "rgba(0,102,255,0.06)", filter: "blur(80px)", animation: "pulse 6s ease-in-out infinite" },
  heroGlow2: { position: "absolute", bottom: "15%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "rgba(0,212,170,0.06)", filter: "blur(80px)", animation: "pulse 8s 2s ease-in-out infinite" },
  heroContent: { position: "relative", zIndex: 10, textAlign: "center", maxWidth: 900, padding: "120px 24px 60px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 100, padding: "8px 18px", color: "#00d4aa", fontSize: 13, fontWeight: 600, letterSpacing: 0.5 },
  heroH1: { fontSize: "clamp(48px, 8vw, 90px)", fontWeight: 900, lineHeight: 1.05, color: "#fff", letterSpacing: "-2px", margin: 0, fontFamily: "'Segoe UI', sans-serif" },
  heroGradientText: { background: "linear-gradient(90deg, #00d4aa, #0066ff, #8b00ff, #00d4aa)", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradientShift 4s ease infinite" },
  heroSub: { fontSize: 18, color: "rgba(255,255,255,0.65)", maxWidth: 680, lineHeight: 1.7, margin: 0 },
  heroCtas: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" },
  ctaPrimary: { background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 12, padding: "16px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 30px rgba(0,212,170,0.35)", transition: "all 0.3s", fontFamily: "inherit", letterSpacing: 0.3 },
  ctaSecondary: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 12, padding: "16px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(10px)", transition: "all 0.3s", fontFamily: "inherit" },
  trustRow: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  trustItem: { fontSize: 12.5, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "4px 12px" },
  statsRow: { position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, width: "100%", maxWidth: 900, borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 20 },
  statCard: { textAlign: "center", padding: "32px 20px", borderRight: "1px solid rgba(255,255,255,0.06)" },
  statNum: { fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, background: "linear-gradient(135deg, #00d4aa, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  statLabel: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6, fontWeight: 500 },
  scrollIndicator: { position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", cursor: "pointer", zIndex: 10 },
  scrollDot: { width: 12, height: 12, borderRadius: "50%", background: "rgba(0,212,170,0.6)", animation: "scrollBounce 2s ease infinite" },

  // Auth Modal
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modalBox: { background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 36, width: "100%", maxWidth: 420, position: "relative", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" },
  modalClose: { position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" },
  modalLogo: { fontSize: 20, fontWeight: 800, color: "#fff", textAlign: "center", marginBottom: 24 },
  tabRow: { display: "flex", gap: 4, background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 4, marginBottom: 20 },
  tabBtn: { flex: 1, background: "none", border: "none", color: "rgba(255,255,255,0.5)", padding: "10px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", transition: "all 0.2s" },
  tabActive: { background: "linear-gradient(135deg, #00d4aa, #0066ff)", color: "#fff" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "13px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", marginBottom: 12, boxSizing: "border-box", outline: "none" },
  authBtn: { width: "100%", background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 4, marginBottom: 16 },
  authNote: { fontSize: 13, color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.6 },
  socialAuth: { textAlign: "center", marginTop: 16 },
  socialBtn: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" },
};

// ── MAIN EXPORT (Part 1 Components) ─────────────────────────
export { AnnouncementBar, Navbar, HeroSection, AuthModal, LANGS, styles };

// ── PART 1 PREVIEW APP (for standalone testing) ──────────────
export default function Part1Preview() {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null); // "login" | "signup" | null
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#020817", minHeight: "100vh" }}>
      <AnnouncementBar lang={lang} />
      <Navbar
        lang={lang} setLang={setLang}
        user={user}
        onLogin={() => setAuthMode("login")}
        onSignup={() => setAuthMode("signup")}
        onLogout={() => setUser(null)}
        onNav={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />
      <HeroSection
        lang={lang} user={user}
        onSignup={() => setAuthMode("signup")}
        onNav={(page) => setCurrentPage(page)}
      />
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onAuth={(userData) => setUser(userData)}
          lang={lang}
        />
      )}
      <div style={{ textAlign: "center", padding: 30, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
        ▸ Part 1 of 4 — Continue to Part 2 for Courses, Pricing, and Tutors sections
      </div>
    </div>
  );
}
// ============================================================
// GLOBAL ELITE ACADEMY — App.jsx PART 2 of 4
// Courses Section + Pricing Plans + Tutors Section
// ============================================================

import { useState } from "react";
import { styles as S } from "./GlobalEliteAcademy_Part1.jsx";

// ── COURSE DATA ──────────────────────────────────────────────
const COURSE_DATA = [
  // PRIMARY
  { id: "p1", level: "Primary", subject: "Mathematics", title: "Primary Math Mastery", price: 8, lessons: 60, students: 4200, rating: 4.9, icon: "🔢", tag: "Popular", desc: "Complete primary mathematics from numbers to fractions, geometry, and word problems." },
  { id: "p2", level: "Primary", subject: "English", title: "English Language Arts", price: 8, lessons: 55, students: 3800, rating: 4.8, icon: "📖", tag: "New", desc: "Reading, writing, grammar, and comprehension skills for young learners." },
  { id: "p3", level: "Primary", subject: "Science", title: "Primary Science Explorer", price: 7, lessons: 45, students: 2900, rating: 4.7, icon: "🔬", tag: "", desc: "Explore nature, living things, forces, and the environment interactively." },
  { id: "p4", level: "Primary", subject: "Kiswahili", title: "Kiswahili Lugha", price: 7, lessons: 50, students: 5100, rating: 4.9, icon: "🗣️", tag: "Top Rated", desc: "Lugha ya Kiswahili kwa wanafunzi wa shule ya msingi — uandishi na usomaji." },

  // SECONDARY
  { id: "s1", level: "Secondary", subject: "Mathematics", title: "O-Level Mathematics", price: 12, lessons: 90, students: 6700, rating: 4.9, icon: "📐", tag: "Best Seller", desc: "Algebra, geometry, trigonometry, statistics, and full CSEE preparation." },
  { id: "s2", level: "Secondary", subject: "Biology", title: "O-Level Biology", price: 12, lessons: 80, students: 5200, rating: 4.8, icon: "🧬", tag: "", desc: "Cell biology, genetics, ecology, human anatomy, and exam preparation." },
  { id: "s3", level: "Secondary", subject: "Chemistry", title: "O-Level Chemistry", price: 12, lessons: 75, students: 4800, rating: 4.7, icon: "⚗️", tag: "", desc: "Atoms, reactions, organic chemistry, and laboratory techniques." },
  { id: "s4", level: "Secondary", subject: "Physics", title: "O-Level Physics", price: 12, lessons: 78, students: 4500, rating: 4.8, icon: "⚡", tag: "", desc: "Mechanics, waves, electricity, magnetism, and CSEE exam prep." },
  { id: "s5", level: "Secondary", subject: "History", title: "O-Level History", price: 10, lessons: 65, students: 3100, rating: 4.6, icon: "🏛️", tag: "", desc: "African, world, and Tanzanian history with source-based questions." },
  { id: "s6", level: "Secondary", subject: "Geography", title: "O-Level Geography", price: 10, lessons: 68, students: 2900, rating: 4.6, icon: "🌍", tag: "", desc: "Physical and human geography with map work and fieldwork skills." },

  // A-LEVEL
  { id: "a1", level: "A-Level", subject: "Mathematics", title: "Advanced Mathematics", price: 18, lessons: 110, students: 2800, rating: 4.9, icon: "📊", tag: "Elite", desc: "Calculus, vectors, mechanics, and statistics for A-Level ACSEE." },
  { id: "a2", level: "A-Level", subject: "Physics", title: "Advanced Physics", price: 18, lessons: 105, students: 2400, rating: 4.8, icon: "🚀", tag: "", desc: "Advanced mechanics, electromagnetism, quantum physics, and thermodynamics." },
  { id: "a3", level: "A-Level", subject: "Biology", title: "Advanced Biology", price: 18, lessons: 100, students: 2200, rating: 4.8, icon: "🧪", tag: "", desc: "Molecular biology, genetics, physiology, and ecology for ACSEE." },
  { id: "a4", level: "A-Level", subject: "Economics", title: "Advanced Economics", price: 16, lessons: 95, students: 1900, rating: 4.7, icon: "💹", tag: "", desc: "Microeconomics, macroeconomics, international trade, and development economics." },

  // DIPLOMA
  { id: "d1", level: "Diploma", subject: "Business", title: "Diploma in Business Mgmt", price: 22, lessons: 130, students: 1400, rating: 4.8, icon: "💼", tag: "In Demand", desc: "Management, marketing, finance, HRM, and entrepreneurship skills." },
  { id: "d2", level: "Diploma", subject: "IT", title: "Diploma in Information Tech", price: 22, lessons: 140, students: 1700, rating: 4.9, icon: "💻", tag: "Hot", desc: "Programming, networking, databases, web development, and cybersecurity." },
  { id: "d3", level: "Diploma", subject: "Nursing", title: "Diploma in Nursing", price: 25, lessons: 150, students: 1200, rating: 4.8, icon: "🏥", tag: "", desc: "Clinical nursing, pharmacology, patient care, and medical procedures." },
  { id: "d4", level: "Diploma", subject: "Education", title: "Diploma in Education", price: 20, lessons: 120, students: 980, rating: 4.7, icon: "👩‍🏫", tag: "", desc: "Teaching methodology, curriculum development, and classroom management." },

  // DEGREE
  { id: "dg1", level: "Degree", subject: "CS", title: "Bachelor of Computer Science", price: 35, lessons: 200, students: 890, rating: 4.9, icon: "🖥️", tag: "Premium", desc: "Algorithms, data structures, AI, software engineering, and capstone project." },
  { id: "dg2", level: "Degree", subject: "Business", title: "Bachelor of Business Admin", price: 32, lessons: 190, students: 1100, rating: 4.8, icon: "📈", tag: "", desc: "Strategic management, accounting, marketing, and finance fundamentals." },
  { id: "dg3", level: "Degree", subject: "Engineering", title: "Bachelor of Engineering", price: 38, lessons: 210, students: 650, rating: 4.8, icon: "⚙️", tag: "Elite", desc: "Structural, electrical, or civil engineering principles and project work." },
  { id: "dg4", level: "Degree", subject: "Medicine", title: "Pre-Med Foundation", price: 40, lessons: 220, students: 720, rating: 4.9, icon: "🩺", tag: "Elite", desc: "Biochemistry, anatomy, physiology, and medical ethics preparation." },

  // MASTERS
  { id: "m1", level: "Masters", subject: "MBA", title: "Masters of Business Admin", price: 55, lessons: 240, students: 340, rating: 4.9, icon: "🎯", tag: "Executive", desc: "Leadership, corporate strategy, global finance, and entrepreneurship." },
  { id: "m2", level: "Masters", subject: "Data Science", title: "MSc in Data Science & AI", price: 60, lessons: 260, students: 280, rating: 5.0, icon: "🤖", tag: "Future Tech", desc: "Machine learning, neural networks, big data, and real-world projects." },
  { id: "m3", level: "Masters", subject: "Education", title: "Masters in Education", price: 45, lessons: 220, students: 190, rating: 4.8, icon: "🎓", tag: "", desc: "Educational leadership, research methods, policy, and curriculum design." },
];

const LEVELS = ["All", "Primary", "Secondary", "A-Level", "Diploma", "Degree", "Masters"];

// ── COURSES SECTION ──────────────────────────────────────────
export function CoursesSection({ user, onSignup, onNav, filterLevel }) {
  const [activeLevel, setActiveLevel] = useState(filterLevel || "All");
  const [search, setSearch] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = COURSE_DATA.filter(c => {
    const matchLevel = activeLevel === "All" || c.level === activeLevel;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  const visible = showAll ? filtered : filtered.slice(0, 8);

  return (
    <section style={sec.section}>
      <div style={sec.sectionInner}>
        {/* Header */}
        <div style={sec.sectionHead}>
          <div style={sec.badge}>📚 All Courses</div>
          <h2 style={sec.sectionH2}>500+ Courses Across <span style={sec.accent}>All Levels</span></h2>
          <p style={sec.sectionSub}>From Primary School to Masters Degree — every subject, every level, expert-taught.</p>
        </div>

        {/* Filters */}
        <div style={sec.filterRow}>
          <input
            style={sec.searchInput}
            placeholder="🔍 Search courses, subjects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div style={sec.levelTabs}>
            {LEVELS.map(l => (
              <button key={l}
                style={{ ...sec.levelTab, ...(activeLevel === l ? sec.levelTabActive : {}) }}
                onClick={() => setActiveLevel(l)}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={sec.courseGrid}>
          {visible.map(course => (
            <div key={course.id}
              style={{ ...sec.courseCard, ...(hoveredCard === course.id ? sec.courseCardHover : {}) }}
              onMouseEnter={() => setHoveredCard(course.id)}
              onMouseLeave={() => setHoveredCard(null)}>
              {course.tag && <div style={sec.courseTag}>{course.tag}</div>}
              <div style={sec.courseIcon}>{course.icon}</div>
              <div style={sec.courseLevel}>{course.level}</div>
              <h3 style={sec.courseTitle}>{course.title}</h3>
              <p style={sec.courseDesc}>{course.desc}</p>
              <div style={sec.courseMeta}>
                <span>📹 {course.lessons} lessons</span>
                <span>👥 {course.students.toLocaleString()}</span>
                <span>⭐ {course.rating}</span>
              </div>
              <div style={sec.courseFooter}>
                <div style={sec.coursePrice}>
                  <span style={sec.priceAmount}>${course.price}</span>
                  <span style={sec.priceLabel}>/month</span>
                </div>
                <button style={sec.enrollBtn}
                  onClick={() => user ? onNav("course", course.id) : onSignup()}>
                  {user ? "Enroll Now" : "Get Access"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {!showAll && filtered.length > 8 && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button style={sec.loadMoreBtn} onClick={() => setShowAll(true)}>
              View All {filtered.length} Courses ↓
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ── PRICING SECTION ──────────────────────────────────────────
const PLANS = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    icon: "🆓",
    color: "#888",
    gradient: "linear-gradient(135deg, #333, #444)",
    features: [
      "✅ 10 Free Exams (any level)",
      "✅ 10 Free Book Resources",
      "✅ Preview all course content",
      "✅ Community forum access",
      "✅ Basic AI tutor (5 questions/day)",
      "✅ Study notes preview",
      "❌ Full course access",
      "❌ Download materials",
      "❌ Certificate of completion",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Student",
    price: 15,
    period: "month",
    icon: "🎓",
    color: "#00d4aa",
    gradient: "linear-gradient(135deg, #00d4aa, #0066ff)",
    features: [
      "✅ All free plan features",
      "✅ Unlimited exams (all levels)",
      "✅ Full course library access",
      "✅ Unlimited AI tutor",
      "✅ Download all materials",
      "✅ 100+ E-books & resources",
      "✅ Live tutor sessions (2/month)",
      "✅ Progress tracking dashboard",
      "✅ Certificates of completion",
    ],
    cta: "Start 7-Day Free Trial",
    popular: true,
  },
  {
    name: "Premium",
    price: 35,
    period: "month",
    icon: "👑",
    color: "#ffd700",
    gradient: "linear-gradient(135deg, #ffd700, #ff8c00)",
    features: [
      "✅ Everything in Student plan",
      "✅ All courses ALL levels unlocked",
      "✅ Priority 1-on-1 tutor sessions",
      "✅ Live group classes",
      "✅ Unlimited AI tutoring",
      "✅ Career guidance & counseling",
      "✅ Offline access (mobile app)",
      "✅ Early access to new courses",
      "✅ Dedicated support agent",
    ],
    cta: "Go Premium",
    popular: false,
  },
  {
    name: "Institutional",
    price: 199,
    period: "month",
    icon: "🏫",
    color: "#8b00ff",
    gradient: "linear-gradient(135deg, #8b00ff, #0066ff)",
    features: [
      "✅ Everything in Premium",
      "✅ Up to 500 student accounts",
      "✅ School admin dashboard",
      "✅ Custom branding option",
      "✅ Bulk exam assignment",
      "✅ Analytics & reporting",
      "✅ API integration",
      "✅ Dedicated account manager",
      "✅ Custom course creation",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection({ user, onSignup }) {
  const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"
  const [hoveredPlan, setHoveredPlan] = useState(null);

  return (
    <section style={{ ...sec.section, background: "#020817" }}>
      <div style={sec.sectionInner}>
        <div style={sec.sectionHead}>
          <div style={sec.badge}>💰 Transparent Pricing</div>
          <h2 style={sec.sectionH2}>Choose Your <span style={sec.accent}>Learning Plan</span></h2>
          <p style={sec.sectionSub}>Affordable plans for every student. Cancel anytime. First 10 exams always free.</p>
        </div>

        {/* Billing Toggle */}
        <div style={sec.billingToggle}>
          <button style={{ ...sec.billingBtn, ...(billing === "monthly" ? sec.billingBtnActive : {}) }}
            onClick={() => setBilling("monthly")}>Monthly</button>
          <button style={{ ...sec.billingBtn, ...(billing === "yearly" ? sec.billingBtnActive : {}) }}
            onClick={() => setBilling("yearly")}>
            Yearly <span style={{ background: "#00d4aa", color: "#000", borderRadius: 100, padding: "2px 8px", fontSize: 11, fontWeight: 700, marginLeft: 6 }}>Save 30%</span>
          </button>
        </div>

        {/* Plans Grid */}
        <div style={sec.plansGrid}>
          {PLANS.map(plan => {
            const displayPrice = billing === "yearly" && plan.price > 0
              ? Math.round(plan.price * 0.7)
              : plan.price;

            return (
              <div key={plan.name}
                style={{
                  ...sec.planCard,
                  ...(plan.popular ? sec.planCardPopular : {}),
                  ...(hoveredPlan === plan.name ? sec.planCardHover : {}),
                  borderColor: hoveredPlan === plan.name ? plan.color : (plan.popular ? plan.color : "rgba(255,255,255,0.08)"),
                }}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}>

                {plan.popular && <div style={sec.popularBadge}>⭐ Most Popular</div>}

                <div style={{ fontSize: 36, marginBottom: 12 }}>{plan.icon}</div>
                <h3 style={{ ...sec.planName, color: plan.color }}>{plan.name}</h3>

                <div style={sec.planPrice}>
                  {plan.price === 0 ? (
                    <span style={sec.planPriceNum}>FREE</span>
                  ) : (
                    <>
                      <span style={sec.planPriceNum}>${displayPrice}</span>
                      <span style={sec.planPricePer}>/{plan.period}</span>
                    </>
                  )}
                </div>

                {billing === "yearly" && plan.price > 0 && (
                  <p style={{ color: "#00d4aa", fontSize: 12, marginBottom: 16 }}>
                    Billed ${displayPrice * 12}/year · Save ${(plan.price - displayPrice) * 12}/year
                  </p>
                )}

                <ul style={sec.planFeatures}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{ ...sec.planFeature, color: f.startsWith("❌") ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)" }}>
                      {f}
                    </li>
                  ))}
                </ul>

                <button style={{
                  ...sec.planCta,
                  background: hoveredPlan === plan.name || plan.popular ? plan.gradient : "rgba(255,255,255,0.06)",
                  color: hoveredPlan === plan.name || plan.popular ? "#fff" : "rgba(255,255,255,0.6)",
                  border: `1px solid ${plan.popular ? "transparent" : "rgba(255,255,255,0.12)"}`,
                }}
                  onClick={() => plan.cta === "Contact Sales" ? window.location.href = "mailto:johnsonelisa020@gmail.com" : onSignup()}>
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Payment Methods */}
        <div style={sec.paymentRow}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 16 }}>Secure payment via:</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {["💳 Visa", "💳 Mastercard", "🅿️ PayPal", "📱 M-Pesa", "🏦 Bank Transfer", "🌐 Stripe"].map(m => (
              <span key={m} style={sec.paymentBadge}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TUTORS SECTION ────────────────────────────────────────────
const TUTORS = [
  { id: 1, name: "Dr. Amina Okonkwo", subject: "Mathematics", level: "University", rating: 4.98, students: 1240, price: "$25/month", img: "👩🏾‍🏫", country: "Nigeria", bio: "PhD in Pure Mathematics. 12 years teaching A-Level and University Math.", verified: true, available: true },
  { id: 2, name: "Prof. James Kariuki", subject: "Physics", level: "A-Level & Degree", rating: 4.95, students: 890, price: "$20/month", img: "👨🏿‍🔬", country: "Kenya", bio: "MSc Physics, University of Nairobi. Specialist in mechanics and electromagnetism.", verified: true, available: true },
  { id: 3, name: "Ms. Fatima Al-Rashid", subject: "Biology", level: "Secondary", rating: 4.92, students: 2100, price: "$15/month", img: "👩🏽‍⚕️", country: "Tanzania", bio: "BSc Biological Sciences. Passionate about making biology easy and fun.", verified: true, available: false },
  { id: 4, name: "Mr. Chen Wei", subject: "Computer Science", level: "Degree & Masters", rating: 5.0, students: 580, price: "$30/month", img: "👨🏻‍💻", country: "China", bio: "MSc Software Engineering. Expert in AI, algorithms, and web development.", verified: true, available: true },
  { id: 5, name: "Dr. Grace Mensah", subject: "Economics", level: "A-Level & Degree", rating: 4.94, students: 760, price: "$22/month", img: "👩🏿‍💼", country: "Ghana", bio: "PhD Economics, LSE. Specializes in development economics and macro theory.", verified: true, available: true },
  { id: 6, name: "Mr. Hassan Omar", subject: "Kiswahili & Literature", level: "All Levels", rating: 4.97, students: 1890, price: "$10/month", img: "👨🏾‍🏫", country: "Tanzania", bio: "MA in Kiswahili Studies, University of Dar es Salaam. Native speaker and educator.", verified: true, available: true },
  { id: 7, name: "Dr. Sofia Rodriguez", subject: "Chemistry", level: "O-Level & A-Level", rating: 4.91, students: 670, price: "$18/month", img: "👩🏻‍🔬", country: "Spain", bio: "PhD Organic Chemistry. Makes chemistry practical and exam-ready.", verified: true, available: true },
  { id: 8, name: "Mr. David Mutua", subject: "Business Studies", level: "Diploma & Degree", rating: 4.89, students: 430, price: "$20/month", img: "👨🏾‍💼", country: "Kenya", bio: "MBA, Strathmore University. Real-world business experience with 10+ years consulting.", verified: true, available: false },
];

export function TutorsSection({ user, onSignup }) {
  const [hoveredTutor, setHoveredTutor] = useState(null);

  return (
    <section style={{ ...sec.section, background: "linear-gradient(180deg, #030d1a 0%, #020817 100%)" }}>
      <div style={sec.sectionInner}>
        <div style={sec.sectionHead}>
          <div style={sec.badge}>👩‍🏫 Expert Tutors</div>
          <h2 style={sec.sectionH2}>Learn From The <span style={sec.accent}>Best Minds</span></h2>
          <p style={sec.sectionSub}>320+ verified educators from across Africa and the world. Book 1-on-1 or join group sessions.</p>
        </div>

        <div style={sec.tutorsGrid}>
          {TUTORS.map(tutor => (
            <div key={tutor.id}
              style={{ ...sec.tutorCard, ...(hoveredTutor === tutor.id ? sec.tutorCardHover : {}) }}
              onMouseEnter={() => setHoveredTutor(tutor.id)}
              onMouseLeave={() => setHoveredTutor(null)}>

              {/* Avatar */}
              <div style={sec.tutorAvatarWrap}>
                <div style={sec.tutorAvatar}>{tutor.img}</div>
                <div style={{ ...sec.onlineDot, background: tutor.available ? "#00d4aa" : "#666" }} />
              </div>

              {/* Info */}
              <h3 style={sec.tutorName}>{tutor.name}</h3>
              <div style={sec.tutorSubject}>{tutor.subject}</div>
              <div style={sec.tutorLevel}>📚 {tutor.level}</div>
              <div style={sec.tutorCountry}>📍 {tutor.country}</div>
              <p style={sec.tutorBio}>{tutor.bio}</p>

              {/* Stats */}
              <div style={sec.tutorStats}>
                <div style={sec.tutorStat}>
                  <div style={{ color: "#ffd700", fontWeight: 700 }}>⭐ {tutor.rating}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Rating</div>
                </div>
                <div style={sec.tutorStat}>
                  <div style={{ color: "#00d4aa", fontWeight: 700 }}>{tutor.students.toLocaleString()}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Students</div>
                </div>
                <div style={sec.tutorStat}>
                  <div style={{ color: "#fff", fontWeight: 700 }}>{tutor.price}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>per level</div>
                </div>
              </div>

              {/* Availability */}
              <div style={{ fontSize: 12, color: tutor.available ? "#00d4aa" : "#888", marginBottom: 16, fontWeight: 600 }}>
                {tutor.available ? "🟢 Available Now" : "🔴 Currently Busy"}
              </div>

              {/* CTA */}
              <button style={sec.bookBtn}
                onClick={() => user ? null : onSignup()}>
                {user ? (tutor.available ? "Book Session" : "Join Waitlist") : "Sign Up to Book"}
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 20 }}>
            💡 Tutor pricing: $10–$30/month depending on level and subject expertise
          </p>
          <button style={sec.loadMoreBtn}>View All 320+ Tutors →</button>
        </div>
      </div>
    </section>
  );
}

// ── SECTION STYLES ─────────────────────────────────────────────
const sec = {
  section: { padding: "100px 24px", background: "#030d1a" },
  sectionInner: { maxWidth: 1400, margin: "0 auto" },
  sectionHead: { textAlign: "center", marginBottom: 60 },
  badge: { display: "inline-block", background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 100, padding: "6px 16px", color: "#00d4aa", fontSize: 13, fontWeight: 600, marginBottom: 16 },
  sectionH2: { fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16, fontFamily: "'Segoe UI', sans-serif" },
  sectionSub: { fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto" },
  accent: { background: "linear-gradient(90deg, #00d4aa, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },

  // Courses
  filterRow: { display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap", alignItems: "center" },
  searchInput: { flex: 1, minWidth: 220, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", outline: "none" },
  levelTabs: { display: "flex", gap: 6, flexWrap: "wrap" },
  levelTab: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 16px", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", transition: "all 0.2s" },
  levelTabActive: { background: "linear-gradient(135deg, #00d4aa, #0066ff)", color: "#fff", border: "1px solid transparent" },
  courseGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 },
  courseCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden" },
  courseCardHover: { border: "1px solid rgba(0,212,170,0.4)", transform: "translateY(-4px)", boxShadow: "0 20px 40px rgba(0,212,170,0.1)" },
  courseTag: { position: "absolute", top: 14, right: 14, background: "linear-gradient(135deg, #00d4aa, #0066ff)", color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
  courseIcon: { fontSize: 36, marginBottom: 12 },
  courseLevel: { fontSize: 11, color: "#00d4aa", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  courseTitle: { fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 8, lineHeight: 1.3 },
  courseDesc: { fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 16 },
  courseMeta: { display: "flex", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 16, flexWrap: "wrap" },
  courseFooter: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  coursePrice: { display: "flex", alignItems: "baseline", gap: 3 },
  priceAmount: { fontSize: 22, fontWeight: 900, color: "#fff" },
  priceLabel: { fontSize: 13, color: "rgba(255,255,255,0.4)" },
  enrollBtn: { background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  loadMoreBtn: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" },

  // Pricing
  billingToggle: { display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 4, width: "fit-content", margin: "0 auto 48px", gap: 4 },
  billingBtn: { background: "none", border: "none", color: "rgba(255,255,255,0.5)", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", transition: "all 0.2s", display: "flex", alignItems: "center" },
  billingBtnActive: { background: "rgba(255,255,255,0.1)", color: "#fff" },
  plansGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 },
  planCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 24px", cursor: "pointer", transition: "all 0.3s", position: "relative", display: "flex", flexDirection: "column" },
  planCardPopular: { border: "1px solid rgba(0,212,170,0.4)", background: "rgba(0,212,170,0.04)" },
  planCardHover: { transform: "translateY(-6px)", boxShadow: "0 25px 50px rgba(0,0,0,0.3)" },
  popularBadge: { position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #00d4aa, #0066ff)", color: "#fff", borderRadius: 100, padding: "4px 16px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" },
  planName: { fontSize: 20, fontWeight: 800, marginBottom: 4 },
  planPrice: { display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 },
  planPriceNum: { fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1 },
  planPricePer: { fontSize: 14, color: "rgba(255,255,255,0.4)" },
  planFeatures: { listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 },
  planFeature: { fontSize: 13.5, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", lineHeight: 1.5 },
  planCta: { border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s", width: "100%" },
  paymentRow: { textAlign: "center", marginTop: 60, padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: 16 },
  paymentBadge: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 16px", color: "rgba(255,255,255,0.7)", fontSize: 13 },

  // Tutors
  tutorsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 },
  tutorCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 22px", cursor: "pointer", transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  tutorCardHover: { border: "1px solid rgba(0,212,170,0.4)", transform: "translateY(-4px)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" },
  tutorAvatarWrap: { position: "relative", marginBottom: 16 },
  tutorAvatar: { width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, rgba(0,212,170,0.2), rgba(0,102,255,0.2))", border: "2px solid rgba(0,212,170,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 },
  onlineDot: { position: "absolute", bottom: 2, right: 2, width: 16, height: 16, borderRadius: "50%", border: "2px solid #030d1a" },
  tutorName: { fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 },
  tutorSubject: { fontSize: 13, color: "#00d4aa", fontWeight: 600, marginBottom: 4 },
  tutorLevel: { fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 },
  tutorCountry: { fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10 },
  tutorBio: { fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 16 },
  tutorStats: { display: "flex", gap: 20, marginBottom: 12 },
  tutorStat: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 13 },
  bookBtn: { background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 10, padding: "11px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", width: "100%" },
};

export default function Part2Preview() {
  const [activeSection, setActiveSection] = useState("courses");
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#020817" }}>
      <div style={{ display: "flex", gap: 10, padding: 20, background: "#0d1117", justifyContent: "center" }}>
        {["courses", "pricing", "tutors"].map(s => (
          <button key={s} style={{ background: activeSection === s ? "#00d4aa" : "#333", border: "none", color: "#fff", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }} onClick={() => setActiveSection(s)}>{s}</button>
        ))}
      </div>
      {activeSection === "courses" && <CoursesSection user={null} onSignup={() => alert("Sign up!")} onNav={() => {}} />}
      {activeSection === "pricing" && <PricingSection user={null} onSignup={() => alert("Sign up!")} />}
      {activeSection === "tutors" && <TutorsSection user={null} onSignup={() => alert("Sign up!")} />}
    </div>
  );
}
// ============================================================
// GLOBAL ELITE ACADEMY — App.jsx PART 3 of 4
// Library · Exams · Features · AI Tutor · Blog · Ads Sidebar
// ============================================================

import { useState, useEffect, useRef } from "react";

const P3 = {
  section: { padding: "100px 24px" },
  sectionInner: { maxWidth: 1400, margin: "0 auto" },
  head: { textAlign: "center", marginBottom: 60 },
  badge: { display: "inline-block", background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 100, padding: "6px 16px", color: "#00d4aa", fontSize: 13, fontWeight: 600, marginBottom: 16 },
  h2: { fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 16, fontFamily: "'Segoe UI', sans-serif" },
  sub: { fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto" },
  accent: { background: "linear-gradient(90deg, #00d4aa, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
};

// ── FEATURES / WHY US ────────────────────────────────────────
const FEATURES = [
  { icon: "🤖", title: "AI-Powered Tutor", desc: "24/7 personalized AI learning assistant that adapts to your level and answers every question in your language.", color: "#00d4aa" },
  { icon: "📱", title: "Mobile-First Design", desc: "Learn on any device — phone, tablet, or desktop. Full offline support on the mobile app for Premium users.", color: "#0066ff" },
  { icon: "🌍", title: "6 Languages", desc: "Content available in English, Kiswahili, French, German, Chinese, and British English.", color: "#8b00ff" },
  { icon: "🏆", title: "Certified Learning", desc: "Earn verifiable certificates for every course. Recognized by universities and employers across Africa.", color: "#ffd700" },
  { icon: "👥", title: "Live Group Classes", desc: "Join scheduled live sessions with expert tutors and peers. Real-time Q&A and collaboration.", color: "#ff6b6b" },
  { icon: "📊", title: "Progress Analytics", desc: "Detailed dashboards tracking your performance, weak points, study time, and exam readiness score.", color: "#00d4aa" },
  { icon: "📚", title: "Massive Library", desc: "10,000+ e-books, past papers, study notes, and revision guides — all searchable and downloadable.", color: "#0066ff" },
  { icon: "🔒", title: "Safe & Secure", desc: "Bank-level encryption, GDPR compliant, and child-safe environment for all ages from 6+.", color: "#8b00ff" },
];

export function FeaturesSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ ...P3.section, background: "#020817" }}>
      <div style={P3.sectionInner}>
        <div style={P3.head}>
          <div style={P3.badge}>✨ Why Global Elite Academy?</div>
          <h2 style={P3.h2}>The Future of <span style={P3.accent}>Education Is Here</span></h2>
          <p style={P3.sub}>Every feature built to help you learn faster, smarter, and more effectively.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 16,
              padding: "28px 24px", transition: "all 0.5s", opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: `${i * 60}ms`,
            }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: f.color, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EXAMS SECTION ────────────────────────────────────────────
const EXAM_CATEGORIES = [
  { id: "csee", name: "CSEE (Form 4)", count: 145, icon: "📝", free: true },
  { id: "acsee", name: "ACSEE (Form 6)", count: 98, icon: "📋", free: false },
  { id: "primary", name: "Primary (PSLE)", count: 87, icon: "✏️", free: true },
  { id: "diploma", name: "Diploma Exams", count: 62, icon: "📄", free: false },
  { id: "university", name: "University Finals", count: 55, icon: "🎓", free: false },
  { id: "mock", name: "Mock Exams", count: 200, icon: "🔬", free: true },
];

export function ExamsSection({ user, onSignup }) {
  const [selected, setSelected] = useState(null);
  const [examCount, setExamCount] = useState(user?.freeExams ?? 10);

  return (
    <section style={{ ...P3.section, background: "#030d1a" }}>
      <div style={P3.sectionInner}>
        <div style={P3.head}>
          <div style={P3.badge}>📝 Past Papers & Exams</div>
          <h2 style={P3.h2}>Prepare With <span style={P3.accent}>Real Exam Papers</span></h2>
          <p style={P3.sub}>Access hundreds of past papers, mock exams, and model answers. First 10 exams FREE for all users!</p>
        </div>

        {/* Free Exam Counter */}
        {!user?.plan || user.plan === "free" ? (
          <div style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 16, padding: 24, marginBottom: 48, textAlign: "center", maxWidth: 500, margin: "0 auto 48px" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎁</div>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
              You have <span style={{ color: "#00d4aa", fontSize: 28 }}>{examCount}</span> free exams remaining
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 16 }}>
              After 10 exams, upgrade to Student or Premium to continue access.
            </p>
            <button style={{ background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 10, padding: "11px 28px", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}
              onClick={onSignup}>Upgrade to Unlimited →</button>
          </div>
        ) : (
          <div style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 12, padding: 16, marginBottom: 48, textAlign: "center" }}>
            <span style={{ color: "#ffd700", fontWeight: 700 }}>👑 Premium Access — Unlimited Exams!</span>
          </div>
        )}

        {/* Exam Categories */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {EXAM_CATEGORIES.map(cat => (
            <div key={cat.id}
              style={{
                background: selected === cat.id ? "rgba(0,212,170,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${selected === cat.id ? "rgba(0,212,170,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 14, padding: "24px 20px", cursor: "pointer", transition: "all 0.2s",
              }}
              onClick={() => setSelected(cat.id)}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{cat.icon}</div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{cat.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 12 }}>
                {cat.count} papers available
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: cat.free ? "#00d4aa" : "#ffd700" }}>
                  {cat.free ? "✅ FREE (first 10)" : "🔒 Premium"}
                </span>
                <button style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
                  onClick={() => user ? null : onSignup()}>
                  View Papers
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── LIBRARY SECTION ──────────────────────────────────────────
const BOOKS = [
  { id: 1, title: "O-Level Mathematics Complete Guide", author: "Prof. K. Mwangi", level: "Secondary", icon: "📐", free: true, rating: 4.9, reads: 8420 },
  { id: 2, title: "A-Level Physics Revision Manual", author: "Dr. S. Osei", level: "A-Level", icon: "⚡", free: false, rating: 4.8, reads: 5230 },
  { id: 3, title: "Introduction to Computer Science", author: "Chen Wei", level: "Degree", icon: "💻", free: true, rating: 4.9, reads: 12100 },
  { id: 4, title: "Business Management Fundamentals", author: "Dr. G. Mensah", level: "Diploma", icon: "📊", free: false, rating: 4.7, reads: 3800 },
  { id: 5, title: "Biology Form 1–4 Complete Notes", author: "Ms. F. Al-Rashid", level: "Secondary", icon: "🧬", free: true, rating: 4.8, reads: 9650 },
  { id: 6, title: "University Chemistry Textbook", author: "Dr. R. Kimani", level: "Degree", icon: "⚗️", free: false, rating: 4.8, reads: 4200 },
  { id: 7, title: "Early Childhood Learning Guide", author: "Mrs. A. Njoroge", level: "Primary", icon: "📖", free: true, rating: 4.9, reads: 15300 },
  { id: 8, title: "Masters MBA Case Studies", author: "Prof. J. Okonkwo", level: "Masters", icon: "🎯", free: false, rating: 4.9, reads: 2100 },
];

export function LibrarySection({ user, onSignup }) {
  const [freeBooks, setFreeBooks] = useState(user?.freeBooks ?? 10);
  const [reading, setReading] = useState(null);

  return (
    <section style={{ ...P3.section, background: "#020817" }}>
      <div style={P3.sectionInner}>
        <div style={P3.head}>
          <div style={P3.badge}>📚 Digital Library</div>
          <h2 style={P3.h2}>10,000+ Books & <span style={P3.accent}>Study Resources</span></h2>
          <p style={P3.sub}>Every signed-in student gets 10 FREE books. Premium unlocks everything.</p>
        </div>

        {/* Free Books Banner */}
        {(!user?.plan || user.plan === "free") && (
          <div style={{ background: "rgba(0,102,255,0.08)", border: "1px solid rgba(0,102,255,0.3)", borderRadius: 14, padding: 20, textAlign: "center", marginBottom: 40 }}>
            <span style={{ color: "#fff", fontWeight: 600 }}>
              📖 Sign-in bonus: <span style={{ color: "#00d4aa", fontWeight: 800 }}>10 FREE books</span> at your education level — automatically applied!
            </span>
            {!user && (
              <button style={{ marginLeft: 16, background: "#0066ff", border: "none", color: "#fff", borderRadius: 8, padding: "8px 18px", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}
                onClick={onSignup}>Sign In to Claim →</button>
            )}
          </div>
        )}

        {/* Books Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {BOOKS.map(book => (
            <div key={book.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{book.icon}</div>
              <div style={{ fontSize: 11, color: "#00d4aa", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{book.level}</div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4, lineHeight: 1.4 }}>{book.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginBottom: 14 }}>by {book.author}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
                <span>⭐ {book.rating}</span>
                <span>👁️ {book.reads.toLocaleString()} reads</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: book.free ? "#00d4aa" : "#ffd700" }}>
                  {book.free ? "✅ Free Preview" : "👑 Premium"}
                </span>
                <button style={{ background: "linear-gradient(135deg, #0066ff, #8b00ff)", border: "none", color: "#fff", borderRadius: 8, padding: "7px 14px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}
                  onClick={() => user ? setReading(book) : onSignup()}>
                  {user ? "Read Now" : "Sign In"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Modal */}
      {reading && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 40, maxWidth: 600, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 48 }}>{reading.icon}</div>
                <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>{reading.title}</h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>by {reading.author}</p>
              </div>
              <button style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 16 }} onClick={() => setReading(null)}>✕</button>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 24, color: "rgba(255,255,255,0.7)", lineHeight: 1.9, fontSize: 14 }}>
              <strong style={{ color: "#00d4aa" }}>Chapter 1: Introduction</strong><br /><br />
              This comprehensive guide covers all key concepts, formulas, and exam techniques for {reading.title.replace("Complete Guide", "").replace("Complete Notes", "")}. 
              Starting from fundamental principles, we build toward advanced problem-solving strategies proven to improve exam performance by 40% or more.<br /><br />
              <em style={{ color: "rgba(255,255,255,0.4)" }}>📖 This is a preview. Upgrade to Premium for full access to all chapters and downloadable PDF.</em>
            </div>
            <button style={{ marginTop: 20, background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 28px", fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "inherit", fontSize: 14 }}>
              Upgrade to Read Full Book →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ── AI TUTOR CHAT ────────────────────────────────────────────
export function AITutorSection({ user }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "👋 Hello! I'm your Global Elite Academy AI Tutor. I can help you with any subject — from Primary Mathematics to University-level Computer Science. What would you like to learn today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are an expert educational AI tutor for Global Elite Academy (global-elite-academy.com), a world-class online learning platform serving students from Primary to University level across Africa and the world. 

Your role:
- Provide clear, accurate, age-appropriate explanations
- Support all levels: Primary, Secondary (O-Level, A-Level), Diploma, Degree, and Masters
- Be encouraging, patient, and motivating
- Use examples relevant to African students where possible
- If student shares their level, tailor your explanations accordingly
- Subjects include: Mathematics, Science, Biology, Chemistry, Physics, English, Kiswahili, History, Geography, Computer Science, Business, Economics, and more
- Always end with a follow-up question or suggestion to keep learning momentum

Keep responses concise but thorough. Use simple language first, then build complexity.`,
          messages: [
            ...messages.filter(m => m.role !== "system").map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: input }
          ],
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "I'm having trouble connecting. Please try again!";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", text: "⚠️ Connection issue. Please check your internet and try again." }]);
    }
    setLoading(false);
  };

  return (
    <section style={{ ...P3.section, background: "linear-gradient(180deg, #020817 0%, #030d1a 100%)" }}>
      <div style={{ ...P3.sectionInner, maxWidth: 900 }}>
        <div style={P3.head}>
          <div style={P3.badge}>🤖 AI-Powered</div>
          <h2 style={P3.h2}>Your Personal <span style={P3.accent}>AI Tutor</span></h2>
          <p style={P3.sub}>Ask anything. Get instant, expert-level answers 24/7. Powered by Claude AI.</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
          {/* Chat Header */}
          <div style={{ background: "linear-gradient(135deg, rgba(0,212,170,0.1), rgba(0,102,255,0.1))", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #00d4aa, #0066ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>GEA AI Tutor</div>
              <div style={{ color: "#00d4aa", fontSize: 12 }}>🟢 Online — All subjects, All levels</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ height: 400, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: m.role === "user" ? "linear-gradient(135deg, #00d4aa, #0066ff)" : "rgba(255,255,255,0.06)",
                  color: "#fff", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap",
                  border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px 18px 18px 4px", padding: "12px 20px" }}>
                  <span style={{ color: "#00d4aa" }}>● ● ●</span>
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 12 }}>
            <input
              style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", outline: "none" }}
              placeholder="Ask me anything — any subject, any level..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button style={{ background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 12, padding: "12px 20px", cursor: "pointer", fontSize: 20, fontFamily: "inherit" }}
              onClick={sendMessage} disabled={loading}>
              ➤
            </button>
          </div>
        </div>

        {/* Quick Questions */}
        <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {["Solve quadratic equations", "Explain photosynthesis", "What is network topology?", "Help me write an essay", "Explain osmosis"].map(q => (
            <button key={q} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", borderRadius: 100, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
              onClick={() => { setInput(q); }}>
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BLOG SECTION ─────────────────────────────────────────────
const BLOG_POSTS = [
  { id: 1, cat: "Study Tips", title: "10 Proven Study Techniques That Double Your Exam Score", author: "Dr. Amina Okonkwo", date: "June 5, 2026", read: "5 min", img: "📖", tag: "Popular" },
  { id: 2, cat: "Technology", title: "How AI is Revolutionizing Education in Africa by 2030", author: "Chen Wei", date: "June 8, 2026", read: "7 min", img: "🤖", tag: "Trending" },
  { id: 3, cat: "Career", title: "Top 10 Careers for Tanzanian Students in 2026–2030", author: "Dr. Grace Mensah", date: "June 10, 2026", read: "6 min", img: "🚀", tag: "New" },
  { id: 4, cat: "Parenting", title: "How Parents Can Support Their Child's Digital Learning Journey", author: "Mrs. A. Njoroge", date: "June 9, 2026", read: "4 min", img: "👨‍👧", tag: "" },
  { id: 5, cat: "Mathematics", title: "CSEE Math: The 7 Topics That Appear Every Year (2015–2025)", author: "Prof. James Kariuki", date: "June 7, 2026", read: "8 min", img: "📐", tag: "Must Read" },
  { id: 6, cat: "University", title: "How to Write a First-Class Dissertation in 90 Days", author: "Prof. J. Okonkwo", date: "June 3, 2026", read: "10 min", img: "🎓", tag: "" },
];

export function BlogSection({ onNav }) {
  const [hoveredPost, setHoveredPost] = useState(null);

  return (
    <section style={{ ...P3.section, background: "#030d1a" }}>
      <div style={P3.sectionInner}>
        <div style={{ ...P3.head, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, textAlign: "left" }}>
          <div>
            <div style={P3.badge}>✍️ Knowledge Hub</div>
            <h2 style={{ ...P3.h2, margin: 0 }}>Latest <span style={P3.accent}>Articles & Guides</span></h2>
          </div>
          <button style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: 10, padding: "11px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}
            onClick={() => onNav("blog")}>
            View All Articles →
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {BLOG_POSTS.map(post => (
            <div key={post.id}
              style={{
                background: hoveredPost === post.id ? "rgba(0,212,170,0.04)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${hoveredPost === post.id ? "rgba(0,212,170,0.3)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 16, padding: "24px 22px", cursor: "pointer", transition: "all 0.3s",
                transform: hoveredPost === post.id ? "translateY(-3px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "start" }}>
                <div style={{ fontSize: 42 }}>{post.img}</div>
                {post.tag && (
                  <span style={{ background: "linear-gradient(135deg, #00d4aa, #0066ff)", color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{post.tag}</span>
                )}
              </div>
              <div style={{ fontSize: 11, color: "#00d4aa", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{post.cat}</div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, lineHeight: 1.4, marginBottom: 12 }}>{post.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.35)", fontSize: 12 }}>
                <span>{post.author}</span>
                <span>⏱ {post.read} read</span>
              </div>
              <div style={{ marginTop: 6, color: "rgba(255,255,255,0.25)", fontSize: 12 }}>{post.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ADS / EDUCATION MEDIA SIDEBAR ───────────────────────────
export function EducationAdBanner() {
  const [adIndex, setAdIndex] = useState(0);

  const ads = [
    { title: "Children Learning Together", emoji: "👧👦", desc: "Collaborative learning builds confidence and critical thinking", color: "linear-gradient(135deg, #0066ff20, #00d4aa20)" },
    { title: "Parent & Child Discovery", emoji: "👩‍👧‍👦", desc: "Family learning moments that last a lifetime", color: "linear-gradient(135deg, #8b00ff20, #0066ff20)" },
    { title: "AI-Powered Creativity", emoji: "🤖🎨", desc: "Next-generation tools for creative young minds", color: "linear-gradient(135deg, #00d4aa20, #ffd70020)" },
    { title: "Student Achievement", emoji: "🏆📚", desc: "Celebrate every milestone on the learning journey", color: "linear-gradient(135deg, #ff6b6b20, #ffd70020)" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setAdIndex(i => (i + 1) % ads.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const ad = ads[adIndex];

  return (
    <div style={{ background: ad.color, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "28px 24px", textAlign: "center", transition: "all 0.8s ease" }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>{ad.emoji}</div>
      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{ad.title}</h3>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{ad.desc}</p>
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        {ads.map((_, i) => (
          <div key={i} style={{ width: i === adIndex ? 20 : 8, height: 8, borderRadius: 4, background: i === adIndex ? "#00d4aa" : "rgba(255,255,255,0.2)", transition: "all 0.3s", cursor: "pointer" }} onClick={() => setAdIndex(i)} />
        ))}
      </div>
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, marginTop: 12 }}>Educational Content</p>
    </div>
  );
}

export default function Part3Preview() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#020817" }}>
      <FeaturesSection />
      <ExamsSection user={null} onSignup={() => alert("Sign up!")} />
      <LibrarySection user={null} onSignup={() => alert("Sign up!")} />
      <AITutorSection user={null} />
      <BlogSection onNav={() => {}} />
    </div>
  );
}
// ============================================================
// GLOBAL ELITE ACADEMY — App.jsx PART 4 of 4
// Footer · Contact · 20 Pages · Main App Assembly · How to Connect
// ============================================================

import { useState } from "react";
import { AnnouncementBar, Navbar, HeroSection, AuthModal, LANGS } from "./GlobalEliteAcademy_Part1.jsx";
import { CoursesSection, PricingSection, TutorsSection } from "./GlobalEliteAcademy_Part2.jsx";
import { FeaturesSection, ExamsSection, LibrarySection, AITutorSection, BlogSection, EducationAdBanner } from "./GlobalEliteAcademy_Part3.jsx";

// ── FOOTER ───────────────────────────────────────────────────
function Footer({ onNav, lang }) {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    "Courses": ["Primary School", "Secondary (O-Level)", "A-Level (ACSEE)", "Diploma Courses", "Degree Programs", "Masters Programs"],
    "Resources": ["Past Papers & Exams", "Digital Library", "Study Notes", "Video Tutorials", "AI Tutor", "Practice Tests"],
    "Platform": ["About Us", "Our Tutors", "Blog & Articles", "Scholarships", "Careers", "Press & Media"],
    "Support": ["Help Center", "Contact Us", "WhatsApp Support", "Community Forum", "Feedback", "Report an Issue"],
    "Legal": ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy", "Accessibility", "GDPR"],
  };

  return (
    <footer style={{ background: "#030d1a", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 24px 32px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Top Section */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 40, marginBottom: 60, flexWrap: "wrap" }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 16 }}>
              🎓 Global Elite <span style={{ color: "#00d4aa" }}>Academy</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              World-class education from Primary to Masters. Empowering African students and learners worldwide with cutting-edge digital learning since 2024.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["🌍 47+ Countries", "👥 124K+ Students", "📚 500+ Courses", "⭐ 4.9/5 Rating"].map(b => (
                <span key={b} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 12px", color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{b}</span>
              ))}
            </div>
            {/* Social */}
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {["🐦 Twitter", "📘 Facebook", "📸 Instagram", "📺 YouTube", "💼 LinkedIn"].map(s => (
                <button key={s} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: 0.5 }}>{cat}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(link => (
                  <li key={link}>
                    <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontSize: 13.5, fontFamily: "inherit", textAlign: "left", padding: 0, transition: "color 0.2s" }}
                      onClick={() => onNav(link.toLowerCase().replace(/ /g, "_"))}>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 16, padding: "32px 40px", marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>📧 Stay Ahead in Education</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Get new courses, study tips, and scholarship alerts in your inbox.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flex: 1, maxWidth: 440 }}>
            <input style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", outline: "none" }} placeholder="Your email address" />
            <button style={{ background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 10, padding: "12px 22px", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit", whiteSpace: "nowrap" }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* App Download */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 16 }}>📱 Download the Global Elite Academy App</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {["📱 App Store (iOS)", "🤖 Google Play (Android)"].map(a => (
              <button key={a} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 24px", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>{a}</button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
            © {currentYear}–2030 Global Elite Academy · global-elite-academy.com · Built for Africa and the World
          </p>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
            📧 johnsonelisa020@gmail.com · 🌍 Available in 6 languages
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── CONTACT PAGE ─────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", type: "general" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    setSending(true);
    const mailto = `mailto:johnsonelisa020@gmail.com?subject=${encodeURIComponent(`[GEA] ${form.subject} - ${form.type}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020817", padding: "120px 24px 80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 600, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 12 }}>Get in Touch</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>Questions, partnerships, support? We respond within 24 hours.</p>
        </div>

        {!sent ? (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 40 }}>
            <select style={iS} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing & Payments</option>
              <option value="tutor">Become a Tutor</option>
              <option value="partnership">Partnership / B2B</option>
              <option value="school">School / Institution</option>
              <option value="media">Press & Media</option>
            </select>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 0 }}>
              <input style={iS} placeholder="Your Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={iS} type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <input style={iS} placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
            <textarea style={{ ...iS, height: 140, resize: "vertical" }} placeholder="Your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            <button style={{ width: "100%", background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 12, padding: 16, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}
              onClick={handleSend} disabled={sending}>
              {sending ? "⏳ Opening email..." : "📤 Send Message"}
            </button>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 16 }}>
              All messages go directly to johnsonelisa020@gmail.com
            </p>
          </div>
        ) : (
          <div style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 20, padding: 48, textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: 24, marginBottom: 12 }}>Message Sent!</h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>We'll get back to you within 24 hours at {form.email}</p>
          </div>
        )}

        {/* Contact Options */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 28 }}>
          {[
            { icon: "📧", label: "Email", value: "johnsonelisa020@gmail.com" },
            { icon: "💬", label: "WhatsApp", value: "Available for Premium users" },
            { icon: "🌐", label: "Website", value: "global-elite-academy.com" },
          ].map(c => (
            <div key={c.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "18px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: "#00d4aa", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const iS = { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "13px 16px", color: "#fff", fontSize: 14, fontFamily: "inherit", marginBottom: 14, boxSizing: "border-box", outline: "none", display: "block" };

// ── ABOUT PAGE ───────────────────────────────────────────────
function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#020817", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎓</div>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: "#fff", letterSpacing: "-2px", marginBottom: 16 }}>
            About Global Elite <span style={{ background: "linear-gradient(90deg, #00d4aa, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Academy</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>
            Founded with a vision to make world-class education accessible to every student in Africa and beyond — regardless of location or income.
          </p>
        </div>

        {[
          { title: "🌍 Our Mission", content: "To democratize access to quality education across Africa and the world. From a Primary 1 student in a rural village to a Masters student in the city — every learner deserves excellent, affordable, and relevant education powered by the latest technology." },
          { title: "🚀 Our Vision 2026–2030", content: "To become the #1 educational platform in Africa by 2028, serving 1 million students across 50+ countries with AI-enhanced personalized learning, local-language content, and industry-recognized certifications." },
          { title: "💡 What Makes Us Different", content: "We combine expert human tutors with cutting-edge AI technology. Our content is created by PhD-level educators and reviewed annually. We support 6 languages, offer flexible pricing including free access, and keep exams accessible — because knowledge should have no price barrier." },
          { title: "🤝 Our Impact", content: "Since 2024, we've helped 124,000+ students improve their exam results, with an average grade improvement of 35%. Our tutors span 15 countries and our content covers every subject from pre-school to Masters level." },
        ].map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "32px 36px", marginBottom: 20 }}>
            <h2 style={{ color: "#00d4aa", fontWeight: 800, fontSize: 22, marginBottom: 12 }}>{s.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.9, fontSize: 15 }}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PRIVACY POLICY PAGE ──────────────────────────────────────
function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#020817", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 40 }}>Last updated: June 2026 · © 2026–2030 Global Elite Academy</p>
        {[
          ["Data We Collect", "We collect your name, email address, education level, and usage data to personalize your learning experience. Payment information is processed securely via Stripe, PayPal, and M-Pesa — we never store your card details."],
          ["How We Use Your Data", "Your data is used to provide personalized course recommendations, track learning progress, send relevant notifications, and improve platform features. We do not sell your personal data to third parties."],
          ["Cookies", "We use essential cookies for authentication and analytics cookies (Google Analytics, AdSense) to understand how students use the platform. You can manage cookie preferences in your account settings."],
          ["Google AdSense (ca-pub-8024543613282871)", "We display educational advertisements via Google AdSense. These ads help fund our free content. Ads are clearly labeled and follow COPPA guidelines for under-13 users."],
          ["Your Rights (GDPR)", "You have the right to access, correct, or delete your personal data at any time. Contact us at johnsonelisa020@gmail.com to exercise these rights."],
          ["Children's Privacy", "Users under 13 require parental consent. We use child-safe ad settings and never collect sensitive data from minors."],
          ["Contact", "For privacy concerns: johnsonelisa020@gmail.com · global-elite-academy.com"],
        ].map(([title, content]) => (
          <div key={title} style={{ marginBottom: 32 }}>
            <h2 style={{ color: "#00d4aa", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{title}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: 15 }}>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TERMS PAGE ───────────────────────────────────────────────
function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#020817", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 40 }}>Effective: June 2026</p>
        {[
          ["Acceptance", "By using Global Elite Academy, you agree to these Terms. If you disagree, please discontinue use immediately."],
          ["Free Exam Limit", "Free accounts receive 10 complimentary exam attempts. After 10 exams, a Student or Premium subscription is required to continue. Exam count resets on plan upgrade."],
          ["Free Book Access", "Signed-in users receive 10 free book reads at their declared education level. Additional access requires a paid subscription."],
          ["Premium Subscription", "Premium subscribers receive unlimited access to all courses, exams, books, and tutors. Monthly billing via Visa, Mastercard, PayPal, M-Pesa, or bank transfer. Cancel anytime."],
          ["Tutor Services", "Tutors are independent educators. Global Elite Academy facilitates connections but is not liable for session outcomes. Refund requests for tutor sessions must be submitted within 48 hours."],
          ["Intellectual Property", "All course content, materials, and platform design are owned by Global Elite Academy. Unauthorized redistribution is prohibited."],
          ["Contact", "johnsonelisa020@gmail.com · global-elite-academy.com"],
        ].map(([title, content]) => (
          <div key={title} style={{ marginBottom: 28 }}>
            <h2 style={{ color: "#00d4aa", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{title}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: 15 }}>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 20 PAGES ROUTER ──────────────────────────────────────────
function PlaceholderPage({ title, icon, desc, onNav }) {
  return (
    <div style={{ minHeight: "100vh", background: "#020817", padding: "120px 24px 80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>{icon}</div>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 16 }}>{title}</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>{desc}</p>
        <button style={{ background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          onClick={() => onNav("home")}>← Back to Home</button>
      </div>
    </div>
  );
}

const ALL_PAGES = {
  home: null, // rendered as full home scroll
  courses: null, // CoursesSection
  exams: null, // ExamsSection
  library: null, // LibrarySection
  tutors: null, // TutorsSection
  pricing: null, // PricingSection
  blog: null, // BlogSection
  about: "about",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
  scholarships: { title: "Scholarships & Bursaries", icon: "🏅", desc: "We partner with NGOs and foundations to offer scholarships for top-performing students. Apply with your exam results and a short essay on your goals." },
  careers: { title: "Careers at GEA", icon: "💼", desc: "Join our growing team of educators, engineers, and content creators. We're hiring across Africa and globally — remote-first culture." },
  partnerships: { title: "Partner With Us", icon: "🤝", desc: "Schools, publishers, NGOs, and companies — partner with Global Elite Academy to reach 124,000+ students. Contact johnsonelisa020@gmail.com" },
  community: { title: "Student Community", icon: "👥", desc: "Connect with 124,000+ students across Africa. Join study groups, share notes, and support each other's learning journey." },
  certificates: { title: "Certificates & Credentials", icon: "🏆", desc: "Earn verifiable digital certificates for every course. Share them on LinkedIn, attach them to job applications, or use them for university admissions." },
  help: { title: "Help Center", icon: "💡", desc: "Find answers to common questions about courses, payments, exams, and accounts. Our support team is also available at johnsonelisa020@gmail.com" },
  mobile: { title: "Download Our App", icon: "📱", desc: "Learn anywhere with the Global Elite Academy mobile app. Available on iOS and Android. Offline mode for Premium users." },
  press: { title: "Press & Media", icon: "📰", desc: "Journalists and media professionals — for press inquiries, interview requests, and media kits, contact johnsonelisa020@gmail.com" },
  refund: { title: "Refund Policy", icon: "💰", desc: "Not satisfied? Request a full refund within 7 days of purchase. No questions asked. Tutor session refunds within 48 hours." },
  accessibility: { title: "Accessibility", icon: "♿", desc: "Global Elite Academy is committed to WCAG 2.1 AA accessibility standards. Screen reader support, keyboard navigation, and high-contrast modes available." },
};

// ── MAIN APP — FULL ASSEMBLY ─────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [courseFilter, setCourseFilter] = useState("All");

  const handleNav = (page, subFilter) => {
    setCurrentPage(page);
    if (subFilter) setCourseFilter(subFilter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    // Special pages
    if (currentPage === "about") return <AboutPage />;
    if (currentPage === "contact") return <ContactPage />;
    if (currentPage === "privacy") return <PrivacyPage />;
    if (currentPage === "terms") return <TermsPage />;
    if (currentPage === "courses") return <CoursesSection user={user} onSignup={() => setAuthMode("signup")} onNav={handleNav} filterLevel={courseFilter} />;
    if (currentPage === "exams") return <ExamsSection user={user} onSignup={() => setAuthMode("signup")} />;
    if (currentPage === "library") return <LibrarySection user={user} onSignup={() => setAuthMode("signup")} />;
    if (currentPage === "tutors") return <TutorsSection user={user} onSignup={() => setAuthMode("signup")} />;
    if (currentPage === "pricing") return <PricingSection user={user} onSignup={() => setAuthMode("signup")} />;
    if (currentPage === "blog") return <BlogSection onNav={handleNav} />;
    if (currentPage === "ai_tutor") return <AITutorSection user={user} />;

    // Placeholder pages (20 total)
    const page = ALL_PAGES[currentPage];
    if (page && typeof page === "object") {
      return <PlaceholderPage {...page} onNav={handleNav} />;
    }

    // HOME — Full landing page
    return (
      <>
        <HeroSection lang={lang} user={user} onSignup={() => setAuthMode("signup")} onNav={handleNav} />
        <FeaturesSection />
        <CoursesSection user={user} onSignup={() => setAuthMode("signup")} onNav={handleNav} />
        <AITutorSection user={user} />
        <PricingSection user={user} onSignup={() => setAuthMode("signup")} />
        <TutorsSection user={user} onSignup={() => setAuthMode("signup")} />
        <ExamsSection user={user} onSignup={() => setAuthMode("signup")} />
        <LibrarySection user={user} onSignup={() => setAuthMode("signup")} />
        <BlogSection onNav={handleNav} />
        <EducationAdBannerRow />
        <TestimonialsSection />
        <CTASection onSignup={() => setAuthMode("signup")} />
      </>
    );
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#020817", minHeight: "100vh" }}>
      <AnnouncementBar lang={lang} />
      <Navbar
        lang={lang} setLang={setLang}
        user={user}
        onLogin={() => setAuthMode("login")}
        onSignup={() => setAuthMode("signup")}
        onLogout={() => setUser(null)}
        onNav={handleNav}
        currentPage={currentPage}
      />
      <main>{renderPage()}</main>
      <Footer onNav={handleNav} lang={lang} />

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onAuth={(userData) => setUser(userData)}
          lang={lang}
        />
      )}
    </div>
  );
}

// ── TESTIMONIALS ─────────────────────────────────────────────
function TestimonialsSection() {
  const t = [
    { name: "Zawadi M.", location: "Dar es Salaam, Tanzania", level: "Form 4 Student", text: "I failed Math twice before Global Elite Academy. After 3 months on this platform, I scored an A in CSEE. The AI tutor explains things in Kiswahili — that changed everything for me.", rating: 5 },
    { name: "Kofi A.", location: "Accra, Ghana", level: "University, Year 2", text: "The library section alone is worth the subscription. I found past papers going back 10 years for every subject. My GPA went from 2.8 to 3.9 in one semester.", rating: 5 },
    { name: "Mrs. Njeri K.", location: "Nairobi, Kenya", level: "Parent", text: "My daughter is in Primary 5 and she loves learning here. The videos are engaging, the AI tutor is patient, and I can track her progress every week. Worth every shilling.", rating: 5 },
    { name: "Ahmed B.", location: "Kampala, Uganda", level: "A-Level", text: "I used the ACSEE past papers and the AI tutor to prepare for my Physics exam. Got a B+ which is way better than I expected. The video lessons by Dr. Kariuki are incredible.", rating: 5 },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "#020817" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-block", background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 100, padding: "6px 16px", color: "#00d4aa", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>💬 Student Stories</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px" }}>Real Results, Real Students</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {t.map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 24px" }}>
              <div style={{ color: "#ffd700", fontSize: 18, marginBottom: 12 }}>{"⭐".repeat(item.rating)}</div>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>"{item.text}"</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                <div style={{ color: "#00d4aa", fontSize: 12, marginTop: 2 }}>{item.level}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>📍 {item.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── AD BANNER ROW ────────────────────────────────────────────
function EducationAdBannerRow() {
  return (
    <section style={{ padding: "60px 24px", background: "#030d1a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: 11, marginBottom: 20, letterSpacing: 1 }}>EDUCATIONAL CONTENT & PARTNERSHIPS</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {[
            { emoji: "👶📚", title: "Early Learning", desc: "Building bright futures from age 3+", color: "#00d4aa" },
            { emoji: "🎮🧠", title: "Gamified Learning", desc: "Students play, explore, and master concepts", color: "#0066ff" },
            { emoji: "👨‍👩‍👧‍👦✨", title: "Family Learning", desc: "Parents and children growing together", color: "#8b00ff" },
            { emoji: "🤖🎓", title: "AI + Education 2030", desc: "The future of learning is already here", color: "#ffd700" },
          ].map((a, i) => (
            <div key={i} style={{ background: `rgba(255,255,255,0.02)`, border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 14, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>{a.emoji}</div>
              <div style={{ color: a.color, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{a.title}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{a.desc}</div>
            </div>
          ))}
        </div>
        {/* Google AdSense slot placeholder */}
        <div id="adsense-slot-home" style={{ marginTop: 30, textAlign: "center", color: "rgba(255,255,255,0.15)", fontSize: 12, border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 8, padding: 20 }}>
          {/* Replace this div with your Google AdSense script tag for ca-pub-8024543613282871 */}
          📢 Google AdSense — ca-pub-8024543613282871 · Ad will appear here after AdSense approval
        </div>
      </div>
    </section>
  );
}

// ── FINAL CTA SECTION ────────────────────────────────────────
function CTASection({ onSignup }) {
  return (
    <section style={{ padding: "100px 24px", background: "linear-gradient(135deg, rgba(0,212,170,0.08), rgba(0,102,255,0.08))", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>🚀</div>
        <h2 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", marginBottom: 20, lineHeight: 1.1 }}>
          Start Your Learning Journey <span style={{ background: "linear-gradient(90deg, #00d4aa, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Today</span>
        </h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 36 }}>
          Join 124,000+ students already learning on Global Elite Academy. Your first 10 exams and 10 books are completely free.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ background: "linear-gradient(135deg, #00d4aa, #0066ff)", border: "none", color: "#fff", borderRadius: 12, padding: "18px 40px", fontSize: 17, fontWeight: 700, cursor: "pointer", boxShadow: "0 10px 40px rgba(0,212,170,0.3)", fontFamily: "inherit" }}
            onClick={onSignup}>
            🎓 Create Free Account
          </button>
          <a href="mailto:johnsonelisa020@gmail.com" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 12, padding: "18px 36px", fontSize: 17, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            📧 Contact Us
          </a>
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, marginTop: 24 }}>
          © 2026–2030 Global Elite Academy · global-elite-academy.com
        </p>
      </div>
    </section>
  );
}

// ============================================================
// HOW TO CONNECT ALL 4 PARTS — STEP BY STEP GUIDE
// ============================================================
/*
STEP 1 — FILE STRUCTURE (in your Vite/React project)
=====================================================
src/
  ├── App.jsx                          ← PART 4 (this file, main entry)
  ├── GlobalEliteAcademy_Part1.jsx     ← PART 1 (Nav, Hero, Auth)
  ├── GlobalEliteAcademy_Part2.jsx     ← PART 2 (Courses, Pricing, Tutors)
  ├── GlobalEliteAcademy_Part3.jsx     ← PART 3 (Features, Exams, Library, AI, Blog)
  ├── main.jsx                         ← (unchanged Vite entry)
  └── index.css                        ← (global resets below)

STEP 2 — main.jsx (copy this exactly)
=====================================================
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

STEP 3 — index.css (global resets)
=====================================================
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #020817; overflow-x: hidden; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0d1117; }
::-webkit-scrollbar-thumb { background: #00d4aa; border-radius: 3px; }
input, select, textarea, button { font-family: inherit; }

STEP 4 — vite.config.js (for Vercel deployment)
=====================================================
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' }
})

STEP 5 — vercel.json (for React Router SPA)
=====================================================
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}

STEP 6 — package.json scripts
=====================================================
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}

STEP 7 — Google AdSense Setup
=====================================================
1. In your index.html <head>:
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8024543613282871" crossorigin="anonymous"></script>
2. Replace the adsense-slot-home div in EducationAdBannerRow with your actual <ins> AdSense code

STEP 8 — Environment Variables (Vercel Dashboard)
=====================================================
No API key needed in .env — the Claude API is called directly from
the AI Tutor component. For production, add CORS proxy if needed.

STEP 9 — Deploy to Vercel
=====================================================
vercel --prod
OR: Connect GitHub repo to Vercel, push to main branch

STEP 10 — DNS (Cloudflare → Vercel)
=====================================================
CNAME  www   cname.vercel-dns.com
A      @     76.76.21.21
*/

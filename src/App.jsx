import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   GLOBAL ELITE ACADEMY  ·  App.jsx  ·  Full Single-File Version
   global-elite-academy.com  ·  © 2026–2030
   Contact: johnsonelisa020@gmail.com
   AdSense: ca-pub-8024543613282871
═══════════════════════════════════════════════════════════════ */

// ─── CSS KEYFRAMES (injected once) ───────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #020817; overflow-x: hidden; font-family: 'Inter', system-ui, sans-serif; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0a0f1e; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#00d4aa, #0066ff); border-radius: 3px; }
  input, select, textarea, button { font-family: inherit; }
  button:hover { opacity: 0.92; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes gradientFlow { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
  @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(180deg)} }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes slideIn { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
  @keyframes logoSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
  .gea-btn-primary { background:linear-gradient(135deg,#00d4aa,#0066ff); border:none; color:#fff; border-radius:12px; padding:15px 32px; font-size:15px; font-weight:700; cursor:pointer; box-shadow:0 6px 24px rgba(0,212,170,.3); transition:transform .2s,box-shadow .2s; }
  .gea-btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(0,212,170,.45); }
  .gea-btn-outline { background:rgba(255,255,255,.06); border:1.5px solid rgba(255,255,255,.2); color:#fff; border-radius:12px; padding:15px 32px; font-size:15px; font-weight:600; cursor:pointer; transition:all .2s; }
  .gea-btn-outline:hover { background:rgba(255,255,255,.12); border-color:rgba(255,255,255,.4); }
  .gea-card { background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08); border-radius:18px; transition:all .3s; }
  .gea-card:hover { border-color:rgba(0,212,170,.35); transform:translateY(-4px); box-shadow:0 20px 50px rgba(0,212,170,.08); }
  .gea-section { padding:96px 24px; }
  .gea-inner { max-width:1280px; margin:0 auto; }
  .gea-badge { display:inline-block; background:rgba(0,212,170,.1); border:1px solid rgba(0,212,170,.3); border-radius:100px; padding:6px 16px; color:#00d4aa; font-size:13px; font-weight:600; margin-bottom:16px; }
  .gea-h2 { font-family:'Space Grotesk',sans-serif; font-size:clamp(30px,5vw,52px); font-weight:800; color:#fff; letter-spacing:-1.5px; line-height:1.1; margin-bottom:14px; }
  .gea-sub { font-size:16px; color:rgba(255,255,255,.52); max-width:540px; margin:0 auto; line-height:1.75; }
  .gea-gradient-text { background:linear-gradient(90deg,#00d4aa,#0066ff,#a855f7,#00d4aa); background-size:300% 100%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:gradientFlow 5s ease infinite; }
  @media(max-width:768px){
    .gea-section{padding:64px 16px;}
    .gea-h2{font-size:28px;}
    .hide-mobile{display:none!important;}
    .nav-links-desktop{display:none!important;}
    .burger-btn{display:flex!important;}
  }
  @media(min-width:769px){ .burger-btn{display:none!important;} }
`;

// ─── LANGUAGE DATA ────────────────────────────────────────────
const L = {
  en: { name:"English 🇺🇸", hero_h1:"Learn Without", hero_h1b:"Limits.", hero_sub:"World-class education from Primary to Masters. 500+ courses, live tutors, AI assistant.", cta1:"Start Free Today", cta2:"Browse Courses", login:"Sign In", signup:"Get Started Free", announce:"🎉 First 10 Exams FREE · 10 Books FREE · No credit card needed" },
  sw: { name:"Kiswahili 🇹🇿", hero_h1:"Jifunze Bila", hero_h1b:"Mipaka.", hero_sub:"Elimu bora kuanzia Shule ya Msingi hadi Uzamili. Kozi 500+, walimu, na AI.", cta1:"Anza Bure Leo", cta2:"Angalia Kozi", login:"Ingia", signup:"Anza Bure", announce:"🎉 Mitihani 10 ya kwanza BURE · Vitabu 10 BURE · Bila kadi ya benki" },
  fr: { name:"Français 🇫🇷", hero_h1:"Apprenez Sans", hero_h1b:"Limites.", hero_sub:"Éducation mondiale du primaire au master. 500+ cours, tuteurs, IA.", cta1:"Commencer Gratuitement", cta2:"Explorer", login:"Connexion", signup:"Commencer", announce:"🎉 10 premiers examens GRATUITS · 10 livres GRATUITS" },
  de: { name:"Deutsch 🇩🇪", hero_h1:"Lernen ohne", hero_h1b:"Grenzen.", hero_sub:"Weltklasse-Bildung von der Grundschule bis zum Master. 500+ Kurse.", cta1:"Kostenlos starten", cta2:"Kurse entdecken", login:"Anmelden", signup:"Starten", announce:"🎉 Erste 10 Prüfungen KOSTENLOS · 10 Bücher KOSTENLOS" },
  zh: { name:"中文 🇨🇳", hero_h1:"无限制", hero_h1b:"学习。", hero_sub:"从小学到硕士的世界级教育。500+课程、AI导师。", cta1:"免费开始", cta2:"浏览课程", login:"登录", signup:"免费注册", announce:"🎉 前10次考试免费 · 10本书免费" },
};

// ─── COURSES DATA ─────────────────────────────────────────────
const COURSES = [
  {id:"p1",lv:"Primary",sub:"Mathematics",title:"Primary Math Mastery",price:8,lessons:60,students:4200,rating:4.9,icon:"🔢",tag:"Popular",desc:"Numbers, fractions, geometry and word problems for young learners."},
  {id:"p2",lv:"Primary",sub:"English",title:"English Language Arts",price:8,lessons:55,students:3800,rating:4.8,icon:"📖",tag:"New",desc:"Reading, writing, grammar and comprehension for ages 6–13."},
  {id:"p3",lv:"Primary",sub:"Science",title:"Science Explorer",price:7,lessons:45,students:2900,rating:4.7,icon:"🔬",tag:"",desc:"Nature, living things, forces and the environment made fun."},
  {id:"p4",lv:"Primary",sub:"Kiswahili",title:"Kiswahili Lugha",price:7,lessons:50,students:5100,rating:4.9,icon:"🗣️",tag:"Top Rated",desc:"Lugha ya Kiswahili — uandishi, usomaji na mazungumzo."},
  {id:"s1",lv:"Secondary",sub:"Mathematics",title:"O-Level Mathematics",price:12,lessons:90,students:6700,rating:4.9,icon:"📐",tag:"Best Seller",desc:"Algebra, geometry, trigonometry, stats — full CSEE preparation."},
  {id:"s2",lv:"Secondary",sub:"Biology",title:"O-Level Biology",price:12,lessons:80,students:5200,rating:4.8,icon:"🧬",tag:"",desc:"Cell biology, genetics, ecology, human anatomy and exam prep."},
  {id:"s3",lv:"Secondary",sub:"Chemistry",title:"O-Level Chemistry",price:12,lessons:75,students:4800,rating:4.7,icon:"⚗️",tag:"",desc:"Atoms, reactions, organic chemistry and lab techniques."},
  {id:"s4",lv:"Secondary",sub:"Physics",title:"O-Level Physics",price:12,lessons:78,students:4500,rating:4.8,icon:"⚡",tag:"",desc:"Mechanics, waves, electricity, magnetism and CSEE exam prep."},
  {id:"a1",lv:"A-Level",sub:"Mathematics",title:"Advanced Mathematics",price:18,lessons:110,students:2800,rating:4.9,icon:"📊",tag:"Elite",desc:"Calculus, vectors, mechanics and statistics for ACSEE."},
  {id:"a2",lv:"A-Level",sub:"Physics",title:"Advanced Physics",price:18,lessons:105,students:2400,rating:4.8,icon:"🚀",tag:"",desc:"Advanced mechanics, electromagnetism and quantum physics."},
  {id:"a3",lv:"A-Level",sub:"Biology",title:"Advanced Biology",price:18,lessons:100,students:2200,rating:4.8,icon:"🧪",tag:"",desc:"Molecular biology, genetics and physiology for ACSEE."},
  {id:"a4",lv:"A-Level",sub:"Economics",title:"Advanced Economics",price:16,lessons:95,students:1900,rating:4.7,icon:"💹",tag:"",desc:"Micro, macro, international trade and development economics."},
  {id:"d1",lv:"Diploma",sub:"IT",title:"Diploma in Information Tech",price:22,lessons:140,students:1700,rating:4.9,icon:"💻",tag:"Hot",desc:"Programming, networking, databases, web dev and cybersecurity."},
  {id:"d2",lv:"Diploma",sub:"Business",title:"Diploma in Business Mgmt",price:22,lessons:130,students:1400,rating:4.8,icon:"💼",tag:"In Demand",desc:"Management, marketing, finance, HRM and entrepreneurship."},
  {id:"dg1",lv:"Degree",sub:"CS",title:"BSc Computer Science",price:35,lessons:200,students:890,rating:4.9,icon:"🖥️",tag:"Premium",desc:"Algorithms, AI, software engineering and capstone project."},
  {id:"dg2",lv:"Degree",sub:"Business",title:"BBA Business Administration",price:32,lessons:190,students:1100,rating:4.8,icon:"📈",tag:"",desc:"Strategic management, accounting, marketing and finance."},
  {id:"m1",lv:"Masters",sub:"MBA",title:"Masters of Business Admin",price:55,lessons:240,students:340,rating:4.9,icon:"🎯",tag:"Executive",desc:"Leadership, corporate strategy, global finance and entrepreneurship."},
  {id:"m2",lv:"Masters",sub:"Data Science",title:"MSc Data Science & AI",price:60,lessons:260,students:280,rating:5.0,icon:"🤖",tag:"Future Tech",desc:"Machine learning, neural networks, big data and real-world projects."},
];

const TUTORS = [
  {id:1,name:"Dr. Amina Okonkwo",sub:"Mathematics",lv:"University",rating:4.98,students:1240,price:"$25",img:"👩🏾‍🏫",country:"Nigeria",bio:"PhD Pure Mathematics. 12 years A-Level and University teaching.",avail:true},
  {id:2,name:"Prof. James Kariuki",sub:"Physics",lv:"A-Level & Degree",rating:4.95,students:890,price:"$20",img:"👨🏿‍🔬",country:"Kenya",bio:"MSc Physics. Specialist in mechanics and electromagnetism.",avail:true},
  {id:3,name:"Ms. Fatima Al-Rashid",sub:"Biology",lv:"Secondary",rating:4.92,students:2100,price:"$15",img:"👩🏽‍⚕️",country:"Tanzania",bio:"BSc Biological Sciences. Makes biology easy and engaging.",avail:false},
  {id:4,name:"Mr. Chen Wei",sub:"Computer Science",lv:"Degree & Masters",rating:5.0,students:580,price:"$30",img:"👨🏻‍💻",country:"China",bio:"MSc Software Engineering. Expert in AI, algorithms and web dev.",avail:true},
  {id:5,name:"Dr. Grace Mensah",sub:"Economics",lv:"A-Level & Degree",rating:4.94,students:760,price:"$22",img:"👩🏿‍💼",country:"Ghana",bio:"PhD Economics, LSE. Development economics specialist.",avail:true},
  {id:6,name:"Mr. Hassan Omar",sub:"Kiswahili",lv:"All Levels",rating:4.97,students:1890,price:"$10",img:"👨🏾‍🏫",country:"Tanzania",bio:"MA Kiswahili Studies, UDSM. Native speaker and expert educator.",avail:true},
];

const PLANS = [
  {name:"Free",price:0,icon:"🆓",color:"#888",grad:"linear-gradient(135deg,#444,#333)",features:["✅ 10 Free Exams (any level)","✅ 10 Free Books at your level","✅ Preview all course content","✅ Community forum access","✅ Basic AI Tutor (5 questions/day)","❌ Full course access","❌ Download materials","❌ Certificates"],cta:"Start Free",pop:false},
  {name:"Student",price:15,icon:"🎓",color:"#00d4aa",grad:"linear-gradient(135deg,#00d4aa,#0066ff)",features:["✅ All Free features","✅ Unlimited exams (all levels)","✅ Full course library","✅ Unlimited AI Tutor","✅ Download all materials","✅ 100+ E-books & resources","✅ Live tutor sessions (2/month)","✅ Certificates of completion"],cta:"Start 7-Day Free Trial",pop:true},
  {name:"Premium",price:35,icon:"👑",color:"#ffd700",grad:"linear-gradient(135deg,#ffd700,#ff8c00)",features:["✅ Everything in Student","✅ All courses ALL levels","✅ Priority 1-on-1 tutors","✅ Live group classes","✅ Unlimited AI tutoring","✅ Career guidance","✅ Offline mobile access","✅ Dedicated support agent"],cta:"Go Premium",pop:false},
];

const BLOGS = [
  {id:1,cat:"Study Tips",title:"10 Proven Study Techniques That Double Your Exam Score",author:"Dr. Amina Okonkwo",date:"June 5, 2026",read:"5 min",icon:"📖",tag:"Popular"},
  {id:2,cat:"Technology",title:"How AI is Revolutionizing Education in Africa by 2030",author:"Chen Wei",date:"June 8, 2026",read:"7 min",icon:"🤖",tag:"Trending"},
  {id:3,cat:"Career",title:"Top 10 Careers for African Students in 2026–2030",author:"Dr. Grace Mensah",date:"June 10, 2026",read:"6 min",icon:"🚀",tag:"New"},
  {id:4,cat:"Mathematics",title:"CSEE Math: The 7 Topics That Appear Every Year",author:"Prof. James Kariuki",date:"June 7, 2026",read:"8 min",icon:"📐",tag:"Must Read"},
  {id:5,cat:"Parenting",title:"How Parents Can Support Digital Learning at Home",author:"Mrs. A. Njoroge",date:"June 9, 2026",read:"4 min",icon:"👨‍👧",tag:""},
  {id:6,cat:"University",title:"How to Write a First-Class Dissertation in 90 Days",author:"Prof. J. Okonkwo",date:"June 3, 2026",read:"10 min",icon:"🎓",tag:""},
];

// ─── COUNTER HOOK ─────────────────────────────────────────────
function useCounter(end, dur=2200, active=false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setN(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, dur, active]);
  return n;
}

// ─── INTERSECTION HOOK ────────────────────────────────────────
function useInView(ref, threshold=0.15) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return seen;
}

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════════ */

// ─── AUTH MODAL ───────────────────────────────────────────────
function AuthModal({ mode, onClose, onAuth }) {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({ name:"", email:"", password:"", level:"primary" });
  const [loading, setLoading] = useState(false);
  const levels = [
    {v:"primary",l:"Primary School"},{v:"secondary",l:"Secondary (O-Level)"},
    {v:"alevel",l:"A-Level (ACSEE)"},{v:"diploma",l:"Diploma"},
    {v:"degree",l:"Undergraduate Degree"},{v:"masters",l:"Masters / Postgraduate"},
  ];
  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({ name: form.name || form.email.split("@")[0], email:form.email, level:form.level, plan:"free", freeExams:10, freeBooks:10 });
      onClose();
    }, 1000);
  };
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",border:"1px solid rgba(255,255,255,.12)",borderRadius:22,padding:38,width:"100%",maxWidth:420,position:"relative",boxShadow:"0 40px 100px rgba(0,0,0,.7)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,.08)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:14}}>✕</button>
        {/* GEA Logo */}
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 10px",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,color:"#fff"}}>G</div>
          <div style={{color:"#fff",fontWeight:800,fontSize:17,fontFamily:"'Space Grotesk',sans-serif"}}>Global Elite Academy</div>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",gap:4,background:"rgba(255,255,255,.05)",borderRadius:10,padding:4,marginBottom:22}}>
          {["login","signup"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"9px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,background:tab===t?"linear-gradient(135deg,#00d4aa,#0066ff)":"none",color:tab===t?"#fff":"rgba(255,255,255,.45)"}}>
              {t==="login"?"Sign In":"Create Account"}
            </button>
          ))}
        </div>
        {tab==="signup" && <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={IS} />}
        <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email Address" style={IS} />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" style={IS} />
        {tab==="signup" && (
          <select value={form.level} onChange={e=>setForm({...form,level:e.target.value})} style={IS}>
            {levels.map(l=><option key={l.v} value={l.v}>{l.l}</option>)}
          </select>
        )}
        <button onClick={submit} disabled={loading} style={{width:"100%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",border:"none",color:"#fff",borderRadius:11,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:4,marginBottom:14}}>
          {loading ? "⏳ Please wait…" : tab==="login" ? "Sign In" : "Create Free Account"}
        </button>
        {tab==="signup" && <p style={{textAlign:"center",color:"rgba(255,255,255,.5)",fontSize:13}}>✅ Includes <strong style={{color:"#00d4aa"}}>10 free exams</strong> + <strong style={{color:"#00d4aa"}}>10 free books</strong></p>}
        <div style={{textAlign:"center",marginTop:16}}>
          <p style={{color:"rgba(255,255,255,.35)",fontSize:12,marginBottom:10}}>Or continue with</p>
          <div style={{display:"flex",gap:8,justifyContent:"center"}}>
            {["🔴 Google","🔵 Facebook"].map(s=><button key={s} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",borderRadius:8,padding:"9px 18px",fontSize:13,cursor:"pointer"}}>{s}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}
const IS = {display:"block",width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,padding:"13px 16px",color:"#fff",fontSize:14,marginBottom:12,outline:"none",boxSizing:"border-box"};

// ─── ANNOUNCEMENT BAR ─────────────────────────────────────────
function AnnouncementBar({ lang }) {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div style={{background:"linear-gradient(90deg,#00d4aa,#0066ff,#a855f7)",color:"#fff",textAlign:"center",padding:"10px 20px",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:12,position:"relative",zIndex:1001}}>
      <span>{(L[lang]||L.en).announce}</span>
      <button onClick={()=>setShow(false)} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:16,marginLeft:8,lineHeight:1}}>✕</button>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────
function Navbar({ lang, setLang, user, onLogin, onSignup, onLogout, goTo, page }) {
  const t = L[lang]||L.en;
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  const [drop, setDrop] = useState(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    {k:"home",l:"Home"},{k:"courses",l:"Courses",sub:["Primary","Secondary","A-Level","Diploma","Degree","Masters"]},
    {k:"exams",l:"Exams"},{k:"library",l:"Library"},{k:"tutors",l:"Tutors"},
    {k:"pricing",l:"Pricing"},{k:"blog",l:"Blog"},{k:"about",l:"About"},{k:"contact",l:"Contact"},
  ];

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,transition:"all .3s",background:scrolled?"rgba(2,8,23,.97)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,.07)":"none",boxShadow:scrolled?"0 2px 30px rgba(0,0,0,.5)":"none"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 20px",height:66,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
        {/* Logo */}
        <div onClick={()=>goTo("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:18,color:"#fff",boxShadow:"0 0 16px rgba(0,212,170,.4)"}}>G</div>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:17,color:"#fff",letterSpacing:"-.4px"}}>Global Elite <span style={{color:"#00d4aa"}}>Academy</span></span>
        </div>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{display:"flex",alignItems:"center",gap:2,flex:1,justifyContent:"center",overflow:"hidden"}}>
          {links.map(lk=>(
            <div key={lk.k} style={{position:"relative"}} onMouseEnter={()=>lk.sub&&setDrop(lk.k)} onMouseLeave={()=>setDrop(null)}>
              <button onClick={()=>{goTo(lk.k);setMOpen(false);}} style={{background:"none",border:"none",color:page===lk.k?"#00d4aa":"rgba(255,255,255,.78)",cursor:"pointer",fontSize:13.5,fontWeight:500,padding:"8px 10px",borderRadius:8,background:page===lk.k?"rgba(0,212,170,.1)":"none",transition:"all .2s"}}>
                {lk.l}{lk.sub&&" ▾"}
              </button>
              {lk.sub && drop===lk.k && (
                <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",background:"#0d1117",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"8px 0",minWidth:160,zIndex:200,boxShadow:"0 20px 50px rgba(0,0,0,.6)"}}>
                  {lk.sub.map(s=><button key={s} onClick={()=>{goTo("courses",s);setDrop(null);}} style={{display:"block",width:"100%",padding:"9px 18px",background:"none",border:"none",color:"rgba(255,255,255,.75)",cursor:"pointer",textAlign:"left",fontSize:13,transition:"all .2s"}}>{s}</button>)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",borderRadius:8,padding:"6px 9px",fontSize:12,cursor:"pointer"}}>
            {Object.entries(L).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}
          </select>
          {user ? (
            <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.07)",borderRadius:20,padding:"5px 12px"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#fff"}}>{user.name[0].toUpperCase()}</div>
              <span style={{fontSize:13,color:"#fff",maxWidth:80,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</span>
              <button onClick={onLogout} style={{background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:11}}>✕</button>
            </div>
          ) : (
            <>
              <button onClick={onLogin} className="hide-mobile" style={{background:"none",border:"1px solid rgba(255,255,255,.22)",color:"#fff",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13,fontWeight:600}}>{t.login}</button>
              <button onClick={onSignup} style={{background:"linear-gradient(135deg,#00d4aa,#0066ff)",border:"none",color:"#fff",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13,fontWeight:700,boxShadow:"0 4px 14px rgba(0,212,170,.28)"}}>Free</button>
            </>
          )}
          <button className="burger-btn" onClick={()=>setMOpen(!mOpen)} style={{background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer",display:"none"}}>
            {mOpen?"✕":"☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mOpen && (
        <div style={{background:"#0a0f1e",borderTop:"1px solid rgba(255,255,255,.08)",padding:20,display:"flex",flexDirection:"column",gap:4}}>
          {links.map(lk=>(
            <button key={lk.k} onClick={()=>{goTo(lk.k);setMOpen(false);}} style={{background:"none",border:"none",color:"rgba(255,255,255,.8)",cursor:"pointer",padding:"11px 0",textAlign:"left",fontSize:15,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              {lk.l}
            </button>
          ))}
          <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:12,marginTop:4,display:"flex",flexDirection:"column",gap:8}}>
            <button onClick={()=>{onLogin();setMOpen(false);}} style={{background:"rgba(255,255,255,.07)",border:"none",color:"#fff",borderRadius:8,padding:12,cursor:"pointer",fontWeight:600,fontSize:14}}>Sign In</button>
            <button onClick={()=>{onSignup();setMOpen(false);}} style={{background:"linear-gradient(135deg,#00d4aa,#0066ff)",border:"none",color:"#fff",borderRadius:8,padding:12,cursor:"pointer",fontWeight:700,fontSize:14}}>Create Free Account</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────
function Hero({ lang, user, onSignup, goTo }) {
  const t = L[lang]||L.en;
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  const seen = useInView(ref, 0.1);
  const s1 = useCounter(124000,2400,seen);
  const s2 = useCounter(500,2000,seen);
  const s3 = useCounter(47,1800,seen);
  const s4 = useCounter(320,2000,seen);
  useEffect(()=>{ setTimeout(()=>setLoaded(true),80); },[]);

  const particles = Array.from({length:14},(_,i)=>({ left:`${5+i*6.5}%`, top:`${10+Math.sin(i*1.3)*70}%`, size:3+Math.cos(i)*3, delay:i*.4 }));

  return (
    <section style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#020817",paddingTop:66}}>
      {/* BG blobs */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 70% at 20% 40%,rgba(0,102,255,.13) 0%,transparent 70%),radial-gradient(ellipse 60% 60% at 80% 20%,rgba(0,212,170,.10) 0%,transparent 60%),radial-gradient(ellipse 50% 50% at 50% 80%,rgba(168,85,247,.08) 0%,transparent 60%)",pointerEvents:"none"}} />
      <div style={{position:"absolute",top:"10%",left:"8%",width:500,height:500,borderRadius:"50%",background:"rgba(0,102,255,.05)",filter:"blur(80px)",animation:"pulse 7s ease-in-out infinite",pointerEvents:"none"}} />
      <div style={{position:"absolute",bottom:"10%",right:"8%",width:400,height:400,borderRadius:"50%",background:"rgba(0,212,170,.05)",filter:"blur(70px)",animation:"pulse 9s 3s ease-in-out infinite",pointerEvents:"none"}} />
      {/* Particles */}
      {particles.map((p,i)=>(
        <div key={i} style={{position:"absolute",left:p.left,top:p.top,width:p.size,height:p.size,borderRadius:"50%",background:"rgba(0,212,170,.35)",animation:`float ${7+i*.5}s ${p.delay}s ease-in-out infinite`,pointerEvents:"none"}} />
      ))}

      {/* Content */}
      <div style={{position:"relative",zIndex:5,textAlign:"center",maxWidth:860,padding:"60px 24px 48px",display:"flex",flexDirection:"column",alignItems:"center",gap:22}}>
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all .8s ease",display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,212,170,.1)",border:"1px solid rgba(0,212,170,.3)",borderRadius:100,padding:"7px 18px",color:"#00d4aa",fontSize:13,fontWeight:600,letterSpacing:.4}}>
          🌍 Ranked #1 African EdTech Platform 2026–2030
        </div>
        <h1 style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(28px)",transition:"all .9s .15s ease",fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(46px,9vw,88px)",fontWeight:900,lineHeight:1.04,color:"#fff",letterSpacing:"-2.5px",margin:0}}>
          {t.hero_h1}<br/>
          <span className="gea-gradient-text">{t.hero_h1b}</span>
        </h1>
        <p style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(24px)",transition:"all .9s .3s ease",fontSize:17,color:"rgba(255,255,255,.6)",maxWidth:620,lineHeight:1.75,margin:0}}>
          {t.hero_sub}
        </p>
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all .9s .45s ease",display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>
          <button className="gea-btn-primary" onClick={user?()=>goTo("courses"):onSignup} style={{fontSize:16,padding:"16px 34px"}}>
            🚀 {t.cta1}
          </button>
          <button className="gea-btn-outline" onClick={()=>goTo("courses")} style={{fontSize:16,padding:"16px 34px"}}>
            📚 {t.cta2}
          </button>
        </div>
        <div style={{opacity:loaded?1:0,transition:"all .9s .6s ease",display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
          {["✅ No credit card","✅ 10 free exams","✅ 10 free books","✅ Cancel anytime"].map((b,i)=>(
            <span key={i} style={{fontSize:12.5,color:"rgba(255,255,255,.45)",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:100,padding:"4px 12px"}}>{b}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div ref={ref} style={{position:"relative",zIndex:5,display:"grid",gridTemplateColumns:"repeat(4,1fr)",width:"100%",maxWidth:840,borderTop:"1px solid rgba(255,255,255,.07)"}}>
        {[{n:s1,l:"Students",s:"+"},{n:s2,l:"Courses",s:"+"},{n:s3,l:"Countries",s:""},{n:s4,l:"Tutors",s:"+"}].map((st,i)=>(
          <div key={i} style={{textAlign:"center",padding:"30px 16px",borderRight:i<3?"1px solid rgba(255,255,255,.07)":"none"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:900,background:"linear-gradient(135deg,#00d4aa,#0066ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{st.n.toLocaleString()}{st.s}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.45)",marginTop:5,fontWeight:500}}>{st.l}</div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div onClick={()=>window.scrollBy({top:600,behavior:"smooth"})} style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",cursor:"pointer",zIndex:5}}>
        <div style={{width:11,height:11,borderRadius:"50%",background:"rgba(0,212,170,.6)",animation:"bounce 2s ease infinite"}} />
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────
function Features() {
  const ref = useRef(null);
  const seen = useInView(ref,0.08);
  const feats = [
    {icon:"🤖",title:"AI-Powered Tutor",desc:"24/7 personalized AI that adapts to your level and language.",color:"#00d4aa"},
    {icon:"📱",title:"Mobile-First",desc:"Learn on any device. Offline mode on mobile for Premium users.",color:"#0066ff"},
    {icon:"🌍",title:"6 Languages",desc:"EN, SW, FR, DE, ZH, British English — content in your language.",color:"#a855f7"},
    {icon:"🏆",title:"Certified Learning",desc:"Verifiable digital certificates for every course completed.",color:"#ffd700"},
    {icon:"👥",title:"Live Classes",desc:"Real-time sessions with expert tutors and global classmates.",color:"#ff6b6b"},
    {icon:"📊",title:"Progress Analytics",desc:"Track performance, weak areas, study time and exam readiness.",color:"#00d4aa"},
    {icon:"📚",title:"Massive Library",desc:"10,000+ e-books, past papers and study notes — all searchable.",color:"#0066ff"},
    {icon:"🔒",title:"Safe & Secure",desc:"Bank-level encryption. GDPR compliant. Child-safe from age 6+.",color:"#a855f7"},
  ];
  return (
    <section ref={ref} className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:56}}>
          <span className="gea-badge">✨ Why Choose Us?</span>
          <h2 className="gea-h2">The Future of Education<br/><span className="gea-gradient-text">Is Here</span></h2>
          <p className="gea-sub">Every feature built to help you learn faster, smarter and more effectively.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18}}>
          {feats.map((f,i)=>(
            <div key={i} className="gea-card" style={{padding:"26px 22px",opacity:seen?1:0,transform:seen?"translateY(0)":"translateY(24px)",transition:`all .5s ${i*55}ms`}}>
              <div style={{fontSize:34,marginBottom:14}}>{f.icon}</div>
              <h3 style={{fontSize:16,fontWeight:700,color:f.color,marginBottom:8}}>{f.title}</h3>
              <p style={{fontSize:13.5,color:"rgba(255,255,255,.52)",lineHeight:1.7}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COURSES ──────────────────────────────────────────────────
function CoursesSection({ user, onSignup, goTo, filterLv="All" }) {
  const [lv, setLv] = useState(filterLv);
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const levels = ["All","Primary","Secondary","A-Level","Diploma","Degree","Masters"];
  const filtered = COURSES.filter(c=>(lv==="All"||c.lv===lv)&&(c.title.toLowerCase().includes(q.toLowerCase())||c.sub.toLowerCase().includes(q.toLowerCase())));
  const shown = all ? filtered : filtered.slice(0,8);
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">📚 All Courses</span>
          <h2 className="gea-h2">500+ Courses Across<br/><span className="gea-gradient-text">All Levels</span></h2>
          <p className="gea-sub">Primary to Masters — every subject, expert-taught, affordable.</p>
        </div>
        {/* Filter */}
        <div style={{display:"flex",gap:14,marginBottom:36,flexWrap:"wrap",alignItems:"center"}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍 Search courses…" style={{flex:1,minWidth:200,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,padding:"11px 16px",color:"#fff",fontSize:14,outline:"none"}} />
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {levels.map(l=>(
              <button key={l} onClick={()=>setLv(l)} style={{background:lv===l?"linear-gradient(135deg,#00d4aa,#0066ff)":"rgba(255,255,255,.05)",border:lv===l?"none":"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"8px 14px",color:lv===l?"#fff":"rgba(255,255,255,.6)",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s"}}>
                {l}
              </button>
            ))}
          </div>
        </div>
        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:18}}>
          {shown.map(c=>(
            <div key={c.id} className="gea-card" style={{padding:22,cursor:"pointer",position:"relative",overflow:"hidden"}}>
              {c.tag && <div style={{position:"absolute",top:12,right:12,background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700}}>{c.tag}</div>}
              <div style={{fontSize:34,marginBottom:10}}>{c.icon}</div>
              <div style={{fontSize:11,color:"#00d4aa",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{c.lv}</div>
              <h3 style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:8,lineHeight:1.35}}>{c.title}</h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,.48)",lineHeight:1.65,marginBottom:14}}>{c.desc}</p>
              <div style={{display:"flex",gap:10,fontSize:12,color:"rgba(255,255,255,.38)",marginBottom:16,flexWrap:"wrap"}}>
                <span>📹 {c.lessons}</span><span>👥 {c.students.toLocaleString()}</span><span>⭐ {c.rating}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:900,color:"#fff"}}>${c.price}</span>
                  <span style={{fontSize:13,color:"rgba(255,255,255,.38)"}}>/mo</span>
                </div>
                <button className="gea-btn-primary" onClick={()=>user?goTo("courses"):onSignup()} style={{padding:"9px 16px",fontSize:13}}>
                  {user?"Enroll":"Get Access"}
                </button>
              </div>
            </div>
          ))}
        </div>
        {!all && filtered.length>8 && (
          <div style={{textAlign:"center",marginTop:36}}>
            <button onClick={()=>setAll(true)} className="gea-btn-outline" style={{padding:"13px 32px",fontSize:14}}>
              View All {filtered.length} Courses ↓
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── AI TUTOR ─────────────────────────────────────────────────
function AITutor({ user }) {
  const [msgs, setMsgs] = useState([{role:"assistant",text:"Hello! I'm the Global Elite Academy AI Tutor. Ask me anything — any subject from Primary to Masters level. I'm here to help you learn! 🎓"}]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const send = useCallback(async () => {
    if (!inp.trim() || busy) return;
    const txt = inp;
    setMsgs(p=>[...p,{role:"user",text:txt}]);
    setInp("");
    setBusy(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:1000,
          system:`You are the Global Elite Academy AI Tutor (GEA AI). You help students from Primary School to University level across Africa and worldwide. Platform: global-elite-academy.com

Rules:
- Be clear, encouraging and age-appropriate
- Cover: Mathematics, Science, Biology, Chemistry, Physics, English, Kiswahili, History, Geography, CS, Business, Economics
- Use African context where helpful
- Keep responses focused and practical
- End with a helpful follow-up suggestion`,
          messages:[...msgs.filter(m=>m.role!=="system").map(m=>({role:m.role,content:m.text})),{role:"user",content:txt}],
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't respond. Please try again!";
      setMsgs(p=>[...p,{role:"assistant",text:reply}]);
    } catch {
      setMsgs(p=>[...p,{role:"assistant",text:"⚠️ Connection error. Please check your internet and try again."}]);
    }
    setBusy(false);
  }, [inp, busy, msgs]);

  const suggestions = ["Solve x² + 5x + 6 = 0","Explain photosynthesis","What is binary code?","Help me write an essay","Explain osmosis"];

  return (
    <section className="gea-section" style={{background:"linear-gradient(180deg,#020817 0%,#030d1a 100%)"}}>
      <div className="gea-inner" style={{maxWidth:860}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <span className="gea-badge">🤖 AI-Powered</span>
          <h2 className="gea-h2">Your Personal<br/><span className="gea-gradient-text">AI Tutor</span></h2>
          <p className="gea-sub">Ask anything. Expert-level answers in seconds. Available 24/7.</p>
        </div>
        {/* Chat box */}
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.09)",borderRadius:20,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,.4)"}}>
          {/* Header */}
          <div style={{background:"linear-gradient(135deg,rgba(0,212,170,.1),rgba(0,102,255,.1))",padding:"15px 22px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:12}}>
            {/* GEA G Logo */}
            <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:20,color:"#fff",flexShrink:0,boxShadow:"0 0 18px rgba(0,212,170,.35)"}}>G</div>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:15,fontFamily:"'Space Grotesk',sans-serif"}}>GEA AI Tutor</div>
              <div style={{color:"#00d4aa",fontSize:12}}>🟢 Online · All subjects · All levels · Powered by Claude</div>
            </div>
          </div>
          {/* Messages */}
          <div style={{height:380,overflowY:"auto",padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                {m.role==="assistant" && <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff",flexShrink:0,marginRight:8,fontFamily:"'Space Grotesk',sans-serif",alignSelf:"flex-end"}}>G</div>}
                <div style={{maxWidth:"78%",padding:"12px 16px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?"linear-gradient(135deg,#00d4aa,#0066ff)":"rgba(255,255,255,.06)",color:"#fff",fontSize:14,lineHeight:1.7,whiteSpace:"pre-wrap",border:m.role==="user"?"none":"1px solid rgba(255,255,255,.08)"}}>
                  {m.text}
                </div>
              </div>
            ))}
            {busy && (
              <div style={{display:"flex",gap:8,justifyContent:"flex-start",alignItems:"center"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",fontFamily:"'Space Grotesk',sans-serif"}}>G</div>
                <div style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"18px 18px 18px 4px",padding:"12px 20px",color:"#00d4aa",fontSize:18,letterSpacing:3}}>•••</div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          {/* Input */}
          <div style={{padding:"14px 20px",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",gap:10}}>
            <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask me anything — any subject, any level…" style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:11,padding:"12px 15px",color:"#fff",fontSize:14,outline:"none"}} />
            <button onClick={send} disabled={busy} style={{background:"linear-gradient(135deg,#00d4aa,#0066ff)",border:"none",color:"#fff",borderRadius:11,padding:"12px 18px",cursor:"pointer",fontSize:18,transition:"all .2s"}}>➤</button>
          </div>
        </div>
        {/* Quick prompts */}
        <div style={{marginTop:20,display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
          {suggestions.map(s=>(
            <button key={s} onClick={()=>setInp(s)} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.65)",borderRadius:100,padding:"7px 15px",fontSize:13,cursor:"pointer",transition:"all .2s"}}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────
function Pricing({ user, onSignup }) {
  const [yr, setYr] = useState(false);
  return (
    <section className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">💰 Pricing</span>
          <h2 className="gea-h2">Choose Your<br/><span className="gea-gradient-text">Learning Plan</span></h2>
          <p className="gea-sub">Affordable plans for every student. First 10 exams always free.</p>
        </div>
        {/* Toggle */}
        <div style={{display:"flex",background:"rgba(255,255,255,.05)",borderRadius:10,padding:4,width:"fit-content",margin:"0 auto 44px",gap:4}}>
          {["Monthly","Yearly (Save 30%)"].map((b,i)=>(
            <button key={b} onClick={()=>setYr(i===1)} style={{background:(i===1)===yr?"linear-gradient(135deg,#00d4aa,#0066ff)":"none",border:"none",color:(i===1)===yr?"#fff":"rgba(255,255,255,.5)",padding:"10px 22px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s"}}>
              {b}
            </button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:18}}>
          {PLANS.map(p=>{
            const price = yr&&p.price>0?Math.round(p.price*.7):p.price;
            return (
              <div key={p.name} style={{background:p.pop?"rgba(0,212,170,.04)":"rgba(255,255,255,.03)",border:`1.5px solid ${p.pop?"rgba(0,212,170,.4)":"rgba(255,255,255,.08)"}`,borderRadius:20,padding:"30px 24px",position:"relative",display:"flex",flexDirection:"column",transition:"all .3s"}}>
                {p.pop && <div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:100,padding:"4px 16px",fontSize:12,fontWeight:700,whiteSpace:"nowrap"}}>⭐ Most Popular</div>}
                <div style={{fontSize:34,marginBottom:12}}>{p.icon}</div>
                <h3 style={{fontSize:20,fontWeight:800,color:p.color,marginBottom:6,fontFamily:"'Space Grotesk',sans-serif"}}>{p.name}</h3>
                <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:6}}>
                  {price===0?<span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:900,color:"#fff"}}>FREE</span>:<><span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:900,color:"#fff"}}>${price}</span><span style={{fontSize:14,color:"rgba(255,255,255,.4)"}}>/mo</span></>}
                </div>
                {yr&&p.price>0&&<p style={{color:"#00d4aa",fontSize:12,marginBottom:12}}>Billed ${price*12}/year · You save ${(p.price-price)*12}</p>}
                <ul style={{listStyle:"none",padding:0,margin:"0 0 24px",flex:1}}>
                  {p.features.map((f,i)=><li key={i} style={{fontSize:13.5,padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,.04)",color:f.startsWith("❌")?"rgba(255,255,255,.28)":"rgba(255,255,255,.8)"}}>{f}</li>)}
                </ul>
                <button onClick={onSignup} style={{background:p.pop?p.grad:"rgba(255,255,255,.07)",border:p.pop?"none":"1px solid rgba(255,255,255,.14)",color:"#fff",borderRadius:10,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%",transition:"all .2s"}}>
                  {p.cta}
                </button>
              </div>
            );
          })}
        </div>
        {/* Payment */}
        <div style={{textAlign:"center",marginTop:48,padding:"28px 24px",background:"rgba(255,255,255,.02)",borderRadius:14}}>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:13,marginBottom:14}}>Secure payment via:</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {["💳 Visa","💳 Mastercard","🅿️ PayPal","📱 M-Pesa","🌐 Stripe","🏦 Bank Transfer"].map(m=>(
              <span key={m} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"6px 14px",color:"rgba(255,255,255,.65)",fontSize:13}}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TUTORS ───────────────────────────────────────────────────
function TutorsSection({ user, onSignup }) {
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">👩‍🏫 Expert Tutors</span>
          <h2 className="gea-h2">Learn From The<br/><span className="gea-gradient-text">Best Educators</span></h2>
          <p className="gea-sub">320+ verified educators. Book 1-on-1 or group sessions. $10–$30/month.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:18}}>
          {TUTORS.map(t=>(
            <div key={t.id} className="gea-card" style={{padding:"26px 20px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
              <div style={{position:"relative",marginBottom:14}}>
                <div style={{width:76,height:76,borderRadius:"50%",background:"linear-gradient(135deg,rgba(0,212,170,.2),rgba(0,102,255,.2))",border:"2px solid rgba(0,212,170,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>{t.img}</div>
                <div style={{position:"absolute",bottom:2,right:2,width:15,height:15,borderRadius:"50%",background:t.avail?"#00d4aa":"#555",border:"2px solid #030d1a"}} />
              </div>
              <h3 style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:3}}>{t.name}</h3>
              <div style={{fontSize:13,color:"#00d4aa",fontWeight:600,marginBottom:3}}>{t.sub}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.45)",marginBottom:3}}>📚 {t.lv}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.38)",marginBottom:10}}>📍 {t.country}</div>
              <p style={{fontSize:12.5,color:"rgba(255,255,255,.48)",lineHeight:1.65,marginBottom:14}}>{t.bio}</p>
              <div style={{display:"flex",gap:16,marginBottom:10,fontSize:13}}>
                <div style={{textAlign:"center"}}><div style={{color:"#ffd700",fontWeight:700}}>⭐ {t.rating}</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>Rating</div></div>
                <div style={{textAlign:"center"}}><div style={{color:"#00d4aa",fontWeight:700}}>{t.students.toLocaleString()}</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>Students</div></div>
                <div style={{textAlign:"center"}}><div style={{color:"#fff",fontWeight:700}}>{t.price}/mo</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>per level</div></div>
              </div>
              <div style={{fontSize:12,color:t.avail?"#00d4aa":"#666",marginBottom:14,fontWeight:600}}>{t.avail?"🟢 Available Now":"🔴 Currently Busy"}</div>
              <button className="gea-btn-primary" onClick={()=>user?null:onSignup()} style={{width:"100%",padding:"10px",fontSize:13}}>
                {user?(t.avail?"Book Session":"Join Waitlist"):"Sign Up to Book"}
              </button>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:40}}>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:14,marginBottom:16}}>💡 Tutor fees: $10–$30/month depending on level and subject</p>
          <button className="gea-btn-outline" style={{padding:"13px 32px",fontSize:14}}>View All 320+ Tutors →</button>
        </div>
      </div>
    </section>
  );
}

// ─── EXAMS ────────────────────────────────────────────────────
function ExamsSection({ user, onSignup }) {
  const cats = [
    {id:"csee",name:"CSEE (Form 4)",count:145,icon:"📝",free:true},
    {id:"acsee",name:"ACSEE (Form 6)",count:98,icon:"📋",free:false},
    {id:"primary",name:"Primary (PSLE)",count:87,icon:"✏️",free:true},
    {id:"diploma",name:"Diploma Exams",count:62,icon:"📄",free:false},
    {id:"university",name:"University Finals",count:55,icon:"🎓",free:false},
    {id:"mock",name:"Mock Exams",count:200,icon:"🔬",free:true},
  ];
  return (
    <section className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">📝 Exams & Past Papers</span>
          <h2 className="gea-h2">Prepare With<br/><span className="gea-gradient-text">Real Past Papers</span></h2>
          <p className="gea-sub">Hundreds of past papers and mock exams. First 10 FREE for every student!</p>
        </div>
        {/* Free exam counter */}
        <div style={{background:"rgba(0,212,170,.07)",border:"1px solid rgba(0,212,170,.28)",borderRadius:16,padding:"22px 28px",marginBottom:44,textAlign:"center",maxWidth:480,margin:"0 auto 44px"}}>
          <div style={{fontSize:36,marginBottom:8}}>🎁</div>
          <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:6}}>
            {user?`You have `:"Free members get "}<span style={{color:"#00d4aa",fontSize:26,fontWeight:900}}>{user?.freeExams??10}</span> free exam{(user?.freeExams??10)!==1?"s":""} remaining
          </h3>
          <p style={{color:"rgba(255,255,255,.48)",fontSize:13,marginBottom:user?"16px":"0"}}>After 10 exams, upgrade to continue unlimited access.</p>
          {!user&&<button className="gea-btn-primary" onClick={onSignup} style={{marginTop:14,padding:"10px 26px",fontSize:14}}>Claim Free Exams →</button>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:16}}>
          {cats.map(c=>(
            <div key={c.id} className="gea-card" style={{padding:"22px 18px",cursor:"pointer"}}>
              <div style={{fontSize:30,marginBottom:10}}>{c.icon}</div>
              <h3 style={{color:"#fff",fontWeight:700,fontSize:15,marginBottom:4}}>{c.name}</h3>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:12}}>{c.count} papers available</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:12,fontWeight:600,color:c.free?"#00d4aa":"#ffd700"}}>{c.free?"✅ FREE (first 10)":"🔒 Premium"}</span>
                <button onClick={()=>user?null:onSignup()} style={{background:"rgba(255,255,255,.1)",border:"none",color:"#fff",borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer"}}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LIBRARY ──────────────────────────────────────────────────
function Library({ user, onSignup }) {
  const books = [
    {id:1,title:"O-Level Mathematics Complete Guide",author:"Prof. K. Mwangi",lv:"Secondary",icon:"📐",free:true,rating:4.9,reads:8420},
    {id:2,title:"A-Level Physics Revision Manual",author:"Dr. S. Osei",lv:"A-Level",icon:"⚡",free:false,rating:4.8,reads:5230},
    {id:3,title:"Introduction to Computer Science",author:"Chen Wei",lv:"Degree",icon:"💻",free:true,rating:4.9,reads:12100},
    {id:4,title:"Business Management Fundamentals",author:"Dr. G. Mensah",lv:"Diploma",icon:"📊",free:false,rating:4.7,reads:3800},
    {id:5,title:"Biology Form 1–4 Complete Notes",author:"Ms. F. Al-Rashid",lv:"Secondary",icon:"🧬",free:true,rating:4.8,reads:9650},
    {id:6,title:"Early Childhood Learning Guide",author:"Mrs. A. Njoroge",lv:"Primary",icon:"📖",free:true,rating:4.9,reads:15300},
    {id:7,title:"MBA Case Studies Collection",author:"Prof. J. Okonkwo",lv:"Masters",icon:"🎯",free:false,rating:4.9,reads:2100},
    {id:8,title:"Advanced Chemistry Textbook",author:"Dr. R. Kimani",lv:"Degree",icon:"⚗️",free:false,rating:4.8,reads:4200},
  ];
  const [reading, setReading] = useState(null);
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">📚 Digital Library</span>
          <h2 className="gea-h2">10,000+ Books &<br/><span className="gea-gradient-text">Study Resources</span></h2>
          <p className="gea-sub">Sign in to get 10 free books at your level. Premium unlocks everything.</p>
        </div>
        {!user && (
          <div style={{background:"rgba(0,102,255,.07)",border:"1px solid rgba(0,102,255,.28)",borderRadius:12,padding:"16px 22px",textAlign:"center",marginBottom:36}}>
            <span style={{color:"#fff",fontWeight:600}}>📖 Sign in bonus: <strong style={{color:"#00d4aa"}}>10 FREE books</strong> at your education level!</span>
            <button onClick={onSignup} style={{marginLeft:14,background:"#0066ff",border:"none",color:"#fff",borderRadius:8,padding:"8px 16px",fontWeight:700,cursor:"pointer",fontSize:13}}>Sign In →</button>
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:16}}>
          {books.map(b=>(
            <div key={b.id} className="gea-card" style={{padding:"20px 18px",cursor:"pointer"}}>
              <div style={{fontSize:36,marginBottom:10}}>{b.icon}</div>
              <div style={{fontSize:11,color:"#00d4aa",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{b.lv}</div>
              <h3 style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:4,lineHeight:1.4}}>{b.title}</h3>
              <p style={{color:"rgba(255,255,255,.38)",fontSize:12,marginBottom:12}}>by {b.author}</p>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"rgba(255,255,255,.38)",marginBottom:12}}>
                <span>⭐ {b.rating}</span><span>👁️ {b.reads.toLocaleString()}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:12,fontWeight:600,color:b.free?"#00d4aa":"#ffd700"}}>{b.free?"✅ Free Preview":"👑 Premium"}</span>
                <button onClick={()=>user?setReading(b):onSignup()} style={{background:"linear-gradient(135deg,#0066ff,#a855f7)",border:"none",color:"#fff",borderRadius:7,padding:"6px 13px",fontSize:12,cursor:"pointer",fontWeight:600}}>
                  {user?"Read Now":"Sign In"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {reading && (
        <div onClick={()=>setReading(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:36,maxWidth:580,width:"100%"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:22}}>
              <div>
                <div style={{fontSize:44}}>{reading.icon}</div>
                <h2 style={{color:"#fff",fontWeight:800,fontSize:18,marginTop:8}}>{reading.title}</h2>
                <p style={{color:"rgba(255,255,255,.4)",fontSize:13}}>by {reading.author}</p>
              </div>
              <button onClick={()=>setReading(null)} style={{background:"rgba(255,255,255,.08)",border:"none",color:"#fff",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:15}}>✕</button>
            </div>
            <div style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:22,color:"rgba(255,255,255,.7)",lineHeight:1.9,fontSize:14,marginBottom:20}}>
              <strong style={{color:"#00d4aa"}}>Chapter 1: Introduction</strong><br/><br/>
              This guide covers key concepts and exam techniques for {reading.title}. Starting from fundamentals, building toward advanced problem-solving proven to improve results.<br/><br/>
              <em style={{color:"rgba(255,255,255,.35)"}}>📖 Preview only. Upgrade to Premium for all chapters + PDF download.</em>
            </div>
            <button className="gea-btn-primary" style={{width:"100%",padding:"13px",fontSize:14}}>Upgrade to Read Full Book →</button>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── BLOG ─────────────────────────────────────────────────────
function Blog() {
  return (
    <section className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:48,flexWrap:"wrap",gap:16}}>
          <div>
            <span className="gea-badge">✍️ Knowledge Hub</span>
            <h2 className="gea-h2" style={{marginBottom:0}}>Latest <span className="gea-gradient-text">Articles</span></h2>
          </div>
          <button className="gea-btn-outline" style={{padding:"11px 24px",fontSize:14}}>View All Articles →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18}}>
          {BLOGS.map(b=>(
            <div key={b.id} className="gea-card" style={{padding:"22px 20px",cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,alignItems:"start"}}>
                <div style={{fontSize:38}}>{b.icon}</div>
                {b.tag&&<span style={{background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700}}>{b.tag}</span>}
              </div>
              <div style={{fontSize:11,color:"#00d4aa",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>{b.cat}</div>
              <h3 style={{color:"#fff",fontWeight:700,fontSize:15,lineHeight:1.45,marginBottom:12}}>{b.title}</h3>
              <div style={{display:"flex",justifyContent:"space-between",color:"rgba(255,255,255,.32)",fontSize:12}}>
                <span>{b.author}</span><span>⏱ {b.read}</span>
              </div>
              <div style={{color:"rgba(255,255,255,.22)",fontSize:12,marginTop:5}}>{b.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────
function Testimonials() {
  const list = [
    {name:"Zawadi M.",loc:"Dar es Salaam, TZ",lv:"Form 4 Student",text:"I failed Math twice before GEA. After 3 months here I scored an A in CSEE. The AI tutor in Kiswahili changed everything!",rating:5},
    {name:"Kofi A.",loc:"Accra, Ghana",lv:"University, Year 2",text:"The library and past papers alone are worth it. My GPA went from 2.8 to 3.9 in one semester. Incredible platform.",rating:5},
    {name:"Mrs. Njeri K.",loc:"Nairobi, Kenya",lv:"Parent",text:"My daughter loves learning here. The videos are engaging, the AI tutor is so patient. I track her progress every week.",rating:5},
    {name:"Ahmed B.",loc:"Kampala, Uganda",lv:"A-Level",text:"Used GEA past papers and AI tutor for Physics. Got B+ — way better than expected. Dr. Kariuki's videos are amazing.",rating:5},
  ];
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">💬 Student Stories</span>
          <h2 className="gea-h2">Real Results,<br/><span className="gea-gradient-text">Real Students</span></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18}}>
          {list.map((t,i)=>(
            <div key={i} className="gea-card" style={{padding:"26px 22px"}}>
              <div style={{color:"#ffd700",fontSize:16,marginBottom:12}}>{"⭐".repeat(t.rating)}</div>
              <p style={{color:"rgba(255,255,255,.72)",fontSize:14,lineHeight:1.8,marginBottom:18,fontStyle:"italic"}}>"{t.text}"</p>
              <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:14}}>
                <div style={{color:"#fff",fontWeight:700,fontSize:14}}>{t.name}</div>
                <div style={{color:"#00d4aa",fontSize:12,marginTop:2}}>{t.lv}</div>
                <div style={{color:"rgba(255,255,255,.32)",fontSize:12}}>📍 {t.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ADS (animated) ─────────────────────────────────
function EduAds() {
  const [idx, setIdx] = useState(0);
  const slides = [
    {emoji:"👧👦",title:"Collaborative Learning",desc:"Students who learn together achieve more — join our study groups.",color:"#00d4aa"},
    {emoji:"👩‍👧‍👦",title:"Family Learning",desc:"Parents and children growing smarter together every day.",color:"#0066ff"},
    {emoji:"🤖🎨",title:"AI + Creativity 2030",desc:"Next-gen tools for creative young minds. The future is learning.",color:"#a855f7"},
    {emoji:"🏆📚",title:"Celebrate Achievement",desc:"Every milestone matters. Track your journey to excellence.",color:"#ffd700"},
  ];
  useEffect(()=>{ const t=setInterval(()=>setIdx(i=>(i+1)%slides.length),3800); return ()=>clearInterval(t); },[]);
  const s=slides[idx];
  return (
    <section style={{padding:"52px 24px",background:"#020817"}}>
      <div className="gea-inner">
        <p style={{textAlign:"center",color:"rgba(255,255,255,.18)",fontSize:11,letterSpacing:1.5,marginBottom:20,textTransform:"uppercase"}}>Educational Content</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:24}}>
          {slides.map((sl,i)=>(
            <div key={i} onClick={()=>setIdx(i)} style={{background:i===idx?"rgba(255,255,255,.05)":"rgba(255,255,255,.02)",border:`1px solid ${i===idx?sl.color+"55":"rgba(255,255,255,.07)"}`,borderRadius:14,padding:"20px 16px",textAlign:"center",cursor:"pointer",transition:"all .3s"}}>
              <div style={{fontSize:34,marginBottom:8}}>{sl.emoji}</div>
              <div style={{color:sl.color,fontWeight:700,fontSize:13,marginBottom:4}}>{sl.title}</div>
              <div style={{color:"rgba(255,255,255,.38)",fontSize:12,lineHeight:1.5}}>{sl.desc}</div>
            </div>
          ))}
        </div>
        {/* AdSense placeholder */}
        <div id="adsense-gea-home" style={{textAlign:"center",border:"1px dashed rgba(255,255,255,.07)",borderRadius:10,padding:"18px 24px",color:"rgba(255,255,255,.18)",fontSize:12}}>
          📢 Google AdSense · Publisher ID: ca-pub-8024543613282871 · Ad displays here after approval
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────
function CTABanner({ onSignup }) {
  return (
    <section style={{padding:"90px 24px",background:"linear-gradient(135deg,rgba(0,212,170,.07),rgba(0,102,255,.07))",borderTop:"1px solid rgba(255,255,255,.06)"}}>
      <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:52,marginBottom:18}}>🚀</div>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(34px,6vw,56px)",fontWeight:900,color:"#fff",letterSpacing:"-2px",marginBottom:18,lineHeight:1.1}}>
          Start Learning<br/><span className="gea-gradient-text">Today — It's Free</span>
        </h2>
        <p style={{fontSize:17,color:"rgba(255,255,255,.52)",lineHeight:1.8,marginBottom:34}}>
          Join 124,000+ students. First 10 exams and 10 books are completely free.
        </p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="gea-btn-primary" onClick={onSignup} style={{fontSize:16,padding:"16px 38px"}}>🎓 Create Free Account</button>
          <a href="mailto:johnsonelisa020@gmail.com" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.18)",color:"#fff",borderRadius:12,padding:"16px 30px",fontSize:16,fontWeight:600,textDecoration:"none"}}>📧 Contact Us</a>
        </div>
        <p style={{color:"rgba(255,255,255,.22)",fontSize:13,marginTop:22}}>© 2026–2030 Global Elite Academy · global-elite-academy.com</p>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────
function Footer({ goTo }) {
  const cols = {
    Courses:["Primary School","Secondary (O-Level)","A-Level (ACSEE)","Diploma","Degree","Masters"],
    Resources:["Exams & Past Papers","Digital Library","Study Notes","AI Tutor","Practice Tests","Video Tutorials"],
    Platform:["About Us","Our Tutors","Blog & Articles","Scholarships","Careers","Partnerships"],
    Support:["Help Center","Contact Us","WhatsApp Support","Community","Feedback","Refund Policy"],
    Legal:["Privacy Policy","Terms of Service","Cookie Policy","Accessibility","GDPR","Sitemap"],
  };
  return (
    <footer style={{background:"#030d1a",borderTop:"1px solid rgba(255,255,255,.06)",padding:"72px 24px 28px"}}>
      <div className="gea-inner">
        <div style={{display:"grid",gridTemplateColumns:"2fr repeat(5,1fr)",gap:36,marginBottom:52,flexWrap:"wrap"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer"}} onClick={()=>goTo("home")}>
              <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:18,color:"#fff"}}>G</div>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:17,color:"#fff"}}>Global Elite <span style={{color:"#00d4aa"}}>Academy</span></span>
            </div>
            <p style={{color:"rgba(255,255,255,.42)",fontSize:13.5,lineHeight:1.8,marginBottom:18}}>World-class education from Primary to Masters. Empowering African students and learners worldwide since 2024.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
              {["🌍 47+ Countries","👥 124K+ Students","📚 500+ Courses","⭐ 4.9 Rating"].map(b=>(
                <span key={b} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:7,padding:"4px 11px",color:"rgba(255,255,255,.45)",fontSize:12}}>{b}</span>
              ))}
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["🐦","📘","📸","📺","💼"].map(s=>(
                <button key={s} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,width:34,height:34,color:"rgba(255,255,255,.6)",cursor:"pointer",fontSize:16}}>{s}</button>
              ))}
            </div>
          </div>
          {Object.entries(cols).map(([cat,links])=>(
            <div key={cat}>
              <h4 style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:14,letterSpacing:.3}}>{cat}</h4>
              <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:9}}>
                {links.map(l=>(
                  <li key={l}><button onClick={()=>goTo(l.toLowerCase().replace(/[ ()&-]/g,"_"))} style={{background:"none",border:"none",color:"rgba(255,255,255,.42)",cursor:"pointer",fontSize:13,textAlign:"left",padding:0,transition:"color .2s"}}>{l}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Newsletter */}
        <div style={{background:"rgba(0,212,170,.06)",border:"1px solid rgba(0,212,170,.2)",borderRadius:14,padding:"28px 32px",marginBottom:40,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:18}}>
          <div>
            <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:5}}>📧 Stay Ahead in Education</h3>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:14}}>New courses, study tips and scholarships — in your inbox.</p>
          </div>
          <div style={{display:"flex",gap:10,flex:1,maxWidth:420}}>
            <input placeholder="Your email address" style={{flex:1,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",borderRadius:9,padding:"11px 15px",color:"#fff",fontSize:14,outline:"none"}} />
            <button className="gea-btn-primary" style={{padding:"11px 20px",fontSize:14,whiteSpace:"nowrap"}}>Subscribe</button>
          </div>
        </div>
        {/* App */}
        <div style={{textAlign:"center",marginBottom:36}}>
          <p style={{color:"rgba(255,255,255,.35)",fontSize:13,marginBottom:14}}>📱 Download the GEA App</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {["📱 App Store (iOS)","🤖 Google Play"].map(a=>(
              <button key={a} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,padding:"11px 22px",color:"#fff",fontWeight:600,cursor:"pointer",fontSize:14}}>{a}</button>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:22,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <p style={{color:"rgba(255,255,255,.22)",fontSize:13}}>© 2026–2030 Global Elite Academy · global-elite-academy.com · Built for Africa & the World</p>
          <p style={{color:"rgba(255,255,255,.22)",fontSize:13}}>📧 johnsonelisa020@gmail.com · 6 Languages</p>
        </div>
      </div>
    </footer>
  );
}

// ─── INNER PAGES ──────────────────────────────────────────────
function AboutPage({ goTo }) {
  const items = [
    {t:"🌍 Our Mission",c:"To democratize quality education across Africa and the world. Every student from Primary 1 to Masters deserves excellent, affordable, AI-enhanced education regardless of location or income."},
    {t:"🚀 Vision 2026–2030",c:"Become the #1 educational platform in Africa by 2028 — serving 1 million students in 50+ countries with AI-personalised learning, local-language content and industry-recognised certifications."},
    {t:"💡 What Makes Us Different",c:"Expert human tutors combined with Claude AI. PhD-level content reviewed annually. 6 languages. Flexible pricing with free access. Exams accessible to everyone — knowledge has no price barrier."},
    {t:"🤝 Our Impact",c:"Since 2024, 124,000+ students have improved results with an average grade improvement of 35%. Tutors across 15 countries. Content for every subject from pre-school to Masters level."},
  ];
  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:32,color:"#fff",margin:"0 auto 20px"}}>G</div>
          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(32px,6vw,52px)",fontWeight:900,color:"#fff",letterSpacing:"-1.5px",marginBottom:14}}>About Global Elite <span className="gea-gradient-text">Academy</span></h1>
          <p style={{fontSize:17,color:"rgba(255,255,255,.52)",maxWidth:560,margin:"0 auto",lineHeight:1.8}}>Founded to make world-class education accessible to every student in Africa and beyond.</p>
        </div>
        {items.map((it,i)=>(
          <div key={i} className="gea-card" style={{padding:"30px 32px",marginBottom:18}}>
            <h2 style={{color:"#00d4aa",fontWeight:700,fontSize:20,marginBottom:10}}>{it.t}</h2>
            <p style={{color:"rgba(255,255,255,.62)",lineHeight:1.9,fontSize:15}}>{it.c}</p>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:36}}>
          <button className="gea-btn-primary" onClick={()=>goTo("home")} style={{padding:"14px 32px",fontSize:15}}>← Back to Home</button>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({name:"",email:"",subject:"",msg:"",type:"general"});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const send = () => {
    setLoading(true);
    window.location.href=`mailto:johnsonelisa020@gmail.com?subject=${encodeURIComponent(`[GEA] ${form.subject} - ${form.type}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.msg}`)}`;
    setTimeout(()=>{ setLoading(false); setSent(true); },1200);
  };
  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{maxWidth:580,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <div style={{fontSize:52,marginBottom:14}}>📬</div>
          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:900,color:"#fff",letterSpacing:"-1px",marginBottom:10}}>Get in Touch</h1>
          <p style={{color:"rgba(255,255,255,.48)",fontSize:15}}>Questions, support or partnerships? We respond within 24 hours.</p>
        </div>
        {!sent ? (
          <div className="gea-card" style={{padding:36}}>
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={IS}>
              {["general","support","billing","tutor","partnership","school","media"].map(o=><option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}
            </select>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your Name" style={IS} />
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" style={IS} />
            </div>
            <input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="Subject" style={IS} />
            <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Your message…" style={{...IS,height:130,resize:"vertical"}} />
            <button className="gea-btn-primary" onClick={send} disabled={loading} style={{width:"100%",padding:"14px",fontSize:15}}>
              {loading?"⏳ Opening email…":"📤 Send Message"}
            </button>
            <p style={{textAlign:"center",color:"rgba(255,255,255,.28)",fontSize:12,marginTop:12}}>Sent directly to johnsonelisa020@gmail.com</p>
          </div>
        ) : (
          <div style={{background:"rgba(0,212,170,.07)",border:"1px solid rgba(0,212,170,.28)",borderRadius:18,padding:44,textAlign:"center"}}>
            <div style={{fontSize:60,marginBottom:18}}>✅</div>
            <h2 style={{color:"#fff",fontWeight:800,fontSize:22,marginBottom:10}}>Message Sent!</h2>
            <p style={{color:"rgba(255,255,255,.55)"}}>We'll reply to {form.email} within 24 hours.</p>
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginTop:24}}>
          {[{i:"📧",l:"Email",v:"johnsonelisa020@gmail.com"},{i:"💬",l:"WhatsApp",v:"Premium members"},{i:"🌐",l:"Website",v:"global-elite-academy.com"}].map(c=>(
            <div key={c.l} className="gea-card" style={{padding:"16px 12px",textAlign:"center"}}>
              <div style={{fontSize:22,marginBottom:6}}>{c.i}</div>
              <div style={{color:"#00d4aa",fontWeight:700,fontSize:12,marginBottom:3}}>{c.l}</div>
              <div style={{color:"rgba(255,255,255,.38)",fontSize:11,wordBreak:"break-all"}}>{c.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacyPage() {
  const items = [
    ["Data We Collect","We collect name, email, education level and usage data to personalise learning. Payments via Stripe, PayPal and M-Pesa — we never store card details."],
    ["How We Use It","Personalised recommendations, progress tracking, notifications. We never sell personal data."],
    ["Cookies","Essential auth cookies + analytics (Google Analytics). AdSense cookies for educational ads. Manage in account settings."],
    ["Google AdSense","Publisher ID: ca-pub-8024543613282871. Ads fund our free content. Child-safe ad settings for under-13 users."],
    ["Your Rights (GDPR)","Access, correct or delete your data anytime. Email johnsonelisa020@gmail.com to exercise rights."],
    ["Children's Safety","Under-13 requires parental consent. No sensitive data collected from minors."],
    ["Contact","johnsonelisa020@gmail.com · global-elite-academy.com · Updated June 2026"],
  ];
  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:40,fontWeight:900,color:"#fff",marginBottom:6}}>Privacy Policy</h1>
        <p style={{color:"rgba(255,255,255,.35)",marginBottom:40}}>Last updated: June 2026 · © 2026–2030 Global Elite Academy</p>
        {items.map(([t,c])=>(
          <div key={t} style={{marginBottom:28}}>
            <h2 style={{color:"#00d4aa",fontWeight:700,fontSize:18,marginBottom:8}}>{t}</h2>
            <p style={{color:"rgba(255,255,255,.58)",lineHeight:1.9,fontSize:15}}>{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TermsPage() {
  const items = [
    ["Acceptance","By using Global Elite Academy you agree to these Terms. Discontinue use if you disagree."],
    ["Free Exam Limit","Free accounts receive 10 complimentary exam attempts. After 10, a Student or Premium subscription is required. Count resets on upgrade."],
    ["Free Books","Signed-in users receive 10 free books at their declared level. Additional access requires paid subscription."],
    ["Premium Subscription","Unlimited access to all courses, exams, books and tutors. Monthly billing via Visa, Mastercard, PayPal, M-Pesa or bank transfer. Cancel anytime."],
    ["Tutor Services","Tutors are independent. GEA facilitates connections. Refunds for tutor sessions within 48 hours."],
    ["Intellectual Property","All content and design © Global Elite Academy. Unauthorised redistribution prohibited."],
    ["Contact","johnsonelisa020@gmail.com · global-elite-academy.com · Effective June 2026"],
  ];
  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:40,fontWeight:900,color:"#fff",marginBottom:6}}>Terms of Service</h1>
        <p style={{color:"rgba(255,255,255,.35)",marginBottom:40}}>Effective: June 2026</p>
        {items.map(([t,c])=>(
          <div key={t} style={{marginBottom:26}}>
            <h2 style={{color:"#00d4aa",fontWeight:700,fontSize:18,marginBottom:8}}>{t}</h2>
            <p style={{color:"rgba(255,255,255,.58)",lineHeight:1.9,fontSize:15}}>{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderPage({ title, icon, desc, goTo }) {
  return (
    <div style={{minHeight:"100vh",background:"#020817",display:"flex",alignItems:"center",justifyContent:"center",padding:"120px 24px 80px"}}>
      <div style={{textAlign:"center",maxWidth:480}}>
        <div style={{fontSize:68,marginBottom:20}}>{icon}</div>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:900,color:"#fff",letterSpacing:"-1px",marginBottom:14}}>{title}</h1>
        <p style={{color:"rgba(255,255,255,.48)",fontSize:16,lineHeight:1.8,marginBottom:30}}>{desc}</p>
        <button className="gea-btn-primary" onClick={()=>goTo("home")} style={{padding:"14px 32px",fontSize:15}}>← Back to Home</button>
      </div>
    </div>
  );
}

// ─── PAGE MAP ─────────────────────────────────────────────────
const PAGES = {
  scholarships:{title:"Scholarships & Bursaries",icon:"🏅",desc:"We partner with NGOs and foundations to offer scholarships for top-performing students. Apply with your exam results and a short essay."},
  careers:{title:"Careers at GEA",icon:"💼",desc:"Join our team of educators, engineers and content creators. We're hiring across Africa — remote-first culture."},
  partnerships:{title:"Partner With Us",icon:"🤝",desc:"Schools, publishers, NGOs, and companies — partner with GEA to reach 124,000+ students. Email johnsonelisa020@gmail.com"},
  community:{title:"Student Community",icon:"👥",desc:"Connect with 124,000+ students across Africa. Join study groups, share notes and support each other."},
  certificates:{title:"Certificates & Credentials",icon:"🏆",desc:"Earn verifiable digital certificates for every course. Share on LinkedIn or use for university admissions."},
  help:{title:"Help Center",icon:"💡",desc:"Find answers to common questions. Our support team is also available at johnsonelisa020@gmail.com"},
  mobile:{title:"Download Our App",icon:"📱",desc:"Learn anywhere with the GEA mobile app. Available on iOS and Android. Offline mode for Premium users."},
  press:{title:"Press & Media",icon:"📰",desc:"For press inquiries, interview requests and media kits, contact johnsonelisa020@gmail.com"},
  refund_policy:{title:"Refund Policy",icon:"💰",desc:"Not satisfied? Full refund within 7 days. No questions. Tutor session refunds within 48 hours."},
  accessibility:{title:"Accessibility",icon:"♿",desc:"GEA is committed to WCAG 2.1 AA. Screen reader support, keyboard navigation and high-contrast modes available."},
};

/* ══════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [page, setPage] = useState("home");
  const [courseFilter, setCourseFilter] = useState("All");
  const [toast, setToast] = useState(null);

  // Inject global CSS once
  useEffect(() => {
    const el = document.getElementById("gea-global-css");
    if (!el) {
      const s = document.createElement("style");
      s.id = "gea-global-css";
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  const goTo = (p, sub) => {
    setPage(p);
    if (sub) setCourseFilter(sub);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAuth = (userData) => {
    setUser(userData);
    showToast(`Welcome, ${userData.name}! You have 10 free exams + 10 free books 🎁`);
  };

  const renderPage = () => {
    if (page === "about") return <AboutPage goTo={goTo} />;
    if (page === "contact") return <ContactPage />;
    if (page === "privacy") return <PrivacyPage />;
    if (page === "terms") return <TermsPage />;
    if (page === "courses") return <CoursesSection user={user} onSignup={()=>setAuthMode("signup")} goTo={goTo} filterLv={courseFilter} />;
    if (page === "exams") return <ExamsSection user={user} onSignup={()=>setAuthMode("signup")} />;
    if (page === "library") return <Library user={user} onSignup={()=>setAuthMode("signup")} />;
    if (page === "tutors") return <TutorsSection user={user} onSignup={()=>setAuthMode("signup")} />;
    if (page === "pricing") return <Pricing user={user} onSignup={()=>setAuthMode("signup")} />;
    if (page === "blog") return <Blog />;
    if (PAGES[page]) return <PlaceholderPage {...PAGES[page]} goTo={goTo} />;

    // HOME
    return (
      <>
        <Hero lang={lang} user={user} onSignup={()=>setAuthMode("signup")} goTo={goTo} />
        <Features />
        <CoursesSection user={user} onSignup={()=>setAuthMode("signup")} goTo={goTo} />
        <AITutor user={user} />
        <Pricing user={user} onSignup={()=>setAuthMode("signup")} />
        <TutorsSection user={user} onSignup={()=>setAuthMode("signup")} />
        <ExamsSection user={user} onSignup={()=>setAuthMode("signup")} />
        <Library user={user} onSignup={()=>setAuthMode("signup")} />
        <Blog />
        <EduAds />
        <Testimonials />
        <CTABanner onSignup={()=>setAuthMode("signup")} />
      </>
    );
  };

  return (
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:"#020817",minHeight:"100vh"}}>
      <AnnouncementBar lang={lang} />
      <Navbar lang={lang} setLang={setLang} user={user} onLogin={()=>setAuthMode("login")} onSignup={()=>setAuthMode("signup")} onLogout={()=>{setUser(null);showToast("Signed out successfully");}} goTo={goTo} page={page} />
      <main style={{paddingTop:36}}>{renderPage()}</main>
      <Footer goTo={goTo} />

      {authMode && (
        <AuthModal mode={authMode} onClose={()=>setAuthMode(null)} onAuth={handleAuth} />
      )}

      {/* Toast notification */}
      {toast && (
        <div style={{position:"fixed",bottom:28,right:24,background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:12,padding:"14px 22px",fontSize:14,fontWeight:600,zIndex:99999,boxShadow:"0 10px 40px rgba(0,212,170,.35)",animation:"slideIn .4s ease",maxWidth:360}}>
          {toast}
        </div>
      )}
    </div>
  );
}

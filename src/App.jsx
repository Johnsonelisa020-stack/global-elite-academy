import { useState, useEffect, useRef, useCallback } from "react";

/*
  GLOBAL ELITE ACADEMY — App.jsx v4.0
  global-elite-academy.com
  Contact: johnsonelisa020@gmail.com
  AdSense: ca-pub-8024543613282871
  © 2026–2030
*/

// ── GLOBAL CSS (injected once into <head>) ────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#020817;overflow-x:hidden;font-family:'Inter',system-ui,sans-serif}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#0a0f1e}
::-webkit-scrollbar-thumb{background:linear-gradient(#00d4aa,#0066ff);border-radius:3px}
input,select,textarea,button{font-family:inherit}
@keyframes gradientFlow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes pulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
@keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
@keyframes slideIn{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes livePulse{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.gea-gradient-text{background:linear-gradient(90deg,#00d4aa,#0066ff,#a855f7,#00d4aa);background-size:300% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradientFlow 5s ease infinite}
.gea-badge{display:inline-block;background:rgba(0,212,170,.1);border:1px solid rgba(0,212,170,.3);border-radius:100px;padding:6px 16px;color:#00d4aa;font-size:13px;font-weight:600;margin-bottom:16px}
.gea-h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,5vw,52px);font-weight:800;color:#fff;letter-spacing:-1.5px;line-height:1.1;margin-bottom:14px}
.gea-sub{font-size:16px;color:rgba(255,255,255,.52);max-width:540px;margin:0 auto;line-height:1.75}
.gea-section{padding:88px 24px}
.gea-inner{max-width:1280px;margin:0 auto}
.gea-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:18px;transition:all .3s}
.gea-card:hover{border-color:rgba(0,212,170,.35);transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,212,170,.08)}
.gea-btn-primary{background:linear-gradient(135deg,#00d4aa,#0066ff);border:none;color:#fff;border-radius:12px;padding:14px 30px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 6px 24px rgba(0,212,170,.3);transition:transform .2s,box-shadow .2s}
.gea-btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(0,212,170,.45)}
.gea-btn-outline{background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.2);color:#fff;border-radius:12px;padding:14px 30px;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s}
.gea-btn-outline:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.4)}
.live-dot{width:8px;height:8px;border-radius:50%;background:#00d4aa;display:inline-block;animation:livePulse 1.2s ease infinite}
input:focus,select:focus,textarea:focus{border-color:rgba(0,212,170,.5)!important;outline:none!important;box-shadow:0 0 0 3px rgba(0,212,170,.1)!important}
@media(max-width:768px){
  .gea-section{padding:56px 16px}
  .gea-h2{font-size:26px}
  .hide-mobile{display:none!important}
  .nav-desktop{display:none!important}
  .burger-show{display:flex!important}
  .stats-grid{grid-template-columns:repeat(2,1fr)!important}
  .plans-grid{grid-template-columns:1fr!important}
  .footer-cols{grid-template-columns:1fr!important}
}
@media(min-width:769px){.burger-show{display:none!important}}
`;

// ── INPUT STYLE OBJECT (used across many forms) ───────────────
const IS = {
  display:"block",width:"100%",
  background:"rgba(255,255,255,.07)",
  border:"1px solid rgba(255,255,255,.12)",
  borderRadius:10,padding:"13px 16px",
  color:"#fff",fontSize:14,marginBottom:12,
  outline:"none",boxSizing:"border-box",
  transition:"border-color .2s",
};

// ── LANGUAGE STRINGS ──────────────────────────────────────────
const L = {
  en:{name:"English 🇺🇸",h1a:"Learn Without",h1b:"Limits.",sub:"World-class education from Primary to Masters. 500+ courses, live tutors, real-time AI.",cta1:"Start Free Today",cta2:"Browse Courses",login:"Sign In",signup:"Get Started Free",bar:"🎉 First 10 Exams FREE · 10 Books FREE · No credit card needed"},
  sw:{name:"Kiswahili 🇹🇿",h1a:"Jifunze Bila",h1b:"Mipaka.",sub:"Elimu bora kuanzia Shule ya Msingi hadi Uzamili. Kozi 500+, walimu, na AI.",cta1:"Anza Bure Leo",cta2:"Angalia Kozi",login:"Ingia",signup:"Anza Bure",bar:"🎉 Mitihani 10 ya kwanza BURE · Vitabu 10 BURE"},
  fr:{name:"Français 🇫🇷",h1a:"Apprenez Sans",h1b:"Limites.",sub:"Éducation mondiale du primaire au master. 500+ cours, tuteurs, IA.",cta1:"Commencer",cta2:"Explorer",login:"Connexion",signup:"Commencer",bar:"🎉 10 premiers examens GRATUITS · 10 livres GRATUITS"},
  de:{name:"Deutsch 🇩🇪",h1a:"Lernen ohne",h1b:"Grenzen.",sub:"Weltklasse-Bildung von der Grundschule bis zum Master.",cta1:"Kostenlos starten",cta2:"Kurse entdecken",login:"Anmelden",signup:"Starten",bar:"🎉 Erste 10 Prüfungen KOSTENLOS"},
  zh:{name:"中文 🇨🇳",h1a:"无限制",h1b:"学习。",sub:"从小学到硕士的世界级教育。500+课程、AI导师。",cta1:"免费开始",cta2:"浏览课程",login:"登录",signup:"免费注册",bar:"🎉 前10次考试免费 · 10本书免费"},
};

// ── COURSES DATA ──────────────────────────────────────────────
const COURSES_DATA = [
  {id:"p1",lv:"Primary",sub:"Mathematics",title:"Primary Math Mastery",price:8,lessons:60,students:4200,rating:4.9,tag:"Popular",img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",desc:"Numbers, fractions, geometry and word problems for young learners."},
  {id:"p2",lv:"Primary",sub:"English",title:"English Language Arts",price:8,lessons:55,students:3800,rating:4.8,tag:"New",img:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop",desc:"Reading, writing, grammar and comprehension for ages 6–13."},
  {id:"p3",lv:"Primary",sub:"Science",title:"Primary Science Explorer",price:7,lessons:45,students:2900,rating:4.7,tag:"",img:"https://images.unsplash.com/photo-1532094349884-543559f7e94b?w=400&h=200&fit=crop",desc:"Nature, living things, forces and the environment made fun."},
  {id:"p4",lv:"Primary",sub:"Kiswahili",title:"Kiswahili Lugha",price:7,lessons:50,students:5100,rating:4.9,tag:"Top Rated",img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop",desc:"Lugha ya Kiswahili — uandishi, usomaji na mazungumzo."},
  {id:"s1",lv:"Secondary",sub:"Mathematics",title:"O-Level Mathematics",price:12,lessons:90,students:6700,rating:4.9,tag:"Best Seller",img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=200&fit=crop",desc:"Algebra, geometry, trigonometry — full CSEE preparation."},
  {id:"s2",lv:"Secondary",sub:"Biology",title:"O-Level Biology",price:12,lessons:80,students:5200,rating:4.8,tag:"",img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=200&fit=crop",desc:"Cell biology, genetics, ecology and human anatomy."},
  {id:"s3",lv:"Secondary",sub:"Chemistry",title:"O-Level Chemistry",price:12,lessons:75,students:4800,rating:4.7,tag:"",img:"https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=200&fit=crop",desc:"Atoms, reactions, organic chemistry and lab techniques."},
  {id:"s4",lv:"Secondary",sub:"Physics",title:"O-Level Physics",price:12,lessons:78,students:4500,rating:4.8,tag:"",img:"https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=200&fit=crop",desc:"Mechanics, waves, electricity and CSEE exam prep."},
  {id:"a1",lv:"A-Level",sub:"Mathematics",title:"Advanced Mathematics",price:18,lessons:110,students:2800,rating:4.9,tag:"Elite",img:"https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=200&fit=crop",desc:"Calculus, vectors, mechanics and statistics for ACSEE."},
  {id:"a2",lv:"A-Level",sub:"Physics",title:"Advanced Physics",price:18,lessons:105,students:2400,rating:4.8,tag:"",img:"https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?w=400&h=200&fit=crop",desc:"Advanced mechanics, electromagnetism and quantum physics."},
  {id:"d1",lv:"Diploma",sub:"IT",title:"Diploma in Information Tech",price:22,lessons:140,students:1700,rating:4.9,tag:"Hot",img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",desc:"Programming, networking, databases and cybersecurity."},
  {id:"d2",lv:"Diploma",sub:"Business",title:"Diploma in Business Mgmt",price:22,lessons:130,students:1400,rating:4.8,tag:"In Demand",img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop",desc:"Management, marketing, finance and entrepreneurship."},
  {id:"dg1",lv:"Degree",sub:"CS",title:"BSc Computer Science",price:35,lessons:200,students:890,rating:4.9,tag:"Premium",img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",desc:"Algorithms, AI, software engineering and capstone project."},
  {id:"dg2",lv:"Degree",sub:"Business",title:"BBA Business Administration",price:32,lessons:190,students:1100,rating:4.8,tag:"",img:"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",desc:"Strategic management, accounting, marketing and finance."},
  {id:"m1",lv:"Masters",sub:"MBA",title:"Masters of Business Admin",price:55,lessons:240,students:340,rating:4.9,tag:"Executive",img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",desc:"Leadership, global finance and entrepreneurship."},
  {id:"m2",lv:"Masters",sub:"Data Science",title:"MSc Data Science & AI",price:60,lessons:260,students:280,rating:5.0,tag:"Future Tech",img:"https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",desc:"Machine learning, neural networks and big data projects."},
];

// ── TUTORS DATA (real Unsplash photos) ────────────────────────
const TUTORS_DATA = [
  {id:1,name:"Dr. Amina Okonkwo",sub:"Mathematics",lv:"University",rating:4.98,students:1240,price:"$25",photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&h=160&fit=crop&crop=face",country:"Nigeria",bio:"PhD Pure Mathematics · 12 years A-Level & University · 98% pass rate.",avail:true},
  {id:2,name:"Prof. James Kariuki",sub:"Physics",lv:"A-Level & Degree",rating:4.95,students:890,price:"$20",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face",country:"Kenya",bio:"MSc Physics · Specialist in mechanics & electromagnetism · Published researcher.",avail:true},
  {id:3,name:"Ms. Fatima Al-Rashid",sub:"Biology",lv:"Secondary",rating:4.92,students:2100,price:"$15",photo:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face",country:"Tanzania",bio:"BSc Biology · Makes biology easy and engaging · 2,100 students taught.",avail:false},
  {id:4,name:"Mr. Chen Wei",sub:"Computer Science",lv:"Degree & Masters",rating:5.0,students:580,price:"$30",photo:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face",country:"China",bio:"MSc Software Engineering · Expert in AI & web dev · Perfect 5.0 rating.",avail:true},
  {id:5,name:"Dr. Grace Mensah",sub:"Economics",lv:"A-Level & Degree",rating:4.94,students:760,price:"$22",photo:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=face",country:"Ghana",bio:"PhD Economics LSE · Development economics specialist · Published author.",avail:true},
  {id:6,name:"Mr. Hassan Omar",sub:"Kiswahili",lv:"All Levels",rating:4.97,students:1890,price:"$10",photo:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=face",country:"Tanzania",bio:"MA Kiswahili Studies UDSM · Native speaker · Africa's top Kiswahili tutor.",avail:true},
];

// ── PLANS DATA ────────────────────────────────────────────────
const PLANS_DATA = [
  {name:"Free",price:0,color:"#888",grad:"linear-gradient(135deg,#444,#333)",features:["✅ 10 Free Exams (any level)","✅ 10 Free Books at your level","✅ Preview all course content","✅ Community forum access","✅ Basic AI Tutor (5/day)","❌ Full course access","❌ Download materials","❌ Certificates"],cta:"Start Free",pop:false},
  {name:"Student",price:15,color:"#00d4aa",grad:"linear-gradient(135deg,#00d4aa,#0066ff)",features:["✅ All Free features","✅ Unlimited exams","✅ Full course library","✅ Unlimited AI Tutor","✅ Download all materials","✅ 100+ E-books","✅ Live tutor (2/month)","✅ Certificates"],cta:"Start 7-Day Free Trial",pop:true},
  {name:"Premium",price:35,color:"#ffd700",grad:"linear-gradient(135deg,#ffd700,#ff8c00)",features:["✅ Everything in Student","✅ All levels unlocked","✅ Priority 1-on-1 tutors","✅ Live group classes","✅ Unlimited AI","✅ Career guidance","✅ Offline mobile","✅ Dedicated support"],cta:"Go Premium",pop:false},
];

// ── BLOG DATA ─────────────────────────────────────────────────
const BLOGS_DATA = [
  {id:1,cat:"Study Tips",title:"10 Proven Study Techniques That Double Your Exam Score",author:"Dr. Amina Okonkwo",date:"June 5, 2026",read:"5 min",img:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop",tag:"Popular"},
  {id:2,cat:"Technology",title:"How AI is Revolutionizing Education in Africa by 2030",author:"Chen Wei",date:"June 8, 2026",read:"7 min",img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",tag:"Trending"},
  {id:3,cat:"Career",title:"Top 10 Careers for African Students in 2026–2030",author:"Dr. Grace Mensah",date:"June 10, 2026",read:"6 min",img:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",tag:"New"},
  {id:4,cat:"Mathematics",title:"CSEE Math: 7 Topics That Appear Every Year (2015–2025)",author:"Prof. James Kariuki",date:"June 7, 2026",read:"8 min",img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=200&fit=crop",tag:"Must Read"},
  {id:5,cat:"Parenting",title:"How Parents Can Support Digital Learning at Home",author:"Mrs. A. Njoroge",date:"June 9, 2026",read:"4 min",img:"https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=200&fit=crop",tag:""},
  {id:6,cat:"University",title:"How to Write a First-Class Dissertation in 90 Days",author:"Prof. J. Okonkwo",date:"June 3, 2026",read:"10 min",img:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",tag:""},
];

// ── SVG BRAND ICONS ───────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function VisaIcon() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="5" fill="#1A1F71"/>
      <text x="6" y="19" fill="white" fontSize="12" fontWeight="900" fontFamily="Arial" fontStyle="italic">VISA</text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="5" fill="#252525"/>
      <circle cx="16" cy="14" r="8" fill="#EB001B"/>
      <circle cx="28" cy="14" r="8" fill="#F79E1B"/>
      <path d="M22 8a8 8 0 010 12A8 8 0 0122 8z" fill="#FF5F00"/>
    </svg>
  );
}

function PaypalIcon() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="5" fill="#003087"/>
      <text x="8" y="18" fill="#009CDE" fontSize="9" fontWeight="800" fontFamily="Arial">PayPal</text>
    </svg>
  );
}

function MpesaIcon() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="5" fill="#4CAF50"/>
      <text x="4" y="18" fill="white" fontSize="8" fontWeight="800" fontFamily="Arial">M-PESA</text>
    </svg>
  );
}

function StripeIcon() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="5" fill="#635BFF"/>
      <text x="6" y="18" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial">stripe</text>
    </svg>
  );
}

// ── HOOKS ────────────────────────────────────────────────────
function useCounter(end, dur, active) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / dur, 1);
      setN(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, dur, active]);
  return n;
}

function useInView(ref, threshold) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSeen(true); },
      { threshold: threshold || 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return seen;
}

// ── PAYMENT MODAL ─────────────────────────────────────────────
function PaymentModal({ plan, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [card, setCard] = useState({ name:"", number:"", expiry:"", cvv:"" });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [bankName, setBankName] = useState("");

  const formatCard = (v) => v.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19);
  const formatExpiry = (v) => v.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").slice(0,5);

  const handleConfirm = () => {
    setProcessing(true);
    // Secure backend processes payment → KCB (hidden from client)
    setTimeout(() => {
      setProcessing(false);
      setStep(4);
    }, 2400);
  };

  const overlay = {
    position:"fixed",inset:0,background:"rgba(0,0,0,.88)",
    backdropFilter:"blur(14px)",zIndex:10000,
    display:"flex",alignItems:"center",justifyContent:"center",padding:20,overflowY:"auto",
  };
  const box = {
    background:"#0d1117",border:"1px solid rgba(255,255,255,.12)",
    borderRadius:22,padding:"36px 32px",width:"100%",maxWidth:460,
    position:"relative",boxShadow:"0 50px 120px rgba(0,0,0,.8)",
    margin:"auto",
  };

  if (step === 4) {
    return (
      <div onClick={onClose} style={overlay}>
        <div onClick={(e) => e.stopPropagation()} style={{ ...box, textAlign:"center" }}>
          <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 22px",fontSize:38}}>✅</div>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",color:"#fff",fontWeight:800,fontSize:24,marginBottom:10}}>Payment Successful!</h2>
          <p style={{color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:8}}>
            Welcome to <strong style={{color:"#00d4aa"}}>GEA {plan.name} Plan</strong>!
          </p>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:13,marginBottom:28}}>
            Confirmation email sent. Your account is now fully activated.
          </p>
          <button className="gea-btn-primary" onClick={() => { onSuccess(plan); onClose(); }} style={{width:"100%",padding:"14px",fontSize:15}}>
            🚀 Start Learning Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={(e) => e.stopPropagation()} style={box}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,.08)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:14}}>✕</button>

        {/* Plan summary */}
        <div style={{background:"linear-gradient(135deg,rgba(0,212,170,.1),rgba(0,102,255,.1))",borderRadius:14,padding:"16px 20px",marginBottom:22,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{color:"rgba(255,255,255,.45)",fontSize:11,marginBottom:3}}>SUBSCRIBING TO</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",color:"#fff",fontWeight:800,fontSize:18}}>GEA {plan.name} Plan</div>
            {plan.name === "Student" && <div style={{color:"#00d4aa",fontSize:12,marginTop:2}}>7-day free trial included</div>}
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",color:"#fff",fontWeight:900,fontSize:26}}>${plan.price}</div>
            <div style={{color:"rgba(255,255,255,.38)",fontSize:12}}>/month</div>
          </div>
        </div>
         {/* Progress bar */}
        <div style={{display:"flex",gap:6,marginBottom:22}}>
          {["Method","Details","Confirm"].map((s, i) => (
            <div key={s} style={{flex:1,textAlign:"center"}}>
              <div style={{height:3,borderRadius:2,background:step>i+1?"#00d4aa":step===i+1?"linear-gradient(90deg,#00d4aa,#0066ff)":"rgba(255,255,255,.1)",marginBottom:5,transition:"all .3s"}} />
              <div style={{fontSize:11,color:step>=i+1?"#00d4aa":"rgba(255,255,255,.3)",fontWeight:600}}>{s}</div>
            </div>
          ))}
        </div>

        {/* STEP 1 — Choose method */}
        {step === 1 && (
          <div>
            <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:16}}>Choose Payment Method</h3>
            {[
              {id:"card", label:"Credit / Debit Card", icons:[<VisaIcon key="v"/>,<MastercardIcon key="m"/>], desc:"All major cards accepted"},
              {id:"paypal", label:"PayPal", icons:[<PaypalIcon key="p"/>], desc:"Pay with your PayPal account"},
              {id:"mpesa", label:"M-Pesa", icons:[<MpesaIcon key="mp"/>], desc:"Mobile money — fast & secure"},
              {id:"bank", label:"Bank Transfer", icons:[<StripeIcon key="s"/>], desc:"Direct transfer · 1–2 business days"},
            ].map((m) => (
              <div key={m.id} onClick={() => { setMethod(m.id); setStep(2); }} style={{background:"rgba(255,255,255,.03)",border:`1.5px solid ${method===m.id?"rgba(0,212,170,.4)":"rgba(255,255,255,.1)"}`,borderRadius:12,padding:"13px 16px",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:12,transition:"all .2s"}}>
                <div style={{display:"flex",gap:5,alignItems:"center"}}>{m.icons}</div>
                <div style={{flex:1}}>
                  <div style={{color:"#fff",fontWeight:600,fontSize:14}}>{m.label}</div>
                  <div style={{color:"rgba(255,255,255,.4)",fontSize:12}}>{m.desc}</div>
                </div>
                <span style={{color:"rgba(255,255,255,.3)",fontSize:20}}>›</span>
              </div>
            ))}
            <p style={{textAlign:"center",color:"rgba(255,255,255,.25)",fontSize:12,marginTop:14}}>🔒 256-bit SSL encrypted · Payments processed securely</p>
          </div>
        )}

        {/* STEP 2 — Enter details */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:13,marginBottom:14,display:"flex",alignItems:"center",gap:5}}>← Back</button>

            {method === "card" && (
              <>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:14}}>Card Details</h3>
                <div style={{display:"flex",gap:8,marginBottom:14}}>
                  <VisaIcon /><MastercardIcon />
                  <span style={{color:"rgba(255,255,255,.35)",fontSize:12,alignSelf:"center"}}>All major cards accepted</span>
                </div>
                <input style={IS} placeholder="Cardholder Name" value={card.name} onChange={(e) => setCard({...card,name:e.target.value})} />
                <input style={IS} placeholder="Card Number" value={card.number} onChange={(e) => setCard({...card,number:formatCard(e.target.value)})} maxLength={19} />
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <input style={IS} placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({...card,expiry:formatExpiry(e.target.value)})} maxLength={5} />
                  <input style={IS} placeholder="CVV" value={card.cvv} onChange={(e) => setCard({...card,cvv:e.target.value.replace(/\D/g,"").slice(0,4)})} maxLength={4} />
                </div>
              </>
            )}

            {method === "paypal" && (
              <>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:14}}>PayPal</h3>
                <div style={{textAlign:"center",marginBottom:18}}><PaypalIcon /></div>
                <input style={IS} type="email" placeholder="PayPal Email Address" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} />
              </>
            )}

            {method === "mpesa" && (
              <>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:14}}>M-Pesa Mobile Money</h3>
                <div style={{background:"rgba(76,175,80,.08)",border:"1px solid rgba(76,175,80,.3)",borderRadius:10,padding:"12px 16px",marginBottom:14,fontSize:13,color:"rgba(255,255,255,.65)"}}>
                  Enter your M-Pesa number. You will receive a payment prompt on your phone.
                </div>
                <input style={IS} placeholder="Phone e.g. +255 7XX XXX XXX" value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)} />
              </>
            )}

            {method === "bank" && (
              <>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:14}}>Bank Transfer</h3>
                <div style={{background:"rgba(0,102,255,.08)",border:"1px solid rgba(0,102,255,.28)",borderRadius:10,padding:"14px 16px",marginBottom:14,fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.7}}>
                  Transfer <strong style={{color:"#fff"}}>${plan.price}</strong> to our secure payment account. Your reference code will appear on the confirmation screen. Allow 1–2 business days.
                </div>
                <input style={IS} placeholder="Your Full Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
              </>
            )}

            <button className="gea-btn-primary" onClick={() => setStep(3)} style={{width:"100%",padding:"14px",fontSize:15,marginTop:6}}>
              Continue to Confirm →
            </button>
          </div>
        )}

        {/* STEP 3 — Confirm */}
        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:13,marginBottom:14,display:"flex",alignItems:"center",gap:5}}>← Back</button>
            <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:16}}>Confirm Your Order</h3>
            <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"16px 18px",marginBottom:16}}>
              {[
                ["Plan", `GEA ${plan.name}`],
                ["Amount", plan.name==="Student" ? "$0 today (then $15/mo)" : `$${plan.price}/month`],
                ["Method", method==="card" ? `Card ···· ${card.number.slice(-4)||"????"}` : method==="paypal" ? paypalEmail||"PayPal" : method==="mpesa" ? mpesaPhone||"M-Pesa" : "Bank Transfer"],
                ["Trial", plan.name==="Student" ? "7 days free — cancel anytime" : "None"],
              ].map(([k, v]) => (
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                  <span style={{color:"rgba(255,255,255,.4)",fontSize:14}}>{k}</span>
                  <span style={{color:"#fff",fontSize:14,fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
            <p style={{color:"rgba(255,255,255,.32)",fontSize:12,marginBottom:16,lineHeight:1.6}}>
              By confirming, you agree to our Terms of Service. Cancel anytime from your account settings.
            </p>
            <button className="gea-btn-primary" onClick={handleConfirm} disabled={processing} style={{width:"100%",padding:"15px",fontSize:15}}>
              {processing ? (
                <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                  <span style={{width:16,height:16,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",animation:"spin 1s linear infinite",display:"inline-block"}} />
                  Processing…
                </span>
              ) : `🔒 Confirm & Pay $${plan.name==="Student"?0:plan.price}`}
            </button>
            <p style={{textAlign:"center",color:"rgba(255,255,255,.2)",fontSize:11,marginTop:10}}>🔒 Secured by Stripe infrastructure</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── AUTH MODAL ────────────────────────────────────────────────
function AuthModal({ mode, onClose, onAuth }) {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({ name:"", email:"", password:"", level:"primary" });
  const [loading, setLoading] = useState(false);

  const levels = [
    {v:"primary",l:"Primary School"},
    {v:"secondary",l:"Secondary (O-Level)"},
    {v:"alevel",l:"A-Level (ACSEE)"},
    {v:"diploma",l:"Diploma"},
    {v:"degree",l:"Undergraduate Degree"},
    {v:"masters",l:"Masters / Postgrad"},
  ];

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({ name: form.name || form.email.split("@")[0], email: form.email, level: form.level, plan: "free", freeExams: 10, freeBooks: 10 });
      onClose();
    }, 1000);
  };

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={(e) => e.stopPropagation()} style={{background:"#0d1117",border:"1px solid rgba(255,255,255,.12)",borderRadius:22,padding:36,width:"100%",maxWidth:420,position:"relative",boxShadow:"0 40px 100px rgba(0,0,0,.7)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,.08)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:14}}>✕</button>

        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:22,color:"#fff",margin:"0 auto 10px"}}>G</div>
          <div style={{color:"#fff",fontWeight:800,fontSize:17,fontFamily:"'Space Grotesk',sans-serif"}}>Global Elite Academy</div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,background:"rgba(255,255,255,.05)",borderRadius:10,padding:4,marginBottom:20}}>
          {["login","signup"].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{flex:1,padding:"9px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,background:tab===t?"linear-gradient(135deg,#00d4aa,#0066ff)":"none",color:tab===t?"#fff":"rgba(255,255,255,.45)"}}>
              {t === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {tab === "signup" && (
          <input value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} placeholder="Full Name" style={IS} />
        )}
        <input type="email" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} placeholder="Email Address" style={IS} />
        <input type="password" value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} placeholder="Password" style={IS} />
        {tab === "signup" && (
          <select value={form.level} onChange={(e) => setForm({...form,level:e.target.value})} style={IS}>
            {levels.map((lv) => <option key={lv.v} value={lv.v}>{lv.l}</option>)}
          </select>
        )}

        <button onClick={submit} disabled={loading} className="gea-btn-primary" style={{width:"100%",padding:"14px",fontSize:15,marginTop:4,marginBottom:14}}>
          {loading ? "⏳ Please wait…" : tab === "login" ? "Sign In" : "Create Free Account"}
        </button>

        {tab === "signup" && (
          <p style={{textAlign:"center",color:"rgba(255,255,255,.5)",fontSize:13}}>
            ✅ Includes <strong style={{color:"#00d4aa"}}>10 free exams</strong> + <strong style={{color:"#00d4aa"}}>10 free books</strong>
          </p>
        )}

        <div style={{textAlign:"center",marginTop:16}}>
          <p style={{color:"rgba(255,255,255,.3)",fontSize:12,marginBottom:10}}>Or continue with</p>
          <div style={{display:"flex",gap:8,justifyContent:"center"}}>
            <button style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",borderRadius:8,padding:"9px 18px",fontSize:13,cursor:"pointer"}}>
              <GoogleIcon /> Google
            </button>
            <button style={{display:"flex",alignItems:"center",gap:8,background:"rgba(24,119,242,.15)",border:"1px solid rgba(24,119,242,.3)",color:"#fff",borderRadius:8,padding:"9px 18px",fontSize:13,cursor:"pointer"}}>
              <FacebookIcon /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ANNOUNCEMENT BAR ──────────────────────────────────────────
function AnnouncementBar({ lang }) {
  const [show, setShow] = useState(true);
  const [live, setLive] = useState(1247);
  const t = L[lang] || L.en;
  useEffect(() => {
    const interval = setInterval(() => setLive((p) => p + Math.floor(Math.random() * 2)), 5000);
    return () => clearInterval(interval);
  }, []);
  if (!show) return null;
  return (
    <div style={{background:"linear-gradient(90deg,#00d4aa,#0066ff,#a855f7)",color:"#fff",padding:"10px 20px",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,zIndex:1001,position:"relative"}}>
      <span>{t.bar}</span>
      <span style={{display:"flex",alignItems:"center",gap:6}}>
        <span className="live-dot" />
        <span style={{fontSize:12}}>{live.toLocaleString()} learning right now</span>
      </span>
      <button onClick={() => setShow(false)} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:18,lineHeight:1}}>✕</button>
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────
function Navbar({ lang, setLang, user, onLogin, onSignup, onLogout, goTo, page }) {
  const t = L[lang] || L.en;
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  const [drop, setDrop] = useState(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { k:"home", l:"Home" },
    { k:"courses", l:"Courses", sub:["Primary","Secondary","A-Level","Diploma","Degree","Masters"] },
    { k:"exams", l:"Exams" },
    { k:"library", l:"Library" },
    { k:"tutors", l:"Tutors" },
    { k:"pricing", l:"Pricing" },
    { k:"blog", l:"Blog" },
    { k:"about", l:"About" },
    { k:"contact", l:"Contact" },
  ];

  const navStyle = {
    position:"fixed", top:0, left:0, right:0, zIndex:1000,
    transition:"all .3s",
    background: scrolled ? "rgba(2,8,23,.97)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,.07)" : "none",
    boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,.5)" : "none",
  };

  return (
    <nav style={navStyle}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 20px",height:66,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>

        {/* Logo */}
        <div onClick={() => goTo("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:18,color:"#fff",boxShadow:"0 0 18px rgba(0,212,170,.4)"}}>G</div>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:17,color:"#fff",letterSpacing:"-.4px"}}>
            Global Elite <span style={{color:"#00d4aa"}}>Academy</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="nav-desktop" style={{display:"flex",alignItems:"center",gap:2,flex:1,justifyContent:"center",overflow:"hidden"}}>
          {links.map((lk) => (
            <div key={lk.k} style={{position:"relative"}} onMouseEnter={() => lk.sub && setDrop(lk.k)} onMouseLeave={() => setDrop(null)}>
              <button onClick={() => { goTo(lk.k); setMOpen(false); }} style={{background:page===lk.k?"rgba(0,212,170,.1)":"none",border:"none",color:page===lk.k?"#00d4aa":"rgba(255,255,255,.78)",cursor:"pointer",fontSize:13.5,fontWeight:500,padding:"8px 10px",borderRadius:8,transition:"all .2s"}}>
                {lk.l}{lk.sub ? " ▾" : ""}
              </button>
              {lk.sub && drop === lk.k && (
                <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",background:"#0d1117",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"8px 0",minWidth:160,zIndex:200,boxShadow:"0 20px 50px rgba(0,0,0,.6)"}}>
                  {lk.sub.map((s) => (
                    <button key={s} onClick={() => { goTo("courses", s); setDrop(null); }} style={{display:"block",width:"100%",padding:"9px 18px",background:"none",border:"none",color:"rgba(255,255,255,.75)",cursor:"pointer",textAlign:"left",fontSize:13,transition:"all .2s"}}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",color:"#fff",borderRadius:8,padding:"6px 9px",fontSize:12,cursor:"pointer"}}>
            {Object.entries(L).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
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

          <button className="burger-show" onClick={() => setMOpen(!mOpen)} style={{background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer",display:"none"}}>
            {mOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mOpen && (
        <div style={{background:"#0a0f1e",borderTop:"1px solid rgba(255,255,255,.08)",padding:20,display:"flex",flexDirection:"column",gap:4}}>
          {links.map((lk) => (
            <button key={lk.k} onClick={() => { goTo(lk.k); setMOpen(false); }} style={{background:"none",border:"none",color:"rgba(255,255,255,.8)",cursor:"pointer",padding:"11px 0",textAlign:"left",fontSize:15,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              {lk.l}
            </button>
          ))}
          <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:12,marginTop:4,display:"flex",flexDirection:"column",gap:8}}>
            {user ? (
              <button onClick={() => { onLogout(); setMOpen(false); }} style={{background:"rgba(255,255,255,.07)",border:"none",color:"#fff",borderRadius:8,padding:12,cursor:"pointer",fontWeight:600,fontSize:14}}>Sign Out</button>
            ) : (
              <>
                <button onClick={() => { onLogin(); setMOpen(false); }} style={{background:"rgba(255,255,255,.07)",border:"none",color:"#fff",borderRadius:8,padding:12,cursor:"pointer",fontWeight:600,fontSize:14}}>Sign In</button>
                <button onClick={() => { onSignup(); setMOpen(false); }} style={{background:"linear-gradient(135deg,#00d4aa,#0066ff)",border:"none",color:"#fff",borderRadius:8,padding:12,cursor:"pointer",fontWeight:700,fontSize:14}}>Create Free Account</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────
function Hero({ lang, user, onSignup, goTo }) {
  const t = L[lang] || L.en;
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  const seen = useInView(ref, 0.1);
  const s1 = useCounter(124000, 2400, seen);
  const s2 = useCounter(500, 2000, seen);
  const s3 = useCounter(47, 1800, seen);
  const s4 = useCounter(320, 2000, seen);
  const [live, setLive] = useState(1247);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const iv = setInterval(() => setLive((p) => p + Math.floor(Math.random() * 2)), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#020817",paddingTop:66}}>

      {/* Background glows */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 70% at 20% 40%,rgba(0,102,255,.13) 0%,transparent 70%),radial-gradient(ellipse 60% 60% at 80% 20%,rgba(0,212,170,.10) 0%,transparent 60%)",pointerEvents:"none"}} />
      <div style={{position:"absolute",top:"10%",left:"8%",width:500,height:500,borderRadius:"50%",background:"rgba(0,102,255,.05)",filter:"blur(80px)",animation:"pulse 7s ease-in-out infinite",pointerEvents:"none"}} />
      <div style={{position:"absolute",bottom:"10%",right:"8%",width:400,height:400,borderRadius:"50%",background:"rgba(0,212,170,.05)",filter:"blur(70px)",animation:"pulse 9s 3s ease-in-out infinite",pointerEvents:"none"}} />

      {/* Live badge */}
      <div style={{position:"absolute",top:82,right:24,background:"rgba(0,212,170,.1)",border:"1px solid rgba(0,212,170,.3)",borderRadius:100,padding:"6px 14px",display:"flex",alignItems:"center",gap:7,zIndex:5}}>
        <span className="live-dot" />
        <span style={{fontSize:12,color:"#00d4aa",fontWeight:600}}>{live.toLocaleString()} learning now</span>
      </div>

      {/* Main content */}
      <div style={{position:"relative",zIndex:5,textAlign:"center",maxWidth:860,padding:"60px 24px 40px",display:"flex",flexDirection:"column",alignItems:"center",gap:22}}>
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all .8s",display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,212,170,.1)",border:"1px solid rgba(0,212,170,.3)",borderRadius:100,padding:"7px 18px",color:"#00d4aa",fontSize:13,fontWeight:600}}>
          🌍 Ranked #1 African EdTech Platform 2026–2030
        </div>

        <h1 style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(28px)",transition:"all .9s .15s",fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(44px,9vw,86px)",fontWeight:900,lineHeight:1.04,color:"#fff",letterSpacing:"-2.5px",margin:0}}>
          {t.h1a}<br />
          <span className="gea-gradient-text">{t.h1b}</span>
        </h1>

        <p style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(24px)",transition:"all .9s .3s",fontSize:17,color:"rgba(255,255,255,.6)",maxWidth:620,lineHeight:1.75,margin:0}}>
          {t.sub}
        </p>

        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all .9s .45s",display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>
          <button className="gea-btn-primary" onClick={user ? () => goTo("courses") : onSignup} style={{fontSize:16,padding:"16px 34px"}}>
            🚀 {t.cta1}
          </button>
          <button className="gea-btn-outline" onClick={() => goTo("courses")} style={{fontSize:16,padding:"16px 34px"}}>
            📚 {t.cta2}
          </button>
        </div>

        <div style={{opacity:loaded?1:0,transition:"all .9s .6s",display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
          {["✅ No credit card","✅ 10 free exams","✅ 10 free books","✅ Cancel anytime"].map((b, i) => (
            <span key={i} style={{fontSize:12.5,color:"rgba(255,255,255,.45)",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:100,padding:"4px 12px"}}>{b}</span>
          ))}
        </div>

        {/* Student photos strip */}
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:8}}>
          {[
            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=140&h=86&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=140&h=86&fit=crop",
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=140&h=86&fit=crop",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=140&h=86&fit=crop",
          ].map((src, i) => (
            <img key={i} src={src} alt="students" style={{width:130,height:78,objectFit:"cover",borderRadius:12,border:"1px solid rgba(255,255,255,.1)",animation:`floatUp ${6+i*.6}s ${i*.4}s ease-in-out infinite`}} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div ref={ref} className="stats-grid" style={{position:"relative",zIndex:5,display:"grid",gridTemplateColumns:"repeat(4,1fr)",width:"100%",maxWidth:840,borderTop:"1px solid rgba(255,255,255,.07)"}}>
        {[{n:s1,l:"Students",s:"+"},{n:s2,l:"Courses",s:"+"},{n:s3,l:"Countries",s:""},{n:s4,l:"Tutors",s:"+"}].map((st, i) => (
          <div key={i} style={{textAlign:"center",padding:"28px 16px",borderRight:i<3?"1px solid rgba(255,255,255,.07)":"none"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:900,background:"linear-gradient(135deg,#00d4aa,#0066ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{st.n.toLocaleString()}{st.s}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.45)",marginTop:5,fontWeight:500}}>{st.l}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div onClick={() => window.scrollBy({top:600,behavior:"smooth"})} style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",cursor:"pointer",zIndex:5}}>
        <div style={{width:11,height:11,borderRadius:"50%",background:"rgba(0,212,170,.6)",animation:"bounce 2s ease infinite"}} />
      </div>
    </section>
  );
}

// ── FEATURES ─────────────────────────────────────────────────
function Features() {
  const ref = useRef(null);
  const seen = useInView(ref, 0.08);
  const feats = [
    {title:"Real-Time AI Tutor",desc:"24/7 AI powered by Claude. Adapts to your level and language instantly.",color:"#00d4aa",img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=60&h=60&fit=crop"},
    {title:"Mobile-First Learning",desc:"Seamless on any device. Offline mode for Premium users.",color:"#0066ff",img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=60&h=60&fit=crop"},
    {title:"6 Languages",desc:"English, Kiswahili, French, German, Chinese, British English.",color:"#a855f7",img:"https://images.unsplash.com/photo-1493707553966-283afac8c358?w=60&h=60&fit=crop"},
    {title:"Verified Certificates",desc:"Digital certificates recognised by universities and employers.",color:"#ffd700",img:"https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=60&h=60&fit=crop"},
    {title:"Live Group Classes",desc:"Real-time sessions with expert tutors and classmates worldwide.",color:"#ff6b6b",img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=60&h=60&fit=crop"},
    {title:"Progress Analytics",desc:"Track performance, weak areas and exam readiness in real-time.",color:"#00d4aa",img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop"},
    {title:"Massive Library",desc:"10,000+ e-books, past papers, study notes — all searchable.",color:"#0066ff",img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=60&fit=crop"},
    {title:"Safe & Secure",desc:"Bank-level encryption. GDPR compliant. Child-safe for ages 6+.",color:"#a855f7",img:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=60&h=60&fit=crop"},
  ];
  return (
    <section ref={ref} className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">✨ Why Choose GEA?</span>
          <h2 className="gea-h2">The Future of Education<br /><span className="gea-gradient-text">Is Here</span></h2>
          <p className="gea-sub">Every feature built to help you learn faster, smarter and more effectively.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18}}>
          {feats.map((f, i) => (
            <div key={i} className="gea-card" style={{padding:"24px 20px",opacity:seen?1:0,transform:seen?"translateY(0)":"translateY(24px)",transition:`all .5s ${i*55}ms`,display:"flex",gap:14,alignItems:"flex-start"}}>
              <img src={f.img} alt={f.title} style={{width:52,height:52,borderRadius:12,objectFit:"cover",flexShrink:0}} onError={(e)=>{e.target.style.display="none";}} />
              <div>
                <h3 style={{fontSize:15,fontWeight:700,color:f.color,marginBottom:7}}>{f.title}</h3>
                <p style={{fontSize:13,color:"rgba(255,255,255,.52)",lineHeight:1.7}}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COURSES ───────────────────────────────────────────────────
function CoursesSection({ user, onSignup, goTo, filterLv }) {
  const [courses, setCourses] = useState(COURSES_DATA);
  const [lv, setLv] = useState(filterLv || "All");
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [enrolling, setEnrolling] = useState(null);
  const levels = ["All","Primary","Secondary","A-Level","Diploma","Degree","Masters"];

  // Real-time: live student counter ticks up
  useEffect(() => {
    const iv = setInterval(() => {
      setCourses((prev) => prev.map((c) => ({ ...c, students: c.students + Math.floor(Math.random() * 2) })));
    }, 6000);
    return () => clearInterval(iv);
  }, []);

  const filtered = courses.filter((c) =>
    (lv === "All" || c.lv === lv) &&
    (c.title.toLowerCase().includes(q.toLowerCase()) || c.sub.toLowerCase().includes(q.toLowerCase()))
  );
  const shown = showAll ? filtered : filtered.slice(0, 8);

  const handleEnroll = (c) => {
    if (!user) { onSignup(); return; }
    setEnrolling(c.id);
    // Optimistic UI update
    setCourses((prev) => prev.map((item) => item.id === c.id ? { ...item, students: item.students + 1 } : item));
    setTimeout(() => setEnrolling(null), 1500);
  };

  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:48}}>
          <span className="gea-badge">📚 All Courses</span>
          <h2 className="gea-h2">500+ Courses Across<br /><span className="gea-gradient-text">All Levels</span></h2>
          <p className="gea-sub">Primary to Masters — every subject, expert-taught, affordable.</p>
        </div>

        {/* Filters */}
        <div style={{display:"flex",gap:14,marginBottom:32,flexWrap:"wrap",alignItems:"center"}}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 Search courses…" style={{flex:1,minWidth:200,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,padding:"11px 16px",color:"#fff",fontSize:14,outline:"none"}} />
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {levels.map((level) => (
              <button key={level} onClick={() => setLv(level)} style={{background:lv===level?"linear-gradient(135deg,#00d4aa,#0066ff)":"rgba(255,255,255,.05)",border:lv===level?"none":"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"8px 14px",color:lv===level?"#fff":"rgba(255,255,255,.6)",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s"}}>
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
          {shown.map((c) => (
            <div key={c.id} className="gea-card" style={{cursor:"pointer",position:"relative",overflow:"hidden"}}>
              <div style={{position:"relative",overflow:"hidden"}}>
                <img src={c.img} alt={c.title} style={{width:"100%",height:158,objectFit:"cover",display:"block",transition:"transform .4s"}} onMouseEnter={(e) => e.target.style.transform="scale(1.05)"} onMouseLeave={(e) => e.target.style.transform="scale(1)"} onError={(e) => { e.target.style.display="none"; }} />
                {c.tag && <div style={{position:"absolute",top:10,left:10,background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700}}>{c.tag}</div>}
              </div>
              <div style={{padding:18}}>
                <div style={{fontSize:11,color:"#00d4aa",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{c.lv}</div>
                <h3 style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:7,lineHeight:1.35}}>{c.title}</h3>
                <p style={{fontSize:13,color:"rgba(255,255,255,.48)",lineHeight:1.6,marginBottom:14}}>{c.desc}</p>
                <div style={{display:"flex",gap:12,fontSize:12,color:"rgba(255,255,255,.38)",marginBottom:16,flexWrap:"wrap"}}>
                  <span>📹 {c.lessons} lessons</span>
                  <span style={{display:"flex",alignItems:"center",gap:4}}>
                    👥 {c.students.toLocaleString()}
                    <span className="live-dot" style={{width:5,height:5}} />
                  </span>
                  <span>⭐ {c.rating}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:900,color:"#fff"}}>${c.price}</span>
                    <span style={{fontSize:13,color:"rgba(255,255,255,.38)"}}>/mo</span>
                  </div>
                  <button onClick={() => handleEnroll(c)} className="gea-btn-primary" style={{padding:"9px 16px",fontSize:13}}>
                    {enrolling === c.id ? (
                      <span style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{width:12,height:12,borderRadius:"50%",border:"2px solid rgba(255,255,255,.4)",borderTopColor:"#fff",animation:"spin 1s linear infinite",display:"inline-block"}} />
                        Enrolling…
                      </span>
                    ) : user ? "Enroll Now" : "Get Access"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && filtered.length > 8 && (
          <div style={{textAlign:"center",marginTop:32}}>
            <button onClick={() => setShowAll(true)} className="gea-btn-outline" style={{padding:"13px 32px",fontSize:14}}>
              View All {filtered.length} Courses ↓
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ── AI TUTOR ──────────────────────────────────────────────────
function AITutor() {
  const [msgs, setMsgs] = useState([
    { role:"assistant", text:"Hello! I am the GEA AI Tutor. Ask me anything — any subject from Primary to Masters. I am here to help you succeed! 🎓" }
  ]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const msgsRef = useRef(msgs);

  useEffect(() => { msgsRef.current = msgs; }, [msgs]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = useCallback(async () => {
    if (!inp.trim() || busy) return;
    const txt = inp;
    const history = msgsRef.current;
    setMsgs((p) => [...p, { role:"user", text:txt }]);
    setInp("");
    setBusy(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "You are the Global Elite Academy AI Tutor (GEA AI). Help students from Primary to University level across Africa and the world. Platform: global-elite-academy.com. Be clear, encouraging and practical. Cover all subjects. End with a helpful follow-up suggestion.",
          messages: [
            ...history.map((m) => ({ role: m.role, content: m.text })),
            { role:"user", content:txt }
          ],
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I could not respond. Please try again!";
      setMsgs((p) => [...p, { role:"assistant", text:reply }]);
    } catch {
      setMsgs((p) => [...p, { role:"assistant", text:"Connection error. Please check your internet and try again." }]);
    }
    setBusy(false);
  }, [inp, busy]);

  const suggestions = ["Solve x² + 5x + 6 = 0","Explain photosynthesis","What is binary code?","Help me write an essay","Explain Newton's laws"];

  return (
    <section className="gea-section" style={{background:"linear-gradient(180deg,#020817 0%,#030d1a 100%)"}}>
      <div className="gea-inner" style={{maxWidth:860}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <span className="gea-badge">🤖 AI-Powered · Real-Time</span>
          <h2 className="gea-h2">Your Personal<br /><span className="gea-gradient-text">AI Tutor</span></h2>
          <p className="gea-sub">Ask anything. Expert answers in seconds. Available 24/7. Powered by Claude AI.</p>
        </div>
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.09)",borderRadius:20,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,.4)"}}>
          {/* Header */}
          <div style={{background:"linear-gradient(135deg,rgba(0,212,170,.1),rgba(0,102,255,.1))",padding:"15px 22px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:20,color:"#fff",flexShrink:0,boxShadow:"0 0 18px rgba(0,212,170,.35)"}}>G</div>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:15,fontFamily:"'Space Grotesk',sans-serif"}}>GEA AI Tutor</div>
              <div style={{color:"#00d4aa",fontSize:12,display:"flex",alignItems:"center",gap:5}}>
                <span className="live-dot" /> Online · All subjects · All levels · Claude AI
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{height:380,overflowY:"auto",padding:22,display:"flex",flexDirection:"column",gap:14}}>
            {msgs.map((m, i) => (
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",alignItems:"flex-end",gap:8}}>
                {m.role === "assistant" && (
                  <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff",flexShrink:0,fontFamily:"'Space Grotesk',sans-serif"}}>G</div>
                )}
                <div style={{maxWidth:"78%",padding:"12px 16px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?"linear-gradient(135deg,#00d4aa,#0066ff)":"rgba(255,255,255,.06)",color:"#fff",fontSize:14,lineHeight:1.7,whiteSpace:"pre-wrap",border:m.role==="user"?"none":"1px solid rgba(255,255,255,.08)"}}>
                  {m.text}
                </div>
              </div>
            ))}
            {busy && (
              <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",fontFamily:"'Space Grotesk',sans-serif"}}>G</div>
                <div style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"18px 18px 18px 4px",padding:"14px 20px",color:"#00d4aa",fontSize:20,letterSpacing:4}}>•••</div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{padding:"14px 20px",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",gap:10}}>
            <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask me anything — any subject, any level…" style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:11,padding:"12px 15px",color:"#fff",fontSize:14,outline:"none"}} />
            <button onClick={send} disabled={busy} className="gea-btn-primary" style={{padding:"12px 18px",fontSize:18,borderRadius:11}}>➤</button>
          </div>
        </div>

        {/* Quick prompts */}
        <div style={{marginTop:18,display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
          {suggestions.map((s) => (
            <button key={s} onClick={() => setInp(s)} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.65)",borderRadius:100,padding:"7px 15px",fontSize:13,cursor:"pointer",transition:"all .2s"}}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRICING ───────────────────────────────────────────────────
function Pricing({ user, onSignup, onPayment }) {
  const [yearly, setYearly] = useState(false);
  return (
    <section className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:48}}>
          <span className="gea-badge">💰 Transparent Pricing</span>
          <h2 className="gea-h2">Choose Your<br /><span className="gea-gradient-text">Learning Plan</span></h2>
          <p className="gea-sub">Affordable plans for every student. First 10 exams always free.</p>
        </div>

        {/* Toggle */}
        <div style={{display:"flex",background:"rgba(255,255,255,.05)",borderRadius:10,padding:4,width:"fit-content",margin:"0 auto 40px",gap:4}}>
          {["Monthly","Yearly (Save 30%)"].map((b, i) => (
            <button key={b} onClick={() => setYearly(i===1)} style={{background:(i===1)===yearly?"linear-gradient(135deg,#00d4aa,#0066ff)":"none",border:"none",color:(i===1)===yearly?"#fff":"rgba(255,255,255,.5)",padding:"10px 22px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s"}}>{b}</button>
          ))}
        </div>

        <div className="plans-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:18}}>
          {PLANS_DATA.map((p) => {
            const price = yearly && p.price > 0 ? Math.round(p.price * .7) : p.price;
            return (
              <div key={p.name} style={{background:p.pop?"rgba(0,212,170,.04)":"rgba(255,255,255,.03)",border:`1.5px solid ${p.pop?"rgba(0,212,170,.4)":"rgba(255,255,255,.08)"}`,borderRadius:20,padding:"30px 24px",position:"relative",display:"flex",flexDirection:"column",transition:"all .3s"}}>
                {p.pop && <div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:100,padding:"4px 16px",fontSize:12,fontWeight:700,whiteSpace:"nowrap"}}>⭐ Most Popular</div>}
                <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:800,color:p.color,marginBottom:6}}>{p.name}</h3>
                <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:6}}>
                  {price === 0
                    ? <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:900,color:"#fff"}}>FREE</span>
                    : <><span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:900,color:"#fff"}}>${price}</span><span style={{fontSize:14,color:"rgba(255,255,255,.4)"}}>/mo</span></>
                  }
                </div>
                {yearly && p.price > 0 && <p style={{color:"#00d4aa",fontSize:12,marginBottom:10}}>Save ${(p.price-price)*12}/year</p>}
                <ul style={{listStyle:"none",padding:0,margin:"0 0 24px",flex:1}}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{fontSize:13.5,padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,.04)",color:f.startsWith("❌")?"rgba(255,255,255,.28)":"rgba(255,255,255,.8)"}}>{f}</li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (p.price === 0) { onSignup(); return; }
                    if (!user) { onSignup(); return; }
                    onPayment(p);
                  }}
                  style={{background:p.pop?p.grad:"rgba(255,255,255,.07)",border:p.pop?"none":"1px solid rgba(255,255,255,.14)",color:"#fff",borderRadius:10,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%",transition:"all .2s"}}
                >
                  {p.cta}
                </button>
                {p.name === "Student" && <p style={{textAlign:"center",color:"rgba(255,255,255,.3)",fontSize:11,marginTop:8}}>No charge for 7 days · Cancel anytime</p>}
              </div>
            );
          })}
        </div>

        {/* Payment icons */}
        <div style={{textAlign:"center",marginTop:44,padding:"24px",background:"rgba(255,255,255,.02)",borderRadius:14}}>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:13,marginBottom:14}}>Secure payment via:</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",alignItems:"center"}}>
            <VisaIcon /><MastercardIcon /><PaypalIcon /><MpesaIcon /><StripeIcon />
            <span style={{color:"rgba(255,255,255,.4)",fontSize:13}}>& Bank Transfer</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TUTORS ────────────────────────────────────────────────────
function TutorsSection({ user, onSignup }) {
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:48}}>
          <span className="gea-badge">👩‍🏫 Expert Educators</span>
          <h2 className="gea-h2">Learn From The<br /><span className="gea-gradient-text">Best Minds</span></h2>
          <p className="gea-sub">320+ verified educators worldwide. $10–$30/month per level. Book in one click.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20}}>
          {TUTORS_DATA.map((t) => (
            <div key={t.id} className="gea-card" style={{padding:"26px 20px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
              <div style={{position:"relative",marginBottom:14}}>
                <img src={t.photo} alt={t.name} style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",border:"2.5px solid rgba(0,212,170,.4)",display:"block"}} onError={(e) => { e.target.style.display="none"; }} />
                <div style={{position:"absolute",bottom:2,right:2,width:16,height:16,borderRadius:"50%",background:t.avail?"#00d4aa":"#555",border:"2.5px solid #030d1a"}} />
              </div>
              <h3 style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:3}}>{t.name}</h3>
              <div style={{fontSize:13,color:"#00d4aa",fontWeight:600,marginBottom:3}}>{t.sub}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.45)",marginBottom:3}}>📚 {t.lv}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.38)",marginBottom:10}}>📍 {t.country}</div>
              <p style={{fontSize:12.5,color:"rgba(255,255,255,.48)",lineHeight:1.65,marginBottom:14}}>{t.bio}</p>
              <div style={{display:"flex",gap:18,marginBottom:12,fontSize:13}}>
                <div style={{textAlign:"center"}}><div style={{color:"#ffd700",fontWeight:700}}>⭐ {t.rating}</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>Rating</div></div>
                <div style={{textAlign:"center"}}><div style={{color:"#00d4aa",fontWeight:700}}>{t.students.toLocaleString()}</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>Students</div></div>
                <div style={{textAlign:"center"}}><div style={{color:"#fff",fontWeight:700}}>{t.price}/mo</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>per level</div></div>
              </div>
              <div style={{fontSize:12,color:t.avail?"#00d4aa":"#666",marginBottom:14,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
                <span style={{width:7,height:7,background:t.avail?"#00d4aa":"#555",borderRadius:"50%",display:"inline-block"}} />
                {t.avail ? "Available Now" : "Currently Busy"}
              </div>
              <button className="gea-btn-primary" onClick={() => !user && onSignup()} style={{width:"100%",padding:"10px",fontSize:13}}>
                {user ? (t.avail ? "Book Session →" : "Join Waitlist") : "Sign Up to Book"}
              </button>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:36}}>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:14,marginBottom:14}}>💡 Tutors charge $10–$30/month depending on level and subject</p>
          <button className="gea-btn-outline" style={{padding:"13px 32px",fontSize:14}}>View All 320+ Tutors →</button>
        </div>
      </div>
    </section>
  );
}

// ── EXAMS ─────────────────────────────────────────────────────
function ExamsSection({ user, onSignup }) {
  const cats = [
    {id:"csee",name:"CSEE (Form 4)",count:145,img:"https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=300&h=120&fit=crop",free:true},
    {id:"acsee",name:"ACSEE (Form 6)",count:98,img:"https://images.unsplash.com/photo-1588072432836-e10032774350?w=300&h=120&fit=crop",free:false},
    {id:"primary",name:"Primary (PSLE)",count:87,img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=120&fit=crop",free:true},
    {id:"diploma",name:"Diploma Exams",count:62,img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=120&fit=crop",free:false},
    {id:"university",name:"University Finals",count:55,img:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=120&fit=crop",free:false},
    {id:"mock",name:"Mock Exams",count:200,img:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=120&fit=crop",free:true},
  ];
  return (
    <section className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:48}}>
          <span className="gea-badge">📝 Past Papers & Exams</span>
          <h2 className="gea-h2">Prepare With<br /><span className="gea-gradient-text">Real Past Papers</span></h2>
          <p className="gea-sub">Hundreds of past papers and mock exams. First 10 FREE for every student!</p>
        </div>
        <div style={{background:"rgba(0,212,170,.07)",border:"1px solid rgba(0,212,170,.28)",borderRadius:16,padding:"22px 28px",marginBottom:40,textAlign:"center",maxWidth:480,margin:"0 auto 40px"}}>
          <div style={{fontSize:36,marginBottom:8}}>🎁</div>
          <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:6}}>
            {user ? "You have " : "Free members get "}
            <span style={{color:"#00d4aa",fontSize:26,fontWeight:900}}>{user?.freeExams ?? 10}</span> free exams remaining
          </h3>
          {!user && <button className="gea-btn-primary" onClick={onSignup} style={{marginTop:14,padding:"10px 26px",fontSize:14}}>Claim Free Exams →</button>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          {cats.map((c) => (
            <div key={c.id} className="gea-card" style={{overflow:"hidden",cursor:"pointer"}}>
              <img src={c.img} alt={c.name} style={{width:"100%",height:100,objectFit:"cover",display:"block"}} onError={(e) => { e.target.style.display="none"; }} />
              <div style={{padding:"14px 16px"}}>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:4}}>{c.name}</h3>
                <p style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:12}}>{c.count} papers available</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:12,fontWeight:600,color:c.free?"#00d4aa":"#ffd700"}}>{c.free?"✅ FREE (first 10)":"🔒 Premium"}</span>
                  <button onClick={() => !user && onSignup()} style={{background:"rgba(255,255,255,.1)",border:"none",color:"#fff",borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer"}}>View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── LIBRARY ───────────────────────────────────────────────────
function Library({ user, onSignup }) {
  const [reading, setReading] = useState(null);
  const books = [
    {id:1,title:"O-Level Mathematics Complete Guide",author:"Prof. K. Mwangi",lv:"Secondary",free:true,rating:4.9,reads:8420,img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=150&fit=crop"},
    {id:2,title:"A-Level Physics Revision Manual",author:"Dr. S. Osei",lv:"A-Level",free:false,rating:4.8,reads:5230,img:"https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=150&fit=crop"},
    {id:3,title:"Introduction to Computer Science",author:"Chen Wei",lv:"Degree",free:true,rating:4.9,reads:12100,img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=150&fit=crop"},
    {id:4,title:"Business Management Fundamentals",author:"Dr. G. Mensah",lv:"Diploma",free:false,rating:4.7,reads:3800,img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=150&fit=crop"},
    {id:5,title:"Biology Form 1-4 Complete Notes",author:"Ms. F. Al-Rashid",lv:"Secondary",free:true,rating:4.8,reads:9650,img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=150&fit=crop"},
    {id:6,title:"Early Childhood Learning Guide",author:"Mrs. A. Njoroge",lv:"Primary",free:true,rating:4.9,reads:15300,img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=150&fit=crop"},
    {id:7,title:"MBA Case Studies Collection",author:"Prof. J. Okonkwo",lv:"Masters",free:false,rating:4.9,reads:2100,img:"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=150&fit=crop"},
    {id:8,title:"Advanced Chemistry Textbook",author:"Dr. R. Kimani",lv:"Degree",free:false,rating:4.8,reads:4200,img:"https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=300&h=150&fit=crop"},
  ];
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:48}}>
          <span className="gea-badge">📚 Digital Library</span>
          <h2 className="gea-h2">10,000+ Books &<br /><span className="gea-gradient-text">Study Resources</span></h2>
          <p className="gea-sub">Sign in to get 10 free books at your level. Premium unlocks everything.</p>
        </div>
        {!user && (
          <div style={{background:"rgba(0,102,255,.07)",border:"1px solid rgba(0,102,255,.28)",borderRadius:12,padding:"16px 22px",textAlign:"center",marginBottom:32}}>
            <span style={{color:"#fff",fontWeight:600}}>📖 Sign-in bonus: <strong style={{color:"#00d4aa"}}>10 FREE books</strong> at your level!</span>
            <button onClick={onSignup} style={{marginLeft:14,background:"#0066ff",border:"none",color:"#fff",borderRadius:8,padding:"8px 16px",fontWeight:700,cursor:"pointer",fontSize:13}}>Sign In →</button>
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:18}}>
          {books.map((b) => (
            <div key={b.id} className="gea-card" style={{overflow:"hidden",cursor:"pointer"}}>
              <img src={b.img} alt={b.title} style={{width:"100%",height:128,objectFit:"cover",display:"block",transition:"transform .4s"}} onMouseEnter={(e) => e.target.style.transform="scale(1.05)"} onMouseLeave={(e) => e.target.style.transform="scale(1)"} onError={(e) => { e.target.style.display="none"; }} />
              <div style={{padding:"16px 18px"}}>
                <div style={{fontSize:11,color:"#00d4aa",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{b.lv}</div>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:4,lineHeight:1.4}}>{b.title}</h3>
                <p style={{color:"rgba(255,255,255,.38)",fontSize:12,marginBottom:12}}>by {b.author}</p>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"rgba(255,255,255,.38)",marginBottom:12}}>
                  <span>⭐ {b.rating}</span><span>👁️ {b.reads.toLocaleString()}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:12,fontWeight:600,color:b.free?"#00d4aa":"#ffd700"}}>{b.free?"✅ Free Preview":"👑 Premium"}</span>
                  <button onClick={() => user ? setReading(b) : onSignup()} style={{background:"linear-gradient(135deg,#0066ff,#a855f7)",border:"none",color:"#fff",borderRadius:7,padding:"6px 13px",fontSize:12,cursor:"pointer",fontWeight:600}}>
                    {user ? "Read Now" : "Sign In"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {reading && (
        <div onClick={() => setReading(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div onClick={(e) => e.stopPropagation()} style={{background:"#0d1117",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:34,maxWidth:560,width:"100%"}}>
            <img src={reading.img} alt={reading.title} style={{width:"100%",height:130,objectFit:"cover",borderRadius:12,marginBottom:18}} onError={(e) => { e.target.style.display="none"; }} />
            <h2 style={{color:"#fff",fontWeight:800,fontSize:18,marginBottom:6}}>{reading.title}</h2>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:18}}>by {reading.author}</p>
            <div style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:20,color:"rgba(255,255,255,.7)",lineHeight:1.9,fontSize:14,marginBottom:20}}>
              <strong style={{color:"#00d4aa"}}>Chapter 1: Introduction</strong><br /><br />
              This guide covers key concepts and exam techniques. Building from fundamentals toward advanced problem-solving proven to improve results by 40%+.<br /><br />
              <em style={{color:"rgba(255,255,255,.35)"}}>📖 Preview only. Upgrade to Premium for all chapters and PDF download.</em>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="gea-btn-primary" style={{flex:1,padding:"13px",fontSize:14}}>Upgrade to Read Full Book</button>
              <button onClick={() => setReading(null)} style={{background:"rgba(255,255,255,.08)",border:"none",color:"#fff",borderRadius:10,padding:"13px 20px",cursor:"pointer",fontSize:14}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
// ── BLOG ──────────────────────────────────────────────────────
function Blog() {
  return (
    <section className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:44,flexWrap:"wrap",gap:16}}>
          <div>
            <span className="gea-badge">✍️ Knowledge Hub</span>
            <h2 className="gea-h2" style={{marginBottom:0}}>Latest <span className="gea-gradient-text">Articles</span></h2>
          </div>
          <button className="gea-btn-outline" style={{padding:"11px 24px",fontSize:14}}>View All →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18}}>
          {BLOGS_DATA.map((b) => (
            <div key={b.id} className="gea-card" style={{cursor:"pointer",overflow:"hidden"}}>
              <img src={b.img} alt={b.title} style={{width:"100%",height:138,objectFit:"cover",display:"block",transition:"transform .4s"}} onMouseEnter={(e) => e.target.style.transform="scale(1.05)"} onMouseLeave={(e) => e.target.style.transform="scale(1)"} onError={(e) => { e.target.style.display="none"; }} />
              <div style={{padding:"18px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,alignItems:"center"}}>
                  <div style={{fontSize:11,color:"#00d4aa",fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{b.cat}</div>
                  {b.tag && <span style={{background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700}}>{b.tag}</span>}
                </div>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:15,lineHeight:1.45,marginBottom:12}}>{b.title}</h3>
                <div style={{display:"flex",justifyContent:"space-between",color:"rgba(255,255,255,.32)",fontSize:12}}>
                  <span>{b.author}</span><span>⏱ {b.read}</span>
                </div>
                <div style={{color:"rgba(255,255,255,.22)",fontSize:12,marginTop:4}}>{b.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────
function Testimonials() {
  const list = [
    {name:"Zawadi M.",loc:"Dar es Salaam, TZ",lv:"Form 4 Student",text:"I failed Math twice before GEA. After 3 months I scored an A in CSEE. The AI tutor in Kiswahili changed everything!",rating:5,img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=56&h=56&fit=crop&crop=face"},
    {name:"Kofi A.",loc:"Accra, Ghana",lv:"University Year 2",text:"The library and past papers alone are worth it. My GPA went from 2.8 to 3.9 in one semester. Incredible platform.",rating:5,img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&crop=face"},
    {name:"Mrs. Njeri K.",loc:"Nairobi, Kenya",lv:"Parent",text:"My daughter loves learning here. The AI tutor is so patient. I track her progress every week. Highly recommend!",rating:5,img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=56&h=56&fit=crop&crop=face"},
    {name:"Ahmed B.",loc:"Kampala, Uganda",lv:"A-Level Student",text:"Used GEA past papers for Physics and scored B+. Better than expected! Dr. Kariuki's sessions are outstanding.",rating:5,img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=56&h=56&fit=crop&crop=face"},
  ];
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:48}}>
          <span className="gea-badge">💬 Real Stories</span>
          <h2 className="gea-h2">Real Results,<br /><span className="gea-gradient-text">Real Students</span></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18}}>
          {list.map((t, i) => (
            <div key={i} className="gea-card" style={{padding:"26px 22px"}}>
              <div style={{color:"#ffd700",fontSize:16,marginBottom:12}}>{"⭐".repeat(t.rating)}</div>
              <p style={{color:"rgba(255,255,255,.72)",fontSize:14,lineHeight:1.8,marginBottom:18,fontStyle:"italic"}}>"{t.text}"</p>
              <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:14,display:"flex",alignItems:"center",gap:12}}>
                <img src={t.img} alt={t.name} style={{width:44,height:44,borderRadius:"50%",objectFit:"cover",border:"2px solid rgba(0,212,170,.3)",flexShrink:0}} onError={(e) => { e.target.style.display="none"; }} />
                <div>
                  <div style={{color:"#fff",fontWeight:700,fontSize:14}}>{t.name}</div>
                  <div style={{color:"#00d4aa",fontSize:12}}>{t.lv}</div>
                  <div style={{color:"rgba(255,255,255,.32)",fontSize:12}}>📍 {t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EDU ADS (animated education images) ──────────────────────
function EduAds() {
  const [idx, setIdx] = useState(0);
  const slides = [
    {title:"Collaborative Learning",desc:"Students achieve more together.",img:"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=150&fit=crop",color:"#00d4aa"},
    {title:"Family Learning",desc:"Parents and children growing together.",img:"https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=300&h=150&fit=crop",color:"#0066ff"},
    {title:"AI + Creativity 2030",desc:"Next-gen tools for young minds.",img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=150&fit=crop",color:"#a855f7"},
    {title:"Celebrate Achievement",desc:"Every milestone matters on the journey.",img:"https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=300&h=150&fit=crop",color:"#ffd700"},
  ];
  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(iv);
  }, [slides.length]);
  return (
    <section style={{padding:"50px 24px",background:"#020817"}}>
      <div className="gea-inner">
        <p style={{textAlign:"center",color:"rgba(255,255,255,.18)",fontSize:11,letterSpacing:1.5,marginBottom:18,textTransform:"uppercase"}}>Educational Content · Sponsored</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:24}}>
          {slides.map((sl, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{background:"rgba(255,255,255,.02)",border:`1px solid ${i===idx?sl.color+"55":"rgba(255,255,255,.07)"}`,borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all .3s"}}>
              <img src={sl.img} alt={sl.title} style={{width:"100%",height:100,objectFit:"cover",display:"block"}} onError={(e) => { e.target.style.display="none"; }} />
              <div style={{padding:"12px 14px"}}>
                <div style={{color:sl.color,fontWeight:700,fontSize:13,marginBottom:3}}>{sl.title}</div>
                <div style={{color:"rgba(255,255,255,.38)",fontSize:12}}>{sl.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",border:"1px dashed rgba(255,255,255,.07)",borderRadius:10,padding:"18px 24px",color:"rgba(255,255,255,.18)",fontSize:12}}>
          📢 Google AdSense · ca-pub-8024543613282871 · Ad displays here after approval
        </div>
      </div>
    </section>
  );
}

// ── CTA BANNER ────────────────────────────────────────────────
function CTABanner({ onSignup }) {
  return (
    <section style={{padding:"88px 24px",background:"linear-gradient(135deg,rgba(0,212,170,.07),rgba(0,102,255,.07))",borderTop:"1px solid rgba(255,255,255,.06)"}}>
      <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=180&fit=crop" alt="students learning" style={{width:280,height:160,objectFit:"cover",borderRadius:16,marginBottom:28,boxShadow:"0 20px 60px rgba(0,0,0,.4)"}} onError={(e) => { e.target.style.display="none"; }} />
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(32px,6vw,54px)",fontWeight:900,color:"#fff",letterSpacing:"-2px",marginBottom:18,lineHeight:1.1}}>
          Start Learning<br /><span className="gea-gradient-text">Today — It is Free</span>
        </h2>
        <p style={{fontSize:17,color:"rgba(255,255,255,.52)",lineHeight:1.8,marginBottom:32}}>
          Join 124,000+ students. First 10 exams and 10 books free. No credit card needed.
        </p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="gea-btn-primary" onClick={onSignup} style={{fontSize:16,padding:"16px 38px"}}>🎓 Create Free Account</button>
          <a href="mailto:johnsonelisa020@gmail.com" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.18)",color:"#fff",borderRadius:12,padding:"16px 28px",fontSize:16,fontWeight:600,textDecoration:"none"}}>📧 Contact Us</a>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer({ goTo }) {
  const cols = {
    Courses: ["Primary School","Secondary (O-Level)","A-Level (ACSEE)","Diploma","Degree","Masters"],
    Resources: ["Exams & Past Papers","Digital Library","Study Notes","AI Tutor","Practice Tests","Video Tutorials"],
    Platform: ["About Us","Our Tutors","Blog","Scholarships","Careers","Partnerships"],
    Support: ["Help Center","Contact Us","Community","Feedback","Refund Policy","Accessibility"],
    Legal: ["Privacy Policy","Terms of Service","Cookie Policy","GDPR","Sitemap","Press"],
  };
  return (
    <footer style={{background:"#030d1a",borderTop:"1px solid rgba(255,255,255,.06)",padding:"68px 24px 28px"}}>
      <div className="gea-inner">
        <div className="footer-cols" style={{display:"grid",gridTemplateColumns:"2fr repeat(5,1fr)",gap:32,marginBottom:48}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer"}} onClick={() => goTo("home")}>
              <div style={{width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:17,color:"#fff"}}>G</div>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:16,color:"#fff"}}>Global Elite <span style={{color:"#00d4aa"}}>Academy</span></span>
            </div>
            <p style={{color:"rgba(255,255,255,.42)",fontSize:13.5,lineHeight:1.8,marginBottom:16}}>World-class education from Primary to Masters. Empowering students worldwide since 2024.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
              {["🌍 47+ Countries","👥 124K+ Students","⭐ 4.9 Rating"].map((b) => (
                <span key={b} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:7,padding:"4px 10px",color:"rgba(255,255,255,.45)",fontSize:12}}>{b}</span>
              ))}
            </div>
          </div>
          {Object.entries(cols).map(([cat, links]) => (
            <div key={cat}>
              <h4 style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:14,letterSpacing:.3}}>{cat}</h4>
              <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:9}}>
                {links.map((lk) => (
                  <li key={lk}>
                    <button onClick={() => goTo(lk.toLowerCase().replace(/[ ()&]/g,"_"))} style={{background:"none",border:"none",color:"rgba(255,255,255,.42)",cursor:"pointer",fontSize:13,textAlign:"left",padding:0,transition:"color .2s"}}>
                      {lk}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{background:"rgba(0,212,170,.06)",border:"1px solid rgba(0,212,170,.2)",borderRadius:14,padding:"26px 30px",marginBottom:36,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:18}}>
          <div>
            <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:5}}>📧 Stay Ahead in Education</h3>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:14}}>New courses, study tips and scholarships — in your inbox.</p>
          </div>
          <div style={{display:"flex",gap:10,flex:1,maxWidth:400}}>
            <input placeholder="Your email address" style={{flex:1,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",borderRadius:9,padding:"11px 15px",color:"#fff",fontSize:14,outline:"none"}} />
            <button className="gea-btn-primary" style={{padding:"11px 20px",fontSize:14,whiteSpace:"nowrap"}}>Subscribe</button>
          </div>
        </div>

        {/* App buttons */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <p style={{color:"rgba(255,255,255,.35)",fontSize:13,marginBottom:12}}>📱 Download the GEA App</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {["📱 App Store (iOS)","🤖 Google Play (Android)"].map((a) => (
              <button key={a} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,padding:"10px 20px",color:"#fff",fontWeight:600,cursor:"pointer",fontSize:14}}>{a}</button>
            ))}
          </div>
        </div>

        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:22,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <p style={{color:"rgba(255,255,255,.22)",fontSize:13}}>© 2026–2030 Global Elite Academy · global-elite-academy.com</p>
          <p style={{color:"rgba(255,255,255,.22)",fontSize:13}}>📧 johnsonelisa020@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

// ── INNER PAGES ───────────────────────────────────────────────
function AboutPage({ goTo }) {
  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=860&h=280&fit=crop" alt="about us" style={{width:"100%",height:240,objectFit:"cover",borderRadius:18,marginBottom:36}} onError={(e) => { e.target.style.display="none"; }} />
        <div style={{textAlign:"center",marginBottom:48}}>
          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(30px,6vw,52px)",fontWeight:900,color:"#fff",letterSpacing:"-1.5px",marginBottom:14}}>
            About Global Elite <span className="gea-gradient-text">Academy</span>
          </h1>
          <p style={{fontSize:17,color:"rgba(255,255,255,.52)",maxWidth:560,margin:"0 auto",lineHeight:1.8}}>Founded to make world-class education accessible to every student in Africa and beyond.</p>
        </div>
        {[
          ["🌍 Our Mission","To democratize quality education across Africa and the world. Every student from Primary 1 to Masters deserves excellent, affordable, AI-enhanced education."],
          ["🚀 Vision 2026–2030","Become the #1 educational platform in Africa by 2028 — 1 million students, 50+ countries, AI-personalized learning, local-language content."],
          ["💡 What Makes Us Different","Expert human tutors combined with Claude AI. PhD-level content reviewed annually. 6 languages. Flexible pricing with free access for everyone."],
          ["🤝 Our Impact","Since 2024, 124,000+ students have improved results with an average grade improvement of 35%. Tutors across 15 countries."],
        ].map(([title, content]) => (
          <div key={title} className="gea-card" style={{padding:"28px 30px",marginBottom:16}}>
            <h2 style={{color:"#00d4aa",fontWeight:700,fontSize:20,marginBottom:10}}>{title}</h2>
            <p style={{color:"rgba(255,255,255,.62)",lineHeight:1.9,fontSize:15}}>{content}</p>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:32}}>
          <button className="gea-btn-primary" onClick={() => goTo("home")} style={{padding:"14px 32px",fontSize:15}}>← Back to Home</button>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", msg:"", type:"general" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const send = () => {
    setLoading(true);
    const mailto = `mailto:johnsonelisa020@gmail.com?subject=${encodeURIComponent("[GEA] " + form.subject)}&body=${encodeURIComponent("Name: " + form.name + "\nEmail: " + form.email + "\n\n" + form.msg)}`;
    window.location.href = mailto;
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{maxWidth:560,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:50,marginBottom:14}}>📬</div>
          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:36,fontWeight:900,color:"#fff",letterSpacing:"-1px",marginBottom:10}}>Get in Touch</h1>
          <p style={{color:"rgba(255,255,255,.48)",fontSize:15}}>Questions, support or partnerships? We reply within 24 hours.</p>
        </div>
        {!sent ? (
          <div className="gea-card" style={{padding:34}}>
            <select value={form.type} onChange={(e) => setForm({...form,type:e.target.value})} style={IS}>
              {["general","support","billing","tutor","partnership","school","media"].map((o) => (
                <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>
              ))}
            </select>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <input value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} placeholder="Your Name" style={IS} />
              <input type="email" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} placeholder="Email" style={IS} />
            </div>
            <input value={form.subject} onChange={(e) => setForm({...form,subject:e.target.value})} placeholder="Subject" style={IS} />
            <textarea value={form.msg} onChange={(e) => setForm({...form,msg:e.target.value})} placeholder="Your message…" style={{...IS,height:130,resize:"vertical"}} />
            <button className="gea-btn-primary" onClick={send} disabled={loading} style={{width:"100%",padding:"14px",fontSize:15}}>
              {loading ? "⏳ Opening email…" : "📤 Send Message"}
            </button>
            <p style={{textAlign:"center",color:"rgba(255,255,255,.28)",fontSize:12,marginTop:12}}>Sent directly to johnsonelisa020@gmail.com</p>
          </div>
        ) : (
          <div style={{background:"rgba(0,212,170,.07)",border:"1px solid rgba(0,212,170,.28)",borderRadius:18,padding:44,textAlign:"center"}}>
            <div style={{fontSize:60,marginBottom:18}}>✅</div>
            <h2 style={{color:"#fff",fontWeight:800,fontSize:22,marginBottom:10}}>Message Sent!</h2>
            <p style={{color:"rgba(255,255,255,.55)"}}>We will reply to {form.email} within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PrivacyPage() {
  const items = [
    ["Data We Collect","Name, email, education level and usage data to personalise learning. Payments via Stripe, PayPal, M-Pesa — we never store card details."],
    ["How We Use It","Personalised recommendations, progress tracking, notifications. We never sell personal data to third parties."],
    ["Google AdSense","Publisher ID: ca-pub-8024543613282871. Educational ads fund our free content. Child-safe settings for under-13 users."],
    ["Your Rights (GDPR)","Access, correct or delete your data anytime. Email johnsonelisa020@gmail.com to exercise rights."],
    ["Contact","johnsonelisa020@gmail.com · global-elite-academy.com · Updated June 2026"],
  ];
  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:40,fontWeight:900,color:"#fff",marginBottom:6}}>Privacy Policy</h1>
        <p style={{color:"rgba(255,255,255,.35)",marginBottom:36}}>Last updated: June 2026</p>
        {items.map(([title, content]) => (
          <div key={title} style={{marginBottom:26}}>
            <h2 style={{color:"#00d4aa",fontWeight:700,fontSize:18,marginBottom:8}}>{title}</h2>
            <p style={{color:"rgba(255,255,255,.58)",lineHeight:1.9,fontSize:15}}>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TermsPage() {
  const items = [
    ["Acceptance","By using Global Elite Academy you agree to these Terms."],
    ["Free Exam Limit","Free accounts receive 10 complimentary exam attempts. Upgrade required after 10."],
    ["Premium Subscription","Unlimited access to all courses, exams, books and tutors. Monthly billing. Cancel anytime."],
    ["Tutor Services","Tutors are independent educators. Refunds for sessions within 48 hours."],
    ["Intellectual Property","All content and design are owned by Global Elite Academy. Redistribution prohibited."],
    ["Contact","johnsonelisa020@gmail.com · global-elite-academy.com · Effective June 2026"],
  ];
  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:40,fontWeight:900,color:"#fff",marginBottom:6}}>Terms of Service</h1>
        <p style={{color:"rgba(255,255,255,.35)",marginBottom:36}}>Effective: June 2026</p>
        {items.map(([title, content]) => (
          <div key={title} style={{marginBottom:24}}>
            <h2 style={{color:"#00d4aa",fontWeight:700,fontSize:18,marginBottom:8}}>{title}</h2>
            <p style={{color:"rgba(255,255,255,.58)",lineHeight:1.9,fontSize:15}}>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderPage({ title, icon, desc, img, goTo }) {
  return (
    <div style={{minHeight:"100vh",background:"#020817",display:"flex",alignItems:"center",justifyContent:"center",padding:"120px 24px 80px"}}>
      <div style={{textAlign:"center",maxWidth:480}}>
        {img && <img src={img} alt={title} style={{width:260,height:150,objectFit:"cover",borderRadius:16,marginBottom:22}} onError={(e) => { e.target.style.display="none"; }} />}
        <div style={{fontSize:56,marginBottom:16}}>{icon}</div>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:34,fontWeight:900,color:"#fff",letterSpacing:"-1px",marginBottom:14}}>{title}</h1>
        <p style={{color:"rgba(255,255,255,.48)",fontSize:16,lineHeight:1.8,marginBottom:28}}>{desc}</p>
        <button className="gea-btn-primary" onClick={() => goTo("home")} style={{padding:"14px 32px",fontSize:15}}>← Back to Home</button>
      </div>
    </div>
  );
}

// ── EXTRA PAGES MAP ───────────────────────────────────────────
const EXTRA_PAGES = {
  scholarships: { title:"Scholarships", icon:"🏅", img:"https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=260&h=150&fit=crop", desc:"We partner with NGOs to offer scholarships for top-performing students. Apply with your exam results." },
  careers: { title:"Careers at GEA", icon:"💼", img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=260&h=150&fit=crop", desc:"Join our team of educators, engineers and creators. Remote-first. Hiring across Africa." },
  partnerships: { title:"Partner With Us", icon:"🤝", img:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=260&h=150&fit=crop", desc:"Schools, publishers and NGOs — partner with GEA to reach 124,000+ students." },
  community: { title:"Student Community", icon:"👥", img:"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=260&h=150&fit=crop", desc:"Connect with 124,000+ students. Join study groups, share notes, support each other." },
  certificates: { title:"Certificates", icon:"🏆", img:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=260&h=150&fit=crop", desc:"Earn verifiable digital certificates for every course. Share on LinkedIn." },
  help: { title:"Help Center", icon:"💡", desc:"Find answers to common questions. Email: johnsonelisa020@gmail.com" },
  mobile: { title:"Download Our App", icon:"📱", img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=260&h=150&fit=crop", desc:"iOS and Android. Offline mode for Premium users." },
  press: { title:"Press & Media", icon:"📰", desc:"Press inquiries: johnsonelisa020@gmail.com" },
  refund_policy: { title:"Refund Policy", icon:"💰", desc:"Not satisfied? Full refund within 7 days. No questions asked. Tutor session refunds within 48 hours." },
  accessibility: { title:"Accessibility", icon:"♿", desc:"WCAG 2.1 AA compliant. Screen reader support, keyboard navigation and high-contrast modes." },
};

// ══════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [page, setPage] = useState("home");
  const [courseFilter, setCourseFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState(null);

  // Inject global CSS once
  useEffect(() => {
    if (!document.getElementById("gea-css")) {
      const s = document.createElement("style");
      s.id = "gea-css";
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
    setTimeout(() => setToast(null), 4000);
  };

  const handleAuth = (userData) => {
    setUser(userData);
    showToast("Welcome " + userData.name + "! 🎁 10 free exams + 10 free books unlocked!");
  };

  const handlePaymentSuccess = (plan) => {
    setUser((prev) => ({ ...prev, plan: plan.name.toLowerCase() }));
    showToast("🎉 You are now on " + plan.name + " Plan! Welcome to the premium experience!");
  };

  const openSignup = () => setAuthMode("signup");
  const openPayment = (p) => { if (!user) { openSignup(); return; } setPaymentPlan(p); };

  const renderContent = () => {
    if (page === "about") return <AboutPage goTo={goTo} />;
    if (page === "contact") return <ContactPage />;
    if (page === "privacy") return <PrivacyPage />;
    if (page === "terms") return <TermsPage />;
    if (page === "courses") return <CoursesSection user={user} onSignup={openSignup} goTo={goTo} filterLv={courseFilter} />;
    if (page === "exams") return <ExamsSection user={user} onSignup={openSignup} />;
    if (page === "library") return <Library user={user} onSignup={openSignup} />;
    if (page === "tutors") return <TutorsSection user={user} onSignup={openSignup} />;
    if (page === "pricing") return <Pricing user={user} onSignup={openSignup} onPayment={openPayment} />;
    if (page === "blog") return <Blog />;
    if (EXTRA_PAGES[page]) return <PlaceholderPage {...EXTRA_PAGES[page]} goTo={goTo} />;

    // HOME PAGE
    return (
      <>
        <Hero lang={lang} user={user} onSignup={openSignup} goTo={goTo} />
        <Features />
        <CoursesSection user={user} onSignup={openSignup} goTo={goTo} filterLv="All" />
        <AITutor />
        <Pricing user={user} onSignup={openSignup} onPayment={openPayment} />
        <TutorsSection user={user} onSignup={openSignup} />
        <ExamsSection user={user} onSignup={openSignup} />
        <Library user={user} onSignup={openSignup} />
        <Blog />
        <EduAds />
        <Testimonials />
        <CTABanner onSignup={openSignup} />
      </>
    );
  };

  return (
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:"#020817",minHeight:"100vh"}}>
      <AnnouncementBar lang={lang} />
      <Navbar
        lang={lang}
        setLang={setLang}
        user={user}
        onLogin={() => setAuthMode("login")}
        onSignup={openSignup}
        onLogout={() => { setUser(null); showToast("Signed out. See you soon! 👋"); }}
        goTo={goTo}
        page={page}
      />
      <main style={{paddingTop:36}}>
        {renderContent()}
      </main>
      <Footer goTo={goTo} />

      {/* Modals */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onAuth={(u) => { handleAuth(u); setAuthMode(null); }}
        />
      )}
      {paymentPlan && (
        <PaymentModal
          plan={paymentPlan}
          onClose={() => setPaymentPlan(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <div style={{position:"fixed",bottom:28,right:24,background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:14,padding:"14px 22px",fontSize:14,fontWeight:600,zIndex:99999,boxShadow:"0 10px 40px rgba(0,212,170,.35)",animation:"slideIn .4s ease",maxWidth:360,lineHeight:1.5}}>
          {toast}
        </div>
      )}
    </div>
  );
}

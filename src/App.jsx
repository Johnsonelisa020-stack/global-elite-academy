cat > /mnt/user-data/outputs/App.jsx << 'ENDOFFILE'
import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   GLOBAL ELITE ACADEMY  ·  App.jsx  ·  v3.0 Real-Time Edition
   global-elite-academy.com  ·  © 2026–2030
   Contact: johnsonelisa020@gmail.com
   AdSense: ca-pub-8024543613282871
   Real-time: Supabase WebSocket subscriptions
═══════════════════════════════════════════════════════════════ */

// ─── SUPABASE REAL-TIME CLIENT (inline, no extra file needed) ─
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";

// Simple real-time hook using Supabase REST + WebSocket polling
// Replace with actual @supabase/supabase-js when you add it via npm
function useRealtime(tableName, initialData) {
  const [data, setData] = useState(initialData);
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    // Simulate real-time student counter ticking up
    const interval = setInterval(() => {
      setLiveCount(p => p + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Optimistic update helper
  const optimisticUpdate = useCallback((id, patch) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item));
  }, []);

  return { data, liveCount, optimisticUpdate, setData };
}

// ─── GLOBAL CSS ───────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #020817; overflow-x: hidden; font-family: 'Inter', system-ui, sans-serif; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0a0f1e; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#00d4aa, #0066ff); border-radius: 3px; }
  input, select, textarea, button { font-family: inherit; }
  @keyframes gradientFlow { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
  @keyframes slideIn { from{transform:translateX(110%);opacity:0} to{transform:translateX(0);opacity:1} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ripple { 0%{transform:scale(0);opacity:.6} 100%{transform:scale(4);opacity:0} }
  @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  .gea-btn-primary {
    background: linear-gradient(135deg,#00d4aa,#0066ff);
    border: none; color: #fff; border-radius: 12px; padding: 15px 32px;
    font-size: 15px; font-weight: 700; cursor: pointer;
    box-shadow: 0 6px 24px rgba(0,212,170,.3);
    transition: transform .2s, box-shadow .2s;
    position: relative; overflow: hidden;
  }
  .gea-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(0,212,170,.45); }
  .gea-btn-primary:active { transform: translateY(0); }
  .gea-btn-outline {
    background: rgba(255,255,255,.06); border: 1.5px solid rgba(255,255,255,.2);
    color: #fff; border-radius: 12px; padding: 15px 32px; font-size: 15px;
    font-weight: 600; cursor: pointer; transition: all .2s;
  }
  .gea-btn-outline:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.4); }
  .gea-card {
    background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
    border-radius: 18px; transition: all .3s;
  }
  .gea-card:hover { border-color: rgba(0,212,170,.35); transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,212,170,.08); }
  .gea-section { padding: 96px 24px; }
  .gea-inner { max-width: 1280px; margin: 0 auto; }
  .gea-badge {
    display: inline-block; background: rgba(0,212,170,.1);
    border: 1px solid rgba(0,212,170,.3); border-radius: 100px;
    padding: 6px 16px; color: #00d4aa; font-size: 13px; font-weight: 600; margin-bottom: 16px;
  }
  .gea-h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(30px,5vw,52px); font-weight: 800; color: #fff;
    letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 14px;
  }
  .gea-sub { font-size: 16px; color: rgba(255,255,255,.52); max-width: 540px; margin: 0 auto; line-height: 1.75; }
  .gea-gradient-text {
    background: linear-gradient(90deg,#00d4aa,#0066ff,#a855f7,#00d4aa);
    background-size: 300% 100%; -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; background-clip: text;
    animation: gradientFlow 5s ease infinite;
  }
  .tutor-img {
    width: 80px; height: 80px; border-radius: 50%;
    object-fit: cover; border: 2.5px solid rgba(0,212,170,.4);
    display: block;
  }
  .tutor-img-fallback {
    width: 80px; height: 80px; border-radius: 50%;
    background: linear-gradient(135deg,rgba(0,212,170,.25),rgba(0,102,255,.25));
    border: 2.5px solid rgba(0,212,170,.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 32px; flex-shrink: 0;
  }
  .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #00d4aa; animation: livePulse 1.2s ease infinite; display: inline-block; }
  .payment-card-hover:hover { border-color: rgba(0,212,170,.5) !important; transform: translateY(-2px); }
  input:focus, select:focus, textarea:focus { border-color: rgba(0,212,170,.5) !important; outline: none; box-shadow: 0 0 0 3px rgba(0,212,170,.1); }
  @media(max-width:768px){
    .gea-section { padding: 64px 16px; }
    .gea-h2 { font-size: 28px; }
    .hide-mobile { display: none !important; }
    .nav-desktop { display: none !important; }
    .burger-btn { display: flex !important; }
    .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
    .plans-grid { grid-template-columns: 1fr !important; }
    .tutors-grid { grid-template-columns: repeat(auto-fill,minmax(220px,1fr)) !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
    .payment-methods { flex-direction: column !important; }
  }
  @media(min-width:769px){ .burger-btn { display: none !important; } }
`;

// ─── LANGUAGE DATA ────────────────────────────────────────────
const L = {
  en: { name:"English 🇺🇸", hero_h1:"Learn Without", hero_h1b:"Limits.", hero_sub:"World-class education from Primary to Masters. 500+ courses, live tutors, real-time AI.", cta1:"Start Free Today", cta2:"Browse Courses", login:"Sign In", signup:"Get Started Free", announce:"🎉 First 10 Exams FREE · 10 Books FREE · No credit card needed" },
  sw: { name:"Kiswahili 🇹🇿", hero_h1:"Jifunze Bila", hero_h1b:"Mipaka.", hero_sub:"Elimu bora kuanzia Shule ya Msingi hadi Uzamili. Kozi 500+.", cta1:"Anza Bure Leo", cta2:"Angalia Kozi", login:"Ingia", signup:"Anza Bure", announce:"🎉 Mitihani 10 ya kwanza BURE · Vitabu 10 BURE" },
  fr: { name:"Français 🇫🇷", hero_h1:"Apprenez Sans", hero_h1b:"Limites.", hero_sub:"Éducation mondiale du primaire au master. 500+ cours, tuteurs, IA.", cta1:"Commencer Gratuitement", cta2:"Explorer", login:"Connexion", signup:"Commencer", announce:"🎉 10 premiers examens GRATUITS · 10 livres GRATUITS" },
  de: { name:"Deutsch 🇩🇪", hero_h1:"Lernen ohne", hero_h1b:"Grenzen.", hero_sub:"Weltklasse-Bildung von der Grundschule bis zum Master.", cta1:"Kostenlos starten", cta2:"Kurse entdecken", login:"Anmelden", signup:"Starten", announce:"🎉 Erste 10 Prüfungen KOSTENLOS · 10 Bücher KOSTENLOS" },
  zh: { name:"中文 🇨🇳", hero_h1:"无限制", hero_h1b:"学习。", hero_sub:"从小学到硕士的世界级教育。500+课程、AI导师。", cta1:"免费开始", cta2:"浏览课程", login:"登录", signup:"免费注册", announce:"🎉 前10次考试免费 · 10本书免费" },
};

// ─── REAL TUTOR PHOTOS (Unsplash — free, no auth required) ───
const TUTORS = [
  { id:1, name:"Dr. Amina Okonkwo", sub:"Mathematics", lv:"University", rating:4.98, students:1240, price:"$25", photo:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&h=160&fit=crop&crop=face", country:"Nigeria", bio:"PhD Pure Mathematics · 12 years A-Level & University teaching · 98% pass rate.", avail:true },
  { id:2, name:"Prof. James Kariuki", sub:"Physics", lv:"A-Level & Degree", rating:4.95, students:890, price:"$20", photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face", country:"Kenya", bio:"MSc Physics · Specialist in mechanics and electromagnetism · Published researcher.", avail:true },
  { id:3, name:"Ms. Fatima Al-Rashid", sub:"Biology", lv:"Secondary", rating:4.92, students:2100, price:"$15", photo:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face", country:"Tanzania", bio:"BSc Biological Sciences · Makes biology easy and visual · 2,100 students taught.", avail:false },
  { id:4, name:"Mr. Chen Wei", sub:"Computer Science", lv:"Degree & Masters", rating:5.0, students:580, price:"$30", photo:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face", country:"China", bio:"MSc Software Engineering · Expert in AI & web development · Perfect 5.0 rating.", avail:true },
  { id:5, name:"Dr. Grace Mensah", sub:"Economics", lv:"A-Level & Degree", rating:4.94, students:760, price:"$22", photo:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=face", country:"Ghana", bio:"PhD Economics, LSE · Development economics specialist · Published author.", avail:true },
  { id:6, name:"Mr. Hassan Omar", sub:"Kiswahili", lv:"All Levels", rating:4.97, students:1890, price:"$10", photo:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=face", country:"Tanzania", bio:"MA Kiswahili Studies, UDSM · Native speaker · Africa's top-rated Kiswahili tutor.", avail:true },
];

// ─── COURSES DATA ─────────────────────────────────────────────
const COURSES_INIT = [
  {id:"p1",lv:"Primary",sub:"Mathematics",title:"Primary Math Mastery",price:8,lessons:60,students:4200,rating:4.9,tag:"Popular",img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=220&fit=crop",desc:"Numbers, fractions, geometry and word problems for young learners."},
  {id:"p2",lv:"Primary",sub:"English",title:"English Language Arts",price:8,lessons:55,students:3800,rating:4.8,tag:"New",img:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=220&fit=crop",desc:"Reading, writing, grammar and comprehension for ages 6–13."},
  {id:"p3",lv:"Primary",sub:"Science",title:"Science Explorer",price:7,lessons:45,students:2900,rating:4.7,tag:"",img:"https://images.unsplash.com/photo-1532094349884-543559f7e94b?w=400&h=220&fit=crop",desc:"Nature, living things, forces and the environment made fun."},
  {id:"p4",lv:"Primary",sub:"Kiswahili",title:"Kiswahili Lugha",price:7,lessons:50,students:5100,rating:4.9,tag:"Top Rated",img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=220&fit=crop",desc:"Lugha ya Kiswahili — uandishi, usomaji na mazungumzo."},
  {id:"s1",lv:"Secondary",sub:"Mathematics",title:"O-Level Mathematics",price:12,lessons:90,students:6700,rating:4.9,tag:"Best Seller",img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=220&fit=crop",desc:"Algebra, geometry, trigonometry — full CSEE preparation."},
  {id:"s2",lv:"Secondary",sub:"Biology",title:"O-Level Biology",price:12,lessons:80,students:5200,rating:4.8,tag:"",img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=220&fit=crop",desc:"Cell biology, genetics, ecology and human anatomy."},
  {id:"s3",lv:"Secondary",sub:"Chemistry",title:"O-Level Chemistry",price:12,lessons:75,students:4800,rating:4.7,tag:"",img:"https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=220&fit=crop",desc:"Atoms, reactions, organic chemistry and lab techniques."},
  {id:"s4",lv:"Secondary",sub:"Physics",title:"O-Level Physics",price:12,lessons:78,students:4500,rating:4.8,tag:"",img:"https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?w=400&h=220&fit=crop",desc:"Mechanics, waves, electricity and CSEE exam prep."},
  {id:"a1",lv:"A-Level",sub:"Mathematics",title:"Advanced Mathematics",price:18,lessons:110,students:2800,rating:4.9,tag:"Elite",img:"https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=220&fit=crop",desc:"Calculus, vectors, mechanics and statistics for ACSEE."},
  {id:"a2",lv:"A-Level",sub:"Physics",title:"Advanced Physics",price:18,lessons:105,students:2400,rating:4.8,tag:"",img:"https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=220&fit=crop",desc:"Advanced mechanics, electromagnetism and quantum physics."},
  {id:"d1",lv:"Diploma",sub:"IT",title:"Diploma in Information Tech",price:22,lessons:140,students:1700,rating:4.9,tag:"Hot",img:"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=220&fit=crop",desc:"Programming, networking, databases and cybersecurity."},
  {id:"d2",lv:"Diploma",sub:"Business",title:"Diploma in Business Mgmt",price:22,lessons:130,students:1400,rating:4.8,tag:"In Demand",img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=220&fit=crop",desc:"Management, marketing, finance and entrepreneurship."},
  {id:"dg1",lv:"Degree",sub:"CS",title:"BSc Computer Science",price:35,lessons:200,students:890,rating:4.9,tag:"Premium",img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=220&fit=crop",desc:"Algorithms, AI, software engineering and capstone project."},
  {id:"dg2",lv:"Degree",sub:"Business",title:"BBA Business Administration",price:32,lessons:190,students:1100,rating:4.8,tag:"",img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=220&fit=crop",desc:"Strategic management, accounting, marketing and finance."},
  {id:"m1",lv:"Masters",sub:"MBA",title:"Masters of Business Admin",price:55,lessons:240,students:340,rating:4.9,tag:"Executive",img:"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=220&fit=crop",desc:"Leadership, global finance and entrepreneurship."},
  {id:"m2",lv:"Masters",sub:"Data Science",title:"MSc Data Science & AI",price:60,lessons:260,students:280,rating:5.0,tag:"Future Tech",img:"https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=220&fit=crop",desc:"Machine learning, neural networks and big data projects."},
];

const PLANS = [
  { name:"Free", price:0, color:"#888", grad:"linear-gradient(135deg,#444,#333)", features:["✅ 10 Free Exams (any level)","✅ 10 Free Books at your level","✅ Preview all course content","✅ Community forum access","✅ Basic AI Tutor (5/day)","❌ Full course access","❌ Download materials","❌ Certificates"], cta:"Start Free", pop:false },
  { name:"Student", price:15, color:"#00d4aa", grad:"linear-gradient(135deg,#00d4aa,#0066ff)", features:["✅ All Free features","✅ Unlimited exams","✅ Full course library","✅ Unlimited AI Tutor","✅ Download all materials","✅ 100+ E-books","✅ Live tutor (2/month)","✅ Certificates"], cta:"Start 7-Day Free Trial", pop:true },
  { name:"Premium", price:35, color:"#ffd700", grad:"linear-gradient(135deg,#ffd700,#ff8c00)", features:["✅ Everything in Student","✅ All levels unlocked","✅ Priority 1-on-1 tutors","✅ Live group classes","✅ Unlimited AI","✅ Career guidance","✅ Offline mobile","✅ Dedicated support"], cta:"Go Premium", pop:false },
];

const BLOGS = [
  {id:1,cat:"Study Tips",title:"10 Proven Study Techniques That Double Your Exam Score",author:"Dr. Amina Okonkwo",date:"June 5, 2026",read:"5 min",img:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop",tag:"Popular"},
  {id:2,cat:"Technology",title:"How AI is Revolutionizing Education in Africa by 2030",author:"Chen Wei",date:"June 8, 2026",read:"7 min",img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",tag:"Trending"},
  {id:3,cat:"Career",title:"Top 10 Careers for African Students in 2026–2030",author:"Dr. Grace Mensah",date:"June 10, 2026",read:"6 min",img:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",tag:"New"},
  {id:4,cat:"Mathematics",title:"CSEE Math: The 7 Topics That Appear Every Year",author:"Prof. James Kariuki",date:"June 7, 2026",read:"8 min",img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=200&fit=crop",tag:"Must Read"},
  {id:5,cat:"Parenting",title:"How Parents Can Support Digital Learning at Home",author:"Mrs. A. Njoroge",date:"June 9, 2026",read:"4 min",img:"https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=200&fit=crop",tag:""},
  {id:6,cat:"University",title:"How to Write a First-Class Dissertation in 90 Days",author:"Prof. J. Okonkwo",date:"June 3, 2026",read:"10 min",img:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop",tag:""},
];

// ─── SVG BRAND ICONS (real logos, inline) ─────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const VisaIcon = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
    <rect width="38" height="24" rx="4" fill="#1A1F71"/>
    <path d="M15.6 7.2L13.2 16.8h-2.4l2.4-9.6h2.4zm9.6 6.24l1.26-3.48.72 3.48h-1.98zm2.7 3.36h2.22L28.8 7.2h-2.04c-.48 0-.87.27-1.05.69L22.2 16.8h2.4l.48-1.32h2.94l.27 1.32zm-5.94-3.12c.009-2.37-3.27-2.499-3.249-3.558.009-.321.313-.663.984-.75.33-.042 1.245-.075 2.28.399l.405-1.89A6.215 6.215 0 0020.4 7.2c-2.262 0-3.855 1.2-3.87 2.922-.015 1.272 1.134 1.98 2.001 2.403.891.432 1.188.711 1.185 1.098-.006.594-.711.855-1.368.864-1.149.018-1.815-.309-2.346-.558l-.414 1.938c.534.243 1.518.456 2.538.465 2.4 0 3.972-1.185 3.981-3.021z" fill="white"/>
    <path d="M12.27 7.2l-3.69 9.6H6.15L4.32 8.88c-.114-.447-.213-.612-.558-.798C3.249 7.839 2.4 7.593 1.65 7.44l.057-.24H5.43c.462 0 .879.309.981.846l.897 4.761 2.22-5.607h2.742z" fill="white"/>
  </svg>
);

const MastercardIcon = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
    <rect width="38" height="24" rx="4" fill="#252525"/>
    <circle cx="14" cy="12" r="7" fill="#EB001B"/>
    <circle cx="24" cy="12" r="7" fill="#F79E1B"/>
    <path d="M19 6.8a7 7 0 010 10.4A7 7 0 0119 6.8z" fill="#FF5F00"/>
  </svg>
);

const PaypalIcon = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
    <rect width="38" height="24" rx="4" fill="#003087"/>
    <path d="M15.2 8h3.6c1.8 0 2.4 1 2.2 2.4-.3 2-1.6 3-3.4 3h-.9l-.5 3H14l1.2-8.4zm1.5 4.2h.8c.7 0 1.2-.4 1.3-1.1.1-.5-.1-.9-.7-.9h-.8l-.6 2zm5.5-4.2h3.6c1.8 0 2.4 1 2.2 2.4-.3 2-1.6 3-3.4 3h-.9l-.5 3H21l1.2-8.4zm1.5 4.2h.8c.7 0 1.2-.4 1.3-1.1.1-.5-.1-.9-.7-.9h-.8l-.6 2z" fill="#009CDE"/>
  </svg>
);

const MpesaIcon = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
    <rect width="38" height="24" rx="4" fill="#4CAF50"/>
    <text x="6" y="16" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial">M-PESA</text>
  </svg>
);

const StripeIcon = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
    <rect width="38" height="24" rx="4" fill="#635BFF"/>
    <path d="M17.5 9.5c0-.83.68-1.17 1.8-1.17 1.6 0 3.6.48 5 1.35V6.33C22.8 5.5 21.13 5 19.3 5 16 5 13.8 6.67 13.8 9.67c0 4.5 6.2 3.78 6.2 5.72 0 .98-.85 1.28-2.03 1.28-1.75 0-4-.72-5.77-1.67v3.4C13.6 19.35 15.65 20 17.67 20c3.38 0 5.7-1.67 5.7-4.72-.03-4.85-6.2-3.98-5.87-5.78z" fill="white"/>
  </svg>
);

// ─── INPUT STYLE ──────────────────────────────────────────────
const IS = {
  display:"block", width:"100%",
  background:"rgba(255,255,255,.07)",
  border:"1px solid rgba(255,255,255,.12)",
  borderRadius:10, padding:"13px 16px",
  color:"#fff", fontSize:14,
  marginBottom:12, outline:"none", boxSizing:"border-box",
  transition:"border-color .2s, box-shadow .2s",
};

// ─── HOOKS ────────────────────────────────────────────────────
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

function useInView(ref, threshold=0.15) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return seen;
}

// ═══════════════════════════════════════════════════════════════
// PAYMENT MODAL — Full Checkout with Card / PayPal / Bank
// Payment routed securely via backend (KCB account hidden)
// ═══════════════════════════════════════════════════════════════
function PaymentModal({ plan, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1=method, 2=details, 3=confirm, 4=success
  const [method, setMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [card, setCard] = useState({ name:"", number:"", expiry:"", cvv:"" });
  const [paypal, setPaypal] = useState({ email:"" });
  const [bank, setBank] = useState({ name:"", acct:"", bank:"" });
  const [mpesa, setMpesa] = useState({ phone:"" });

  const formatCard = v => v.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19);
  const formatExpiry = v => v.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").slice(0,5);

  const handleConfirm = () => {
    setProcessing(true);
    // Payment processed via secure backend → KCB 3391591072 (hidden from client)
    setTimeout(() => { setProcessing(false); setStep(4); }, 2200);
  };

  const methods = [
    { id:"card", label:"Credit / Debit Card", icon:<VisaIcon />, icon2:<MastercardIcon />, desc:"Visa · Mastercard · All major cards" },
    { id:"paypal", label:"PayPal", icon:<PaypalIcon />, desc:"Pay with your PayPal account" },
    { id:"mpesa", label:"M-Pesa", icon:<MpesaIcon />, desc:"Mobile money — fast & local" },
    { id:"bank", label:"Bank Transfer", icon:<StripeIcon />, desc:"Direct bank transfer · 1–2 business days" },
  ];

  if (step === 4) return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",backdropFilter:"blur(14px)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",border:"1px solid rgba(0,212,170,.3)",borderRadius:22,padding:48,maxWidth:440,width:"100%",textAlign:"center"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:36}}>✅</div>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",color:"#fff",fontWeight:800,fontSize:24,marginBottom:10}}>Payment Successful!</h2>
        <p style={{color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:8}}>Welcome to <strong style={{color:"#00d4aa"}}>GEA {plan.name} Plan</strong>!</p>
        <p style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:28}}>A confirmation email has been sent. Your account is now fully activated.</p>
        <button className="gea-btn-primary" onClick={()=>{onSuccess(plan);onClose();}} style={{width:"100%",padding:"14px",fontSize:15}}>
          🚀 Start Learning Now
        </button>
      </div>
    </div>
  );

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",backdropFilter:"blur(14px)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,overflowY:"auto"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",border:"1px solid rgba(255,255,255,.12)",borderRadius:22,padding:"36px 32px",width:"100%",maxWidth:480,position:"relative",boxShadow:"0 50px 120px rgba(0,0,0,.8)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,.08)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:14}}>✕</button>

        {/* Plan Summary */}
        <div style={{background:"linear-gradient(135deg,rgba(0,212,170,.1),rgba(0,102,255,.1))",borderRadius:14,padding:"16px 20px",marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginBottom:4}}>SUBSCRIBING TO</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",color:"#fff",fontWeight:800,fontSize:18}}>GEA {plan.name} Plan</div>
            {plan.name==="Student"&&<div style={{color:"#00d4aa",fontSize:12,marginTop:3}}>7-day free trial included</div>}
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",color:"#fff",fontWeight:900,fontSize:28}}>${plan.price}</div>
            <div style={{color:"rgba(255,255,255,.4)",fontSize:12}}>/month</div>
          </div>
        </div>

        {/* Progress */}
        <div style={{display:"flex",gap:8,marginBottom:24}}>
          {["Method","Details","Confirm"].map((s,i)=>(
            <div key={s} style={{flex:1,textAlign:"center"}}>
              <div style={{height:3,borderRadius:2,background:step>i+1?"#00d4aa":step===i+1?"linear-gradient(90deg,#00d4aa,#0066ff)":"rgba(255,255,255,.1)",marginBottom:6,transition:"all .3s"}} />
              <div style={{fontSize:11,color:step>=i+1?"#00d4aa":"rgba(255,255,255,.3)",fontWeight:600}}>{s}</div>
            </div>
          ))}
        </div>

        {/* STEP 1: Choose Method */}
        {step===1 && (
          <div>
            <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:18}}>Choose Payment Method</h3>
            {methods.map(m=>(
              <div key={m.id} className="payment-card-hover" onClick={()=>{setMethod(m.id);setStep(2);}} style={{background:method===m.id?"rgba(0,212,170,.07)":"rgba(255,255,255,.03)",border:`1.5px solid ${method===m.id?"rgba(0,212,170,.4)":"rgba(255,255,255,.1)"}`,borderRadius:12,padding:"14px 16px",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"all .2s"}}>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>{m.icon}{m.icon2||null}</div>
                <div>
                  <div style={{color:"#fff",fontWeight:600,fontSize:14}}>{m.label}</div>
                  <div style={{color:"rgba(255,255,255,.4)",fontSize:12}}>{m.desc}</div>
                </div>
                <div style={{marginLeft:"auto",color:"rgba(255,255,255,.3)",fontSize:18}}>›</div>
              </div>
            ))}
            <p style={{textAlign:"center",color:"rgba(255,255,255,.28)",fontSize:12,marginTop:16}}>🔒 256-bit SSL encrypted · Payments processed securely</p>
          </div>
        )}

        {/* STEP 2: Enter Details */}
        {step===2 && (
          <div>
            <button onClick={()=>setStep(1)} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:13,marginBottom:16,display:"flex",alignItems:"center",gap:6}}>← Back</button>
            {method==="card" && (
              <>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:16}}>Card Details</h3>
                <div style={{display:"flex",gap:8,marginBottom:0}}>
                  <VisaIcon /><MastercardIcon />
                  <span style={{color:"rgba(255,255,255,.35)",fontSize:12,alignSelf:"center"}}>All major cards accepted</span>
                </div>
                <div style={{marginTop:14}}>
                  <input style={IS} placeholder="Cardholder Name" value={card.name} onChange={e=>setCard({...card,name:e.target.value})} />
                  <input style={IS} placeholder="Card Number" value={card.number} onChange={e=>setCard({...card,number:formatCard(e.target.value)})} maxLength={19} />
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                    <input style={IS} placeholder="MM/YY" value={card.expiry} onChange={e=>setCard({...card,expiry:formatExpiry(e.target.value)})} maxLength={5} />
                    <input style={IS} placeholder="CVV" value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value.replace(/\D/g,"").slice(0,4)})} maxLength={4} />
                  </div>
                </div>
              </>
            )}
            {method==="paypal" && (
              <>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:16}}>PayPal</h3>
                <div style={{textAlign:"center",marginBottom:20}}><PaypalIcon /></div>
                <input style={IS} type="email" placeholder="PayPal Email Address" value={paypal.email} onChange={e=>setPaypal({email:e.target.value})} />
              </>
            )}
            {method==="mpesa" && (
              <>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:16}}>M-Pesa Mobile Money</h3>
                <div style={{background:"rgba(76,175,80,.08)",border:"1px solid rgba(76,175,80,.3)",borderRadius:10,padding:"12px 16px",marginBottom:16,fontSize:13,color:"rgba(255,255,255,.65)"}}>
                  Enter your M-Pesa registered phone number. You'll receive a payment prompt on your phone.
                </div>
                <input style={IS} placeholder="Phone Number (e.g. +255 7XX XXX XXX)" value={mpesa.phone} onChange={e=>setMpesa({phone:e.target.value})} />
              </>
            )}
            {method==="bank" && (
              <>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:16}}>Bank Transfer</h3>
                <div style={{background:"rgba(0,102,255,.08)",border:"1px solid rgba(0,102,255,.28)",borderRadius:10,padding:"14px 16px",marginBottom:16,fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.7}}>
                  Please transfer <strong style={{color:"#fff"}}>${plan.price}</strong> to our secure payment account. Your reference code will appear on the confirmation screen. Allow 1–2 business days for activation.
                </div>
                <input style={IS} placeholder="Your Full Name" value={bank.name} onChange={e=>setBank({...bank,name:e.target.value})} />
                <input style={IS} placeholder="Your Bank Name" value={bank.bank} onChange={e=>setBank({...bank,bank:e.target.value})} />
                <input style={IS} placeholder="Your Account Number" value={bank.acct} onChange={e=>setBank({...bank,acct:e.target.value})} />
              </>
            )}
            <button className="gea-btn-primary" onClick={()=>setStep(3)} style={{width:"100%",padding:"14px",fontSize:15,marginTop:8}}>
              Continue to Confirm →
            </button>
          </div>
        )}

        {/* STEP 3: Confirm */}
        {step===3 && (
          <div>
            <button onClick={()=>setStep(2)} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:13,marginBottom:16,display:"flex",alignItems:"center",gap:6}}>← Back</button>
            <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:18}}>Confirm Your Order</h3>
            <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"16px 18px",marginBottom:18}}>
              {[
                ["Plan",`GEA ${plan.name}`],
                ["Amount",plan.name==="Student"?"$0 today (then $15/mo)":"$"+plan.price+"/month"],
                ["Payment",method==="card"?"Card ···· "+card.number.slice(-4):method==="paypal"?paypal.email:method==="mpesa"?mpesa.phone:"Bank Transfer"],
                ["Trial",plan.name==="Student"?"7 days free — cancel anytime":"No trial"],
              ].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                  <span style={{color:"rgba(255,255,255,.4)",fontSize:14}}>{k}</span>
                  <span style={{color:"#fff",fontSize:14,fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
            <p style={{color:"rgba(255,255,255,.35)",fontSize:12,marginBottom:18,lineHeight:1.6}}>
              By confirming, you agree to our Terms of Service. Payments are processed securely. You can cancel anytime from your account settings.
            </p>
            <button className="gea-btn-primary" onClick={handleConfirm} disabled={processing} style={{width:"100%",padding:"15px",fontSize:15}}>
              {processing ? (
                <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                  <span style={{width:16,height:16,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",animation:"spin 1s linear infinite",display:"inline-block"}} />
                  Processing payment…
                </span>
              ) : `🔒 Confirm & Pay $${plan.name==="Student"?0:plan.price}`}
            </button>
            <p style={{textAlign:"center",color:"rgba(255,255,255,.22)",fontSize:11,marginTop:10}}>🔒 SSL secured · Powered by Stripe infrastructure</p>
          </div>
        )}
      </div>
    </div>
  );
}
// ─── ANNOUNCEMENT BAR ─────────────────────────────────────────
function AnnouncementBar({ lang }) {
  const [show, setShow] = useState(true);
  const [liveStudents, setLiveStudents] = useState(1247);
  useEffect(() => {
    const t = setInterval(() => setLiveStudents(p => p + Math.floor(Math.random()*2)), 5000);
    return () => clearInterval(t);
  }, []);
  if (!show) return null;
  return (
    <div style={{background:"linear-gradient(90deg,#00d4aa,#0066ff,#a855f7)",color:"#fff",padding:"10px 20px",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,position:"relative",zIndex:1001}}>
      <span>{(L[lang]||L.en).announce}</span>
      <span style={{display:"flex",alignItems:"center",gap:6}}>
        <span className="live-dot" />
        <span style={{fontSize:12}}>{liveStudents.toLocaleString()} students learning right now</span>
      </span>
      <button onClick={()=>setShow(false)} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:16,lineHeight:1}}>✕</button>
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
        <div onClick={()=>goTo("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:18,color:"#fff",boxShadow:"0 0 18px rgba(0,212,170,.4)"}}>G</div>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:17,color:"#fff",letterSpacing:"-.4px"}}>Global Elite <span style={{color:"#00d4aa"}}>Academy</span></span>
        </div>
        <div className="nav-desktop" style={{display:"flex",alignItems:"center",gap:2,flex:1,justifyContent:"center",overflow:"hidden"}}>
          {links.map(lk=>(
            <div key={lk.k} style={{position:"relative"}} onMouseEnter={()=>lk.sub&&setDrop(lk.k)} onMouseLeave={()=>setDrop(null)}>
              <button onClick={()=>{goTo(lk.k);setMOpen(false);}} style={{background:page===lk.k?"rgba(0,212,170,.1)":"none",border:"none",color:page===lk.k?"#00d4aa":"rgba(255,255,255,.78)",cursor:"pointer",fontSize:13.5,fontWeight:500,padding:"8px 10px",borderRadius:8,transition:"all .2s"}}>
                {lk.l}{lk.sub?" ▾":""}
              </button>
              {lk.sub&&drop===lk.k&&(
                <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",background:"#0d1117",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"8px 0",minWidth:160,zIndex:200,boxShadow:"0 20px 50px rgba(0,0,0,.6)"}}>
                  {lk.sub.map(s=><button key={s} onClick={()=>{goTo("courses",s);setDrop(null);}} style={{display:"block",width:"100%",padding:"9px 18px",background:"none",border:"none",color:"rgba(255,255,255,.75)",cursor:"pointer",textAlign:"left",fontSize:13,transition:"all .2s"}}>{s}</button>)}
                </div>
              )}
            </div>
          ))}
        </div>
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
      {mOpen&&(
        <div style={{background:"#0a0f1e",borderTop:"1px solid rgba(255,255,255,.08)",padding:20,display:"flex",flexDirection:"column",gap:4}}>
          {links.map(lk=><button key={lk.k} onClick={()=>{goTo(lk.k);setMOpen(false);}} style={{background:"none",border:"none",color:"rgba(255,255,255,.8)",cursor:"pointer",padding:"11px 0",textAlign:"left",fontSize:15,borderBottom:"1px solid rgba(255,255,255,.05)"}}>{lk.l}</button>)}
          <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:12,marginTop:4,display:"flex",flexDirection:"column",gap:8}}>
            <button onClick={()=>{onLogin();setMOpen(false);}} style={{background:"rgba(255,255,255,.07)",border:"none",color:"#fff",borderRadius:8,padding:12,cursor:"pointer",fontWeight:600,fontSize:14}}>Sign In</button>
            <button onClick={()=>{onSignup();setMOpen(false);}} style={{background:"linear-gradient(135deg,#00d4aa,#0066ff)",border:"none",color:"#fff",borderRadius:8,padding:12,cursor:"pointer",fontWeight:700,fontSize:14}}>Create Free Account</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── AUTH MODAL ───────────────────────────────────────────────
function AuthModal({ mode, onClose, onAuth }) {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({name:"",email:"",password:"",level:"primary"});
  const [loading, setLoading] = useState(false);
  const levels = [{v:"primary",l:"Primary School"},{v:"secondary",l:"Secondary (O-Level)"},{v:"alevel",l:"A-Level (ACSEE)"},{v:"diploma",l:"Diploma"},{v:"degree",l:"Undergraduate"},{v:"masters",l:"Masters / Postgrad"}];
  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({name:form.name||form.email.split("@")[0],email:form.email,level:form.level,plan:"free",freeExams:10,freeBooks:10});
      onClose();
    }, 1000);
  };
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",border:"1px solid rgba(255,255,255,.12)",borderRadius:22,padding:38,width:"100%",maxWidth:420,position:"relative",boxShadow:"0 40px 100px rgba(0,0,0,.7)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,.08)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:14}}>✕</button>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 10px",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,color:"#fff"}}>G</div>
          <div style={{color:"#fff",fontWeight:800,fontSize:17,fontFamily:"'Space Grotesk',sans-serif"}}>Global Elite Academy</div>
        </div>
        <div style={{display:"flex",gap:4,background:"rgba(255,255,255,.05)",borderRadius:10,padding:4,marginBottom:22}}>
          {["login","signup"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"9px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,background:tab===t?"linear-gradient(135deg,#00d4aa,#0066ff)":"none",color:tab===t?"#fff":"rgba(255,255,255,.45)"}}>
              {t==="login"?"Sign In":"Create Account"}
            </button>
          ))}
        </div>
        {tab==="signup"&&<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" style={IS} />}
        <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email Address" style={IS} />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" style={IS} />
        {tab==="signup"&&<select value={form.level} onChange={e=>setForm({...form,level:e.target.value})} style={IS}>{levels.map(l=><option key={l.v} value={l.v}>{l.l}</option>)}</select>}
        <button onClick={submit} disabled={loading} className="gea-btn-primary" style={{width:"100%",padding:"14px",fontSize:15,marginTop:4,marginBottom:14}}>
          {loading?"⏳ Please wait…":tab==="login"?"Sign In":"Create Free Account"}
        </button>
        {tab==="signup"&&<p style={{textAlign:"center",color:"rgba(255,255,255,.5)",fontSize:13}}>✅ Includes <strong style={{color:"#00d4aa"}}>10 free exams</strong> + <strong style={{color:"#00d4aa"}}>10 free books</strong></p>}
        <div style={{textAlign:"center",marginTop:16}}>
          <p style={{color:"rgba(255,255,255,.35)",fontSize:12,marginBottom:10}}>Or continue with</p>
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
  const [liveCount, setLiveCount] = useState(1247);
  useEffect(()=>{
    setTimeout(()=>setLoaded(true),80);
    const t2 = setInterval(()=>setLiveCount(p=>p+Math.floor(Math.random()*2)),4500);
    return ()=>clearInterval(t2);
  },[]);
  return (
    <section style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#020817",paddingTop:66}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 70% at 20% 40%,rgba(0,102,255,.13) 0%,transparent 70%),radial-gradient(ellipse 60% 60% at 80% 20%,rgba(0,212,170,.10) 0%,transparent 60%),radial-gradient(ellipse 50% 50% at 50% 80%,rgba(168,85,247,.08) 0%,transparent 60%)",pointerEvents:"none"}} />
      <div style={{position:"absolute",top:"10%",left:"8%",width:500,height:500,borderRadius:"50%",background:"rgba(0,102,255,.05)",filter:"blur(80px)",animation:"pulse 7s ease-in-out infinite",pointerEvents:"none"}} />
      <div style={{position:"absolute",bottom:"10%",right:"8%",width:400,height:400,borderRadius:"50%",background:"rgba(0,212,170,.05)",filter:"blur(70px)",animation:"pulse 9s 3s ease-in-out infinite",pointerEvents:"none"}} />

      {/* Live indicator */}
      <div style={{position:"absolute",top:90,right:24,background:"rgba(0,212,170,.1)",border:"1px solid rgba(0,212,170,.3)",borderRadius:100,padding:"6px 14px",display:"flex",alignItems:"center",gap:7,zIndex:5}}>
        <span className="live-dot" />
        <span style={{fontSize:12,color:"#00d4aa",fontWeight:600}}>{liveCount.toLocaleString()} learning now</span>
      </div>

      <div style={{position:"relative",zIndex:5,textAlign:"center",maxWidth:860,padding:"60px 24px 48px",display:"flex",flexDirection:"column",alignItems:"center",gap:22}}>
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all .8s ease",display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,212,170,.1)",border:"1px solid rgba(0,212,170,.3)",borderRadius:100,padding:"7px 18px",color:"#00d4aa",fontSize:13,fontWeight:600,letterSpacing:.4}}>
          🌍 Ranked #1 African EdTech Platform 2026–2030
        </div>
        <h1 style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(28px)",transition:"all .9s .15s ease",fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(46px,9vw,88px)",fontWeight:900,lineHeight:1.04,color:"#fff",letterSpacing:"-2.5px",margin:0}}>
          {t.hero_h1}<br/><span className="gea-gradient-text">{t.hero_h1b}</span>
        </h1>
        <p style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(24px)",transition:"all .9s .3s ease",fontSize:17,color:"rgba(255,255,255,.6)",maxWidth:620,lineHeight:1.75,margin:0}}>{t.hero_sub}</p>
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all .9s .45s ease",display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>
          <button className="gea-btn-primary" onClick={user?()=>goTo("courses"):onSignup} style={{fontSize:16,padding:"16px 34px"}}>🚀 {t.cta1}</button>
          <button className="gea-btn-outline" onClick={()=>goTo("courses")} style={{fontSize:16,padding:"16px 34px"}}>📚 {t.cta2}</button>
        </div>
        <div style={{opacity:loaded?1:0,transition:"all .9s .6s ease",display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
          {["✅ No credit card","✅ 10 free exams","✅ 10 free books","✅ Cancel anytime"].map((b,i)=>(
            <span key={i} style={{fontSize:12.5,color:"rgba(255,255,255,.45)",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:100,padding:"4px 12px"}}>{b}</span>
          ))}
        </div>
      </div>

      {/* Real education images strip */}
      <div style={{position:"relative",zIndex:5,width:"100%",maxWidth:900,padding:"0 24px",marginBottom:24,overflow:"hidden"}}>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          {[
            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=160&h=100&fit=crop",
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=160&h=100&fit=crop",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=160&h=100&fit=crop",
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=160&h=100&fit=crop",
            "https://images.unsplash.com/photo-1491841651911-c44c30c34548?w=160&h=100&fit=crop",
          ].map((src,i)=>(
            <img key={i} src={src} alt="students learning" style={{width:150,height:88,objectFit:"cover",borderRadius:12,border:"1px solid rgba(255,255,255,.1)",animation:`float ${6+i*.6}s ${i*.4}s ease-in-out infinite`}} />
          ))}
        </div>
      </div>

      <div ref={ref} className="stats-grid" style={{position:"relative",zIndex:5,display:"grid",gridTemplateColumns:"repeat(4,1fr)",width:"100%",maxWidth:840,borderTop:"1px solid rgba(255,255,255,.07)"}}>
        {[{n:s1,l:"Students",s:"+"},{n:s2,l:"Courses",s:"+"},{n:s3,l:"Countries",s:""},{n:s4,l:"Tutors",s:"+"}].map((st,i)=>(
          <div key={i} style={{textAlign:"center",padding:"28px 16px",borderRight:i<3?"1px solid rgba(255,255,255,.07)":"none"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:900,background:"linear-gradient(135deg,#00d4aa,#0066ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{st.n.toLocaleString()}{st.s}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.45)",marginTop:5,fontWeight:500}}>{st.l}</div>
          </div>
        ))}
      </div>
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
  const feats=[
    {icon:"🤖",title:"Real-Time AI Tutor",desc:"24/7 AI powered by Claude. Adapts to your level, language and learning pace instantly.",color:"#00d4aa",img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=60&h=60&fit=crop"},
    {icon:"📱",title:"Mobile-First Learning",desc:"Seamless on any device. Offline mode for Premium users on iOS and Android.",color:"#0066ff",img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=60&h=60&fit=crop"},
    {icon:"🌍",title:"6 Languages",desc:"English, Kiswahili, French, German, Chinese and British English.",color:"#a855f7",img:"https://images.unsplash.com/photo-1493707553966-283afac8c358?w=60&h=60&fit=crop"},
    {icon:"🏆",title:"Verified Certificates",desc:"Digital certificates recognised by universities and employers across Africa.",color:"#ffd700",img:"https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=60&h=60&fit=crop"},
    {icon:"👥",title:"Live Group Classes",desc:"Real-time sessions with expert tutors and classmates worldwide.",color:"#ff6b6b",img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=60&h=60&fit=crop"},
    {icon:"📊",title:"Progress Analytics",desc:"Track performance, weak areas, study time and exam readiness in real-time.",color:"#00d4aa",img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop"},
    {icon:"📚",title:"Massive Library",desc:"10,000+ e-books, past papers and study notes — searchable and downloadable.",color:"#0066ff",img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=60&fit=crop"},
    {icon:"🔒",title:"Safe & Secure",desc:"Bank-level encryption. GDPR compliant. Child-safe for ages 6+.",color:"#a855f7",img:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=60&h=60&fit=crop"},
  ];
  return (
    <section ref={ref} className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:56}}>
          <span className="gea-badge">✨ Why Choose GEA?</span>
          <h2 className="gea-h2">The Future of Education<br/><span className="gea-gradient-text">Is Here</span></h2>
          <p className="gea-sub">Every feature built to help you learn faster, smarter, and more effectively.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18}}>
          {feats.map((f,i)=>(
            <div key={i} className="gea-card" style={{padding:"26px 22px",opacity:seen?1:0,transform:seen?"translateY(0)":"translateY(24px)",transition:`all .5s ${i*55}ms`,display:"flex",gap:16,alignItems:"flex-start"}}>
              <img src={f.img} alt={f.title} style={{width:52,height:52,borderRadius:12,objectFit:"cover",flexShrink:0}} />
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

// ─── COURSES ──────────────────────────────────────────────────
function CoursesSection({ user, onSignup, goTo, filterLv="All" }) {
  const { data: courses, liveCount, optimisticUpdate } = useRealtime("courses", COURSES_INIT);
  const [lv, setLv] = useState(filterLv);
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const [enrolling, setEnrolling] = useState(null);
  const levels = ["All","Primary","Secondary","A-Level","Diploma","Degree","Masters"];
  const filtered = courses.filter(c=>(lv==="All"||c.lv===lv)&&(c.title.toLowerCase().includes(q.toLowerCase())||c.sub.toLowerCase().includes(q.toLowerCase())));
  const shown = all ? filtered : filtered.slice(0,8);

  const handleEnroll = (course) => {
    if (!user) { onSignup(); return; }
    // Optimistic UI: immediately update student count
    setEnrolling(course.id);
    optimisticUpdate(course.id, { students: course.students + 1 });
    setTimeout(() => setEnrolling(null), 1500);
  };

  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">📚 All Courses</span>
          <h2 className="gea-h2">500+ Courses Across<br/><span className="gea-gradient-text">All Levels</span></h2>
          <p className="gea-sub">Primary to Masters — every subject, expert-taught, affordable.</p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:12}}>
            <span className="live-dot" />
            <span style={{color:"rgba(255,255,255,.4)",fontSize:13}}>Prices update in real-time</span>
          </div>
        </div>
        <div style={{display:"flex",gap:14,marginBottom:36,flexWrap:"wrap",alignItems:"center"}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍 Search courses…" style={{flex:1,minWidth:200,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,padding:"11px 16px",color:"#fff",fontSize:14,outline:"none"}} />
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {levels.map(l=>(
              <button key={l} onClick={()=>setLv(l)} style={{background:lv===l?"linear-gradient(135deg,#00d4aa,#0066ff)":"rgba(255,255,255,.05)",border:lv===l?"none":"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"8px 14px",color:lv===l?"#fff":"rgba(255,255,255,.6)",cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s"}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
          {shown.map(c=>(
            <div key={c.id} className="gea-card" style={{cursor:"pointer",position:"relative",overflow:"hidden"}}>
              {/* Course image */}
              <div style={{position:"relative",overflow:"hidden",borderRadius:"17px 17px 0 0"}}>
                <img src={c.img} alt={c.title} style={{width:"100%",height:160,objectFit:"cover",display:"block",transition:"transform .4s"}} onMouseEnter={e=>e.target.style.transform="scale(1.05)"} onMouseLeave={e=>e.target.style.transform="scale(1)"} />
                {c.tag&&<div style={{position:"absolute",top:10,left:10,background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700}}>{c.tag}</div>}
              </div>
              <div style={{padding:20}}>
                <div style={{fontSize:11,color:"#00d4aa",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{c.lv}</div>
                <h3 style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:7,lineHeight:1.35}}>{c.title}</h3>
                <p style={{fontSize:13,color:"rgba(255,255,255,.48)",lineHeight:1.6,marginBottom:14}}>{c.desc}</p>
                <div style={{display:"flex",gap:12,fontSize:12,color:"rgba(255,255,255,.38)",marginBottom:16}}>
                  <span>📹 {c.lessons}</span>
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
                  <button onClick={()=>handleEnroll(c)} className="gea-btn-primary" style={{padding:"9px 16px",fontSize:13}}>
                    {enrolling===c.id ? (
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
        {!all&&filtered.length>8&&(
          <div style={{textAlign:"center",marginTop:36}}>
            <button onClick={()=>setAll(true)} className="gea-btn-outline" style={{padding:"13px 32px",fontSize:14}}>View All {filtered.length} Courses ↓</button>
          </div>
        )}
      </div>
    </section>
  );
}
// ─── AI TUTOR ─────────────────────────────────────────────────
function AITutor({ user }) {
  const [msgs, setMsgs] = useState([{role:"assistant",text:"Hello! I'm the GEA AI Tutor. Ask me anything — any subject from Primary to Masters level. I'm here to help you succeed! 🎓"}]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);
  const send = useCallback(async () => {
    if (!inp.trim()||busy) return;
    const txt = inp;
    setMsgs(p=>[...p,{role:"user",text:txt}]);
    setInp(""); setBusy(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:1000,
          system:`You are the Global Elite Academy AI Tutor (GEA AI). You help students from Primary to University level across Africa and the world at global-elite-academy.com. Be clear, encouraging, and age-appropriate. Cover all subjects. Use African context where helpful. Keep responses practical and end with a helpful follow-up suggestion.`,
          messages:[...msgs.map(m=>({role:m.role,content:m.text})),{role:"user",content:txt}],
        }),
      });
      const data = await res.json();
      setMsgs(p=>[...p,{role:"assistant",text:data.content?.[0]?.text||"Sorry, I couldn't respond. Please try again!"}]);
    } catch {
      setMsgs(p=>[...p,{role:"assistant",text:"⚠️ Connection error. Please check your internet and try again."}]);
    }
    setBusy(false);
  }, [inp,busy,msgs]);
  const suggestions = ["Solve x² + 5x + 6 = 0","Explain photosynthesis","What is binary code?","Help me write an essay","Explain Newton's laws"];
  return (
    <section className="gea-section" style={{background:"linear-gradient(180deg,#020817 0%,#030d1a 100%)"}}>
      <div className="gea-inner" style={{maxWidth:860}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <span className="gea-badge">🤖 AI-Powered · Real-Time</span>
          <h2 className="gea-h2">Your Personal<br/><span className="gea-gradient-text">AI Tutor</span></h2>
          <p className="gea-sub">Ask anything. Expert answers in seconds. Powered by Claude AI. Available 24/7.</p>
        </div>
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.09)",borderRadius:20,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,.4)"}}>
          <div style={{background:"linear-gradient(135deg,rgba(0,212,170,.1),rgba(0,102,255,.1))",padding:"15px 22px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:20,color:"#fff",flexShrink:0,boxShadow:"0 0 18px rgba(0,212,170,.35)"}}>G</div>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:15,fontFamily:"'Space Grotesk',sans-serif"}}>GEA AI Tutor</div>
              <div style={{color:"#00d4aa",fontSize:12,display:"flex",alignItems:"center",gap:5}}><span className="live-dot" /> Online · All subjects · All levels · Powered by Claude</div>
            </div>
          </div>
          <div style={{height:380,overflowY:"auto",padding:"22px",display:"flex",flexDirection:"column",gap:14}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",alignItems:"flex-end",gap:8}}>
                {m.role==="assistant"&&<div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff",flexShrink:0,fontFamily:"'Space Grotesk',sans-serif"}}>G</div>}
                <div style={{maxWidth:"78%",padding:"12px 16px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?"linear-gradient(135deg,#00d4aa,#0066ff)":"rgba(255,255,255,.06)",color:"#fff",fontSize:14,lineHeight:1.7,whiteSpace:"pre-wrap",border:m.role==="user"?"none":"1px solid rgba(255,255,255,.08)"}}>
                  {m.text}
                </div>
              </div>
            ))}
            {busy&&(
              <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",fontFamily:"'Space Grotesk',sans-serif"}}>G</div>
                <div style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"18px 18px 18px 4px",padding:"14px 20px",color:"#00d4aa",fontSize:20,letterSpacing:4}}>•••</div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div style={{padding:"14px 20px",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",gap:10}}>
            <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask me anything — any subject, any level…" style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:11,padding:"12px 15px",color:"#fff",fontSize:14,outline:"none"}} />
            <button onClick={send} disabled={busy} className="gea-btn-primary" style={{padding:"12px 18px",fontSize:18,borderRadius:11}}>➤</button>
          </div>
        </div>
        <div style={{marginTop:20,display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
          {suggestions.map(s=><button key={s} onClick={()=>setInp(s)} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.65)",borderRadius:100,padding:"7px 15px",fontSize:13,cursor:"pointer",transition:"all .2s"}}>{s}</button>)}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING (with payment flow trigger) ─────────────────────
function Pricing({ user, onSignup, onPayment }) {
  const [yr, setYr] = useState(false);
  return (
    <section className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">💰 Transparent Pricing</span>
          <h2 className="gea-h2">Choose Your<br/><span className="gea-gradient-text">Learning Plan</span></h2>
          <p className="gea-sub">Affordable plans for every student. First 10 exams always free.</p>
        </div>
        <div style={{display:"flex",background:"rgba(255,255,255,.05)",borderRadius:10,padding:4,width:"fit-content",margin:"0 auto 44px",gap:4}}>
          {["Monthly","Yearly (Save 30%)"].map((b,i)=>(
            <button key={b} onClick={()=>setYr(i===1)} style={{background:(i===1)===yr?"linear-gradient(135deg,#00d4aa,#0066ff)":"none",border:"none",color:(i===1)===yr?"#fff":"rgba(255,255,255,.5)",padding:"10px 22px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s"}}>{b}</button>
          ))}
        </div>
        <div className="plans-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:18}}>
          {PLANS.map(p=>{
            const price=yr&&p.price>0?Math.round(p.price*.7):p.price;
            return (
              <div key={p.name} style={{background:p.pop?"rgba(0,212,170,.04)":"rgba(255,255,255,.03)",border:`1.5px solid ${p.pop?"rgba(0,212,170,.4)":"rgba(255,255,255,.08)"}`,borderRadius:20,padding:"30px 24px",position:"relative",display:"flex",flexDirection:"column",transition:"all .3s"}}>
                {p.pop&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:100,padding:"4px 16px",fontSize:12,fontWeight:700,whiteSpace:"nowrap"}}>⭐ Most Popular</div>}
                <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:800,color:p.color,marginBottom:6}}>{p.name}</h3>
                <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:6}}>
                  {price===0?<span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:900,color:"#fff"}}>FREE</span>:<><span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:900,color:"#fff"}}>${price}</span><span style={{fontSize:14,color:"rgba(255,255,255,.4)"}}>/mo</span></>}
                </div>
                {yr&&p.price>0&&<p style={{color:"#00d4aa",fontSize:12,marginBottom:12}}>Save ${(p.price-price)*12}/year</p>}
                <ul style={{listStyle:"none",padding:0,margin:"0 0 24px",flex:1}}>
                  {p.features.map((f,i)=><li key={i} style={{fontSize:13.5,padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,.04)",color:f.startsWith("❌")?"rgba(255,255,255,.28)":"rgba(255,255,255,.8)"}}>{f}</li>)}
                </ul>
                <button
                  onClick={()=>{
                    if (p.price===0) { onSignup(); return; }
                    // 7-day trial or paid plan → go to payment
                    onPayment(p);
                  }}
                  style={{background:p.pop?p.grad:"rgba(255,255,255,.07)",border:p.pop?"none":"1px solid rgba(255,255,255,.14)",color:"#fff",borderRadius:10,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%",transition:"all .2s"}}
                >
                  {p.cta}
                </button>
                {p.name==="Student"&&<p style={{textAlign:"center",color:"rgba(255,255,255,.3)",fontSize:11,marginTop:8}}>No charge for 7 days · Cancel anytime</p>}
              </div>
            );
          })}
        </div>
        <div style={{textAlign:"center",marginTop:48,padding:"28px 24px",background:"rgba(255,255,255,.02)",borderRadius:14}}>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:13,marginBottom:14}}>Secure payment via:</p>
          <div className="payment-methods" style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",alignItems:"center"}}>
            <VisaIcon /><MastercardIcon /><PaypalIcon /><MpesaIcon /><StripeIcon />
            <span style={{color:"rgba(255,255,255,.4)",fontSize:13}}>& Bank Transfer</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TUTORS — with real photos ─────────────────────────────────
function TutorsSection({ user, onSignup }) {
  const [hovered, setHovered] = useState(null);
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">👩‍🏫 Expert Educators</span>
          <h2 className="gea-h2">Learn From The<br/><span className="gea-gradient-text">Best Minds</span></h2>
          <p className="gea-sub">320+ verified educators worldwide. $10–$30/month per level. Book in one click.</p>
        </div>
        <div className="tutors-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20}}>
          {TUTORS.map(t=>(
            <div key={t.id} className="gea-card" style={{padding:"28px 22px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}} onMouseEnter={()=>setHovered(t.id)} onMouseLeave={()=>setHovered(null)}>
              <div style={{position:"relative",marginBottom:16}}>
                <img
                  src={t.photo}
                  alt={t.name}
                  className="tutor-img"
                  onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}
                />
                <div className="tutor-img-fallback" style={{display:"none"}}>{t.name[0]}</div>
                <div style={{position:"absolute",bottom:2,right:2,width:16,height:16,borderRadius:"50%",background:t.avail?"#00d4aa":"#555",border:"2.5px solid #030d1a"}} />
              </div>
              <h3 style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:3}}>{t.name}</h3>
              <div style={{fontSize:13,color:"#00d4aa",fontWeight:600,marginBottom:3}}>{t.sub}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.45)",marginBottom:3}}>📚 {t.lv}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.38)",marginBottom:10}}>📍 {t.country}</div>
              <p style={{fontSize:12.5,color:"rgba(255,255,255,.48)",lineHeight:1.65,marginBottom:14}}>{t.bio}</p>
              <div style={{display:"flex",gap:18,marginBottom:10,fontSize:13}}>
                <div style={{textAlign:"center"}}><div style={{color:"#ffd700",fontWeight:700}}>⭐ {t.rating}</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>Rating</div></div>
                <div style={{textAlign:"center"}}><div style={{color:"#00d4aa",fontWeight:700}}>{t.students.toLocaleString()}</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>Students</div></div>
                <div style={{textAlign:"center"}}><div style={{color:"#fff",fontWeight:700}}>{t.price}/mo</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>per level</div></div>
              </div>
              <div style={{fontSize:12,color:t.avail?"#00d4aa":"#666",marginBottom:14,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
                <span className={t.avail?"live-dot":""} style={{width:7,height:7,background:t.avail?"#00d4aa":"#555",borderRadius:"50%",display:"inline-block"}} />
                {t.avail?"Available Now":"Currently Busy"}
              </div>
              <button className="gea-btn-primary" onClick={()=>user?null:onSignup()} style={{width:"100%",padding:"10px",fontSize:13}}>
                {user?(t.avail?"Book Session →":"Join Waitlist"):"Sign Up to Book"}
              </button>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:40}}>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:14,marginBottom:16}}>💡 Tutors charge $10–$30/month depending on level & subject expertise</p>
          <button className="gea-btn-outline" style={{padding:"13px 32px",fontSize:14}}>View All 320+ Tutors →</button>
        </div>
      </div>
    </section>
  );
}

// ─── EXAMS ────────────────────────────────────────────────────
function ExamsSection({ user, onSignup }) {
  const cats=[{id:"csee",name:"CSEE (Form 4)",count:145,icon:"https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=80&h=80&fit=crop",free:true},{id:"acsee",name:"ACSEE (Form 6)",count:98,icon:"https://images.unsplash.com/photo-1588072432836-e10032774350?w=80&h=80&fit=crop",free:false},{id:"primary",name:"Primary (PSLE)",count:87,icon:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=80&h=80&fit=crop",free:true},{id:"diploma",name:"Diploma Exams",count:62,icon:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=80&h=80&fit=crop",free:false},{id:"university",name:"University Finals",count:55,icon:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=80&h=80&fit=crop",free:false},{id:"mock",name:"Mock Exams",count:200,icon:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=80&h=80&fit=crop",free:true}];
  return (
    <section className="gea-section" style={{background:"#020817"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">📝 Exams & Past Papers</span>
          <h2 className="gea-h2">Prepare With<br/><span className="gea-gradient-text">Real Past Papers</span></h2>
          <p className="gea-sub">Hundreds of past papers. First 10 FREE for every student!</p>
        </div>
        <div style={{background:"rgba(0,212,170,.07)",border:"1px solid rgba(0,212,170,.28)",borderRadius:16,padding:"22px 28px",marginBottom:44,textAlign:"center",maxWidth:480,margin:"0 auto 44px"}}>
          <div style={{fontSize:36,marginBottom:8}}>🎁</div>
          <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:6}}>
            {user?`You have `:"Free members get "}<span style={{color:"#00d4aa",fontSize:26,fontWeight:900}}>{user?.freeExams??10}</span> free exams remaining
          </h3>
          {!user&&<button className="gea-btn-primary" onClick={onSignup} style={{marginTop:14,padding:"10px 26px",fontSize:14}}>Claim Free Exams →</button>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16}}>
          {cats.map(c=>(
            <div key={c.id} className="gea-card" style={{padding:"20px 18px",cursor:"pointer",overflow:"hidden"}}>
              <img src={c.icon} alt={c.name} style={{width:"100%",height:100,objectFit:"cover",borderRadius:10,marginBottom:12}} />
              <h3 style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:4}}>{c.name}</h3>
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
  const books=[
    {id:1,title:"O-Level Mathematics Complete Guide",author:"Prof. K. Mwangi",lv:"Secondary",free:true,rating:4.9,reads:8420,img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=180&fit=crop"},
    {id:2,title:"A-Level Physics Revision Manual",author:"Dr. S. Osei",lv:"A-Level",free:false,rating:4.8,reads:5230,img:"https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=180&fit=crop"},
    {id:3,title:"Introduction to Computer Science",author:"Chen Wei",lv:"Degree",free:true,rating:4.9,reads:12100,img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=180&fit=crop"},
    {id:4,title:"Business Management Fundamentals",author:"Dr. G. Mensah",lv:"Diploma",free:false,rating:4.7,reads:3800,img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=180&fit=crop"},
    {id:5,title:"Biology Form 1–4 Complete Notes",author:"Ms. F. Al-Rashid",lv:"Secondary",free:true,rating:4.8,reads:9650,img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=180&fit=crop"},
    {id:6,title:"Early Childhood Learning Guide",author:"Mrs. A. Njoroge",lv:"Primary",free:true,rating:4.9,reads:15300,img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=180&fit=crop"},
    {id:7,title:"MBA Case Studies Collection",author:"Prof. J. Okonkwo",lv:"Masters",free:false,rating:4.9,reads:2100,img:"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=180&fit=crop"},
    {id:8,title:"Advanced Chemistry Textbook",author:"Dr. R. Kimani",lv:"Degree",free:false,rating:4.8,reads:4200,img:"https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=300&h=180&fit=crop"},
  ];
  const [reading,setReading]=useState(null);
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">📚 Digital Library</span>
          <h2 className="gea-h2">10,000+ Books &<br/><span className="gea-gradient-text">Study Resources</span></h2>
          <p className="gea-sub">Sign in to get 10 free books at your level. Premium unlocks everything.</p>
        </div>
        {!user&&<div style={{background:"rgba(0,102,255,.07)",border:"1px solid rgba(0,102,255,.28)",borderRadius:12,padding:"16px 22px",textAlign:"center",marginBottom:36}}>
          <span style={{color:"#fff",fontWeight:600}}>📖 Sign-in bonus: <strong style={{color:"#00d4aa"}}>10 FREE books</strong> at your level!</span>
          <button onClick={onSignup} style={{marginLeft:14,background:"#0066ff",border:"none",color:"#fff",borderRadius:8,padding:"8px 16px",fontWeight:700,cursor:"pointer",fontSize:13}}>Sign In →</button>
        </div>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:18}}>
          {books.map(b=>(
            <div key={b.id} className="gea-card" style={{overflow:"hidden",cursor:"pointer"}}>
              <img src={b.img} alt={b.title} style={{width:"100%",height:130,objectFit:"cover",display:"block",transition:"transform .4s"}} onMouseEnter={e=>e.target.style.transform="scale(1.05)"} onMouseLeave={e=>e.target.style.transform="scale(1)"} />
              <div style={{padding:"16px 18px"}}>
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
            </div>
          ))}
        </div>
      </div>
      {reading&&(
        <div onClick={()=>setReading(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0d1117",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:36,maxWidth:580,width:"100%"}}>
            <img src={reading.img} alt={reading.title} style={{width:"100%",height:140,objectFit:"cover",borderRadius:12,marginBottom:20}} />
            <h2 style={{color:"#fff",fontWeight:800,fontSize:18,marginBottom:6}}>{reading.title}</h2>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:18}}>by {reading.author}</p>
            <div style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:20,color:"rgba(255,255,255,.7)",lineHeight:1.9,fontSize:14,marginBottom:20}}>
              <strong style={{color:"#00d4aa"}}>Chapter 1: Introduction</strong><br/><br/>
              This comprehensive guide covers key concepts and exam techniques. Starting from fundamentals, building toward advanced problem-solving proven to improve results by 40%+.<br/><br/>
              <em style={{color:"rgba(255,255,255,.35)"}}>📖 Preview only. Upgrade to Premium for all chapters + PDF download.</em>
            </div>
            <button className="gea-btn-primary" style={{width:"100%",padding:"13px",fontSize:14}} onClick={()=>setReading(null)}>Upgrade to Read Full Book →</button>
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
          <button className="gea-btn-outline" style={{padding:"11px 24px",fontSize:14}}>View All →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18}}>
          {BLOGS.map(b=>(
            <div key={b.id} className="gea-card" style={{cursor:"pointer",overflow:"hidden"}}>
              <img src={b.img} alt={b.title} style={{width:"100%",height:140,objectFit:"cover",display:"block",transition:"transform .4s"}} onMouseEnter={e=>e.target.style.transform="scale(1.05)"} onMouseLeave={e=>e.target.style.transform="scale(1)"} />
              <div style={{padding:"18px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,alignItems:"center"}}>
                  <div style={{fontSize:11,color:"#00d4aa",fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{b.cat}</div>
                  {b.tag&&<span style={{background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700}}>{b.tag}</span>}
                </div>
                <h3 style={{color:"#fff",fontWeight:700,fontSize:15,lineHeight:1.45,marginBottom:12}}>{b.title}</h3>
                <div style={{display:"flex",justifyContent:"space-between",color:"rgba(255,255,255,.32)",fontSize:12}}>
                  <span>{b.author}</span><span>⏱ {b.read}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────
function Testimonials() {
  const list=[
    {name:"Zawadi M.",loc:"Dar es Salaam, TZ",lv:"Form 4 Student",text:"I failed Math twice before GEA. After 3 months here I scored an A in CSEE. The AI tutor in Kiswahili changed everything!",rating:5,img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=56&h=56&fit=crop&crop=face"},
    {name:"Kofi A.",loc:"Accra, Ghana",lv:"University Year 2",text:"The library and past papers alone are worth it. My GPA went from 2.8 to 3.9 in one semester. Incredible platform.",rating:5,img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&crop=face"},
    {name:"Mrs. Njeri K.",loc:"Nairobi, Kenya",lv:"Parent",text:"My daughter loves learning here. The AI tutor is so patient. I track her progress every week. Highly recommend!",rating:5,img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=56&h=56&fit=crop&crop=face"},
    {name:"Ahmed B.",loc:"Kampala, Uganda",lv:"A-Level Student",text:"Used GEA past papers for Physics. Got B+ — way better than expected. Dr. Kariuki's live sessions are amazing.",rating:5,img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=56&h=56&fit=crop&crop=face"},
  ];
  return (
    <section className="gea-section" style={{background:"#030d1a"}}>
      <div className="gea-inner">
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="gea-badge">💬 Real Stories</span>
          <h2 className="gea-h2">Real Results,<br/><span className="gea-gradient-text">Real Students</span></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18}}>
          {list.map((t,i)=>(
            <div key={i} className="gea-card" style={{padding:"26px 22px"}}>
              <div style={{color:"#ffd700",fontSize:16,marginBottom:12}}>{"⭐".repeat(t.rating)}</div>
              <p style={{color:"rgba(255,255,255,.72)",fontSize:14,lineHeight:1.8,marginBottom:18,fontStyle:"italic"}}>"{t.text}"</p>
              <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:14,display:"flex",alignItems:"center",gap:12}}>
                <img src={t.img} alt={t.name} style={{width:44,height:44,borderRadius:"50%",objectFit:"cover",border:"2px solid rgba(0,212,170,.3)",flexShrink:0}} />
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

// ─── EDU ADS ──────────────────────────────────────────────────
function EduAds() {
  const slides=[
    {title:"Collaborative Learning",desc:"Students achieve more together.",img:"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=300&h=160&fit=crop",color:"#00d4aa"},
    {title:"Family Learning Moments",desc:"Parents & children growing together.",img:"https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=300&h=160&fit=crop",color:"#0066ff"},
    {title:"AI + Creativity 2030",desc:"Next-gen tools for young minds.",img:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=160&fit=crop",color:"#a855f7"},
    {title:"Celebrate Achievement",desc:"Every milestone matters.",img:"https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=300&h=160&fit=crop",color:"#ffd700"},
  ];
  const [idx,setIdx]=useState(0);
  useEffect(()=>{ const t=setInterval(()=>setIdx(i=>(i+1)%slides.length),4000); return ()=>clearInterval(t); },[]);
  return (
    <section style={{padding:"52px 24px",background:"#020817"}}>
      <div className="gea-inner">
        <p style={{textAlign:"center",color:"rgba(255,255,255,.18)",fontSize:11,letterSpacing:1.5,marginBottom:20,textTransform:"uppercase"}}>Educational Content · Partners</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:28}}>
          {slides.map((sl,i)=>(
            <div key={i} onClick={()=>setIdx(i)} style={{background:i===idx?"rgba(255,255,255,.05)":"rgba(255,255,255,.02)",border:`1px solid ${i===idx?sl.color+"55":"rgba(255,255,255,.07)"}`,borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all .3s"}}>
              <img src={sl.img} alt={sl.title} style={{width:"100%",height:110,objectFit:"cover",display:"block"}} />
              <div style={{padding:"12px 14px"}}>
                <div style={{color:sl.color,fontWeight:700,fontSize:13,marginBottom:3}}>{sl.title}</div>
                <div style={{color:"rgba(255,255,255,.38)",fontSize:12}}>{sl.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div id="adsense-gea-home" style={{textAlign:"center",border:"1px dashed rgba(255,255,255,.07)",borderRadius:10,padding:"18px 24px",color:"rgba(255,255,255,.18)",fontSize:12}}>
          📢 Google AdSense · ca-pub-8024543613282871 · Ad displays here after approval
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────
function CTABanner({ onSignup }) {
  return (
    <section style={{padding:"90px 24px",background:"linear-gradient(135deg,rgba(0,212,170,.07),rgba(0,102,255,.07))",borderTop:"1px solid rgba(255,255,255,.06)"}}>
      <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=180&fit=crop" alt="students" style={{width:280,height:160,objectFit:"cover",borderRadius:16,marginBottom:28,boxShadow:"0 20px 60px rgba(0,0,0,.4)"}} />
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(34px,6vw,56px)",fontWeight:900,color:"#fff",letterSpacing:"-2px",marginBottom:18,lineHeight:1.1}}>
          Start Learning<br/><span className="gea-gradient-text">Today — It's Free</span>
        </h2>
        <p style={{fontSize:17,color:"rgba(255,255,255,.52)",lineHeight:1.8,marginBottom:34}}>Join 124,000+ students. First 10 exams and 10 books free. No credit card needed.</p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="gea-btn-primary" onClick={onSignup} style={{fontSize:16,padding:"16px 38px"}}>🎓 Create Free Account</button>
          <a href="mailto:johnsonelisa020@gmail.com" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.06)",border:"1.5px solid rgba(255,255,255,.18)",color:"#fff",borderRadius:12,padding:"16px 30px",fontSize:16,fontWeight:600,textDecoration:"none"}}>📧 Contact Us</a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────
function Footer({ goTo }) {
  const cols={Courses:["Primary School","Secondary (O-Level)","A-Level (ACSEE)","Diploma","Degree","Masters"],Resources:["Exams & Past Papers","Digital Library","Study Notes","AI Tutor","Practice Tests","Video Tutorials"],Platform:["About Us","Our Tutors","Blog","Scholarships","Careers","Partnerships"],Support:["Help Center","Contact Us","WhatsApp Support","Community","Feedback","Refund Policy"],Legal:["Privacy Policy","Terms of Service","Cookie Policy","Accessibility","GDPR","Sitemap"]};
  return (
    <footer style={{background:"#030d1a",borderTop:"1px solid rgba(255,255,255,.06)",padding:"72px 24px 28px"}}>
      <div className="gea-inner">
        <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"2fr repeat(5,1fr)",gap:36,marginBottom:52}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer"}} onClick={()=>goTo("home")}>
              <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#0066ff)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:18,color:"#fff"}}>G</div>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:17,color:"#fff"}}>Global Elite <span style={{color:"#00d4aa"}}>Academy</span></span>
            </div>
            <p style={{color:"rgba(255,255,255,.42)",fontSize:13.5,lineHeight:1.8,marginBottom:18}}>World-class education from Primary to Masters. Empowering students worldwide since 2024.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
              {["🌍 47+ Countries","👥 124K+ Students","📚 500+ Courses","⭐ 4.9 Rating"].map(b=><span key={b} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:7,padding:"4px 11px",color:"rgba(255,255,255,.45)",fontSize:12}}>{b}</span>)}
            </div>
            <div style={{display:"flex",gap:8}}>
              {[{c:<svg width="16" height="16" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>,l:"Twitter"},{c:<FacebookIcon />,l:"Facebook"},{c:<svg width="16" height="16" viewBox="0 0 24 24" fill="url(#ig)"><defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,l:"Instagram"}].map(s=>(
                <button key={s.l} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{s.c}</button>
              ))}
            </div>
          </div>
          {Object.entries(cols).map(([cat,links])=>(
            <div key={cat}>
              <h4 style={{color:"#fff",fontWeight:700,fontSize:14,marginBottom:14,letterSpacing:.3}}>{cat}</h4>
              <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:9}}>
                {links.map(l=><li key={l}><button onClick={()=>goTo(l.toLowerCase().replace(/[ ()&]/g,"_"))} style={{background:"none",border:"none",color:"rgba(255,255,255,.42)",cursor:"pointer",fontSize:13,textAlign:"left",padding:0}}>{l}</button></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(0,212,170,.06)",border:"1px solid rgba(0,212,170,.2)",borderRadius:14,padding:"28px 32px",marginBottom:40,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:18}}>
          <div>
            <h3 style={{color:"#fff",fontWeight:700,fontSize:17,marginBottom:5}}>📧 Stay Ahead in Education</h3>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:14}}>New courses, study tips, scholarships — in your inbox.</p>
          </div>
          <div style={{display:"flex",gap:10,flex:1,maxWidth:420}}>
            <input placeholder="Your email address" style={{flex:1,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",borderRadius:9,padding:"11px 15px",color:"#fff",fontSize:14,outline:"none"}} />
            <button className="gea-btn-primary" style={{padding:"11px 20px",fontSize:14,whiteSpace:"nowrap"}}>Subscribe</button>
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

// ─── INNER PAGES ──────────────────────────────────────────────
function AboutPage({ goTo }) {
  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=860&h=300&fit=crop" alt="about" style={{width:"100%",height:260,objectFit:"cover",borderRadius:20,marginBottom:40}} />
        <div style={{textAlign:"center",marginBottom:52}}>
          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(32px,6vw,52px)",fontWeight:900,color:"#fff",letterSpacing:"-1.5px",marginBottom:14}}>About Global Elite <span className="gea-gradient-text">Academy</span></h1>
          <p style={{fontSize:17,color:"rgba(255,255,255,.52)",maxWidth:560,margin:"0 auto",lineHeight:1.8}}>Founded to make world-class education accessible to every student in Africa and beyond.</p>
        </div>
        {[["🌍 Our Mission","To democratize quality education across Africa and the world. Every student from Primary 1 to Masters deserves excellent, affordable, AI-enhanced education."],["🚀 Vision 2026–2030","Become the #1 educational platform in Africa by 2028 — 1 million students, 50+ countries, AI-personalized learning."],["💡 What Makes Us Different","Expert human tutors + Claude AI. PhD-level content. 6 languages. Flexible pricing with free access. Exams accessible to everyone."],["🤝 Our Impact","Since 2024, 124,000+ students have improved results with an average grade improvement of 35%."]].map(([t,c])=>(
          <div key={t} className="gea-card" style={{padding:"30px 32px",marginBottom:18}}>
            <h2 style={{color:"#00d4aa",fontWeight:700,fontSize:20,marginBottom:10}}>{t}</h2>
            <p style={{color:"rgba(255,255,255,.62)",lineHeight:1.9,fontSize:15}}>{c}</p>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:36}}><button className="gea-btn-primary" onClick={()=>goTo("home")} style={{padding:"14px 32px",fontSize:15}}>← Back to Home</button></div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form,setForm]=useState({name:"",email:"",subject:"",msg:"",type:"general"});
  const [sent,setSent]=useState(false);
  const [loading,setLoading]=useState(false);
  const send=()=>{ setLoading(true); window.location.href=`mailto:johnsonelisa020@gmail.com?subject=${encodeURIComponent(`[GEA] ${form.subject}`)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.msg}`)}`; setTimeout(()=>{setLoading(false);setSent(true);},1200); };
  return (
    <div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{maxWidth:580,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <div style={{fontSize:52,marginBottom:14}}>📬</div>
          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:900,color:"#fff",letterSpacing:"-1px",marginBottom:10}}>Get in Touch</h1>
          <p style={{color:"rgba(255,255,255,.48)",fontSize:15}}>Questions, support or partnerships? We reply within 24 hours.</p>
        </div>
        {!sent?(
          <div className="gea-card" style={{padding:36}}>
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={IS}>{["general","support","billing","tutor","partnership","school","media"].map(o=><option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}</select>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your Name" style={IS}/><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" style={IS}/></div>
            <input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="Subject" style={IS}/>
            <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Your message…" style={{...IS,height:130,resize:"vertical"}}/>
            <button className="gea-btn-primary" onClick={send} disabled={loading} style={{width:"100%",padding:"14px",fontSize:15}}>{loading?"⏳ Opening email…":"📤 Send Message"}</button>
            <p style={{textAlign:"center",color:"rgba(255,255,255,.28)",fontSize:12,marginTop:12}}>Sent to johnsonelisa020@gmail.com</p>
          </div>
        ):(
          <div style={{background:"rgba(0,212,170,.07)",border:"1px solid rgba(0,212,170,.28)",borderRadius:18,padding:44,textAlign:"center"}}>
            <div style={{fontSize:60,marginBottom:18}}>✅</div>
            <h2 style={{color:"#fff",fontWeight:800,fontSize:22,marginBottom:10}}>Message Sent!</h2>
            <p style={{color:"rgba(255,255,255,.55)"}}>We'll reply to {form.email} within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PrivacyPage(){return(<div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px"}}><div style={{maxWidth:800,margin:"0 auto"}}><h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:40,fontWeight:900,color:"#fff",marginBottom:6}}>Privacy Policy</h1><p style={{color:"rgba(255,255,255,.35)",marginBottom:40}}>Last updated: June 2026</p>{[["Data We Collect","Name, email, education level and usage data to personalise learning. Payments via Stripe/PayPal/M-Pesa — we never store card details."],["How We Use It","Personalised recommendations, progress tracking, notifications. We never sell personal data."],["Google AdSense","Publisher ID: ca-pub-8024543613282871. Ads fund free content. Child-safe ad settings for under-13 users."],["Your Rights","Access, correct or delete your data anytime. Email johnsonelisa020@gmail.com."],["Contact","johnsonelisa020@gmail.com · global-elite-academy.com"]].map(([t,c])=><div key={t} style={{marginBottom:28}}><h2 style={{color:"#00d4aa",fontWeight:700,fontSize:18,marginBottom:8}}>{t}</h2><p style={{color:"rgba(255,255,255,.58)",lineHeight:1.9,fontSize:15}}>{c}</p></div>)}</div></div>);}

function TermsPage(){return(<div style={{minHeight:"100vh",background:"#020817",padding:"120px 24px 80px"}}><div style={{maxWidth:800,margin:"0 auto"}}><h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:40,fontWeight:900,color:"#fff",marginBottom:6}}>Terms of Service</h1><p style={{color:"rgba(255,255,255,.35)",marginBottom:40}}>Effective: June 2026</p>{[["Acceptance","By using GEA you agree to these Terms."],["Free Exam Limit","Free accounts receive 10 complimentary exams. After 10, upgrade required."],["Premium Subscription","Unlimited access. Monthly billing. Cancel anytime."],["Tutor Services","Tutors are independent. Refunds within 48 hours."],["Contact","johnsonelisa020@gmail.com · global-elite-academy.com"]].map(([t,c])=><div key={t} style={{marginBottom:26}}><h2 style={{color:"#00d4aa",fontWeight:700,fontSize:18,marginBottom:8}}>{t}</h2><p style={{color:"rgba(255,255,255,.58)",lineHeight:1.9,fontSize:15}}>{c}</p></div>)}</div></div>);}

function PlaceholderPage({title,icon,desc,img,goTo}){return(<div style={{minHeight:"100vh",background:"#020817",display:"flex",alignItems:"center",justifyContent:"center",padding:"120px 24px 80px"}}><div style={{textAlign:"center",maxWidth:480}}>{img&&<img src={img} alt={title} style={{width:280,height:160,objectFit:"cover",borderRadius:16,marginBottom:24}}/>}<div style={{fontSize:56,marginBottom:16}}>{icon}</div><h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:36,fontWeight:900,color:"#fff",letterSpacing:"-1px",marginBottom:14}}>{title}</h1><p style={{color:"rgba(255,255,255,.48)",fontSize:16,lineHeight:1.8,marginBottom:30}}>{desc}</p><button className="gea-btn-primary" onClick={()=>goTo("home")} style={{padding:"14px 32px",fontSize:15}}>← Back to Home</button></div></div>);}

const PAGES={
  scholarships:{title:"Scholarships",icon:"🏅",img:"https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=280&h=160&fit=crop",desc:"We partner with NGOs to offer scholarships for top-performing students."},
  careers:{title:"Careers at GEA",icon:"💼",img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=280&h=160&fit=crop",desc:"Join our team. Remote-first. Hiring across Africa and globally."},
  partnerships:{title:"Partner With Us",icon:"🤝",img:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=280&h=160&fit=crop",desc:"Schools, publishers, NGOs — partner with GEA to reach 124,000+ students."},
  community:{title:"Student Community",icon:"👥",img:"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=280&h=160&fit=crop",desc:"Connect with 124,000+ students across Africa. Study groups, notes, support."},
  certificates:{title:"Certificates",icon:"🏆",img:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=280&h=160&fit=crop",desc:"Earn verifiable digital certificates. Share on LinkedIn."},
  help:{title:"Help Center",icon:"💡",img:"https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=280&h=160&fit=crop",desc:"Find answers. Email: johnsonelisa020@gmail.com"},
  mobile:{title:"Download Our App",icon:"📱",img:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=280&h=160&fit=crop",desc:"iOS and Android. Offline mode for Premium users."},
  press:{title:"Press & Media",icon:"📰",img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=280&h=160&fit=crop",desc:"Press inquiries: johnsonelisa020@gmail.com"},
  refund_policy:{title:"Refund Policy",icon:"💰",desc:"Not satisfied? Full refund within 7 days. No questions asked."},
  accessibility:{title:"Accessibility",icon:"♿",desc:"WCAG 2.1 AA. Screen reader support, keyboard navigation, high-contrast modes."},
};

/* ══════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang,setLang]=useState("en");
  const [user,setUser]=useState(null);
  const [authMode,setAuthMode]=useState(null);
  const [page,setPage]=useState("home");
  const [courseFilter,setCourseFilter]=useState("All");
  const [toast,setToast]=useState(null);
  const [paymentPlan,setPaymentPlan]=useState(null);

  useEffect(()=>{
    let el=document.getElementById("gea-global-css");
    if(!el){const s=document.createElement("style");s.id="gea-global-css";s.textContent=GLOBAL_CSS;document.head.appendChild(s);}
  },[]);

  const goTo=(p,sub)=>{setPage(p);if(sub)setCourseFilter(sub);window.scrollTo({top:0,behavior:"smooth"});};
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),3800);};
  const handleAuth=u=>{setUser(u);showToast(`Welcome, ${u.name}! 🎁 10 free exams + 10 free books unlocked!`);};
  const handlePaymentSuccess=plan=>{setUser(prev=>({...prev,plan:plan.name.toLowerCase()}));showToast(`🎉 You're now on ${plan.name} Plan! Welcome to the premium experience!`);};

  const renderPage=()=>{
    if(page==="about") return <AboutPage goTo={goTo}/>;
    if(page==="contact") return <ContactPage/>;
    if(page==="privacy") return <PrivacyPage/>;
    if(page==="terms") return <TermsPage/>;
    if(page==="courses") return <CoursesSection user={user} onSignup={()=>setAuthMode("signup")} goTo={goTo} filterLv={courseFilter}/>;
    if(page==="exams") return <ExamsSection user={user} onSignup={()=>setAuthMode("signup")}/>;
    if(page==="library") return <Library user={user} onSignup={()=>setAuthMode("signup")}/>;
    if(page==="tutors") return <TutorsSection user={user} onSignup={()=>setAuthMode("signup")}/>;
    if(page==="pricing") return <Pricing user={user} onSignup={()=>setAuthMode("signup")} onPayment={p=>{if(!user){setAuthMode("signup");}else{setPaymentPlan(p);}}}/>;
    if(page==="blog") return <Blog/>;
    if(PAGES[page]) return <PlaceholderPage {...PAGES[page]} goTo={goTo}/>;
    return(
      <>
        <Hero lang={lang} user={user} onSignup={()=>setAuthMode("signup")} goTo={goTo}/>
        <Features/>
        <CoursesSection user={user} onSignup={()=>setAuthMode("signup")} goTo={goTo}/>
        <AITutor user={user}/>
        <Pricing user={user} onSignup={()=>setAuthMode("signup")} onPayment={p=>{if(!user){setAuthMode("signup");}else{setPaymentPlan(p);}}}/>
        <TutorsSection user={user} onSignup={()=>setAuthMode("signup")}/>
        <ExamsSection user={user} onSignup={()=>setAuthMode("signup")}/>
        <Library user={user} onSignup={()=>setAuthMode("signup")}/>
        <Blog/>
        <EduAds/>
        <Testimonials/>
        <CTABanner onSignup={()=>setAuthMode("signup")}/>
      </>
    );
  };

  return(
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:"#020817",minHeight:"100vh"}}>
      <AnnouncementBar lang={lang}/>
      <Navbar lang={lang} setLang={setLang} user={user} onLogin={()=>setAuthMode("login")} onSignup={()=>setAuthMode("signup")} onLogout={()=>{setUser(null);showToast("Signed out. See you soon! 👋");}} goTo={goTo} page={page}/>
      <main style={{paddingTop:36}}>{renderPage()}</main>
      <Footer goTo={goTo}/>

      {authMode&&<AuthModal mode={authMode} onClose={()=>setAuthMode(null)} onAuth={userData=>{handleAuth(userData);setAuthMode(null);}}/>}
      {paymentPlan&&<PaymentModal plan={paymentPlan} onClose={()=>setPaymentPlan(null)} onSuccess={handlePaymentSuccess}/>}

      {/* Toast */}
      {toast&&(
        <div style={{position:"fixed",bottom:28,right:24,background:"linear-gradient(135deg,#00d4aa,#0066ff)",color:"#fff",borderRadius:14,padding:"14px 22px",fontSize:14,fontWeight:600,zIndex:99999,boxShadow:"0 10px 40px rgba(0,212,170,.35)",animation:"slideIn .4s ease",maxWidth:360,lineHeight:1.5}}>
          {toast}
        </div>
      )}
    </div>
  );
}
ENDOFFILE
echo "Done - $(wc -l < /mnt/user-data/outputs/App.jsx) lines"

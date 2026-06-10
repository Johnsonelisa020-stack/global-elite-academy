cat > /mnt/user-data/outputs/GlobalEliteAcademy_2026.jsx << 'ENDOFFILE'
import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const LANGS = [
  { code:"en", flag:"🇺🇸", label:"English" },
  { code:"gb", flag:"🇬🇧", label:"British" },
  { code:"fr", flag:"🇫🇷", label:"Français" },
  { code:"zh", flag:"🇨🇳", label:"中文" },
  { code:"de", flag:"🇩🇪", label:"Deutsch" },
  { code:"sw", flag:"🇹🇿", label:"Kiswahili" },
];

const PLANS = [
  {
    id:"free", name:"Free Explorer", price:0, period:"forever",
    color:"#0057d9", badge:"",
    features:["10 past exam papers / month","3 study notes preview","AI Tutor (5 questions/day)","Community forum access","1 free tutor session","Basic progress tracker"],
    cta:"Get Started Free", popular:false
  },
  {
    id:"basic", name:"Student Basic", price:5, period:"month",
    color:"#0057d9", badge:"POPULAR",
    features:["50 past papers / month","20 study notes full access","AI Tutor unlimited","2 live tutor sessions","Video lessons library","Certificate of completion","Email support"],
    cta:"Start Basic Plan", popular:true
  },
  {
    id:"standard", name:"Scholar Plus", price:29, period:"month",
    color:"#7c3aed", badge:"BEST VALUE",
    features:["Unlimited past papers","All study notes (1,200+)","AI Tutor + essay grading","6 live tutor sessions","10 free eBooks every month","Offline downloads","Priority support","Progress analytics"],
    cta:"Start Scholar Plus", popular:false
  },
  {
    id:"premium", name:"Elite Premium", price:79, period:"month",
    color:"#dc2626", badge:"ALL ACCESS",
    features:["Everything in Scholar Plus","Unlimited tutor sessions","1-on-1 mentorship","University application help","All courses FREE","Parent dashboard access","Dedicated account manager","24/7 phone support"],
    cta:"Go Elite Premium", popular:false
  },
  {
    id:"institution", name:"Institution", price:299, period:"month",
    color:"#0f766e", badge:"SCHOOL/UNIVERSITY",
    features:["Up to 500 student accounts","All premium features","Custom branding","Admin analytics dashboard","API integration","Bulk certificate generation","Dedicated success manager","Custom content upload"],
    cta:"Contact for Institution", popular:false
  },
];

const COURSES = [
  { id:1, title:"Cambridge IGCSE Mathematics", level:"Secondary", price:15, rating:4.9, students:12400, img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=220&fit=crop", category:"Mathematics", lessons:48, duration:"6 months", instructor:"Prof. Sarah Okonkwo" },
  { id:2, title:"A-Level Physics Complete Course", level:"Pre-University", price:20, rating:4.8, students:8900, img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=220&fit=crop", category:"Physics", lessons:62, duration:"8 months", instructor:"Dr. James Chen" },
  { id:3, title:"Biology GCSE Masterclass", level:"Secondary", price:12, rating:4.9, students:15600, img:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=400&h=220&fit=crop", category:"Biology", lessons:35, duration:"4 months", instructor:"Ms. Amina Hassan" },
  { id:4, title:"Organic Chemistry Deep Dive", level:"A-Level", price:18, rating:4.7, students:7200, img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=220&fit=crop", category:"Chemistry", lessons:40, duration:"5 months", instructor:"Dr. Marie Dubois" },
  { id:5, title:"University Discrete Mathematics", level:"University", price:35, rating:4.9, students:4300, img:"https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=220&fit=crop", category:"Mathematics", lessons:55, duration:"6 months", instructor:"Prof. Klaus Weber" },
  { id:6, title:"Computer Science & AI Fundamentals", level:"University", price:45, rating:5.0, students:18900, img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop", category:"Technology", lessons:80, duration:"10 months", instructor:"Mr. Rajesh Sharma" },
  { id:7, title:"English Language & Literature", level:"All Levels", price:10, rating:4.8, students:22100, img:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=220&fit=crop", category:"English", lessons:30, duration:"3 months", instructor:"Dr. Marie Dubois" },
  { id:8, title:"Economics: Micro & Macro", level:"A-Level", price:22, rating:4.7, students:9800, img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=220&fit=crop", category:"Economics", lessons:44, duration:"5 months", instructor:"Prof. Klaus Weber" },
  { id:9, title:"Primary Mathematics (Grades 1–6)", level:"Primary", price:8, rating:4.9, students:31000, img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=220&fit=crop", category:"Mathematics", lessons:90, duration:"12 months", instructor:"Ms. Amina Hassan" },
  { id:10, title:"Geography & Environmental Science", level:"GCSE", price:14, rating:4.6, students:6700, img:"https://images.unsplash.com/photo-1446776709462-d6b525b9c0fd?w=400&h=220&fit=crop", category:"Geography", lessons:28, duration:"3 months", instructor:"Prof. Sarah Okonkwo" },
  { id:11, title:"History: World Wars & Modern Era", level:"GCSE", price:12, rating:4.8, students:11200, img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=220&fit=crop", category:"History", lessons:32, duration:"4 months", instructor:"Prof. Klaus Weber" },
  { id:12, title:"Database Systems & SQL", level:"University", price:40, rating:4.9, students:5600, img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop", category:"Technology", lessons:50, duration:"5 months", instructor:"Mr. Rajesh Sharma" },
];

const TUTORS = [
  { name:"Prof. Sarah Okonkwo", subject:"Mathematics & Statistics", country:"Nigeria / UK", rating:4.9, reviews:1240, sessions:3800, priceBasic:10, priceAdv:20, pricePro:30, img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&faces=true", bio:"PhD Oxford. 18 years university-level mathematics.", quals:"PhD Mathematics, Oxford University", available:true, level:"University" },
  { name:"Dr. James Chen", subject:"Physics & Engineering", country:"China / USA", rating:4.8, reviews:980, sessions:2700, priceBasic:10, priceAdv:20, pricePro:25, img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop", bio:"MIT graduate. 15 years research and teaching.", quals:"PhD Physics, MIT", available:true, level:"A-Level/University" },
  { name:"Ms. Amina Hassan", subject:"Biology & Chemistry", country:"Kenya / Canada", rating:4.9, reviews:1560, sessions:4200, priceBasic:10, priceAdv:15, pricePro:25, img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop", bio:"Medical doctor turned passionate educator.", quals:"MBBS, MSc Education, Toronto", available:true, level:"GCSE/A-Level" },
  { name:"Prof. Klaus Weber", subject:"Economics & Business", country:"Germany", rating:4.7, reviews:720, sessions:1900, priceBasic:10, priceAdv:20, pricePro:30, img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop", bio:"Former World Bank economist.", quals:"PhD Economics, Humboldt University", available:false, level:"A-Level/University" },
  { name:"Dr. Marie Dubois", subject:"French & Literature", country:"France / Senegal", rating:4.8, reviews:890, sessions:2300, priceBasic:10, priceAdv:15, pricePro:20, img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop", bio:"Native French speaker. Francophone literature expert.", quals:"PhD Linguistics, Sorbonne", available:true, level:"All Levels" },
  { name:"Mr. Rajesh Sharma", subject:"Computer Science & AI", country:"India / USA", rating:4.9, reviews:2100, sessions:5800, priceBasic:15, priceAdv:25, pricePro:30, img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", bio:"Former Google engineer. Expert in AI and coding.", quals:"MSc Computer Science, Stanford", available:true, level:"University" },
];

const PAST_PAPERS = [
  { subject:"Mathematics", level:"GCSE / Form 4", org:"Cambridge IGCSE", year:"2024", img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=160&fit=crop", free:true },
  { subject:"Physics", level:"A-Level / Form 6", org:"Cambridge", year:"2024", img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=160&fit=crop", free:true },
  { subject:"Chemistry", level:"A-Level", org:"AQA / Edexcel", year:"2024", img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=160&fit=crop", free:true },
  { subject:"Biology", level:"GCSE", org:"OCR / NECTA", year:"2024", img:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=300&h=160&fit=crop", free:true },
  { subject:"English Language", level:"All Levels", org:"NECTA / Cambridge", year:"2023", img:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=160&fit=crop", free:true },
  { subject:"Advanced Mathematics", level:"University", org:"IAA / Cambridge", year:"2024", img:"https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=300&h=160&fit=crop", free:false },
  { subject:"Computer Science", level:"University", org:"IAA", year:"2024", img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=160&fit=crop", free:false },
  { subject:"Economics", level:"A-Level", org:"IB / NECTA", year:"2023", img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=160&fit=crop", free:false },
  { subject:"History", level:"GCSE", org:"Cambridge", year:"2023", img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=160&fit=crop", free:true },
  { subject:"Geography", level:"GCSE", org:"AQA", year:"2023", img:"https://images.unsplash.com/photo-1446776709462-d6b525b9c0fd?w=300&h=160&fit=crop", free:true },
];

const EBOOKS = [
  { title:"IGCSE Mathematics Complete Guide", author:"Prof. Sarah Okonkwo", pages:320, img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=160&h=220&fit=crop", level:"GCSE", free:true },
  { title:"A-Level Physics Revision Bible", author:"Dr. James Chen", pages:480, img:"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=160&h=220&fit=crop", level:"A-Level", free:true },
  { title:"Biology Mastery Handbook", author:"Ms. Amina Hassan", pages:290, img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=160&h=220&fit=crop", level:"GCSE", free:true },
  { title:"University Economics Textbook", author:"Prof. Klaus Weber", pages:560, img:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=160&h=220&fit=crop", level:"University", free:false },
  { title:"Coding in Python: Start to Expert", author:"Mr. Rajesh Sharma", pages:410, img:"https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=160&h=220&fit=crop", level:"University", free:false },
  { title:"French Language Complete Course", author:"Dr. Marie Dubois", pages:240, img:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=160&h=220&fit=crop", level:"All Levels", free:true },
];

const TESTIMONIALS = [
  { name:"Priya Patel", country:"India 🇮🇳", role:"Medical Student", text:"The AI Tutor helped me pass my A-Level Biology with an A*. The 24/7 access meant I could study even at midnight before exams.", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", rating:5 },
  { name:"Lucas Fernandez", country:"Brazil 🇧🇷", role:"GCSE Student", text:"I used the free 10 past papers every month for 3 months. My maths grade jumped from C to A. Now I'm on Scholar Plus!", img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop", rating:5 },
  { name:"Aisha Mwangi", country:"Kenya 🇰🇪", role:"University Student", text:"As a first-generation university student, GEA gave me resources I could never afford. The Kiswahili support made everything accessible.", img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop", rating:5 },
  { name:"Hannah Schmidt", country:"Germany 🇩🇪", role:"Parent", text:"My daughter uses GEA every day. The parent dashboard shows her progress in real time. Worth every euro of the subscription.", img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop", rating:5 },
  { name:"Yaw Asante", country:"Ghana 🇬🇭", role:"A-Level Student", text:"Got a live session with Dr. Chen at $20. He explained quantum physics in 45 minutes better than my teacher did in a term.", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", rating:5 },
];

const BLOG_POSTS = [
  { title:"How AI is Transforming Education in 2026", date:"Jun 2026", readTime:"5 min", img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=220&fit=crop", category:"AI & Tech", excerpt:"From personalized learning paths to real-time feedback, AI tutors are reshaping how millions of students learn globally." },
  { title:"Top Study Techniques Backed by Neuroscience", date:"May 2026", readTime:"7 min", img:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=220&fit=crop", category:"Study Tips", excerpt:"Spaced repetition, interleaving, and active recall — the science-backed methods top students use to retain 80% more information." },
  { title:"Cambridge IGCSE vs IB: Which Is Right For You?", date:"May 2026", readTime:"8 min", img:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=220&fit=crop", category:"Curriculum", excerpt:"A detailed comparison of two of the world's most recognized qualifications to help you make the right choice." },
  { title:"How to Prepare for University Entrance Exams", date:"Apr 2026", readTime:"6 min", img:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=220&fit=crop", category:"University", excerpt:"Expert strategies from our tutors on tackling SAT, A-Levels, NECTA, and other university entrance examinations." },
  { title:"The Future of Remote Learning: 2026–2030", date:"Apr 2026", readTime:"9 min", img:"https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=220&fit=crop", category:"Future of Ed", excerpt:"Immersive classrooms, AI companions, and global credentials — here's what education looks like in the next 4 years." },
  { title:"10 Study Habits of Top-Performing Students", date:"Mar 2026", readTime:"4 min", img:"https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=220&fit=crop", category:"Study Tips", excerpt:"We analyzed 1,000 high achievers. These are the daily habits that consistently separate A students from the rest." },
];

const FAQS = [
  { q:"Is the free plan really free forever?", a:"Yes. Our Free Explorer plan gives you 10 past papers per month, AI Tutor access (5 questions/day), and community forum — completely free, no credit card required." },
  { q:"How does the 10 free eBooks for sign-in members work?", a:"When you create a free account, you unlock 10 free eBooks from our library every month, refreshed at the start of each month. Premium members get unlimited eBook access." },
  { q:"What payment methods do you accept?", a:"We accept Visa, Mastercard, PayPal, Apple Pay, Google Pay, and direct bank transfers via SWIFT/SEPA. All payments are encrypted and secure." },
  { q:"Can I cancel my subscription anytime?", a:"Absolutely. Cancel anytime with one click from your dashboard. No cancellation fees, no questions asked. Your access continues until the end of your billing period." },
  { q:"How do I book a live session with a tutor?", a:"Go to the Tutors page, pick your tutor and subject, choose an available time slot, and pay per session ($10–$30 depending on level). You'll get a video link instantly." },
  { q:"Is content available in all 6 languages?", a:"Our AI Tutor responds in all 6 languages. Core courses are in English with subtitles/translations. We're actively adding full native-language courses in Swahili, French, German, and Chinese." },
  { q:"Do exams and past papers cost money?", a:"The first 10 past papers per month are completely free. After that, you need a paid plan. Premium members get unlimited access to all 500+ past papers." },
  { q:"Is there a student or school discount?", a:"Yes! Students with a valid .edu email get 30% off any plan. Schools and institutions get custom pricing starting at $299/month for up to 500 students." },
];

// ─── MOTION IMAGES ────────────────────────────────────────────────────────────
const MOTION_IMAGES = [
  { src:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop", caption:"Children learning together" },
  { src:"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop", caption:"Students exploring science" },
  { src:"https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop", caption:"Parent and child reading" },
  { src:"https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=400&fit=crop", caption:"AI-powered classroom" },
  { src:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop", caption:"University students collaborating" },
  { src:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop", caption:"Creative student projects" },
];

const NAV_PAGES = ["home","courses","papers","tutors","library","blog","pricing","about","contact","faq","signin","dashboard"];
const NAV_ICONS = { home:"🏠", courses:"🎓", papers:"📄", tutors:"👨‍🏫", library:"📚", blog:"📰", pricing:"💳", about:"ℹ️", contact:"📞", faq:"❓", signin:"🔑", dashboard:"📊" };
const MAIN_NAV = ["home","courses","papers","tutors","library","blog","pricing","about","contact"];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [aiQ, setAiQ] = useState("");
  const [aiA, setAiA] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [signinForm, setSigninForm] = useState({ email:"", pass:"" });
  const [signupForm, setSignupForm] = useState({ name:"", email:"", pass:"", level:"" });
  const [contactForm, setContactForm] = useState({ name:"", email:"", subject:"", msg:"" });
  const [contactSent, setContactSent] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [motionIdx, setMotionIdx] = useState(0);
  const [showAds, setShowAds] = useState(true);
  const [faqOpen, setFaqOpen] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [payOpen, setPayOpen] = useState(false);
  const [payStep, setPayStep] = useState(1);
  const [payMethod, setPayMethod] = useState("");
  const [notification, setNotification] = useState(null);
  const [courseFilter, setCourseFilter] = useState("All");
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const timerRef = useRef(null);

  // Motion image slideshow
  useEffect(() => {
    const t = setInterval(() => setMotionIdx(i => (i+1) % MOTION_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Testimonial auto-scroll
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i+1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  function notify(msg, type="success") {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  }

  function goPage(p) {
    setPage(p); setMenuOpen(false); setSearch("");
    window.scrollTo(0,0);
  }

  async function askAI() {
    if (!aiQ.trim()) return;
    setAiLoading(true); setAiA("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1200,
          system:"You are a world-class educational AI tutor for Global Elite Academy (2026). Help students from primary to university level worldwide. Give structured, clear, encouraging answers. Match the student's language automatically. Use examples and step-by-step explanations.",
          messages:[{ role:"user", content: aiQ }]
        })
      });
      const data = await res.json();
      setAiA(data.content?.map(b=>b.text||"").join("") || "Please try again.");
    } catch(e) { setAiA("Network error. Please check your connection."); }
    setAiLoading(false);
  }

  function handleSignin(e) {
    e.preventDefault();
    if (signinForm.email && signinForm.pass) {
      setUser({ name: signinForm.email.split("@")[0], email: signinForm.email, plan:"free", books:10 });
      setSigninOpen(false);
      notify("Welcome back! You have 10 free eBooks this month. 📚");
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    if (signupForm.name && signupForm.email && signupForm.pass) {
      setUser({ name: signupForm.name, email: signupForm.email, plan:"free", books:10 });
      setSignupOpen(false);
      notify("🎉 Account created! 10 free eBooks unlocked for you.");
    }
  }

  function handlePayment() {
    if (payStep === 1 && payMethod) { setPayStep(2); return; }
    if (payStep === 2) {
      setPayOpen(false); setPayStep(1); setPayMethod("");
      if (user) setUser({...user, plan: selectedPlan?.id || "basic"});
      notify(`🎉 Subscribed to ${selectedPlan?.name}! All features unlocked.`);
    }
  }

  const courseCats = ["All", ...new Set(COURSES.map(c=>c.category))];
  const filteredCourses = COURSES.filter(c =>
    (courseFilter === "All" || c.category === courseFilter) &&
    (search === "" || c.title.toLowerCase().includes(search.toLowerCase()))
  );

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:'Inter',sans-serif;background:#f0f7ff;color:#1a2744;overflow-x:hidden;}
    .app{min-height:100vh;}

    /* NOTIFICATION */
    .notif{position:fixed;top:80px;right:20px;z-index:9999;background:#fff;border:1.5px solid #0057d9;border-radius:12px;padding:14px 20px;font-size:14px;font-weight:600;color:#1a2744;box-shadow:0 8px 32px rgba(0,87,217,0.2);max-width:340px;animation:slideIn .3s ease;}
    @keyframes slideIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}

    /* NAV */
    .topnav{background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);border-bottom:1.5px solid #e3f0ff;position:sticky;top:0;z-index:200;box-shadow:0 2px 20px rgba(0,87,217,0.07);}
    .nav-inner{max-width:1300px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:66px;}
    .nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer;}
    .nav-logo-icon{width:42px;height:42px;background:linear-gradient(135deg,#0057d9,#4ea8ff);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 4px 12px rgba(0,87,217,0.3);}
    .nav-logo-text{font-weight:800;font-size:16px;color:#0057d9;font-family:'Playfair Display',serif;line-height:1.1;}
    .nav-logo-sub{font-size:10px;color:#6b84a0;font-weight:500;}
    .nav-links{display:flex;gap:2px;align-items:center;}
    .nav-link{padding:7px 11px;border-radius:8px;cursor:pointer;font-size:13.5px;font-weight:500;color:#3a5070;border:none;background:none;transition:all .15s;white-space:nowrap;}
    .nav-link:hover,.nav-link.active{background:#e8f1ff;color:#0057d9;font-weight:600;}
    .nav-right{display:flex;align-items:center;gap:8px;}
    .lang-select{padding:5px 8px;border-radius:8px;border:1.5px solid #cde0ff;background:#f0f7ff;color:#0057d9;font-size:12px;font-weight:600;cursor:pointer;}
    .nav-btn-outline{padding:7px 14px;border-radius:8px;border:1.5px solid #0057d9;background:transparent;color:#0057d9;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;}
    .nav-btn-outline:hover{background:#0057d9;color:#fff;}
    .nav-btn-primary{padding:7px 16px;border-radius:8px;border:none;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;box-shadow:0 3px 10px rgba(0,87,217,0.3);}
    .nav-btn-primary:hover{transform:translateY(-1px);box-shadow:0 5px 15px rgba(0,87,217,0.4);}
    .user-pill{display:flex;align-items:center;gap:6px;padding:5px 12px;background:#e8f1ff;border-radius:20px;font-size:13px;font-weight:600;color:#0057d9;cursor:pointer;}
    .hamburger{display:none;font-size:24px;cursor:pointer;color:#0057d9;background:none;border:none;}
    .mobile-menu{display:none;background:#fff;border-top:1px solid #e3f0ff;padding:12px 20px 20px;max-height:80vh;overflow-y:auto;}
    .mobile-menu.open{display:block;}
    .mobile-link{display:block;padding:11px 14px;border-radius:8px;cursor:pointer;font-size:15px;color:#1a2744;margin:2px 0;font-weight:500;}
    .mobile-link:hover,.mobile-link.active{background:#e8f1ff;color:#0057d9;}

    /* ANNOUNCEMENT */
    .announcement{background:linear-gradient(90deg,#0057d9,#1d6fec,#4ea8ff);color:#fff;text-align:center;padding:10px 20px;font-size:13.5px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;}
    .ann-close{background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;font-size:18px;margin-left:8px;flex-shrink:0;}
    .ann-link{color:#fff;font-weight:700;text-decoration:underline;cursor:pointer;}

    /* HERO */
    .hero{background:linear-gradient(135deg,#002a87 0%,#0057d9 45%,#1a8cff 80%,#4ea8ff 100%);padding:90px 20px 100px;position:relative;overflow:hidden;}
    .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 50%,rgba(78,168,255,0.15) 0%,transparent 70%),url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3C/g%3E%3C/svg%3E");pointer-events:none;}
    .hero-inner{max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;position:relative;}
    .hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:#fff;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:20px;letter-spacing:.5px;backdrop-filter:blur(8px);}
    .hero-title{font-family:'Playfair Display',serif;font-size:clamp(34px,4.5vw,58px);font-weight:900;color:#fff;line-height:1.1;margin-bottom:18px;text-shadow:0 2px 30px rgba(0,0,0,0.2);}
    .hero-title span{color:#93c5fd;}
    .hero-sub{color:rgba(255,255,255,0.85);font-size:clamp(15px,1.8vw,18px);line-height:1.7;margin-bottom:32px;}
    .hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:36px;}
    .btn-hero-primary{padding:14px 28px;background:#fff;color:#0057d9;border-radius:10px;font-weight:800;font-size:15px;cursor:pointer;border:none;transition:all .2s;box-shadow:0 6px 20px rgba(0,0,0,0.15);}
    .btn-hero-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,0.2);}
    .btn-hero-outline{padding:14px 28px;background:transparent;color:#fff;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;border:2px solid rgba(255,255,255,0.6);transition:all .2s;}
    .btn-hero-outline:hover{background:rgba(255,255,255,0.15);border-color:#fff;}
    .hero-stats{display:flex;gap:24px;flex-wrap:wrap;}
    .hero-stat{text-align:center;}
    .hero-stat-n{font-size:26px;font-weight:900;color:#fff;font-family:'Playfair Display',serif;}
    .hero-stat-l{font-size:11px;color:rgba(255,255,255,0.7);font-weight:500;}
    .hero-media{position:relative;}
    .hero-img-wrap{border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.3);aspect-ratio:4/3;position:relative;}
    .hero-img-wrap img{width:100%;height:100%;object-fit:cover;transition:opacity 1s ease;}
    .hero-img-caption{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(0,0,0,0.7),transparent);color:#fff;padding:20px 16px 14px;font-size:13px;font-weight:600;}
    .hero-floating{position:absolute;background:#fff;border-radius:14px;padding:12px 16px;box-shadow:0 8px 24px rgba(0,0,0,0.15);font-size:13px;font-weight:700;color:#1a2744;display:flex;align-items:center;gap:8px;}
    .hero-floating.top-left{top:-14px;left:-20px;}
    .hero-floating.bottom-right{bottom:-14px;right:-20px;}
    .hero-ads-toggle{position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.5);color:#fff;border:none;border-radius:8px;padding:6px 10px;font-size:11px;cursor:pointer;font-weight:600;}

    /* STATS BAR */
    .stats-bar{background:#fff;border-bottom:2px solid #e3f0ff;}
    .stats-grid{max-width:1300px;margin:0 auto;padding:20px;display:grid;grid-template-columns:repeat(5,1fr);}
    .stat-item{text-align:center;padding:10px 8px;border-right:1px solid #e3f0ff;}
    .stat-item:last-child{border-right:none;}
    .stat-num{font-size:28px;font-weight:900;color:#0057d9;font-family:'Playfair Display',serif;}
    .stat-lbl{font-size:11.5px;color:#6b84a0;font-weight:500;margin-top:2px;}

    /* CONTAINER */
    .container{max-width:1300px;margin:0 auto;padding:0 20px;}
    .section{padding:72px 0;background:#f0f7ff;}
    .section-white{padding:72px 0;background:#fff;}
    .section-dark{padding:72px 0;background:linear-gradient(135deg,#002a87,#0057d9);}

    /* SECTION HEADER */
    .sec-hd{text-align:center;margin-bottom:46px;}
    .sec-eyebrow{display:inline-block;background:#e8f1ff;color:#0057d9;padding:4px 16px;border-radius:20px;font-size:11.5px;font-weight:700;letter-spacing:.6px;margin-bottom:12px;text-transform:uppercase;}
    .sec-eyebrow.light{background:rgba(255,255,255,0.2);color:#fff;}
    .sec-title{font-family:'Playfair Display',serif;font-size:clamp(24px,3.5vw,40px);font-weight:800;color:#1a2744;margin-bottom:12px;line-height:1.15;}
    .sec-title.light{color:#fff;}
    .sec-desc{color:#5a7090;font-size:16px;max-width:600px;margin:0 auto;line-height:1.7;}
    .sec-desc.light{color:rgba(255,255,255,0.8);}

    /* BUTTONS */
    .btn-primary{padding:12px 26px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14.5px;cursor:pointer;transition:all .2s;box-shadow:0 4px 14px rgba(0,87,217,0.3);}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,87,217,0.4);}
    .btn-outline{padding:12px 26px;border:2px solid #0057d9;background:transparent;color:#0057d9;border-radius:10px;font-weight:700;font-size:14.5px;cursor:pointer;transition:all .2s;}
    .btn-outline:hover{background:#0057d9;color:#fff;}
    .btn-white{padding:12px 26px;background:#fff;color:#0057d9;border:none;border-radius:10px;font-weight:700;font-size:14.5px;cursor:pointer;transition:all .2s;}
    .btn-white:hover{transform:translateY(-2px);}
    .btn-sm{padding:8px 16px;font-size:13px;}

    /* FEATURES GRID */
    .features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;}
    .feature-card{background:#fff;border-radius:18px;padding:28px 22px;border:1.5px solid #e3f0ff;transition:all .22s;cursor:pointer;text-align:center;}
    .feature-card:hover{border-color:#0057d9;transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,87,217,0.1);}
    .feature-icon{width:60px;height:60px;background:linear-gradient(135deg,#e8f1ff,#cde0ff);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 16px;}
    .feature-title{font-size:16px;font-weight:700;color:#1a2744;margin-bottom:8px;}
    .feature-desc{font-size:13.5px;color:#6b84a0;line-height:1.6;}

    /* COURSE CARDS */
    .courses-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:22px;}
    .course-card{background:#fff;border-radius:18px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .22s;}
    .course-card:hover{border-color:#0057d9;transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,87,217,0.1);}
    .course-img{width:100%;height:170px;object-fit:cover;position:relative;display:block;}
    .course-badge{position:absolute;top:12px;left:12px;background:#0057d9;color:#fff;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
    .course-body{padding:18px;}
    .course-cat{font-size:11px;color:#0057d9;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px;}
    .course-title{font-size:15px;font-weight:700;color:#1a2744;margin-bottom:8px;line-height:1.4;}
    .course-meta{display:flex;gap:12px;font-size:12px;color:#6b84a0;margin-bottom:12px;flex-wrap:wrap;}
    .course-footer{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #f0f7ff;padding-top:12px;}
    .course-price{font-size:18px;font-weight:900;color:#0057d9;}
    .course-price span{font-size:12px;color:#6b84a0;font-weight:400;}
    .course-rating{font-size:12px;color:#f59e0b;font-weight:700;}
    .enroll-btn{padding:8px 16px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;}
    .enroll-btn:hover{opacity:.9;}

    /* FILTER TABS */
    .filter-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px;}
    .filter-tab{padding:7px 16px;border-radius:20px;border:1.5px solid #cde0ff;background:#fff;color:#3a5070;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;}
    .filter-tab:hover,.filter-tab.active{background:#0057d9;color:#fff;border-color:#0057d9;}

    /* PAPER CARDS */
    .paper-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:18px;}
    .paper-card{background:#fff;border-radius:16px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .2s;}
    .paper-card:hover{border-color:#0057d9;box-shadow:0 10px 32px rgba(0,87,217,0.1);transform:translateY(-3px);}
    .paper-img{width:100%;height:100px;object-fit:cover;}
    .paper-body{padding:14px 16px;}
    .paper-subject{font-size:14.5px;font-weight:700;color:#1a2744;margin-bottom:4px;}
    .paper-meta{font-size:11.5px;color:#6b84a0;margin-bottom:10px;}
    .paper-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;}
    .paper-tag{display:inline-block;background:#e8f1ff;color:#0057d9;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .paper-tag.premium{background:#fef3c7;color:#b45309;}
    .paper-dl-btn{display:block;width:100%;padding:9px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;text-align:center;}
    .paper-dl-btn.locked{background:linear-gradient(135deg,#6b84a0,#94a3b8);}

    /* TUTOR CARDS */
    .tutors-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:22px;}
    .tutor-card{background:#fff;border-radius:20px;padding:28px;border:1.5px solid #e3f0ff;transition:all .22s;}
    .tutor-card:hover{border-color:#0057d9;box-shadow:0 12px 40px rgba(0,87,217,0.1);transform:translateY(-3px);}
    .tutor-hdr{display:flex;gap:16px;align-items:flex-start;margin-bottom:16px;}
    .tutor-img-wrap{position:relative;flex-shrink:0;}
    .tutor-img{width:76px;height:76px;border-radius:50%;object-fit:cover;border:3px solid #e3f0ff;}
    .tutor-avail{position:absolute;bottom:2px;right:2px;width:16px;height:16px;border-radius:50%;border:2px solid #fff;}
    .tutor-avail.online{background:#22c55e;}
    .tutor-avail.offline{background:#94a3b8;}
    .tutor-name{font-size:16px;font-weight:700;color:#1a2744;}
    .tutor-subj{font-size:13px;color:#0057d9;font-weight:600;margin:2px 0;}
    .tutor-country{font-size:12px;color:#6b84a0;}
    .tutor-quals{font-size:11.5px;color:#0057d9;background:#e8f1ff;padding:4px 12px;border-radius:20px;display:inline-block;margin-bottom:10px;}
    .tutor-bio{font-size:13px;color:#5a7090;line-height:1.6;margin-bottom:14px;}
    .tutor-stats{display:flex;gap:16px;margin-bottom:16px;}
    .tutor-stat{text-align:center;}
    .tutor-stat-n{font-size:16px;font-weight:800;color:#1a2744;}
    .tutor-stat-l{font-size:10.5px;color:#6b84a0;}
    .tutor-prices{background:#f0f7ff;border-radius:12px;padding:14px;margin-bottom:14px;}
    .tutor-price-row{display:flex;justify-content:space-between;align-items:center;padding:4px 0;font-size:13px;}
    .tutor-price-row:not(:last-child){border-bottom:1px solid #e3f0ff;}
    .tutor-price-label{color:#6b84a0;font-weight:500;}
    .tutor-price-val{color:#0057d9;font-weight:700;}
    .book-btn{display:block;width:100%;padding:10px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;text-align:center;}
    .star-row{display:flex;align-items:center;gap:4px;margin-bottom:12px;}
    .stars{color:#f59e0b;font-size:13px;}
    .rating-n{font-size:14px;font-weight:800;color:#1a2744;}
    .reviews-c{font-size:11.5px;color:#6b84a0;}

    /* EBOOK CARDS */
    .books-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:20px;}
    .book-card{background:#fff;border-radius:14px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .2s;cursor:pointer;}
    .book-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,87,217,0.1);border-color:#0057d9;}
    .book-cover{width:100%;height:200px;object-fit:cover;}
    .book-body{padding:12px;}
    .book-title{font-size:13px;font-weight:700;color:#1a2744;margin-bottom:4px;line-height:1.4;}
    .book-author{font-size:11.5px;color:#6b84a0;margin-bottom:8px;}
    .book-tag{display:inline-block;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .book-tag.free{background:#d1fae5;color:#065f46;}
    .book-tag.premium{background:#fef3c7;color:#b45309;}

    /* PRICING */
    .pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;align-items:start;}
    .price-card{background:#fff;border-radius:20px;padding:28px 24px;border:2px solid #e3f0ff;transition:all .22s;position:relative;}
    .price-card.popular{border-color:#0057d9;box-shadow:0 12px 40px rgba(0,87,217,0.15);transform:scale(1.02);}
    .price-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);padding:4px 16px;border-radius:20px;font-size:11px;font-weight:800;white-space:nowrap;}
    .price-name{font-size:17px;font-weight:800;color:#1a2744;margin-bottom:6px;margin-top:8px;}
    .price-amount{font-size:38px;font-weight:900;color:#0057d9;line-height:1;margin-bottom:4px;font-family:'Playfair Display',serif;}
    .price-amount span{font-size:16px;font-weight:600;color:#6b84a0;}
    .price-period{font-size:13px;color:#6b84a0;margin-bottom:20px;}
    .price-features{list-style:none;margin-bottom:24px;}
    .price-features li{padding:6px 0;font-size:13.5px;color:#3a5070;display:flex;align-items:flex-start;gap:8px;border-bottom:1px solid #f0f7ff;}
    .price-features li::before{content:'✓';color:#22c55e;font-weight:800;flex-shrink:0;margin-top:1px;}
    .price-btn{display:block;width:100%;padding:12px;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;text-align:center;transition:all .2s;}
    .price-btn.primary{background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;box-shadow:0 4px 14px rgba(0,87,217,0.3);}
    .price-btn.primary:hover{transform:translateY(-2px);}
    .price-btn.outline{background:transparent;border:2px solid #0057d9;color:#0057d9;}
    .price-btn.outline:hover{background:#0057d9;color:#fff;}

    /* TESTIMONIALS */
    .testimonial-wrap{max-width:800px;margin:0 auto;text-align:center;}
    .testimonial-card{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:36px 40px;backdrop-filter:blur(10px);}
    .testimonial-text{font-size:18px;color:#fff;line-height:1.75;margin-bottom:24px;font-style:italic;}
    .testimonial-author{display:flex;align-items:center;justify-content:center;gap:14px;}
    .testimonial-img{width:54px;height:54px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.4);}
    .testimonial-name{font-weight:700;color:#fff;font-size:15px;}
    .testimonial-role{font-size:12.5px;color:rgba(255,255,255,0.7);}
    .testimonial-dots{display:flex;gap:8px;justify-content:center;margin-top:20px;}
    .t-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.3);cursor:pointer;transition:all .2s;}
    .t-dot.active{background:#fff;width:20px;border-radius:4px;}

    /* BLOG */
    .blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:22px;}
    .blog-card{background:#fff;border-radius:18px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .2s;cursor:pointer;}
    .blog-card:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,87,217,0.1);border-color:#0057d9;}
    .blog-img{width:100%;height:180px;object-fit:cover;}
    .blog-body{padding:18px;}
    .blog-cat{font-size:11px;color:#0057d9;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px;}
    .blog-title{font-size:15.5px;font-weight:700;color:#1a2744;margin-bottom:8px;line-height:1.45;}
    .blog-excerpt{font-size:13px;color:#6b84a0;line-height:1.6;margin-bottom:12px;}
    .blog-meta{display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;}

    /* AI BOX */
    .ai-section{background:linear-gradient(135deg,#001d6e,#0057d9,#1a8cff);border-radius:24px;padding:52px 48px;position:relative;overflow:hidden;}
    .ai-section::before{content:'';position:absolute;top:-50%;right:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(78,168,255,0.2),transparent 70%);pointer-events:none;}
    .ai-title{font-family:'Playfair Display',serif;font-size:clamp(26px,3vw,40px);font-weight:800;color:#fff;margin-bottom:10px;}
    .ai-sub{color:rgba(255,255,255,0.8);font-size:16px;margin-bottom:32px;max-width:600px;}
    .ai-input-row{display:flex;gap:12px;max-width:740px;margin-bottom:20px;}
    .ai-textarea{flex:1;padding:14px 18px;border-radius:12px;border:none;font-size:15px;resize:none;min-height:56px;font-family:'Inter',sans-serif;outline:none;background:#fff;}
    .ai-send-btn{padding:14px 22px;background:rgba(255,255,255,0.15);color:#fff;border:2px solid rgba(255,255,255,0.4);border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;backdrop-filter:blur(8px);transition:all .2s;}
    .ai-send-btn:hover:not(:disabled){background:rgba(255,255,255,0.25);border-color:#fff;}
    .ai-send-btn:disabled{opacity:.5;cursor:not-allowed;}
    .ai-answer{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:14px;padding:22px;text-align:left;font-size:14.5px;line-height:1.8;color:#fff;white-space:pre-wrap;max-width:740px;}
    .ai-answer-lbl{font-weight:700;color:rgba(255,255,255,0.6);font-size:11px;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px;}
    .ai-thinking{display:flex;align-items:center;gap:10px;padding:16px 0;color:rgba(255,255,255,0.8);}
    .dp{display:flex;gap:5px;}
    .dp span{width:8px;height:8px;background:#fff;border-radius:50%;animation:dpa 1.2s infinite;}
    .dp span:nth-child(2){animation-delay:.2s;}
    .dp span:nth-child(3){animation-delay:.4s;}
    @keyframes dpa{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}

    /* ABOUT */
    .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
    .about-card{background:#fff;border-radius:18px;padding:28px;border:1.5px solid #e3f0ff;}
    .about-card-title{font-size:16px;font-weight:700;color:#0057d9;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
    .about-card-text{font-size:14px;color:#5a7090;line-height:1.7;}

    /* CONTACT */
    .contact-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:28px;}
    .contact-info-card,.contact-form-card{background:#fff;border-radius:18px;padding:30px;border:1.5px solid #e3f0ff;}
    .contact-info-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px;}
    .ci-icon{width:46px;height:46px;background:#e8f1ff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
    .ci-label{font-size:11.5px;color:#6b84a0;font-weight:700;text-transform:uppercase;letter-spacing:.4px;}
    .ci-val{font-size:15px;color:#1a2744;font-weight:600;}
    .form-group{margin-bottom:16px;}
    .form-label{display:block;font-size:13px;font-weight:600;color:#3a5070;margin-bottom:6px;}
    .form-input,.form-textarea,.form-select{width:100%;padding:11px 14px;border-radius:9px;border:1.5px solid #cde0ff;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border .2s;background:#fff;}
    .form-input:focus,.form-textarea:focus,.form-select:focus{border-color:#0057d9;box-shadow:0 0 0 3px rgba(0,87,217,0.08);}
    .form-textarea{min-height:110px;resize:vertical;}
    .submit-btn{width:100%;padding:13px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;}
    .submit-btn:hover{opacity:.9;transform:translateY(-1px);}
    .success-msg{background:#e8f8ef;border:1.5px solid #34d399;color:#065f46;padding:14px;border-radius:10px;text-align:center;font-weight:600;margin-top:12px;}

    /* FAQ */
    .faq-list{max-width:800px;margin:0 auto;}
    .faq-item{background:#fff;border-radius:14px;border:1.5px solid #e3f0ff;margin-bottom:12px;overflow:hidden;transition:all .2s;}
    .faq-item.open{border-color:#0057d9;box-shadow:0 4px 20px rgba(0,87,217,0.08);}
    .faq-q{padding:18px 22px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-size:15px;font-weight:600;color:#1a2744;}
    .faq-q:hover{color:#0057d9;}
    .faq-icon{font-size:20px;color:#0057d9;transition:transform .2s;flex-shrink:0;}
    .faq-icon.open{transform:rotate(45deg);}
    .faq-a{padding:0 22px 18px;font-size:14px;color:#5a7090;line-height:1.7;border-top:1px solid #e3f0ff;margin-top:0;}

    /* SEARCH */
    .search-wrap{display:flex;gap:10px;margin-bottom:28px;}
    .search-input{flex:1;padding:12px 18px;border-radius:10px;border:1.5px solid #cde0ff;font-size:15px;outline:none;transition:border .2s;font-family:'Inter',sans-serif;}
    .search-input:focus{border-color:#0057d9;box-shadow:0 0 0 3px rgba(0,87,217,0.08);}

    /* MODAL OVERLAY */
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);}
    .modal{background:#fff;border-radius:20px;padding:36px;width:100%;max-width:460px;box-shadow:0 24px 60px rgba(0,0,0,0.2);max-height:90vh;overflow-y:auto;}
    .modal-title{font-family:'Playfair Display',serif;font-size:24px;font-weight:800;color:#1a2744;margin-bottom:6px;}
    .modal-sub{font-size:14px;color:#6b84a0;margin-bottom:24px;}
    .modal-close{position:absolute;top:16px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:#6b84a0;position:relative;float:right;margin-top:-20px;margin-right:-10px;}
    .modal-footer{margin-top:18px;text-align:center;font-size:13.5px;color:#6b84a0;}
    .modal-link{color:#0057d9;font-weight:700;cursor:pointer;}
    .pay-method-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
    .pay-method-btn{padding:14px;border-radius:12px;border:2px solid #e3f0ff;background:#fff;cursor:pointer;text-align:center;font-size:14px;font-weight:600;transition:all .2s;}
    .pay-method-btn:hover,.pay-method-btn.selected{border-color:#0057d9;background:#e8f1ff;color:#0057d9;}

    /* NEWSLETTER */
    .newsletter-box{background:linear-gradient(135deg,#e8f1ff,#cde0ff);border-radius:20px;padding:48px 40px;text-align:center;}
    .newsletter-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:#1a2744;margin-bottom:10px;}
    .newsletter-sub{color:#5a7090;font-size:15px;margin-bottom:24px;}
    .newsletter-row{display:flex;gap:10px;max-width:480px;margin:0 auto;}
    .newsletter-input{flex:1;padding:12px 16px;border-radius:10px;border:1.5px solid #cde0ff;font-size:14.5px;outline:none;font-family:'Inter',sans-serif;}
    .newsletter-input:focus{border-color:#0057d9;}
    .newsletter-btn{padding:12px 22px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap;}

    /* ADS PANEL */
    .ads-panel{background:linear-gradient(135deg,#f0f7ff,#e8f1ff);border:2px dashed #cde0ff;border-radius:14px;padding:18px;text-align:center;font-size:12.5px;color:#6b84a0;margin:20px 0;}

    /* FOOTER */
    .footer{background:#0b1a3d;color:#fff;padding:56px 20px 28px;}
    .footer-grid{display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr 1.2fr;gap:36px;max-width:1300px;margin:0 auto;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.08);}
    .footer-brand{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#4ea8ff;margin-bottom:10px;}
    .footer-tagline{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.65;margin-bottom:18px;}
    .footer-heading{font-size:12px;font-weight:700;color:#4ea8ff;text-transform:uppercase;letter-spacing:.6px;margin-bottom:14px;}
    .footer-link{display:block;font-size:13px;color:rgba(255,255,255,0.55);margin-bottom:8px;cursor:pointer;transition:color .15s;}
    .footer-link:hover{color:#4ea8ff;}
    .footer-bottom{max-width:1300px;margin:22px auto 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;}
    .footer-copy,.footer-bottom-right{font-size:12px;color:rgba(255,255,255,0.35);}
    .footer-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;}
    .footer-badge{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:6px 12px;font-size:12px;color:rgba(255,255,255,0.6);}

    /* DASHBOARD */
    .dashboard-grid{display:grid;grid-template-columns:240px 1fr;gap:24px;min-height:70vh;}
    .dash-sidebar{background:#fff;border-radius:18px;border:1.5px solid #e3f0ff;padding:24px;}
    .dash-content{background:#fff;border-radius:18px;border:1.5px solid #e3f0ff;padding:28px;}
    .dash-nav-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;color:#3a5070;margin-bottom:4px;}
    .dash-nav-item:hover,.dash-nav-item.active{background:#e8f1ff;color:#0057d9;font-weight:600;}
    .progress-bar-wrap{background:#e3f0ff;border-radius:20px;height:8px;margin:6px 0 16px;}
    .progress-bar{background:linear-gradient(90deg,#0057d9,#4ea8ff);border-radius:20px;height:8px;transition:width .5s;}

    /* RESPONSIVE */
    @media(max-width:1100px){.footer-grid{grid-template-columns:1fr 1fr 1fr;}}
    @media(max-width:900px){
      .hero-inner{grid-template-columns:1fr;}.hero-media{display:none;}
      .stats-grid{grid-template-columns:repeat(3,1fr);}
      .about-grid,.contact-grid{grid-template-columns:1fr;}
      .footer-grid{grid-template-columns:1fr 1fr;}
      .nav-links{display:none;}.hamburger{display:block;}
      .dashboard-grid{grid-template-columns:1fr;}
    }
    @media(max-width:600px){
      .hero{padding:56px 16px 64px;}.stats-grid{grid-template-columns:repeat(2,1fr);}
      .footer-grid{grid-template-columns:1fr;}.ai-input-row{flex-direction:column;}
      .ai-section{padding:30px 18px;}.newsletter-row{flex-direction:column;}.pricing-grid{grid-template-columns:1fr;}
    }
  `;

  // ─── MODAL: SIGN IN ────────────────────────────────────────────────────────
  const SigninModal = () => (
    <div className="modal-overlay" onClick={() => setSigninOpen(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">🔑 Welcome Back</div>
        <div className="modal-sub">Sign in to access your free 10 eBooks and more</div>
        <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" value={signinForm.email} onChange={e=>setSigninForm(f=>({...f,email:e.target.value}))} placeholder="you@email.com"/></div>
        <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={signinForm.pass} onChange={e=>setSigninForm(f=>({...f,pass:e.target.value}))} placeholder="••••••••"/></div>
        <button className="submit-btn" onClick={handleSignin}>Sign In →</button>
        <div className="modal-footer">Don't have an account? <span className="modal-link" onClick={()=>{setSigninOpen(false);setSignupOpen(true);}}>Create one free</span></div>
      </div>
    </div>
  );

  // ─── MODAL: SIGN UP ────────────────────────────────────────────────────────
  const SignupModal = () => (
    <div className="modal-overlay" onClick={() => setSignupOpen(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">🎓 Create Free Account</div>
        <div className="modal-sub">Join 100,000+ students — get 10 free eBooks instantly</div>
        <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={signupForm.name} onChange={e=>setSignupForm(f=>({...f,name:e.target.value}))} placeholder="Your full name"/></div>
        <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={signupForm.email} onChange={e=>setSignupForm(f=>({...f,email:e.target.value}))} placeholder="you@email.com"/></div>
        <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={signupForm.pass} onChange={e=>setSignupForm(f=>({...f,pass:e.target.value}))} placeholder="Create a password"/></div>
        <div className="form-group"><label className="form-label">Your Level</label>
          <select className="form-select" value={signupForm.level} onChange={e=>setSignupForm(f=>({...f,level:e.target.value}))}>
            <option value="">Select your level</option>
            <option>Primary School (Grades 1–6)</option><option>Middle School (Grades 7–9)</option>
            <option>Secondary / GCSE</option><option>A-Level / Pre-University</option>
            <option>University</option><option>Parent / Guardian</option>
          </select>
        </div>
        <button className="submit-btn" onClick={handleSignup}>Create Free Account 🎉</button>
        <div className="modal-footer">Already have an account? <span className="modal-link" onClick={()=>{setSignupOpen(false);setSigninOpen(true);}}>Sign in</span></div>
      </div>
    </div>
  );

  // ─── MODAL: PAYMENT ───────────────────────────────────────────────────────
  const PayModal = () => (
    <div className="modal-overlay" onClick={()=>{setPayOpen(false);setPayStep(1);}}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:500}}>
        {payStep===1 && <>
          <div className="modal-title">💳 Choose Payment Method</div>
          <div className="modal-sub">Subscribing to: <strong>{selectedPlan?.name}</strong> — ${selectedPlan?.price}/{selectedPlan?.period}</div>
          <div className="pay-method-grid">
            {[{id:"visa",label:"💳 Visa / Mastercard"},{id:"paypal",label:"🅿️ PayPal"},{id:"apple",label:"🍎 Apple Pay"},{id:"google",label:"🔵 Google Pay"},{id:"bank",label:"🏦 Bank Transfer"},{id:"mpesa",label:"📱 M-Pesa / Mobile"}].map(m=>(
              <button key={m.id} className={`pay-method-btn${payMethod===m.id?" selected":""}`} onClick={()=>setPayMethod(m.id)}>{m.label}</button>
            ))}
          </div>
          <button className="submit-btn" onClick={handlePayment} disabled={!payMethod}>Continue →</button>
        </>}
        {payStep===2 && <>
          <div className="modal-title">✅ Confirm Payment</div>
          <div className="modal-sub">Paying via <strong>{payMethod}</strong></div>
          <div style={{background:"#f0f7ff",borderRadius:12,padding:18,marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{color:"#6b84a0"}}>Plan</span><strong>{selectedPlan?.name}</strong></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{color:"#6b84a0"}}>Amount</span><strong style={{color:"#0057d9"}}>${selectedPlan?.price}/{selectedPlan?.period}</strong></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#6b84a0"}}>Security</span><strong>🔒 SSL Encrypted</strong></div>
          </div>
          <button className="submit-btn" onClick={handlePayment}>Confirm & Pay ${selectedPlan?.price} →</button>
          <div style={{textAlign:"center",marginTop:12,fontSize:12,color:"#94a3b8"}}>30-day money-back guarantee · Cancel anytime</div>
        </>}
      </div>
    </div>
  );

  // ─── MODAL: BOOK TUTOR ────────────────────────────────────────────────────
  const BookingModal = () => {
    const tutor = TUTORS.find(t=>t.name===bookingOpen);
    if (!tutor) return null;
    return (
      <div className="modal-overlay" onClick={()=>setBookingOpen(null)}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="modal-title">📅 Book Session</div>
          <div className="modal-sub">with {tutor.name}</div>
          <div style={{background:"#f0f7ff",borderRadius:12,padding:16,marginBottom:20}}>
            <div style={{fontWeight:700,marginBottom:8,color:"#0057d9"}}>Select Level & Price:</div>
            {[{l:"Primary/GCSE",p:tutor.priceBasic},{l:"A-Level",p:tutor.priceAdv},{l:"University",p:tutor.pricePro}].map(opt=>(
              <div key={opt.l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #e3f0ff"}}>
                <span style={{fontSize:14,color:"#3a5070"}}>{opt.l}</span>
                <strong style={{color:"#0057d9"}}>${opt.p}/session</strong>
              </div>
            ))}
          </div>
          <div className="form-group"><label className="form-label">Preferred Date & Time</label><input className="form-input" type="datetime-local"/></div>
          <div className="form-group"><label className="form-label">Topic / Subject</label><input className="form-input" placeholder="e.g. Quadratic equations"/></div>
          <button className="submit-btn" onClick={()=>{setBookingOpen(null);notify(`✅ Session with ${tutor.name} booked! Check your email for the video link.`);}}>Book & Pay →</button>
        </div>
      </div>
    );
  };

  // ─── PAGE: HOME ───────────────────────────────────────────────────────────
  const HomePage = () => (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="hero-inner container">
          <div>
            <div className="hero-badge">🌍 2026–2030 World Education Platform</div>
            <h1 className="hero-title">Learn Anything.<br/><span>Achieve Everything.</span></h1>
            <p className="hero-sub">From Primary to University — past papers, live tutors, AI-powered learning, and 1,200+ study resources. Free to start. Available in 6 languages. Trusted by 100,000+ students in 150+ countries.</p>
            <div className="hero-btns">
              <button className="btn-hero-primary" onClick={()=>setSignupOpen(true)}>🎓 Start Free Today</button>
              <button className="btn-hero-outline" onClick={()=>goPage("courses")}>Browse Courses →</button>
              <button className="btn-hero-outline" onClick={()=>goPage("pricing")}>View Pricing</button>
            </div>
            <div className="hero-stats">
              {[["100K+","Students"],["150+","Countries"],["1,200+","Resources"],["50+","Expert Tutors"],["6","Languages"]].map(([n,l])=>(
                <div className="hero-stat" key={l}><div className="hero-stat-n">{n}</div><div className="hero-stat-l">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-media">
            <div className="hero-img-wrap">
              <img src={MOTION_IMAGES[motionIdx].src} alt={MOTION_IMAGES[motionIdx].caption}/>
              <div className="hero-img-caption">{MOTION_IMAGES[motionIdx].caption}</div>
              {showAds && <button className="hero-ads-toggle" onClick={()=>setShowAds(false)}>Hide Ads ✕</button>}
            </div>
            <div className="hero-floating top-left">🔥 <span>New: Cambridge 2024 Papers Live!</span></div>
            <div className="hero-floating bottom-right">⭐ 4.9/5 from 12,000+ reviews</div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stats-grid">
          {[["500+","Past Papers"],["1,200+","Study Notes"],["100K+","Students"],["50+","Expert Tutors"],["24/7","AI Support"]].map(([n,l])=>(
            <div key={l} className="stat-item"><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="section">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow">Everything You Need</span>
            <h2 className="sec-title">One Platform. All Levels. Every Subject.</h2>
            <p className="sec-desc">Whether you're 8 or 28, studying GCSE or a PhD — we have the tools, tutors, and resources to help you succeed.</p>
          </div>
          <div className="features-grid">
            {[
              {icon:"📄",title:"Free Past Papers",desc:"10 exam papers free/month. 500+ papers from NECTA, Cambridge, AQA, IB and more.",nav:"papers"},
              {icon:"🎓",title:"Expert Courses",desc:"$5–$45/month per course. Primary to University. 80+ lessons each.",nav:"courses"},
              {icon:"🤖",title:"AI Tutor 24/7",desc:"Ask any question in any language. Powered by advanced AI. Always available.",nav:"courses"},
              {icon:"👨‍🏫",title:"Live Tutor Sessions",desc:"Book 1-on-1 sessions. $10–$30 per session. Oxford, MIT, Stanford-trained tutors.",nav:"tutors"},
              {icon:"📚",title:"eBook Library",desc:"10 free eBooks/month for members. 200+ titles. Download & read offline.",nav:"library"},
              {icon:"🏆",title:"Certificates",desc:"Earn verified certificates. Recognized by universities and employers worldwide.",nav:"courses"},
              {icon:"📊",title:"Parent Dashboard",desc:"Track your child's progress in real time. Set goals, monitor assignments.",nav:"dashboard"},
              {icon:"🌍",title:"6 Languages",desc:"English, British, French, Chinese, German, Kiswahili. More coming soon.",nav:"home"},
            ].map((f,i)=>(
              <div key={i} className="feature-card" onClick={()=>goPage(f.nav)}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FREE MEMBER OFFER */}
      <div className="section-white">
        <div className="container">
          <div style={{background:"linear-gradient(135deg,#e8f1ff,#cde0ff)",borderRadius:24,padding:"48px 40px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}}>
            <div>
              <div style={{background:"#0057d9",color:"#fff",display:"inline-block",padding:"4px 14px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:16}}>FREE MEMBER OFFER</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3vw,36px)",fontWeight:800,color:"#1a2744",marginBottom:14,lineHeight:1.2}}>Sign In → Get 10 Free eBooks Every Month</h2>
              <p style={{fontSize:15,color:"#5a7090",lineHeight:1.7,marginBottom:24}}>Create your free account today. Instantly unlock 10 premium eBooks from our library — refreshed every month. No credit card needed.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <button className="btn-primary" onClick={()=>setSignupOpen(true)}>Create Free Account →</button>
                <button className="btn-outline" onClick={()=>goPage("library")}>Browse Library</button>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {EBOOKS.slice(0,4).map((b,i)=>(
                <div key={i} style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1.5px solid #cde0ff",cursor:"pointer"}} onClick={()=>!user?setSignupOpen(true):null}>
                  <img src={b.img} alt={b.title} style={{width:"100%",height:100,objectFit:"cover"}}/>
                  <div style={{padding:"10px 12px"}}><div style={{fontSize:12,fontWeight:700,color:"#1a2744",marginBottom:4,lineHeight:1.3}}>{b.title}</div><span className={`book-tag ${b.free?"free":"premium"}`}>{b.free?"FREE":"Premium"}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED COURSES */}
      <div className="section">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow">Top Courses</span>
            <h2 className="sec-title">Most Popular Courses in 2026</h2>
            <p className="sec-desc">From $5/month. All levels. All subjects. Taught by PhD-qualified educators.</p>
          </div>
          <div className="courses-grid">
            {COURSES.slice(0,6).map((c,i)=>(
              <div key={i} className="course-card">
                <div style={{position:"relative"}}>
                  <img src={c.img} alt={c.title} className="course-img"/>
                  <div className="course-badge">{c.level}</div>
                </div>
                <div className="course-body">
                  <div className="course-cat">{c.category}</div>
                  <div className="course-title">{c.title}</div>
                  <div className="course-meta">
                    <span>👨‍🏫 {c.instructor.split(" ").slice(-1)[0]}</span>
                    <span>📚 {c.lessons} lessons</span>
                    <span>⏱ {c.duration}</span>
                  </div>
                  <div className="course-footer">
                    <div><div className="course-price">${c.price}<span>/mo</span></div><div className="course-rating">★ {c.rating} ({(c.students/1000).toFixed(1)}k)</div></div>
                    <button className="enroll-btn" onClick={()=>{if(!user){setSignupOpen(true);}else{setSelectedPlan(PLANS[1]);setPayOpen(true);}}}> Enroll</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:32}}>
            <button className="btn-primary" onClick={()=>goPage("courses")}>View All 12 Courses →</button>
          </div>
        </div>
      </div>

      {/* AI TUTOR */}
      <div className="section-white">
        <div className="container">
          <div className="ai-section">
            <div className="sec-eyebrow light" style={{marginBottom:14,display:"inline-block"}}>Powered by Advanced AI</div>
            <h2 className="ai-title">🤖 Ask Our AI Tutor Anything</h2>
            <p className="ai-sub">Available 24/7 in 6 languages. From Grade 1 maths to PhD-level research — just ask.</p>
            <div className="ai-input-row">
              <textarea className="ai-textarea" placeholder="e.g. Explain photosynthesis for a 12-year-old, Solve 3x²-5x+2=0 step by step, What caused World War I?..." value={aiQ} onChange={e=>setAiQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();askAI();}}} rows={2}/>
              <button className="ai-send-btn" onClick={askAI} disabled={aiLoading||!aiQ.trim()}>{aiLoading?"...":"Ask AI →"}</button>
            </div>
            {aiLoading && <div className="ai-thinking"><div className="dp"><span/><span/><span/></div><span>AI is thinking...</span></div>}
            {aiA && <div className="ai-answer"><div className="ai-answer-lbl">✅ AI Tutor Answer</div>{aiA}</div>}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="section-dark">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow light">Student Stories</span>
            <h2 className="sec-title light">Real Results From Real Students</h2>
          </div>
          <div className="testimonial-wrap">
            <div className="testimonial-card">
              <div className="testimonial-text">"{TESTIMONIALS[testimonialIdx].text}"</div>
              <div className="testimonial-author">
                <img src={TESTIMONIALS[testimonialIdx].img} alt={TESTIMONIALS[testimonialIdx].name} className="testimonial-img"/>
                <div>
                  <div className="testimonial-name">{TESTIMONIALS[testimonialIdx].name} — {TESTIMONIALS[testimonialIdx].country}</div>
                  <div className="testimonial-role">{TESTIMONIALS[testimonialIdx].role}</div>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {TESTIMONIALS.map((_,i)=><div key={i} className={`t-dot${i===testimonialIdx?" active":""}`} onClick={()=>setTestimonialIdx(i)}/>)}
            </div>
          </div>
        </div>
      </div>

      {/* TUTORS PREVIEW */}
      <div className="section">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow">Expert Faculty</span>
            <h2 className="sec-title">Learn From the World's Best Tutors</h2>
            <p className="sec-desc">$10–$30 per session depending on subject level. Book instantly. Cancel anytime.</p>
          </div>
          <div className="tutors-grid">
            {TUTORS.slice(0,3).map((t,i)=>(
              <div key={i} className="tutor-card">
                <div className="tutor-hdr">
                  <div className="tutor-img-wrap"><img src={t.img} alt={t.name} className="tutor-img"/><div className={`tutor-avail ${t.available?"online":"offline"}`}/></div>
                  <div><div className="tutor-name">{t.name}</div><div className="tutor-subj">{t.subject}</div><div className="tutor-country">📍 {t.country}</div></div>
                </div>
                <div className="tutor-quals">{t.quals}</div>
                <div className="tutor-prices">
                  <div className="tutor-price-row"><span className="tutor-price-label">GCSE Level</span><span className="tutor-price-val">${t.priceBasic}/session</span></div>
                  <div className="tutor-price-row"><span className="tutor-price-label">A-Level</span><span className="tutor-price-val">${t.priceAdv}/session</span></div>
                  <div className="tutor-price-row"><span className="tutor-price-label">University</span><span className="tutor-price-val">${t.pricePro}/session</span></div>
                </div>
                <div className="star-row"><span className="stars">★★★★★</span><span className="rating-n">{t.rating}</span><span className="reviews-c">({t.reviews} reviews · {t.sessions} sessions)</span></div>
                <button className="book-btn" style={{marginTop:12}} onClick={()=>{if(!user)setSignupOpen(true); else setBookingOpen(t.name);}}>Book a Session →</button>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:32}}>
            <button className="btn-primary" onClick={()=>goPage("tutors")}>Meet All 6 Tutors →</button>
          </div>
        </div>
      </div>

      {/* PRICING PREVIEW */}
      <div className="section-white">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow">Simple Pricing</span>
            <h2 className="sec-title">Plans From $5/month. Free Forever Available.</h2>
            <p className="sec-desc">Cancel anytime. 30-day money-back guarantee. No hidden fees.</p>
          </div>
          <div className="pricing-grid">
            {PLANS.slice(0,4).map((plan,i)=>(
              <div key={i} className={`price-card${plan.popular?" popular":""}`}>
                {plan.badge && <div className="price-badge" style={{background:plan.color,color:"#fff"}}>{plan.badge}</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-amount">{plan.price===0?"Free":`$${plan.price}`}<span>{plan.price>0?`/${plan.period}`:""}</span></div>
                <div className="price-period">{plan.price===0?"No credit card needed":"Billed monthly · Cancel anytime"}</div>
                <ul className="price-features">{plan.features.map((f,j)=><li key={j}>{f}</li>)}</ul>
                <button className={`price-btn ${plan.popular?"primary":"outline"}`} onClick={()=>{if(plan.price===0)setSignupOpen(true); else{setSelectedPlan(plan);if(user)setPayOpen(true);else setSigninOpen(true);}}}>{plan.cta}</button>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:28}}>
            <button className="btn-outline" onClick={()=>goPage("pricing")}>Compare All Plans Including Institution →</button>
          </div>
        </div>
      </div>

      {/* BLOG PREVIEW */}
      <div className="section">
        <div className="container">
          <div className="sec-hd">
            <span className="sec-eyebrow">Latest Insights</span>
            <h2 className="sec-title">From Our Education Blog</h2>
          </div>
          <div className="blog-grid">
            {BLOG_POSTS.slice(0,3).map((b,i)=>(
              <div key={i} className="blog-card" onClick={()=>goPage("blog")}>
                <img src={b.img} alt={b.title} className="blog-img"/>
                <div className="blog-body">
                  <div className="blog-cat">{b.category}</div>
                  <div className="blog-title">{b.title}</div>
                  <div className="blog-excerpt">{b.excerpt}</div>
                  <div className="blog-meta"><span>{b.date}</span><span>⏱ {b.readTime} read</span></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:28}}><button className="btn-outline" onClick={()=>goPage("blog")}>Read All Articles →</button></div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="section-white">
        <div className="container">
          <div className="newsletter-box">
            <div className="newsletter-title">📬 Stay Ahead in Education</div>
            <p className="newsletter-sub">Weekly study tips, new past papers, AI learning trends and exclusive offers — straight to your inbox.</p>
            {newsletterSent ? <div style={{color:"#0057d9",fontWeight:700,fontSize:16}}>✅ You're subscribed! Check your inbox.</div> :
              <div className="newsletter-row">
                <input className="newsletter-input" placeholder="Enter your email" value={newsletter} onChange={e=>setNewsletter(e.target.value)}/>
                <button className="newsletter-btn" onClick={()=>{if(newsletter){setNewsletterSent(true);notify("📬 Subscribed! Check your inbox.")}}}>Subscribe Free</button>
              </div>
            }
          </div>
        </div>
      </div>
      {/* ADS SECTION */}
      {showAds && (
        <div className="section" style={{paddingTop:20,paddingBottom:20}}>
          <div className="container">
            <div className="ads-panel">
              <div style={{fontSize:11,marginBottom:6,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".5px"}}>Advertisement</div>
              <div style={{fontSize:14,color:"#3a5070",fontWeight:600}}>📢 Your Ad Could Be Here — <span style={{color:"#0057d9",cursor:"pointer"}} onClick={()=>goPage("contact")}>Advertise with GEA</span></div>
              <button style={{marginTop:8,background:"none",border:"none",fontSize:12,color:"#94a3b8",cursor:"pointer"}} onClick={()=>setShowAds(false)}>Hide ads</button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // ─── PAGE: COURSES ─────────────────────────────────────────────────────────
  const CoursesPage = () => (
    <div className="section">
      <div className="container">
        <div className="sec-hd"><span className="sec-eyebrow">All Courses</span><h2 className="sec-title">Browse 12+ Expert-Led Courses</h2><p className="sec-desc">From $5–$45/month. Primary through University. Cancel anytime.</p></div>
        <div className="search-wrap"><input className="search-input" placeholder="Search courses, subjects..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <div className="filter-tabs">
          {courseCats.map(cat=><button key={cat} className={`filter-tab${courseFilter===cat?" active":""}`} onClick={()=>setCourseFilter(cat)}>{cat}</button>)}
        </div>
        <div className="courses-grid">
          {filteredCourses.map((c,i)=>(
            <div key={i} className="course-card">
              <div style={{position:"relative"}}>
                <img src={c.img} alt={c.title} className="course-img"/>
                <div className="course-badge">{c.level}</div>
              </div>
              <div className="course-body">
                <div className="course-cat">{c.category}</div>
                <div className="course-title">{c.title}</div>
                <div className="course-meta">
                  <span>👨‍🏫 {c.instructor}</span><span>📚 {c.lessons} lessons</span><span>⏱ {c.duration}</span><span>👥 {(c.students/1000).toFixed(1)}k students</span>
                </div>
                <div className="course-footer">
                  <div><div className="course-price">${c.price}<span>/mo</span></div><div className="course-rating">★ {c.rating}</div></div>
                  <button className="enroll-btn" onClick={()=>{if(!user){setSignupOpen(true);}else{setSelectedPlan(PLANS[1]);setPayOpen(true);}}}>Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredCourses.length===0 && <div style={{textAlign:"center",padding:"40px",color:"#6b84a0"}}>No courses found for "{search}"</div>}
      </div>
    </div>
  );

  // ─── PAGE: PAPERS ──────────────────────────────────────────────────────────
  const PapersPage = () => (
    <div className="section">
      <div className="container">
        <div className="sec-hd"><span className="sec-eyebrow">Past Papers</span><h2 className="sec-title">500+ Past Exam Papers</h2><p className="sec-desc">Free members get 10 papers/month. Premium: unlimited. Cambridge, NECTA, AQA, IB & more.</p></div>
        <div style={{background:"#e8f1ff",borderRadius:14,padding:"14px 20px",marginBottom:24,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <span style={{fontSize:22}}>ℹ️</span>
          <div><strong style={{color:"#0057d9"}}>Free members:</strong> <span style={{color:"#3a5070"}}>10 past papers free/month. After that, upgrade to Scholar Plus for unlimited access.</span></div>
          {!user && <button className="btn-primary btn-sm" onClick={()=>setSignupOpen(true)}>Sign Up Free →</button>}
        </div>
        <input className="search-input" placeholder="Search papers by subject, level, board..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:24}}/>
        <div className="paper-grid">
          {PAST_PAPERS.filter(p=>search===""||[p.subject,p.level,p.org].join(" ").toLowerCase().includes(search.toLowerCase())).map((p,i)=>(
            <div key={i} className="paper-card">
              <img src={p.img} alt={p.subject} className="paper-img"/>
              <div className="paper-body">
                <div className="paper-subject">{p.subject}</div>
                <div className="paper-meta">Board: {p.org} | Year: {p.year}</div>
                <div className="paper-tags"><span className="paper-tag">{p.level}</span><span className={`paper-tag ${p.free?"":"premium"}`}>{p.free?"FREE":"Premium"}</span></div>
                <button className={`paper-dl-btn${!p.free&&!user?" locked":""}`} onClick={()=>{if(!p.free&&!user){setSignupOpen(true);}else{notify(`📄 Downloading ${p.subject} ${p.year} paper...`);}}}>{!p.free&&!user?"🔒 Sign In to Download":"⬇ Download PDF"}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── PAGE: TUTORS ──────────────────────────────────────────────────────────
  const TutorsPage = () => (
    <div className="section">
      <div className="container">
        <div className="sec-hd"><span className="sec-eyebrow">Expert Faculty</span><h2 className="sec-title">Book a Live 1-on-1 Tutor Session</h2><p className="sec-desc">$10–$30 per session depending on level. Instant booking. Video call included.</p></div>
        <div className="tutors-grid">
          {TUTORS.map((t,i)=>(
            <div key={i} className="tutor-card">
              <div className="tutor-hdr">
                <div className="tutor-img-wrap"><img src={t.img} alt={t.name} className="tutor-img"/><div className={`tutor-avail ${t.available?"online":"offline"}`}/></div>
                <div><div className="tutor-name">{t.name}</div><div className="tutor-subj">{t.subject}</div><div className="tutor-country">📍 {t.country}</div><div style={{fontSize:11,marginTop:4,color:t.available?"#22c55e":"#94a3b8",fontWeight:600}}>{t.available?"● Available Now":"○ Next Available Tomorrow"}</div></div>
              </div>
              <div className="tutor-quals">{t.quals}</div>
              <div className="tutor-bio">{t.bio}</div>
              <div className="tutor-stats">
                <div className="tutor-stat"><div className="tutor-stat-n">{t.rating}</div><div className="tutor-stat-l">Rating</div></div>
                <div className="tutor-stat"><div className="tutor-stat-n">{t.reviews}</div><div className="tutor-stat-l">Reviews</div></div>
                <div className="tutor-stat"><div className="tutor-stat-n">{t.sessions}</div><div className="tutor-stat-l">Sessions</div></div>
                <div className="tutor-stat"><div className="tutor-stat-n">{t.level}</div><div className="tutor-stat-l">Level</div></div>
              </div>
              <div className="tutor-prices">
                <div style={{fontWeight:700,color:"#0057d9",fontSize:13,marginBottom:8}}>Session Rates:</div>
                <div className="tutor-price-row"><span className="tutor-price-label">Primary / GCSE</span><span className="tutor-price-val">${t.priceBasic}/session</span></div>
                <div className="tutor-price-row"><span className="tutor-price-label">A-Level</span><span className="tutor-price-val">${t.priceAdv}/session</span></div>
                <div className="tutor-price-row"><span className="tutor-price-label">University</span><span className="tutor-price-val">${t.pricePro}/session</span></div>
              </div>
              <div className="star-row"><span className="stars">★★★★★</span><span className="rating-n">{t.rating}</span><span className="reviews-c">({t.reviews} reviews)</span></div>
              <button className="book-btn" onClick={()=>{if(!user)setSignupOpen(true); else setBookingOpen(t.name);}}>📅 Book Session</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── PAGE: LIBRARY ─────────────────────────────────────────────────────────
  const LibraryPage = () => (
    <div className="section">
      <div className="container">
        <div className="sec-hd"><span className="sec-eyebrow">eBook Library</span><h2 className="sec-title">200+ eBooks for Every Level</h2><p className="sec-desc">Sign in to unlock 10 free eBooks every month. Premium members get unlimited access.</p></div>
        {!user && (
          <div style={{background:"linear-gradient(135deg,#e8f1ff,#cde0ff)",borderRadius:16,padding:"24px 28px",marginBottom:32,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
            <div><strong style={{color:"#0057d9",fontSize:16}}>📚 10 Free eBooks/Month for Members</strong><p style={{fontSize:14,color:"#5a7090",marginTop:4}}>Sign in to unlock your free monthly eBooks. No credit card required.</p></div>
            <div style={{display:"flex",gap:10}}><button className="btn-primary" onClick={()=>setSignupOpen(true)}>Sign Up Free</button><button className="btn-outline" onClick={()=>setSigninOpen(true)}>Sign In</button></div>
          </div>
        )}
        {user && <div style={{background:"#d1fae5",borderRadius:12,padding:"14px 20px",marginBottom:24,display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:20}}>✅</span><span style={{fontWeight:600,color:"#065f46"}}>You have <strong>{user.books}</strong> free eBooks remaining this month. <span style={{fontWeight:400}}>Resets on the 1st.</span></span></div>}
        <div className="books-grid">
          {EBOOKS.map((b,i)=>(
            <div key={i} className="book-card" onClick={()=>{if(!user)setSignupOpen(true); else notify(`📖 Opening "${b.title}"...`);}}>
              <img src={b.img} alt={b.title} className="book-cover"/>
              <div className="book-body">
                <div className="book-title">{b.title}</div>
                <div className="book-author">By {b.author}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span className={`book-tag ${b.free?"free":"premium"}`}>{b.free?"FREE":"Premium"}</span>
                  <span style={{fontSize:11,color:"#94a3b8"}}>{b.pages} pages</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── PAGE: PRICING ─────────────────────────────────────────────────────────
  const PricingPage = () => (
    <div className="section">
      <div className="container">
        <div className="sec-hd"><span className="sec-eyebrow">Transparent Pricing</span><h2 className="sec-title">Plans From $5/Month</h2><p className="sec-desc">Past papers always free (10/month). Pay only for premium courses and unlimited access. Cancel anytime.</p></div>
        <div className="pricing-grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))"}}>
          {PLANS.map((plan,i)=>(
            <div key={i} className={`price-card${plan.popular?" popular":""}`}>
              {plan.badge && <div className="price-badge" style={{background:plan.color,color:"#fff"}}>{plan.badge}</div>}
              <div className="price-name">{plan.name}</div>
              <div className="price-amount">{plan.price===0?"Free":`$${plan.price}`}<span>{plan.price>0?`/${plan.period}`:""}</span></div>
              <div className="price-period">{plan.price===0?"Forever free":"Cancel anytime"}</div>
              <ul className="price-features">{plan.features.map((f,j)=><li key={j}>{f}</li>)}</ul>
              <button className={`price-btn ${i===1?"primary":"outline"}`} onClick={()=>{if(plan.price===0)setSignupOpen(true); else{setSelectedPlan(plan);if(user)setPayOpen(true);else setSigninOpen(true);}}}>{plan.cta}</button>
            </div>
          ))}
        </div>
        <div style={{marginTop:48,background:"#f0f7ff",borderRadius:18,padding:"32px 28px"}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"#1a2744",marginBottom:14}}>💳 Accepted Payment Methods</h3>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {["💳 Visa","💳 Mastercard","🅿️ PayPal","🍎 Apple Pay","🔵 Google Pay","🏦 Bank Transfer","📱 M-Pesa","🔒 SWIFT/SEPA"].map(m=>(
              <div key={m} style={{background:"#fff",border:"1.5px solid #cde0ff",borderRadius:10,padding:"10px 18px",fontSize:14,fontWeight:600,color:"#3a5070"}}>{m}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── PAGE: BLOG ────────────────────────────────────────────────────────────
  const BlogPage = () => (
    <div className="section">
      <div className="container">
        <div className="sec-hd"><span className="sec-eyebrow">Knowledge Hub</span><h2 className="sec-title">Education Blog & Insights</h2></div>
        <div className="blog-grid">
          {BLOG_POSTS.map((b,i)=>(
            <div key={i} className="blog-card">
              <img src={b.img} alt={b.title} className="blog-img"/>
              <div className="blog-body">
                <div className="blog-cat">{b.category}</div>
                <div className="blog-title">{b.title}</div>
                <div className="blog-excerpt">{b.excerpt}</div>
                <div className="blog-meta"><span>{b.date}</span><span>⏱ {b.readTime} read</span></div>
                <button style={{marginTop:14,background:"none",border:"1.5px solid #cde0ff",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:600,color:"#0057d9",cursor:"pointer"}}>Read Article →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── PAGE: FAQ ─────────────────────────────────────────────────────────────
  const FAQPage = () => (
    <div className="section">
      <div className="container">
        <div className="sec-hd"><span className="sec-eyebrow">Help Center</span><h2 className="sec-title">Frequently Asked Questions</h2><p className="sec-desc">Everything you need to know. Can't find your answer? <span style={{color:"#0057d9",cursor:"pointer",fontWeight:600}} onClick={()=>goPage("contact")}>Contact us →</span></p></div>
        <div className="faq-list">
          {FAQS.map((f,i)=>(
            <div key={i} className={`faq-item${faqOpen===i?" open":""}`}>
              <div className="faq-q" onClick={()=>setFaqOpen(faqOpen===i?null:i)}>
                <span>{f.q}</span><span className={`faq-icon${faqOpen===i?" open":""}`}>+</span>
              </div>
              {faqOpen===i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── PAGE: ABOUT ───────────────────────────────────────────────────────────
  const AboutPage = () => (
    <div className="section">
      <div className="container">
        <div className="sec-hd"><span className="sec-eyebrow">Who We Are</span><h2 className="sec-title">About Global Elite Academy</h2><p className="sec-desc">Founded on the belief that every student deserves world-class education — regardless of geography, income, or language.</p></div>
        <div className="about-grid">
          <div className="about-card"><div className="about-card-title">🎯 Our Mission</div><div className="about-card-text">To democratize education globally — providing free, high-quality resources to 100 million students by 2030. We believe the future belongs to learners, not the privileged.</div></div>
          <div className="about-card"><div className="about-card-title">🌍 Our Reach</div><div className="about-card-text">Students in 150+ countries. Resources in 6 languages. 24/7 AI support. Primary school to PhD level. We're building the world's most accessible education platform.</div></div>
          <div className="about-card"><div className="about-card-title">👥 Our Team</div><div className="about-card-text">50+ educators, technologists, and researchers from Oxford, MIT, Stanford, Sorbonne and Humboldt University. United by one goal: better outcomes for every learner.</div></div>
          <div className="about-card"><div className="about-card-title">🤖 Our Technology</div><div className="about-card-text">Powered by advanced AI for personalized learning. 2026–2030 roadmap includes AR classrooms, AI mentors, and real-time skill certification recognized by top universities.</div></div>
          <div className="about-card"><div className="about-card-title">📈 2026–2030 Vision</div><div className="about-card-text">Immersive AI classrooms. Global credential passports. Real-time translation for every lesson. Parent AI companion. Corporate training partnerships. University direct pathways.</div></div>
          <div className="about-card"><div className="about-card-title">💚 Our Promise</div><div className="about-card-text">Exams always free (10/month). 10 eBooks free for every member. AI Tutor free daily. We will never put profit before student access. Education is a right, not a privilege.</div></div>
        </div>
        <div style={{background:"linear-gradient(135deg,#002a87,#0057d9)",borderRadius:20,padding:"40px",marginTop:36,color:"#fff",textAlign:"center"}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,marginBottom:22}}>Our Impact in Numbers</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:20}}>
            {[["100K+","Students"],["150+","Countries"],["500+","Past Papers"],["50+","Tutors"],["6","Languages"],["24/7","AI Support"],["1,200+","Resources"],["$5","Starting Price"]].map(([n,l])=>(
              <div key={l}><div style={{fontSize:30,fontWeight:900,color:"#93c5fd"}}>{n}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:3}}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── PAGE: CONTACT ─────────────────────────────────────────────────────────
  const ContactPage = () => (
    <div className="section">
      <div className="container">
        <div className="sec-hd"><span className="sec-eyebrow">Get In Touch</span><h2 className="sec-title">Contact & Support</h2><p className="sec-desc">We're here 24/7. Average response time: under 2 hours.</p></div>
        <div className="contact-grid">
          <div className="contact-info-card">
            {[{icon:"📧",label:"Email Support",val:"info@globaleliteacademy.edu"},{icon:"💬",label:"WhatsApp / Live Chat",val:"+1 (800) GEA-LEARN"},{icon:"🌐",label:"Website",val:"www.globaleliteacademy.edu"},{icon:"🕐",label:"Hours",val:"24/7 · AI instant · Human 9am–9pm UTC"}].map((item,i)=>(
              <div key={i} className="contact-info-item">
                <div className="ci-icon">{item.icon}</div>
                <div><div className="ci-label">{item.label}</div><div className="ci-val">{item.val}</div></div>
              </div>
            ))}
            <div style={{background:"#e8f1ff",borderRadius:12,padding:18}}>
              <div style={{fontWeight:700,color:"#0057d9",marginBottom:8}}>🤖 Need instant answers?</div>
              <p style={{fontSize:13.5,color:"#5a7090",marginBottom:12}}>Our AI Tutor answers academic questions instantly in 6 languages — free, 24/7.</p>
              <button className="btn-primary btn-sm" onClick={()=>goPage("home")}>Open AI Tutor →</button>
            </div>
          </div>
          <div className="contact-form-card">
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#1a2744",marginBottom:20}}>Send a Message</h3>
            {contactSent ? <div className="success-msg">✅ Message sent! We'll reply within 2 hours.</div> : <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div className="form-group"><label className="form-label">Your Name</label><input className="form-input" value={contactForm.name} onChange={e=>setContactForm(f=>({...f,name:e.target.value}))} placeholder="Full name"/></div>
                <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={contactForm.email} onChange={e=>setContactForm(f=>({...f,email:e.target.value}))} placeholder="you@email.com"/></div>
              </div>
              <div className="form-group"><label className="form-label">Subject</label>
                <select className="form-select" value={contactForm.subject} onChange={e=>setContactForm(f=>({...f,subject:e.target.value}))}>
                  <option value="">Select a topic</option>
                  <option>Technical Support</option><option>Billing & Payments</option><option>Course Content</option><option>Tutor Booking</option><option>Advertise with GEA</option><option>Institution / School Partnership</option><option>Press & Media</option><option>Other</option>
                </select>
              </div>
              <div className="form-group"><label className="form-label">Message</label><textarea className="form-textarea" value={contactForm.msg} onChange={e=>setContactForm(f=>({...f,msg:e.target.value}))} placeholder="How can we help you?"/></div>
              <button className="submit-btn" onClick={()=>{if(contactForm.name&&contactForm.email&&contactForm.msg)setContactSent(true);}}>Send Message ✉️</button>
            </>}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── PAGE: DASHBOARD ───────────────────────────────────────────────────────
  const DashboardPage = () => !user ? (
    <div className="section"><div className="container" style={{textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:60,marginBottom:20}}>🔒</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:"#1a2744",marginBottom:12}}>Sign In to Access Your Dashboard</h2>
      <p style={{color:"#6b84a0",marginBottom:24}}>Track your progress, manage your courses, and access your free eBooks.</p>
      <div style={{display:"flex",gap:12,justifyContent:"center"}}><button className="btn-primary" onClick={()=>setSigninOpen(true)}>Sign In</button><button className="btn-outline" onClick={()=>setSignupOpen(true)}>Create Free Account</button></div>
    </div></div>
  ) : (
    <div className="section"><div className="container">
      <div className="sec-hd"><span className="sec-eyebrow">My Account</span><h2 className="sec-title">Welcome back, {user.name}! 👋</h2></div>
      <div className="dashboard-grid">
        <div className="dash-sidebar">
          {[{icon:"📊",label:"Overview"},{icon:"🎓",label:"My Courses"},{icon:"📄",label:"My Papers"},{icon:"📚",label:"My Library"},{icon:"📅",label:"Booked Sessions"},{icon:"🏆",label:"Certificates"},{icon:"⚙️",label:"Settings"}].map((item,i)=>(
            <div key={i} className={`dash-nav-item${i===0?" active":""}`}>{item.icon} {item.label}</div>
          ))}
          <div style={{marginTop:24,padding:"16px",background:"#e8f1ff",borderRadius:12}}>
            <div style={{fontSize:12,color:"#6b84a0",marginBottom:6,fontWeight:600}}>CURRENT PLAN</div>
            <div style={{fontSize:15,fontWeight:800,color:"#0057d9",textTransform:"capitalize"}}>{user.plan}</div>
            <button className="btn-primary btn-sm" style={{marginTop:10,width:"100%"}} onClick={()=>{setSelectedPlan(PLANS[1]);setPayOpen(true);}}>Upgrade Plan →</button>
          </div>
        </div>
        <div className="dash-content">
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,marginBottom:24}}>Your Learning Overview</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:16,marginBottom:28}}>
            {[{n:3,l:"Courses Enrolled",icon:"🎓"},{n:user.books,l:"Free eBooks Left",icon:"📚"},{n:10,l:"Papers Used",icon:"📄"},{n:0,l:"Sessions Booked",icon:"📅"}].map((s,i)=>(
              <div key={i} style={{background:"#f0f7ff",borderRadius:14,padding:"16px",textAlign:"center"}}>
                <div style={{fontSize:28,marginBottom:6}}>{s.icon}</div>
                <div style={{fontSize:24,fontWeight:900,color:"#0057d9"}}>{s.n}</div>
                <div style={{fontSize:11.5,color:"#6b84a0"}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:24}}>
            <h4 style={{fontWeight:700,marginBottom:14,color:"#1a2744"}}>Course Progress</h4>
            {[{title:"Cambridge IGCSE Mathematics",pct:65},{title:"A-Level Physics",pct:30},{title:"Computer Science & AI",pct:10}].map((c,i)=>(
              <div key={i} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:13.5,fontWeight:600,color:"#3a5070"}}><span>{c.title}</span><span style={{color:"#0057d9"}}>{c.pct}%</span></div>
                <div className="progress-bar-wrap"><div className="progress-bar" style={{width:`${c.pct}%`}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div></div>
  );

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="app">
        {notification && <div className="notif">{notification.msg}</div>}
        {signinOpen && <SigninModal/>}
        {signupOpen && <SignupModal/>}
        {payOpen && selectedPlan && <PayModal/>}
        {bookingOpen && <BookingModal/>}

        {/* ANNOUNCEMENT */}
        {announcementVisible && (
          <div className="announcement">
            <span>🌍 New Cambridge A-Level 2024 papers live! </span>
            <span className="ann-link" onClick={()=>goPage("papers")}>Download free →</span>
            <span> | Sign up for 10 free eBooks </span>
            <span className="ann-link" onClick={()=>setSignupOpen(true)}>Join now →</span>
            <button className="ann-close" onClick={()=>setAnnouncementVisible(false)}>✕</button>
          </div>
        )}

        {/* NAV */}
        <nav className="topnav">
          <div className="nav-inner">
            <div className="nav-logo" onClick={()=>goPage("home")}>
              <div className="nav-logo-icon">🎓</div>
              <div><div className="nav-logo-text">Global Elite Academy</div><div className="nav-logo-sub">2026–2030 Edition</div></div>
            </div>
            <div className="nav-links">
              {MAIN_NAV.map(p=>(
                <button key={p} className={`nav-link${page===p?" active":""}`} onClick={()=>goPage(p)}>
                  {NAV_ICONS[p]} {p.charAt(0).toUpperCase()+p.slice(1)}
                </button>
              ))}
              <button className="nav-link" onClick={()=>goPage("faq")}>❓ FAQ</button>
            </div>
            <div className="nav-right">
              <select className="lang-select" value={lang} onChange={e=>setLang(e.target.value)}>
                {LANGS.map(l=><option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
              </select>
              {user ? (
                <div className="user-pill" onClick={()=>goPage("dashboard")}>👤 {user.name} · {user.plan}</div>
              ) : (
                <>
                  <button className="nav-btn-outline" onClick={()=>setSigninOpen(true)}>Sign In</button>
                  <button className="nav-btn-primary" onClick={()=>setSignupOpen(true)}>Get Started Free</button>
                </>
              )}
              <button className="hamburger" onClick={()=>setMenuOpen(m=>!m)}>☰</button>
            </div>
          </div>
          <div className={`mobile-menu${menuOpen?" open":""}`}>
            {[...MAIN_NAV,"faq","dashboard"].map(p=>(
              <div key={p} className={`mobile-link${page===p?" active":""}`} onClick={()=>goPage(p)}>{NAV_ICONS[p]} {p.charAt(0).toUpperCase()+p.slice(1)}</div>
            ))}
            <div style={{borderTop:"1px solid #e3f0ff",paddingTop:12,marginTop:8}}>
              {!user ? <>
                <button style={{width:"100%",padding:"11px",marginBottom:8,background:"#e8f1ff",border:"none",borderRadius:8,color:"#0057d9",fontWeight:600,cursor:"pointer",fontSize:14}} onClick={()=>{setMenuOpen(false);setSigninOpen(true);}}>🔑 Sign In</button>
                <button style={{width:"100%",padding:"11px",background:"linear-gradient(135deg,#0057d9,#4ea8ff)",border:"none",borderRadius:8,color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14}} onClick={()=>{setMenuOpen(false);setSignupOpen(true);}}>🎓 Get Started Free</button>
              </> : <div style={{textAlign:"center",padding:"8px",background:"#e8f1ff",borderRadius:8,color:"#0057d9",fontWeight:600}}>👤 {user.name}</div>}
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        {page==="home" && <HomePage/>}
        {page==="courses" && <CoursesPage/>}
        {page==="papers" && <PapersPage/>}
        {page==="tutors" && <TutorsPage/>}
        {page==="library" && <LibraryPage/>}
        {page==="blog" && <BlogPage/>}
        {page==="pricing" && <PricingPage/>}
        {page==="about" && <AboutPage/>}
        {page==="contact" && <ContactPage/>}
        {page==="faq" && <FAQPage/>}
        {page==="dashboard" && <DashboardPage/>}
        {page==="signin" && <>{setSigninOpen(true)}{goPage("home")}</>}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">🎓 Global Elite Academy</div>
              <p className="footer-tagline">World-class education for every student, from primary to university. Free to start. Available in 6 languages. Built for 2026–2030 and beyond.</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
                {LANGS.map(l=><span key={l.code} style={{cursor:"pointer",fontSize:20}} onClick={()=>setLang(l.code)} title={l.label}>{l.flag}</span>)}
              </div>
              <div className="footer-badges">
                <span className="footer-badge">🔒 SSL Secured</span>
                <span className="footer-badge">✅ GDPR Compliant</span>
                <span className="footer-badge">🏆 ISO Certified</span>
              </div>
            </div>
            <div>
              <div className="footer-heading">Learn</div>
              {["courses","papers","library","blog"].map(p=><span key={p} className="footer-link" onClick={()=>goPage(p)}>{NAV_ICONS[p]} {p.charAt(0).toUpperCase()+p.slice(1)}</span>)}
            </div>
            <div>
              <div className="footer-heading">Platform</div>
              {["tutors","pricing","dashboard","faq"].map(p=><span key={p} className="footer-link" onClick={()=>goPage(p)}>{NAV_ICONS[p]} {p.charAt(0).toUpperCase()+p.slice(1)}</span>)}
            </div>
            <div>
              <div className="footer-heading">Company</div>
              {["about","contact"].map(p=><span key={p} className="footer-link" onClick={()=>goPage(p)}>{NAV_ICONS[p]} {p.charAt(0).toUpperCase()+p.slice(1)}</span>)}
              <span className="footer-link">🔒 Privacy Policy</span>
              <span className="footer-link">📋 Terms of Service</span>
              <span className="footer-link">🍪 Cookie Settings</span>
            </div>
            <div>
              <div className="footer-heading">Newsletter</div>
              <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:12,lineHeight:1.5}}>Weekly study tips, new papers and AI trends.</p>
              {newsletterSent ? <div style={{color:"#4ea8ff",fontWeight:600,fontSize:13}}>✅ Subscribed!</div> :
                <><input style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:"#fff",fontSize:13,marginBottom:8,outline:"none"}} placeholder="Your email" value={newsletter} onChange={e=>setNewsletter(e.target.value)}/>
                <button style={{width:"100%",padding:"9px",background:"#0057d9",color:"#fff",border:"none",borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:13}} onClick={()=>{if(newsletter){setNewsletterSent(true);}}}>Subscribe</button></>
              }
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026–2030 Global Elite Academy. All Rights Reserved.</span>
            <span className="footer-bottom-right">Making quality education accessible worldwide 🌍</span>
          </div>
        </footer>
      </div>
    </>
  );
}
ENDOFFILE
echo "File created: $(wc -l < /mnt/user-data/outputs/GlobalEliteAcademy_2026.jsx) lines"

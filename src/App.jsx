cat > /home/claude/P1.jsx << 'EOF'
import { useState, useEffect, useRef } from "react";

// ─── ADSENSE ──────────────────────────────────────────────────────────────────
const ADS_ID = "ca-pub-8024543613282871";
const OWNER_EMAIL = "johnsonelisa020@gmail.com";

// ─── PLANS ───────────────────────────────────────────────────────────────────
const PLANS = [
  { id:"free", name:"Free Explorer", price:0, period:"forever", color:"#0057d9", badge:"",
    features:["10 past papers/month","3 study note previews","AI Tutor 5 questions/day","Community forum access","1 free tutor session","Basic progress tracker"],
    cta:"Start Free — No Card", popular:false },
  { id:"starter", name:"Starter", price:5, period:"month", color:"#0057d9", badge:"POPULAR",
    features:["50 past papers/month","20 full study notes","Unlimited AI Tutor","2 live tutor sessions","Video lesson library","Completion certificate","Email support"],
    cta:"Start $5/mo", popular:true },
  { id:"scholar", name:"Scholar Plus", price:29, period:"month", color:"#7c3aed", badge:"BEST VALUE",
    features:["Unlimited past papers","All 1,200+ study notes","AI Tutor + essay grading","6 live tutor sessions","10 free eBooks/month","Offline downloads","Priority support","Full analytics"],
    cta:"Start $29/mo", popular:false },
  { id:"elite", name:"Elite Premium", price:79, period:"month", color:"#dc2626", badge:"ALL ACCESS",
    features:["Everything in Scholar","Unlimited tutor sessions","1-on-1 mentorship","University application help","ALL courses FREE","Parent + child dashboard","Dedicated manager","24/7 phone support"],
    cta:"Go Elite $79/mo", popular:false },
  { id:"pro", name:"Professional", price:299, period:"month", color:"#b45309", badge:"CAREER",
    features:["Everything in Elite","Professional certifications","Industry mentors","Job placement support","LinkedIn badge","Corporate training access","1000+ resources","Career coaching"],
    cta:"Go Professional", popular:false },
  { id:"institution", name:"Institution", price:999, period:"month", color:"#0f766e", badge:"SCHOOLS",
    features:["1000 student accounts","All premium features","Custom branding & domain","Admin analytics dashboard","API integration","Bulk certificate generation","Dedicated success manager","Custom content upload"],
    cta:"Contact Sales", popular:false },
];

// ─── COURSES ─────────────────────────────────────────────────────────────────
const COURSES = [
  { id:1,  title:"Cambridge IGCSE Mathematics",         level:"Secondary",      price:15,  rating:4.9, students:12400, img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=220&fit=crop", cat:"Mathematics",    lessons:48, dur:"6 months",  instructor:"Prof. Sarah Okonkwo" },
  { id:2,  title:"A-Level Physics Complete",            level:"Pre-University", price:20,  rating:4.8, students:8900,  img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=220&fit=crop", cat:"Physics",        lessons:62, dur:"8 months",  instructor:"Dr. James Chen" },
  { id:3,  title:"Biology GCSE Masterclass",            level:"Secondary",      price:12,  rating:4.9, students:15600, img:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=400&h=220&fit=crop", cat:"Biology",        lessons:35, dur:"4 months",  instructor:"Ms. Amina Hassan" },
  { id:4,  title:"Organic Chemistry Deep Dive",         level:"A-Level",        price:18,  rating:4.7, students:7200,  img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=220&fit=crop", cat:"Chemistry",      lessons:40, dur:"5 months",  instructor:"Dr. Marie Dubois" },
  { id:5,  title:"University Discrete Mathematics",     level:"University",     price:35,  rating:4.9, students:4300,  img:"https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=220&fit=crop", cat:"Mathematics",    lessons:55, dur:"6 months",  instructor:"Prof. Klaus Weber" },
  { id:6,  title:"Computer Science & AI Fundamentals",  level:"University",     price:45,  rating:5.0, students:18900, img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop", cat:"Technology",     lessons:80, dur:"10 months", instructor:"Mr. Rajesh Sharma" },
  { id:7,  title:"English Language & Literature",       level:"All Levels",     price:10,  rating:4.8, students:22100, img:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=220&fit=crop", cat:"English",        lessons:30, dur:"3 months",  instructor:"Dr. Marie Dubois" },
  { id:8,  title:"Economics: Micro & Macro",            level:"A-Level",        price:22,  rating:4.7, students:9800,  img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=220&fit=crop", cat:"Economics",      lessons:44, dur:"5 months",  instructor:"Prof. Klaus Weber" },
  { id:9,  title:"Primary Mathematics Grades 1-6",      level:"Primary",        price:8,   rating:4.9, students:31000, img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=220&fit=crop", cat:"Mathematics",    lessons:90, dur:"12 months", instructor:"Ms. Amina Hassan" },
  { id:10, title:"Geography & Environmental Science",   level:"GCSE",           price:14,  rating:4.6, students:6700,  img:"https://images.unsplash.com/photo-1446776709462-d6b525b9c0fd?w=400&h=220&fit=crop", cat:"Geography",      lessons:28, dur:"3 months",  instructor:"Prof. Sarah Okonkwo" },
  { id:11, title:"History: World Wars & Modern Era",    level:"GCSE",           price:12,  rating:4.8, students:11200, img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=220&fit=crop", cat:"History",        lessons:32, dur:"4 months",  instructor:"Prof. Klaus Weber" },
  { id:12, title:"Database Systems & SQL",              level:"University",     price:40,  rating:4.9, students:5600,  img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop", cat:"Technology",     lessons:50, dur:"5 months",  instructor:"Mr. Rajesh Sharma" },
  { id:13, title:"Primary Science Grades 1-6",          level:"Primary",        price:8,   rating:4.8, students:19000, img:"https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=220&fit=crop", cat:"Science",        lessons:60, dur:"8 months",  instructor:"Ms. Amina Hassan" },
  { id:14, title:"Business Studies GCSE",               level:"Secondary",      price:14,  rating:4.7, students:8300,  img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=220&fit=crop", cat:"Business",       lessons:36, dur:"4 months",  instructor:"Prof. Klaus Weber" },
  { id:15, title:"French Language A1-B2",               level:"All Levels",     price:16,  rating:4.9, students:13400, img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=220&fit=crop", cat:"Languages",      lessons:72, dur:"9 months",  instructor:"Dr. Marie Dubois" },
  { id:16, title:"Advanced Calculus & Linear Algebra",  level:"University",     price:38,  rating:4.8, students:3900,  img:"https://images.unsplash.com/photo-1635241161466-541f065683ba?w=400&h=220&fit=crop", cat:"Mathematics",    lessons:58, dur:"7 months",  instructor:"Prof. Sarah Okonkwo" },
  { id:17, title:"Machine Learning & Data Science",     level:"University",     price:55,  rating:5.0, students:9200,  img:"https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=220&fit=crop", cat:"Technology",     lessons:95, dur:"12 months", instructor:"Mr. Rajesh Sharma" },
  { id:18, title:"Psychology & Human Behaviour",        level:"A-Level",        price:18,  rating:4.7, students:7600,  img:"https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=220&fit=crop", cat:"Psychology",     lessons:42, dur:"5 months",  instructor:"Dr. Marie Dubois" },
  { id:19, title:"Art & Design Foundation",             level:"Secondary",      price:10,  rating:4.6, students:5400,  img:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=220&fit=crop", cat:"Arts",           lessons:30, dur:"3 months",  instructor:"Ms. Amina Hassan" },
  { id:20, title:"SAT & ACT Complete Prep",             level:"Pre-University", price:45,  rating:4.9, students:16800, img:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=220&fit=crop", cat:"Test Prep",      lessons:85, dur:"4 months",  instructor:"Prof. Sarah Okonkwo" },
  { id:21, title:"IELTS & TOEFL Masterclass",           level:"All Levels",     price:30,  rating:4.8, students:21000, img:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=220&fit=crop", cat:"English",        lessons:60, dur:"3 months",  instructor:"Dr. Marie Dubois" },
  { id:22, title:"Coding for Kids (Ages 8-14)",         level:"Primary",        price:12,  rating:5.0, students:28000, img:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=220&fit=crop", cat:"Technology",     lessons:48, dur:"6 months",  instructor:"Mr. Rajesh Sharma" },
  { id:23, title:"Environmental Science & Ecology",     level:"A-Level",        price:16,  rating:4.6, students:4900,  img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=220&fit=crop", cat:"Science",        lessons:38, dur:"4 months",  instructor:"Ms. Amina Hassan" },
  { id:24, title:"Global Business & Management",        level:"University",     price:50,  rating:4.8, students:6700,  img:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=220&fit=crop", cat:"Business",       lessons:65, dur:"8 months",  instructor:"Prof. Klaus Weber" },
];

// ─── TUTORS ───────────────────────────────────────────────────────────────────
const TUTORS = [
  { name:"Prof. Sarah Okonkwo",  subject:"Mathematics & Statistics", country:"Nigeria / UK",     rating:4.9, reviews:1240, sessions:3800, pb:10, pa:20, pp:30, img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", bio:"PhD Oxford. 18 years teaching university-level mathematics. Specialist in pure maths and statistics for all levels.",    quals:"PhD Mathematics, Oxford University", avail:true  },
  { name:"Dr. James Chen",       subject:"Physics & Engineering",    country:"China / USA",      rating:4.8, reviews:980,  sessions:2700, pb:10, pa:20, pp:25, img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop", bio:"MIT graduate with 15 years in research and teaching. Makes complex physics concepts simple for every student.",          quals:"PhD Physics, MIT",                  avail:true  },
  { name:"Ms. Amina Hassan",     subject:"Biology & Chemistry",      country:"Kenya / Canada",   rating:4.9, reviews:1560, sessions:4200, pb:10, pa:15, pp:25, img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop", bio:"Medical doctor turned passionate educator. Expert in making life sciences accessible to students worldwide.",             quals:"MBBS, MSc Education, Toronto",      avail:true  },
  { name:"Prof. Klaus Weber",    subject:"Economics & Business",     country:"Germany",          rating:4.7, reviews:720,  sessions:1900, pb:10, pa:20, pp:30, img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop", bio:"Former World Bank economist. Bridges economic theory and real-world business practice in every lesson.",                quals:"PhD Economics, Humboldt University", avail:false },
  { name:"Dr. Marie Dubois",     subject:"French & Literature",      country:"France / Senegal", rating:4.8, reviews:890,  sessions:2300, pb:10, pa:15, pp:20, img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop", bio:"Native French speaker and Francophone literature expert. Makes language learning joyful and effective.",                quals:"PhD Linguistics, Sorbonne",         avail:true  },
  { name:"Mr. Rajesh Sharma",    subject:"Computer Science & AI",    country:"India / USA",      rating:4.9, reviews:2100, sessions:5800, pb:15, pa:25, pp:30, img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", bio:"Former Google engineer turned full-time educator. Expert in AI, machine learning, data science and software engineering.", quals:"MSc Computer Science, Stanford",    avail:true  },
];

// ─── PAPERS ───────────────────────────────────────────────────────────────────
const PAPERS = [
  { subject:"Mathematics",        level:"GCSE/Form 4",    org:"Cambridge IGCSE", year:"2024", img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=140&fit=crop", free:true  },
  { subject:"Physics",            level:"A-Level/Form 6", org:"Cambridge",       year:"2024", img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=140&fit=crop", free:true  },
  { subject:"Chemistry",          level:"A-Level",        org:"AQA/Edexcel",     year:"2024", img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=140&fit=crop", free:true  },
  { subject:"Biology",            level:"GCSE",           org:"OCR/NECTA",       year:"2024", img:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=300&h=140&fit=crop", free:true  },
  { subject:"English Language",   level:"All Levels",     org:"NECTA/Cambridge", year:"2023", img:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=140&fit=crop", free:true  },
  { subject:"History",            level:"GCSE/O-Level",   org:"Cambridge",       year:"2023", img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=140&fit=crop", free:true  },
  { subject:"Geography",          level:"GCSE",           org:"AQA",             year:"2023", img:"https://images.unsplash.com/photo-1446776709462-d6b525b9c0fd?w=300&h=140&fit=crop", free:true  },
  { subject:"Advanced Maths",     level:"University",     org:"IAA/Cambridge",   year:"2024", img:"https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=300&h=140&fit=crop", free:false },
  { subject:"Computer Science",   level:"University",     org:"IAA",             year:"2024", img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=140&fit=crop", free:false },
  { subject:"Economics",          level:"A-Level",        org:"IB/NECTA",        year:"2023", img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=140&fit=crop", free:false },
];

// ─── BOOKS ────────────────────────────────────────────────────────────────────
const BOOKS = [
  { title:"IGCSE Mathematics Complete Guide",    author:"Prof. Sarah Okonkwo", pages:320, img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=160&h=210&fit=crop",   level:"GCSE",        free:true  },
  { title:"A-Level Physics Revision Bible",      author:"Dr. James Chen",      pages:480, img:"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=160&h=210&fit=crop", level:"A-Level",     free:true  },
  { title:"Biology Mastery Handbook",            author:"Ms. Amina Hassan",    pages:290, img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=160&h=210&fit=crop", level:"GCSE",        free:true  },
  { title:"University Economics Textbook",       author:"Prof. Klaus Weber",   pages:560, img:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=160&h=210&fit=crop", level:"University",  free:false },
  { title:"Python: Start to Expert",             author:"Mr. Rajesh Sharma",   pages:410, img:"https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=160&h=210&fit=crop", level:"University",  free:false },
  { title:"French Language Complete Course",     author:"Dr. Marie Dubois",    pages:240, img:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=160&h=210&fit=crop",   level:"All Levels",  free:true  },
  { title:"Primary Maths Fun Workbook",          author:"Ms. Amina Hassan",    pages:180, img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=160&h=210&fit=crop", level:"Primary",     free:true  },
  { title:"Chemistry Organic Reactions Guide",   author:"Dr. Marie Dubois",    pages:350, img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=160&h=210&fit=crop", level:"A-Level",     free:false },
  { title:"World History 1900-2025",             author:"Prof. Klaus Weber",   pages:520, img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=160&h=210&fit=crop", level:"GCSE",        free:true  },
  { title:"Computer Networks & Security",        author:"Mr. Rajesh Sharma",   pages:390, img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=160&h=210&fit=crop",   level:"University",  free:false },
];

// ─── BLOG ─────────────────────────────────────────────────────────────────────
const BLOG = [
  { title:"How AI is Transforming Education 2026-2030",   date:"Jun 2026", rt:"5 min", img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop", cat:"AI & Tech",    excerpt:"AI tutors, personalized learning paths, real-time feedback reshaping how 100M+ students learn globally." },
  { title:"Top Study Techniques Backed by Neuroscience",  date:"May 2026", rt:"7 min", img:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop", cat:"Study Tips",   excerpt:"Spaced repetition, interleaving, active recall — science-backed methods top students worldwide swear by." },
  { title:"Cambridge IGCSE vs IB: Which Suits You?",      date:"May 2026", rt:"8 min", img:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop", cat:"Curriculum",   excerpt:"A detailed breakdown of the world's two most recognized qualifications to help you and your family decide." },
  { title:"How to Crack University Entrance Exams",       date:"Apr 2026", rt:"6 min", img:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop", cat:"University",   excerpt:"Expert strategies from our tutors on SAT, A-Levels, NECTA and other university entrance examinations." },
  { title:"The Future of Remote Learning 2026-2030",      date:"Apr 2026", rt:"9 min", img:"https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=200&fit=crop", cat:"Future of Ed", excerpt:"AR classrooms, AI companions, global credentials — what education looks like in the next 4 years." },
  { title:"10 Daily Habits of Top-Performing Students",   date:"Mar 2026", rt:"4 min", img:"https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=200&fit=crop", cat:"Study Tips",   excerpt:"We analyzed 1,000 high achievers worldwide. These habits consistently separate A students from the rest." },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name:"Priya Patel",    country:"India 🇮🇳",   role:"Medical Student",    text:"The AI Tutor helped me pass A-Level Biology with A*. 24/7 access meant I could study at midnight before exams. Changed my life.",               img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
  { name:"Lucas Fernandez",country:"Brazil 🇧🇷",  role:"GCSE Student",       text:"Free 10 past papers every month for 3 months. My maths grade jumped from C to A. Now on Scholar Plus — best $29 I ever spent!",              img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
  { name:"Aisha Mwangi",   country:"Kenya 🇰🇪",   role:"University Student", text:"First-generation university student. GEA gave me resources I could never afford. The Kiswahili AI support made everything so accessible.",   img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop" },
  { name:"Hannah Schmidt",  country:"Germany 🇩🇪", role:"Parent",             text:"My daughter uses GEA every day after school. The parent dashboard shows real-time progress. Worth every euro of the monthly subscription.",   img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop" },
  { name:"Yaw Asante",     country:"Ghana 🇬🇭",   role:"A-Level Student",   text:"Booked a session with Dr. Chen at $20. He explained quantum physics better in 45 minutes than my teacher did in an entire term. Amazing!",    img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = [
  { q:"Is the free plan really free forever?",      a:"Yes! Free Explorer gives you 10 past papers/month, AI Tutor 5 questions/day, community forum — no credit card required, no expiry, ever." },
  { q:"How do the 10 free eBooks work?",            a:"Create a free account and unlock 10 premium eBooks every month, auto-refreshed on the 1st. Premium members get unlimited access to all 200+ titles." },
  { q:"What payment methods do you accept?",        a:"We accept Visa, Mastercard, PayPal, Apple Pay, Google Pay, Bank Transfer (SWIFT/SEPA), and M-Pesa for mobile money users across Africa and beyond." },
  { q:"Can I cancel my subscription anytime?",      a:"Absolutely — cancel with one click from your dashboard. No cancellation fees. Your access continues until the end of your paid billing period." },
  { q:"How do I book a live tutor session?",        a:"Go to the Tutors page, choose your tutor, pick an available time slot, and pay per session ($10–$30 depending on level). You receive a video call link instantly." },
  { q:"Do past papers cost money?",                 a:"Your first 10 past papers per month are completely free. After that you need a paid plan. Premium and above members get unlimited access to all 500+ papers." },
  { q:"Is there a student or school discount?",     a:"Yes! Students with a valid .edu email get 30% off any plan. Schools and institutions get custom pricing starting at $299/month for up to 500 student accounts." },
  { q:"Will ads appear on my account?",             a:"Ads appear on free accounts only. All paid subscribers get a completely ad-free experience. Ads are Google AdSense powered and education-relevant only." },
  { q:"How does the AI Tutor work?",                a:"Our AI Tutor is powered by advanced AI. Ask any question in any of 6 languages — it responds with structured, clear, step-by-step explanations tailored to your level." },
  { q:"How do I contact customer support?",         a:"Email us at info@globaleliteacademy.edu, use WhatsApp +1(800)GEA-LEARN, or use our 24/7 AI chat. Human support is available 9am–9pm UTC Monday to Saturday." },
];

// ─── MOTION IMAGES ────────────────────────────────────────────────────────────
const MOTION = [
  { src:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&h=460&fit=crop",  cap:"Children learning together 🌟" },
  { src:"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=700&h=460&fit=crop",  cap:"Students exploring science 🔬" },
  { src:"https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=700&h=460&fit=crop",  cap:"Parent and child reading together 📖" },
  { src:"https://images.unsplash.com/photo-1588072432836-e10032774350?w=700&h=460&fit=crop",  cap:"AI-powered classroom 2026 🤖" },
  { src:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&h=460&fit=crop",  cap:"University students collaborating 🎓" },
  { src:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=460&fit=crop",  cap:"Creative student innovation 💡" },
  { src:"https://images.unsplash.com/photo-1549737221-bef65e2604a6?w=700&h=460&fit=crop",     cap:"Children playing and learning 🎨" },
  { src:"https://images.unsplash.com/photo-1605711285791-0219e80e43a3?w=700&h=460&fit=crop",  cap:"Future technology in education 🚀" },
];

// ─── LANGS / NAV ─────────────────────────────────────────────────────────────
const LANGS    = [
  {code:"en",flag:"🇺🇸",label:"English"},
  {code:"gb",flag:"🇬🇧",label:"British"},
  {code:"fr",flag:"🇫🇷",label:"Français"},
  {code:"zh",flag:"🇨🇳",label:"中文"},
  {code:"de",flag:"🇩🇪",label:"Deutsch"},
  {code:"sw",flag:"🇹🇿",label:"Kiswahili"},
];
const MAIN_NAV = ["home","courses","papers","tutors","library","blog","pricing","about","contact"];
const NAV_ICO  = {home:"🏠",courses:"🎓",papers:"📄",tutors:"👨‍🏫",library:"📚",blog:"📰",pricing:"💳",about:"ℹ️",contact:"📞",faq:"❓",dashboard:"📊",career:"💼",parents:"👨‍👩‍👧",community:"🌐"};
EOF
echo "P1 done: $(wc -l < /home/claude/P1.jsx) lines"

cat > /home/claude/P2.jsx << 'EOF'
// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:#f0f7ff;color:#1a2744;overflow-x:hidden;}
.app{min-height:100vh;}
/* NOTIFICATION */
.notif{position:fixed;top:76px;right:20px;z-index:9999;background:#fff;border:2px solid #0057d9;border-radius:14px;padding:13px 20px;font-size:14px;font-weight:600;color:#1a2744;box-shadow:0 8px 32px rgba(0,87,217,.22);max-width:360px;animation:sIn .35s ease;display:flex;align-items:center;gap:10px;}
@keyframes sIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}
/* NAV */
.nav{background:rgba(255,255,255,.97);backdrop-filter:blur(14px);border-bottom:1.5px solid #e3f0ff;position:sticky;top:0;z-index:200;box-shadow:0 2px 18px rgba(0,87,217,.07);}
.nav-in{max-width:1300px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:66px;}
.nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer;}
.nav-logo-ic{width:44px;height:44px;background:linear-gradient(135deg,#0057d9,#4ea8ff);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 4px 14px rgba(0,87,217,.3);}
.nav-logo-tx{font-weight:800;font-size:16px;color:#0057d9;font-family:'Playfair Display',serif;line-height:1.1;}
.nav-logo-sb{font-size:10px;color:#6b84a0;font-weight:500;}
.nav-links{display:flex;gap:1px;align-items:center;}
.nl{padding:7px 10px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;color:#3a5070;border:none;background:none;transition:all .15s;white-space:nowrap;}
.nl:hover,.nl.on{background:#e8f1ff;color:#0057d9;font-weight:700;}
.nav-r{display:flex;align-items:center;gap:7px;}
.lsel{padding:5px 8px;border-radius:8px;border:1.5px solid #cde0ff;background:#f0f7ff;color:#0057d9;font-size:12px;font-weight:600;cursor:pointer;outline:none;}
.nb-out{padding:7px 14px;border-radius:8px;border:1.5px solid #0057d9;background:transparent;color:#0057d9;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;}
.nb-out:hover{background:#0057d9;color:#fff;}
.nb-pri{padding:7px 15px;border-radius:8px;border:none;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 3px 12px rgba(0,87,217,.32);transition:all .15s;}
.nb-pri:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(0,87,217,.42);}
.upill{display:flex;align-items:center;gap:6px;padding:5px 13px;background:#e8f1ff;border-radius:20px;font-size:13px;font-weight:700;color:#0057d9;cursor:pointer;border:1.5px solid #cde0ff;}
.hbg{display:none;font-size:24px;cursor:pointer;color:#0057d9;background:none;border:none;}
.mmenu{display:none;background:#fff;border-top:1px solid #e3f0ff;padding:12px 20px 22px;max-height:85vh;overflow-y:auto;}
.mmenu.open{display:block;}
.mml{display:block;padding:12px 14px;border-radius:9px;cursor:pointer;font-size:15px;color:#1a2744;margin:2px 0;font-weight:500;}
.mml:hover,.mml.on{background:#e8f1ff;color:#0057d9;font-weight:700;}
/* ANNOUNCEMENT */
.ann{background:linear-gradient(90deg,#002fa3,#0057d9,#1a8cff);color:#fff;text-align:center;padding:10px 20px;font-size:13px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;}
.ann-a{color:#fff;font-weight:800;text-decoration:underline;cursor:pointer;margin:0 3px;}
.ann-x{background:none;border:none;color:rgba(255,255,255,.6);cursor:pointer;font-size:18px;margin-left:8px;}
/* HERO */
.hero{background:linear-gradient(135deg,#001d6b 0%,#0057d9 45%,#1a8cff 80%,#4ea8ff 100%);padding:88px 20px 98px;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 68% 50%,rgba(78,168,255,.18) 0%,transparent 68%);pointer-events:none;}
.hero-g{max-width:1300px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;position:relative;z-index:1;}
.hero-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);color:#fff;padding:6px 18px;border-radius:24px;font-size:12px;font-weight:700;margin-bottom:20px;letter-spacing:.4px;}
.hero-h{font-family:'Playfair Display',serif;font-size:clamp(34px,4.5vw,60px);font-weight:900;color:#fff;line-height:1.1;margin-bottom:18px;}
.hero-h span{color:#93c5fd;}
.hero-sub{color:rgba(255,255,255,.86);font-size:clamp(15px,1.8vw,18px);line-height:1.72;margin-bottom:32px;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:36px;}
.bhp{padding:14px 28px;background:#fff;color:#0057d9;border-radius:11px;font-weight:800;font-size:15px;cursor:pointer;border:none;transition:all .22s;box-shadow:0 6px 22px rgba(0,0,0,.16);}
.bhp:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,.22);}
.bho{padding:14px 28px;background:transparent;color:#fff;border-radius:11px;font-weight:700;font-size:15px;cursor:pointer;border:2px solid rgba(255,255,255,.58);transition:all .2s;}
.bho:hover{background:rgba(255,255,255,.16);border-color:#fff;}
.hero-stats{display:flex;gap:26px;flex-wrap:wrap;}
.hs-n{font-size:26px;font-weight:900;color:#fff;font-family:'Playfair Display',serif;}
.hs-l{font-size:11px;color:rgba(255,255,255,.7);font-weight:500;}
.hero-med{position:relative;}
.hero-iw{border-radius:22px;overflow:hidden;box-shadow:0 26px 64px rgba(0,0,0,.32);aspect-ratio:4/3;}
.hero-iw img{width:100%;height:100%;object-fit:cover;transition:opacity 1.1s ease;}
.hero-cap{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.7));color:#fff;padding:22px 18px 16px;font-size:13.5px;font-weight:600;}
.hfl{position:absolute;background:#fff;border-radius:14px;padding:11px 16px;box-shadow:0 8px 26px rgba(0,0,0,.16);font-size:13px;font-weight:700;color:#1a2744;display:flex;align-items:center;gap:8px;white-space:nowrap;}
.hfl.tl{top:-16px;left:-22px;}
.hfl.br{bottom:-16px;right:-22px;}
.ads-tog{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.48);color:#fff;border:none;border-radius:8px;padding:5px 10px;font-size:11px;cursor:pointer;font-weight:600;z-index:5;}
/* STATS BAR */
.sbar{background:#fff;border-bottom:2px solid #e3f0ff;}
.srow{max-width:1300px;margin:0 auto;padding:20px;display:grid;grid-template-columns:repeat(5,1fr);}
.si{text-align:center;padding:10px 6px;border-right:1px solid #e3f0ff;}
.si:last-child{border-right:none;}
.sn{font-size:28px;font-weight:900;color:#0057d9;font-family:'Playfair Display',serif;}
.sl{font-size:11.5px;color:#6b84a0;font-weight:500;margin-top:2px;}
/* LAYOUT */
.con{max-width:1300px;margin:0 auto;padding:0 20px;}
.sec{padding:72px 0;background:#f0f7ff;}
.sec-w{padding:72px 0;background:#fff;}
.sec-dk{padding:72px 0;background:linear-gradient(135deg,#001d6b,#0057d9);}
.shd{text-align:center;margin-bottom:46px;}
.ey{display:inline-block;background:#e8f1ff;color:#0057d9;padding:4px 16px;border-radius:20px;font-size:11.5px;font-weight:700;letter-spacing:.55px;margin-bottom:12px;text-transform:uppercase;}
.ey.lt{background:rgba(255,255,255,.2);color:#fff;}
.stit{font-family:'Playfair Display',serif;font-size:clamp(24px,3.5vw,40px);font-weight:800;color:#1a2744;margin-bottom:12px;line-height:1.15;}
.stit.lt{color:#fff;}
.ssub{color:#5a7090;font-size:16px;max-width:600px;margin:0 auto;line-height:1.7;}
.ssub.lt{color:rgba(255,255,255,.8);}
/* BUTTONS */
.bpri{padding:12px 26px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:14.5px;cursor:pointer;transition:all .2s;box-shadow:0 4px 14px rgba(0,87,217,.3);}
.bpri:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,87,217,.42);}
.bout{padding:12px 26px;border:2px solid #0057d9;background:transparent;color:#0057d9;border-radius:10px;font-weight:700;font-size:14.5px;cursor:pointer;transition:all .2s;}
.bout:hover{background:#0057d9;color:#fff;}
.bwh{padding:12px 26px;background:#fff;color:#0057d9;border:none;border-radius:10px;font-weight:700;font-size:14.5px;cursor:pointer;transition:all .2s;}
.bwh:hover{transform:translateY(-2px);}
.bsm{padding:8px 16px;font-size:13px;}
/* FEATURES */
.fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:18px;}
.fcard{background:#fff;border-radius:18px;padding:26px 20px;border:1.5px solid #e3f0ff;transition:all .22s;cursor:pointer;text-align:center;}
.fcard:hover{border-color:#0057d9;transform:translateY(-5px);box-shadow:0 16px 42px rgba(0,87,217,.1);}
.fic{width:58px;height:58px;background:linear-gradient(135deg,#e8f1ff,#cde0ff);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 15px;}
.ftit{font-size:15.5px;font-weight:700;color:#1a2744;margin-bottom:7px;}
.fdsc{font-size:13px;color:#6b84a0;line-height:1.6;}
/* COURSES */
.cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;}
.ccard{background:#fff;border-radius:18px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .22s;}
.ccard:hover{border-color:#0057d9;transform:translateY(-4px);box-shadow:0 14px 42px rgba(0,87,217,.1);}
.ciw{position:relative;}
.cimg{width:100%;height:165px;object-fit:cover;display:block;}
.cbdg{position:absolute;top:10px;left:10px;background:#0057d9;color:#fff;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.cbody{padding:16px 18px;}
.ccat{font-size:11px;color:#0057d9;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:5px;}
.ctit{font-size:15px;font-weight:700;color:#1a2744;margin-bottom:8px;line-height:1.4;}
.cmeta{display:flex;gap:10px;font-size:11.5px;color:#6b84a0;margin-bottom:12px;flex-wrap:wrap;}
.cft{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #f0f7ff;padding-top:12px;}
.cprice{font-size:18px;font-weight:900;color:#0057d9;}
.cprice span{font-size:12px;color:#6b84a0;font-weight:400;}
.crat{font-size:12px;color:#f59e0b;font-weight:700;}
.enb{padding:8px 16px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;}
.enb:hover{opacity:.88;}
/* FILTER TABS */
.ftabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:26px;}
.ftab{padding:7px 16px;border-radius:20px;border:1.5px solid #cde0ff;background:#fff;color:#3a5070;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;}
.ftab:hover,.ftab.on{background:#0057d9;color:#fff;border-color:#0057d9;}
/* PAPERS */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(262px,1fr));gap:18px;}
.pcard{background:#fff;border-radius:16px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .2s;}
.pcard:hover{border-color:#0057d9;box-shadow:0 10px 32px rgba(0,87,217,.1);transform:translateY(-3px);}
.pimg{width:100%;height:96px;object-fit:cover;}
.pbody{padding:13px 16px;}
.psub{font-size:14.5px;font-weight:700;color:#1a2744;margin-bottom:4px;}
.pmeta{font-size:11.5px;color:#6b84a0;margin-bottom:10px;}
.ptags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;}
.ptag{display:inline-block;background:#e8f1ff;color:#0057d9;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;}
.ptag.prem{background:#fef3c7;color:#b45309;}
.pdl{display:block;width:100%;padding:9px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;}
.pdl.lk{background:linear-gradient(135deg,#6b84a0,#94a3b8);}
/* TUTORS */
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:22px;}
.tcard{background:#fff;border-radius:20px;padding:26px;border:1.5px solid #e3f0ff;transition:all .22s;}
.tcard:hover{border-color:#0057d9;box-shadow:0 14px 42px rgba(0,87,217,.1);transform:translateY(-3px);}
.thdr{display:flex;gap:15px;align-items:flex-start;margin-bottom:15px;}
.tiw{position:relative;flex-shrink:0;}
.timg{width:74px;height:74px;border-radius:50%;object-fit:cover;border:3px solid #e3f0ff;}
.tdot{position:absolute;bottom:2px;right:2px;width:16px;height:16px;border-radius:50%;border:2.5px solid #fff;}
.tdot.on{background:#22c55e;}
.tdot.off{background:#94a3b8;}
.tnm{font-size:16px;font-weight:700;color:#1a2744;}
.tsub{font-size:13px;color:#0057d9;font-weight:600;margin:2px 0;}
.tloc{font-size:12px;color:#6b84a0;}
.tqu{font-size:11.5px;color:#0057d9;background:#e8f1ff;padding:4px 12px;border-radius:20px;display:inline-block;margin-bottom:10px;}
.tbio{font-size:13px;color:#5a7090;line-height:1.6;margin-bottom:13px;}
.tsts{display:flex;gap:16px;margin-bottom:14px;}
.tsn{font-size:16px;font-weight:800;color:#1a2744;}
.tsl{font-size:10.5px;color:#6b84a0;}
.tpr{background:#f0f7ff;border-radius:12px;padding:13px;margin-bottom:13px;}
.tprow{display:flex;justify-content:space-between;align-items:center;padding:5px 0;font-size:13px;border-bottom:1px solid #e3f0ff;}
.tprow:last-child{border-bottom:none;}
.tplb{color:#6b84a0;font-weight:500;}
.tpvl{color:#0057d9;font-weight:700;}
.bkb{display:block;width:100%;padding:10px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;}
.stars{color:#f59e0b;font-size:13px;}
.rn{font-size:14px;font-weight:800;color:#1a2744;margin-left:4px;}
.rc{font-size:11.5px;color:#6b84a0;margin-left:4px;}
/* BOOKS */
.bgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(172px,1fr));gap:18px;}
.bkc{background:#fff;border-radius:14px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .2s;cursor:pointer;}
.bkc:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,87,217,.1);border-color:#0057d9;}
.bkcov{width:100%;height:192px;object-fit:cover;}
.bkbd{padding:12px;}
.bktit{font-size:13px;font-weight:700;color:#1a2744;margin-bottom:4px;line-height:1.35;}
.bkau{font-size:11.5px;color:#6b84a0;margin-bottom:8px;}
.bktag{display:inline-block;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;}
.bktag.free{background:#d1fae5;color:#065f46;}
.bktag.prem{background:#fef3c7;color:#b45309;}
/* PRICING */
.prgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px;align-items:start;}
.prcard{background:#fff;border-radius:20px;padding:26px 22px;border:2px solid #e3f0ff;transition:all .22s;position:relative;}
.prcard.pop{border-color:#0057d9;box-shadow:0 14px 44px rgba(0,87,217,.16);transform:scale(1.025);}
.prbdg{position:absolute;top:-12px;left:50%;transform:translateX(-50%);padding:4px 16px;border-radius:20px;font-size:11px;font-weight:800;white-space:nowrap;}
.prnm{font-size:17px;font-weight:800;color:#1a2744;margin-bottom:6px;margin-top:8px;}
.pramt{font-size:38px;font-weight:900;color:#0057d9;line-height:1;margin-bottom:4px;font-family:'Playfair Display',serif;}
.pramt span{font-size:16px;font-weight:600;color:#6b84a0;}
.prper{font-size:13px;color:#6b84a0;margin-bottom:20px;}
.prfts{list-style:none;margin-bottom:22px;}
.prfts li{padding:6px 0;font-size:13.5px;color:#3a5070;display:flex;align-items:flex-start;gap:8px;border-bottom:1px solid #f0f7ff;}
.prfts li::before{content:'✓';color:#22c55e;font-weight:800;flex-shrink:0;margin-top:1px;}
.prcta{display:block;width:100%;padding:12px;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;text-align:center;transition:all .2s;}
.prcta.pri{background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;box-shadow:0 4px 14px rgba(0,87,217,.3);}
.prcta.pri:hover{transform:translateY(-2px);}
.prcta.out{background:transparent;border:2px solid #0057d9;color:#0057d9;}
.prcta.out:hover{background:#0057d9;color:#fff;}
/* TESTIMONIALS */
.twrap{max-width:800px;margin:0 auto;text-align:center;}
.tcard2{background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.22);border-radius:22px;padding:38px 42px;backdrop-filter:blur(12px);}
.ttxt{font-size:18px;color:#fff;line-height:1.78;margin-bottom:24px;font-style:italic;}
.tauth{display:flex;align-items:center;justify-content:center;gap:14px;}
.tauimg{width:54px;height:54px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.38);}
.taunm{font-weight:700;color:#fff;font-size:15px;}
.taurol{font-size:12.5px;color:rgba(255,255,255,.68);}
.tdots{display:flex;gap:8px;justify-content:center;margin-top:22px;}
.tdot2{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.3);cursor:pointer;transition:all .2s;}
.tdot2.on{background:#fff;width:22px;border-radius:4px;}
/* BLOG */
.blgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(315px,1fr));gap:22px;}
.blcard{background:#fff;border-radius:18px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .2s;cursor:pointer;}
.blcard:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,87,217,.1);border-color:#0057d9;}
.blimg{width:100%;height:176px;object-fit:cover;}
.blbd{padding:18px;}
.blcat{font-size:11px;color:#0057d9;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:7px;}
.bltit{font-size:15.5px;font-weight:700;color:#1a2744;margin-bottom:8px;line-height:1.45;}
.blexc{font-size:13px;color:#6b84a0;line-height:1.6;margin-bottom:12px;}
.blmeta{display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;}
/* AI */
.aisec{background:linear-gradient(135deg,#001567,#0057d9,#1a8cff);border-radius:24px;padding:52px 46px;position:relative;overflow:hidden;}
.aisec::before{content:'';position:absolute;top:-40%;right:-8%;width:380px;height:380px;background:radial-gradient(circle,rgba(78,168,255,.22),transparent 70%);pointer-events:none;}
.aith{font-family:'Playfair Display',serif;font-size:clamp(26px,3vw,40px);font-weight:800;color:#fff;margin-bottom:10px;}
.aisub{color:rgba(255,255,255,.8);font-size:16px;margin-bottom:30px;max-width:600px;}
.airow{display:flex;gap:12px;max-width:740px;margin-bottom:18px;}
.aita{flex:1;padding:14px 18px;border-radius:12px;border:none;font-size:15px;resize:none;min-height:56px;font-family:'Inter',sans-serif;outline:none;}
.aibtn{padding:14px 22px;background:rgba(255,255,255,.16);color:#fff;border:2px solid rgba(255,255,255,.42);border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;backdrop-filter:blur(8px);transition:all .2s;}
.aibtn:hover:not(:disabled){background:rgba(255,255,255,.28);border-color:#fff;}
.aibtn:disabled{opacity:.5;cursor:not-allowed;}
.aians{background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.22);border-radius:14px;padding:22px;text-align:left;font-size:14.5px;line-height:1.82;color:#fff;white-space:pre-wrap;max-width:740px;}
.ailbl{font-weight:700;color:rgba(255,255,255,.58);font-size:11px;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px;}
.aithk{display:flex;align-items:center;gap:10px;padding:14px 0;color:rgba(255,255,255,.82);}
.dp{display:flex;gap:5px;}
.dp span{width:8px;height:8px;background:#fff;border-radius:50%;animation:dpa 1.2s infinite;}
.dp span:nth-child(2){animation-delay:.22s;}
.dp span:nth-child(3){animation-delay:.44s;}
@keyframes dpa{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
/* SEARCH */
.sinp{width:100%;padding:13px 18px;border-radius:10px;border:1.5px solid #cde0ff;font-size:15px;outline:none;transition:border .2s;font-family:'Inter',sans-serif;margin-bottom:24px;}
.sinp:focus{border-color:#0057d9;box-shadow:0 0 0 3px rgba(0,87,217,.09);}
/* ABOUT */
.agrid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
.acard{background:#fff;border-radius:18px;padding:26px;border:1.5px solid #e3f0ff;}
.atit{font-size:16px;font-weight:700;color:#0057d9;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.atxt{font-size:14px;color:#5a7090;line-height:1.72;}
/* CONTACT */
.congrid{display:grid;grid-template-columns:1fr 1.4fr;gap:26px;}
.concrd{background:#fff;border-radius:18px;padding:28px;border:1.5px solid #e3f0ff;}
.cii{display:flex;align-items:flex-start;gap:13px;margin-bottom:18px;}
.cic{width:46px;height:46px;background:#e8f1ff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
.cilab{font-size:11.5px;color:#6b84a0;font-weight:700;text-transform:uppercase;letter-spacing:.4px;}
.cival{font-size:14.5px;color:#1a2744;font-weight:600;}
.fg{margin-bottom:15px;}
.fl{display:block;font-size:13px;font-weight:600;color:#3a5070;margin-bottom:6px;}
.fi,.fta,.fsel{width:100%;padding:11px 14px;border-radius:9px;border:1.5px solid #cde0ff;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border .2s;background:#fff;}
.fi:focus,.fta:focus,.fsel:focus{border-color:#0057d9;box-shadow:0 0 0 3px rgba(0,87,217,.08);}
.fta{min-height:108px;resize:vertical;}
.subbtn{width:100%;padding:13px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;}
.subbtn:hover{opacity:.9;transform:translateY(-1px);}
.okmsg{background:#e8f8ef;border:1.5px solid #34d399;color:#065f46;padding:14px;border-radius:10px;text-align:center;font-weight:600;margin-top:12px;}
/* FAQ */
.faqlist{max-width:800px;margin:0 auto;}
.faqit{background:#fff;border-radius:14px;border:1.5px solid #e3f0ff;margin-bottom:11px;overflow:hidden;}
.faqit.op{border-color:#0057d9;box-shadow:0 4px 20px rgba(0,87,217,.09);}
.faqq{padding:18px 22px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-size:15px;font-weight:600;color:#1a2744;}
.faqq:hover{color:#0057d9;}
.faqic{font-size:22px;color:#0057d9;transition:transform .2s;flex-shrink:0;}
.faqic.op{transform:rotate(45deg);}
.faqa{padding:0 22px 18px;font-size:14px;color:#5a7090;line-height:1.7;border-top:1px solid #e3f0ff;}
/* MODALS */
.mov{position:fixed;inset:0;background:rgba(0,0,0,.58);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(5px);}
.modal{background:#fff;border-radius:22px;padding:36px;width:100%;max-width:460px;box-shadow:0 26px 64px rgba(0,0,0,.22);max-height:90vh;overflow-y:auto;}
.mtit{font-family:'Playfair Display',serif;font-size:24px;font-weight:800;color:#1a2744;margin-bottom:6px;}
.msub{font-size:14px;color:#6b84a0;margin-bottom:24px;}
.mft{margin-top:18px;text-align:center;font-size:13.5px;color:#6b84a0;}
.mlnk{color:#0057d9;font-weight:700;cursor:pointer;}
.paygrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
.paybtn{padding:14px;border-radius:12px;border:2px solid #e3f0ff;background:#fff;cursor:pointer;text-align:center;font-size:14px;font-weight:600;transition:all .2s;}
.paybtn:hover,.paybtn.sel{border-color:#0057d9;background:#e8f1ff;color:#0057d9;}
/* NEWSLETTER */
.newsbx{background:linear-gradient(135deg,#e8f1ff,#cde0ff);border-radius:22px;padding:48px 40px;text-align:center;}
.newstit{font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:#1a2744;margin-bottom:10px;}
.newssub{color:#5a7090;font-size:15px;margin-bottom:24px;}
.newsrow{display:flex;gap:10px;max-width:480px;margin:0 auto;}
.newsinp{flex:1;padding:12px 16px;border-radius:10px;border:1.5px solid #cde0ff;font-size:14.5px;outline:none;font-family:'Inter',sans-serif;}
.newsinp:focus{border-color:#0057d9;}
.newsbtn{padding:12px 22px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap;}
/* ADS */
.adsbx{background:linear-gradient(135deg,#f8fbff,#e8f1ff);border:2px dashed #cde0ff;border-radius:14px;padding:20px;text-align:center;font-size:13px;color:#6b84a0;margin:20px 0;min-height:90px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;}
/* DASHBOARD */
.dashg{display:grid;grid-template-columns:240px 1fr;gap:22px;min-height:68vh;}
.dashsd{background:#fff;border-radius:18px;border:1.5px solid #e3f0ff;padding:22px;}
.dashmain{background:#fff;border-radius:18px;border:1.5px solid #e3f0ff;padding:26px;}
.dashnv{display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:500;color:#3a5070;margin-bottom:3px;}
.dashnv:hover,.dashnv.on{background:#e8f1ff;color:#0057d9;font-weight:700;}
.progw{background:#e3f0ff;border-radius:20px;height:8px;margin:5px 0 14px;}
.progb{background:linear-gradient(90deg,#0057d9,#4ea8ff);border-radius:20px;height:8px;transition:width .6s;}
/* FOOTER */
.ft{background:#0b1a3d;color:#fff;padding:56px 20px 28px;}
.ftg{display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr 1.2fr;gap:34px;max-width:1300px;margin:0 auto;padding-bottom:38px;border-bottom:1px solid rgba(255,255,255,.08);}
.ftbr{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#4ea8ff;margin-bottom:10px;}
.fttg{font-size:13px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:18px;}
.fthd{font-size:12px;font-weight:700;color:#4ea8ff;text-transform:uppercase;letter-spacing:.6px;margin-bottom:13px;}
.ftlk{display:block;font-size:13px;color:rgba(255,255,255,.55);margin-bottom:8px;cursor:pointer;transition:color .15s;}
.ftlk:hover{color:#4ea8ff;}
.ftbot{max-width:1300px;margin:22px auto 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;}
.ftcp{font-size:12px;color:rgba(255,255,255,.35);}
.ftbgs{display:flex;gap:8px;flex-wrap:wrap;margin-top:13px;}
.ftbg{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:5px 12px;font-size:11.5px;color:rgba(255,255,255,.55);}
/* RESPONSIVE */
@media(max-width:1100px){.ftg{grid-template-columns:1fr 1fr 1fr;}}
@media(max-width:900px){.hero-g{grid-template-columns:1fr;}.hero-med{display:none;}.srow{grid-template-columns:repeat(3,1fr);}.agrid,.congrid{grid-template-columns:1fr;}.ftg{grid-template-columns:1fr 1fr;}.nav-links{display:none;}.hbg{display:block;}.dashg{grid-template-columns:1fr;}}
@media(max-width:600px){.hero{padding:54px 16px 62px;}.srow{grid-template-columns:repeat(2,1fr);}.ftg{grid-template-columns:1fr;}.airow{flex-direction:column;}.aisec{padding:30px 18px;}.newsrow{flex-direction:column;}.prgrid{grid-template-columns:1fr;}.tcard2{padding:26px 20px;}}
`;
EOF
echo "P2 done: $(wc -l < /home/claude/P2.jsx) lines"

cat > /home/claude/P3.jsx << 'EOF'
// ─── ADSENSE COMPONENT ────────────────────────────────────────────────────────
function AdBanner({ slot="auto", style={} }) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
  }, []);
  return (
    <div className="adsbx" style={style}>
      <div style={{fontSize:11,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>Advertisement — supports free education</div>
      <ins className="adsbygoogle" style={{display:"block",minHeight:60,...style}}
        data-ad-client={ADS_ID} data-ad-slot={slot}
        data-ad-format="auto" data-full-width-responsive="true"/>
      <noscript><small>📢 Ad space — <a href={`mailto:${OWNER_EMAIL}`} style={{color:"#0057d9"}}>Advertise here</a></small></noscript>
    </div>
  );
}

// ─── EMAIL HELPER — sends to owner ───────────────────────────────────────────
async function sendEmail(subject, body) {
  // Uses mailto as fallback — in production connect to EmailJS/Resend
  const link = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(link, "_blank");
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]       = useState("home");
  const [lang,setLang]       = useState("en");
  const [menuOpen,setMenu]   = useState(false);
  const [search,setSearch]   = useState("");
  const [aiQ,setAiQ]         = useState("");
  const [aiA,setAiA]         = useState("");
  const [aiLoad,setAiLoad]   = useState(false);
  const [user,setUser]       = useState(null);
  const [signup,setSignup]   = useState(false);
  const [signin,setSignin]   = useState(false);
  const [sinF,setSinF]       = useState({email:"",pass:""});
  const [supF,setSupF]       = useState({name:"",email:"",pass:"",level:""});
  const [conF,setConF]       = useState({name:"",email:"",subject:"",msg:""});
  const [conSent,setConSent] = useState(false);
  const [news,setNews]       = useState("");
  const [newsSent,setNewsSent]= useState(false);
  const [motIdx,setMotIdx]   = useState(0);
  const [showAds,setShowAds] = useState(true);
  const [faqOp,setFaqOp]     = useState(null);
  const [selPlan,setSelPlan] = useState(null);
  const [payOpen,setPayOpen] = useState(false);
  const [payStep,setPayStep] = useState(1);
  const [payM,setPayM]       = useState("");
  const [notif,setNotif]     = useState(null);
  const [catF,setCatF]       = useState("All");
  const [annVis,setAnnVis]   = useState(true);
  const [booking,setBooking] = useState(null);
  const [testiI,setTestiI]   = useState(0);
  const [dashTab,setDashTab] = useState("overview");
  const [blogPost,setBlogPost]= useState(null);

  // slideshow + testimonial auto-advance
  useEffect(()=>{ const t=setInterval(()=>setMotIdx(i=>(i+1)%MOTION.length),4200); return()=>clearInterval(t); },[]);
  useEffect(()=>{ const t=setInterval(()=>setTestiI(i=>(i+1)%TESTIMONIALS.length),5200); return()=>clearInterval(t); },[]);

  const notify = msg => { setNotif(msg); setTimeout(()=>setNotif(null),3800); };
  const go = p => { setPage(p); setMenu(false); setSearch(""); setBlogPost(null); window.scrollTo(0,0); };

  // ── AI TUTOR ──────────────────────────────────────────────────────────────
  async function askAI() {
    if (!aiQ.trim()) return;
    setAiLoad(true); setAiA("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1200,
          system:`You are a world-class educational AI tutor for Global Elite Academy 2026. 
Help students from primary school to university level worldwide. 
Give structured, clear, encouraging step-by-step answers. 
Automatically detect and reply in the same language as the student.
Always be warm, motivating and supportive.`,
          messages:[{role:"user",content:aiQ}]
        })
      });
      const d = await res.json();
      setAiA(d.content?.map(b=>b.text||"").join("")||"Please try again.");
    } catch(e) { setAiA("Network error. Please check your connection and try again."); }
    setAiLoad(false);
  }

  // ── AUTH ──────────────────────────────────────────────────────────────────
  function doSignin(e){
    e.preventDefault();
    if(sinF.email&&sinF.pass){
      setUser({name:sinF.email.split("@")[0],email:sinF.email,plan:"free",books:10,papers:10});
      setSignin(false);
      notify("👋 Welcome back! 10 free eBooks unlocked this month.");
      sendEmail("New Sign In — GEA",`User signed in: ${sinF.email}`);
    }
  }

  function doSignup(e){
    e.preventDefault();
    if(supF.name&&supF.email&&supF.pass){
      setUser({name:supF.name,email:supF.email,plan:"free",books:10,papers:10,level:supF.level});
      setSignup(false);
      notify("🎉 Account created! 10 free eBooks unlocked. Welcome to GEA!");
      sendEmail("New Registration — GEA",
        `New student registered:\nName: ${supF.name}\nEmail: ${supF.email}\nLevel: ${supF.level}`);
    }
  }

  // ── PAYMENT ───────────────────────────────────────────────────────────────
  function doPay(){
    if(payStep===1&&payM){ setPayStep(2); return; }
    if(payStep===2){
      setPayOpen(false); setPayStep(1); setPayM("");
      if(user) setUser({...user,plan:selPlan?.id||"starter"});
      notify(`🎉 Subscribed to ${selPlan?.name}! Full access unlocked.`);
      sendEmail(`New Subscription — GEA`,
        `Plan: ${selPlan?.name} $${selPlan?.price}/${selPlan?.period}\nUser: ${user?.email||"guest"}\nPayment: ${payM}`);
    }
  }

  // ── CONTACT SEND ─────────────────────────────────────────────────────────
  function doContact(){
    if(conF.name&&conF.email&&conF.msg){
      setConSent(true);
      sendEmail(`GEA Contact: ${conF.subject||"General"}`,
        `From: ${conF.name} <${conF.email}>\nSubject: ${conF.subject}\n\n${conF.msg}`);
    }
  }

  const cats = ["All",...new Set(COURSES.map(c=>c.cat))];
  const filtC = COURSES.filter(c=>
    (catF==="All"||c.cat===catF)&&
    (search===""||c.title.toLowerCase().includes(search.toLowerCase()))
  );

  // ── MODALS ────────────────────────────────────────────────────────────────
  const SigninModal = ()=>(
    <div className="mov" onClick={()=>setSignin(false)}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="mtit">🔑 Welcome Back</div>
        <div className="msub">Sign in to unlock your 10 free eBooks this month</div>
        <div className="fg"><label className="fl">Email</label><input className="fi" type="email" value={sinF.email} onChange={e=>setSinF(f=>({...f,email:e.target.value}))} placeholder="you@email.com"/></div>
        <div className="fg"><label className="fl">Password</label><input className="fi" type="password" value={sinF.pass} onChange={e=>setSinF(f=>({...f,pass:e.target.value}))} placeholder="••••••••"/></div>
        <button className="subbtn" onClick={doSignin}>Sign In →</button>
        <div className="mft">No account? <span className="mlnk" onClick={()=>{setSignin(false);setSignup(true);}}>Create one free</span></div>
      </div>
    </div>
  );

  const SignupModal = ()=>(
    <div className="mov" onClick={()=>setSignup(false)}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="mtit">🎓 Create Free Account</div>
        <div className="msub">Join 100,000+ students — 10 free eBooks unlocked instantly</div>
        <div className="fg"><label className="fl">Full Name</label><input className="fi" value={supF.name} onChange={e=>setSupF(f=>({...f,name:e.target.value}))} placeholder="Your full name"/></div>
        <div className="fg"><label className="fl">Email</label><input className="fi" type="email" value={supF.email} onChange={e=>setSupF(f=>({...f,email:e.target.value}))} placeholder="you@email.com"/></div>
        <div className="fg"><label className="fl">Password</label><input className="fi" type="password" value={supF.pass} onChange={e=>setSupF(f=>({...f,pass:e.target.value}))} placeholder="Create password"/></div>
        <div className="fg"><label className="fl">Your Level</label>
          <select className="fsel" value={supF.level} onChange={e=>setSupF(f=>({...f,level:e.target.value}))}>
            <option value="">Select your level</option>
            {["Primary School (Grades 1-6)","Middle School (Grades 7-9)","Secondary / GCSE","A-Level / Pre-University","University","Parent / Guardian","Teacher / Educator","Corporate Professional"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <button className="subbtn" onClick={doSignup}>Create Free Account 🎉</button>
        <div className="mft">Already registered? <span className="mlnk" onClick={()=>{setSignup(false);setSignin(true);}}>Sign in</span></div>
      </div>
    </div>
  );

  const PayModal = ()=>(
    <div className="mov" onClick={()=>{setPayOpen(false);setPayStep(1);}}>
      <div className="modal" style={{maxWidth:500}} onClick={e=>e.stopPropagation()}>
        {payStep===1&&<>
          <div className="mtit">💳 Choose Payment Method</div>
          <div className="msub">Plan: <strong>{selPlan?.name}</strong> — <strong style={{color:"#0057d9"}}>${selPlan?.price}/{selPlan?.period}</strong></div>
          <div className="paygrid">
            {[{id:"visa",l:"💳 Visa / Mastercard"},{id:"paypal",l:"🅿️ PayPal"},{id:"apple",l:"🍎 Apple Pay"},{id:"google",l:"🔵 Google Pay"},{id:"bank",l:"🏦 Bank Transfer"},{id:"mpesa",l:"📱 M-Pesa / Mobile"}].map(m=>(
              <button key={m.id} className={`paybtn${payM===m.id?" sel":""}`} onClick={()=>setPayM(m.id)}>{m.l}</button>
            ))}
          </div>
          <button className="subbtn" onClick={doPay} disabled={!payM}>Continue →</button>
          <div style={{textAlign:"center",marginTop:12,fontSize:12,color:"#94a3b8"}}>🔒 SSL encrypted · 30-day money-back guarantee</div>
        </>}
        {payStep===2&&<>
          <div className="mtit">✅ Confirm Payment</div>
          <div className="msub">Paying via <strong>{payM}</strong></div>
          <div style={{background:"#f0f7ff",borderRadius:12,padding:18,marginBottom:20}}>
            {[["Plan",selPlan?.name],["Amount",`$${selPlan?.price}/${selPlan?.period}`],["Security","🔒 SSL Encrypted"],["Cancel","Anytime, no fees"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #e3f0ff",fontSize:14}}>
                <span style={{color:"#6b84a0"}}>{k}</span>
                <strong style={{color:k==="Amount"?"#0057d9":"#1a2744"}}>{v}</strong>
              </div>
            ))}
          </div>
          <button className="subbtn" onClick={doPay}>Confirm & Pay ${selPlan?.price} →</button>
        </>}
      </div>
    </div>
  );

  const BookModal = ()=>{
    const t=TUTORS.find(x=>x.name===booking);
    if(!t)return null;
    return(
      <div className="mov" onClick={()=>setBooking(null)}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="mtit">📅 Book a Session</div>
          <div className="msub">with <strong>{t.name}</strong> — {t.subject}</div>
          <div style={{background:"#f0f7ff",borderRadius:12,padding:16,marginBottom:18}}>
            <div style={{fontWeight:700,color:"#0057d9",fontSize:13,marginBottom:10}}>Select your level & price:</div>
            {[{l:"Primary / GCSE",p:t.pb},{l:"A-Level",p:t.pa},{l:"University",p:t.pp}].map(o=>(
              <div key={o.l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #e3f0ff",fontSize:14}}>
                <span style={{color:"#3a5070"}}>{o.l}</span>
                <strong style={{color:"#0057d9"}}>${o.p}/session</strong>
              </div>
            ))}
          </div>
          <div className="fg"><label className="fl">Preferred Date & Time</label><input className="fi" type="datetime-local"/></div>
          <div className="fg"><label className="fl">Subject / Topic</label><input className="fi" placeholder="e.g. Quadratic equations, Cell division..."/></div>
          <div className="fg"><label className="fl">Your Email</label><input className="fi" type="email" placeholder="For confirmation & video link"/></div>
          <button className="subbtn" onClick={()=>{
            setBooking(null);
            sendEmail(`Tutor Booking Request — ${t.name}`,`Tutor: ${t.name}\nSubject: ${t.subject}\nUser: ${user?.email||"guest"}`);
            notify(`✅ Session with ${t.name} requested! Check your email for the video link.`);
          }}>Book & Pay →</button>
        </div>
      </div>
    );
  };
EOF
echo "P3 done: $(wc -l < /home/claude/P3.jsx) lines"
 
cat > /home/claude/P4.jsx << 'EOF'
  // ── PAGES ────────────────────────────────────────────────────────────────────

  const HomePage = ()=>(
    <>
      <div className="hero">
        <div className="hero-g con">
          <div>
            <div className="hero-badge">🌍 2026–2030 World Education Platform</div>
            <h1 className="hero-h">Learn Anything.<br/><span>Achieve Everything.</span></h1>
            <p className="hero-sub">From Primary to University. Past papers, live tutors, AI learning and 1,200+ resources. Free to start. 6 languages. 100,000+ students in 150+ countries.</p>
            <div className="hero-btns">
              <button className="bhp" onClick={()=>setSignup(true)}>🎓 Start Free Today</button>
              <button className="bho" onClick={()=>go("courses")}>Browse Courses →</button>
              <button className="bho" onClick={()=>go("pricing")}>View Plans</button>
            </div>
            <div className="hero-stats">
              {[["100K+","Students"],["150+","Countries"],["500+","Papers"],["50+","Tutors"],["6","Languages"]].map(([n,l])=>(
                <div key={l}><div className="hs-n">{n}</div><div className="hs-l">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-med">
            <div className="hero-iw">
              <img src={MOTION[motIdx].src} alt={MOTION[motIdx].cap} key={motIdx}/>
              <div className="hero-cap">{MOTION[motIdx].cap}</div>
              {showAds&&<button className="ads-tog" onClick={()=>setShowAds(false)}>Hide Ad ✕</button>}
            </div>
            <div className="hfl tl">🔥 Cambridge 2024 Papers Live!</div>
            <div className="hfl br">⭐ 4.9/5 · 12,000+ reviews</div>
          </div>
        </div>
      </div>

      <div className="sbar"><div className="srow">
        {[["500+","Past Papers"],["1,200+","Study Notes"],["100K+","Students"],["50+","Expert Tutors"],["24/7","AI Support"]].map(([n,l])=>(
          <div key={l} className="si"><div className="sn">{n}</div><div className="sl">{l}</div></div>
        ))}
      </div></div>

      {showAds&&<div className="con"><AdBanner slot="1234567890"/></div>}

      <div className="sec"><div className="con">
        <div className="shd">
          <span className="ey">Everything You Need</span>
          <h2 className="stit">One Platform. All Levels. Every Subject.</h2>
          <p className="ssub">Whether you are 8 or 28, studying GCSE or a PhD — we have the tools, tutors and resources to help you succeed worldwide.</p>
        </div>
        <div className="fgrid">
          {[{ic:"📄",t:"Free Past Papers",d:"10 exam papers free/month. 500+ papers from NECTA, Cambridge, AQA, IB and more.",n:"papers"},
            {ic:"🎓",t:"Expert Courses",d:"$5–$45/month per course. Primary to University. Up to 95 lessons each with video.",n:"courses"},
            {ic:"🤖",t:"AI Tutor 24/7",d:"Ask any question in any language. Powered by advanced AI. Always available, always free.",n:"home"},
            {ic:"👨‍🏫",t:"Live Tutor Sessions",d:"Book 1-on-1 sessions. $10–$30 per session. Oxford, MIT, Stanford-trained tutors.",n:"tutors"},
            {ic:"📚",t:"eBook Library",d:"10 free eBooks/month for members. 200+ titles. Download and read offline anytime.",n:"library"},
            {ic:"🏆",t:"Certificates",d:"Earn verified certificates recognized by universities and employers worldwide.",n:"courses"},
            {ic:"📊",t:"Parent Dashboard",d:"Track your child's progress in real time. Set goals and monitor assignments daily.",n:"dashboard"},
            {ic:"🌍",t:"6 Languages",d:"English, British, French, Chinese, German, Kiswahili. More coming in 2027.",n:"home"},
          ].map((f,i)=>(
            <div key={i} className="fcard" onClick={()=>go(f.n)}>
              <div className="fic">{f.ic}</div>
              <div className="ftit">{f.t}</div>
              <div className="fdsc">{f.d}</div>
            </div>
          ))}
        </div>
      </div></div>

      <div className="sec-w"><div className="con">
        <div style={{background:"linear-gradient(135deg,#e8f1ff,#cde0ff)",borderRadius:24,padding:"46px 40px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}}>
          <div>
            <div style={{background:"#0057d9",color:"#fff",display:"inline-block",padding:"4px 14px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:16}}>FREE MEMBER OFFER</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,34px)",fontWeight:800,color:"#1a2744",marginBottom:14,lineHeight:1.2}}>Sign In → Get 10 Free eBooks Every Month</h2>
            <p style={{fontSize:15,color:"#5a7090",lineHeight:1.7,marginBottom:24}}>Create your free account today. Instantly unlock 10 premium eBooks from our library — refreshed every month. No credit card needed. Ever.</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button className="bpri" onClick={()=>setSignup(true)}>Create Free Account →</button>
              <button className="bout" onClick={()=>go("library")}>Browse Library</button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {BOOKS.slice(0,4).map((b,i)=>(
              <div key={i} style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1.5px solid #cde0ff",cursor:"pointer"}} onClick={()=>!user?setSignup(true):notify(`📖 Opening "${b.title}"...`)}>
                <img src={b.img} alt={b.title} style={{width:"100%",height:96,objectFit:"cover"}}/>
                <div style={{padding:"10px 12px"}}><div style={{fontSize:12,fontWeight:700,color:"#1a2744",marginBottom:4,lineHeight:1.3}}>{b.title}</div><span className={`bktag ${b.free?"free":"prem"}`}>{b.free?"FREE":"Premium"}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div></div>

      <div className="sec"><div className="con">
        <div className="shd">
          <span className="ey">Top Courses 2026</span>
          <h2 className="stit">Most Popular Courses Worldwide</h2>
          <p className="ssub">From $5/month. All levels. All subjects. Taught by PhD-qualified educators from Oxford, MIT and Stanford.</p>
        </div>
        <div className="cgrid">
          {COURSES.slice(0,6).map((c,i)=>(
            <div key={i} className="ccard">
              <div className="ciw"><img src={c.img} alt={c.title} className="cimg"/><div className="cbdg">{c.level}</div></div>
              <div className="cbody">
                <div className="ccat">{c.cat}</div>
                <div className="ctit">{c.title}</div>
                <div className="cmeta"><span>👨‍🏫 {c.instructor.split(" ").slice(-1)}</span><span>📚 {c.lessons} lessons</span><span>⏱ {c.dur}</span></div>
                <div className="cft">
                  <div><div className="cprice">${c.price}<span>/mo</span></div><div className="crat">★ {c.rating} ({(c.students/1000).toFixed(1)}k)</div></div>
                  <button className="enb" onClick={()=>!user?setSignup(true):(setSelPlan(PLANS[1]),setPayOpen(true))}>Enroll</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:32}}><button className="bpri" onClick={()=>go("courses")}>View All 24 Courses →</button></div>
      </div></div>

      <div className="sec-w"><div className="con">
        <div className="aisec">
          <span className="ey lt" style={{marginBottom:14,display:"inline-block"}}>Powered by Advanced AI</span>
          <h2 className="aith">🤖 Ask Our AI Tutor Anything</h2>
          <p className="aisub">Available 24/7 in 6 languages. From Grade 1 maths to PhD research — just ask and get a clear answer.</p>
          <div className="airow">
            <textarea className="aita" placeholder="e.g. Explain photosynthesis for Grade 7, Solve 3x²-5x+2=0 step by step, What caused World War I?..." value={aiQ} onChange={e=>setAiQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();askAI();}}} rows={2}/>
            <button className="aibtn" onClick={askAI} disabled={aiLoad||!aiQ.trim()}>{aiLoad?"...":"Ask AI →"}</button>
          </div>
          {aiLoad&&<div className="aithk"><div className="dp"><span/><span/><span/></div><span>AI is thinking...</span></div>}
          {aiA&&<div className="aians"><div className="ailbl">✅ AI Tutor Answer</div>{aiA}</div>}
        </div>
      </div></div>

      <div className="sec-dk"><div className="con">
        <div className="shd"><span className="ey lt">Student Stories</span><h2 className="stit lt">Real Results From Real Students Worldwide</h2></div>
        <div className="twrap">
          <div className="tcard2">
            <div className="ttxt">"{TESTIMONIALS[testiI].text}"</div>
            <div className="tauth">
              <img src={TESTIMONIALS[testiI].img} alt={TESTIMONIALS[testiI].name} className="tauimg"/>
              <div><div className="taunm">{TESTIMONIALS[testiI].name} — {TESTIMONIALS[testiI].country}</div><div className="taurol">{TESTIMONIALS[testiI].role}</div></div>
            </div>
          </div>
          <div className="tdots">{TESTIMONIALS.map((_,i)=><div key={i} className={`tdot2${i===testiI?" on":""}`} onClick={()=>setTestiI(i)}/>)}</div>
        </div>
      </div></div>

      <div className="sec"><div className="con">
        <div className="shd">
          <span className="ey">Expert Faculty</span>
          <h2 className="stit">Learn From the World's Best Tutors</h2>
          <p className="ssub">$10–$30 per session depending on level. Instant booking. Video call. Oxford, MIT, Stanford, Sorbonne.</p>
        </div>
        <div className="tgrid">
          {TUTORS.slice(0,3).map((t,i)=>(
            <div key={i} className="tcard">
              <div className="thdr">
                <div className="tiw"><img src={t.img} alt={t.name} className="timg"/><div className={`tdot ${t.avail?"on":"off"}`}/></div>
                <div><div className="tnm">{t.name}</div><div className="tsub">{t.subject}</div><div className="tloc">📍 {t.country}</div></div>
              </div>
              <div className="tqu">{t.quals}</div>
              <div className="tpr">
                <div className="tprow"><span className="tplb">GCSE Level</span><span className="tpvl">${t.pb}/session</span></div>
                <div className="tprow"><span className="tplb">A-Level</span><span className="tpvl">${t.pa}/session</span></div>
                <div className="tprow"><span className="tplb">University</span><span className="tpvl">${t.pp}/session</span></div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:12}}><span className="stars">★★★★★</span><span className="rn">{t.rating}</span><span className="rc">({t.reviews} reviews · {t.sessions} sessions)</span></div>
              <button className="bkb" onClick={()=>!user?setSignup(true):setBooking(t.name)}>Book a Session →</button>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:32}}><button className="bpri" onClick={()=>go("tutors")}>Meet All 6 Tutors →</button></div>
      </div></div>

      <div className="sec-w"><div className="con">
        <div className="shd">
          <span className="ey">Simple Pricing</span>
          <h2 className="stit">Plans From $5/Month. Free Forever Available.</h2>
          <p className="ssub">Cancel anytime. 30-day money-back guarantee. No hidden fees. Exams always free (10/month).</p>
        </div>
        <div className="prgrid">
          {PLANS.slice(0,4).map((p,i)=>(
            <div key={i} className={`prcard${p.popular?" pop":""}`}>
              {p.badge&&<div className="prbdg" style={{background:p.color,color:"#fff"}}>{p.badge}</div>}
              <div className="prnm">{p.name}</div>
              <div className="pramt">{p.price===0?"Free":`$${p.price}`}<span>{p.price>0?`/${p.period}`:""}</span></div>
              <div className="prper">{p.price===0?"No credit card needed":"Cancel anytime"}</div>
              <ul className="prfts">{p.features.map((f,j)=><li key={j}>{f}</li>)}</ul>
              <button className={`prcta ${p.popular?"pri":"out"}`} onClick={()=>p.price===0?setSignup(true):(setSelPlan(p),user?setPayOpen(true):setSignin(true))}>{p.cta}</button>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:26}}><button className="bout" onClick={()=>go("pricing")}>Compare All 6 Plans →</button></div>
      </div></div>

      <div className="sec"><div className="con">
        <div className="shd"><span className="ey">Latest Insights</span><h2 className="stit">From Our Education Blog</h2></div>
        <div className="blgrid">
          {BLOG.slice(0,3).map((b,i)=>(
            <div key={i} className="blcard" onClick={()=>{setBlogPost(b);go("blog");}}>
              <img src={b.img} alt={b.title} className="blimg"/>
              <div className="blbd"><div className="blcat">{b.cat}</div><div className="bltit">{b.title}</div><div className="blexc">{b.excerpt}</div><div className="blmeta"><span>{b.date}</span><span>⏱ {b.rt} read</span></div></div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:28}}><button className="bout" onClick={()=>go("blog")}>Read All Articles →</button></div>
      </div></div>

      {showAds&&<div className="con"><AdBanner slot="2233445566"/></div>}

      <div className="sec-w"><div className="con">
        <div className="newsbx">
          <div className="newstit">📬 Stay Ahead in Education</div>
          <p className="newssub">Weekly study tips, new past papers, AI trends and exclusive offers — free.</p>
          {newsSent?<div style={{color:"#0057d9",fontWeight:700,fontSize:16}}>✅ Subscribed! Check your inbox.</div>:
            <div className="newsrow">
              <input className="newsinp" placeholder="Enter your email" value={news} onChange={e=>setNews(e.target.value)}/>
              <button className="newsbtn" onClick={()=>{if(news){setNewsSent(true);notify("📬 Subscribed! Welcome to the GEA community.");sendEmail("New Newsletter Subscriber",`Email: ${news}`)}}}>Subscribe Free</button>
            </div>}
        </div>
      </div></div>
    </>
  );

  const CoursesPage = ()=>(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">All Courses</span><h2 className="stit">24 Expert-Led Courses Worldwide</h2><p className="ssub">From $5–$55/month. Primary through University. Cancel anytime.</p></div>
      {showAds&&<AdBanner slot="3344556677"/>}
      <input className="sinp" placeholder="Search courses, subjects, topics..." value={search} onChange={e=>setSearch(e.target.value)}/>
      <div className="ftabs">{cats.map(c=><button key={c} className={`ftab${catF===c?" on":""}`} onClick={()=>setCatF(c)}>{c}</button>)}</div>
      <div className="cgrid">
        {filtC.map((c,i)=>(
          <div key={i} className="ccard">
            <div className="ciw"><img src={c.img} alt={c.title} className="cimg"/><div className="cbdg">{c.level}</div></div>
            <div className="cbody">
              <div className="ccat">{c.cat}</div>
              <div className="ctit">{c.title}</div>
              <div className="cmeta"><span>👨‍🏫 {c.instructor}</span><span>📚 {c.lessons} lessons</span><span>⏱ {c.dur}</span><span>👥 {(c.students/1000).toFixed(1)}k</span></div>
              <div className="cft">
                <div><div className="cprice">${c.price}<span>/mo</span></div><div className="crat">★ {c.rating}</div></div>
                <button className="enb" onClick={()=>!user?setSignup(true):(setSelPlan(PLANS[1]),setPayOpen(true))}>Enroll Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtC.length===0&&<div style={{textAlign:"center",padding:"40px",color:"#6b84a0",fontSize:16}}>No courses found for "{search}" — try a different search.</div>}
    </div></div>
  );

  const PapersPage = ()=>(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">Past Papers</span><h2 className="stit">500+ Past Exam Papers</h2><p className="ssub">Free members: 10 papers/month. Premium: unlimited. Cambridge, NECTA, AQA, IB and more.</p></div>
      {showAds&&<AdBanner slot="4455667788"/>}
      <div style={{background:"#e8f1ff",borderRadius:14,padding:"14px 20px",marginBottom:22,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <span style={{fontSize:22}}>ℹ️</span>
        <div><strong style={{color:"#0057d9"}}>Free members:</strong><span style={{color:"#3a5070"}}> 10 papers free/month. Upgrade to Scholar Plus for unlimited access to all 500+ papers.</span></div>
        {!user&&<button className="bpri bsm" onClick={()=>setSignup(true)}>Sign Up Free →</button>}
      </div>
      <input className="sinp" placeholder="Search by subject, level, exam board..." value={search} onChange={e=>setSearch(e.target.value)}/>
      <div className="pgrid">
        {PAPERS.filter(p=>search===""||[p.subject,p.level,p.org].join(" ").toLowerCase().includes(search.toLowerCase())).map((p,i)=>(
          <div key={i} className="pcard">
            <img src={p.img} alt={p.subject} className="pimg"/>
            <div className="pbody">
              <div className="psub">{p.subject}</div>
              <div className="pmeta">Board: {p.org} | Year: {p.year}</div>
              <div className="ptags"><span className="ptag">{p.level}</span><span className={`ptag${!p.free?" prem":""}`}>{p.free?"FREE":"Premium"}</span></div>
              <button className={`pdl${!p.free&&!user?" lk":""}`} onClick={()=>!p.free&&!user?setSignup(true):notify(`📄 Downloading ${p.subject} ${p.year} paper...`)}>
                {!p.free&&!user?"🔒 Sign In to Download":"⬇ Download PDF"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div></div>
  );

  const TutorsPage = ()=>(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">Expert Faculty</span><h2 className="stit">Book a Live 1-on-1 Tutor Session</h2><p className="ssub">$10–$30 per session depending on level. Instant booking. Video call link sent immediately.</p></div>
      {showAds&&<AdBanner slot="5566778899"/>}
      <div className="tgrid">
        {TUTORS.map((t,i)=>(
          <div key={i} className="tcard">
            <div className="thdr">
              <div className="tiw"><img src={t.img} alt={t.name} className="timg"/><div className={`tdot ${t.avail?"on":"off"}`}/></div>
              <div><div className="tnm">{t.name}</div><div className="tsub">{t.subject}</div><div className="tloc">📍 {t.country}</div>
              <div style={{fontSize:11,marginTop:4,color:t.avail?"#22c55e":"#94a3b8",fontWeight:700}}>{t.avail?"● Available Now":"○ Next: Tomorrow"}</div></div>
            </div>
            <div className="tqu">{t.quals}</div>
            <div className="tbio">{t.bio}</div>
            <div className="tsts">
              <div><div className="tsn">{t.rating}</div><div className="tsl">Rating</div></div>
              <div><div className="tsn">{t.reviews}</div><div className="tsl">Reviews</div></div>
              <div><div className="tsn">{t.sessions}</div><div className="tsl">Sessions</div></div>
            </div>
            <div className="tpr">
              <div style={{fontWeight:700,color:"#0057d9",fontSize:13,marginBottom:8}}>Session Rates:</div>
              <div className="tprow"><span className="tplb">Primary / GCSE</span><span className="tpvl">${t.pb}/session</span></div>
              <div className="tprow"><span className="tplb">A-Level</span><span className="tpvl">${t.pa}/session</span></div>
              <div className="tprow"><span className="tplb">University</span><span className="tpvl">${t.pp}/session</span></div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:12}}><span className="stars">★★★★★</span><span className="rn">{t.rating}</span><span className="rc">({t.reviews} reviews)</span></div>
            <button className="bkb" onClick={()=>!user?setSignup(true):setBooking(t.name)}>📅 Book Session</button>
          </div>
        ))}
      </div>
    </div></div>
  );

  const LibraryPage = ()=>(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">eBook Library</span><h2 className="stit">200+ eBooks for Every Level</h2><p className="ssub">Sign in to unlock 10 free eBooks every month. Premium members: unlimited access.</p></div>
      {!user&&<div style={{background:"linear-gradient(135deg,#e8f1ff,#cde0ff)",borderRadius:16,padding:"22px 26px",marginBottom:30,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
        <div><strong style={{color:"#0057d9",fontSize:16}}>📚 10 Free eBooks/Month for Members</strong><p style={{fontSize:14,color:"#5a7090",marginTop:4}}>Sign in to unlock your free monthly eBooks. No credit card required.</p></div>
        <div style={{display:"flex",gap:10}}><button className="bpri" onClick={()=>setSignup(true)}>Sign Up Free</button><button className="bout" onClick={()=>setSignin(true)}>Sign In</button></div>
      </div>}
      {user&&<div style={{background:"#d1fae5",borderRadius:12,padding:"14px 20px",marginBottom:22,display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:20}}>✅</span><span style={{fontWeight:600,color:"#065f46"}}>You have <strong>{user.books}</strong> free eBooks remaining this month. Resets on the 1st.</span></div>}
      {showAds&&<AdBanner slot="6677889900"/>}
      <div className="bgrid">
        {BOOKS.map((b,i)=>(
          <div key={i} className="bkc" onClick={()=>!user?setSignup(true):notify(`📖 Opening "${b.title}"...`)}>
            <img src={b.img} alt={b.title} className="bkcov"/>
            <div className="bkbd">
              <div className="bktit">{b.title}</div>
              <div className="bkau">By {b.author}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span className={`bktag ${b.free?"free":"prem"}`}>{b.free?"FREE":"Premium"}</span>
                <span style={{fontSize:11,color:"#94a3b8"}}>{b.pages}p</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div></div>
  );

  const BlogPage = ()=>(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">Knowledge Hub</span><h2 className="stit">Education Blog & Insights</h2><p className="ssub">Stay ahead with the latest in AI education, study techniques, and global learning trends.</p></div>
      {showAds&&<AdBanner slot="7788990011"/>}
      <div className="blgrid">
        {BLOG.map((b,i)=>(
          <div key={i} className="blcard">
            <img src={b.img} alt={b.title} className="blimg"/>
            <div className="blbd">
              <div className="blcat">{b.cat}</div>
              <div className="bltit">{b.title}</div>
              <div className="blexc">{b.excerpt}</div>
              <div className="blmeta"><span>{b.date}</span><span>⏱ {b.rt} read</span></div>
              <button style={{marginTop:12,background:"none",border:"1.5px solid #cde0ff",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:600,color:"#0057d9",cursor:"pointer"}} onClick={()=>notify("📰 Full article opening... (connect CMS for full articles)")}>Read Article →</button>
            </div>
          </div>
        ))}
      </div>
    </div></div>
  );

  const PricingPage = ()=>(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">Transparent Pricing</span><h2 className="stit">Plans From $5/Month</h2><p className="ssub">Past papers always free (10/month). Pay only for premium content. Cancel anytime, no fees.</p></div>
      <div className="prgrid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(195px,1fr))"}}>
        {PLANS.map((p,i)=>(
          <div key={i} className={`prcard${p.popular?" pop":""}`}>
            {p.badge&&<div className="prbdg" style={{background:p.color,color:"#fff"}}>{p.badge}</div>}
            <div className="prnm">{p.name}</div>
            <div className="pramt">{p.price===0?"Free":`$${p.price}`}<span>{p.price>0?`/${p.period}`:""}</span></div>
            <div className="prper">{p.price===0?"Forever free":"Cancel anytime"}</div>
            <ul className="prfts">{p.features.map((f,j)=><li key={j}>{f}</li>)}</ul>
            <button className={`prcta ${i===1?"pri":"out"}`} onClick={()=>p.price===0?setSignup(true):(setSelPlan(p),user?setPayOpen(true):setSignin(true))}>{p.cta}</button>
          </div>
        ))}
      </div>
      <div style={{marginTop:44,background:"#f0f7ff",borderRadius:18,padding:"30px 26px"}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"#1a2744",marginBottom:14}}>💳 All Payment Methods Accepted</h3>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {["💳 Visa","💳 Mastercard","🅿️ PayPal","🍎 Apple Pay","🔵 Google Pay","🏦 Bank Transfer","📱 M-Pesa","🔒 SWIFT/SEPA"].map(m=>(
            <div key={m} style={{background:"#fff",border:"1.5px solid #cde0ff",borderRadius:10,padding:"10px 18px",fontSize:14,fontWeight:600,color:"#3a5070"}}>{m}</div>
          ))}
        </div>
      </div>
      {showAds&&<AdBanner slot="8899001122" style={{marginTop:24}}/>}
    </div></div>
  );

  const AboutPage = ()=>(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">Who We Are</span><h2 className="stit">About Global Elite Academy</h2><p className="ssub">Founded on the belief that every student deserves world-class education — regardless of geography, income, or language.</p></div>
      <div className="agrid">
        {[{ic:"🎯",t:"Our Mission",tx:"To democratize education globally — providing free, high-quality resources to 100 million students by 2030. We believe the future belongs to learners, not the privileged."},
          {ic:"🌍",t:"Our Reach",tx:"Students in 150+ countries. Resources in 6 languages. 24/7 AI support. Primary to PhD. Building the world's most accessible education platform since 2026."},
          {ic:"👥",t:"Our Team",tx:"50+ educators from Oxford, MIT, Stanford, Sorbonne and Humboldt University. United by one goal: better outcomes for every learner worldwide."},
          {ic:"🤖",t:"Our Technology",tx:"Powered by advanced AI for personalized learning. 2026–2030 roadmap: AR classrooms, AI mentors, real-time skill certification recognized by top universities."},
          {ic:"📈",t:"2026–2030 Vision",tx:"Immersive AI classrooms. Global credential passports. Real-time translation for every lesson. Parent AI companion. Corporate training. University direct pathways."},
          {ic:"💚",t:"Our Promise",tx:"Exams always free (10/month). 10 eBooks free for every member. AI Tutor free daily. Education is a right, not a privilege. This promise never changes."},
        ].map((a,i)=>(
          <div key={i} className="acard"><div className="atit">{a.ic} {a.t}</div><div className="atxt">{a.tx}</div></div>
        ))}
      </div>
      <div style={{background:"linear-gradient(135deg,#001d6b,#0057d9)",borderRadius:20,padding:"40px",marginTop:36,color:"#fff",textAlign:"center"}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,marginBottom:24}}>Our Impact in Numbers</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:20}}>
          {[["100K+","Students"],["150+","Countries"],["500+","Papers"],["50+","Tutors"],["6","Languages"],["24/7","AI Support"],["1,200+","Resources"],["$5","Starting Price"]].map(([n,l])=>(
            <div key={l}><div style={{fontSize:30,fontWeight:900,color:"#93c5fd"}}>{n}</div><div style={{fontSize:12,color:"rgba(255,255,255,.72)",marginTop:3}}>{l}</div></div>
          ))}
        </div>
      </div>
    </div></div>
  );

  const ContactPage = ()=>(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">Support</span><h2 className="stit">Contact & Customer Support</h2><p className="ssub">We are here 24/7. Average response under 2 hours. All messages go directly to our team.</p></div>
      <div className="congrid">
        <div className="concrd">
          {[{ic:"📧",l:"Email Support",v:"info@globaleliteacademy.edu"},{ic:"📧",l:"Owner Direct",v:OWNER_EMAIL},{ic:"💬",l:"WhatsApp",v:"+1 (800) GEA-LEARN"},{ic:"🌐",l:"Website",v:"www.globaleliteacademy.edu"},{ic:"🕐",l:"Support Hours",v:"24/7 AI · Human 9am–9pm UTC"}].map((x,i)=>(
            <div key={i} className="cii"><div className="cic">{x.ic}</div><div><div className="cilab">{x.l}</div><div className="cival">{x.v}</div></div></div>
          ))}
          <div style={{background:"#e8f1ff",borderRadius:12,padding:18,marginTop:6}}>
            <div style={{fontWeight:700,color:"#0057d9",marginBottom:8}}>🤖 Need instant help?</div>
            <p style={{fontSize:13.5,color:"#5a7090",marginBottom:12}}>Our AI Tutor answers any academic question instantly in 6 languages.</p>
            <button className="bpri bsm" onClick={()=>go("home")}>Open AI Tutor →</button>
          </div>
        </div>
        <div className="concrd">
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#1a2744",marginBottom:20}}>Send Us a Message</h3>
          {conSent?<div className="okmsg">✅ Message sent to our team! We will reply within 2 hours.</div>:<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div className="fg"><label className="fl">Your Name</label><input className="fi" value={conF.name} onChange={e=>setConF(f=>({...f,name:e.target.value}))} placeholder="Full name"/></div>
              <div className="fg"><label className="fl">Email</label><input className="fi" type="email" value={conF.email} onChange={e=>setConF(f=>({...f,email:e.target.value}))} placeholder="you@email.com"/></div>
            </div>
            <div className="fg"><label className="fl">Subject</label>
              <select className="fsel" value={conF.subject} onChange={e=>setConF(f=>({...f,subject:e.target.value}))}>
                <option value="">Select a topic</option>
                {["Technical Support","Billing & Payments","Course Content","Tutor Booking","Advertise with GEA","Institution Partnership","Press & Media","Other"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="fg"><label className="fl">Message</label><textarea className="fta" value={conF.msg} onChange={e=>setConF(f=>({...f,msg:e.target.value}))} placeholder="How can we help you?"/></div>
            <button className="subbtn" onClick={doContact}>Send Message ✉️</button>
          </>}
        </div>
      </div>
    </div></div>
  );

  const FAQPage = ()=>(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">Help Center</span><h2 className="stit">Frequently Asked Questions</h2><p className="ssub">Everything you need to know. Can't find your answer? <span style={{color:"#0057d9",cursor:"pointer",fontWeight:600}} onClick={()=>go("contact")}>Contact us →</span></p></div>
      <div className="faqlist">
        {FAQS.map((f,i)=>(
          <div key={i} className={`faqit${faqOp===i?" op":""}`}>
            <div className="faqq" onClick={()=>setFaqOp(faqOp===i?null:i)}><span>{f.q}</span><span className={`faqic${faqOp===i?" op":""}`}>+</span></div>
            {faqOp===i&&<div className="faqa">{f.a}</div>}
          </div>
        ))}
      </div>
      {showAds&&<AdBanner slot="9900112233" style={{marginTop:32}}/>}
    </div></div>
  );

  const DashPage = ()=>!user?(
    <div className="sec"><div className="con" style={{textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:64,marginBottom:22}}>🔒</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:"#1a2744",marginBottom:12}}>Sign In to Access Your Dashboard</h2>
      <p style={{color:"#6b84a0",marginBottom:26}}>Track progress, manage courses, and access your free eBooks.</p>
      <div style={{display:"flex",gap:12,justifyContent:"center"}}><button className="bpri" onClick={()=>setSignin(true)}>Sign In</button><button className="bout" onClick={()=>setSignup(true)}>Create Free Account</button></div>
    </div></div>
  ):(
    <div className="sec"><div className="con">
      <div className="shd"><span className="ey">My Account</span><h2 className="stit">Welcome back, {user.name}! 👋</h2></div>
      <div className="dashg">
        <div className="dashsd">
          {[{ic:"📊",l:"Overview"},{ic:"🎓",l:"My Courses"},{ic:"📄",l:"My Papers"},{ic:"📚",l:"My Library"},{ic:"📅",l:"Sessions"},{ic:"🏆",l:"Certificates"},{ic:"👨‍👩‍👧",l:"Parent View"},{ic:"⚙️",l:"Settings"}].map((x,i)=>(
            <div key={i} className={`dashnv${dashTab===x.l?" on":""}`} onClick={()=>setDashTab(x.l)}>{x.ic} {x.l}</div>
          ))}
          <div style={{marginTop:22,padding:16,background:"#e8f1ff",borderRadius:12}}>
            <div style={{fontSize:12,color:"#6b84a0",marginBottom:6,fontWeight:600}}>CURRENT PLAN</div>
            <div style={{fontSize:15,fontWeight:800,color:"#0057d9",textTransform:"capitalize"}}>{user.plan}</div>
            <button className="bpri bsm" style={{marginTop:10,width:"100%"}} onClick={()=>{setSelPlan(PLANS[1]);setPayOpen(true);}}>Upgrade Plan →</button>
          </div>
        </div>
        <div className="dashmain">
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,marginBottom:24}}>Your Learning Overview</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:16,marginBottom:28}}>
            {[{n:3,l:"Courses Enrolled",ic:"🎓"},{n:user.books,l:"Free eBooks Left",ic:"📚"},{n:user.papers,l:"Papers Used",ic:"📄"},{n:0,l:"Sessions Booked",ic:"📅"}].map((s,i)=>(
              <div key={i} style={{background:"#f0f7ff",borderRadius:14,padding:16,textAlign:"center"}}>
                <div style={{fontSize:26,marginBottom:6}}>{s.ic}</div>
                <div style={{fontSize:24,fontWeight:900,color:"#0057d9"}}>{s.n}</div>
                <div style={{fontSize:11.5,color:"#6b84a0"}}>{s.l}</div>
              </div>
            ))}
          </div>
          <h4 style={{fontWeight:700,marginBottom:14,color:"#1a2744"}}>Course Progress</h4>
          {[{t:"Cambridge IGCSE Mathematics",p:65},{t:"A-Level Physics",p:30},{t:"Computer Science & AI",p:10}].map((c,i)=>(
            <div key={i} style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:13.5,fontWeight:600,color:"#3a5070"}}><span>{c.t}</span><span style={{color:"#0057d9"}}>{c.p}%</span></div>
              <div className="progw"><div className="progb" style={{width:`${c.p}%`}}/></div>
            </div>
          ))}
          {showAds&&<AdBanner slot="1011121314" style={{marginTop:20}}/>}
        </div>
      </div>
    </div></div>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────
  return(
    <>
      <style>{CSS}</style>
      <div className="app">
        {notif&&<div className="notif">✅ {notif}</div>}
        {signin&&<SigninModal/>}
        {signup&&<SignupModal/>}
        {payOpen&&selPlan&&<PayModal/>}
        {booking&&<BookModal/>}

        {annVis&&(
          <div className="ann">
            <span>🌍 Cambridge A-Level 2024 papers live!</span>
            <span className="ann-a" onClick={()=>go("papers")}>Download free →</span>
            <span> | Sign up → 10 free eBooks</span>
            <span className="ann-a" onClick={()=>setSignup(true)}>Join now →</span>
            <button className="ann-x" onClick={()=>setAnnVis(false)}>✕</button>
          </div>
        )}

        <nav className="nav">
          <div className="nav-in">
            <div className="nav-logo" onClick={()=>go("home")}>
              <div className="nav-logo-ic">🎓</div>
              <div><div className="nav-logo-tx">Global Elite Academy</div><div className="nav-logo-sb">2026–2030 Edition</div></div>
            </div>
            <div className="nav-links">
              {MAIN_NAV.map(p=>(
                <button key={p} className={`nl${page===p?" on":""}`} onClick={()=>go(p)}>
                  {NAV_ICO[p]} {p.charAt(0).toUpperCase()+p.slice(1)}
                </button>
              ))}
              <button className="nl" onClick={()=>go("faq")}>❓ FAQ</button>
            </div>
            <div className="nav-r">
              <select className="lsel" value={lang} onChange={e=>setLang(e.target.value)}>
                {LANGS.map(l=><option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
              </select>
              {user?(
                <div className="upill" onClick={()=>go("dashboard")}>👤 {user.name} · {user.plan}</div>
              ):(<>
                <button className="nb-out" onClick={()=>setSignin(true)}>Sign In</button>
                <button className="nb-pri" onClick={()=>setSignup(true)}>Get Started Free</button>
              </>)}
              <button className="hbg" onClick={()=>setMenu(m=>!m)}>☰</button>
            </div>
          </div>
          <div className={`mmenu${menuOpen?" open":""}`}>
            {[...MAIN_NAV,"faq","dashboard"].map(p=>(
              <div key={p} className={`mml${page===p?" on":""}`} onClick={()=>go(p)}>{NAV_ICO[p]} {p.charAt(0).toUpperCase()+p.slice(1)}</div>
            ))}
            <div style={{borderTop:"1px solid #e3f0ff",paddingTop:12,marginTop:8}}>
              {!user?<>
                <button style={{width:"100%",padding:"11px",marginBottom:8,background:"#e8f1ff",border:"none",borderRadius:8,color:"#0057d9",fontWeight:700,cursor:"pointer",fontSize:14}} onClick={()=>{setMenu(false);setSignin(true);}}>🔑 Sign In</button>
                <button style={{width:"100%",padding:"11px",background:"linear-gradient(135deg,#0057d9,#4ea8ff)",border:"none",borderRadius:8,color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14}} onClick={()=>{setMenu(false);setSignup(true);}}>🎓 Get Started Free</button>
              </>:<div style={{textAlign:"center",padding:8,background:"#e8f1ff",borderRadius:8,color:"#0057d9",fontWeight:700}}>👤 {user.name} · {user.plan}</div>}
            </div>
          </div>
        </nav>

        {page==="home"      &&<HomePage/>}
        {page==="courses"   &&<CoursesPage/>}
        {page==="papers"    &&<PapersPage/>}
        {page==="tutors"    &&<TutorsPage/>}
        {page==="library"   &&<LibraryPage/>}
        {page==="blog"      &&<BlogPage/>}
        {page==="pricing"   &&<PricingPage/>}
        {page==="about"     &&<AboutPage/>}
        {page==="contact"   &&<ContactPage/>}
        {page==="faq"       &&<FAQPage/>}
        {page==="dashboard" &&<DashPage/>}

        <footer className="ft">
          <div className="ftg">
            <div>
              <div className="ftbr">🎓 Global Elite Academy</div>
              <p className="fttg">World-class education for every student. Primary to university. Free to start. 6 languages. Built for 2026–2030 and beyond.</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
                {LANGS.map(l=><span key={l.code} style={{cursor:"pointer",fontSize:20}} onClick={()=>setLang(l.code)} title={l.label}>{l.flag}</span>)}
              </div>
              <div className="ftbgs">
                <span className="ftbg">🔒 SSL Secured</span>
                <span className="ftbg">✅ GDPR Compliant</span>
                <span className="ftbg">🏆 ISO Certified</span>
                <span className="ftbg">📧 {OWNER_EMAIL}</span>
              </div>
            </div>
            <div>
              <div className="fthd">Learn</div>
              {["courses","papers","library","blog"].map(p=><span key={p} className="ftlk" onClick={()=>go(p)}>{NAV_ICO[p]} {p.charAt(0).toUpperCase()+p.slice(1)}</span>)}
            </div>
            <div>
              <div className="fthd">Platform</div>
              {["tutors","pricing","dashboard","faq"].map(p=><span key={p} className="ftlk" onClick={()=>go(p)}>{NAV_ICO[p]} {p.charAt(0).toUpperCase()+p.slice(1)}</span>)}
            </div>
            <div>
              <div className="fthd">Company</div>
              {["about","contact"].map(p=><span key={p} className="ftlk" onClick={()=>go(p)}>{NAV_ICO[p]} {p.charAt(0).toUpperCase()+p.slice(1)}</span>)}
              <span className="ftlk">🔒 Privacy Policy</span>
              <span className="ftlk">📋 Terms of Service</span>
              <span className="ftlk">🍪 Cookie Settings</span>
            </div>
            <div>
              <div className="fthd">Newsletter</div>
              <p style={{fontSize:13,color:"rgba(255,255,255,.5)",marginBottom:12,lineHeight:1.5}}>Weekly study tips, new papers and AI trends.</p>
              {newsSent?<div style={{color:"#4ea8ff",fontWeight:600,fontSize:13}}>✅ Subscribed!</div>:<>
                <input style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:13,marginBottom:8,outline:"none"}} placeholder="Your email" value={news} onChange={e=>setNews(e.target.value)}/>
                <button style={{width:"100%",padding:"9px",background:"#0057d9",color:"#fff",border:"none",borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:13}} onClick={()=>{if(news){setNewsSent(true);sendEmail("Newsletter Sub",`Email: ${news}`)}}}>Subscribe Free</button>
              </>}
            </div>
          </div>
          <div className="ftbot">
            <span className="ftcp">© 2026–2030 Global Elite Academy. All Rights Reserved.</span>
            <span className="ftcp">Making quality education accessible worldwide 🌍</span>
          </div>
        </footer>
      </div>
    </>
  );
}
EOF
echo "P4 done: $(wc -l < /home/claude/P4.jsx) lines"

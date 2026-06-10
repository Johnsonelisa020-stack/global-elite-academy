cat > /home/claude/App.jsx << 'EOF'
import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ADSENSE_ID = "ca-pub-8024543613282871";

const LANGS = [
  { code:"en", flag:"🇺🇸", label:"English" },
  { code:"gb", flag:"🇬🇧", label:"British" },
  { code:"fr", flag:"🇫🇷", label:"Français" },
  { code:"zh", flag:"🇨🇳", label:"中文" },
  { code:"de", flag:"🇩🇪", label:"Deutsch" },
  { code:"sw", flag:"🇹🇿", label:"Kiswahili" },
];

const PLANS = [
  { id:"free", name:"Free Explorer", price:0, period:"forever", color:"#0057d9", badge:"",
    features:["10 past papers/month","3 study note previews","AI Tutor (5 questions/day)","Community forum","1 free tutor session","Basic progress tracker"], cta:"Start Free", popular:false },
  { id:"basic", name:"Student Basic", price:5, period:"month", color:"#0057d9", badge:"POPULAR",
    features:["50 past papers/month","20 full study notes","Unlimited AI Tutor","2 live tutor sessions","Video lesson library","Completion certificate","Email support"], cta:"Start $5/mo", popular:true },
  { id:"scholar", name:"Scholar Plus", price:29, period:"month", color:"#7c3aed", badge:"BEST VALUE",
    features:["Unlimited past papers","All 1,200+ study notes","AI Tutor + essay grading","6 live tutor sessions","10 free eBooks/month","Offline downloads","Priority support","Progress analytics"], cta:"Start $29/mo", popular:false },
  { id:"elite", name:"Elite Premium", price:79, period:"month", color:"#dc2626", badge:"ALL ACCESS",
    features:["Everything in Scholar Plus","Unlimited tutor sessions","1-on-1 mentorship","University application help","ALL courses FREE","Parent dashboard","Dedicated manager","24/7 phone support"], cta:"Go Elite $79/mo", popular:false },
  { id:"institution", name:"Institution", price:299, period:"month", color:"#0f766e", badge:"SCHOOLS",
    features:["500 student accounts","All premium features","Custom branding","Admin analytics","API integration","Bulk certificates","Success manager","Custom content upload"], cta:"Contact Sales", popular:false },
];

const COURSES = [
  { id:1, title:"Cambridge IGCSE Mathematics", level:"Secondary", price:15, rating:4.9, students:12400, img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=220&fit=crop", cat:"Mathematics", lessons:48, dur:"6 months", instructor:"Prof. Sarah Okonkwo" },
  { id:2, title:"A-Level Physics Complete", level:"Pre-University", price:20, rating:4.8, students:8900, img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=220&fit=crop", cat:"Physics", lessons:62, dur:"8 months", instructor:"Dr. James Chen" },
  { id:3, title:"Biology GCSE Masterclass", level:"Secondary", price:12, rating:4.9, students:15600, img:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=400&h=220&fit=crop", cat:"Biology", lessons:35, dur:"4 months", instructor:"Ms. Amina Hassan" },
  { id:4, title:"Organic Chemistry Deep Dive", level:"A-Level", price:18, rating:4.7, students:7200, img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=220&fit=crop", cat:"Chemistry", lessons:40, dur:"5 months", instructor:"Dr. Marie Dubois" },
  { id:5, title:"University Discrete Mathematics", level:"University", price:35, rating:4.9, students:4300, img:"https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=220&fit=crop", cat:"Mathematics", lessons:55, dur:"6 months", instructor:"Prof. Klaus Weber" },
  { id:6, title:"Computer Science & AI Fundamentals", level:"University", price:45, rating:5.0, students:18900, img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop", cat:"Technology", lessons:80, dur:"10 months", instructor:"Mr. Rajesh Sharma" },
  { id:7, title:"English Language & Literature", level:"All Levels", price:10, rating:4.8, students:22100, img:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=220&fit=crop", cat:"English", lessons:30, dur:"3 months", instructor:"Dr. Marie Dubois" },
  { id:8, title:"Economics: Micro & Macro", level:"A-Level", price:22, rating:4.7, students:9800, img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=220&fit=crop", cat:"Economics", lessons:44, dur:"5 months", instructor:"Prof. Klaus Weber" },
  { id:9, title:"Primary Mathematics Grades 1–6", level:"Primary", price:8, rating:4.9, students:31000, img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=220&fit=crop", cat:"Mathematics", lessons:90, dur:"12 months", instructor:"Ms. Amina Hassan" },
  { id:10, title:"Geography & Environmental Science", level:"GCSE", price:14, rating:4.6, students:6700, img:"https://images.unsplash.com/photo-1446776709462-d6b525b9c0fd?w=400&h=220&fit=crop", cat:"Geography", lessons:28, dur:"3 months", instructor:"Prof. Sarah Okonkwo" },
  { id:11, title:"History: World Wars & Modern Era", level:"GCSE", price:12, rating:4.8, students:11200, img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=220&fit=crop", cat:"History", lessons:32, dur:"4 months", instructor:"Prof. Klaus Weber" },
  { id:12, title:"Database Systems & SQL Mastery", level:"University", price:40, rating:4.9, students:5600, img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop", cat:"Technology", lessons:50, dur:"5 months", instructor:"Mr. Rajesh Sharma" },
  { id:13, title:"Primary Science (Grades 1–6)", level:"Primary", price:8, rating:4.8, students:19000, img:"https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=220&fit=crop", cat:"Science", lessons:60, dur:"8 months", instructor:"Ms. Amina Hassan" },
  { id:14, title:"Business Studies GCSE/O-Level", level:"Secondary", price:14, rating:4.7, students:8300, img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=220&fit=crop", cat:"Business", lessons:36, dur:"4 months", instructor:"Prof. Klaus Weber" },
  { id:15, title:"French Language A1–B2", level:"All Levels", price:16, rating:4.9, students:13400, img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=220&fit=crop", cat:"Languages", lessons:72, dur:"9 months", instructor:"Dr. Marie Dubois" },
  { id:16, title:"Advanced Calculus & Linear Algebra", level:"University", price:38, rating:4.8, students:3900, img:"https://images.unsplash.com/photo-1635241161466-541f065683ba?w=400&h=220&fit=crop", cat:"Mathematics", lessons:58, dur:"7 months", instructor:"Prof. Sarah Okonkwo" },
];

const TUTORS = [
  { name:"Prof. Sarah Okonkwo", subject:"Mathematics & Statistics", country:"Nigeria/UK", rating:4.9, reviews:1240, sessions:3800, pb:10, pa:20, pp:30, img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", bio:"PhD Oxford. 18 years teaching university-level mathematics. Specialist in pure maths and statistics.", quals:"PhD Mathematics, Oxford", avail:true },
  { name:"Dr. James Chen", subject:"Physics & Engineering", country:"China/USA", rating:4.8, reviews:980, sessions:2700, pb:10, pa:20, pp:25, img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop", bio:"MIT graduate with 15 years in research and teaching. Makes complex physics simple.", quals:"PhD Physics, MIT", avail:true },
  { name:"Ms. Amina Hassan", subject:"Biology & Chemistry", country:"Kenya/Canada", rating:4.9, reviews:1560, sessions:4200, pb:10, pa:15, pp:25, img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop", bio:"Medical doctor turned educator. Passionate about life sciences for all students globally.", quals:"MBBS, MSc Education, Toronto", avail:true },
  { name:"Prof. Klaus Weber", subject:"Economics & Business", country:"Germany", rating:4.7, reviews:720, sessions:1900, pb:10, pa:20, pp:30, img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop", bio:"Former World Bank economist. Bridges theory and real-world practice perfectly.", quals:"PhD Economics, Humboldt University", avail:false },
  { name:"Dr. Marie Dubois", subject:"French & Literature", country:"France/Senegal", rating:4.8, reviews:890, sessions:2300, pb:10, pa:15, pp:20, img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop", bio:"Native French speaker. Expert in Francophone literature and language acquisition.", quals:"PhD Linguistics, Sorbonne", avail:true },
  { name:"Mr. Rajesh Sharma", subject:"Computer Science & AI", country:"India/USA", rating:4.9, reviews:2100, sessions:5800, pb:15, pa:25, pp:30, img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", bio:"Former Google engineer. Expert in programming, AI, machine learning and data science.", quals:"MSc Computer Science, Stanford", avail:true },
];

const PAPERS = [
  { subject:"Mathematics", level:"GCSE/Form 4", org:"Cambridge IGCSE", year:"2024", img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=140&fit=crop", free:true },
  { subject:"Physics", level:"A-Level/Form 6", org:"Cambridge", year:"2024", img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=140&fit=crop", free:true },
  { subject:"Chemistry", level:"A-Level", org:"AQA/Edexcel", year:"2024", img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=140&fit=crop", free:true },
  { subject:"Biology", level:"GCSE", org:"OCR/NECTA", year:"2024", img:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=300&h=140&fit=crop", free:true },
  { subject:"English Language", level:"All Levels", org:"NECTA/Cambridge", year:"2023", img:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=140&fit=crop", free:true },
  { subject:"History", level:"GCSE/O-Level", org:"Cambridge", year:"2023", img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=140&fit=crop", free:true },
  { subject:"Geography", level:"GCSE", org:"AQA", year:"2023", img:"https://images.unsplash.com/photo-1446776709462-d6b525b9c0fd?w=300&h=140&fit=crop", free:true },
  { subject:"Advanced Mathematics", level:"University", org:"IAA/Cambridge", year:"2024", img:"https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=300&h=140&fit=crop", free:false },
  { subject:"Computer Science", level:"University", org:"IAA", year:"2024", img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=140&fit=crop", free:false },
  { subject:"Economics", level:"A-Level", org:"IB/NECTA", year:"2023", img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=140&fit=crop", free:false },
];

const BOOKS = [
  { title:"IGCSE Mathematics Complete Guide", author:"Prof. Sarah Okonkwo", pages:320, img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=160&h=210&fit=crop", level:"GCSE", free:true },
  { title:"A-Level Physics Revision Bible", author:"Dr. James Chen", pages:480, img:"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=160&h=210&fit=crop", level:"A-Level", free:true },
  { title:"Biology Mastery Handbook", author:"Ms. Amina Hassan", pages:290, img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=160&h=210&fit=crop", level:"GCSE", free:true },
  { title:"University Economics Textbook", author:"Prof. Klaus Weber", pages:560, img:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=160&h=210&fit=crop", level:"University", free:false },
  { title:"Coding in Python: Start to Expert", author:"Mr. Rajesh Sharma", pages:410, img:"https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=160&h=210&fit=crop", level:"University", free:false },
  { title:"French Language Complete Course", author:"Dr. Marie Dubois", pages:240, img:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=160&h=210&fit=crop", level:"All Levels", free:true },
  { title:"Primary Maths Fun Workbook", author:"Ms. Amina Hassan", pages:180, img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=160&h=210&fit=crop", level:"Primary", free:true },
  { title:"Chemistry Organic Reactions Guide", author:"Dr. Marie Dubois", pages:350, img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=160&h=210&fit=crop", level:"A-Level", free:false },
  { title:"World History: 1900–2025", author:"Prof. Klaus Weber", pages:520, img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=160&h=210&fit=crop", level:"GCSE", free:true },
  { title:"Computer Networks & Security", author:"Mr. Rajesh Sharma", pages:390, img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=160&h=210&fit=crop", level:"University", free:false },
];

const BLOG = [
  { title:"How AI is Transforming Education 2026–2030", date:"Jun 2026", readTime:"5 min", img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop", cat:"AI & Tech", excerpt:"AI tutors, personalized learning paths, and real-time feedback are reshaping how 100M+ students learn globally." },
  { title:"Top Study Techniques Backed by Neuroscience", date:"May 2026", readTime:"7 min", img:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=200&fit=crop", cat:"Study Tips", excerpt:"Spaced repetition, interleaving, active recall — the science-backed methods top students swear by." },
  { title:"Cambridge IGCSE vs IB: Which Suits You?", date:"May 2026", readTime:"8 min", img:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop", cat:"Curriculum", excerpt:"A detailed breakdown of the world's two most recognized qualifications — helping you choose wisely." },
  { title:"How to Crack University Entrance Exams", date:"Apr 2026", readTime:"6 min", img:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop", cat:"University", excerpt:"Expert strategies from our tutors on tackling SAT, A-Levels, NECTA, and other university exams." },
  { title:"The Future of Remote Learning: 2026–2030", date:"Apr 2026", readTime:"9 min", img:"https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=200&fit=crop", cat:"Future of Ed", excerpt:"AR classrooms, AI companions, global credentials — here is what education looks like next." },
  { title:"10 Daily Habits of Top-Performing Students", date:"Mar 2026", readTime:"4 min", img:"https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=200&fit=crop", cat:"Study Tips", excerpt:"We analyzed 1,000 high achievers. These habits consistently separate A students from the rest." },
];

const TESTIMONIALS = [
  { name:"Priya Patel", country:"India 🇮🇳", role:"Medical Student", text:"The AI Tutor helped me pass A-Level Biology with A*. 24/7 access meant I could study at midnight before exams.", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&faces=true", rating:5 },
  { name:"Lucas Fernandez", country:"Brazil 🇧🇷", role:"GCSE Student", text:"Free 10 past papers every month for 3 months. My maths jumped from C to A. Now on Scholar Plus!", img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop", rating:5 },
  { name:"Aisha Mwangi", country:"Kenya 🇰🇪", role:"University Student", text:"First-generation university student. GEA gave me resources I could never afford. Kiswahili support made it accessible.", img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop", rating:5 },
  { name:"Hannah Schmidt", country:"Germany 🇩🇪", role:"Parent", text:"My daughter uses GEA every day. The parent dashboard shows real-time progress. Worth every euro.", img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop", rating:5 },
  { name:"Yaw Asante", country:"Ghana 🇬🇭", role:"A-Level Student", text:"Got a live session with Dr. Chen at $20. He explained quantum physics better in 45 mins than a term at school.", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", rating:5 },
];

const FAQS = [
  { q:"Is the free plan really free forever?", a:"Yes! Free Explorer gives you 10 past papers/month, AI Tutor (5 questions/day), community forum — no credit card, no expiry." },
  { q:"How does the 10 free eBooks work?", a:"Sign up for a free account and unlock 10 premium eBooks every month, auto-refreshed on the 1st. Premium members get unlimited access." },
  { q:"What payment methods do you accept?", a:"Visa, Mastercard, PayPal, Apple Pay, Google Pay, Bank Transfer (SWIFT/SEPA), and M-Pesa for mobile money users." },
  { q:"Can I cancel my subscription anytime?", a:"Yes — cancel with one click from your dashboard. No fees. Access continues until end of your billing period." },
  { q:"How do I book a tutor session?", a:"Go to Tutors, pick a tutor, select a time slot, pay per session ($10–$30 depending on level). You get a video call link instantly." },
  { q:"Do past papers cost money?", a:"First 10 per month are completely free. After that you need a paid plan. Premium members get unlimited access to all 500+ papers." },
  { q:"Is there a student discount?", a:"Yes! Students with a valid .edu email get 30% off any plan. Schools get custom pricing from $299/month for up to 500 students." },
  { q:"Will ads appear on the site?", a:"Ads may appear on free accounts. Paid subscribers get an ad-free experience. All ads are education-relevant and Google AdSense powered." },
];

const MOTION_IMGS = [
  { src:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&h=460&fit=crop", cap:"Children learning together 🌟" },
  { src:"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=700&h=460&fit=crop", cap:"Students exploring science 🔬" },
  { src:"https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=700&h=460&fit=crop", cap:"Parent and child reading together 📖" },
  { src:"https://images.unsplash.com/photo-1588072432836-e10032774350?w=700&h=460&fit=crop", cap:"AI-powered classroom 2026 🤖" },
  { src:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&h=460&fit=crop", cap:"University collaboration 🎓" },
  { src:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=460&fit=crop", cap:"Creative student innovation 💡" },
];

const MAIN_NAV = ["home","courses","papers","tutors","library","blog","pricing","about","contact"];
const NAV_ICONS = { home:"🏠", courses:"🎓", papers:"📄", tutors:"👨‍🏫", library:"📚", blog:"📰", pricing:"💳", about:"ℹ️", contact:"📞", faq:"❓", dashboard:"📊" };

EOF
echo "Part 1 done: $(wc -l < /home/claude/App.jsx) lines"

import { useState } from "react";

const T = {
  en: {
    siteName: "Global Elite Academy",
    tagline: "World-Class Education for Every Student",
    heroSub: "Past Papers • Study Notes • AI Tutor • Expert Teachers",
    nav: { home:"Home", papers:"Past Papers", notes:"Study Notes", ai:"AI Tutor", teachers:"Teachers", about:"About", contact:"Contact" },
    stats: { papers:"Past Papers", notes:"Study Notes", students:"Students Worldwide", teachers:"Expert Teachers" },
    sections: { services:"Our Core Services", recentPapers:"Recently Added Papers", askAI:"Ask Our AI Tutor", allNotes:"All Study Materials", allPapers:"Browse All Past Papers", meetTeachers:"Meet Our Expert Teachers", about:"About Global Elite Academy", contact:"Contact Us" },
    services: [
      { title:"Past Exam Papers", desc:"Access thousands of past papers from NECTA, Cambridge, IB, and universities worldwide. Prepare smarter." },
      { title:"Study Notes", desc:"Expert-reviewed notes for all subjects and all levels from primary school to university." },
      { title:"AI Tutor", desc:"Ask any question, solve math problems, get essay help, generate quizzes, and plan your studies with AI." },
      { title:"Expert Teachers", desc:"Learn directly from qualified professors and specialist teachers from around the world." }
    ],
    aiPlaceholder: "Ask any question... e.g. Explain photosynthesis, Solve 2x+5=13, What caused World War I?",
    aiBtn: "Ask AI Tutor", aiThinking: "AI is thinking...", aiLabel: "AI Tutor Answer",
    sendMsg: "Send Message", yourName: "Your Name", yourEmail: "Your Email", yourMsg: "Your Message",
    download: "Download PDF", viewNotes: "View Notes", allLevels: "All Levels",
    searchPlaceholder: "Search subjects, topics, levels...", langLabel: "Language",
    subjects: "Subjects", level: "Level", year: "Year", org: "Organisation",
    announcement: "🌍 New: Cambridge A-Level 2024 papers now available! Access free for all students.",
    footerRights: "© 2025 Global Elite Academy. All Rights Reserved.",
    footerMission: "Making quality education accessible to every student worldwide.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "Global Elite Academy was founded on the belief that every student deserves access to world-class education. We bring together expert teachers, comprehensive past papers, and the power of AI.",
    mission: "Our Mission", missionText: "To democratize education globally — providing free, high-quality resources to 100 million students by 2030.",
    team: "Our Team", teamText: "A global team of educators, technologists, and researchers united by one goal: better outcomes for every learner.",
    reach: "Our Reach", reachText: "We serve students in 150+ countries, with resources in 6 languages and 24/7 AI support.",
  },
  fr: {
    siteName: "Académie Mondiale d'Élite",
    tagline: "Une Éducation de Classe Mondiale pour Chaque Élève",
    heroSub: "Examens Passés • Notes d'Études • Tuteur IA • Professeurs Experts",
    nav: { home:"Accueil", papers:"Examens Passés", notes:"Notes", ai:"Tuteur IA", teachers:"Professeurs", about:"À Propos", contact:"Contact" },
    stats: { papers:"Examens Passés", notes:"Notes d'Études", students:"Étudiants Mondiaux", teachers:"Professeurs Experts" },
    sections: { services:"Nos Services Principaux", recentPapers:"Examens Récemment Ajoutés", askAI:"Interrogez Notre Tuteur IA", allNotes:"Tous les Matériaux", allPapers:"Tous les Examens", meetTeachers:"Nos Professeurs", about:"À Propos", contact:"Contactez-Nous" },
    services: [
      { title:"Examens Passés", desc:"Accédez à des milliers d'examens de NECTA, Cambridge, IB et universités mondiales." },
      { title:"Notes d'Études", desc:"Notes vérifiées par des experts pour toutes les matières et tous les niveaux." },
      { title:"Tuteur IA", desc:"Posez n'importe quelle question, résolvez des maths, obtenez de l'aide avec l'IA." },
      { title:"Professeurs Experts", desc:"Apprenez auprès de professeurs qualifiés du monde entier." }
    ],
    aiPlaceholder: "Posez une question... ex. Expliquez la photosynthèse, Résolvez 2x+5=13",
    aiBtn: "Interroger l'IA", aiThinking: "L'IA réfléchit...", aiLabel: "Réponse du Tuteur IA",
    sendMsg: "Envoyer", yourName: "Votre Nom", yourEmail: "Votre Email", yourMsg: "Votre Message",
    download: "Télécharger PDF", viewNotes: "Voir les Notes", allLevels: "Tous Niveaux",
    searchPlaceholder: "Rechercher matières, sujets...", langLabel: "Langue",
    subjects: "Matières", level: "Niveau", year: "Année", org: "Organisation",
    announcement: "🌍 Nouveau: Examens Cambridge A-Level 2024 disponibles! Accès gratuit.",
    footerRights: "© 2025 Académie Mondiale d'Élite. Tous droits réservés.",
    footerMission: "Rendre l'éducation accessible à chaque étudiant dans le monde.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "L'Académie Mondiale d'Élite a été fondée sur la conviction que chaque étudiant mérite un accès à une éducation de classe mondiale.",
    mission: "Notre Mission", missionText: "Démocratiser l'éducation mondialement pour 100 millions d'étudiants d'ici 2030.",
    team: "Notre Équipe", teamText: "Une équipe mondiale unie par un objectif: de meilleurs résultats pour chaque apprenant.",
    reach: "Notre Portée", reachText: "Nous servons des étudiants dans 150+ pays avec un support IA 24/7.",
  },
  zh: {
    siteName: "全球精英学院",
    tagline: "为每一位学生提供世界级教育",
    heroSub: "历年试卷 • 学习笔记 • AI辅导 • 专家教师",
    nav: { home:"首页", papers:"历年试卷", notes:"学习笔记", ai:"AI辅导", teachers:"教师", about:"关于我们", contact:"联系我们" },
    stats: { papers:"历年试卷", notes:"学习笔记", students:"全球学生", teachers:"专家教师" },
    sections: { services:"核心服务", recentPapers:"最新试卷", askAI:"询问AI辅导", allNotes:"所有材料", allPapers:"浏览试卷", meetTeachers:"专家教师", about:"关于我们", contact:"联系我们" },
    services: [
      { title:"历年试卷", desc:"获取来自NECTA、剑桥、IB和全球大学的数千份历年试卷。" },
      { title:"学习笔记", desc:"专家审核的所有科目笔记——从小学到大学。" },
      { title:"AI辅导", desc:"提问任何问题，解决数学问题，获得作文帮助。" },
      { title:"专家教师", desc:"直接向来自世界各地的合格教授学习。" }
    ],
    aiPlaceholder: "提任何问题... 例如：解释光合作用，解2x+5=13",
    aiBtn: "询问AI", aiThinking: "AI正在思考...", aiLabel: "AI辅导答案",
    sendMsg: "发送消息", yourName: "您的姓名", yourEmail: "您的邮箱", yourMsg: "您的消息",
    download: "下载PDF", viewNotes: "查看笔记", allLevels: "所有级别",
    searchPlaceholder: "搜索科目、主题...", langLabel: "语言",
    subjects: "科目", level: "级别", year: "年份", org: "机构",
    announcement: "🌍 新增：2024年剑桥A-Level试卷现已上线！所有学生免费获取。",
    footerRights: "© 2025 全球精英学院。版权所有。",
    footerMission: "让每一位全球学生都能获得优质教育。",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "全球精英学院的创立基于这样一个信念：每一位学生都应该获得世界级教育。",
    mission: "我们的使命", missionText: "到2030年为1亿名学生提供免费、高质量的资源。",
    team: "我们的团队", teamText: "全球团队目标一致：让每位学习者取得更好的成绩。",
    reach: "我们的覆盖范围", reachText: "我们为150多个国家的学生提供服务。",
  },
  de: {
    siteName: "Global Elite Akademie",
    tagline: "Weltklasse-Bildung für jeden Studenten",
    heroSub: "Vergangene Prüfungen • Lernnotizen • KI-Tutor • Expertenlehrer",
    nav: { home:"Startseite", papers:"Prüfungen", notes:"Notizen", ai:"KI-Tutor", teachers:"Lehrer", about:"Über Uns", contact:"Kontakt" },
    stats: { papers:"Vergangene Prüfungen", notes:"Lernnotizen", students:"Weltweite Studenten", teachers:"Expertenlehrer" },
    sections: { services:"Unsere Dienste", recentPapers:"Neue Prüfungen", askAI:"KI-Tutor Fragen", allNotes:"Alle Materialien", allPapers:"Alle Prüfungen", meetTeachers:"Unsere Lehrer", about:"Über Uns", contact:"Kontakt" },
    services: [
      { title:"Vergangene Prüfungen", desc:"Tausende von Prüfungen von NECTA, Cambridge, IB und Universitäten weltweit." },
      { title:"Lernnotizen", desc:"Expertengeprüfte Notizen für alle Fächer und Niveaus." },
      { title:"KI-Tutor", desc:"Stellen Sie Fragen, lösen Sie Matheprobleme mit KI-Hilfe." },
      { title:"Expertenlehrer", desc:"Lernen Sie von qualifizierten Professoren aus der ganzen Welt." }
    ],
    aiPlaceholder: "Stellen Sie eine Frage... z.B. Photosynthese erklären, 2x+5=13 lösen",
    aiBtn: "KI Fragen", aiThinking: "KI denkt nach...", aiLabel: "KI-Tutor Antwort",
    sendMsg: "Senden", yourName: "Ihr Name", yourEmail: "Ihre E-Mail", yourMsg: "Ihre Nachricht",
    download: "PDF Herunterladen", viewNotes: "Notizen Ansehen", allLevels: "Alle Niveaus",
    searchPlaceholder: "Fächer, Themen suchen...", langLabel: "Sprache",
    subjects: "Fächer", level: "Niveau", year: "Jahr", org: "Organisation",
    announcement: "🌍 Neu: Cambridge A-Level 2024 Prüfungen verfügbar! Kostenloser Zugang.",
    footerRights: "© 2025 Global Elite Akademie. Alle Rechte vorbehalten.",
    footerMission: "Hochwertige Bildung für jeden Studenten weltweit.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "Die Global Elite Akademie wurde gegründet damit jeder Schüler Zugang zu Weltklasse-Bildung bekommt.",
    mission: "Unsere Mission", missionText: "Bildung für 100 Millionen Schüler bis 2030 kostenlos bereitzustellen.",
    team: "Unser Team", teamText: "Ein globales Team vereint durch ein Ziel: bessere Ergebnisse für jeden.",
    reach: "Unsere Reichweite", reachText: "Studenten in 150+ Ländern mit 24/7 KI-Support.",
  },
  sw: {
    siteName: "Chuo cha Wasomi Duniani",
    tagline: "Elimu Bora Duniani kwa Kila Mwanafunzi",
    heroSub: "Mitihani Iliyopita • Notisi za Masomo • Msaada wa AI • Walimu Wataalam",
    nav: { home:"Nyumbani", papers:"Mitihani Iliyopita", notes:"Notisi", ai:"Msaada wa AI", teachers:"Walimu", about:"Kuhusu Sisi", contact:"Wasiliana" },
    stats: { papers:"Mitihani Iliyopita", notes:"Notisi za Masomo", students:"Wanafunzi Duniani", teachers:"Walimu Wataalam" },
    sections: { services:"Huduma Zetu Kuu", recentPapers:"Mitihani Mpya", askAI:"Uliza AI", allNotes:"Vifaa Vyote", allPapers:"Mitihani Yote", meetTeachers:"Walimu Wetu", about:"Kuhusu Sisi", contact:"Wasiliana Nasi" },
    services: [
      { title:"Mitihani Iliyopita", desc:"Pata maelfu ya mitihani kutoka NECTA, Cambridge, IB, na vyuo vikuu duniani." },
      { title:"Notisi za Masomo", desc:"Notisi zilizokaguliwa na wataalamu kwa masomo yote na viwango vyote." },
      { title:"Msaada wa AI", desc:"Uliza swali lolote, suluhisha hesabu, pata msaada wa insha kwa AI." },
      { title:"Walimu Wataalam", desc:"Jifunze kutoka kwa maprofesa na walimu wataalam duniani kote." }
    ],
    aiPlaceholder: "Uliza swali lolote... mfano: Eleza osmosis, Suluhisha 2x+5=13",
    aiBtn: "Uliza AI", aiThinking: "AI inashughulikia...", aiLabel: "Jibu la AI",
    sendMsg: "Tuma Ujumbe", yourName: "Jina Lako", yourEmail: "Barua Pepe", yourMsg: "Ujumbe Wako",
    download: "Pakua PDF", viewNotes: "Tazama Notisi", allLevels: "Viwango Vyote",
    searchPlaceholder: "Tafuta masomo, mada...", langLabel: "Lugha",
    subjects: "Masomo", level: "Kiwango", year: "Mwaka", org: "Shirika",
    announcement: "🌍 Mpya: Mitihani ya Cambridge A-Level 2024 inapatikana! Bure kwa wanafunzi wote.",
    footerRights: "© 2025 Chuo cha Wasomi Duniani. Haki Zote Zimehifadhiwa.",
    footerMission: "Kuleta elimu bora kwa kila mwanafunzi duniani kote.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "Chuo chetu kilianzishwa kwa imani kwamba kila mwanafunzi anastahili elimu bora.",
    mission: "Dhamira Yetu", missionText: "Kuleta elimu bure na bora kwa wanafunzi milioni 100 ifikapo 2030.",
    team: "Timu Yetu", teamText: "Timu ya kimataifa inayoshirikiana kwa matokeo bora kwa kila mwanafunzi.",
    reach: "Tunafikia Wapi", reachText: "Tunahudumia wanafunzi katika nchi 150+ na msaada wa AI masaa 24.",
  },
  gb: {
    siteName: "Global Elite Academy",
    tagline: "World-Class Education for Every Student",
    heroSub: "Past Papers • Revision Notes • AI Tutor • Expert Tutors",
    nav: { home:"Home", papers:"Past Papers", notes:"Revision Notes", ai:"AI Tutor", teachers:"Tutors", about:"About", contact:"Contact" },
    stats: { papers:"Past Papers", notes:"Revision Notes", students:"Students Worldwide", teachers:"Expert Tutors" },
    sections: { services:"Our Core Services", recentPapers:"Recently Added Papers", askAI:"Ask Our AI Tutor", allNotes:"All Revision Materials", allPapers:"Browse All Past Papers", meetTeachers:"Meet Our Expert Tutors", about:"About Us", contact:"Contact Us" },
    services: [
      { title:"Past Exam Papers", desc:"Access thousands of past papers from OCR, AQA, Edexcel, Cambridge and universities worldwide." },
      { title:"Revision Notes", desc:"Expert-reviewed notes for all subjects and all levels from primary to university." },
      { title:"AI Tutor", desc:"Ask any question, solve maths problems, get essay guidance and plan your revision." },
      { title:"Expert Tutors", desc:"Learn directly from qualified professors and specialist tutors across the globe." }
    ],
    aiPlaceholder: "Ask anything... e.g. Explain photosynthesis, Solve 2x+5=13, What caused WWI?",
    aiBtn: "Ask AI Tutor", aiThinking: "AI is thinking...", aiLabel: "AI Tutor Answer",
    sendMsg: "Send Message", yourName: "Your Name", yourEmail: "Your Email", yourMsg: "Your Message",
    download: "Download PDF", viewNotes: "View Notes", allLevels: "All Levels",
    searchPlaceholder: "Search subjects, topics, levels...", langLabel: "Language",
    subjects: "Subjects", level: "Level", year: "Year", org: "Examining Body",
    announcement: "🌍 New: Cambridge A-Level 2024 papers now available! Free access for all students.",
    footerRights: "© 2025 Global Elite Academy. All Rights Reserved.",
    footerMission: "Making quality education accessible to every student worldwide.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "Global Elite Academy was founded on the belief that every student deserves access to world-class education.",
    mission: "Our Mission", missionText: "To democratise education globally for 100 million students by 2030.",
    team: "Our Team", teamText: "A global team united by one goal: better outcomes for every learner.",
    reach: "Our Reach", reachText: "We serve students in 150+ countries with 24/7 AI support.",
  }
};

const PAST_PAPERS = [
  { subject:"Mathematics", level:"GCSE / Form 4", org:"Cambridge IGCSE", year:"2024", img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=120&h=80&fit=crop" },
  { subject:"Physics", level:"A-Level / Form 6", org:"Cambridge", year:"2024", img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=120&h=80&fit=crop" },
  { subject:"Chemistry", level:"A-Level", org:"AQA / Edexcel", year:"2024", img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=120&h=80&fit=crop" },
  { subject:"Biology", level:"GCSE", org:"OCR / NECTA", year:"2024", img:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=120&h=80&fit=crop" },
  { subject:"English Language", level:"All Levels", org:"NECTA / Cambridge", year:"2023", img:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=120&h=80&fit=crop" },
  { subject:"Advanced Mathematics", level:"University / Form 6", org:"IAA / Cambridge", year:"2024", img:"https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=120&h=80&fit=crop" },
  { subject:"Computer Science", level:"University", org:"IAA", year:"2024", img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=120&h=80&fit=crop" },
  { subject:"Economics", level:"A-Level / Form 6", org:"IB / NECTA", year:"2023", img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&h=80&fit=crop" },
  { subject:"History", level:"GCSE / O-Level", org:"Cambridge", year:"2023", img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=120&h=80&fit=crop" },
  { subject:"Geography", level:"GCSE", org:"AQA", year:"2023", img:"https://images.unsplash.com/photo-1446776709462-d6b525b9c0fd?w=120&h=80&fit=crop" },
  { subject:"Discrete Mathematics", level:"University", org:"IAA", year:"2024", img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=120&h=80&fit=crop" },
  { subject:"Database Systems", level:"University", org:"IAA", year:"2024", img:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&h=80&fit=crop" },
];

const NOTES = [
  { title:"Algebra & Calculus", level:"Secondary / A-Level", icon:"📐", subject:"Mathematics", img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?w=200&h=130&fit=crop", desc:"Complete notes on functions, differentiation, integration and more." },
  { title:"Mechanics & Electricity", level:"A-Level", icon:"⚡", subject:"Physics", img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=130&fit=crop", desc:"Newton's laws, circuits, electromagnetism and quantum basics." },
  { title:"Cell Biology & Genetics", level:"GCSE / A-Level", icon:"🧬", subject:"Biology", img:"https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=200&h=130&fit=crop", desc:"DNA structure, mitosis, meiosis, inheritance and evolution." },
  { title:"Organic Chemistry", level:"A-Level", icon:"🧪", subject:"Chemistry", img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200&h=130&fit=crop", desc:"Hydrocarbons, functional groups, reactions and mechanisms." },
  { title:"Grammar & Comprehension", level:"All Levels", icon:"📝", subject:"English", img:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=200&h=130&fit=crop", desc:"Essay writing, grammar rules, reading comprehension techniques." },
  { title:"Data Structures & Algorithms", level:"University", icon:"💻", subject:"Computer Science", img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=130&fit=crop", desc:"Arrays, trees, graphs, sorting algorithms and complexity." },
  { title:"Micro & Macro Economics", level:"A-Level", icon:"📊", subject:"Economics", img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=130&fit=crop", desc:"Supply and demand, market structures, GDP and fiscal policy." },
  { title:"World & Local History", level:"GCSE", icon:"📜", subject:"History", img:"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=130&fit=crop", desc:"WWI, WWII, colonialism, independence movements worldwide." },
];

const TEACHERS = [
  { name:"Prof. Sarah Okonkwo", subject:"Mathematics & Statistics", country:"Nigeria / UK", rating:4.9, reviews:1240, img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop", bio:"PhD from Oxford. 18 years teaching university-level mathematics.", quals:"PhD Mathematics, Oxford University" },
  { name:"Dr. James Chen", subject:"Physics & Engineering", country:"China / USA", rating:4.8, reviews:980, img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop", bio:"MIT graduate with 15 years in research and teaching.", quals:"PhD Physics, MIT" },
  { name:"Ms. Amina Hassan", subject:"Biology & Chemistry", country:"Kenya / Canada", rating:4.9, reviews:1560, img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop", bio:"Medical doctor turned educator passionate about life sciences.", quals:"MBBS, MSc Education, Toronto" },
  { name:"Prof. Klaus Weber", subject:"Economics & Business", country:"Germany", rating:4.7, reviews:720, img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop", bio:"Former World Bank economist bridging theory and practice.", quals:"PhD Economics, Humboldt University" },
  { name:"Dr. Marie Dubois", subject:"French & Literature", country:"France / Senegal", rating:4.8, reviews:890, img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop", bio:"Native French speaker with deep knowledge of Francophone literature.", quals:"PhD Linguistics, Sorbonne" },
  { name:"Mr. Rajesh Sharma", subject:"Computer Science & AI", country:"India / USA", rating:4.9, reviews:2100, img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop", bio:"Former Google engineer turned full-time educator in AI and coding.", quals:"MSc Computer Science, Stanford" },
];
return (
    <>
      <style>{css}</style>
      <div className="app">
        {annVisible && (
          <div className="announcement">
            <span>{t.announcement}</span>
            <button className="ann-close" onClick={() => setAnnVisible(false)}>✕</button>
          </div>
        )}

        <nav className="topnav">
          <div className="nav-inner">
            <div className="nav-logo" onClick={() => goPage("home")}>
              <div className="nav-logo-icon">🎓</div>
              <span className="nav-logo-text">{t.siteName}</span>
            </div>
            <div className="nav-links">
              {navPages.map(p => (
                <button key={p} className={`nav-link${page===p?" active":""}`} onClick={() => goPage(p)}>
                  {navIcons[p]} {t.nav[p]}
                </button>
              ))}
            </div>
            <div className="nav-right">
              <select className="lang-select" value={lang} onChange={e => setLang(e.target.value)}>
                {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
              <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>☰</button>
            </div>
          </div>
          <div className={`mobile-menu${menuOpen?" open":""}`}>
            {navPages.map(p => (
              <div key={p} className="mobile-link" onClick={() => goPage(p)}>{navIcons[p]} {t.nav[p]}</div>
            ))}
          </div>
        </nav>

        {page === "home" && <>
          <div className="hero">
            <div className="container">
              <div className="hero-badge">🌍 World-Class Education Platform</div>
              <h1 className="hero-title">{t.siteName}</h1>
              <p style={{fontSize:"22px",color:"rgba(255,255,255,0.9)",fontWeight:600,marginBottom:8}}>{t.tagline}</p>
              <p className="hero-sub">{t.heroSub}</p>
              <div className="hero-btns">
                <button className="btn-primary" onClick={() => goPage("papers")}>📄 {t.nav.papers}</button>
                <button className="btn-outline" onClick={() => goPage("ai")}>🤖 {t.nav.ai}</button>
                <button className="btn-outline" onClick={() => goPage("teachers")}>👨‍🏫 {t.nav.teachers}</button>
              </div>
            </div>
          </div>
          <div className="stats-bar">
            <div className="container">
              <div className="stats-grid">
                {[["500+",t.stats.papers],["1,200+",t.stats.notes],["100K+",t.stats.students],["50+",t.stats.teachers]].map(([n,l]) => (
                  <div key={l} className="stat-item"><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
                ))}
              </div>
            </div>
          </div>
          <div className="section">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">What We Offer</span>
                <h2 className="sec-title">{t.sections.services}</h2>
              </div>
              <div className="services-grid">
                {[{icon:"📄",nav:"papers"},{icon:"📚",nav:"notes"},{icon:"🤖",nav:"ai"},{icon:"👨‍🏫",nav:"teachers"}].map((s,i) => (
                  <div key={i} className="service-card" onClick={() => goPage(s.nav)}>
                    <div className="service-icon">{s.icon}</div>
                    <div className="service-title">{t.services[i].title}</div>
                    <div className="service-desc">{t.services[i].desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="section-alt">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">Just Added</span>
                <h2 className="sec-title">{t.sections.recentPapers}</h2>
              </div>
              <div className="paper-grid">
                {PAST_PAPERS.slice(0,6).map((p,i) => (
                  <div key={i} className="paper-card">
                    <img src={p.img} alt={p.subject} className="paper-img"/>
                    <div className="paper-body">
                      <div className="paper-subject">{p.subject}</div>
                      <div className="paper-meta">{t.org}: {p.org} | {t.year}: {p.year}</div>
                      <span className="paper-tag">{p.level}</span>
                      <button className="paper-btn" style={{marginTop:12}} onClick={() => goPage("papers")}>{t.download} ↓</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{textAlign:"center",marginTop:28}}>
                <button className="btn-primary" style={{background:"#0057d9",color:"#fff"}} onClick={() => goPage("papers")}>View All Past Papers →</button>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="container">
              <div className="ai-box">
                <div className="ai-box-title">🤖 {t.sections.askAI}</div>
                <div className="ai-box-sub">{t.aiPlaceholder}</div>
                <div className="hero-btns"><button className="btn-primary" onClick={() => goPage("ai")}>{t.aiBtn} →</button></div>
              </div>
            </div>
          </div>
          <div className="section-alt">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">Our Faculty</span>
                <h2 className="sec-title">{t.sections.meetTeachers}</h2>
              </div>
              <div className="teachers-grid">
                {TEACHERS.slice(0,3).map((tc,i) => (
                  <div key={i} className="teacher-card">
                    <div className="teacher-header">
                      <img src={tc.img} alt={tc.name} className="teacher-img"/>
                      <div>
                        <div className="teacher-name">{tc.name}</div>
                        <div className="teacher-subj">{tc.subject}</div>
                        <div className="teacher-country">📍 {tc.country}</div>
                      </div>
                    </div>
                    <div className="teacher-quals">{tc.quals}</div>
                    <div className="teacher-bio">{tc.bio}</div>
                    <div className="star-row"><span className="stars">★★★★★</span><span className="rating-num">{tc.rating}</span><span className="reviews-cnt">({tc.reviews} reviews)</span></div>
                  </div>
                ))}
              </div>
              <div style={{textAlign:"center",marginTop:28}}>
                <button className="btn-primary" style={{background:"#0057d9",color:"#fff"}} onClick={() => goPage("teachers")}>Meet All Teachers →</button>
              </div>
            </div>
          </div>
        </>}

        {page === "papers" && (
          <div className="section"><div className="container">
            <div className="sec-header"><span className="sec-eyebrow">Resources</span><h2 className="sec-title">{t.sections.allPapers}</h2></div>
            <input className="search-input" placeholder={t.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}/>
            <div className="paper-grid">
              {filteredPapers.map((p,i) => (
                <div key={i} className="paper-card">
                  <img src={p.img} alt={p.subject} className="paper-img"/>
                  <div className="paper-body">
                    <div className="paper-subject">{p.subject}</div>
                    <div className="paper-meta">{t.org}: {p.org}</div>
                    <span className="paper-tag">{p.level}</span><span className="paper-tag">{p.year}</span>
                    <button className="paper-btn" style={{marginTop:12}}>{t.download} ↓</button>
                  </div>
                </div>
              ))}
            </div>
          </div></div>
        )}

        {page === "notes" && (
          <div className="section"><div className="container">
            <div className="sec-header"><span className="sec-eyebrow">Study Resources</span><h2 className="sec-title">{t.sections.allNotes}</h2></div>
            <input className="search-input" placeholder={t.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}/>
            <div className="notes-grid">
              {filteredNotes.map((n,i) => (
                <div key={i} className="note-card">
                  <img src={n.img} alt={n.title} className="note-img"/>
                  <div className="note-body">
                    <div style={{fontSize:20,marginBottom:4}}>{n.icon}</div>
                    <div className="note-title">{n.title}</div>
                    <div className="note-level">{n.level}</div>
                    <div className="note-desc">{n.desc}</div>
                    <button className="note-btn">{t.viewNotes} →</button>
                  </div>
                </div>
              ))}
            </div>
          </div></div>
        )}

        {page === "ai" && (
          <div className="section"><div className="container">
            <div className="sec-header">
              <span className="sec-eyebrow">Powered by Claude AI</span>
              <h2 className="sec-title">{t.sections.askAI}</h2>
              <p className="sec-desc">Ask any question in any language. Your AI tutor is available 24/7.</p>
            </div>
            <div className="ai-box">
              <div className="ai-box-title">🤖 {t.nav.ai}</div>
              <div className="ai-input-wrap">
                <textarea className="ai-textarea" placeholder={t.aiPlaceholder} value={aiQ}
                  onChange={e => setAiQ(e.target.value)}
                  onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();askAI();}}}
                  rows={2}/>
                <button className="ai-send-btn" onClick={askAI} disabled={aiLoading||!aiQ.trim()}>
                  {aiLoading?"...":t.aiBtn}
                </button>
              </div>
              {aiLoading && <div className="ai-thinking"><span>{t.aiThinking}</span><div className="dot-pulse"><span/><span/><span/></div></div>}
              {aiA && <div className="ai-answer"><div className="ai-answer-label">✅ {t.aiLabel}</div>{aiA}</div>}
            </div>
            <div style={{marginTop:48}}>
              <div className="sec-header"><span className="sec-eyebrow">AI Features</span><h2 className="sec-title">What Can the AI Tutor Do?</h2></div>
              <div className="services-grid">
                {[{icon:"✍️",title:"Essay Writer",desc:"Structure, draft and improve essays in any subject."},{icon:"🔢",title:"Math Solver",desc:"Step-by-step algebra, calculus, statistics solutions."},{icon:"❓",title:"Quiz Generator",desc:"Practice questions from any topic."},{icon:"📅",title:"Study Planner",desc:"Personalised revision timetable."},{icon:"👨‍💻",title:"Code Helper",desc:"Programming guidance in any language."},{icon:"🌍",title:"Multilingual",desc:"Answers in EN, FR, ZH, DE, SW, or British English."}].map((tool,i) => (
                  <div key={i} className="service-card">
                    <div className="service-icon">{tool.icon}</div>
                    <div className="service-title">{tool.title}</div>
                    <div className="service-desc">{tool.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div></div>
        )}

        {page === "teachers" && (
          <div className="section"><div className="container">
            <div className="sec-header"><span className="sec-eyebrow">Global Faculty</span><h2 className="sec-title">{t.sections.meetTeachers}</h2></div>
            <div className="teachers-grid">
              {TEACHERS.map((tc,i) => (
                <div key={i} className="teacher-card">
                  <div className="teacher-header">
                    <img src={tc.img} alt={tc.name} className="teacher-img"/>
                    <div><div className="teacher-name">{tc.name}</div><div className="teacher-subj">{tc.subject}</div><div className="teacher-country">📍 {tc.country}</div></div>
                  </div>
                  <div className="teacher-quals">{tc.quals}</div>
                  <div className="teacher-bio">{tc.bio}</div>
                  <div className="star-row"><span className="stars">★★★★★</span><span className="rating-num">{tc.rating}</span><span className="reviews-cnt">({tc.reviews} reviews)</span></div>
                </div>
              ))}
            </div>
          </div></div>
        )}

        {page === "about" && (
          <div className="section"><div className="container">
            <div className="sec-header"><span className="sec-eyebrow">Who We Are</span><h2 className="sec-title">{t.sections.about}</h2><p className="sec-desc">{t.aboutText}</p></div>
            <div className="about-grid">
              <div className="about-card"><div className="about-card-title">🎯 {t.mission}</div><div className="about-card-text">{t.missionText}</div></div>
              <div className="about-card"><div className="about-card-title">👥 {t.team}</div><div className="about-card-text">{t.teamText}</div></div>
              <div className="about-card"><div className="about-card-title">🌍 {t.reach}</div><div className="about-card-text">{t.reachText}</div></div>
              <div className="about-card"><div className="about-card-title">🤖 AI-Powered</div><div className="about-card-text">Our platform uses Claude AI to provide instant answers in 6 languages — 24 hours a day, 7 days a week.</div></div>
            </div>
            <div style={{background:"linear-gradient(135deg,#003fa3,#0057d9)",borderRadius:20,padding:"40px 30px",marginTop:40,color:"#fff",textAlign:"center"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,marginBottom:24}}>Our Impact in Numbers</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:20}}>
                {[["100K+","Students Worldwide"],["150+","Countries Served"],["500+","Past Papers"],["50+","Expert Teachers"],["6","Languages"],["24/7","AI Support"]].map(([n,l]) => (
                  <div key={l}><div style={{fontSize:34,fontWeight:900,color:"#4ea8ff"}}>{n}</div><div style={{fontSize:13,color:"rgba(255,255,255,0.75)",marginTop:4}}>{l}</div></div>
                ))}
              </div>
            </div>
          </div></div>
        )}

        {page === "contact" && (
          <div className="section"><div className="container">
            <div className="sec-header"><span className="sec-eyebrow">Get In Touch</span><h2 className="sec-title">{t.sections.contact}</h2></div>
            <div className="contact-grid">
              <div className="contact-info-card">
                {[{icon:"📧",label:"Email",val:t.contactInfo.email},{icon:"💬",label:"WhatsApp",val:t.contactInfo.whatsapp},{icon:"🌐",label:"Website",val:t.contactInfo.website},{icon:"🕐",label:"Support Hours",val:"24/7 via AI Tutor"}].map((item,i) => (
                  <div key={i} className="contact-info-item">
                    <div className="contact-info-icon">{item.icon}</div>
                    <div><div className="contact-info-label">{item.label}</div><div className="contact-info-val">{item.val}</div></div>
                  </div>
                ))}
                <div style={{background:"#e8f1ff",borderRadius:12,padding:18,marginTop:8}}>
                  <div style={{fontWeight:700,color:"#0057d9",marginBottom:8}}>🤖 Need instant help?</div>
                  <div style={{fontSize:13.5,color:"#5a7090",marginBottom:12}}>Our AI Tutor answers any question instantly in your language.</div>
                  <button className="paper-btn" onClick={() => goPage("ai")}>{t.aiBtn} →</button>
                </div>
              </div>
              <div className="contact-form-card">
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#1a2744",marginBottom:20}}>{t.sections.contact}</h3>
                {contactSent ? (
                  <div className="success-msg">✅ Thank you! Message sent. We will reply within 24 hours.</div>
                ) : (
                  <>
                    <div className="form-group"><label className="form-label">{t.yourName}</label><input className="form-input" value={contactForm.name} onChange={e => setContactForm(f=>({...f,name:e.target.value}))} placeholder="John Smith"/></div>
                    <div className="form-group"><label className="form-label">{t.yourEmail}</label><input className="form-input" type="email" value={contactForm.email} onChange={e => setContactForm(f=>({...f,email:e.target.value}))} placeholder="john@example.com"/></div>
                    <div className="form-group"><label className="form-label">{t.yourMsg}</label><textarea className="form-textarea" value={contactForm.msg} onChange={e => setContactForm(f=>({...f,msg:e.target.value}))} placeholder="How can we help you?"/></div>
                    <button className="submit-btn" onClick={() => { if(contactForm.name&&contactForm.email&&contactForm.msg) setContactSent(true); }}>{t.sendMsg} ✉️</button>
                  </>
                )}
              </div>
            </div>
          </div></div>
        )}

        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">🎓 {t.siteName}</div>
              <div className="footer-tagline">{t.footerMission}</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {LANGS.map(l => <span key={l.code} style={{cursor:"pointer",fontSize:20}} onClick={() => setLang(l.code)} title={l.label}>{l.label.split(" ")[0]}</span>)}
              </div>
            </div>
            <div>
              <div className="footer-heading">Resources</div>
              {["papers","notes","ai","teachers"].map(p => <span key={p} className="footer-link" onClick={() => goPage(p)}>{navIcons[p]} {t.nav[p]}</span>)}
            </div>
            <div>
              <div className="footer-heading">Company</div>
              {["about","contact"].map(p => <span key={p} className="footer-link" onClick={() => goPage(p)}>{navIcons[p]} {t.nav[p]}</span>)}
              <span className="footer-link">🔒 Privacy Policy</span>
              <span className="footer-link">📋 Terms of Use</span>
            </div>
            <div>
              <div className="footer-heading">Subjects</div>
              {["Mathematics","Physics","Biology","Chemistry","Computer Science","Economics"].map(s => (
                <span key={s} className="footer-link" onClick={() => { setSearch(s); goPage("papers"); }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">{t.footerRights}</span>
            <span className="footer-mission-txt">{t.footerMission}</span>
          </div>
        </footer>
      </div>
    </>
  );
}

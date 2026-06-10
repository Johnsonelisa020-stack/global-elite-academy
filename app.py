import { useState, useEffect, useRef } from "react";

// ─── TRANSLATION DICTIONARY ──────────────────────────────────────────────────
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
      { title:"Study Notes", desc:"Expert-reviewed notes for all subjects and all levels – from primary school to university." },
      { title:"AI Tutor", desc:"Ask any question, solve math problems, get essay help, generate quizzes, and plan your studies with AI." },
      { title:"Expert Teachers", desc:"Learn directly from qualified professors and specialist teachers from around the world." }
    ],
    aiPlaceholder: "Ask any question... e.g. Explain photosynthesis, Solve 2x+5=13, What caused World War I?",
    aiBtn: "Ask AI Tutor",
    aiThinking: "AI is thinking...",
    aiLabel: "AI Tutor Answer",
    sendMsg: "Send Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourMsg: "Your Message",
    download: "Download PDF",
    viewNotes: "View Notes",
    allLevels: "All Levels",
    searchPlaceholder: "Search subjects, topics, levels...",
    langLabel: "Language",
    subjects: "Subjects",
    level: "Level",
    year: "Year",
    org: "Organisation",
    announcement: "🌍 New: Cambridge A-Level 2024 papers now available! Access free for all students.",
    footerRights: "© 2025 Global Elite Academy. All Rights Reserved.",
    footerMission: "Making quality education accessible to every student worldwide.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "Global Elite Academy was founded on the belief that every student, regardless of geography or background, deserves access to world-class education. We bring together expert teachers, comprehensive past papers, and the power of AI to create the most effective learning platform on earth.",
    mission: "Our Mission",
    missionText: "To democratize education globally — providing free, high-quality resources to 100 million students by 2030.",
    team: "Our Team",
    teamText: "A global team of educators, technologists, and researchers united by one goal: better outcomes for every learner.",
    reach: "Our Reach",
    reachText: "We serve students in 150+ countries, with resources in 6 languages and 24/7 AI support.",
  },
  fr: {
    siteName: "Académie Mondiale d'Élite",
    tagline: "Une Éducation de Classe Mondiale pour Chaque Élève",
    heroSub: "Examens Passés • Notes d'Études • Tuteur IA • Professeurs Experts",
    nav: { home:"Accueil", papers:"Examens Passés", notes:"Notes", ai:"Tuteur IA", teachers:"Professeurs", about:"À Propos", contact:"Contact" },
    stats: { papers:"Examens Passés", notes:"Notes d'Études", students:"Étudiants Mondiaux", teachers:"Professeurs Experts" },
    sections: { services:"Nos Services Principaux", recentPapers:"Examens Récemment Ajoutés", askAI:"Interrogez Notre Tuteur IA", allNotes:"Tous les Matériaux d'Étude", allPapers:"Parcourir Tous les Examens", meetTeachers:"Rencontrez Nos Professeurs", about:"À Propos de l'Académie", contact:"Contactez-Nous" },
    services: [
      { title:"Examens Passés", desc:"Accédez à des milliers d'examens passés de NECTA, Cambridge, IB et universités mondiales." },
      { title:"Notes d'Études", desc:"Notes vérifiées par des experts pour toutes les matières et tous les niveaux." },
      { title:"Tuteur IA", desc:"Posez n'importe quelle question, résolvez des problèmes de maths, obtenez de l'aide avec l'IA." },
      { title:"Professeurs Experts", desc:"Apprenez directement auprès de professeurs qualifiés du monde entier." }
    ],
    aiPlaceholder: "Posez n'importe quelle question... ex. Expliquez la photosynthèse, Résolvez 2x+5=13",
    aiBtn: "Interroger le Tuteur IA",
    aiThinking: "L'IA réfléchit...",
    aiLabel: "Réponse du Tuteur IA",
    sendMsg: "Envoyer le Message",
    yourName: "Votre Nom",
    yourEmail: "Votre Email",
    yourMsg: "Votre Message",
    download: "Télécharger PDF",
    viewNotes: "Voir les Notes",
    allLevels: "Tous Niveaux",
    searchPlaceholder: "Rechercher matières, sujets, niveaux...",
    langLabel: "Langue",
    subjects: "Matières",
    level: "Niveau",
    year: "Année",
    org: "Organisation",
    announcement: "🌍 Nouveau: Les examens Cambridge A-Level 2024 sont disponibles! Accès gratuit.",
    footerRights: "© 2025 Académie Mondiale d'Élite. Tous droits réservés.",
    footerMission: "Rendre l'éducation de qualité accessible à chaque étudiant dans le monde.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "L'Académie Mondiale d'Élite a été fondée sur la conviction que chaque étudiant mérite un accès à une éducation de classe mondiale, indépendamment de sa géographie ou de ses origines.",
    mission: "Notre Mission",
    missionText: "Démocratiser l'éducation mondialement — fournir des ressources gratuites et de haute qualité à 100 millions d'étudiants d'ici 2030.",
    team: "Notre Équipe",
    teamText: "Une équipe mondiale d'éducateurs, technologues et chercheurs unis par un objectif: de meilleurs résultats pour chaque apprenant.",
    reach: "Notre Portée",
    reachText: "Nous servons des étudiants dans 150+ pays, avec des ressources en 6 langues et un support IA 24/7.",
  },
  zh: {
    siteName: "全球精英学院",
    tagline: "为每一位学生提供世界级教育",
    heroSub: "历年试卷 • 学习笔记 • AI辅导 • 专家教师",
    nav: { home:"首页", papers:"历年试卷", notes:"学习笔记", ai:"AI辅导", teachers:"教师", about:"关于我们", contact:"联系我们" },
    stats: { papers:"历年试卷", notes:"学习笔记", students:"全球学生", teachers:"专家教师" },
    sections: { services:"我们的核心服务", recentPapers:"最近添加的试卷", askAI:"询问AI辅导", allNotes:"所有学习材料", allPapers:"浏览所有试卷", meetTeachers:"认识我们的专家教师", about:"关于全球精英学院", contact:"联系我们" },
    services: [
      { title:"历年试卷", desc:"获取来自NECTA、剑桥、IB和全球大学的数千份历年试卷。更聪明地备考。" },
      { title:"学习笔记", desc:"专家审核的所有科目和所有级别笔记——从小学到大学。" },
      { title:"AI辅导", desc:"提问任何问题，解决数学问题，获得作文帮助，用AI生成测验和规划学习。" },
      { title:"专家教师", desc:"直接向来自世界各地的合格教授和专业教师学习。" }
    ],
    aiPlaceholder: "提任何问题... 例如：解释光合作用，解2x+5=13，第一次世界大战的原因？",
    aiBtn: "询问AI辅导",
    aiThinking: "AI正在思考...",
    aiLabel: "AI辅导答案",
    sendMsg: "发送消息",
    yourName: "您的姓名",
    yourEmail: "您的邮箱",
    yourMsg: "您的消息",
    download: "下载PDF",
    viewNotes: "查看笔记",
    allLevels: "所有级别",
    searchPlaceholder: "搜索科目、主题、级别...",
    langLabel: "语言",
    subjects: "科目",
    level: "级别",
    year: "年份",
    org: "机构",
    announcement: "🌍 新增：2024年剑桥A-Level试卷现已上线！所有学生免费获取。",
    footerRights: "© 2025 全球精英学院。版权所有。",
    footerMission: "让每一位全球学生都能获得优质教育。",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "全球精英学院的创立基于这样一个信念：每一位学生，无论地理位置或背景如何，都应该获得世界级教育。",
    mission: "我们的使命",
    missionText: "全球民主化教育——到2030年为1亿名学生提供免费、高质量的资源。",
    team: "我们的团队",
    teamText: "由教育工作者、技术专家和研究人员组成的全球团队，目标一致：让每位学习者取得更好的成绩。",
    reach: "我们的覆盖范围",
    reachText: "我们为150多个国家的学生提供服务，资源涵盖6种语言，并提供24/7 AI支持。",
  },
  de: {
    siteName: "Global Elite Akademie",
    tagline: "Weltklasse-Bildung für jeden Studenten",
    heroSub: "Vergangene Prüfungen • Lernnotizen • KI-Tutor • Expertenlehrer",
    nav: { home:"Startseite", papers:"Vergangene Prüfungen", notes:"Notizen", ai:"KI-Tutor", teachers:"Lehrer", about:"Über Uns", contact:"Kontakt" },
    stats: { papers:"Vergangene Prüfungen", notes:"Lernnotizen", students:"Weltweite Studenten", teachers:"Expertenlehrer" },
    sections: { services:"Unsere Kerndienstleistungen", recentPapers:"Kürzlich Hinzugefügte Prüfungen", askAI:"Fragen Sie Unseren KI-Tutor", allNotes:"Alle Lernmaterialien", allPapers:"Alle Prüfungen Durchsuchen", meetTeachers:"Lernen Sie Unsere Experten Kennen", about:"Über die Global Elite Akademie", contact:"Kontaktieren Sie Uns" },
    services: [
      { title:"Vergangene Prüfungen", desc:"Greifen Sie auf Tausende von vergangenen Prüfungen von NECTA, Cambridge, IB und Universitäten weltweit zu." },
      { title:"Lernnotizen", desc:"Von Experten überprüfte Notizen für alle Fächer und alle Niveaus – von der Grundschule bis zur Universität." },
      { title:"KI-Tutor", desc:"Stellen Sie jede Frage, lösen Sie Matheprobleme, erhalten Sie Aufsatzhilfe und planen Sie Ihr Studium mit KI." },
      { title:"Expertenlehrer", desc:"Lernen Sie direkt von qualifizierten Professoren und Fachlehrern aus der ganzen Welt." }
    ],
    aiPlaceholder: "Stellen Sie eine Frage... z.B. Erklären Sie Photosynthese, Lösen Sie 2x+5=13",
    aiBtn: "KI-Tutor Fragen",
    aiThinking: "KI denkt nach...",
    aiLabel: "KI-Tutor Antwort",
    sendMsg: "Nachricht Senden",
    yourName: "Ihr Name",
    yourEmail: "Ihre E-Mail",
    yourMsg: "Ihre Nachricht",
    download: "PDF Herunterladen",
    viewNotes: "Notizen Ansehen",
    allLevels: "Alle Niveaus",
    searchPlaceholder: "Fächer, Themen, Niveaus suchen...",
    langLabel: "Sprache",
    subjects: "Fächer",
    level: "Niveau",
    year: "Jahr",
    org: "Organisation",
    announcement: "🌍 Neu: Cambridge A-Level 2024 Prüfungen jetzt verfügbar! Kostenloser Zugang für alle.",
    footerRights: "© 2025 Global Elite Akademie. Alle Rechte vorbehalten.",
    footerMission: "Hochwertige Bildung für jeden Studenten weltweit zugänglich machen.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "Die Global Elite Akademie wurde in der Überzeugung gegründet, dass jeder Schüler, unabhängig von Geografie oder Hintergrund, Zugang zu Weltklasse-Bildung verdient.",
    mission: "Unsere Mission",
    missionText: "Bildung weltweit zu demokratisieren — bis 2030 kostenlose, hochwertige Ressourcen für 100 Millionen Schüler bereitzustellen.",
    team: "Unser Team",
    teamText: "Ein globales Team aus Pädagogen, Technologen und Forschern, vereint durch ein Ziel: bessere Ergebnisse für jeden Lernenden.",
    reach: "Unsere Reichweite",
    reachText: "Wir betreuen Studenten in 150+ Ländern, mit Ressourcen in 6 Sprachen und 24/7 KI-Support.",
  },
  sw: {
    siteName: "Chuo cha Wasomi Duniani",
    tagline: "Elimu Bora Duniani kwa Kila Mwanafunzi",
    heroSub: "Mitihani Iliyopita • Notisi za Masomo • Msaada wa AI • Walimu Wataalam",
    nav: { home:"Nyumbani", papers:"Mitihani Iliyopita", notes:"Notisi", ai:"Msaada wa AI", teachers:"Walimu", about:"Kuhusu Sisi", contact:"Wasiliana" },
    stats: { papers:"Mitihani Iliyopita", notes:"Notisi za Masomo", students:"Wanafunzi Duniani", teachers:"Walimu Wataalam" },
    sections: { services:"Huduma Zetu Kuu", recentPapers:"Mitihani Mpya Zaidi", askAI:"Uliza Msaidizi wa AI", allNotes:"Vifaa Vyote vya Masomo", allPapers:"Tazama Mitihani Yote", meetTeachers:"Kujua Walimu Wetu", about:"Kuhusu Chuo Chetu", contact:"Wasiliana Nasi" },
    services: [
      { title:"Mitihani Iliyopita", desc:"Pata maelfu ya mitihani kutoka NECTA, Cambridge, IB, na vyuo vikuu duniani. Jiandae vizuri." },
      { title:"Notisi za Masomo", desc:"Notisi zilizokaguliwa na wataalamu kwa masomo yote na viwango vyote – kutoka shule ya msingi hadi chuo kikuu." },
      { title:"Msaada wa AI", desc:"Uliza swali lolote, suluhisha hesabu, pata msaada wa insha, na upange masomo yako kwa AI." },
      { title:"Walimu Wataalam", desc:"Jifunze moja kwa moja kutoka kwa maprofesa na walimu wataalam kutoka duniani kote." }
    ],
    aiPlaceholder: "Uliza swali lolote... mfano: Eleza osmosis, Suluhisha 2x+5=13, Nini kilisababisha WWI?",
    aiBtn: "Uliza AI",
    aiThinking: "AI inashughulikia...",
    aiLabel: "Jibu la AI",
    sendMsg: "Tuma Ujumbe",
    yourName: "Jina Lako",
    yourEmail: "Barua Pepe",
    yourMsg: "Ujumbe Wako",
    download: "Pakua PDF",
    viewNotes: "Tazama Notisi",
    allLevels: "Viwango Vyote",
    searchPlaceholder: "Tafuta masomo, mada, viwango...",
    langLabel: "Lugha",
    subjects: "Masomo",
    level: "Kiwango",
    year: "Mwaka",
    org: "Shirika",
    announcement: "🌍 Mpya: Mitihani ya Cambridge A-Level 2024 sasa inapatikana! Bure kwa wanafunzi wote.",
    footerRights: "© 2025 Chuo cha Wasomi Duniani. Haki Zote Zimehifadhiwa.",
    footerMission: "Kuleta elimu bora kwa kila mwanafunzi duniani kote.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "Chuo cha Wasomi Duniani kilianzishwa kwa imani kwamba kila mwanafunzi, bila kujali mahali anapotoka, anastahili elimu bora. Tunaleta pamoja walimu wataalam, mitihani ya kina, na nguvu ya AI.",
    mission: "Dhamira Yetu",
    missionText: "Kufanya elimu iwe haki ya kila mtu duniani — kutoa rasilimali za bure na za ubora wa juu kwa wanafunzi milioni 100 ifikapo 2030.",
    team: "Timu Yetu",
    teamText: "Timu ya kimataifa ya walimu, wataalamu wa teknolojia, na watafiti wanaoshirikiana kwa lengo moja: matokeo bora kwa kila mwanafunzi.",
    reach: "Tunafikia Wapi",
    reachText: "Tunahudumia wanafunzi katika nchi 150+, na rasilimali katika lugha 6 na msaada wa AI masaa 24.",
  },
  gb: {
    siteName: "Global Elite Academy",
    tagline: "World-Class Education for Every Student",
    heroSub: "Past Papers • Revision Notes • AI Tutor • Expert Tutors",
    nav: { home:"Home", papers:"Past Papers", notes:"Revision Notes", ai:"AI Tutor", teachers:"Tutors", about:"About", contact:"Contact" },
    stats: { papers:"Past Papers", notes:"Revision Notes", students:"Students Worldwide", teachers:"Expert Tutors" },
    sections: { services:"Our Core Services", recentPapers:"Recently Added Papers", askAI:"Ask Our AI Tutor", allNotes:"All Revision Materials", allPapers:"Browse All Past Papers", meetTeachers:"Meet Our Expert Tutors", about:"About Global Elite Academy", contact:"Contact Us" },
    services: [
      { title:"Past Exam Papers", desc:"Access thousands of past papers from OCR, AQA, Edexcel, Cambridge and universities worldwide. Revise smarter." },
      { title:"Revision Notes", desc:"Expert-reviewed notes for all subjects and all levels – from primary school to university." },
      { title:"AI Tutor", desc:"Ask any question, solve maths problems, get essay guidance, generate mock questions, and plan your revision." },
      { title:"Expert Tutors", desc:"Learn directly from qualified professors and specialist tutors from across the globe." }
    ],
    aiPlaceholder: "Ask anything... e.g. Explain photosynthesis, Solve 2x+5=13, What caused the First World War?",
    aiBtn: "Ask AI Tutor",
    aiThinking: "AI is thinking...",
    aiLabel: "AI Tutor Answer",
    sendMsg: "Send Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourMsg: "Your Message",
    download: "Download PDF",
    viewNotes: "View Notes",
    allLevels: "All Levels",
    searchPlaceholder: "Search subjects, topics, levels...",
    langLabel: "Language",
    subjects: "Subjects",
    level: "Level",
    year: "Year",
    org: "Examining Body",
    announcement: "🌍 New: Cambridge A-Level 2024 papers now available! Free access for all students.",
    footerRights: "© 2025 Global Elite Academy. All Rights Reserved.",
    footerMission: "Making quality education accessible to every student worldwide.",
    contactInfo: { email:"info@globaleliteacademy.edu", whatsapp:"+1 (800) GEA-LEARN", website:"www.globaleliteacademy.edu" },
    aboutText: "Global Elite Academy was founded on the belief that every student, regardless of geography or background, deserves access to world-class education. We bring together expert tutors, comprehensive past papers, and the power of AI to create the most effective learning platform on earth.",
    mission: "Our Mission",
    missionText: "To democratise education globally — providing free, high-quality resources to 100 million students by 2030.",
    team: "Our Team",
    teamText: "A global team of educators, technologists, and researchers united by one goal: better outcomes for every learner.",
    reach: "Our Reach",
    reachText: "We serve students in 150+ countries, with resources in 6 languages and 24/7 AI support.",
  }
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
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
  { name:"Prof. Sarah Okonkwo", subject:"Mathematics & Statistics", country:"Nigeria / UK", rating:4.9, reviews:1240, img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&faces=true", bio:"PhD from Oxford. 18 years teaching university-level mathematics. Specialist in pure mathematics and statistics.", quals:"PhD Mathematics, Oxford University" },
  { name:"Dr. James Chen", subject:"Physics & Engineering", country:"China / USA", rating:4.8, reviews:980, img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop", bio:"MIT graduate with 15 years in both research and teaching. Makes complex physics concepts easy to understand.", quals:"PhD Physics, MIT" },
  { name:"Ms. Amina Hassan", subject:"Biology & Chemistry", country:"Kenya / Canada", rating:4.9, reviews:1560, img:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop", bio:"Medical doctor turned educator. Passionate about making life sciences accessible to every student globally.", quals:"MBBS, MSc Education, Toronto" },
  { name:"Prof. Klaus Weber", subject:"Economics & Business", country:"Germany", rating:4.7, reviews:720, img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop", bio:"Former economist at the World Bank. Expert in micro and macroeconomics, perfectly bridging theory and practice.", quals:"PhD Economics, Humboldt University" },
  { name:"Dr. Marie Dubois", subject:"French & Literature", country:"France / Senegal", rating:4.8, reviews:890, img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop", bio:"Literature and linguistics expert. Native French speaker with deep knowledge of Francophone literature worldwide.", quals:"PhD Linguistics, Sorbonne" },
  { name:"Mr. Rajesh Sharma", subject:"Computer Science & AI", country:"India / USA", rating:4.9, reviews:2100, img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop", bio:"Software engineer at Google turned full-time educator. Expert in programming, AI, machine learning, and data science.", quals:"MSc Computer Science, Stanford" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [aiQ, setAiQ] = useState("");
  const [aiA, setAiA] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ name:"", email:"", msg:"" });
  const [contactSent, setContactSent] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const t = T[lang];

  const LANGS = [
    { code:"en", label:"🇺🇸 English" },
    { code:"gb", label:"🇬🇧 British" },
    { code:"fr", label:"🇫🇷 Français" },
    { code:"zh", label:"🇨🇳 中文" },
    { code:"de", label:"🇩🇪 Deutsch" },
    { code:"sw", label:"🇹🇿 Kiswahili" },
  ];

  const navPages = ["home","papers","notes","ai","teachers","about","contact"];
  const navIcons = { home:"🏠", papers:"📄", notes:"📚", ai:"🤖", teachers:"👨‍🏫", about:"ℹ️", contact:"📞" };

  // ── AI Q&A ──
  async function askAI() {
    if (!aiQ.trim()) return;
    setAiLoading(true);
    setAiA("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:`You are a friendly, expert educational tutor for Global Elite Academy. Students from all over the world ask you questions. Give clear, well-structured, educational answers suitable for students. Always be encouraging and supportive. Respond in the same language the student uses to ask the question. If the question is in French, answer in French. If in Swahili, answer in Swahili. If in Chinese, answer in Chinese. If in German, answer in German. Otherwise answer in English.`,
          messages:[{ role:"user", content: aiQ }]
        })
      });
      const data = await res.json();
      const txt = data.content?.map(b => b.text||"").join("") || "Sorry, I couldn't process that. Please try again.";
      setAiA(txt);
    } catch(e) {
      setAiA("Network error. Please check your connection and try again.");
    }
    setAiLoading(false);
  }

  const filteredPapers = PAST_PAPERS.filter(p =>
    p.subject.toLowerCase().includes(search.toLowerCase()) ||
    p.level.toLowerCase().includes(search.toLowerCase()) ||
    p.org.toLowerCase().includes(search.toLowerCase())
  );
  const filteredNotes = NOTES.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.subject.toLowerCase().includes(search.toLowerCase()) ||
    n.level.toLowerCase().includes(search.toLowerCase())
  );

  // ── CSS ──
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Inter',sans-serif;background:#f0f7ff;color:#1a2744;}
    .app{min-height:100vh;background:#f0f7ff;}

    /* NAV */
    .topnav{background:#fff;border-bottom:2px solid #e3f0ff;position:sticky;top:0;z-index:100;box-shadow:0 2px 16px rgba(0,80,200,0.08);}
    .nav-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:64px;}
    .nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer;text-decoration:none;}
    .nav-logo-icon{width:40px;height:40px;background:linear-gradient(135deg,#0057d9,#4ea8ff);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;}
    .nav-logo-text{font-weight:800;font-size:17px;color:#0057d9;font-family:'Playfair Display',serif;}
    .nav-links{display:flex;gap:4px;align-items:center;}
    .nav-link{padding:7px 13px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;color:#3a5070;border:none;background:none;transition:all .18s;}
    .nav-link:hover,.nav-link.active{background:#e8f1ff;color:#0057d9;font-weight:600;}
    .nav-right{display:flex;align-items:center;gap:10px;}
    .lang-select{padding:6px 10px;border-radius:8px;border:1.5px solid #cde0ff;background:#f0f7ff;color:#0057d9;font-size:13px;font-weight:600;cursor:pointer;}
    .hamburger{display:none;font-size:24px;cursor:pointer;color:#0057d9;background:none;border:none;}
    .mobile-menu{display:none;background:#fff;border-top:1px solid #e3f0ff;padding:10px 20px 20px;}
    .mobile-menu.open{display:block;}
    .mobile-link{display:block;padding:11px 14px;border-radius:8px;cursor:pointer;font-size:15px;color:#1a2744;margin:3px 0;}
    .mobile-link:hover{background:#e8f1ff;color:#0057d9;}

    /* ANNOUNCEMENT */
    .announcement{background:linear-gradient(90deg,#0057d9,#4ea8ff);color:#fff;text-align:center;padding:10px 20px;font-size:13.5px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:10px;}
    .ann-close{background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;font-size:18px;margin-left:8px;}

    /* HERO */
    .hero{background:linear-gradient(135deg,#003fa3 0%,#0057d9 50%,#4ea8ff 100%);padding:80px 20px 90px;text-align:center;position:relative;overflow:hidden;}
    .hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none;}
    .hero-badge{display:inline-block;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.35);color:#fff;padding:5px 16px;border-radius:20px;font-size:12.5px;font-weight:600;margin-bottom:18px;letter-spacing:.5px;}
    .hero-title{font-family:'Playfair Display',serif;font-size:clamp(32px,6vw,62px);font-weight:800;color:#fff;margin-bottom:14px;line-height:1.1;text-shadow:0 2px 20px rgba(0,0,0,0.2);}
    .hero-sub{color:rgba(255,255,255,0.85);font-size:clamp(14px,2vw,18px);margin-bottom:36px;font-weight:400;}
    .hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
    .btn-primary{background:#fff;color:#0057d9;padding:13px 30px;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;border:none;transition:all .2s;box-shadow:0 4px 18px rgba(0,0,0,0.15);}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.2);}
    .btn-outline{background:transparent;color:#fff;padding:13px 30px;border-radius:10px;font-weight:600;font-size:15px;cursor:pointer;border:2px solid rgba(255,255,255,0.6);transition:all .2s;}
    .btn-outline:hover{background:rgba(255,255,255,0.15);border-color:#fff;}

    /* CONTAINER */
    .container{max-width:1200px;margin:0 auto;padding:0 20px;}
    .section{padding:70px 0;}
    .section-alt{background:#fff;padding:70px 0;}

    /* STATS */
    .stats-bar{background:#fff;border-bottom:2px solid #e3f0ff;padding:24px 0;}
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;}
    .stat-item{text-align:center;padding:10px 20px;border-right:1px solid #e3f0ff;}
    .stat-item:last-child{border-right:none;}
    .stat-num{font-size:32px;font-weight:900;color:#0057d9;font-family:'Playfair Display',serif;}
    .stat-lbl{font-size:12.5px;color:#6b84a0;font-weight:500;margin-top:2px;}

    /* SECTION HEADER */
    .sec-header{text-align:center;margin-bottom:42px;}
    .sec-eyebrow{display:inline-block;background:#e8f1ff;color:#0057d9;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:.5px;margin-bottom:12px;text-transform:uppercase;}
    .sec-title{font-family:'Playfair Display',serif;font-size:clamp(24px,3.5vw,38px);font-weight:800;color:#1a2744;margin-bottom:10px;}
    .sec-desc{color:#5a7090;font-size:16px;max-width:580px;margin:0 auto;}

    /* SERVICE CARDS */
    .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;}
    .service-card{background:#fff;border-radius:18px;padding:30px 26px;border:2px solid #e3f0ff;transition:all .22s;cursor:pointer;}
    .service-card:hover{border-color:#0057d9;transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,87,217,0.12);}
    .service-icon{width:54px;height:54px;background:linear-gradient(135deg,#e8f1ff,#cde0ff);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:16px;}
    .service-title{font-size:17px;font-weight:700;color:#1a2744;margin-bottom:8px;}
    .service-desc{font-size:14px;color:#6b84a0;line-height:1.6;}

    /* PAPER CARDS */
    .paper-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;}
    .paper-card{background:#fff;border-radius:16px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .2s;}
    .paper-card:hover{border-color:#0057d9;box-shadow:0 8px 32px rgba(0,87,217,0.1);transform:translateY(-3px);}
    .paper-img{width:100%;height:90px;object-fit:cover;}
    .paper-body{padding:16px 18px;}
    .paper-subject{font-size:15px;font-weight:700;color:#1a2744;margin-bottom:4px;}
    .paper-meta{font-size:12.5px;color:#6b84a0;margin-bottom:12px;}
    .paper-tag{display:inline-block;background:#e8f1ff;color:#0057d9;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;margin-right:4px;}
    .paper-btn{display:block;width:100%;padding:9px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:8px;font-size:13.5px;font-weight:600;cursor:pointer;text-align:center;transition:all .18s;}
    .paper-btn:hover{opacity:.9;transform:scale(1.01);}

    /* NOTE CARDS */
    .notes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px;}
    .note-card{background:#fff;border-radius:16px;overflow:hidden;border:1.5px solid #e3f0ff;transition:all .2s;}
    .note-card:hover{border-color:#0057d9;box-shadow:0 8px 32px rgba(0,87,217,0.1);transform:translateY(-3px);}
    .note-img{width:100%;height:120px;object-fit:cover;}
    .note-body{padding:16px;}
    .note-title{font-size:15px;font-weight:700;color:#1a2744;margin-bottom:4px;}
    .note-level{font-size:12px;color:#0057d9;font-weight:600;margin-bottom:8px;}
    .note-desc{font-size:13px;color:#6b84a0;margin-bottom:14px;line-height:1.5;}
    .note-btn{display:block;width:100%;padding:8px;background:#e8f1ff;color:#0057d9;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:all .18s;}
    .note-btn:hover{background:#0057d9;color:#fff;}

    /* TEACHER CARDS */
    .teachers-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px;}
    .teacher-card{background:#fff;border-radius:18px;padding:26px;border:1.5px solid #e3f0ff;transition:all .22s;}
    .teacher-card:hover{border-color:#0057d9;box-shadow:0 10px 36px rgba(0,87,217,0.12);transform:translateY(-3px);}
    .teacher-header{display:flex;gap:15px;align-items:flex-start;margin-bottom:14px;}
    .teacher-img{width:70px;height:70px;border-radius:50%;object-fit:cover;border:3px solid #e3f0ff;}
    .teacher-name{font-size:16px;font-weight:700;color:#1a2744;}
    .teacher-subj{font-size:13px;color:#0057d9;font-weight:600;margin:2px 0;}
    .teacher-country{font-size:12px;color:#6b84a0;}
    .teacher-bio{font-size:13.5px;color:#5a7090;line-height:1.6;margin-bottom:14px;}
    .teacher-quals{font-size:12px;color:#0057d9;background:#e8f1ff;padding:4px 12px;border-radius:20px;display:inline-block;margin-bottom:12px;}
    .star-row{display:flex;align-items:center;gap:5px;}
    .stars{color:#f59e0b;font-size:14px;}
    .rating-num{font-size:14px;font-weight:700;color:#1a2744;}
    .reviews-cnt{font-size:12px;color:#6b84a0;}

    /* AI SECTION */
    .ai-box{background:linear-gradient(135deg,#003fa3,#0057d9);border-radius:24px;padding:48px 40px;color:#fff;text-align:center;}
    .ai-box-title{font-family:'Playfair Display',serif;font-size:clamp(22px,3vw,36px);font-weight:800;margin-bottom:10px;}
    .ai-box-sub{color:rgba(255,255,255,0.8);font-size:16px;margin-bottom:32px;}
    .ai-input-wrap{display:flex;gap:12px;max-width:700px;margin:0 auto 24px;}
    .ai-textarea{flex:1;padding:14px 18px;border-radius:12px;border:none;font-size:15px;resize:none;min-height:54px;font-family:'Inter',sans-serif;outline:none;}
    .ai-send-btn{padding:14px 24px;background:#fff;color:#0057d9;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .2s;}
    .ai-send-btn:hover:not(:disabled){background:#e8f1ff;transform:scale(1.02);}
    .ai-send-btn:disabled{opacity:.6;cursor:not-allowed;}
    .ai-answer{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:14px;padding:22px;text-align:left;font-size:14.5px;line-height:1.75;color:#fff;white-space:pre-wrap;margin-top:10px;max-width:700px;margin-left:auto;margin-right:auto;}
    .ai-answer-label{font-weight:700;color:rgba(255,255,255,0.7);font-size:12px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;}
    .ai-thinking{display:flex;align-items:center;gap:10px;justify-content:center;padding:14px;color:rgba(255,255,255,0.8);}
    .dot-pulse{display:flex;gap:5px;}
    .dot-pulse span{width:8px;height:8px;background:#fff;border-radius:50%;animation:pulse 1.2s infinite;}
    .dot-pulse span:nth-child(2){animation-delay:.2s;}
    .dot-pulse span:nth-child(3){animation-delay:.4s;}
    @keyframes pulse{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}

    /* SEARCH */
    .search-bar{display:flex;gap:10px;margin-bottom:28px;}
    .search-input{flex:1;padding:12px 18px;border-radius:10px;border:1.5px solid #cde0ff;font-size:15px;outline:none;transition:border .2s;font-family:'Inter',sans-serif;}
    .search-input:focus{border-color:#0057d9;box-shadow:0 0 0 3px rgba(0,87,217,0.08);}

    /* ABOUT */
    .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
    .about-card{background:#fff;border-radius:18px;padding:28px;border:1.5px solid #e3f0ff;}
    .about-card-title{font-size:17px;font-weight:700;color:#0057d9;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
    .about-card-text{font-size:14.5px;color:#5a7090;line-height:1.7;}

    /* CONTACT */
    .contact-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:28px;}
    .contact-info-card{background:#fff;border-radius:18px;padding:30px;border:1.5px solid #e3f0ff;}
    .contact-info-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px;}
    .contact-info-icon{width:44px;height:44px;background:#e8f1ff;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
    .contact-info-label{font-size:12px;color:#6b84a0;font-weight:600;text-transform:uppercase;letter-spacing:.4px;}
    .contact-info-val{font-size:15px;color:#1a2744;font-weight:600;}
    .contact-form-card{background:#fff;border-radius:18px;padding:30px;border:1.5px solid #e3f0ff;}
    .form-group{margin-bottom:16px;}
    .form-label{display:block;font-size:13px;font-weight:600;color:#3a5070;margin-bottom:6px;}
    .form-input,.form-textarea{width:100%;padding:11px 14px;border-radius:9px;border:1.5px solid #cde0ff;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border .2s;}
    .form-input:focus,.form-textarea:focus{border-color:#0057d9;box-shadow:0 0 0 3px rgba(0,87,217,0.08);}
    .form-textarea{min-height:100px;resize:vertical;}
    .submit-btn{width:100%;padding:13px;background:linear-gradient(135deg,#0057d9,#4ea8ff);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;}
    .submit-btn:hover{opacity:.9;transform:translateY(-1px);}
    .success-msg{background:#e8f8ef;border:1.5px solid #34d399;color:#065f46;padding:14px;border-radius:10px;text-align:center;font-weight:600;margin-top:12px;}

    /* FOOTER */
    .footer{background:#0f1e3d;color:#fff;padding:50px 20px 28px;}
    .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;max-width:1200px;margin:0 auto;padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,0.1);}
    .footer-brand{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#4ea8ff;margin-bottom:10px;}
    .footer-tagline{font-size:13.5px;color:rgba(255,255,255,0.55);line-height:1.6;margin-bottom:18px;}
    .footer-heading{font-size:13px;font-weight:700;color:#4ea8ff;text-transform:uppercase;letter-spacing:.5px;margin-bottom:14px;}
    .footer-link{display:block;font-size:13.5px;color:rgba(255,255,255,0.6);margin-bottom:8px;cursor:pointer;transition:color .15s;}
    .footer-link:hover{color:#4ea8ff;}
    .footer-bottom{max-width:1200px;margin:0 auto;padding-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;}
    .footer-copy{font-size:12.5px;color:rgba(255,255,255,0.4);}
    .footer-mission{font-size:12.5px;color:rgba(255,255,255,0.4);}

    /* RESPONSIVE */
    @media(max-width:900px){
      .stats-grid{grid-template-columns:repeat(2,1fr);}
      .about-grid,.contact-grid{grid-template-columns:1fr;}
      .footer-grid{grid-template-columns:1fr 1fr;}
      .nav-links{display:none;}
      .hamburger{display:block;}
    }
    @media(max-width:600px){
      .hero{padding:56px 16px 64px;}
      .stats-grid{grid-template-columns:repeat(2,1fr);}
      .footer-grid{grid-template-columns:1fr;}
      .ai-input-wrap{flex-direction:column;}
      .ai-box{padding:30px 18px;}
    }
  `;

  const goPage = (p) => { setPage(p); setMenuOpen(false); setSearch(""); window.scrollTo(0,0); };

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* ANNOUNCEMENT */}
        {announcementVisible && (
          <div className="announcement">
            <span>{t.announcement}</span>
            <button className="ann-close" onClick={() => setAnnouncementVisible(false)}>✕</button>
          </div>
        )}

        {/* TOPNAV */}
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
              <div key={p} className="mobile-link" onClick={() => goPage(p)}>
                {navIcons[p]} {t.nav[p]}
              </div>
            ))}
          </div>
        </nav>

        {/* ── HOME ─────────────────────────────────────────────────── */}
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

          {/* STATS */}
          <div className="stats-bar">
            <div className="container">
              <div className="stats-grid">
                {[["500+",t.stats.papers],["1,200+",t.stats.notes],["100K+",t.stats.students],["50+",t.stats.teachers]].map(([n,l]) => (
                  <div key={l} className="stat-item">
                    <div className="stat-num">{n}</div>
                    <div className="stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div className="section">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">What We Offer</span>
                <h2 className="sec-title">{t.sections.services}</h2>
              </div>
              <div className="services-grid">
                {[
                  { icon:"📄", nav:"papers" },
                  { icon:"📚", nav:"notes" },
                  { icon:"🤖", nav:"ai" },
                  { icon:"👨‍🏫", nav:"teachers" }
                ].map((s,i) => (
                  <div key={i} className="service-card" onClick={() => goPage(s.nav)}>
                    <div className="service-icon">{s.icon}</div>
                    <div className="service-title">{t.services[i].title}</div>
                    <div className="service-desc">{t.services[i].desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT PAPERS */}
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
                      <button className="paper-btn" style={{marginTop:12}} onClick={() => goPage("papers")}>
                        {t.download} ↓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{textAlign:"center",marginTop:28}}>
                <button className="btn-primary" style={{background:"#0057d9",color:"#fff"}} onClick={() => goPage("papers")}>
                  View All Past Papers →
                </button>
              </div>
            </div>
          </div>

          {/* AI TEASER */}
          <div className="section">
            <div className="container">
              <div className="ai-box">
                <div className="ai-box-title">🤖 {t.sections.askAI}</div>
                <div className="ai-box-sub">{t.aiPlaceholder}</div>
                <div className="hero-btns">
                  <button className="btn-primary" onClick={() => goPage("ai")}>{t.aiBtn} →</button>
                </div>
              </div>
            </div>
          </div>

          {/* TEACHERS PREVIEW */}
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
                    <div className="star-row">
                      <span className="stars">★★★★★</span>
                      <span className="rating-num">{tc.rating}</span>
                      <span className="reviews-cnt">({tc.reviews} reviews)</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{textAlign:"center",marginTop:28}}>
                <button className="btn-primary" style={{background:"#0057d9",color:"#fff"}} onClick={() => goPage("teachers")}>
                  Meet All Teachers →
                </button>
              </div>
            </div>
          </div>
        </>}

        {/* ── PAST PAPERS ──────────────────────────────────────────── */}
        {page === "papers" && (
          <div className="section">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">Resources</span>
                <h2 className="sec-title">{t.sections.allPapers}</h2>
                <p className="sec-desc">Past papers from NECTA, Cambridge IGCSE, A-Level, IB, AQA, Edexcel and more</p>
              </div>
              <div className="search-bar">
                <input className="search-input" placeholder={t.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}/>
              </div>
              <div className="paper-grid">
                {filteredPapers.map((p,i) => (
                  <div key={i} className="paper-card">
                    <img src={p.img} alt={p.subject} className="paper-img"/>
                    <div className="paper-body">
                      <div className="paper-subject">{p.subject}</div>
                      <div className="paper-meta">{t.org}: {p.org}</div>
                      <span className="paper-tag">{p.level}</span>
                      <span className="paper-tag">{p.year}</span>
                      <button className="paper-btn" style={{marginTop:12}}>
                        {t.download} ↓
                      </button>
                    </div>
                  </div>
                ))}
                {filteredPapers.length === 0 && (
                  <div style={{gridColumn:"1/-1",textAlign:"center",padding:"40px",color:"#6b84a0"}}>
                    No papers found for "{search}". Try a different search term.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── NOTES ────────────────────────────────────────────────── */}
        {page === "notes" && (
          <div className="section">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">Study Resources</span>
                <h2 className="sec-title">{t.sections.allNotes}</h2>
                <p className="sec-desc">Expert-reviewed revision notes for all subjects from primary to university level</p>
              </div>
              <div className="search-bar">
                <input className="search-input" placeholder={t.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)}/>
              </div>
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
                {filteredNotes.length === 0 && (
                  <div style={{gridColumn:"1/-1",textAlign:"center",padding:"40px",color:"#6b84a0"}}>
                    No notes found for "{search}". Try a different search term.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── AI TUTOR ─────────────────────────────────────────────── */}
        {page === "ai" && (
          <div className="section">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">Powered by Claude AI</span>
                <h2 className="sec-title">{t.sections.askAI}</h2>
                <p className="sec-desc">Ask any question in any language. Your AI tutor is available 24/7.</p>
              </div>
              <div className="ai-box">
                <div className="ai-box-title">🤖 {t.nav.ai}</div>
                <div className="ai-box-sub">{t.aiPlaceholder}</div>
                <div className="ai-input-wrap">
                  <textarea
                    className="ai-textarea"
                    placeholder={t.aiPlaceholder}
                    value={aiQ}
                    onChange={e => setAiQ(e.target.value)}
                    onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();askAI();}}}
                    rows={2}
                  />
                  <button className="ai-send-btn" onClick={askAI} disabled={aiLoading || !aiQ.trim()}>
                    {aiLoading ? "..." : t.aiBtn}
                  </button>
                </div>
                {aiLoading && (
                  <div className="ai-thinking">
                    <span>{t.aiThinking}</span>
                    <div className="dot-pulse">
                      <span/><span/><span/>
                    </div>
                  </div>
                )}
                {aiA && (
                  <div className="ai-answer">
                    <div className="ai-answer-label">✅ {t.aiLabel}</div>
                    {aiA}
                  </div>
                )}
              </div>

              {/* AI TOOLS GRID */}
              <div style={{marginTop:48}}>
                <div className="sec-header">
                  <span className="sec-eyebrow">AI Features</span>
                  <h2 className="sec-title">What Can the AI Tutor Do?</h2>
                </div>
                <div className="services-grid">
                  {[
                    {icon:"✍️",title:"Essay Writer",desc:"Get help structuring, drafting and improving essays in any subject."},
                    {icon:"🔢",title:"Math Solver",desc:"Step-by-step solutions to algebra, calculus, statistics and more."},
                    {icon:"❓",title:"Quiz Generator",desc:"Generate practice questions and mock exams from any topic."},
                    {icon:"📅",title:"Study Planner",desc:"Get a personalized revision timetable based on your goals."},
                    {icon:"👨‍💻",title:"Code Helper",desc:"Debugging, explanation, and programming guidance in any language."},
                    {icon:"🌍",title:"Multilingual",desc:"Ask in English, French, Chinese, German, Kiswahili or British English."},
                  ].map((tool,i) => (
                    <div key={i} className="service-card">
                      <div className="service-icon">{tool.icon}</div>
                      <div className="service-title">{tool.title}</div>
                      <div className="service-desc">{tool.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TEACHERS ─────────────────────────────────────────────── */}
        {page === "teachers" && (
          <div className="section">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">Global Faculty</span>
                <h2 className="sec-title">{t.sections.meetTeachers}</h2>
                <p className="sec-desc">Qualified professors and specialist educators from universities worldwide</p>
              </div>
              <div className="teachers-grid">
                {TEACHERS.map((tc,i) => (
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
                    <div className="star-row">
                      <span className="stars">★★★★★</span>
                      <span className="rating-num">{tc.rating}</span>
                      <span className="reviews-cnt">({tc.reviews} reviews)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ABOUT ────────────────────────────────────────────────── */}
        {page === "about" && (
          <div className="section">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">Who We Are</span>
                <h2 className="sec-title">{t.sections.about}</h2>
                <p className="sec-desc">{t.aboutText}</p>
              </div>
              <div className="about-grid">
                <div className="about-card">
                  <div className="about-card-title">🎯 {t.mission}</div>
                  <div className="about-card-text">{t.missionText}</div>
                </div>
                <div className="about-card">
                  <div className="about-card-title">👥 {t.team}</div>
                  <div className="about-card-text">{t.teamText}</div>
                </div>
                <div className="about-card">
                  <div className="about-card-title">🌍 {t.reach}</div>
                  <div className="about-card-text">{t.reachText}</div>
                </div>
                <div className="about-card">
                  <div className="about-card-title">🤖 AI-Powered</div>
                  <div className="about-card-text">Our platform uses advanced AI (Claude by Anthropic) to provide instant, accurate answers to any question — in any of 6 languages — 24 hours a day, 7 days a week.</div>
                </div>
              </div>

              {/* STATS HIGHLIGHT */}
              <div style={{background:"linear-gradient(135deg,#003fa3,#0057d9)",borderRadius:20,padding:"40px 30px",marginTop:40,color:"#fff",textAlign:"center"}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,marginBottom:24}}>Our Impact in Numbers</h3>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:20}}>
                  {[["100K+","Students Worldwide"],["150+","Countries Served"],["500+","Past Papers"],["50+","Expert Teachers"],["6","Languages"],["24/7","AI Support"]].map(([n,l]) => (
                    <div key={l}>
                      <div style={{fontSize:34,fontWeight:900,color:"#4ea8ff"}}>{n}</div>
                      <div style={{fontSize:13,color:"rgba(255,255,255,0.75)",marginTop:4}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTACT ──────────────────────────────────────────────── */}
        {page === "contact" && (
          <div className="section">
            <div className="container">
              <div className="sec-header">
                <span className="sec-eyebrow">Get In Touch</span>
                <h2 className="sec-title">{t.sections.contact}</h2>
                <p className="sec-desc">We're here to help students and parents anywhere in the world.</p>
              </div>
              <div className="contact-grid">
                <div className="contact-info-card">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">📧</div>
                    <div>
                      <div className="contact-info-label">Email</div>
                      <div className="contact-info-val">{t.contactInfo.email}</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">💬</div>
                    <div>
                      <div className="contact-info-label">WhatsApp</div>
                      <div className="contact-info-val">{t.contactInfo.whatsapp}</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">🌐</div>
                    <div>
                      <div className="contact-info-label">Website</div>
                      <div className="contact-info-val">{t.contactInfo.website}</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">🕐</div>
                    <div>
                      <div className="contact-info-label">Support Hours</div>
                      <div className="contact-info-val">24/7 via AI Tutor</div>
                    </div>
                  </div>
                  <div style={{background:"#e8f1ff",borderRadius:12,padding:18,marginTop:8}}>
                    <div style={{fontWeight:700,color:"#0057d9",marginBottom:8}}>🤖 Need instant help?</div>
                    <div style={{fontSize:13.5,color:"#5a7090",marginBottom:12}}>Our AI Tutor answers any academic question in seconds, in your language.</div>
                    <button className="paper-btn" onClick={() => goPage("ai")}>{t.aiBtn} →</button>
                  </div>
                </div>

                <div className="contact-form-card">
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#1a2744",marginBottom:20}}>{t.sections.contact}</h3>
                  {contactSent ? (
                    <div className="success-msg">✅ Thank you! Your message has been sent. We'll reply within 24 hours.</div>
                  ) : (
                    <>
                      <div className="form-group">
                        <label className="form-label">{t.yourName}</label>
                        <input className="form-input" value={contactForm.name} onChange={e => setContactForm(f=>({...f,name:e.target.value}))} placeholder="John Smith"/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">{t.yourEmail}</label>
                        <input className="form-input" type="email" value={contactForm.email} onChange={e => setContactForm(f=>({...f,email:e.target.value}))} placeholder="john@example.com"/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">{t.yourMsg}</label>
                        <textarea className="form-textarea" value={contactForm.msg} onChange={e => setContactForm(f=>({...f,msg:e.target.value}))} placeholder="How can we help you?"/>
                      </div>
                      <button className="submit-btn" onClick={() => { if(contactForm.name&&contactForm.email&&contactForm.msg) setContactSent(true); }}>
                        {t.sendMsg} ✉️
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">🎓 {t.siteName}</div>
              <div className="footer-tagline">{t.footerMission}</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {LANGS.map(l => (
                  <span key={l.code} style={{cursor:"pointer",fontSize:20}} onClick={() => setLang(l.code)} title={l.label}>{l.label.split(" ")[0]}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-heading">Resources</div>
              {["papers","notes","ai","teachers"].map(p => (
                <span key={p} className="footer-link" onClick={() => goPage(p)}>{navIcons[p]} {t.nav[p]}</span>
              ))}
            </div>
            <div>
              <div className="footer-heading">Company</div>
              {["about","contact"].map(p => (
                <span key={p} className="footer-link" onClick={() => goPage(p)}>{navIcons[p]} {t.nav[p]}</span>
              ))}
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
            <span className="footer-mission">{t.footerMission}</span>
          </div>
        </footer>

      </div>
    </>
  );
}

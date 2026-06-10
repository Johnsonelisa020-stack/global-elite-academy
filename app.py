import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="Global Elite Academy",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit chrome
st.markdown("""
<style>
#MainMenu, footer, header, [data-testid="stToolbar"] {visibility: hidden; height: 0;}
.block-container {padding: 0 !important; max-width: 100% !important;}
.stApp {background: #000 !important;}
iframe {border: none !important;}
</style>
""", unsafe_allow_html=True)

ADSENSE_ID = "ca-pub-8024543613282871"

# Full React app embedded via HTML
html_code = f"""
<!DOCTYPE html>
<html lang="sw">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="Global Elite Academy - Mitihani, Notisi, AI Tools. Pre-school hadi Masters Tanzania."/>
<meta name="keywords" content="Global Elite Academy, NECTA, CSEE, ACSEE, PSLE, past papers, Tanzania education, university, masters"/>
<meta name="robots" content="index, follow"/>
<meta name="google-adsense-account" content="{ADSENSE_ID}"/>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE_ID}" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Merriweather:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{{margin:0;padding:0;box-sizing:border-box;}}
:root{{
  --primary:#1a56db;--primary-dark:#1e3a8a;--primary-light:#3b82f6;
  --accent:#f59e0b;--accent2:#10b981;--danger:#ef4444;
  --bg:#f0f4ff;--card:#fff;--text:#1e293b;--muted:#64748b;
  --sidebar:#0f172a;--nav-h:64px;
}}
html,body{{font-family:'Nunito',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;}}
::-webkit-scrollbar{{width:6px;}}::-webkit-scrollbar-track{{background:#f1f5f9;}}::-webkit-scrollbar-thumb{{background:#cbd5e1;border-radius:3px;}}
.app-shell{{display:flex;flex-direction:column;min-height:100vh;}}
/* TOP NAV */
.topnav{{position:fixed;top:0;left:0;right:0;height:var(--nav-h);background:var(--primary-dark);z-index:1000;display:flex;align-items:center;padding:0 16px;gap:12px;box-shadow:0 2px 20px rgba(0,0,0,0.3);}}
.nav-logo{{display:flex;align-items:center;gap:10px;text-decoration:none;flex:1;}}
.nav-logo-icon{{width:40px;height:40px;background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 4px 12px rgba(245,158,11,0.4);}}
.nav-logo-text{{color:#fff;font-size:16px;font-weight:800;line-height:1.2;}}
.nav-logo-sub{{color:#93c5fd;font-size:10px;font-weight:600;}}
.nav-search{{flex:2;max-width:400px;position:relative;}}
.nav-search input{{width:100%;padding:8px 16px 8px 40px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:25px;color:#fff;font-size:14px;outline:none;transition:all 0.3s;}}
.nav-search input::placeholder{{color:rgba(255,255,255,0.5);}}
.nav-search input:focus{{background:rgba(255,255,255,0.2);border-color:#3b82f6;}}
.nav-search-icon{{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.5);font-size:16px;}}
.nav-lang{{display:flex;gap:4px;}}
.lang-btn{{padding:5px 10px;border-radius:20px;border:1px solid rgba(255,255,255,0.3);background:transparent;color:#fff;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.2s;}}
.lang-btn.active{{background:#f59e0b;border-color:#f59e0b;color:#000;}}
.nav-menu-btn{{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:4px;display:none;}}
@media(max-width:768px){{.nav-search{{display:none;}}.nav-menu-btn{{display:block;}}.nav-logo-text{{font-size:13px;}}}}
/* SIDEBAR */
.sidebar{{position:fixed;top:var(--nav-h);left:0;width:260px;height:calc(100vh - var(--nav-h));background:var(--sidebar);overflow-y:auto;z-index:900;transition:transform 0.3s ease;padding-bottom:40px;}}
.sidebar.closed{{transform:translateX(-260px);}}
.sidebar-section{{padding:16px 16px 8px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;}}
.sidebar-item{{display:flex;align-items:center;gap:12px;padding:12px 20px;color:#cbd5e1;cursor:pointer;transition:all 0.2s;border-left:3px solid transparent;text-decoration:none;}}
.sidebar-item:hover{{background:rgba(59,130,246,0.1);color:#fff;border-left-color:#3b82f6;}}
.sidebar-item.active{{background:rgba(59,130,246,0.15);color:#60a5fa;border-left-color:#3b82f6;font-weight:700;}}
.sidebar-item-icon{{font-size:18px;width:24px;text-align:center;}}
.sidebar-badge{{margin-left:auto;background:#ef4444;color:#fff;font-size:10px;padding:2px 7px;border-radius:10px;font-weight:700;}}
.sidebar-new{{margin-left:auto;background:#10b981;color:#fff;font-size:10px;padding:2px 7px;border-radius:10px;font-weight:700;}}
/* MAIN */
.main-content{{margin-left:260px;margin-top:var(--nav-h);min-height:calc(100vh - var(--nav-h));transition:margin-left 0.3s;}}
.main-content.full{{margin-left:0;}}
@media(max-width:768px){{.main-content{{margin-left:0;}}.sidebar{{transform:translateX(-260px);}}.sidebar.open{{transform:translateX(0);}}}}
/* HERO */
.hero{{background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 40%,#1a56db 100%);padding:50px 32px;position:relative;overflow:hidden;}}
.hero::before{{content:'';position:absolute;top:-50%;right:-10%;width:600px;height:600px;background:radial-gradient(circle,rgba(245,158,11,0.15) 0%,transparent 70%);border-radius:50%;}}
.hero::after{{content:'';position:absolute;bottom:-30%;left:-5%;width:400px;height:400px;background:radial-gradient(circle,rgba(59,130,246,0.2) 0%,transparent 70%);border-radius:50%;}}
.hero-content{{max-width:700px;position:relative;z-index:1;}}
.hero-badge{{display:inline-flex;align-items:center;gap:6px;background:rgba(245,158,11,0.2);border:1px solid rgba(245,158,11,0.4);color:#fbbf24;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:20px;}}
.hero h1{{font-family:'Merriweather',serif;font-size:clamp(28px,5vw,52px);color:#fff;font-weight:900;line-height:1.15;margin-bottom:16px;}}
.hero h1 span{{color:#fbbf24;}}
.hero p{{color:#bfdbfe;font-size:clamp(14px,2vw,18px);line-height:1.7;margin-bottom:30px;}}
.hero-btns{{display:flex;flex-wrap:wrap;gap:12px;}}
.btn-hero-primary{{padding:14px 28px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;border:none;border-radius:12px;font-size:15px;font-weight:800;cursor:pointer;transition:all 0.3s;box-shadow:0 8px 25px rgba(245,158,11,0.4);}}
.btn-hero-primary:hover{{transform:translateY(-2px);box-shadow:0 12px 30px rgba(245,158,11,0.5);}}
.btn-hero-secondary{{padding:14px 28px;background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.3s;backdrop-filter:blur(10px);}}
.btn-hero-secondary:hover{{background:rgba(255,255,255,0.2);}}
.hero-stats{{display:flex;flex-wrap:wrap;gap:24px;margin-top:40px;}}
.hero-stat{{text-align:center;}}
.hero-stat-num{{font-size:28px;font-weight:900;color:#fbbf24;}}
.hero-stat-label{{font-size:12px;color:#93c5fd;font-weight:600;}}
/* LEVELS BAR */
.levels-bar{{background:#fff;padding:0;display:flex;overflow-x:auto;border-bottom:2px solid #e2e8f0;box-shadow:0 2px 10px rgba(0,0,0,0.05);}}
.level-tab{{padding:16px 24px;cursor:pointer;font-size:13px;font-weight:700;color:#64748b;white-space:nowrap;border-bottom:3px solid transparent;transition:all 0.2s;display:flex;align-items:center;gap:8px;}}
.level-tab:hover{{color:#1a56db;background:#f8faff;}}
.level-tab.active{{color:#1a56db;border-bottom-color:#1a56db;background:#f0f4ff;}}
.level-tab .level-icon{{font-size:18px;}}
/* PAGE CONTENT */
.page-pad{{padding:28px 24px;}}
.section-title{{font-size:20px;font-weight:800;color:#1e293b;margin-bottom:6px;display:flex;align-items:center;gap:10px;}}
.section-sub{{font-size:14px;color:#64748b;margin-bottom:24px;}}
/* SUBJECT GRID */
.subject-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;}}
.subject-card{{background:#fff;border-radius:16px;padding:20px 16px;text-align:center;cursor:pointer;transition:all 0.3s;box-shadow:0 2px 12px rgba(0,0,0,0.06);border:2px solid transparent;}}
.subject-card:hover{{transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,0,0,0.1);border-color:#3b82f6;}}
.subject-card.selected{{border-color:#1a56db;background:#f0f4ff;}}
.subject-icon{{font-size:36px;margin-bottom:10px;}}
.subject-name{{font-size:13px;font-weight:700;color:#1e293b;}}
.subject-count{{font-size:11px;color:#94a3b8;margin-top:4px;}}
/* PAPER LIST */
.paper-list{{display:flex;flex-direction:column;gap:12px;margin-top:20px;}}
.paper-item{{background:#fff;border-radius:14px;padding:18px 20px;display:flex;align-items:center;gap:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);transition:all 0.2s;cursor:pointer;border:1px solid #e2e8f0;}}
.paper-item:hover{{box-shadow:0 6px 20px rgba(0,0,0,0.1);transform:translateX(4px);border-color:#3b82f6;}}
.paper-icon{{width:50px;height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}}
.paper-icon.green{{background:#dcfce7;}}
.paper-icon.blue{{background:#dbeafe;}}
.paper-icon.orange{{background:#fef3c7;}}
.paper-icon.red{{background:#fee2e2;}}
.paper-info{{flex:1;}}
.paper-title{{font-size:15px;font-weight:700;color:#1e293b;}}
.paper-meta{{font-size:12px;color:#64748b;margin-top:4px;display:flex;gap:12px;flex-wrap:wrap;}}
.paper-tag{{padding:2px 10px;border-radius:8px;font-size:11px;font-weight:700;}}
.tag-necta{{background:#dbeafe;color:#1d4ed8;}}
.tag-uni{{background:#f3e8ff;color:#7c3aed;}}
.tag-mock{{background:#fef3c7;color:#92400e;}}
.paper-actions{{display:flex;gap:8px;}}
.btn-download{{padding:8px 16px;background:linear-gradient(135deg,#1a56db,#3b82f6);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;}}
.btn-download:hover{{transform:scale(1.05);box-shadow:0 4px 12px rgba(26,86,219,0.4);}}
.btn-preview{{padding:8px 16px;background:#f1f5f9;color:#64748b;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;}}
.btn-preview:hover{{background:#e2e8f0;color:#1e293b;}}
/* CARDS ROW */
.cards-row{{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;}}
.info-card{{background:#fff;border-radius:16px;padding:22px;box-shadow:0 2px 12px rgba(0,0,0,0.06);border-top:4px solid;transition:all 0.3s;}}
.info-card:hover{{transform:translateY(-3px);box-shadow:0 10px 25px rgba(0,0,0,0.1);}}
.info-card.blue{{border-top-color:#3b82f6;}}
.info-card.green{{border-top-color:#10b981;}}
.info-card.orange{{border-top-color:#f59e0b;}}
.info-card.purple{{border-top-color:#8b5cf6;}}
.info-card.red{{border-top-color:#ef4444;}}
.ic-icon{{font-size:28px;margin-bottom:12px;}}
.ic-title{{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:6px;}}
.ic-desc{{font-size:13px;color:#64748b;line-height:1.6;}}
/* AI CHAT */
.chat-container{{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);}}
.chat-header{{background:linear-gradient(135deg,#1a56db,#3b82f6);padding:18px 24px;display:flex;align-items:center;gap:12px;}}
.chat-avatar{{width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;}}
.chat-title{{color:#fff;font-weight:800;font-size:16px;}}
.chat-status{{color:#bfdbfe;font-size:12px;}}
.chat-messages{{height:320px;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:14px;background:#f8faff;}}
.msg{{max-width:80%;}}
.msg.bot{{align-self:flex-start;}}
.msg.user{{align-self:flex-end;}}
.msg-bubble{{padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.6;}}
.msg.bot .msg-bubble{{background:#fff;color:#1e293b;border-radius:4px 16px 16px 16px;box-shadow:0 2px 8px rgba(0,0,0,0.08);}}
.msg.user .msg-bubble{{background:linear-gradient(135deg,#1a56db,#3b82f6);color:#fff;border-radius:16px 4px 16px 16px;}}
.msg-time{{font-size:10px;color:#94a3b8;margin-top:4px;padding:0 4px;}}
.chat-input-row{{padding:16px;background:#fff;display:flex;gap:10px;border-top:1px solid #e2e8f0;}}
.chat-input{{flex:1;padding:12px 18px;border:2px solid #e2e8f0;border-radius:25px;font-size:14px;outline:none;font-family:'Nunito',sans-serif;transition:border-color 0.2s;}}
.chat-input:focus{{border-color:#3b82f6;}}
.chat-send{{padding:12px 20px;background:linear-gradient(135deg,#1a56db,#3b82f6);color:#fff;border:none;border-radius:25px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s;}}
.chat-send:hover{{transform:scale(1.05);}}
/* QUIZ */
.quiz-box{{background:#fff;border-radius:20px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,0.08);}}
.quiz-progress{{height:8px;background:#e2e8f0;border-radius:4px;margin-bottom:24px;overflow:hidden;}}
.quiz-progress-fill{{height:100%;background:linear-gradient(90deg,#1a56db,#10b981);border-radius:4px;transition:width 0.5s;}}
.quiz-q{{font-size:18px;font-weight:700;color:#1e293b;margin-bottom:24px;line-height:1.5;}}
.quiz-options{{display:flex;flex-direction:column;gap:12px;}}
.quiz-opt{{padding:14px 20px;background:#f8faff;border:2px solid #e2e8f0;border-radius:12px;cursor:pointer;font-size:14px;font-weight:600;color:#374151;transition:all 0.2s;text-align:left;}}
.quiz-opt:hover{{border-color:#3b82f6;background:#eff6ff;color:#1a56db;}}
.quiz-opt.correct{{background:#dcfce7;border-color:#10b981;color:#065f46;}}
.quiz-opt.wrong{{background:#fee2e2;border-color:#ef4444;color:#991b1b;}}
/* BREADCRUMB */
.breadcrumb{{display:flex;align-items:center;gap:8px;font-size:13px;color:#94a3b8;margin-bottom:20px;flex-wrap:wrap;}}
.breadcrumb-item{{cursor:pointer;color:#3b82f6;font-weight:600;}}
.breadcrumb-sep{{color:#cbd5e1;}}
/* TABS */
.tab-row{{display:flex;gap:4px;background:#f1f5f9;padding:4px;border-radius:14px;margin-bottom:24px;overflow-x:auto;}}
.tab{{padding:10px 18px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700;color:#64748b;white-space:nowrap;transition:all 0.2s;border:none;background:transparent;}}
.tab.active{{background:#fff;color:#1a56db;box-shadow:0 2px 8px rgba(0,0,0,0.08);}}
/* SEARCH RESULTS */
.search-result{{background:#fff;border-radius:14px;padding:16px 20px;border-left:4px solid #3b82f6;box-shadow:0 2px 10px rgba(0,0,0,0.05);margin-bottom:12px;cursor:pointer;transition:all 0.2s;}}
.search-result:hover{{box-shadow:0 6px 20px rgba(0,0,0,0.1);transform:translateX(4px);}}
.sr-title{{font-size:15px;font-weight:700;color:#1e293b;}}
.sr-path{{font-size:12px;color:#3b82f6;margin:4px 0;}}
.sr-desc{{font-size:13px;color:#64748b;}}
/* MOBILE BOTTOM NAV */
.bottom-nav{{display:none;position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #e2e8f0;z-index:1000;padding:8px 0 env(safe-area-inset-bottom);box-shadow:0 -4px 20px rgba(0,0,0,0.1);}}
.bottom-nav-inner{{display:flex;justify-content:space-around;}}
.bn-item{{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 12px;cursor:pointer;color:#94a3b8;transition:all 0.2s;border-radius:10px;}}
.bn-item.active{{color:#1a56db;}}
.bn-icon{{font-size:20px;}}
.bn-label{{font-size:10px;font-weight:700;}}
@media(max-width:768px){{.bottom-nav{{display:block;}}.main-content{{padding-bottom:70px;}}}}
/* TOAST */
.toast{{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(100px);background:#1e293b;color:#fff;padding:12px 24px;border-radius:25px;font-size:14px;font-weight:600;z-index:9999;transition:transform 0.3s;pointer-events:none;}}
.toast.show{{transform:translateX(-50%) translateY(0);}}
/* AD */
.ad-slot{{background:linear-gradient(135deg,#f8faff,#eff6ff);border:2px dashed #bfdbfe;border-radius:14px;padding:20px;text-align:center;color:#94a3b8;font-size:13px;margin:20px 0;}}
/* CONTACT FORM */
.form-group{{margin-bottom:16px;}}
.form-label{{display:block;font-size:13px;font-weight:700;color:#374151;margin-bottom:6px;}}
.form-input{{width:100%;padding:12px 16px;border:2px solid #e2e8f0;border-radius:12px;font-size:14px;font-family:'Nunito',sans-serif;outline:none;transition:border-color 0.2s;}}
.form-input:focus{{border-color:#3b82f6;}}
.form-textarea{{width:100%;padding:12px 16px;border:2px solid #e2e8f0;border-radius:12px;font-size:14px;font-family:'Nunito',sans-serif;outline:none;resize:vertical;min-height:120px;transition:border-color 0.2s;}}
.form-textarea:focus{{border-color:#3b82f6;}}
.btn-submit{{width:100%;padding:14px;background:linear-gradient(135deg,#1a56db,#3b82f6);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:800;cursor:pointer;transition:all 0.3s;}}
.btn-submit:hover{{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,86,219,0.4);}}
/* ANNOUNCEMENT */
.announcement{{background:linear-gradient(90deg,#dc2626,#ef4444);color:#fff;padding:10px 20px;font-size:13px;font-weight:700;text-align:center;cursor:pointer;}}
/* OVERLAY */
.overlay{{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:850;}}
.overlay.show{{display:block;}}
/* Footer */
.footer{{background:#0f172a;color:#94a3b8;padding:40px 24px;text-align:center;}}
.footer-logo{{font-family:'Merriweather',serif;font-size:22px;color:#fff;font-weight:900;margin-bottom:10px;}}
.footer-links{{display:flex;justify-content:center;flex-wrap:wrap;gap:16px;margin:16px 0;}}
.footer-link{{color:#64748b;font-size:13px;cursor:pointer;transition:color 0.2s;}}
.footer-link:hover{{color:#3b82f6;}}
.footer-copy{{font-size:12px;color:#475569;margin-top:16px;}}
</style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
const {{useState, useEffect, useRef, useCallback}} = React;

// ── TRANSLATIONS ──────────────────────────────────────────
const T = {{
  sw: {{
    tagline: "Elimu Bora kwa Kila Mtanzania",
    heroTitle: ["Jifunze Leo,", "Fanikisha ", "Kesho"],
    heroDesc: "Maktaba kubwa zaidi ya mitihani, notisi, na zana za AI kwa wanafunzi wa PreSchool hadi Uzamili Tanzania.",
    explorePapers: "Tazama Mitihani",
    startQuiz: "Jaribu Quiz",
    searchPlaceholder: "Tafuta masomo, mitihani, notisi...",
    levels: ["PreSchool","Msingi","Sekondari","Kidato cha 5-6","Chuo Kikuu","Uzamili"],
    navItems: ["Nyumbani","Mitihani","Notisi","Quiz","AI Msaada","Wasiliana"],
    subjects: "Masomo",
    recentPapers: "Mitihani ya Hivi Karibuni",
    downloadPaper: "Pakua",
    previewPaper: "Angalia",
    askAI: "Uliza AI",
    typeMessage: "Andika swali lako...",
    send: "Tuma",
    noResult: "Hakuna matokeo. Jaribu maneno mengine.",
    stats: ["500+ Mitihani","200+ Notisi","10K+ Wanafunzi","6 Zana za AI"],
    statLabels: ["Mitihani Iliyopita","Notisi za Masomo","Wanafunzi","Zana za AI"],
    announcement: "🔔 NECTA CSEE 2024 Matokeo Yatoka! Bonyeza hapa kupata maelezo →",
    contactTitle: "Wasiliana Nasi",
    name: "Jina lako", email: "Barua pepe", message: "Ujumbe wako", sendMsg: "Tuma Ujumbe",
    aboutTitle: "Kuhusu Global Elite Academy",
    aboutDesc: "Tulianzishwa mwaka 2020 kwa lengo la kuleta elimu bora, rahisi na ya kisasa kwa kila mwanafunzi Tanzania — kutoka watoto wadogo hadi wanafunzi wa uzamili.",
    quizTitle: "Jipime Sasa",
    quizCorrect: "Jibu Sahihi! 🎉",
    quizWrong: "Jibu Si Sahihi 😔",
    nextQ: "Swali Lijalo",
    quizDone: "Umekamilisha!",
    score: "Alama",
    retake: "Jaribu Tena",
  }},
  en: {{
    tagline: "Quality Education for Every Tanzanian",
    heroTitle: ["Learn Today,", "Achieve ", "Tomorrow"],
    heroDesc: "Tanzania's largest library of past papers, notes, and AI tools for students from PreSchool to Masters level.",
    explorePapers: "Explore Papers",
    startQuiz: "Try a Quiz",
    searchPlaceholder: "Search subjects, papers, notes...",
    levels: ["PreSchool","Primary","Secondary","Form 5-6","University","Masters"],
    navItems: ["Home","Past Papers","Notes","Quiz","AI Help","Contact"],
    subjects: "Subjects",
    recentPapers: "Recent Past Papers",
    downloadPaper: "Download",
    previewPaper: "Preview",
    askAI: "Ask AI",
    typeMessage: "Type your question...",
    send: "Send",
    noResult: "No results found. Try different keywords.",
    stats: ["500+ Papers","200+ Notes","10K+ Students","6 AI Tools"],
    statLabels: ["Past Papers","Study Notes","Students","AI Tools"],
    announcement: "🔔 NECTA CSEE 2024 Results Released! Tap here for details →",
    contactTitle: "Contact Us",
    name: "Your name", email: "Email address", message: "Your message", sendMsg: "Send Message",
    aboutTitle: "About Global Elite Academy",
    aboutDesc: "Founded in 2020 to bring quality, accessible, modern education to every Tanzanian student — from young children to masters-level graduates.",
    quizTitle: "Test Yourself Now",
    quizCorrect: "Correct Answer! 🎉",
    quizWrong: "Wrong Answer 😔",
    nextQ: "Next Question",
    quizDone: "Quiz Complete!",
    score: "Score",
    retake: "Try Again",
  }}
}};

// ── DATA ────────────────────────────────────────────────
const LEVELS = ["PreSchool","Primary","Secondary","Form5-6","University","Masters"];

const SUBJECTS = {{
  PreSchool:   [{{icon:"🎨",name:"Drawing & Art",n:12}},{{icon:"🔢",name:"Numbers",n:20}},{{icon:"🔤",name:"Alphabet",n:18}},{{icon:"🌈",name:"Colours",n:8}}],
  Primary:     [{{icon:"➕",name:"Mathematics",n:45}},{{icon:"📖",name:"English",n:38}},{{icon:"🌿",name:"Science",n:32}},{{icon:"🗺️",name:"Social Studies",n:28}},{{icon:"💬",name:"Kiswahili",n:42}},{{icon:"🎵",name:"Music & Art",n:15}}],
  Secondary:   [{{icon:"📐",name:"Mathematics",n:60}},{{icon:"⚡",name:"Physics",n:54}},{{icon:"🧪",name:"Chemistry",n:48}},{{icon:"🧬",name:"Biology",n:52}},{{icon:"📖",name:"English",n:45}},{{icon:"💬",name:"Kiswahili",n:40}},{{icon:"🌍",name:"Geography",n:38}},{{icon:"📜",name:"History",n:36}}],
  "Form5-6":   [{{icon:"📐",name:"Advanced Maths",n:40}},{{icon:"⚡",name:"Physics",n:36}},{{icon:"🧪",name:"Chemistry",n:34}},{{icon:"🧬",name:"Biology",n:30}},{{icon:"📊",name:"Economics",n:28}},{{icon:"📜",name:"History",n:25}},{{icon:"🌍",name:"Geography",n:22}}],
  University:  [{{icon:"💻",name:"Computer Science",n:30}},{{icon:"🔢",name:"Discrete Maths",n:18}},{{icon:"🏦",name:"Accounting",n:24}},{{icon:"⚖️",name:"Law",n:20}},{{icon:"🏗️",name:"Engineering",n:22}},{{icon:"💊",name:"Medicine",n:16}},{{icon:"📈",name:"Business",n:28}}],
  Masters:     [{{icon:"🔬",name:"Research Methods",n:12}},{{icon:"📊",name:"Statistics",n:14}},{{icon:"💼",name:"Management",n:10}},{{icon:"🌐",name:"International Studies",n:8}}],
}};

const PAPERS = [
  {{id:1,title:"CSEE Mathematics 2023",level:"Secondary",org:"NECTA",year:2023,subject:"Mathematics",type:"necta",icon:"📐",color:"blue"}},
  {{id:2,title:"CSEE Physics 2023",level:"Secondary",org:"NECTA",year:2023,subject:"Physics",type:"necta",icon:"⚡",color:"orange"}},
  {{id:3,title:"CSEE Chemistry 2023",level:"Secondary",org:"NECTA",year:2023,subject:"Chemistry",type:"necta",icon:"🧪",color:"green"}},
  {{id:4,title:"CSEE Biology 2023",level:"Secondary",org:"NECTA",year:2023,subject:"Biology",type:"necta",icon:"🧬",color:"green"}},
  {{id:5,title:"CSEE English 2023",level:"Secondary",org:"NECTA",year:2023,subject:"English",type:"necta",icon:"📖",color:"blue"}},
  {{id:6,title:"CSEE Kiswahili 2023",level:"Secondary",org:"NECTA",year:2023,subject:"Kiswahili",type:"necta",icon:"💬",color:"orange"}},
  {{id:7,title:"ACSEE Advanced Maths 2023",level:"Form5-6",org:"NECTA",year:2023,subject:"Advanced Maths",type:"necta",icon:"📐",color:"blue"}},
  {{id:8,title:"ACSEE Physics 2023",level:"Form5-6",org:"NECTA",year:2023,subject:"Physics",type:"necta",icon:"⚡",color:"orange"}},
  {{id:9,title:"PSLE Mathematics 2023",level:"Primary",org:"NECTA",year:2023,subject:"Mathematics",type:"necta",icon:"➕",color:"green"}},
  {{id:10,title:"PSLE English 2023",level:"Primary",org:"NECTA",year:2023,subject:"English",type:"necta",icon:"📖",color:"blue"}},
  {{id:11,title:"PSLE Kiswahili 2023",level:"Primary",org:"NECTA",year:2023,subject:"Kiswahili",type:"necta",icon:"💬",color:"orange"}},
  {{id:12,title:"Discrete Mathematics (CSU 07212) 2024",level:"University",org:"IAA",year:2024,subject:"Discrete Maths",type:"uni",icon:"🔢",color:"blue"}},
  {{id:13,title:"Programming Fundamentals 2024",level:"University",org:"IAA",year:2024,subject:"Computer Science",type:"uni",icon:"💻",color:"green"}},
  {{id:14,title:"Database Systems 2023",level:"University",org:"IAA",year:2023,subject:"Computer Science",type:"uni",icon:"🗄️",color:"orange"}},
  {{id:15,title:"CSEE Mathematics 2022",level:"Secondary",org:"NECTA",year:2022,subject:"Mathematics",type:"necta",icon:"📐",color:"blue"}},
  {{id:16,title:"CSEE Physics 2022",level:"Secondary",org:"NECTA",year:2022,subject:"Physics",type:"necta",icon:"⚡",color:"orange"}},
  {{id:17,title:"CSEE Mathematics 2021",level:"Secondary",org:"NECTA",year:2021,subject:"Mathematics",type:"necta",icon:"📐",color:"blue"}},
  {{id:18,title:"CSEE Geography 2023",level:"Secondary",org:"NECTA",year:2023,subject:"Geography",type:"necta",icon:"🌍",color:"green"}},
  {{id:19,title:"CSEE History 2023",level:"Secondary",org:"NECTA",year:2023,subject:"History",type:"necta",icon:"📜",color:"orange"}},
  {{id:20,title:"Mock Exam Mathematics 2024",level:"Secondary",org:"Mock",year:2024,subject:"Mathematics",type:"mock",icon:"📐",color:"red"}},
  {{id:21,title:"Mock Exam English 2024",level:"Secondary",org:"Mock",year:2024,subject:"English",type:"mock",icon:"📖",color:"red"}},
  {{id:22,title:"Accounting Fundamentals 2023",level:"University",org:"UDSM",year:2023,subject:"Accounting",type:"uni",icon:"🏦",color:"blue"}},
  {{id:23,title:"Research Methods 2023",level:"Masters",org:"UDSM",year:2023,subject:"Research Methods",type:"uni",icon:"🔬",color:"green"}},
  {{id:24,title:"PreSchool Reading Test 2024",level:"PreSchool",org:"SCHOOL",year:2024,subject:"Alphabet",type:"mock",icon:"🔤",color:"orange"}},
  {{id:25,title:"Primary Science 2022",level:"Primary",org:"NECTA",year:2022,subject:"Science",type:"necta",icon:"🌿",color:"green"}},
  {{id:26,title:"Primary Mathematics 2022",level:"Primary",org:"NECTA",year:2022,subject:"Mathematics",type:"necta",icon:"➕",color:"blue"}},
  {{id:27,title:"ACSEE Chemistry 2023",level:"Form5-6",org:"NECTA",year:2023,subject:"Chemistry",type:"necta",icon:"🧪",color:"green"}},
  {{id:28,title:"ACSEE Biology 2023",level:"Form5-6",org:"NECTA",year:2023,subject:"Biology",type:"necta",icon:"🧬",color:"orange"}},
  {{id:29,title:"Business Management 2023",level:"University",org:"UDSM",year:2023,subject:"Business",type:"uni",icon:"📈",color:"blue"}},
  {{id:30,title:"Statistics for Masters 2022",level:"Masters",org:"UDSM",year:2022,subject:"Statistics",type:"uni",icon:"📊",color:"orange"}},
];

const QUIZZES = {{
  sw: [
    {{q:"Jibu la 15 × 12 ni lipi?",opts:["150","180","170","160"],ans:1}},
    {{q:"Mji mkuu wa Tanzania ni upi?",opts:["Dar es Salaam","Arusha","Dodoma","Mwanza"],ans:2}},
    {{q:"H₂O ni formula ya kemikali ya nini?",opts:["Oksijeni","Maji","Hidrojeni","Chumvi"],ans:1}},
    {{q:"Mwili wa binadamu una mifupa mingapi?",opts:["106","206","306","406"],ans:1}},
    {{q:"Sayari kubwa zaidi katika mfumo wa jua ni ipi?",opts:["Dunia","Zohali","Jupiter","Uranus"],ans:2}},
  ],
  en: [
    {{q:"What is 15 × 12?",opts:["150","180","170","160"],ans:1}},
    {{q:"What is the capital city of Tanzania?",opts:["Dar es Salaam","Arusha","Dodoma","Mwanza"],ans:2}},
    {{q:"H₂O is the chemical formula for?",opts:["Oxygen","Water","Hydrogen","Salt"],ans:1}},
    {{q:"How many bones does the human body have?",opts:["106","206","306","406"],ans:1}},
    {{q:"The largest planet in the solar system is?",opts:["Earth","Saturn","Jupiter","Uranus"],ans:2}},
  ]
}};

const AI_RESPONSES = {{
  sw: [
    "Swali zuri! Naelewa unauliza kuhusu hilo. Kwa maelezo kamili, ningependa kukuambia kwamba... (Unganisha API ya AI kwa majibu kamili ya moja kwa moja kutoka kwa AI)",
    "Asante kwa swali lako! Katika masomo ya Tanzania, hii ni mada muhimu sana. Fikiria jinsi hii inavyohusiana na mtaala wa NECTA...",
    "Jibu fupi: Ndio, hiyo ni sahihi. Jibu refu linahitaji uelewa wa kina zaidi wa mada hii. Ningependekeza usome notisi zaidi kuhusu hilo.",
  ],
  en: [
    "Great question! This is an important topic in Tanzanian education. Let me explain... (Connect AI API for full real-time responses)",
    "Thanks for asking! In the context of the NECTA curriculum, this concept is very relevant. Consider how it applies to your exam preparation...",
    "Short answer: Yes, that's correct. For a deeper explanation, I'd recommend reviewing the notes section on this topic.",
  ]
}};

// ── MAIN APP ─────────────────────────────────────────────
function App() {{
  const [lang, setLang] = useState('sw');
  const [page, setPage] = useState('home');
  const [level, setLevel] = useState('Secondary');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    {{role:'bot', text: lang==='sw' ? 'Habari! Mimi ni AI Msaada wako. Niulize swali lolote la masomo! 📚' : 'Hello! I am your AI Study Assistant. Ask me any academic question! 📚', time: 'Sasa hivi'}}
  ]);
  const [chatInput, setChatInput] = useState('');
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [contactSent, setContactSent] = useState(false);
  const chatEnd = useRef(null);
  const t = T[lang];

  const levelMap = {{
    PreSchool: t.levels[0], Primary: t.levels[1], Secondary: t.levels[2],
    "Form5-6": t.levels[3], University: t.levels[4], Masters: t.levels[5]
  }};

  useEffect(() => {{
    if(chatEnd.current) chatEnd.current.scrollIntoView({{behavior:'smooth'}});
  }}, [chatMessages]);

  useEffect(() => {{
    if(searchQuery.length > 1) {{
      const q = searchQuery.toLowerCase();
      const res = PAPERS.filter(p =>
        p.title.toLowerCase().includes(q) || p.subject.toLowerCase().includes(q) ||
        p.level.toLowerCase().includes(q) || p.org.toLowerCase().includes(q)
      ).slice(0, 6);
      setSearchResults(res);
    }} else setSearchResults([]);
  }}, [searchQuery]);

  const showToast = (msg) => {{
    setToast(msg); setToastVisible(true);
    setTimeout(()=>setToastVisible(false), 2500);
  }};

  const handleNav = (p) => {{
    setPage(p);
    if(window.innerWidth <= 768) setSidebarOpen(false);
    setSelectedSubject(null);
    window.scrollTo({{top:0, behavior:'smooth'}});
  }};

  const sendChat = () => {{
    if(!chatInput.trim()) return;
    const userMsg = {{role:'user', text: chatInput, time: new Date().toLocaleTimeString('sw',{{hour:'2-digit',minute:'2-digit'}})}};
    const responses = AI_RESPONSES[lang];
    const botMsg = {{role:'bot', text: responses[Math.floor(Math.random()*responses.length)], time: new Date().toLocaleTimeString('sw',{{hour:'2-digit',minute:'2-digit'}})}};
    setChatMessages(prev => [...prev, userMsg, botMsg]);
    setChatInput('');
  }};

  const handleQuizOpt = (i) => {{
    if(quizSelected !== null) return;
    setQuizSelected(i);
    const correct = QUIZZES[lang][quizIdx].ans === i;
    if(correct) setQuizScore(s=>s+1);
    showToast(correct ? t.quizCorrect : t.quizWrong);
    setTimeout(()=>{{
      if(quizIdx < QUIZZES[lang].length - 1) {{setQuizIdx(q=>q+1); setQuizSelected(null);}}
      else setQuizDone(true);
    }}, 1200);
  }};

  const resetQuiz = () => {{setQuizIdx(0);setQuizSelected(null);setQuizScore(0);setQuizDone(false);}};

  const filteredPapers = PAPERS.filter(p => {{
    const matchLevel = p.level === level || level === 'All';
    const matchTab = activeTab === 'all' || p.type === activeTab;
    const matchSubject = !selectedSubject || p.subject === selectedSubject;
    return matchLevel && matchTab && matchSubject;
  }});

  const navIcons = ['🏠','📄','📚','🧪','🤖','📞'];
  const navPages = ['home','papers','notes','quiz','ai','contact'];

  return (
    <div className="app-shell">
      {{/* ANNOUNCEMENT */}}
      <div className="announcement" onClick={{()=>showToast(t.announcement)}}>
        {{t.announcement}}
      </div>

      {{/* TOP NAV */}}
      <nav className="topnav">
        <button className="nav-menu-btn" onClick={{()=>setSidebarOpen(o=>!o)}}>☰</button>
        <a className="nav-logo" onClick={{()=>handleNav('home')}}>
          <div className="nav-logo-icon">🎓</div>
          <div>
            <div className="nav-logo-text">Global Elite Academy</div>
            <div className="nav-logo-sub">{{t.tagline}}</div>
          </div>
        </a>
        <div className="nav-search">
          <span className="nav-search-icon">🔍</span>
          <input
            value={{searchQuery}}
            onChange={{e=>setSearchQuery(e.target.value)}}
            onFocus={{()=>setPage('search')}}
            placeholder={{t.searchPlaceholder}}
          />
        </div>
        <div className="nav-lang">
          <button className={{`lang-btn ${{lang==='sw'?'active':''}}`}} onClick={{()=>setLang('sw')}}>SW</button>
          <button className={{`lang-btn ${{lang==='en'?'active':''}}`}} onClick={{()=>setLang('en')}}>EN</button>
        </div>
      </nav>

      {{/* OVERLAY */}}
      <div className={{`overlay ${{sidebarOpen && window.innerWidth<=768 ? 'show':''}}`}}
           onClick={{()=>setSidebarOpen(false)}}/>

      {{/* SIDEBAR */}}
      <aside className={{`sidebar ${{sidebarOpen?'open':'closed'}}`}}>
        <div className="sidebar-section">NAVIGATION</div>
        {{navPages.map((p,i)=>(
          <div key={{p}} className={{`sidebar-item ${{page===p?'active':''}}`}} onClick={{()=>handleNav(p)}}>
            <span className="sidebar-item-icon">{{navIcons[i]}}</span>
            <span>{{t.navItems[i]}}</span>
            {{p==='papers' && <span className="sidebar-badge">NEW</span>}}
          </div>
        ))}}
        <div className="sidebar-section" style={{{{marginTop:16}}}}>VIWANGO / LEVELS</div>
        {{LEVELS.map((lv,i)=>(
          <div key={{lv}} className={{`sidebar-item ${{level===lv?'active':''}}`}}
               onClick={{()=>{{setLevel(lv);handleNav('papers');}}}}>
            <span className="sidebar-item-icon">{{['🌱','🏫','🏛️','📘','🎓','🔬'][i]}}</span>
            <span>{{t.levels[i]}}</span>
          </div>
        ))}}
        <div className="ad-slot" style={{{{margin:'16px',borderRadius:12}}}}>
          <ins className="adsbygoogle"
            style={{{{display:'block'}}}}
            data-ad-client="{ADSENSE_ID}"
            data-ad-slot="auto"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <script dangerouslySetInnerHTML={{{{__html:'(adsbygoogle=window.adsbygoogle||[]).push({{}});'}}}}/>
          📢 Ad Space
        </div>
      </aside>

      {{/* MAIN */}}
      <main className={{`main-content ${{sidebarOpen && window.innerWidth>768 ?'':'full'}}`}}>

        {{/* ── HOME ── */}}
        {{page === 'home' && (
          <>
            <section className="hero">
              <div className="hero-content">
                <div className="hero-badge">🇹🇿 Tanzania's #1 Education Platform</div>
                <h1>{{t.heroTitle[0]}}<br/>{{t.heroTitle[1]}}<span>{{t.heroTitle[2]}}</span></h1>
                <p>{{t.heroDesc}}</p>
                <div className="hero-btns">
                  <button className="btn-hero-primary" onClick={{()=>handleNav('papers')}}>📄 {{t.explorePapers}}</button>
                  <button className="btn-hero-secondary" onClick={{()=>handleNav('quiz')}}>🧪 {{t.startQuiz}}</button>
                  <button className="btn-hero-secondary" onClick={{()=>handleNav('ai')}}>🤖 {{t.askAI}}</button>
                </div>
                <div className="hero-stats">
                  {{t.statLabels.map((label,i)=>(
                    <div className="hero-stat" key={{i}}>
                      <div className="hero-stat-num">{{t.stats[i].split(' ')[0]}}</div>
                      <div className="hero-stat-label">{{label}}</div>
                    </div>
                  ))}}
                </div>
              </div>
            </section>

            <div className="levels-bar">
              {{LEVELS.map((lv,i)=>(
                <div key={{lv}} className={{`level-tab ${{level===lv?'active':''}}`}}
                     onClick={{()=>{{setLevel(lv);handleNav('papers');}}}}>
                  <span className="level-icon">{{['🌱','🏫','🏛️','📘','🎓','🔬'][i]}}</span>
                  {{t.levels[i]}}
                </div>
              ))}}
            </div>

            <div className="page-pad">
              <div className="ad-slot">
                <ins className="adsbygoogle" style={{{{display:'block'}}}}
                  data-ad-client="{ADSENSE_ID}" data-ad-slot="auto"
                  data-ad-format="auto" data-full-width-responsive="true"></ins>
                <script dangerouslySetInnerHTML={{{{__html:'(adsbygoogle=window.adsbygoogle||[]).push({{}});'}}}}/>
                📢 Advertisement
              </div>

              <div className="section-title">📚 {{t.subjects}} — {{levelMap[level]}}</div>
              <div className="section-sub">{{lang==='sw'?`Masomo yanayopatikana kwa ${levelMap[level]}`:`Subjects available for ${levelMap[level]}`}}</div>
              <div className="subject-grid">
                {{(SUBJECTS[level]||[]).map((s,i)=>(
                  <div key={{i}} className={{`subject-card ${{selectedSubject===s.name?'selected':''}}`}}
                       onClick={{()=>{{setSelectedSubject(s.name===selectedSubject?null:s.name);handleNav('papers');}}}}>
                    <div className="subject-icon">{{s.icon}}</div>
                    <div className="subject-name">{{s.name}}</div>
                    <div className="subject-count">{{s.n}} {{lang==='sw'?'Mitihani':'Papers'}}</div>
                  </div>
                ))}}
              </div>

              <div style={{{{marginTop:32}}}}>
                <div className="section-title">📋 {{t.recentPapers}}</div>
                <div className="section-sub">{{lang==='sw'?'Mitihani 5 ya hivi karibuni':'5 most recent past papers'}}</div>
                <div className="paper-list">
                  {{PAPERS.slice(0,5).map(p=>(
                    <PaperItem key={{p.id}} paper={{p}} t={{t}} lang={{lang}} onDownload={{()=>showToast(lang==='sw'?`Inapakua: ${{p.title}}`:`Downloading: ${{p.title}}`)}}/>
                  ))}}
                </div>
              </div>

              <div style={{{{marginTop:32}}}}>
                <div className="section-title">🤖 AI {{lang==='sw'?'Msaada wa Haraka':'Quick Help'}}</div>
                <AIChat messages={{chatMessages}} input={{chatInput}} setInput={{setChatInput}} onSend={{sendChat}} chatEnd={{chatEnd}} t={{t}}/>
              </div>
            </div>
          </>
        )}}

        {{/* ── PAPERS ── */}}
        {{page === 'papers' && (
          <div className="page-pad">
            <div className="breadcrumb">
              <span className="breadcrumb-item" onClick={{()=>handleNav('home')}}>🏠 {{lang==='sw'?'Nyumbani':'Home'}}</span>
              <span className="breadcrumb-sep">›</span>
              <span>{{lang==='sw'?'Mitihani':'Papers'}}</span>
              <span className="breadcrumb-sep">›</span>
              <span style={{{{color:'#1a56db',fontWeight:700}}}}>{{levelMap[level]}}</span>
            </div>

            <div className="levels-bar" style={{{{position:'sticky',top:64,zIndex:50,margin:'0 -24px',padding:'0 24px'}}}}>
              {{LEVELS.map((lv,i)=>(
                <div key={{lv}} className={{`level-tab ${{level===lv?'active':''}}`}} onClick={{()=>{{setLevel(lv);setSelectedSubject(null);}}}}>
                  <span className="level-icon">{{['🌱','🏫','🏛️','📘','🎓','🔬'][i]}}</span>
                  {{t.levels[i]}}
                </div>
              ))}}
            </div>

            <div style={{{{marginTop:20}}}}>
              <div className="section-title">📄 {{lang==='sw'?'Mitihani':'Past Papers'}} — {{levelMap[level]}}</div>
              <div className="section-sub">{{filteredPapers.length}} {{lang==='sw'?'mitihani inapatikana':'papers available'}}</div>

              <div className="tab-row">
                {{[['all',lang==='sw'?'Zote':'All'],['necta','NECTA'],['uni',lang==='sw'?'Chuo':'University'],['mock','Mock']].map(([k,label])=>(
                  <button key={{k}} className={{`tab ${{activeTab===k?'active':''}}`}} onClick={{()=>setActiveTab(k)}}>{{label}}</button>
                ))}}
              </div>

              {{selectedSubject && (
                <div style={{{{background:'#eff6ff',padding:'10px 16px',borderRadius:10,marginBottom:16,fontSize:13,color:'#1d4ed8',fontWeight:700,display:'flex',justifyContent:'space-between',alignItems:'center'}}}}>
                  <span>🔍 {{selectedSubject}}</span>
                  <button onClick={{()=>setSelectedSubject(null)}} style={{{{background:'none',border:'none',cursor:'pointer',fontSize:16,color:'#64748b'}}}}>✕</button>
                </div>
              )}}

              <div className="ad-slot">
                <ins className="adsbygoogle" style={{{{display:'block'}}}}
                  data-ad-client="{ADSENSE_ID}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
                <script dangerouslySetInnerHTML={{{{__html:'(adsbygoogle=window.adsbygoogle||[]).push({{}});'}}}}/>
                📢 Advertisement
              </div>

              {{filteredPapers.length > 0 ? (
                <div className="paper-list">
                  {{filteredPapers.map(p=>(
                    <PaperItem key={{p.id}} paper={{p}} t={{t}} lang={{lang}} onDownload={{()=>showToast(lang==='sw'?`Inapakua: ${{p.title}}`:`Downloading: ${{p.title}}`)}}/>
                  ))}}
                </div>
              ) : (
                <div style={{{{textAlign:'center',padding:40,color:'#94a3b8'}}}}>
                  <div style={{{{fontSize:48}}}}>📭</div>
                  <p style={{{{marginTop:12,fontWeight:700}}}}>{{lang==='sw'?'Hakuna mitihani kwa vichujio hivi':'No papers match these filters'}}</p>
                </div>
              )}}
            </div>
          </div>
        )}}

        {{/* ── NOTES ── */}}
        {{page === 'notes' && (
          <div className="page-pad">
            <div className="section-title">📚 {{lang==='sw'?'Notisi za Masomo':'Study Notes'}}</div>
            <div className="section-sub">{{lang==='sw'?'Notisi zilizokaguliwa na wataalam':'Expert-reviewed study notes'}}</div>

            <div className="levels-bar" style={{{{margin:'0 -24px 20px',padding:'0 24px'}}}}>
              {{LEVELS.map((lv,i)=>(
                <div key={{lv}} className={{`level-tab ${{level===lv?'active':''}}`}} onClick={{()=>setLevel(lv)}}>
                  {{t.levels[i]}}
                </div>
              ))}}
            </div>

            <div className="ad-slot">
              <ins className="adsbygoogle" style={{{{display:'block'}}}} data-ad-client="{ADSENSE_ID}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
              <script dangerouslySetInnerHTML={{{{__html:'(adsbygoogle=window.adsbygoogle||[]).push({{}});'}}}}/>
              📢 Advertisement
            </div>

            <div className="subject-grid">
              {{(SUBJECTS[level]||[]).map((s,i)=>(
                <div key={{i}} className="subject-card" onClick={{()=>showToast(lang==='sw'?`Inapakua notisi: ${{s.name}}`:`Downloading notes: ${{s.name}}`)}}>
                  <div className="subject-icon">{{s.icon}}</div>
                  <div className="subject-name">{{s.name}}</div>
                  <div className="subject-count">{{s.n}} {{lang==='sw'?'Notisi':'Notes'}}</div>
                </div>
              ))}}
            </div>
          </div>
        )}}

        {{/* ── QUIZ ── */}}
        {{page === 'quiz' && (
          <div className="page-pad">
            <div className="section-title">🧪 {{t.quizTitle}}</div>
            <div className="section-sub">{{lang==='sw'?'Jaribu ujuzi wako wa masomo':'Test your academic knowledge'}}</div>
            <div style={{{{maxWidth:600,margin:'0 auto'}}}}>
              <div className="quiz-box">
                {{!quizDone ? (
                  <>
                    <div className="quiz-progress">
                      <div className="quiz-progress-fill" style={{{{width:`${{((quizIdx)/QUIZZES[lang].length)*100}}%`}}}}/>
                    </div>
                    <div style={{{{fontSize:13,color:'#94a3b8',marginBottom:16,fontWeight:700}}}}>
                      {{lang==='sw'?`Swali ${{quizIdx+1}} kati ya ${{QUIZZES[lang].length}}`:`Question ${{quizIdx+1}} of ${{QUIZZES[lang].length}}`}}
                    </div>
                    <div className="quiz-q">{{QUIZZES[lang][quizIdx].q}}</div>
                    <div className="quiz-options">
                      {{QUIZZES[lang][quizIdx].opts.map((opt,i)=>(
                        <button key={{i}} className={{`quiz-opt ${{quizSelected===i?(i===QUIZZES[lang][quizIdx].ans?'correct':'wrong'):quizSelected!==null&&i===QUIZZES[lang][quizIdx].ans?'correct':''}}`}}
                                onClick={{()=>handleQuizOpt(i)}}>
                          {{String.fromCharCode(65+i)}}. {{opt}}
                        </button>
                      ))}}
                    </div>
                  </>
                ) : (
                  <div style={{{{textAlign:'center',padding:20}}}}>
                    <div style={{{{fontSize:60,marginBottom:16}}}}>{{quizScore >= 3 ? '🏆' : '📚'}}</div>
                    <div style={{{{fontSize:24,fontWeight:800,color:'#1e293b',marginBottom:8}}}}>{{t.quizDone}}</div>
                    <div style={{{{fontSize:18,color:'#64748b',marginBottom:24}}}}>{{t.score}}: <strong style={{{{color:'#1a56db'}}}}>{quizScore}/{QUIZZES[lang].length}</strong></div>
                    <button className="btn-download" style={{{{padding:'12px 32px',fontSize:15}}}} onClick={{resetQuiz}}>🔄 {{t.retake}}</button>
                  </div>
                )}}
              </div>
            </div>
          </div>
        )}}

        {{/* ── AI ── */}}
        {{page === 'ai' && (
          <div className="page-pad">
            <div className="section-title">🤖 AI {{lang==='sw'?'Msaada wa Masomo':'Study Assistant'}}</div>
            <div className="section-sub">{{lang==='sw'?'Uliza swali lolote la masomo — AI itakusaidia':'Ask any academic question — AI will help you'}}</div>

            <div className="ad-slot">
              <ins className="adsbygoogle" style={{{{display:'block'}}}} data-ad-client="{ADSENSE_ID}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
              <script dangerouslySetInnerHTML={{{{__html:'(adsbygoogle=window.adsbygoogle||[]).push({{}});'}}}}/>
            </div>

            <AIChat messages={{chatMessages}} input={{chatInput}} setInput={{setChatInput}} onSend={{sendChat}} chatEnd={{chatEnd}} t={{t}}/>

            <div style={{{{marginTop:24}}}}>
              <div className="section-title" style={{{{fontSize:16}}}}>{{lang==='sw'?'Zana Nyingine za AI':'Other AI Tools'}}</div>
              <div className="cards-row" style={{{{marginTop:12}}}}>
                {{[
                  {{icon:'✍️',color:'blue',title:lang==='sw'?'AI Insha Writer':'AI Essay Writer',desc:lang==='sw'?'Andika insha kwa msaada wa AI':'Write essays with AI assistance'}},
                  {{icon:'🔢',color:'green',title:lang==='sw'?'Hisabati Solver':'Math Solver',desc:lang==='sw'?'Suluhisha matatizo ya hisabati':'Solve math problems step by step'}},
                  {{icon:'📅',color:'orange',title:lang==='sw'?'Study Planner':'Study Planner',desc:lang==='sw'?'Panga ratiba yako ya masomo':'Plan your study schedule'}},
                  {{icon:'🌍',color:'purple',title:'Translator',desc:lang==='sw'?'Tafsiri Kiswahili ↔ English':'Translate Swahili ↔ English'}},
                  {{icon:'📖',color:'red',title:lang==='sw'?'Summarizer':'Summarizer',desc:lang==='sw'?'Fupisha maandishi marefu':'Summarize long documents'}},
                  {{icon:'❓',color:'blue',title:lang==='sw'?'Quiz Generator':'Quiz Generator',desc:lang==='sw'?'Tengeneza maswali ya kujipima':'Generate practice quizzes'}},
                ]}.map((tool,i)=>(
                  <div key={{i}} className={{`info-card ${{tool.color}}`}} style={{{{cursor:'pointer'}}}} onClick={{()=>showToast(lang==='sw'?`${{tool.title}} — Inakuja hivi karibuni!`:`${{tool.title}} — Coming soon!`)}}>
                    <div className="ic-icon">{{tool.icon}}</div>
                    <div className="ic-title">{{tool.title}}</div>
                    <div className="ic-desc">{{tool.desc}}</div>
                  </div>
                ))}}
              </div>
            </div>
          </div>
        )}}

        {{/* ── SEARCH ── */}}
        {{page === 'search' && (
          <div className="page-pad">
            <div className="section-title">🔍 {{lang==='sw'?'Matokeo ya Utafutaji':'Search Results'}}</div>
            <input className="form-input" style={{{{marginBottom:16}}}} value={{searchQuery}} onChange={{e=>setSearchQuery(e.target.value)}} placeholder={{t.searchPlaceholder}} autoFocus/>
            {{searchResults.length > 0 ? searchResults.map(p=>(
              <div key={{p.id}} className="search-result" onClick={{()=>{{setLevel(p.level);setPage('papers');}}}}>
                <div className="sr-title">{{p.icon}} {{p.title}}</div>
                <div className="sr-path">{{p.level}} › {{p.subject}} › {{p.org}} {{p.year}}</div>
                <div className="sr-desc">{{lang==='sw'?`Bonyeza kupakua au kutazama mitihani hii`:`Click to download or preview this paper`}}</div>
              </div>
            )) : searchQuery.length > 1 ? (
              <div style={{{{textAlign:'center',padding:40,color:'#94a3b8'}}}}>
                <div style={{{{fontSize:48}}}}>🔍</div>
                <p style={{{{marginTop:12,fontWeight:700}}}}>{{t.noResult}}</p>
              </div>
            ) : (
              <div style={{{{textAlign:'center',padding:40,color:'#94a3b8'}}}}>
                <div style={{{{fontSize:48}}}}>💡</div>
                <p style={{{{marginTop:12,fontWeight:700}}}}>{{lang==='sw'?'Andika neno la kutafuta...':'Start typing to search...'}}</p>
              </div>
            )}}
          </div>
        )}}

        {{/* ── CONTACT ── */}}
        {{page === 'contact' && (
          <div className="page-pad">
            <div className="section-title">📞 {{t.contactTitle}}</div>
            <div style={{{{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24,marginTop:16}}}}>
              <div>
                <div className="cards-row" style={{{{gridTemplateColumns:'1fr 1fr',marginBottom:20}}}}>
                  {{[
                    {{icon:'📧',color:'blue',title:'Email',desc:'info@global-elite-academy.com'}},
                    {{icon:'📱',color:'green',title:'WhatsApp',desc:'+255 XXX XXX XXX'}},
                    {{icon:'🌐',color:'orange',title:'Website',desc:'global-elite-academy.com'}},
                    {{icon:'📍',color:'purple',title:'Location',desc:'Tanzania 🇹🇿'}},
                  ]}.map((c,i)=>(
                    <div key={{i}} className={{`info-card ${{c.color}}`}}>
                      <div className="ic-icon">{{c.icon}}</div>
                      <div className="ic-title">{{c.title}}</div>
                      <div className="ic-desc">{{c.desc}}</div>
                    </div>
                  ))}}
                </div>
              </div>
              <div className="quiz-box" style={{{{padding:24}}}}>
                {{contactSent ? (
                  <div style={{{{textAlign:'center',padding:20}}}}>
                    <div style={{{{fontSize:60}}}}>✅</div>
                    <div style={{{{fontSize:20,fontWeight:800,marginTop:12,color:'#10b981'}}}}>{{lang==='sw'?'Asante! Ujumbe Umetumwa':'Thank You! Message Sent'}}</div>
                    <div style={{{{color:'#64748b',marginTop:8,fontSize:14}}}}>{{lang==='sw'?'Tutajibu hivi karibuni':'We will respond soon'}}</div>
                    <button className="btn-download" style={{{{marginTop:16,padding:'10px 24px'}}}} onClick={{()=>setContactSent(false)}}>{{lang==='sw'?'Tuma Mwingine':'Send Another'}}</button>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label className="form-label">{{t.name}}</label>
                      <input className="form-input" placeholder={{t.name}}/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{{t.email}}</label>
                      <input className="form-input" type="email" placeholder={{t.email}}/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{{t.message}}</label>
                      <textarea className="form-textarea" placeholder={{t.message}}/>
                    </div>
                    <button className="btn-submit" onClick={{()=>setContactSent(true)}}>📤 {{t.sendMsg}}</button>
                  </>
                )}}
              </div>
            </div>
          </div>
        )}}

        {{/* FOOTER */}}
        <footer className="footer">
          <div className="footer-logo">🎓 Global Elite Academy</div>
          <p style={{{{color:'#64748b',fontSize:14,marginBottom:8}}}}>{{t.tagline}}</p>
          <div className="footer-links">
            {{navPages.map((p,i)=>(
              <span key={{p}} className="footer-link" onClick={{()=>handleNav(p)}}>{{t.navItems[i]}}</span>
            ))}}
          </div>
          <div className="footer-copy">© 2024 Global Elite Academy | Tanzania 🇹🇿 | All Rights Reserved</div>
        </footer>
      </main>

      {{/* MOBILE BOTTOM NAV */}}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {{navPages.slice(0,5).map((p,i)=>(
            <div key={{p}} className={{`bn-item ${{page===p?'active':''}}`}} onClick={{()=>handleNav(p)}}>
              <span className="bn-icon">{{navIcons[i]}}</span>
              <span className="bn-label">{{t.navItems[i]}}</span>
            </div>
          ))}}
        </div>
      </nav>

      {{/* TOAST */}}
      <div className={{`toast ${{toastVisible?'show':''}}`}}>{{toast}}</div>
    </div>
  );
}}

// ── PAPER ITEM COMPONENT ────────────────────────────────
function PaperItem({{paper, t, lang, onDownload}}) {{
  const typeClass = {{necta:'tag-necta', uni:'tag-uni', mock:'tag-mock'}}[paper.type] || 'tag-necta';
  return (
    <div className="paper-item">
      <div className={{`paper-icon ${{paper.color}}`}}>{{paper.icon}}</div>
      <div className="paper-info">
        <div className="paper-title">{{paper.title}}</div>
        <div className="paper-meta">
          <span>{{paper.org}}</span>
          <span>{{paper.year}}</span>
          <span className={{`paper-tag ${{typeClass}}`}}>{{paper.type.toUpperCase()}}</span>
        </div>
      </div>
      <div className="paper-actions">
        <button className="btn-preview">👁 {{t.previewPaper}}</button>
        <button className="btn-download" onClick={{onDownload}}>⬇ {{t.downloadPaper}}</button>
      </div>
    </div>
  );
}}

// ── AI CHAT COMPONENT ───────────────────────────────────
function AIChat({{messages, input, setInput, onSend, chatEnd, t}}) {{
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-avatar">🤖</div>
        <div>
          <div className="chat-title">AI Study Assistant</div>
          <div className="chat-status">● Online</div>
        </div>
      </div>
      <div className="chat-messages">
        {{messages.map((m,i)=>(
          <div key={{i}} className={{`msg ${{m.role}}`}}>
            <div className="msg-bubble">{{m.text}}</div>
            <div className="msg-time">{{m.time}}</div>
          </div>
        ))}}
        <div ref={{chatEnd}}/>
      </div>
      <div className="chat-input-row">
        <input className="chat-input" value={{input}} onChange={{e=>setInput(e.target.value)}
        } onKeyDown={{e=>e.key==='Enter'&&onSend()}} placeholder={{t.typeMessage}}/>
        <button className="chat-send" onClick={{onSend}}>{{t.send}} ➤</button>
      </div>
    </div>
  );
}}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
</script>
</body>
</html>
"""

components.html(html_code, height=900, scrolling=True

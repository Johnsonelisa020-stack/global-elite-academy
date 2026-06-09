import streamlit as st

# ============================================================
# PAGE CONFIG - MUST BE FIRST STREAMLIT COMMAND
# ============================================================
st.set_page_config(
    page_title="Global Elite Academy",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ============================================================
# GOOGLE ADSENSE + SEO META TAGS
# ============================================================
ADSENSE_ID = "ca-pub-8024543613282871"

st.markdown(f"""
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Global Elite Academy - Mitihani iliyopita, Notisi za Masomo, Zana za AI, na Elimu bora kwa Shule ya Msingi, Sekondari na Chuo Kikuu Tanzania.">
    <meta name="keywords" content="Global Elite Academy, mitihani Tanzania, past papers, notisi, NECTA, CSEE, PSLE, elimu, coding, AI, chuo kikuu">
    <meta name="author" content="Global Elite Academy">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Global Elite Academy">
    <meta property="og:description" content="Elimu Bora kwa Kila Mtanzania">
    <meta property="og:type" content="website">
    <meta name="google-adsense-account" content="{ADSENSE_ID}">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE_ID}" crossorigin="anonymous"></script>
</head>
""", unsafe_allow_html=True)

# ============================================================
# CSS STYLING
# ============================================================
st.markdown("""
<style>
    /* Import Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700;800&family=Open+Sans:wght@400;600&display=swap');

    /* Hide Streamlit default elements */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}

    /* Global background */
    .stApp {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
        font-family: 'Open Sans', sans-serif;
    }

    /* Sidebar */
    [data-testid="stSidebar"] {
        background: linear-gradient(180deg, #0c2340 0%, #1a3a5c 100%);
        border-right: 2px solid #0284c7;
    }
    [data-testid="stSidebar"] * {
        color: #e2e8f0 !important;
    }

    /* Hero banner */
    .hero-banner {
        background: linear-gradient(135deg, #0284c7, #0ea5e9, #38bdf8);
        border-radius: 20px;
        padding: 50px 30px;
        text-align: center;
        margin-bottom: 30px;
        box-shadow: 0 20px 40px rgba(2, 132, 199, 0.4);
    }
    .hero-title {
        font-family: 'Merriweather', serif;
        font-size: 52px;
        font-weight: 800;
        color: #ffffff;
        margin: 0;
        text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
        letter-spacing: 1px;
    }
    .hero-subtitle {
        font-size: 22px;
        color: #f0f9ff;
        margin-top: 10px;
        font-weight: 600;
    }
    .hero-tagline {
        font-size: 16px;
        color: #bae6fd;
        margin-top: 8px;
    }

    /* Cards */
    .card {
        background: linear-gradient(145deg, #1e293b, #0f2744);
        border-radius: 16px;
        padding: 25px;
        margin: 12px 0;
        border-top: 5px solid #0284c7;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        transition: transform 0.3s ease;
        color: #e2e8f0;
    }
    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 35px rgba(2, 132, 199, 0.3);
    }
    .card h3 {
        color: #38bdf8;
        font-size: 20px;
        margin-bottom: 8px;
    }
    .card p {
        color: #94a3b8;
        font-size: 14px;
        margin: 0;
    }

    /* Section headers */
    .section-header {
        background: linear-gradient(90deg, #0284c7, #0ea5e9);
        color: white !important;
        padding: 12px 25px;
        border-radius: 10px;
        font-size: 22px;
        font-weight: 700;
        margin: 25px 0 15px 0;
        text-align: center;
    }

    /* Stats box */
    .stat-box {
        background: linear-gradient(145deg, #1e40af, #1d4ed8);
        border-radius: 14px;
        padding: 20px;
        text-align: center;
        border: 1px solid #3b82f6;
        box-shadow: 0 5px 20px rgba(29, 78, 216, 0.4);
    }
    .stat-number {
        font-size: 40px;
        font-weight: 800;
        color: #60a5fa;
    }
    .stat-label {
        font-size: 14px;
        color: #93c5fd;
    }

    /* AdSense container */
    .ad-container {
        background: linear-gradient(145deg, #1e293b, #0f2744);
        border: 2px dashed #334155;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        color: #64748b;
        margin: 20px 0;
        font-size: 13px;
    }

    /* Exam paper cards */
    .exam-card {
        background: linear-gradient(145deg, #064e3b, #065f46);
        border-radius: 12px;
        padding: 18px;
        margin: 8px 0;
        border-left: 5px solid #10b981;
        color: #d1fae5;
    }
    .exam-card h4 {
        color: #34d399;
        margin: 0 0 5px 0;
    }
    .exam-card p {
        color: #6ee7b7;
        font-size: 13px;
        margin: 0;
    }

    /* Announcement banner */
    .announcement {
        background: linear-gradient(90deg, #dc2626, #ef4444);
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        text-align: center;
        font-weight: 600;
        animation: pulse 2s infinite;
        margin-bottom: 20px;
    }

    /* Navigation buttons in sidebar */
    .stButton > button {
        background: linear-gradient(135deg, #0284c7, #0369a1) !important;
        color: white !important;
        border: none !important;
        border-radius: 10px !important;
        padding: 12px 20px !important;
        width: 100% !important;
        font-weight: 600 !important;
        font-size: 15px !important;
        margin: 4px 0 !important;
        transition: all 0.3s ease !important;
    }
    .stButton > button:hover {
        background: linear-gradient(135deg, #0ea5e9, #0284c7) !important;
        transform: translateX(5px) !important;
        box-shadow: 0 5px 15px rgba(2, 132, 199, 0.5) !important;
    }

    /* Text color fix */
    .stMarkdown, p, li {
        color: #cbd5e1;
    }
    h1, h2, h3 {
        color: #f1f5f9;
    }
</style>
""", unsafe_allow_html=True)

# ============================================================
# DATA
# ============================================================
PAST_PAPERS = {
    "NECTA CSEE (Form 4)": [
        {"subject": "Mathematics", "year": "2023", "link": "#"},
        {"subject": "Physics", "year": "2023", "link": "#"},
        {"subject": "Chemistry", "year": "2023", "link": "#"},
        {"subject": "Biology", "year": "2023", "link": "#"},
        {"subject": "English Language", "year": "2023", "link": "#"},
        {"subject": "Kiswahili", "year": "2023", "link": "#"},
        {"subject": "History", "year": "2022", "link": "#"},
        {"subject": "Geography", "year": "2022", "link": "#"},
    ],
    "NECTA ACSEE (Form 6)": [
        {"subject": "Advanced Mathematics", "year": "2023", "link": "#"},
        {"subject": "Physics", "year": "2023", "link": "#"},
        {"subject": "Chemistry", "year": "2023", "link": "#"},
        {"subject": "Biology", "year": "2023", "link": "#"},
        {"subject": "Economics", "year": "2023", "link": "#"},
        {"subject": "History", "year": "2022", "link": "#"},
    ],
    "PSLE (Standard 7)": [
        {"subject": "Kiswahili", "year": "2023", "link": "#"},
        {"subject": "English", "year": "2023", "link": "#"},
        {"subject": "Mathematics", "year": "2023", "link": "#"},
        {"subject": "Science & Technology", "year": "2023", "link": "#"},
    ],
    "University (Chuo Kikuu)": [
        {"subject": "Discrete Mathematics (CSU 07212)", "year": "2024", "link": "#"},
        {"subject": "Programming Fundamentals", "year": "2024", "link": "#"},
        {"subject": "Database Systems", "year": "2024", "link": "#"},
        {"subject": "Computer Networks", "year": "2023", "link": "#"},
    ],
}

NOTES = [
    {"title": "Hisabati - Algebra na Geometry", "level": "Form 1-4", "icon": "📐"},
    {"title": "Physics - Mechanics & Electricity", "level": "Form 5-6", "icon": "⚡"},
    {"title": "Biology - Cell Biology & Genetics", "level": "Form 1-4", "icon": "🧬"},
    {"title": "Chemistry - Organic Chemistry", "level": "Form 5-6", "icon": "🧪"},
    {"title": "English - Grammar & Comprehension", "level": "All Levels", "icon": "📝"},
    {"title": "Computer Science - Programming", "level": "University", "icon": "💻"},
    {"title": "Economics - Micro & Macro", "level": "Form 5-6", "icon": "📊"},
    {"title": "History - Tanzania & World History", "level": "Form 1-4", "icon": "📜"},
]

AI_TOOLS = [
    {"name": "AI Essay Writer", "desc": "Andika insha kwa msaada wa AI", "icon": "✍️"},
    {"name": "Math Solver", "desc": "Suluhisha matatizo ya hisabati kwa hatua", "icon": "🔢"},
    {"name": "Quiz Generator", "desc": "Tengeneza maswali ya kujipima", "icon": "❓"},
    {"name": "Study Planner", "desc": "Panga ratiba yako ya masomo", "icon": "📅"},
    {"name": "Code Helper", "desc": "Msaada wa programming na coding", "icon": "👨‍💻"},
    {"name": "Translation Tool", "desc": "Tafsiri Kiswahili - English", "icon": "🌍"},
]

# ============================================================
# SIDEBAR NAVIGATION
# ============================================================
with st.sidebar:
    st.markdown("""
    <div style='text-align:center; padding: 20px 0;'>
        <div style='font-size: 50px;'>🎓</div>
        <h2 style='color: #38bdf8; font-family: Merriweather; margin: 5px 0;'>Global Elite</h2>
        <h2 style='color: #38bdf8; font-family: Merriweather; margin: 5px 0;'>Academy</h2>
        <p style='color: #64748b; font-size: 12px;'>Elimu Bora Daima</p>
        <hr style='border-color: #1e40af; margin: 15px 0;'>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("<p style='color: #64748b; font-size: 12px; text-align:center;'>MENYU</p>", unsafe_allow_html=True)

    if st.button("🏠  Nyumbani"):
        st.session_state.page = "home"
    if st.button("📄  Mitihani Iliyopita"):
        st.session_state.page = "papers"
    if st.button("📚  Notisi za Masomo"):
        st.session_state.page = "notes"
    if st.button("🤖  Zana za AI"):
        st.session_state.page = "ai"
    if st.button("ℹ️  Kuhusu Sisi"):
        st.session_state.page = "about"
    if st.button("📞  Wasiliana Nasi"):
        st.session_state.page = "contact"

    st.markdown("""
    <hr style='border-color: #1e40af; margin: 20px 0;'>
    <div style='text-align:center;'>
        <p style='color: #64748b; font-size: 11px;'>Google AdSense</p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown(f"""
    <div class='ad-container' style='margin: 5px;'>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE_ID}" crossorigin="anonymous"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="{ADSENSE_ID}"
             data-ad-slot="auto"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
        <small>📢 Tangazo</small>
    </div>
    """, unsafe_allow_html=True)

# ============================================================
# PAGE STATE
# ============================================================
if "page" not in st.session_state:
    st.session_state.page = "home"

page = st.session_state.page

# ============================================================
# HOME PAGE
# ============================================================
if page == "home":
    # Hero
    st.markdown("""
    <div class='hero-banner'>
        <div class='hero-title'>🎓 Global Elite Academy</div>
        <div class='hero-subtitle'>Elimu Bora kwa Kila Mtanzania</div>
        <div class='hero-tagline'>Mitihani Iliyopita • Notisi • Zana za AI • Elimu ya Teknolojia</div>
    </div>
    """, unsafe_allow_html=True)

    # Announcement
    st.markdown("""
    <div class='announcement'>
        🔔 MATOKEO YA NECTA 2024 YAMTOKA! Bonyeza hapa kupata maelezo zaidi →
    </div>
    """, unsafe_allow_html=True)

    # Stats
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.markdown("""
        <div class='stat-box'>
            <div class='stat-number'>500+</div>
            <div class='stat-label'>Mitihani Iliyopita</div>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown("""
        <div class='stat-box'>
            <div class='stat-number'>200+</div>
            <div class='stat-label'>Notisi za Masomo</div>
        </div>
        """, unsafe_allow_html=True)
    with col3:
        st.markdown("""
        <div class='stat-box'>
            <div class='stat-number'>10K+</div>
            <div class='stat-label'>Wanafunzi Wetu</div>
        </div>
        """, unsafe_allow_html=True)
    with col4:
        st.markdown("""
        <div class='stat-box'>
            <div class='stat-number'>6</div>
            <div class='stat-label'>Zana za AI</div>
        </div>
        """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    # AdSense Banner
    st.markdown(f"""
    <div class='ad-container'>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE_ID}" crossorigin="anonymous"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="{ADSENSE_ID}"
             data-ad-slot="auto"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
        📢 Nafasi ya Kutangaza Biashara Yako Hapa
    </div>
    """, unsafe_allow_html=True)

    # Quick links
    st.markdown("<div class='section-header'>🚀 Huduma Zetu Kuu</div>", unsafe_allow_html=True)
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown("""
        <div class='card'>
            <h3>📄 Mitihani Iliyopita</h3>
            <p>NECTA CSEE, ACSEE, PSLE, na Mitihani ya Chuo Kikuu. Jiandae vizuri kwa mtihani wako.</p>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown("""
        <div class='card'>
            <h3>📚 Notisi za Masomo</h3>
            <p>Notisi zilizokaguliwa na wataalam. Masomo yote kutoka Darasa la 1 hadi Chuo Kikuu.</p>
        </div>
        """, unsafe_allow_html=True)
    with col3:
        st.markdown("""
        <div class='card'>
            <h3>🤖 Zana za AI</h3>
            <p>Tumia teknolojia ya kisasa ya AI kusaidia masomo yako. Jibu maswali, andika insha, suluhisha hisabati.</p>
        </div>
        """, unsafe_allow_html=True)

    # Latest papers preview
    st.markdown("<div class='section-header'>📋 Mitihani Mpya Zaidi</div>", unsafe_allow_html=True)
    recent = [
        ("CSEE Mathematics 2023", "Form 4", "NECTA"),
        ("ACSEE Physics 2023", "Form 6", "NECTA"),
        ("PSLE English 2023", "Standard 7", "NECTA"),
        ("Discrete Mathematics 2024", "University", "IAA"),
    ]
    col1, col2 = st.columns(2)
    for i, (name, level, org) in enumerate(recent):
        with col1 if i % 2 == 0 else col2:
            st.markdown(f"""
            <div class='exam-card'>
                <h4>📄 {name}</h4>
                <p>Kiwango: {level} | Shirika: {org}</p>
            </div>
            """, unsafe_allow_html=True)

# ============================================================
# PAST PAPERS PAGE
# ============================================================
elif page == "papers":
    st.markdown("<div class='hero-banner'><div class='hero-title'>📄 Mitihani Iliyopita</div><div class='hero-subtitle'>Jiandae Vizuri na Mitihani ya Miaka Iliyopita</div></div>", unsafe_allow_html=True)

    st.markdown(f"""
    <div class='ad-container'>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE_ID}" crossorigin="anonymous"></script>
        <ins class="adsbygoogle" style="display:block" data-ad-client="{ADSENSE_ID}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
        📢 Tangazo
    </div>
    """, unsafe_allow_html=True)

    for category, papers in PAST_PAPERS.items():
        st.markdown(f"<div class='section-header'>🏫 {category}</div>", unsafe_allow_html=True)
        cols = st.columns(2)
        for i, paper in enumerate(papers):
            with cols[i % 2]:
                st.markdown(f"""
                <div class='exam-card'>
                    <h4>📄 {paper['subject']}</h4>
                    <p>Mwaka: {paper['year']} | <a href='{paper['link']}' style='color:#34d399;'>Pakua PDF</a></p>
                </div>
                """, unsafe_allow_html=True)
        st.markdown("<br>", unsafe_allow_html=True)

# ============================================================
# NOTES PAGE
# ============================================================
elif page == "notes":
    st.markdown("<div class='hero-banner'><div class='hero-title'>📚 Notisi za Masomo</div><div class='hero-subtitle'>Notisi Zilizokaguliwa na Wataalam wa Elimu</div></div>", unsafe_allow_html=True)

    st.markdown(f"""
    <div class='ad-container'>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE_ID}" crossorigin="anonymous"></script>
        <ins class="adsbygoogle" style="display:block" data-ad-client="{ADSENSE_ID}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
        📢 Tangazo
    </div>
    """, unsafe_allow_html=True)

    st.markdown("<div class='section-header'>📖 Notisi Zote Zinazopatikana</div>", unsafe_allow_html=True)
    cols = st.columns(2)
    for i, note in enumerate(NOTES):
        with cols[i % 2]:
            st.markdown(f"""
            <div class='card'>
                <h3>{note['icon']} {note['title']}</h3>
                <p>Kiwango: {note['level']}</p>
            </div>
            """, unsafe_allow_html=True)

# ============================================================
# AI TOOLS PAGE
# ============================================================
elif page == "ai":
    st.markdown("<div class='hero-banner'><div class='hero-title'>🤖 Zana za AI</div><div class='hero-subtitle'>Teknolojia ya Kisasa Kwa Masomo Yako</div></div>", unsafe_allow_html=True)

    st.markdown("<div class='section-header'>⚡ Zana Zinazopatikana</div>", unsafe_allow_html=True)
    cols = st.columns(3)
    for i, tool in enumerate(AI_TOOLS):
        with cols[i % 3]:
            st.markdown(f"""
            <div class='card'>
                <h3>{tool['icon']} {tool['name']}</h3>
                <p>{tool['desc']}</p>
            </div>
            """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("<div class='section-header'>💬 Uliza Swali lolote la Masomo</div>", unsafe_allow_html=True)

    user_question = st.text_area("Andika swali lako hapa:", placeholder="Mfano: Eleza jinsi osmosis inavyofanya kazi...", height=100)
    if st.button("🚀 Tuma Swali"):
        if user_question:
            with st.spinner("AI inashughulikia swali lako..."):
                st.markdown(f"""
                <div class='card'>
                    <h3>✅ Jibu la AI</h3>
                    <p>Swali lako: <em>{user_question}</em></p>
                    <p style='color:#94a3b8; margin-top:10px;'>
                        (Unganisha API ya AI hapa kwa majibu kamili. Tumia OpenAI au Anthropic API kwa huduma kamili.)
                    </p>
                </div>
                """, unsafe_allow_html=True)
        else:
            st.warning("Tafadhali andika swali kwanza!")

    st.markdown(f"""
    <div class='ad-container'>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE_ID}" crossorigin="anonymous"></script>
        <ins class="adsbygoogle" style="display:block" data-ad-client="{ADSENSE_ID}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
        📢 Tangazo
    </div>
    """, unsafe_allow_html=True)

# ============================================================
# ABOUT PAGE
# ============================================================
elif page == "about":
    st.markdown("<div class='hero-banner'><div class='hero-title'>ℹ️ Kuhusu Sisi</div><div class='hero-subtitle'>Tunajitahidi Kuleta Elimu Bora kwa Kila Mtanzania</div></div>", unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        st.markdown("""
        <div class='card'>
            <h3>🎯 Dhamira Yetu</h3>
            <p>Global Elite Academy ilianzishwa kwa lengo la kuleta elimu bora, rahisi, na inayopatikana kwa kila mwanafunzi Tanzania. Tunaamini elimu ni haki ya kila mtu.</p>
        </div>
        <div class='card'>
            <h3>👨‍🏫 Timu Yetu</h3>
            <p>Tuna timu ya walimu wanaojitolea, wataalamu wa teknolojia, na wasomi waliojitolea kuboresha elimu Tanzania.</p>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown("""
        <div class='card'>
            <h3>🌍 Tunafika Wapi?</h3>
            <p>Tunafikia wanafunzi kutoka mikoa yote Tanzania. Huduma zetu zinapatikana mtandaoni 24/7.</p>
        </div>
        <div class='card'>
            <h3>🏆 Mafanikio Yetu</h3>
            <p>Zaidi ya wanafunzi 10,000 wanategemea Global Elite Academy kila mwaka kujisomea na kupata matokeo mazuri.</p>
        </div>
        """, unsafe_allow_html=True)

# ============================================================
# CONTACT PAGE
# ============================================================
elif page == "contact":
    st.markdown("<div class='hero-banner'><div class='hero-title'>📞 Wasiliana Nasi</div><div class='hero-subtitle'>Tuko Hapa Kukusaidia Wakati Wowote</div></div>", unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    with col1:
        st.markdown("""
        <div class='card'>
            <h3>📧 Barua Pepe</h3>
            <p>info@global-elite-academy.com</p>
        </div>
        <div class='card'>
            <h3>📱 WhatsApp</h3>
            <p>+255 XXX XXX XXX</p>
        </div>
        <div class='card'>
            <h3>🌐 Tovuti</h3>
            <p>www.global-elite-academy.com</p>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown("<div class='section-header'>📩 Tuma Ujumbe</div>", unsafe_allow_html=True)
        name = st.text_input("Jina Lako:")
        email = st.text_input("Barua Pepe:")
        message = st.text_area("Ujumbe Wako:", height=120)
        if st.button("📤 Tuma Ujumbe"):
            if name and email and message:
                st.success(f"✅ Asante {name}! Ujumbe wako umetumwa. Tutajibu hivi karibuni.")
            else:
                st.warning("Tafadhali jaza sehemu zote!")

# ============================================================
# FOOTER
# ============================================================
st.markdown("""
<hr style='border-color: #1e293b; margin-top: 50px;'>
<div style='text-align:center; padding: 20px; color: #475569;'>
    <p style='color: #38bdf8; font-size: 18px; font-weight: 700;'>🎓 Global Elite Academy</p>
    <p style='color: #64748b; font-size: 13px;'>© 2024 Global Elite Academy | Haki Zote Zimehifadhiwa</p>
    <p style='color: #475569; font-size: 12px;'>Elimu Bora kwa Kila Mtanzania 🇹🇿</p>
</div>
""", unsafe_allow_html=True)

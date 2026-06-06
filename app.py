import streamlit as st

# 1. Muonekano wa Kishua (Deep Blue Theme + Kadi Zenye Mvuto wa Kimataifa)
st.set_page_config(page_title="Global Elite Academy", layout="wide")

st.markdown("""
    <style>
    .main {
        background-color: #f8fafc;
    }
    h1 {
        color: #0f172a;
        font-family: 'Merriweather', serif;
        font-weight: 800;
        text-align: center;
        margin-top: -20px;
    }
    .subtitle {
        color: #0284c7;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 30px;
    }
    /* Mtindo wa Kadi za Masomo na Walimu */
    .custom-card {
        background-color: #ffffff;
        padding: 25px;
        border-radius: 16px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        border-top: 6px solid #0284c7;
        text-align: center;
        margin-bottom: 25px;
        transition: transform 0.3s ease;
    }
    .custom-card:hover {
        transform: translateY(-8px);
    }
    .card-title {
        color: #1e293b;
        font-size: 19px;
        font-weight: bold;
        margin-top: 12px;
        margin-bottom: 8px;
    }
    .card-desc {
        font-size: 14px;
        color: #64748b;
    }
    </style>
""", unsafe_allow_html=True)

# 2. Kamusi ya Lugha zote (Yenye Content Nzito ya Masomo ya Dunia)
LANGUAGES = {
    "Swahili": {
        "title": "Global Elite Academy",
        "subtitle": "Chuo cha Kimataifa cha Elimu ya Kidijitali na Akili Mnemba",
        "welcome": "🚀 Karibu kwenye ulimwengu wa maarifa! Hapa utagundua siri za sayansi, anga, teknolojia, na kila kitu kinachotuzunguka.",
        "login_title": "🔐 Ingia Kwenye Mfumo",
        "level_title": "🎓 Ngazi ya Masomo",
        "level_label": "Chagua ngazi yako ili uone masomo yako:",
        "levels": ["Elimu ya Msingi (Watoto & Wazazi)", "Elimu ya Sekondari (O-Level & A-Level)", "Elimu ya Juu (Chuo Kikuu)", "Ujuzi wa Kitaalamu & AI"],
        "course_title": "🌍 Chunguza Masomo na Kozi Zote Duniani",
        "cat1_title": "Sayansi ya Anga & Dunia", "cat1_desc": "Gundua sayari, nyota, bahari, na jinsi viumbe na vitu vinavyotuzunguka vinavyofanya kazi.",
        "cat2_title": "Coding & Roboti za Kisasa", "cat2_desc": "Jifunze kutengeneza programu za kompyuta, michezo (games), na kuongoza roboti kiakili.",
        "cat3_title": "Historia ya Dunia & Utamaduni", "cat3_desc": "Safiri kurudi nyuma kujua chimbuko la binadamu, ustaarabu wa kale, na miujiza ya dunia.",
        "cat4_title": "Sayansi ya Kompyuta & AI", "cat4_desc": "Ingia ndani ya ulimwengu wa Akili Mnemba (Artificial Intelligence) na mifumo ya usalama wa kimtandao.",
        "tutors_title": "👨‍🏫 Kutana na Walimu Wetu Maarufu Duniani",
        "ai_zone": "🤖 Msaidizi wa AI wa Global Elite (Mwalimu wako wa 24/7)",
        "ai_hello": "AI: Habari! Mimi ni mwalimu wako wa akili mnemba. Uliza swali lolote kuhusu kitu chochote duniani likujibu sasa hivi!",
        "ai_btn": "Uliza AI Mtambo",
        "support_title": "📞 Huduma kwa Wateja & Msaada",
        "support_msg": "Tuandikie barua pepe: support@globalelite.com | Piga/WhatsApp: +255 686 426 563 (Inapatikana 24/7)"
    },
    "English": {
        "title": "Global Elite Academy",
        "subtitle": "International Digital Education & AI Center",
        "welcome": "🚀 Welcome to the world of knowledge! Explore space, science, history, and everything around us.",
        "login_title": "🔐 Secure Student Login",
        "level_title": "🎓 Education Level",
        "level_label": "Select your level to unlock courses:",
        "levels": ["Primary Education (Kids & Parents)", "Secondary Education (High School)", "Higher Education (University)", "Professional Skills & AI"],
        "course_title": "🌍 Explore All World Subjects & Courses",
        "cat1_title": "Space & Earth Science", "cat1_desc": "Discover planets, stars, deep oceans, and how ecosystems around us function.",
        "cat2_title": "Coding & Modern Robotics", "cat2_desc": "Learn to code software, build games, and command smart robots from scratch.",
        "cat3_title": "World History & Culture", "cat3_desc": "Travel back in time to understand human origins, ancient civilizations, and wonders.",
        "cat4_title": "Computer Science & Cyber Security", "cat4_desc": "Dive deep into Artificial Intelligence, advanced coding, and network protection.",
        "tutors_title": "👨‍🏫 Meet Our World-Class Renowned Tutors",
        "ai_zone": "🤖 Global Elite AI Assistant (Your 24/7 Intelligent Tutor)",
        "ai_hello": "AI: Hello! I am your AI tutor. Ask me any question about anything in the universe and get instant answers!",
        "ai_btn": "Ask AI Engine",
        "support_title": "📞 Customer Support & Hotline",
        "support_msg": "Email us: support@globalelite.com | Call/WhatsApp: +255 686 426 563 (Available 24/7)"
    }
}

# 3. SIDEBAR (Login na Ngazi za Elimu - Zimekaa Kisasa Kabisa)
selected_lang = st.sidebar.selectbox("🌐 Chagua Lugha / Language", list(LANGUAGES.keys()))
L = LANGUAGES[selected_lang]

st.sidebar.markdown(f"### {L['login_title']}")
st.sidebar.text_input("Username / Email", placeholder="Mfano: frank@global.com")
st.sidebar.text_input("Password", type="password", placeholder="******")
if st.sidebar.button("Ingia / Log In"):
    st.sidebar.success("Umeingia salama! Karibu chuoni.")

st.sidebar.markdown("---")

st.sidebar.markdown(f"### {L['level_title']}")
selected_level = st.sidebar.selectbox(L["level_label"], L["levels"])

# 4. MAIN CONTENT (Kichwa cha Habari na Utangulizi)
st.title(L["title"])
st.markdown(f"<div class='subtitle'>{L['subtitle']}</div>", unsafe_allow_html=True)
st.write(f"*{L['welcome']}*")
st.write(f"Ngazi iliyochaguliwa sasa: **{selected_level}**")

st.markdown("---")

# 5. CONTENT YA MASOMO YA DUNIA (Hapa ndipo mzazi na mtoto wanapovutiwa!)
st.header(L["course_title"])
col_c1, col_c2 = st.columns(2)
col_c3, col_c4 = st.columns(2)

with col_c1:
    st.markdown(f"""
    <div class='custom-card'>
        <img src='https://img.icons8.com/fluency/96/000000/rocket.png' width='70'>
        <div class='card-title'>{L['cat1_title']}</div>
        <div class='card-desc'>{L['cat1_desc']}</div>
    </div>
    """, unsafe_allow_html=True)

with col_c2:
    st.markdown(f"""
    <div class='custom-card'>
        <img src='https://img.icons8.com/fluency/96/000000/robot-2.png' width='70'>
        <div class='card-title'>{L['cat2_title']}</div>
        <div class='card-desc'>{L['cat2_desc']}</div>
    </div>
    """, unsafe_allow_html=True)

with col_c3:
    st.markdown(f"""
    <div class='custom-card'>
        <img src='https://img.icons8.com/fluency/96/000000/coliseum.png' width='70'>
        <div class='card-title'>{L['cat3_title']}</div>
        <div class='card-desc'>{L['cat3_desc']}</div>
    </div>
    """, unsafe_allow_html=True)

with col_c4:
    st.markdown(f"""
    <div class='custom-card'>
        <img src='https://img.icons8.com/fluency/96/000000/brainstorming.png' width='70'>
        <div class='card-title'>{L['cat4_title']}</div>
        <div class='card-desc'>{L['cat4_desc']}</div>
    </div>
    """, unsafe_allow_html=True)

st.markdown("---")

# 6. SEHEMU YA WALIMU (Kadi Zilizoviringana kutoka Mwanzo - Zinarudi Hapa)
st.header(L["tutors_title"])
col_t1, col_t2, col_t3 = st.columns(3)

with col_t1:
    st.markdown("""
    <div class='custom-card'>
        <img src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150' style='border-radius: 50%; width: 100px; height: 100px; object-fit: cover;'>
        <div class='tutor-name' style='font-weight:bold; margin-top:10px;'>Prof. Walter Lewin</div>
        <p style='font-size: 14px; color: #64748b;'>MIT Physics Lecturer</p>
    </div>
    """, unsafe_allow_html=True)

with col_t2:
    st.markdown("""
    <div class='custom-card'>
        <img src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150' style='border-radius: 50%; width: 100px; height: 100px; object-fit: cover;'>
        <div class='tutor-name' style='font-weight:bold; margin-top:10px;'>Prof. Salman Khan</div>
        <p style='font-size: 14px; color: #64748b;'>Mathematics Pioneer</p>
    </div>
    """, unsafe_allow_html=True)

with col_t3:
    st.markdown("""
    <div class='custom-card'>
        <img src='https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150' style='border-radius: 50%; width: 100px; height: 100px; object-fit: cover;'>
        <div class='tutor-name' style='font-weight:bold; margin-top:10px;'>Dr. Elena Rostova</div>
        <p style='font-size: 14px; color: #64748b;'>AI Curriculum Expert</p>
    </div>
    """, unsafe_allow_html=True)

st.markdown("---")

# 7. SEHEMU YA AI (Inajibu Kulingana na Ngazi ya Elimu Iliyochaguliwa)
st.header(L["ai_zone"])
st.info(L["ai_hello"])
user_query = st.text_input("Andika swali lako hapa kwa AI:", placeholder="Mfano: Kwa nini nyota zinameta usiku?")

if st.button(L["ai_btn"]):
    if user_query.strip() == "":
        st.warning("Tafadhali andika swali kwanza mwanangu!")
    else:
        st.markdown("#### 🧠 Majibu ya Global AI:")
        with st.spinner("AI inatafiti majibu..."):
            st.success(f"Habari! Kama mwanafunzi wa '{selected_level}', nimechakata swali lako kuhusu '{user_query}' na nimekuandalia moduli maalum ya kujifunzia sasa hivi.")

st.markdown("---")

# 8. FOOTER (Msaada wa Simu na Email)
st.subheader(L["support_title"])
st.code(L["support_msg"], language="text")

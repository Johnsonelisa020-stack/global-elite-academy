import streamlit as st

# ==========================================
# 1. SEO & GOOGLE ADSENSE CONFIGURATION
# ==========================================
st.set_page_config(page_title="Global Elite Academy - Mitihani na Elimu ya AI", layout="wide")

GOOGLE_ADSENSE_ID = "ca-pub-XXXXXXXXXXXXXXX"  # Weka Publisher ID yako hapa baadae

st.markdown(f"""
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={GOOGLE_ADSENSE_ID}" crossorigin="anonymous"></script>
    <meta name="description" content="Global Elite Academy - Pata notisi, mitihani iliyopita (past papers), na maswali ya kujipima kwa Shule ya Msingi, Sekondari, Chuo Kikuu na Akili Mnemba (AI).">
    <meta name="keywords" content="Global Elite Academy, mitihani, past papers, notisi, coding, elimu Tanzania, chuo kikuu, sekondari, msingi, AI">
    <meta name="robots" content="index, follow">
    
    <style>
    .main {{ background-color: #f8fafc; }}
    h1 {{ color: #0f172a; font-family: 'Merriweather', serif; font-weight: 800; text-align: center; margin-top: -20px; }}
    .subtitle {{ color: #0284c7; text-align: center; font-size: 22px; font-weight: bold; margin-bottom: 30px; }}
    .custom-card {{
        background-color: #ffffff; padding: 25px; border-radius: 16px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); border-top: 6px solid #0284c7;
        text-align: center; margin-bottom: 25px; transition: transform 0.3s ease;
    }}
    .custom-card:hover {{ transform: translateY(-5px); }}
    .card-title {{ color: #1e293b; font-size: 19px; font-weight: bold; margin-top: 12px; }}
    .card-desc {{ font-size: 14px; color: #64748b; margin-bottom: 15px; }}
    .exam-box {{
        background-color: #f1f5f9; padding: 15px; border-left: 5px solid #0f172a;
        border-radius: 6px; margin-bottom: 10px; text-align: left;
    }}
    .adsense-container {{
        background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px;
        padding: 20px; text-align: center; color: #94a3b8; margin: 30px 0;
    }}
    </style>
""", unsafe_allow_html=True)

# ==========================================
# 2. DATA YA MAZINGIRA YA MITIHANI NA MASOMO (DATA BANK)
# ==========================================
ACADEMIC_DATA = {
    "Swahili": {
        "Elimu ya Msingi (Watoto & Wazazi)": {
            "Notisi & Masomo": ["Hesabu za Vidole", "Sayansi Kimuundo", "Stadi za Kazi & Sanaa", "English Grammar kwa Watoto"],
            "Mitihani / Past Papers": [
                {"jina": "Mtihani wa Taifa Darasa la Saba (PSLE) - Sayansi 2024", "link": "#"},
                {"jina": "Mazoezi ya Maandalizi Darasa la Nne - Hisabati 2025", "link": "#"}
            ],
            "Quiz": {"swali": "Tendo la mimea kutengeneza chakula chake yenyewe kwa kutumia mwanga wa jua linaitwaje?", "majibu": ["Photosynthesis", "Respiration", "Evaporation"], "sahihi": "Photosynthesis"}
        },
        "Elimu ya Sekondari (O-Level & A-Level)": {
            "Notisi & Masomo": ["Physics (Mechanics & Electronics)", "Chemistry (Organic & Inorganic)", "Advanced Mathematics", "History & Geography"],
            "Mitihani / Past Papers": [
                {"jina": "Mtihani wa Kidato cha Nne (CSEE) - Physics 1 & 2 (2024)", "link": "#"},
                {"jina": "Mtihani wa Kidato cha Sita (ACSEE) - Bam & Pure Math (2025)", "link": "#"}
            ],
            "Quiz": {"swali": "Tofauti kuu kati ya AC (Alternating Current) na DC (Direct Current) ni ipi?", "majibu": ["AC inabadilisha mwelekeo, DC inaenda mwelekeo mmoja", "DC ina nguvu kubwa kuliko AC", "AC haitumii waya"], "sahihi": "AC inabadilisha mwelekeo, DC inaenda mwelekeo mmoja"}
        },
        "Elimu ya Juu (Chuo Kikuu)": {
            "Notisi & Masomo": ["Operating Systems & Architecture", "Discrete Mathematics", "Data Structures & Algorithms", "Network Security & Cyber Crimes"],
            "Mitihani / Past Papers": [
                {"jina": "University End of Semester Exam - Operating Systems Past Paper", "link": "#"},
                {"jina": "University Past Quiz - Discrete Mathematics Concepts", "link": "#"}
            ],
            "Quiz": {"swali": "Katika Operating System, hali inayotokea pale mchakato mmoja unaposubiri rasilimali iliyoshikiliwa na mchakato mwingine, na mchakato huo nao unasubiri rasilimali ya wa kwanza inaitwaje?", "majibu": ["Deadlock", "Starvation", "Paging"], "sahihi": "Deadlock"}
        },
        "Ujuzi wa Kitaalamu & AI": {
            "Notisi & Masomo": ["Prompt Engineering za Kishua", "Machine Learning na Data Science", "Kali Linux Penetration Testing", "Flutter Full-Stack Development"],
            "Mitihani / Past Papers": [
                {"jina": "Certified Ethical Hacker (CEH) Mock Exam 2025", "link": "#"},
                {"jina": "Google Professional Machine Learning Engineer Practice Test", "link": "#"}
            ],
            "Quiz": {"swali": "Ni chombo (tool) gani katika Kali Linux kinachotumika sana kufanya Network Scanning na kugundua Open Ports?", "majibu": ["Nmap", "Wireshark", "Metasploit"], "sahihi": "Nmap"}
        }
    },
    "English": {
        "Primary Education (Kids & Parents)": {
            "Notisi & Masomo": ["Basic Mathematics", "Elementary Science", "Social Studies", "English Vocabulary"],
            "Mitihani / Past Papers": [
                {"jina": "Standard Seven National Exam (PSLE) - Science 2024", "link": "#"},
                {"jina": "Grade Four Assessment - Mathematics 2025", "link": "#"}
            ],
            "Quiz": {"swali": "What is the process by which plants make their own food using sunlight?", "majibu": ["Photosynthesis", "Respiration", "Evaporation"], "sahihi": "Photosynthesis"}
        },
        "Secondary Education (High School)": {
            "Notisi & Masomo": ["Physics (Mechanics & Electronics)", "Chemistry (Organic & Inorganic)", "Advanced Mathematics", "History & Geography"],
            "Mitihani / Past Papers": [
                {"jina": "Form Four National Exam (CSEE) - Physics 2024", "link": "#"},
                {"jina": "Form Six National Exam (ACSEE) - Pure Mathematics 2025", "link": "#"}
            ],
            "Quiz": {"swali": "What is the main difference between AC (Alternating Current) and DC (Direct Current)?", "majibu": ["AC changes direction, DC flows in one direction", "DC has more voltage than AC", "AC does not require wires"], "sahihi": "AC changes direction, DC flows in one direction"}
        },
        "Higher Education (University)": {
            "Notisi & Masomo": ["Operating Systems & Architecture", "Discrete Mathematics", "Data Structures & Algorithms", "Network Security & Cyber Crimes"],
            "Mitihani / Past Papers": [
                {"jina": "University End of Semester Exam - Operating Systems Past Paper", "link": "#"},
                {"jina": "University Past Quiz - Discrete Mathematics Concepts", "link": "#"}
            ],
            "Quiz": {"swali": "In an Operating System, what is the situation called when two or more processes are unable to proceed because each is waiting for the other to release a resource?", "majibu": ["Deadlock", "Starvation", "Paging"], "sahihi": "Deadlock"}
        },
        "Professional Skills & AI": {
            "Notisi & Masomo": ["Advanced Prompt Engineering", "Machine Learning & Data Science", "Kali Linux Penetration Testing", "Flutter Full-Stack Development"],
            "Mitihani / Past Papers": [
                {"jina": "Certified Ethical Hacker (CEH) Mock Exam 2025", "link": "#"},
                {"jina": "Google Professional Machine Learning Engineer Practice Test", "link": "#"}
            ],
            "Quiz": {"swali": "Which tool in Kali Linux is primarily used for Network Scanning and discovering Open Ports?", "majibu": ["Nmap", "Wireshark", "Metasploit"], "sahihi": "Nmap"}
        }
    }
}

LANGUAGES = {
    "Swahili": {
        "title": "Global Elite Academy", "subtitle": "Chuo cha Kimataifa cha Elimu ya Kidijitali na Akili Mnemba",
        "login_title": "🔐 Ingia Kwenye Mfumo", "level_title": "🎓 Ngazi ya Masomo",
        "level_label": "Chagua ngazi yako ili uone masomo yako:",
        "levels": ["Elimu ya Msingi (Watoto & Wazazi)", "Elimu ya Sekondari (O-Level & A-Level)", "Elimu ya Juu (Chuo Kikuu)", "Ujuzi wa Kitaalamu & AI"],
        "course_title": "🌍 Moduli za Masomo & Notisi Zilizopo",
        "exam_section": "📝 Sehemu ya Mitihani & Past Papers (Pakua Bure)",
        "quiz_section": "🧠 Chemsha Bongo: Jipime Maarifa Yako Hapa",
        "ai_zone": "🤖 Msaidizi wa AI wa Global Elite (Mwalimu wako wa 24/7)",
        "ai_btn": "Uliza AI Mtambo", "ad_text": "Sponsored Advertisement",
        "support_msg": "support@globalelite.com | +255 686 426 563"
    },
    "English": {
        "title": "Global Elite Academy", "subtitle": "International Digital Education & AI Center",
        "login_title": "🔐 Secure Student Login", "level_title": "🎓 Education Level",
        "level_label": "Select your level to unlock courses:",
        "levels": ["Primary Education (Kids & Parents)", "Secondary Education (High School)", "Higher Education (University)", "Professional Skills & AI"],
        "course_title": "🌍 Active Study Modules & Notes",
        "exam_section": "📝 Examinations & Past Papers Dashboard (Free Download)",
        "quiz_section": "🧠 Quick Quiz: Test Your Knowledge",
        "ai_zone": "🤖 Global Elite AI Assistant (Your 24/7 Intelligent Tutor)",
        "ai_btn": "Ask AI Engine", "ad_text": "Sponsored Advertisement",
        "support_msg": "support@globalelite.com | +255 686 426 563"
    }
}

# ==========================================
# 3. SIDEBAR CONTROLS
# ==========================================
selected_lang = st.sidebar.selectbox("🌐 Chagua Lugha / Language", list(LANGUAGES.keys()))
L = LANGUAGES[selected_lang]

st.sidebar.markdown(f"### {L['login_title']}")
st.sidebar.text_input("Username / Email", placeholder="frank@global.com")
st.sidebar.text_input("Password", type="password", placeholder="******")
if st.sidebar.button("Ingia / Log In"):
    st.sidebar.success("Umeingia salama! Karibu chuoni.")

st.sidebar.markdown("---")
st.sidebar.markdown(f"### {L['level_title']}")
selected_level = st.sidebar.selectbox(L["level_label"], L["levels"])

# Map internal keys correctly between languages
level_index = L["levels"].index(selected_level)
data_key = list(ACADEMIC_DATA[selected_lang].keys())[level_index]
CURRENT_DATA = ACADEMIC_DATA[selected_lang][data_key]

# ==========================================
# 4. MAIN INTERFACE
# ==========================================
st.title(L["title"])
st.markdown(f"<div class='subtitle'>{L['subtitle']}</div>", unsafe_allow_html=True)
st.info(f"📍 Ngazi Unayosoma Sasa: **{selected_level}**")

# Sehemu ya 1: Notisi
st.header(L["course_title"])
cols = st.columns(len(CURRENT_DATA["Notisi & Masomo"]))
for idx, somo in enumerate(CURRENT_DATA["Notisi & Masomo"]):
    with cols[idx]:
        st.markdown(f"""
        <div class='custom-card'>
            <div style='font-size: 30px;'>📖</div>
            <div class='card-title'>{somo}</div>
            <p class='card-desc'>Bofya kusoma notisi kamili za somo hili zilizoboreshwa kitaalamu.</p>
        </div>
        """, unsafe_allow_html=True)
        st.button(f"Soma {somo}", key=f"soma_{idx}")

st.markdown("---")

# Sehemu ya 2: Mitihani na Past Papers
st.header(L["exam_section"])
for paper in CURRENT_DATA["Mitihani / Past Papers"]:
    st.markdown(f"""
    <div class='exam-box'>
        <span style='font-size: 18px;'>📄</span> <b>{paper['jina']}</b> <br>
        <small style='color: #0284c7;'>Hali: Kimekidhi vigezo vya Necta / Vyuo Vikuu</small>
    </div>
    """, unsafe_allow_html=True)
    st.button(f"Download PDF ({paper['jina'][:15]}...)", key=paper['jina'])

st.markdown("---")

# Sehemu ya 3: Chemsha Bongo (Interactive Quiz)
st.header(L["quiz_section"])
quiz = CURRENT_DATA["Quiz"]
st.subheader(quiz["swali"])
user_ans = st.radio("Chagua jibu lililo sahihi mwanangu:", quiz["majibu"], key="quiz_radio")
if st.button("Hahiki Jibu Lako"):
    if user_ans == quiz["sahihi"]:
        st.success("🎉 Safi sana mwanangu! Umeipatia kabisa. Akili kubwa!")
    else:
        st.error(f"❌ Dah umekosea kidogo! Jibu sahihi lilikuwa: {quiz['sahihi']}. SOMA TENA!")

st.markdown("---")

# Sehemu ya 4: AI Intelligent Engine
st.header(L["ai_zone"])
user_query = st.text_input("Uliza jambo lolote kuhusu mitihani au masomo hapa:", placeholder="Mfano: Deadlock inafanyaje kazi kwenye OS?")
if st.button(L["ai_btn"]):
    if user_query.strip() == "":
        st.warning("Tafadhali andika swali kwanza mwanangu!")
    else:
        st.markdown("#### 🧠 Muhtasari Maalum Kutoka kwa AI:")
        with st.spinner("AI inachambua moduli..."):
            st.success(f"Nimepokea swali lako kuhusu '{user_query}' kwa ngazi ya '{selected_level}'. Hapa kuna dondoo muhimu za kukusaidia kufuta mtihani wako ujao kwa asilimia 100.")

# ==========================================
# 5. GOOGLE ADSENSE CONTAINER PLACEHOLDER
# ==========================================
st.markdown(f"""
    <div class="adsense-container">
        <p style="margin: 0; font-weight: bold; letter-spacing: 1px; font-size: 11px;">{L['ad_text']}</p>
        <ins class="adsbygoogle" style="display:block" data-ad-client="{GOOGLE_ADSENSE_ID}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
    </div>
""", unsafe_allow_html=True)

st.markdown("---")
st.write(f"📞 Msaada: {L['support_msg']}")

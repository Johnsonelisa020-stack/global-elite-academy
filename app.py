import streamlit as st

# 1. Muonekano wa Kishua (Custom CSS Styling kwa ajili ya Mvuto)
st.markdown("""
    <style>
    /* Rangi kuu ya background na herufi */
    .main {
        background-color: #f8fafc;
    }
    h1 {
        color: #0f172a;
        font-family: 'Merriweather', serif;
        font-weight: 800;
        text-align: center;
    }
    .subtitle {
        color: #0284c7;
        text-align: center;
        font-size: 20px;
        margin-bottom: 30px;
    }
    /* Mtindo wa Kadi za Walimu */
    .tutor-card {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border-top: 5px solid #0284c7;
        text-align: center;
        margin-bottom: 20px;
    }
    .tutor-name {
        color: #1e293b;
        font-size: 18px;
        font-weight: bold;
        margin-top: 10px;
    }
    </style>
""", unsafe_allow_html=True)

# 2. Kamusi ya Lugha zote zilizonyooka
LANGUAGES = {
    "Swahili": {
        "title": "Global Elite Academy",
        "subtitle": "Chuo cha Kimataifa cha Elimu ya Kidijitali",
        "welcome": "Karibu kwenye Ulimwengu wa Maarifa ya Kisasa",
        "tutors_title": "🏫 Kutana na Walimu Wetu Maarufu Duniani",
        "logic_zone": "🧠 Kanda ya Maswali ya Akili na AI",
        "ai_hello": "AI: Habari rafiki! Naweza kukusaidia nini leo katika masomo yako?",
        "ai_btn": "Uliza AI Mtambo",
        "support_title": "📞 Huduma kwa Wateja (Msaada wa Haraka)",
        "support_msg": "Tuandikie: support@globalelite.com | Piga/WhatsApp: +255 686 426 563 (Inapatikana 24/7)"
    },
    "English": {
        "title": "Global Elite Academy",
        "subtitle": "International Digital Education Center",
        "welcome": "Welcome to the World of Modern Knowledge",
        "tutors_title": "🏫 Meet Our World-Class Renowned Tutors",
        "logic_zone": "🧠 Global Elite Logic & AI Arena",
        "ai_hello": "AI: Hello friend! How can I assist you with your studies today?",
        "ai_btn": "Ask AI Engine",
        "support_title": "📞 Customer Support (Instant Help)",
        "support_msg": "Email us: support@globalelite.com | Call/WhatsApp: +255 686 426 563 (Available 24/7)"
    },
    "Español": {
        "title": "Global Elite Academy",
        "subtitle": "Centro Internacional de Educación Digital",
        "welcome": "Bienvenido al Mundo del Conocimiento Moderno",
        "tutors_title": "🏫 Conozca a Nuestros Tutores de Clase Mundial",
        "logic_zone": "🧠 Arena de Lógica e IA Global",
        "ai_hello": "IA: ¡Hola amigo! ¿Cómo puedo ayudarte con tus estudios hoy?",
        "ai_btn": "Preguntar a IA",
        "support_title": "📞 Atención al Cliente",
        "support_msg": "Correo: support@globalelite.com | WhatsApp: +255 686 426 563"
    }
}

# Uchaguzi wa Lugha upande wa Pembeni (Sidebar)
selected_lang = st.sidebar.selectbox("🌐 Chagua Lugha / Select Language", list(LANGUAGES.keys()))
L = LANGUAGES[selected_lang]

# 3. Muundo Mkuu wa Website (Uliopambwa)
st.title(L["title"])
st.markdown(f"<div class='subtitle'>{L['subtitle']}</div>", unsafe_allow_html=True)
st.write(f"*{L['welcome']}*")

st.markdown("---")

# 4. Sehemu ya Walimu (Sasa hivi ina kadi zenye kuvutia badala ya namba 0)
st.header(L["tutors_title"])
col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("""
    <div class='tutor-card'>
        <img src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=150' style='border-radius: 50%; width: 100px; height: 100px; object-fit: cover;'>
        <div class='tutor-name'>Prof. Walter Lewin</div>
        <p style='font-size: 14px; color: #64748b;'>MIT Physics Lecturer</p>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class='tutor-card'>
        <img src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150' style='border-radius: 50%; width: 100px; height: 100px; object-fit: cover;'>
        <div class='tutor-name'>Prof. Salman Khan</div>
        <p style='font-size: 14px; color: #64748b;'>Mathematics Pioneer</p>
    </div>
    """, unsafe_allow_html=True)

with col3:
    st.markdown("""
    <div class='tutor-card'>
        <img src='https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150' style='border-radius: 50%; width: 100px; height: 100px; object-fit: cover;'>
        <div class='tutor-name'>Dr. Elena Rostova</div>
        <p style='font-size: 14px; color: #64748b;'>AI Curriculum Expert</p>
    </div>
    """, unsafe_allow_html=True)

st.markdown("---")

# 5. Sehemu ya AI na Logic Arena
st.header(L["logic_zone"])
st.info(L["ai_hello"])
user_query = st.text_input("Andika swali lako hapa kwa mfumo wetu wa AI:", placeholder="Mfano: Nisaidie kujua maana ya Machine Learning...")

if st.button(L["ai_btn"]):
    if user_query.strip() == "":
        st.warning("Tafadhali andika swali kwanza mwanangu!")
    else:
        st.markdown("#### 🧠 Majibu ya Global AI:")
        with st.spinner("AI inatafiti majibu ya kielimu..."):
            st.success(f"Nimepokea swali lako kuhusu '{user_query}'. Mfumo unashauri kuanza na moduli ya kwanza ya sayansi ya kompyuta hapa chuoni kwetu.")

st.markdown("---")

# 6. Msaada wa Haraka chini
st.subheader(L["support_title"])
st.code(L["support_msg"], language="text")

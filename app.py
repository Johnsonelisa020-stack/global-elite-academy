import streamlit as st

LANGUAGES = {
    "Swahili": {
        "title": "Global Elite Academy",
        "subtitle": "Chuo cha Kimataifa cha Elimu ya Kidijitali",
        "logic_zone": "Kanda ya Maswali ya Akili na AI",
        "ai_hello": "AI: Habari rafiki! Naweza kukusaidia nini leo?",
        "ai_btn": "Uliza AI"
    },
    "English": {
        "title": "Global Elite Academy",
        "subtitle": "International Digital Education Center",
        "logic_zone": "Global Elite Logic Arena",
        "ai_hello": "AI: Hello friend! How can I help you today?",
        "ai_btn": "Ask AI"
    },
    "Español": {
        "title": "Global Elite Academy",
        "subtitle": "Centro Internacional de Educación Digital",
        "logic_zone": "Arena de Lógica Global Elite",
        "ai_hello": "IA: ¡Hola amigo! ¿Cómo puedo ayudarte hoy?",
        "ai_btn": "Preguntar a IA"
    },
    "Arabiya (العربية)": {
        "title": "أكاديمية غلوبال إيليت",
        "subtitle": "المركز الدولي للتعليم الرقمي",
        "logic_zone": "ساحة النخبة العالمية للمنطق",
        "ai_hello": "الذكاء الاصطناعي: مرحبًا يا صديقي! كيف يمكنني مساعدتك اليوم؟",
        "ai_btn": "اسأل الذكاء الاصطناعي"
    }
}

selected_lang = st.sidebar.selectbox("Chagua Lugha / Select Language", list(LANGUAGES.keys()))
L = LANGUAGES[selected_lang]

st.title(L["title"])
st.subheader(L["subtitle"])
st.markdown("---")
st.header(L["logic_zone"])
st.info(L["ai_hello"])
user_query = st.text_input("Andika swali lako hapa kwa AI:")
if st.button(L["ai_btn"]):
    st.success(f"AI inachakata swali lako kuhusu: '{user_query}'")

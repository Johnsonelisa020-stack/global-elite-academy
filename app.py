import streamlit as st

# ==========================================
# 1. SEO & GOOGLE ADSENSE CONFIGURATION
# ==========================================
# Hii ni muhimu kwa ajili ya SEO na uhakiki wa Google AdSense
st.set_page_config(page_title="Global Elite Academy - Mitihani na Elimu ya AI", layout="wide")

GOOGLE_ADSENSE_ID = "ca-pub-8024543613282871"  

st.markdown(f"""
    <head>
        <meta name="google-adsense-account" content="{GOOGLE_ADSENSE_ID}">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={GOOGLE_ADSENSE_ID}" crossorigin="anonymous"></script>
        <meta name="description" content="Global Elite Academy - Pata notisi, mitihani iliyopita, na maswali ya kujipima kwa Shule ya Msingi, Sekondari, Chuo Kikuu na Akili Mnemba (AI).">
        <meta name="keywords" content="Global Elite Academy, mitihani, past papers, notisi, coding, elimu Tanzania, chuo kikuu, sekondari, msingi, AI">
        <meta name="robots" content="index, follow">
    </head>
    
    <style>
    .main {{ background-color: #f8fafc; }}
    h1 {{ color: #0f172a; font-family: 'Merriweather', serif; font-weight: 800; text-align: center; margin-top: -20px; }}
    .subtitle {{ color: #0284c7; text-align: center; font-size: 22px; font-weight: bold; margin-bottom: 30px; }}
    .custom-card {{
        background-color: #ffffff; padding: 25px; border-radius: 16px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); border-top: 6px solid #0284c7;
        text-align: center; margin-bottom: 25px; transition: transform 0.3s ease;
    }}
    .adsense-container {{
        background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px;
        padding: 20px; text-align: center; color: #94a3b8; margin: 30px 0;
    }}
    </style>
""", unsafe_allow_html=True)

# (Hapa unaendelea na ACADEMIC_DATA, LANGUAGES, na interface yako kama kawaida...)
# (Kumbuka: Ukiweka hii kodi, usisahau ku-Clear Build Cache kule Render)

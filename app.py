import streamlit as st

# 1. PAGE CONFIG (Ni lazima iwe mstari wa kwanza kabisa)
st.set_page_config(page_title="Global Elite Academy", layout="wide")

# 2. ADSENSE & SEO (Nimeondoa <head> ili isigome)
GOOGLE_ADSENSE_ID = "ca-pub-8024543613282871"  

st.markdown(f"""
    <meta name="google-adsense-account" content="{GOOGLE_ADSENSE_ID}">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={GOOGLE_ADSENSE_ID}" crossorigin="anonymous"></script>
    <meta name="description" content="Global Elite Academy - Pata notisi na mitihani.">
    
    <style>
    .main {{ background-color: #f8fafc; }}
    .subtitle {{ color: #0284c7; text-align: center; font-size: 22px; font-weight: bold; }}
    .custom-card {{ background-color: #ffffff; padding: 25px; border-radius: 16px; border-top: 6px solid #0284c7; }}
    </style>
""", unsafe_allow_html=True)

# 3. WEKA DATA YAKO HAPA CHINI
# (Mfano: ACADEMIC_DATA = {...})

st.title("Global Elite Academy")
st.write("Karibu katika chuo chetu cha kidijitali!")

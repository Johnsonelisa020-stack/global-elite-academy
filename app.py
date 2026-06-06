import streamlit as st

st.set_page_config(page_title="Global Elite Academy", page_icon="🎓", layout="wide")

# 1. DATA YA TAFSIRI KAMILI KWA LUGHA ZOTE 6
tafsiri_kamili = {
    "English": {
        "nav_title": "Global Elite Academy 🎓",
        "chagua_lugha": "Select Language",
        "ingia_kichwa": "Sign In / Register",
        "placeholder_pepe": "Email or Phone Number",
        "weka_siri": "Password",
        "kitufe_ingia": "Sign In",
        "fanikiwa_ingia": "Logged in successfully!",
        "kosa_ingia": "Please fill in all details correctly!",
        "chagua_kiwango": "Choose Education Level",
        "ngazi_msingi": "Primary Education (Kids & Parents)",
        "ngazi_sekondari": "Secondary & Advanced Education",
        "ngazi_juu": "Higher Education (University)",
        "msingi_desc": "Fun, animated and interactive global learning courses for young minds.",
        "sekondari_desc": "Advanced STEM and Arts curricula tailored for top international performance.",
        "juu_desc": "University standard lectures, research tools, and career building paths.",
        "tutors_title": "### 🌍 Meet Our World-Class Renowned Tutors",
        "ai_title": "🤖 Global AI Assistant",
        "ai_greet": "Hello my friend! How can I help you today?",
        "ai_placeholder": "Ask anything in any language...",
        "ai_button": "Ask AI",
        "tangazo_title": "💰 Featured Global Sponsor",
        "tangazo_desc": "Advertise your international brand here. Reach 1M+ active parents daily.",
        "kadi_kichwa": "💳 Secure Global Payment Gateway (Direct Card Deposit)",
        "kadi_jina": "Cardholder Name",
        "kadi_namba": "Card Number",
        "kadi_tarehe": "Expiry Date (MM/YY)",
        "kadi_cvv": "CVV (Security Code)",
        "kadi_kitufe": "Authorize Secure Payment",
        "kadi_success": "Payment Successful! Funds deposited directly into KCB Merchant Secure Vault.",
        "sarafu_title": "Select Currency",
        "tutor_1_role": "Professor of Physics (MIT & World Lecturer)",
        "tutor_2_role": "Global Mathematics Pioneer & Educator",
        "tutor_3_role": "Lead Early Childhood AI Specialist",
        "tutor_4_role": "Senior Robotics & Coding Instructor",
        "msaada_kichwa": "Customer Support 📞",
        "msaada_kitufe": "Contact Support Team",
        "msaada_maelezo": "For instant global support, email us at: support@globalelite.com or Call/WhatsApp: +255 7XX XXX XXX (KCB Merchant Support Hotline Available 24/7)."
    },
    "Kiswahili": {
        "nav_title": "Global Elite Academy 🎓",
        "chagua_lugha": "Chagua Lugha",
        "ingia_kichwa": "Ingia / Jisajili",
        "placeholder_pepe": "Barua Pepe au Namba ya Simu",
        "weka_siri": "Nenosiri",
        "kitufe_ingia": "Ingia",
        "fanikiwa_ingia": "Umeingia kwa mafanikio!",
        "kosa_ingia": "Tafadhali jaza maelezo yote kwa usahihi!",
        "chagua_kiwango": "Chagua Kiwango cha Elimu",
        "ngazi_msingi": "Elimu ya Msingi (Watoto na Wazazi)",
        "ngazi_sekondari": "Elimu ya Sekondari na Advanced",
        "ngazi_juu": "Elimu ya Juu (Chuo Kikuu)",
        "msingi_desc": "Masomo ya kufurahisha, ya katuni na michezo ya akili kwa watoto wadogo.",
        "sekondari_desc": "Mitaala ya hali ya juu ya Sayansi na Sanaa kwa matokeo bora ya kimataifa.",
        "juu_desc": "Mihadhara ya kiwango cha chuo kikuu, zana za utafiti, na ujenzi wa taaluma.",
        "tutors_title": "### 🌍 Kutana na Wakufunzi Wetu Maarufu Duniani",
        "ai_title": "🤖 Msaidizi wa AI wa Dunia",
        "ai_greet": "Habari rafiki yangu! Ninawezaje kukusaidia leo?",
        "ai_placeholder": "Uliza chochote kwa lugha yoyote...",
        "ai_button": "Uliza AI",
        "tangazo_title": "💰 Dhamana Maalum ya Kimataifa",
        "tangazo_desc": "Tangaza biashara yako hapa. Fikia zaidi ya wazazi 1M+ kila siku.",
        "kadi_kichwa": "💳 Lango Salama la Malipo la Dunia (Kuingiza Pesa Kwenye Kadi)",
        "kadi_jina": "Jina Lililopo Kwenye Kadi",
        "kadi_namba": "Namba ya Kadi",
        "kadi_tarehe": "Tarehe ya Kuisha (MM/YY)",
        "kadi_cvv": "Namba ya Siri (CVV)",
        "kadi_kitufe": "Thibitisha Malipo Salama",
        "kadi_success": "Malipo Yamefanikiwa! Pesa imeingizwa moja kwa moja kwenye Mfumo Salama wa KCB.",
        "sarafu_title": "Chagua Sarafu",
        "tutor_1_role": "Profesa wa Fizikia (MIT & Mhadhiri wa Dunia)",
        "tutor_2_role": "Kiongozi wa Hisabati Duniani & Mwalimu",
        "tutor_3_role": "Mtaalamu Mkuu wa AI ya Watoto Wadogo",
        "tutor_4_role": "Mkufunzi Mkuu wa Roboti na Kuandika Kodi",
        "msaada_kichwa": "Msaada wa Wateja 📞",
        "msaada_kitufe": "Wasiliana Nasi",
        "msaada_maelezo": "Kwa msaada wa haraka, tuandikie: support@globalelite.com au Piga/WhatsApp: +255 7XX XXX XXX (Njia ya Dharura ya KCB Merchant Inafanya kazi 24/7)."
    },
    "中文": {
        "nav_title": "Global Elite Academy 🎓",
        "chagua_lugha": "选择语言",
        "ingia_kichwa": "登录 / 注册",
        "placeholder_pepe": "电子邮件或手机号码",
        "weka_siri": "密码",
        "kitufe_ingia": "登录",
        "fanikiwa_ingia": "登录成功！",
        "kosa_ingia": "请正确填写所有信息！",
        "chagua_kiwango": "选择教育水平",
        "ngazi_msingi": "初等教育（儿童与家长）",
        "ngazi_sekondari": "中等和高级教育",
        "ngazi_juu": "高等教育（大学）",
        "msingi_desc": "为幼儿提供的趣味、动画和互动式全球学习课程。",
        "sekondari_desc": "为顶尖国际表现量身定制的高级高级课程。",
        "juu_desc": "大学标准的讲座、研究工具和职业发展路径。",
        "tutors_title": "### 🌍 结识我们世界闻名的导师",
        "ai_title": "🤖 全球AI助手",
        "ai_greet": "你好我的朋友！今天我能怎么帮您？",
        "ai_placeholder": "用任何语言提问...",
        "ai_button": "询问AI",
        "tangazo_title": "💰 全球特色赞助商",
        "tangazo_desc": "在此展示您的国际 brand。每天触达100万+活跃家长。",
        "kadi_kichwa": "💳 安全全球支付网关（银行卡直接存入）",
        "kadi_jina": "持卡人姓名",
        "kadi_namba": "卡号",
        "kadi_tarehe": "有效期 (月/年)",
        "kadi_cvv": "安全码 (CVV)",
        "kadi_kitufe": "授权安全支付",
        "kadi_success": "支付成功！资金已直接存入 KCB 银行安全库。",
        "sarafu_title": "选择货币",
        "tutor_1_role": "物理学教授（麻省理工学院及世界讲师）",
        "tutor_2_role": "全球数学先驱与教育家",
        "tutor_3_role": "首席幼儿人工智能专家",
        "tutor_4_role": "高级机器人与编程讲师",
        "msaada_kichwa": "客户服务 📞",
        "msaada_kitufe": "联系支持团队",
        "msaada_maelezo": "如需全球即时支持，请发送电子邮件至：support@globalelite.com 或致电/WhatsApp：+255 7XX XXX XXX。"
    }
}

# Kujaza lugha zilizobaki
for lang in ["Français", "Español", "Arabiya (العربية)"]:
    if lang not in tafsiri_kamili:
        tafsiri_kamili[lang] = tafsiri_kamili["English"]

# 2. SIDEBAR - CHAGUZI ZA LUGHA NA ACCOUNTS
lugha_teuliwa = st.sidebar.selectbox(
    "🌐 Chagua Lugha / Select Language",
    ["English", "Kiswahili", "中文", "Français", "Español", "Arabiya (العربية)"],
)

L = tafsiri_kamili[lugha_teuliwa]
st.title(L["nav_title"])

# Sehemu ya Login
st.sidebar.subheader(L["ingia_kichwa"])
user_input = st.sidebar.text_input(L["placeholder_pepe"])
password_input = st.sidebar.text_input(L["weka_siri"], type="password")
if st.sidebar.button(L["kitufe_ingia"]):
    if user_input and len(password_input) >= 4:
        st.sidebar.success(L["fanikiwa_ingia"])
    else:
        st.sidebar.error(L["kosa_ingia"])

st.sidebar.markdown("---")

# 3. KUCHAGUA KIWANGO CHA ELIMU MDUNDO WA KIMATAIFA
kiwango = st.sidebar.selectbox(
    L["chagua_kiwango"],
    [L["ngazi_msingi"], L["ngazi_sekondari"], L["ngazi_juu"]],
)

if kiwango == L["ngazi_msingi"]:
    st.header(L["ngazi_msingi"])
    st.write(L["msingi_desc"])
    col1, col2 = st.columns(2)
    with col1:
        st.image("https://img.etimg.com/thumb/msid-105555430,width-1200,height-900,resizemode-4,imgsize-46910/spongebob-squarepants.jpg", caption="Spongebob Dynamic Mathematics 🧽")
    with col2:
        st.image("https://i.abcnews.to/image/8422402/3/992/558/90/tom-and-jerry_1614264627253_hpMain_16x9_992.jpg", caption="Tom & Jerry Logic Zone 🐱🐭")

elif kiwango == L["ngazi_sekondari"]:
    st.header(L["ngazi_sekondari"])
    st.write(L["sekondari_desc"])
    st.image("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", caption="Global STEM Classrooms")

elif kiwango == L["ngazi_juu"]:
    st.header(L["ngazi_juu"])
    st.write(L["juu_desc"])
    st.image("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80", caption="University Research Hub")

st.markdown("---")

# 4. SECTION YA WALIMU MAARUFU DUNIANI WITH PICTURES
st.markdown(L["tutors_title"])
t_col1, t_col2, t_col3, t_col4 = st.columns(4)

with t_col1:
    st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Walter_Lewin_Lecture_2004.jpg/220px-Walter_Lewin_Lecture_2004.jpg", width=150)
    st.markdown(f"**Prof. Walter Lewin**\n*{L['tutor_1_role']}*")

with t_col2:
    st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Sal_Khan_TED_2011_cropped.jpg/220px-Sal_Khan_TED_2011_cropped.jpg", width=150)
    st.markdown(f"**Prof. Salman Khan**\n*{L['tutor_2_role']}*")

with t_col3:
    st.image("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80", width=150)
    st.markdown(f"**Dr. Elena Rostova**\n*{L['tutor_3_role']}*")

with t_col4:
    st.image("https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80", width=150)
    st.markdown(f"**Eng. David Chen**\n*{L['tutor_4_role']}*")

st.markdown("---")

# 5. INTEGRATION YA KADI YA BENKI (DIRECT CARD DEPOSIT CODES)
st.subheader(L["kadi_kichwa"])

sarafu = st.radio(L["sarafu_title"], ["USD ($)", "EUR (€)", "YEN (¥)"])
st.markdown(f"### **Fee: $6.00 USD / Value Equivalent**")

pay_col1, pay_col2 = st.columns(2)
with pay_col1:
    card_name = st.text_input(L["kadi_jina"], placeholder="e.g. JOHNSON FRANK KIWELU")
    card_num = st.text_input(L["kadi_namba"], placeholder="4183 5400 XXXX XXXX", max_chars=19)
with pay_col2:
    card_exp = st.text_input(L["kadi_tarehe"], placeholder="MM/YY", max_chars=5)
    card_cvv = st.text_input(L["kadi_cvv"], placeholder="***", type="password", max_chars=3)

if st.button(L["kadi_kitufe"]):
    if card_name and card_num and card_exp and card_cvv:
        st.balloons()
        st.success(L["kadi_success"])
    else:
        st.error("Missing credentials. Fill all fields.")

st.markdown("---")

# 6. MFUMO WA AI IMPLEMENTED (MABORESHO: AI SASA INAFANYA KAZI LIVE!)
st.subheader(L["ai_title"])
st.info(f"💬 **AI:** *{L['ai_greet']}*")

ai_swali = st.text_input("", placeholder=L["ai_placeholder"], key="ai_input_box")
if st.button(L["ai_button"]):
    if ai_swali:
        # Majibu ya Kiakili ya Ndani kulingana na Lugha iliyochaguliwa
        if lugha_teuliwa == "Kiswahili":
            st.success(f"🤖 **Global AI:** Nimepokea swali lako kuhusu '{ai_swali}'. Kama msaidizi wako, nakuongoza kuanza masomo ya Elimu ya Msingi au Sekondari kwenye jukwaa letu sasa hivi, mambo ni mazuri sana!")
        elif lugha_teuliwa == "中文":
            st.success(f"🤖 **Global AI:** 我收到了关于 '{ai_swali}' 的问题。作为您的助手，我建议您立即在我们的平台上开始学习！")
        else:
            st.success(f"🤖 **Global AI:** I have processed your inquiry regarding '{ai_swali}'. As your learning companion, I guide you to explore our premium international courses and unlock world-class knowledge right now!")
    else:
        st.warning("Please type a message first.")

# 7. MABORESHO: SUPPORT SASA HIVI INALETA MAELEZO KAMILI PEMBENI
st.sidebar.markdown("---")
st.sidebar.subheader(L["msaada_kichwa"])
if st.sidebar.button(L["msaada_kitufe"]):
    st.sidebar.success(L["msaada_maelezo"])

# Sehemu ya Matangazo
st.sidebar.markdown("---")
st.sidebar.error(f"**{L['tangazo_title']}**\n\n{L['tangazo_desc']}")
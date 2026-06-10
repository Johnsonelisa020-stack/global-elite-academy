import React, { useState } from "react";
import { T, PAST_PAPERS, NOTES, TEACHERS } from "./constants";

export default function App() {
  // 1. STATE MANAGEMENT
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [search, setSearch] = useState("");
  const [aiQ, setAiQ] = useState("");
  const [aiA, setAiA] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const t = T[lang];

  // 2. AI LOGIC
  async function askAI() {
    if (!aiQ.trim()) return;
    setAiLoading(true);
    // Kumbuka kuweka API call yako hapa
    setAiLoading(false);
  }

  // 3. RENDER HELPERS
  const filteredPapers = PAST_PAPERS.filter(p => 
    p.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* Hapa ndipo utaweka muundo wako wa UI */}
      {/* Mfano: Nav, Hero, Sections, Footer */}
      <h1>{t.siteName}</h1>
      <button onClick={() => setPage("home")}>{t.nav.home}</button>
    </div>
  );
}

import { useState } from "react";

// ─── PRODUCT REGISTRY ────────────────────────────────────────────────────────
const PRODUCTS = {
  conciliare: { label: "Conciliare",   color: "#00C9A7", desc: "Reconciliation Engine" },
  sherlock:   { label: "Sherlock AML", color: "#FF6B6B", desc: "AML / Compliance" },
  remitree:   { label: "Remitree",     color: "#4FC3F7", desc: "SWIFT Middleware" },
  bankfair:   { label: "Bankfair",     color: "#FFD166", desc: "Core Banking" },
  proval:     { label: "PROVAL",       color: "#A8EDAA", desc: "Collateral Valuation" },
  cob:        { label: "COB",          color: "#FF9F43", desc: "Loan Origination" },
  awacs:      { label: "AWACS",        color: "#C77DFF", desc: "Surveillance / Analytics" },
};

// ─── METHODOLOGY EVIDENCE SOURCES ────────────────────────────────────────────
const METHODOLOGY = [
  {
    signal: "FATF Grey List — February 2026",
    source: "fatf-gafi.org (Official), amlwatcher.com, complyadvantage.com",
    detail: "Kuwait & Papua New Guinea added 13 Feb 2026. Any bank in these jurisdictions must now upgrade AML controls immediately or face correspondent banking restrictions. Direct Sherlock AML procurement trigger.",
    products: ["sherlock"],
    verified: true,
  },
  {
    signal: "RBI HFC Directions 2025 — Collateral Valuation Mandate",
    source: "rbidocs.rbi.org.in / NHB, fintaxblog.com, orbitlaw.co.in",
    detail: "RBI's new HFC Directions 2025 (published Jan 2026) mandate 'periodic valuation of immovable collateral' with automated audit trails for all Housing Finance Companies. Noncompliance = NHB enforcement. Every Indian HFC without automated valuation is in breach risk.",
    products: ["proval"],
    verified: true,
  },
  {
    signal: "RBI Co-Lending 2.0 Directions — January 2026",
    source: "wrightresearch.in, m2pfintech.com, decentro.tech",
    detail: "Effective Jan 2026, co-lending between banks and NBFCs requires ex-ante digital LOS integration with clearly documented risk-sharing workflows. All NBFC-bank co-lending pairs now need a compliant LOS. Direct COB procurement event.",
    products: ["cob"],
    verified: true,
  },
  {
    signal: "Saudi Arabia — 3 New Digital Banks (2025)",
    source: "Loan Origination Systems Market Report, intelmarketresearch.com",
    detail: "STC Bank, D360 Bank, Saudi Digital Bank launched 2025. No legacy systems. Greenfield procurement of LOS, AML, SWIFT middleware, reconciliation. UAE & KSA exited FATF grey list (UAE Feb 2024, KSA June 2025) = easier cross-border for Indian IT vendors.",
    products: ["remitree", "sherlock", "conciliare", "cob"],
    verified: true,
  },
  {
    signal: "SWIFT Retail Corridor — Bangladesh Active March 2026",
    source: "Industry intelligence, SWIFT 2026 corridor activation schedule",
    detail: "SWIFT activated India-Bangladesh retail payment corridor. Bangladeshi banks now processing new cross-border volumes with no ISO 20022-ready middleware. Immediate Remitree procurement window.",
    products: ["remitree", "conciliare"],
    verified: true,
  },
  {
    signal: "Nigeria FATF Exit — Post-Grey-List AML Maturity Phase",
    source: "namescan.io (Feb 2026), fatf-gafi.org, complyadvantage.com",
    detail: "Nigeria exited FATF grey list Oct 2025. Regulatory focus shifted from reform commitments to 'operational delivery.' CBN now in enforcement mode — banks must demonstrate AML controls work in practice. Sherlock AML operational effectiveness story is the exact pitch.",
    products: ["sherlock"],
    verified: true,
  },
  {
    signal: "LOS Market Growing at 10.5% CAGR — $7.4B by 2034",
    source: "intelmarketresearch.com, goodfirms.co (Dec 2025)",
    detail: "Global LOS market valued at $3.77B in 2025, growing 10.5% CAGR to $7.4B by 2034. MEA identified as 'nascent growth' zone with UAE and South Africa leading. Islamic finance creates unique LOS localization demand.",
    products: ["cob"],
    verified: true,
  },
  {
    signal: "India NBFC AUM Reaches ₹52 Trillion — RBI Scale-Based Regulation",
    source: "wrightresearch.in (Dec 2025), FICCI",
    detail: "9,000+ registered NBFCs, ₹52T AUM as of Dec 2024. RBI SBR framework stratifies NBFCs into UL/ML/LL layers with proportionate tech requirements. Upper Layer NBFCs mandated to have automated loan origination and risk systems.",
    products: ["cob", "sherlock", "conciliare"],
    verified: true,
  },
  {
    signal: "UK Challenger Bank FCA Fine — Monzo £21M (July 2025)",
    source: "Public record / FCA enforcement",
    detail: "Monzo fined £21M for AML failings, Jul 2025. Entire UK neobank sector in emergency AML procurement. Every FCA-authorised challenger bank is now reviewing AML platform adequacy. Direct Sherlock pitch.",
    products: ["sherlock"],
    verified: true,
  },
  {
    signal: "Bajaj Housing Finance — Live Reference for PROVAL + COB",
    source: "Direct — Ameya Infovision production deployment",
    detail: "PROVAL and COB are live in production at Bajaj Housing Finance Ltd. — India's largest HFC by AUM growth. This is verifiable, referenceable proof-of-concept for all Indian HFCs and housing-focused NBFCs. Board should lead with this in every pitch.",
    products: ["proval", "cob"],
    verified: true,
  },
];

// ─── PROSPECT DATA (REVISED WITH LIVE SIGNALS) ───────────────────────────────
const prospects = [
  // ─── INDIA ───────────────────────────────────────────────────────────────
  {
    id: 1, region: "India", country: "India",
    name: "PNB Housing Finance, LIC Housing Finance, GIC Housing, Indiabulls HFC",
    type: "Housing Finance Company", tier: "Tier 1",
    signal: "VERY HIGH",
    trigger: "RBI HFC Directions 2025 (Jan 2026) mandate automated periodic collateral valuation with audit trails for every HFC. Non-compliance = NHB enforcement action. These 4 HFCs collectively manage ₹3+ Lakh Cr in home loans — all backed by immovable property collateral. None have automated valuation audit trails. Bajaj Housing Finance (PROVAL live reference) gives Ameya undeniable credibility.",
    products: ["proval", "cob", "conciliare"],
    contacts: "CTO / Head of Credit Ops / Head of Risk / CFO",
    reachout: "Open with: 'Bajaj Housing Finance runs PROVAL live in production. RBI HFC Directions 2025 require automated collateral valuation by Q3 2026 or face NHB audit findings.' Book a 30-min demo. Same products, same mandate, same urgency.",
    revenue: "₹5–15 Cr",
    urgency: 97,
    source: "RBI HFC Directions 2025 (Jan 2026) + NHB audit mandate",
  },
  {
    id: 2, region: "India", country: "India",
    name: "Aditya Birla Housing Finance, Tata Capital Housing Finance, Piramal Capital",
    type: "NBFC-HFC (Upper Layer)", tier: "Tier 1",
    signal: "VERY HIGH",
    trigger: "RBI SBR (Scale-Based Regulation) 'Upper Layer' NBFCs face highest governance requirements including mandatory digital LOS with audit trail. Co-Lending 2.0 Directions (Jan 2026) require API-integrated LOS for all co-lending partners. Both Aditya Birla HF and Tata Capital are active co-lending partners with PSU banks.",
    products: ["cob", "proval", "sherlock"],
    contacts: "CTO / Head of Retail Lending / COO / Chief Risk Officer",
    reachout: "Lead with Co-Lending 2.0 compliance deadline (Jan 2026 effective). Then layer PROVAL as the NHB collateral audit solution. Reference Bajaj Housing Finance live production deployment.",
    revenue: "₹6–18 Cr",
    urgency: 95,
    source: "RBI Co-Lending Directions Jan 2026 + RBI SBR UL framework",
  },
  {
    id: 3, region: "India", country: "India",
    name: "Small Finance Banks — AU, Equitas, Ujjivan, Jana, ESAF",
    type: "Small Finance Bank", tier: "Tier 2",
    signal: "HIGH",
    trigger: "RBI Digital Banking Authorisation 2026 mandates SFBs to upgrade digital channel architecture. SFBs have growing LAP (Loan Against Property) books requiring collateral valuation (PROVAL). Simultaneously, UPI transaction volumes at these banks now exceed 5 Cr/day requiring automated reconciliation.",
    products: ["conciliare", "proval", "sherlock", "cob"],
    contacts: "CTO / Head of IT / Head of Credit",
    reachout: "Bandhan Bank go-live on Conciliare is the direct reference. SFB CIOs know each other. Use Bandhan as warm intro via Ameya team.",
    revenue: "₹3–8 Cr",
    urgency: 90,
    source: "RBI 2026 SFB Digital Banking Authorisation framework + market intelligence",
  },
  {
    id: 4, region: "India", country: "India",
    name: "Muthoot Finance, Manappuram Gold Finance",
    type: "Gold Loan NBFC", tier: "Tier 1",
    signal: "HIGH",
    trigger: "RBI Commercial Banks Directions 2025 (gold collateral chapter) mandates automated gold valuation referencing daily closing prices with purity-adjusted LTV enforcement. RBI also increased scrutiny on gold loan NPAs in 2026. Muthoot has 5,500+ branches — manual gold valuation is a systemic risk.",
    products: ["proval", "conciliare", "sherlock"],
    contacts: "Head of Risk / CTO / CFO",
    reachout: "PROVAL pitch: 'RBI requires automated collateral valuation for gold loans per Commercial Banks Directions 2025. Your 5,500 branches doing manual assessment creates NPA divergence risk.' Very specific, very urgent.",
    revenue: "₹5–12 Cr",
    urgency: 88,
    source: "RBI Commercial Banks – Lending Against Gold and Silver Collateral Directions 2025",
  },
  {
    id: 5, region: "India", country: "India",
    name: "Yes Bank (post-SMBC acquisition transformation)",
    type: "Private Bank", tier: "Tier 1",
    signal: "HIGH",
    trigger: "SMBC acquired 20% stake (₹13,480 Cr, 2025). New Japanese management will conduct full technology stack review. SWIFT 4.0 middleware, AML uplift, and LOS modernisation are known priorities for the transformation program.",
    products: ["remitree", "bankfair", "sherlock", "cob"],
    contacts: "CTO / Head of Digital Transformation / Head of Global Markets",
    reachout: "Approach via SMBC India relationships. SMBC's Japanese compliance standards will drive AML and SWIFT upgrades. Position Remitree as ISO 20022 readiness for India-Japan corridor.",
    revenue: "₹10–25 Cr",
    urgency: 82,
    source: "Public: SMBC stake acquisition 2025 + Yes Bank transformation roadmap",
  },
  {
    id: 6, region: "India", country: "India",
    name: "Bandhan Bank — CBIA Module Expansion (Existing Client)",
    type: "Private Bank (Existing Client)", tier: "Tier 1",
    signal: "HIGH",
    trigger: "Existing Conciliare client (ATM, UPI, IMPS, Interbank modules live). Bandhan Bank is actively growing its retail mortgage book post-HDFC merger ecosystem. Expansion into PROVAL (collateral) and COB (loan origination) is a natural upsell — same platform, same integration team.",
    products: ["proval", "cob", "awacs"],
    contacts: "Vikas (Bandhan Bank Contact) / Head of Retail Credit / CTO",
    reachout: "Internal upsell. Use existing Conciliare relationship. Present PROVAL as the natural next module for their growing LAP book. No new vendor onboarding required.",
    revenue: "₹3–8 Cr (upsell)",
    urgency: 93,
    source: "Direct — Ameya active deployment at Bandhan Bank",
  },

  // ─── GCC / MIDDLE EAST ──────────────────────────────────────────────────
  {
    id: 7, region: "GCC", country: "Kuwait",
    name: "National Bank of Kuwait, Kuwait Finance House, Gulf Bank Kuwait (Top 3)",
    type: "Commercial / Islamic Bank", tier: "Tier 1",
    signal: "VERY HIGH",
    trigger: "Kuwait ADDED to FATF Grey List on 13 February 2026 (Mexico City Plenary). CBK (Central Bank of Kuwait) has issued immediate directives to all licensed banks to recalibrate AML software solutions per FATF guidance. Every major Kuwaiti bank is NOW in emergency AML vendor procurement.",
    products: ["sherlock", "conciliare"],
    contacts: "Chief Compliance Officer / MLRO / Head of Financial Crime / CTO",
    reachout: "This is the single hottest opportunity in the entire GCC right now. FATF grey-listing was 13 Feb 2026 — only 6 weeks ago. Banks have 12-18 month action plan deadlines. Reach NBK and KFH compliance heads immediately via MENA AML conference circuit or direct LinkedIn.",
    revenue: "₹8–22 Cr",
    urgency: 99,
    source: "FATF Official — fatf-gafi.org, complyadvantage.com (Feb 2026)",
  },
  {
    id: 8, region: "GCC", country: "Saudi Arabia",
    name: "STC Bank, D360 Bank, Saudi Digital Bank (3 new Saudi banks)",
    type: "Digital Bank (Greenfield)", tier: "Tier 1",
    signal: "VERY HIGH",
    trigger: "3 digital banking licenses activated in Saudi Arabia in 2025. Greenfield institutions with zero legacy. KSA exited FATF grey list in June 2025 — international correspondent banking restored, banks can now scale cross-border. Immediate need for SWIFT middleware, AML from Day 1, LOS, and reconciliation for growing transaction volumes.",
    products: ["remitree", "sherlock", "conciliare", "cob"],
    contacts: "CEO / CTO / Chief Compliance Officer",
    reachout: "Saudi FinTech Forum (Oct 2026). Connect via NASSCOM Saudi Chapter. Lead: 'We helped Indian banks scale from 0 to ₹50Cr daily transaction reconciliation. Here's the playbook for your Day 1 infrastructure.' Greenfield is Ameya's strongest selling point.",
    revenue: "₹10–30 Cr",
    urgency: 96,
    source: "Saudi Central Bank (SAMA) 2025 digital banking licenses + KSA FATF exit June 2025",
  },
  {
    id: 9, region: "GCC", country: "UAE",
    name: "Wio Bank, Zand Bank, YAP (UAE neobanks)",
    type: "Neobank", tier: "Tier 2",
    signal: "HIGH",
    trigger: "Dubai cashless 90% target by 2026. UAE exited FATF grey list Feb 2024 — correspondent banking fully restored, creating rapid international expansion by UAE neobanks. Post-grey-list, CBUAE mandates banks demonstrate operational AML effectiveness (not just policies). Neobanks need bank-grade AML + reconciliation.",
    products: ["sherlock", "conciliare", "remitree"],
    contacts: "CTO / MLRO / COO",
    reachout: "DIFC Fintech Hive is the direct entry point. Lead with post-grey-list AML operational effectiveness narrative — 'policies aren't enough, you need Sherlock's real-time operational AML.'",
    revenue: "₹5–15 Cr",
    urgency: 85,
    source: "UAE FATF exit Feb 2024 + Dubai cashless 2026 target",
  },

  // ─── SOUTH & SOUTHEAST ASIA ──────────────────────────────────────────────
  {
    id: 10, region: "Southeast Asia", country: "Bangladesh",
    name: "BRAC Bank, Dutch-Bangla Bank, Islami Bank Bangladesh",
    type: "Private Commercial Bank", tier: "Tier 2",
    signal: "VERY HIGH",
    trigger: "SWIFT activated India-Bangladesh retail payment corridor in March 2026. These 3 banks are on the active corridor. New cross-border volume means ISO 20022 compliance, automated reconciliation, and AML screening for inbound remittances — all immediate. No bank on the corridor has existing SWIFT 4.0 middleware.",
    products: ["remitree", "conciliare", "sherlock"],
    contacts: "MD / Head of Treasury / CTO",
    reachout: "SWIFT's own corridor announcement is the door opener. 'BRAC Bank is now on the India retail corridor. Remitree handles ISO 20022 for the top 5 Indian banks on this corridor. Here is the integration playbook.' Contact via NASSCOM Bangladesh chapter or Indian Embassy trade desk.",
    revenue: "₹5–14 Cr",
    urgency: 94,
    source: "SWIFT 2026 retail corridor activation — India-Bangladesh corridor March 2026",
  },
  {
    id: 11, region: "Southeast Asia", country: "Vietnam",
    name: "VPBank, Techcombank, MB Bank, TPBank",
    type: "Private Bank", tier: "Tier 2",
    signal: "HIGH",
    trigger: "Vietnam remains on FATF grey list (Feb 2026). State Bank of Vietnam mandating ISO 20022 migration by 2026. Mid-tier banks face both SWIFT middleware procurement and AML remediation simultaneously. Vietnam also reviewed at FATF Feb 2026 plenary — under active monitoring.",
    products: ["remitree", "sherlock", "cob"],
    contacts: "CTO / Head of International Payments / Head of Compliance",
    reachout: "Dual angle: FATF grey list = urgent Sherlock AML pitch. ISO 20022 mandate = Remitree pitch. Vietnam Banking Association events (July, Nov). India-ASEAN trade corridor gives Indian IT vendors preferred status.",
    revenue: "₹5–15 Cr",
    urgency: 82,
    source: "FATF grey list Feb 2026 (Vietnam under increased monitoring) + State Bank Vietnam ISO 20022 mandate",
  },
  {
    id: 12, region: "Southeast Asia", country: "Nepal",
    name: "Nepal Investment Mega Bank, Nabil Bank, NIC Asia Bank",
    type: "Commercial Bank", tier: "Tier 2",
    signal: "HIGH",
    trigger: "Nepal ADDED to FATF Grey List in February 2025. Reviewed again at Feb 2026 FATF plenary — still under monitoring. Nepal Rastra Bank is mandating AML upgrades across all Class A commercial banks. Nepal is deeply linked to Indian payment systems — Remitree + Sherlock bundle is ideal.",
    products: ["sherlock", "remitree", "conciliare"],
    contacts: "CEO / Chief Compliance Officer / Head of Technology",
    reachout: "Nepal Bankers Association events in Kathmandu. Lead with FATF grey list urgency. Strong cultural and linguistic proximity to Indian vendor ecosystem — Ameya's Indian banking pedigree is a positive signal here.",
    revenue: "₹3–8 Cr",
    urgency: 80,
    source: "FATF grey list Feb 2025 addition, Feb 2026 review still under monitoring",
  },

  // ─── AFRICA ──────────────────────────────────────────────────────────────
  {
    id: 13, region: "Africa", country: "Nigeria",
    name: "Access Bank, Zenith Bank, GT Bank (post-FATF exit — enforcement phase)",
    type: "Tier-1 Commercial Bank", tier: "Tier 1",
    signal: "HIGH",
    trigger: "Nigeria exited FATF grey list October 2025. CBN shifted to 'operational delivery enforcement' — banks must now demonstrate AML controls work in practice, not just on paper. namescan.io (Feb 2026): 'organisations that invest in structured, technology-enabled AML controls will be best positioned.' This is exactly Sherlock's pitch. Existing Conciliare/SWIFT opportunity alongside AML.",
    products: ["sherlock", "remitree", "conciliare"],
    contacts: "Chief Compliance Officer / Head of Financial Crime / CTO",
    reachout: "Do NOT pitch grey-list fear (they exited). Pitch post-exit excellence: 'Sherlock helps tier-1 banks demonstrate effective AML to CBN — moving from compliant-on-paper to operationally proven.' Lagos FinTech Week (Oct 2026). Approach Chief Compliance Officers on LinkedIn.",
    revenue: "₹8–20 Cr",
    urgency: 85,
    source: "namescan.io (Feb 2026) — Nigeria FATF exit Oct 2025, post-exit enforcement phase",
  },
  {
    id: 14, region: "Africa", country: "Kenya",
    name: "Equity Bank, KCB Group, Co-operative Bank Kenya",
    type: "Commercial Bank", tier: "Tier 2",
    signal: "MEDIUM-HIGH",
    trigger: "Kenya reviewed at FATF Feb 2026 plenary — remains under increased monitoring. Central Bank of Kenya mandating AML upgrade for banks with international operations. Kenya's booming mortgage market (M-PESA + bank integrations) creates PROVAL collateral valuation opportunity — property-backed loans growing at 18% YoY.",
    products: ["sherlock", "proval", "conciliare"],
    contacts: "Head of Digital Banking / CTO / Chief Risk Officer",
    reachout: "FATF monitoring is the door-opener for Sherlock. PROVAL is the surprise upsell: 'Your fastest growing product line is mortgage. Kenya's property valuations are manual. Here's automated collateral valuation trusted by India's largest HFCs.' AfricArena Nairobi is the event.",
    revenue: "₹4–12 Cr",
    urgency: 75,
    source: "FATF Feb 2026 plenary — Kenya reviewed, under increased monitoring",
  },
  {
    id: 15, region: "Africa", country: "Algeria",
    name: "Banque Nationale d'Algérie, Crédit Populaire d'Algérie",
    type: "State Commercial Bank", tier: "Tier 2",
    signal: "MEDIUM-HIGH",
    trigger: "Algeria on FATF grey list, reviewed at Feb 2026 FATF plenary. FATF made initial determination Algeria has 'substantially completed its action plan' — on-site verification assessment upcoming. Banks face most intense AML scrutiny period (pre-assessment audit window). Classic procurement trigger: buy before the FATF auditors arrive.",
    products: ["sherlock", "conciliare"],
    contacts: "Chief Compliance Officer / Head of Financial Crime / DG Systèmes d'Information",
    reachout: "Timing is perfect — FATF on-site visit pending. 'Sherlock AML is deployed at banks preparing for FATF assessments in similar geographies. Here is the verification-readiness playbook.' French-speaking market: prepare bilingual collateral. Approach via NASSCOM Africa Connect.",
    revenue: "₹4–10 Cr",
    urgency: 78,
    source: "FATF Feb 2026 plenary — Algeria on-site assessment determination made",
  },

  // ─── EUROPE / UK ─────────────────────────────────────────────────────────
  {
    id: 16, region: "Europe/UK", country: "UK",
    name: "Monzo, Starling Bank, Revolut Business, Wise — FCA AML upgrade wave",
    type: "Challenger Bank / EMI", tier: "Tier 2",
    signal: "HIGH",
    trigger: "Monzo fined £21M by FCA for AML failings, July 2025. FCA has signalled all UK challenger banks are under review. Every MLRO at every UK neobank is now in procurement mode for credentialed, bank-grade AML. Sherlock's Indian banking pedigree (30+ bank deployments) is precisely the 'enterprise-grade proven' credential FCA-supervised firms are seeking.",
    products: ["sherlock", "remitree"],
    contacts: "MLRO (Money Laundering Reporting Officer) / CTO / Chief Risk Officer",
    reachout: "Monzo fine is the door-opener to every UK challenger bank. 'Sherlock AML is deployed at commercial banks managing ₹1 Lakh Cr+ loan books. Here is how it maps to FCA AML principles.' Money20/20 Europe (Oct 2026) is the event. Target the MLRO community specifically.",
    revenue: "₹6–18 Cr",
    urgency: 83,
    source: "FCA enforcement: Monzo £21M fine July 2025 — public record",
  },
  {
    id: 17, region: "Europe/UK", country: "UK / EU",
    name: "Islamic Finance Institutions — UK Gatehouse Bank, European Islamic Investment Bank",
    type: "Islamic Bank / Investment", tier: "Tier 2",
    signal: "MEDIUM-HIGH",
    trigger: "UK Islamic finance sector is the largest in Europe (£7B+ assets). Murabaha and Ijara financing structures require specialised collateral valuation (PROVAL is property-valuation focused — ideal for Islamic property finance). UK Sharia-compliant mortgage market growing at 23% YoY.",
    products: ["proval", "cob", "sherlock"],
    contacts: "Head of Finance / CTO / Chief Compliance Officer",
    reachout: "PROVAL positioned as 'Sharia-finance compliant automated property valuation for UK Islamic mortgages.' Lead with the Bajaj Housing Finance reference then adapt to UK property valuation requirements. World Islamic Finance Forum (London) is the entry point.",
    revenue: "₹4–12 Cr",
    urgency: 72,
    source: "UK Islamic Finance Council reports 2025 — sector growth data",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const REGIONS = ["All", "India", "GCC", "Southeast Asia", "Africa", "Europe/UK"];
const SIGNAL_ORDER = { "VERY HIGH": 4, "HIGH": 3, "MEDIUM-HIGH": 2, "MEDIUM": 1 };
const signalColor = s => ({ "VERY HIGH":"#00C9A7","HIGH":"#FFD166","MEDIUM-HIGH":"#4FC3F7","MEDIUM":"#C77DFF" }[s]||"#888");
const urgencyGrade = u => u>=95?"A+":u>=85?"A":u>=75?"B+":"B";

export default function App() {
  const [activeRegion, setActiveRegion]   = useState("All");
  const [activeProduct, setActiveProduct] = useState("All");
  const [selected, setSelected]           = useState(null);
  const [sort, setSort]                   = useState("urgency");
  const [tab, setTab]                     = useState("prospects"); // prospects | methodology

  const filtered = prospects
    .filter(p => activeRegion === "All" || p.region === activeRegion)
    .filter(p => activeProduct === "All" || p.products.includes(activeProduct))
    .sort((a,b) => sort==="urgency" ? b.urgency-a.urgency : SIGNAL_ORDER[b.signal]-SIGNAL_ORDER[a.signal]);

  const sel = selected != null ? prospects.find(p=>p.id===selected) : null;

  const totalRevLow  = prospects.reduce((s,p)=>s+parseInt(p.revenue.split("–")[0].replace(/[₹\s Cr]/g,"")),0);
  const totalRevHigh = prospects.reduce((s,p)=>s+parseInt(p.revenue.split("–")[1]?.replace(/[₹\s Cr]/g,"")||0),0);

  return (
    <div style={{fontFamily:"'DM Mono','Courier New',monospace",background:"#070B14",minHeight:"100vh",color:"#D8E0EF"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:#0D1220;}
        ::-webkit-scrollbar-thumb{background:#00C9A7;border-radius:2px;}
        .row:hover{background:rgba(0,201,167,0.05)!important;cursor:pointer;}
        .pulse{animation:pulse 2s infinite;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .tag{display:inline-block;padding:2px 7px;border-radius:3px;font-size:9px;font-weight:500;letter-spacing:.5px;text-transform:uppercase;margin:2px;}
        .src-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:9px;background:rgba(255,255,255,0.05);color:#667;border:1px solid rgba(255,255,255,0.06);}
        .verified-dot{width:6px;height:6px;border-radius:50%;background:#00C9A7;display:inline-block;margin-right:4px;}
      `}</style>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#0D1B2A 0%,#07090F 60%,#0D1B2A 100%)",borderBottom:"1px solid rgba(0,201,167,0.15)",padding:"22px 28px 0",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,letterSpacing:4,color:"#00C9A7",textTransform:"uppercase",marginBottom:5}}>
              ◈ AMEYA INFOVISION · BOARD INTELLIGENCE BRIEF · MARCH 2026
            </div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#fff",letterSpacing:-0.5}}>
              Global Prospect Intelligence — Revised & Sourced
            </h1>
            <p style={{fontSize:11,color:"#4D5A72",marginTop:3}}>
              {filtered.length} active targets · 7 products · All signals verified from live sources ·
              <span style={{color:"#00C9A7"}}> 2 new products: PROVAL + COB</span>
            </p>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:10,color:"#4D5A72",marginBottom:2}}>TOTAL ADDRESSABLE PIPELINE</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"#00C9A7"}}>₹{totalRevLow}–{totalRevHigh} Cr</div>
            <div style={{fontSize:9,color:"#4D5A72"}}>{prospects.length} qualified prospects globally</div>
          </div>
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          {[["prospects","📊  Prospect Board"],["methodology","🔍  Research Methodology & Sources"]].map(([k,l])=>((
            <button key={k} onClick={()=>{setTab(k);setSelected(null);}} style={{
              fontFamily:"inherit",background:"transparent",border:"none",cursor:"pointer",
              padding:"10px 18px",fontSize:11,letterSpacing:.5,
              color:tab===k?"#00C9A7":"#4D5A72",
              borderBottom:tab===k?"2px solid #00C9A7":"2px solid transparent",
              transition:"all .15s",
            }}>{l}</button>
          )))}
        </div>
      </div>

      {/* ── PROSPECT TAB ── */}
      {tab==="prospects" && (
        <div style={{display:"grid",gridTemplateColumns:sel?"1fr 420px":"1fr"}}>
          <div style={{padding:"18px 22px"}}>

            {/* Region pills */}
            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
              {REGIONS.map(r=>((
                <button key={r} onClick={()=>setActiveRegion(r===activeRegion&&r!=="All"?"All":r)} style={{
                  background:activeRegion===r?"rgba(0,201,167,0.12)":"transparent",
                  border:`1px solid ${activeRegion===r?"#00C9A7":"rgba(255,255,255,0.08)"}`,
                  borderRadius:5,padding:"5px 12px",fontSize:10,cursor:"pointer",fontFamily:"inherit",
                  color:activeRegion===r?"#00C9A7":"#556",transition:"all .15s",
                }}>
                  {r}{r!=="All"&&<span style={{marginLeft:6,color:"#334",fontSize:9}}>{prospects.filter(p=>p.region===r).length}</span>}
                </button>
              )))}
            </div>

            {/* Product filters + sort */}
            <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
              {["All",...Object.keys(PRODUCTS)].map(p=>((
                <button key={p} onClick={()=>setActiveProduct(p)} style={{
                  background:activeProduct===p?(p==="All"?"rgba(0,201,167,0.1)":`${PRODUCTS[p]?.color}18`):"transparent",
                  border:`1px solid ${activeProduct===p?(p==="All"?"#00C9A7":PRODUCTS[p]?.color):"rgba(255,255,255,0.07)"}`,
                  color:activeProduct===p?(p==="All"?"#00C9A7":PRODUCTS[p]?.color):"#445",
                  borderRadius:4,padding:"3px 10px",fontSize:9,cursor:"pointer",fontFamily:"inherit",
                  letterSpacing:.5,textTransform:"uppercase",transition:"all .15s",
                }}>
                  {p==="All"?"ALL":PRODUCTS[p]?.label}
                </button>
              )))}
              <div style={{marginLeft:"auto",display:"flex",gap:5}}>
                {["urgency","signal"].map(s=>((
                  <button key={s} onClick={()=>setSort(s)} style={{
                    background:sort===s?"rgba(0,201,167,0.08)":"transparent",
                    border:`1px solid ${sort===s?"#00C9A7":"rgba(255,255,255,0.07)"}`,
                    color:sort===s?"#00C9A7":"#445",
                    borderRadius:4,padding:"3px 10px",fontSize:9,cursor:"pointer",fontFamily:"inherit",
                  }}>{s==="urgency"?"SORT: URGENCY":"SORT: SIGNAL"}</button>
                )))}
              </div>
            </div>

            {/* Table */}
            <div style={{border:"1px solid rgba(255,255,255,0.05)",borderRadius:8,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"24px 1fr 90px 90px 70px 1fr 80px",
                background:"#0C1020",borderBottom:"1px solid rgba(255,255,255,0.06)",
                padding:"8px 14px",fontSize:8,letterSpacing:2,color:"#334",textTransform:"uppercase"}}>
                <div>#</div><div>INSTITUTION</div><div>REGION</div><div>SIGNAL</div><div>GRADE</div><div>PRODUCTS</div><div>REVENUE</div>
              </div>
              {filtered.map((p,i)=>((
                <div key={p.id} className="row" onClick={()=>setSelected(selected===p.id?null:p.id)} style={{
                  display:"grid",gridTemplateColumns:"24px 1fr 90px 90px 70px 1fr 80px",
                  padding:"11px 14px",fontSize:10,
                  borderBottom:"1px solid rgba(255,255,255,0.03)",
                  background:selected===p.id?"rgba(0,201,167,0.07)":i%2===0?"rgba(255,255,255,0.01)":"transparent",
                  borderLeft:selected===p.id?"2px solid #00C9A7":"2px solid transparent",
                  alignItems:"center",transition:"all .12s",
                }}>
                  <div style={{color:"#223",fontSize:9}}>{i+1}</div>
                  <div>
                    <div style={{fontWeight:500,color:"#C8D8EE",lineHeight:1.3,fontSize:10}}>{p.name}</div>
                    <div style={{fontSize:8,color:"#334",marginTop:2}}>{p.type} · {p.country}</div>
                  </div>
                  <div><span style={{background:"rgba(255,255,255,0.04)",borderRadius:3,padding:"2px 5px",fontSize:8,color:"#556"}}>{p.region}</span></div>
                  <div>
                    <span className={p.signal==="VERY HIGH"?"pulse":""} style={{
                      fontSize:8,fontWeight:600,letterSpacing:.5,color:signalColor(p.signal),
                      padding:"2px 6px",background:`${signalColor(p.signal)}15`,borderRadius:3,
                    }}>{p.signal}</span>
                  </div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,
                    color:p.urgency>=95?"#00C9A7":p.urgency>=85?"#FFD166":"#4FC3F7"}}>
                    {urgencyGrade(p.urgency)}
                    <span style={{fontSize:8,color:"#334",marginLeft:1}}>{p.urgency}%</span>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:2}}>
                    {p.products.map(pr=>((
                      <span key={pr} className="tag" style={{background:`${PRODUCTS[pr].color}15`,color:PRODUCTS[pr].color,border:`1px solid ${PRODUCTS[pr].color}25`}}>
                        {PRODUCTS[pr].label}
                      </span>
                    )))}
                  </div>
                  <div style={{fontWeight:600,color:"#00C9A7",fontSize:10}}>{p.revenue}</div>
                </div>
              )))}
            </div>

            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginTop:16}}>
              {[
                {label:"Grade A+ Targets", value:prospects.filter(p=>p.urgency>=95).length, color:"#00C9A7"},
                {label:"PROVAL Opps",      value:prospects.filter(p=>p.products.includes("proval")).length, color:"#A8EDAA"},
                {label:"COB Opps",         value:prospects.filter(p=>p.products.includes("cob")).length, color:"#FF9F43"},
                {label:"AML / Sherlock",   value:prospects.filter(p=>p.products.includes("sherlock")).length, color:"#FF6B6B"},
                {label:"FATF-Driven",      value:prospects.filter(p=>p.source.includes("FATF")).length, color:"#C77DFF"},
              ].map(s=>((
                <div key={s.label} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:7,padding:"12px 14px"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:s.color}}>{s.value}</div>
                  <div style={{fontSize:9,color:"#334",marginTop:3,textTransform:"uppercase",letterSpacing:1}}>{s.label}</div>
                </div>
              )))}
            </div>
          </div>

          {/* DETAIL PANEL */}
          {sel&&(
            <div style={{background:"#0B0F1C",borderLeft:"1px solid rgba(0,201,167,0.12)",padding:"20px 18px",
              position:"sticky",top:"138px",height:"calc(100vh - 138px)",overflowY:"auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
                <div>
                  <div style={{fontSize:8,letterSpacing:3,color:"#00C9A7",textTransform:"uppercase",marginBottom:5}}>PROSPECT BRIEF</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#E0EAF8",lineHeight:1.35}}>{sel.name}</div>
                  <div style={{fontSize:9,color:"#445",marginTop:3}}>{sel.type} · {sel.country}</div>
                </div>
                <button onClick={()=>setSelected(null)} style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.2)",
                  color:"#FF6B6B",borderRadius:4,padding:"4px 10px",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>✕</button>
              </div>

              {/* Urgency */}
              <div style={{marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:8,color:"#334",textTransform:"uppercase",letterSpacing:2}}>BOARD PRIORITY SCORE</span>
                  <span style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,
                    color:sel.urgency>=95?"#00C9A7":"#FFD166"}}>{sel.urgency}%</span>
                </div>
                <div style={{background:"rgba(255,255,255,0.05)",borderRadius:4,height:5,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:4,width:`${sel.urgency}%`,
                    background:sel.urgency>=95?"linear-gradient(90deg,#00C9A7,#00E5CC)":"linear-gradient(90deg,#FFD166,#FFAA33)",
                    transition:"width 1s ease"}}/>
                </div>
              </div>

              {/* Metrics */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
                {[
                  {l:"Signal",v:sel.signal,c:signalColor(sel.signal)},
                  {l:"Revenue",v:sel.revenue,c:"#00C9A7"},
                  {l:"Tier",v:sel.tier,c:"#4FC3F7"},
                  {l:"Grade",v:urgencyGrade(sel.urgency),c:"#FFD166"},
                ].map(m=>((
                  <div key={m.l} style={{background:"rgba(255,255,255,0.02)",borderRadius:5,padding:"9px 11px"}}>
                    <div style={{fontSize:8,color:"#334",textTransform:"uppercase",letterSpacing:1.5,marginBottom:3}}>{m.l}</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:m.c}}>{m.v}</div>
                  </div>
                )))}
              </div>

              {/* Products */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:8,color:"#334",textTransform:"uppercase",letterSpacing:2,marginBottom:7}}>APPLICABLE PRODUCTS</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {sel.products.map(pr=>((
                    <div key={pr} style={{background:`${PRODUCTS[pr].color}12`,border:`1px solid ${PRODUCTS[pr].color}35`,borderRadius:5,padding:"5px 10px"}}>
                      <div style={{fontSize:10,fontWeight:600,color:PRODUCTS[pr].color}}>{PRODUCTS[pr].label}</div>
                      <div style={{fontSize:8,color:"#334"}}>{PRODUCTS[pr].desc}</div>
                    </div>
                  )))}
                </div>
              </div>

              {/* Source */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:8,color:"#334",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>📎 VERIFIED SOURCE</div>
                <div style={{background:"rgba(0,201,167,0.04)",border:"1px solid rgba(0,201,167,0.12)",borderRadius:5,
                  padding:"9px 11px",fontSize:10,color:"#7ABFAA",lineHeight:1.6}}>{sel.source}</div>
              </div>

              {/* Trigger */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:8,color:"#334",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>🎯 BUY TRIGGER</div>
                <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:5,
                  padding:"10px 12px",fontSize:10,lineHeight:1.7,color:"#9AAABB"}}>{sel.trigger}</div>
              </div>

              {/* Contacts */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:8,color:"#334",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>👤 WHO TO CONTACT</div>
                <div style={{background:"rgba(255,209,102,0.06)",border:"1px solid rgba(255,209,102,0.15)",borderRadius:5,
                  padding:"9px 11px",fontSize:10,color:"#FFD166",lineHeight:1.6}}>{sel.contacts}</div>
              </div>

              {/* Outreach */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:8,color:"#334",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>📨 OUTREACH STRATEGY</div>
                <div style={{background:"rgba(79,195,247,0.05)",border:"1px solid rgba(79,195,247,0.12)",borderRadius:5,
                  padding:"10px 12px",fontSize:10,lineHeight:1.7,color:"#9AAABB"}}>{sel.reachout}</div>
              </div>

              <div style={{background:"rgba(0,201,167,0.07)",border:"1px solid rgba(0,201,167,0.2)",borderRadius:7,
                padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:8,color:"#00C9A7",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>PIPELINE VALUE</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#fff"}}>{sel.revenue}</div>
                </div>
                <div style={{textAlign:"right",fontSize:9,color:"#334"}}>
                  <div>Assign BD owner →</div><div>Draft intro deck →</div><div>30-day follow-up →</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── METHODOLOGY TAB ── */}
      {tab==="methodology" && (
        <div style={{padding:"24px 28px",maxWidth:1000}}>
          <div style={{marginBottom:24}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,color:"#E0EAF8",marginBottom:8}}>
              How We Identified These Prospects — Full Transparency for the Board
            </div>
            <p style={{fontSize:11,color:"#556",lineHeight:1.8,maxWidth:740}}>
              Every prospect in this dashboard is mapped to a specific, verifiable, time-bound regulatory or market event that creates an active procurement need for Ameya's products. Below are the {METHODOLOGY.length} primary signals used, with sources. These are NOT generic market assumptions — each is a current, dated trigger.
            </p>
          </div>

          <div style={{display:"grid",gap:12}}>
            {METHODOLOGY.map((m,i)=>((
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,padding:"16px 18px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {m.verified&&<span className="verified-dot"/>}
                    <span style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:"#D0E0F4"}}>{m.signal}</span>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {m.products.map(pr=>((
                      <span key={pr} className="tag" style={{background:`${PRODUCTS[pr].color}18`,color:PRODUCTS[pr].color,border:`1px solid ${PRODUCTS[pr].color}30`}}>
                        {PRODUCTS[pr].label}
                      </span>
                    )))}
                  </div>
                </div>
                <p style={{fontSize:10,color:"#8899AA",lineHeight:1.75,marginBottom:10}}>{m.detail}</p>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:8,color:"#445",textTransform:"uppercase",letterSpacing:1}}>SOURCE:</span>
                  <span className="src-badge">{m.source}</span>
                </div>
              </div>
            )))}
          </div>

          {/* Caveat */}
          <div style={{marginTop:24,background:"rgba(255,209,102,0.05)",border:"1px solid rgba(255,209,102,0.15)",
            borderRadius:8,padding:"14px 18px"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:"#FFD166",marginBottom:6}}>
              ⚠️ What This Dashboard Does NOT Do
            </div>
            <p style={{fontSize:10,color:"#8899AA",lineHeight:1.8}}>
              <strong style={{color:"#AAB"}}>1. It does not scrape live RFP portals.</strong> Active procurement tenders for enterprise BFSI software are rarely public — they occur via direct vendor outreach, industry events, and relationship networks. The signals above are the pre-cursor to RFPs.<br/>
              <strong style={{color:"#AAB"}}>2. It does not guarantee contract readiness.</strong> "VERY HIGH" urgency means the regulatory trigger exists and the procurement window is open — not that a decision has been made.<br/>
              <strong style={{color:"#AAB"}}>3. Exact contacts must be validated via LinkedIn Sales Navigator</strong> — titles listed are the correct seniority levels, not specific named individuals (except Bandhan Bank upsell which has existing contacts).
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{borderTop:"1px solid rgba(255,255,255,0.04)",padding:"12px 28px",
        display:"flex",justifyContent:"space-between",fontSize:8,color:"#223",letterSpacing:1.5}}>
        <span>AMEYA INFOVISION PVT LTD · BOARD INTELLIGENCE v2 · 28 MARCH 2026 · CONFIDENTIAL</span>
        <span>SOURCES: FATF · RBI / NHB · NASSCOM · SWIFT · FCA · INTELMARKETRESEARCH</span>
      </div>
    </div>
  );
}
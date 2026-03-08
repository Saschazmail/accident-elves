import { useState, useEffect, useRef } from "react";

// ─── FAIRY LOGO SVG ───────────────────────────────────────────────
function Star({ x, y, s, d, c }) {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45) * Math.PI / 180;
    const r = i % 2 === 0 ? s : s * 0.42;
    return `${x + Math.cos(a) * r},${y + Math.sin(a) * r}`;
  }).join(" ");
  return (
    <g style={{ animation: `sparkle 2s ease-in-out ${d}s infinite` }}>
      <polygon points={pts} fill={c} filter="url(#sf)" />
      <circle cx={x} cy={y} r={s * 0.38} fill={c} opacity="0.5" />
    </g>
  );
}

function FairyLogoSVG({ width = "100%", maxWidth = 580 }) {
  const sparks = [
    { x: 148, y: 28, s: 7, d: 0, c: "#FFD700" }, { x: 162, y: 14, s: 5, d: 0.4, c: "#fff" },
    { x: 136, y: 18, s: 6, d: 0.8, c: "#AEF0FF" }, { x: 155, y: 8, s: 4, d: 0.2, c: "#FFD700" },
    { x: 128, y: 32, s: 4.5, d: 1.1, c: "#fff" },
    { x: 252, y: 28, s: 7, d: 0.25, c: "#FFD700" }, { x: 238, y: 14, s: 5, d: 0.65, c: "#fff" },
    { x: 264, y: 18, s: 6, d: 1.0, c: "#AEF0FF" }, { x: 245, y: 8, s: 4, d: 0.45, c: "#FFD700" },
    { x: 272, y: 32, s: 4.5, d: 1.3, c: "#fff" },
    { x: 200, y: 16, s: 9, d: 0.35, c: "#FFD700" }, { x: 186, y: 30, s: 5, d: 0.75, c: "#fff" },
    { x: 214, y: 32, s: 6, d: 1.15, c: "#AEF0FF" }, { x: 200, y: 4, s: 4, d: 0.55, c: "#FFD700" },
  ];

  return (
    <svg viewBox="0 0 400 230" width={width} style={{ maxWidth, overflow: "visible", display: "block", margin: "0 auto" }}>
      <defs>
        <radialGradient id="sk1" cx="45%" cy="35%" r="60%"><stop offset="0%" stopColor="#FDDCB8" /><stop offset="60%" stopColor="#F0B882" /><stop offset="100%" stopColor="#D8946A" /></radialGradient>
        <radialGradient id="sk2" cx="55%" cy="35%" r="60%"><stop offset="0%" stopColor="#FEE4C8" /><stop offset="60%" stopColor="#F4C090" /><stop offset="100%" stopColor="#E0A070" /></radialGradient>
        <radialGradient id="pk" cx="40%" cy="30%" r="70%"><stop offset="0%" stopColor="#FF9EC8" /><stop offset="50%" stopColor="#F0508A" /><stop offset="100%" stopColor="#B82060" /></radialGradient>
        <radialGradient id="bl" cx="60%" cy="30%" r="70%"><stop offset="0%" stopColor="#B0E8FF" /><stop offset="50%" stopColor="#5AB8E8" /><stop offset="100%" stopColor="#1870A8" /></radialGradient>
        <radialGradient id="h1" cx="50%" cy="30%" r="60%"><stop offset="0%" stopColor="#F8E060" /><stop offset="70%" stopColor="#D4A820" /><stop offset="100%" stopColor="#A07810" /></radialGradient>
        <radialGradient id="h2" cx="50%" cy="30%" r="60%"><stop offset="0%" stopColor="#FFF0A0" /><stop offset="60%" stopColor="#E8C840" /><stop offset="100%" stopColor="#B09020" /></radialGradient>
        <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C8F0FF" stopOpacity="0.95" /><stop offset="100%" stopColor="#80C8E8" stopOpacity="0.45" /></linearGradient>
        <linearGradient id="wg2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F0D0FF" stopOpacity="0.95" /><stop offset="100%" stopColor="#C080E0" stopOpacity="0.45" /></linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#A06000" /><stop offset="20%" stopColor="#FFD700" /><stop offset="50%" stopColor="#FFF8C0" /><stop offset="80%" stopColor="#FFD700" /><stop offset="100%" stopColor="#A06000" /></linearGradient>
        <filter id="sf" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="0.8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="bodyGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="wingGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="softShadow"><feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.45)" /></filter>
      </defs>

      {/* Arc */}
      <path style={{ animation: "arcShimmer 2.4s ease-in-out infinite" }} d="M148 35 Q200 -15 252 35" stroke="rgba(255,220,60,0.6)" strokeWidth="1.8" fill="none" strokeDasharray="6 4" />
      <path style={{ animation: "arcShimmer 2.4s ease-in-out 0.7s infinite" }} d="M148 35 Q200 -20 252 35" stroke="rgba(160,220,255,0.3)" strokeWidth="8" fill="none" />

      {sparks.map((s, i) => <Star key={i} {...s} />)}

      {/* ── LEFT FAIRY (pink) ── */}
      <g style={{ animation: "floatL 3.6s ease-in-out infinite" }} filter="url(#softShadow)">
        <g style={{ animation: "wingBeat 0.9s ease-in-out infinite alternate", transformOrigin: "82px 95px" }} filter="url(#wingGlow)">
          <path d="M82 88 C38 58 16 36 28 22 C40 10 66 28 82 60" fill="url(#wg1)" stroke="rgba(140,210,255,0.8)" strokeWidth="1.2" />
          <path d="M82 68 C60 52 44 38 32 26" stroke="rgba(100,190,240,0.5)" strokeWidth="0.8" fill="none" />
          <path d="M82 76 C58 66 40 54 32 40" stroke="rgba(100,190,240,0.4)" strokeWidth="0.6" fill="none" />
          <path d="M82 88 C95 62 108 44 100 30 C94 20 78 30 82 60" fill="url(#wg1)" stroke="rgba(140,210,255,0.7)" strokeWidth="1" opacity="0.8" />
          <path d="M82 100 C48 104 30 122 38 136 C46 148 68 136 82 110" fill="url(#wg1)" stroke="rgba(140,210,255,0.65)" strokeWidth="1" opacity="0.85" />
          <path d="M82 100 C96 104 106 118 100 130 C94 140 82 128 82 110" fill="url(#wg1)" stroke="rgba(140,210,255,0.6)" strokeWidth="0.9" opacity="0.75" />
        </g>
        <path d="M86 168 C82 178 76 188 70 196" stroke="url(#sk1)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M94 168 C100 174 108 172 110 164" stroke="url(#sk1)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M68 196 C60 200 54 205 58 210 C62 214 72 208 72 198" fill="#C03070" stroke="#90205A" strokeWidth="0.8" /><circle cx="56" cy="210" r="3" fill="#FFD700" />
        <path d="M110 164 C116 162 122 164 120 170 C118 175 110 172 110 165" fill="#C03070" stroke="#90205A" strokeWidth="0.8" /><circle cx="122" cy="168" r="2.5" fill="#FFD700" />
        <ellipse cx="88" cy="140" rx="16" ry="22" fill="url(#sk1)" />
        <path d="M72 128 C72 118 104 118 104 128 C104 140 98 158 88 162 C78 158 72 140 72 128" fill="url(#pk)" filter="url(#bodyGlow)" />
        <path d="M78 126 C80 120 88 118 94 122 C90 120 82 120 78 126" fill="rgba(255,200,230,0.5)" />
        <circle cx="84" cy="132" r="2" fill="rgba(255,255,255,0.4)" /><circle cx="92" cy="138" r="1.5" fill="rgba(255,255,255,0.35)" /><circle cx="86" cy="145" r="1.2" fill="rgba(255,255,255,0.3)" />
        <path d="M72 150 Q76 158 80 153 Q84 160 88 155 Q92 160 96 153 Q100 158 104 150" fill="#D0408A" stroke="#A02868" strokeWidth="0.8" />
        <path d="M74 128 C66 136 60 148 58 158" stroke="url(#sk1)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="57" cy="160" r="5.5" fill="url(#sk1)" />
        <path d="M102 126 C112 112 128 82 142 48" stroke="url(#sk1)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="141" cy="50" r="5.5" fill="url(#sk1)" />
        <line x1="142" y1="48" x2="149" y2="30" stroke="#4A2800" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="142" y1="48" x2="149" y2="30" stroke="rgba(220,160,60,0.5)" strokeWidth="5.5" strokeLinecap="round" />
        <circle style={{ animation: "glowPulse 1.8s ease-in-out infinite" }} cx="149" cy="28" r="10" fill="rgba(255,220,80,0)" stroke="rgba(255,220,80,0.7)" strokeWidth="2" />
        <circle cx="149" cy="28" r="5" fill="rgba(255,240,120,0.5)" />
        <polygon points="149,18 151,25 158,25 152,29 155,37 149,32 143,37 146,29 140,25 147,25" fill="#FFD700" stroke="#FFA000" strokeWidth="0.6" filter="url(#sf)" />
        {/* Tattoo */}
        <circle cx="64" cy="140" r="4.5" fill="none" stroke="rgba(180,50,120,0.75)" strokeWidth="1.2" />
        <path d="M61 140 C62 137 64 136 66 138 C67 140 66 143 64 143 C62 143 61 141 61 140" fill="rgba(200,60,120,0.5)" />
        <path d="M60 141 C58 143 59 146 61 145" stroke="rgba(80,160,60,0.7)" strokeWidth="1.2" fill="none" />
        <circle cx="62" cy="154" r="3.5" fill="none" stroke="rgba(160,40,100,0.7)" strokeWidth="1" />
        <path d="M68 142 C71 140 73 143 70 144" fill="rgba(60,150,60,0.6)" /><path d="M66 148 C69 147 70 150 67 150" fill="rgba(60,150,60,0.55)" />
        <rect x="83" y="110" width="10" height="10" rx="5" fill="url(#sk1)" />
        <ellipse cx="88" cy="95" rx="20" ry="21" fill="url(#sk1)" />
        <path d="M72 104 Q88 118 104 104" fill="url(#sk1)" />
        <ellipse cx="88" cy="82" rx="21" ry="15" fill="url(#h1)" />
        <ellipse cx="88" cy="70" rx="11" ry="9" fill="url(#h1)" />
        <circle cx="88" cy="62" r="7" fill="#C89820" /><circle cx="88" cy="62" r="4" fill="#E0B830" />
        <path d="M80 70 C84 64 92 64 96 70" stroke="rgba(255,245,180,0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M68 90 C64 96 66 106 70 110" stroke="#C89820" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="88" cy="70" r="4" fill="#FF6090" stroke="#C03060" strokeWidth="0.8" /><circle cx="88" cy="70" r="1.8" fill="#FFD700" />
        <path d="M106 94 C116 89 120 96 116 103 C112 108 106 102 106 96" fill="url(#sk1)" stroke="#D89060" strokeWidth="0.9" />
        <path d="M70 94 C60 89 56 96 60 103 C64 108 70 102 70 96" fill="url(#sk1)" stroke="#D89060" strokeWidth="0.9" />
        <path d="M76 86 Q81 82 86 84" stroke="#8B6010" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M90 84 Q95 82 100 86" stroke="#8B6010" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <ellipse cx="81" cy="92" rx="6" ry="5" fill="white" /><ellipse cx="95" cy="92" rx="6" ry="5" fill="white" />
        <circle cx="81" cy="93" r="4" fill="#4090E0" /><circle cx="95" cy="93" r="4" fill="#4090E0" />
        <circle cx="81" cy="93" r="2.5" fill="#2060B0" /><circle cx="95" cy="93" r="2.5" fill="#2060B0" />
        <circle cx="81" cy="93" r="1.5" fill="#0A1A30" /><circle cx="95" cy="93" r="1.5" fill="#0A1A30" />
        <circle cx="79.5" cy="91.5" r="1.2" fill="white" /><circle cx="93.5" cy="91.5" r="1.2" fill="white" />
        <path d="M84 101 Q88 105 92 102" stroke="#D08060" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M79 108 Q88 116 97 108" stroke="#E04080" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M82 108 Q88 105 94 108" fill="rgba(255,120,160,0.4)" />
        <ellipse cx="74" cy="102" rx="6" ry="4" fill="rgba(255,120,140,0.3)" /><ellipse cx="102" cy="102" rx="6" ry="4" fill="rgba(255,120,140,0.3)" />
        <path d="M72 84 Q84 54 92 40 Q98 66 108 80 Q92 76 72 84" fill="#E05090" stroke="#B03060" strokeWidth="1" />
        <path d="M72 84 Q90 80 108 80" stroke="#FFD700" strokeWidth="2.5" fill="none" />
        <circle cx="92" cy="40" r="3.5" fill="#FFD700" stroke="#C8860A" strokeWidth="0.8" />
      </g>

      {/* ── RIGHT FAIRY (blue) ── */}
      <g style={{ animation: "floatR 4.0s ease-in-out infinite" }} filter="url(#softShadow)">
        <g style={{ animation: "wingBeat 0.85s ease-in-out 0.2s infinite alternate", transformOrigin: "318px 95px" }} filter="url(#wingGlow)">
          <path d="M318 88 C362 58 384 36 372 22 C360 10 334 28 318 60" fill="url(#wg2)" stroke="rgba(200,140,255,0.8)" strokeWidth="1.2" />
          <path d="M318 68 C340 52 356 38 368 26" stroke="rgba(180,120,240,0.5)" strokeWidth="0.8" fill="none" />
          <path d="M318 88 C305 62 292 44 300 30 C306 20 322 30 318 60" fill="url(#wg2)" stroke="rgba(200,140,255,0.7)" strokeWidth="1" opacity="0.8" />
          <path d="M318 100 C352 104 370 122 362 136 C354 148 332 136 318 110" fill="url(#wg2)" stroke="rgba(200,140,255,0.65)" strokeWidth="1" opacity="0.85" />
          <path d="M318 100 C304 104 294 118 300 130 C306 140 318 128 318 110" fill="url(#wg2)" stroke="rgba(200,140,255,0.6)" strokeWidth="0.9" opacity="0.75" />
        </g>
        <path d="M314 168 C318 178 324 188 330 196" stroke="url(#sk2)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M306 168 C300 174 292 172 290 164" stroke="url(#sk2)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M332 196 C340 200 346 205 342 210 C338 214 328 208 328 198" fill="#2080B8" stroke="#105888" strokeWidth="0.8" /><circle cx="344" cy="210" r="3" fill="#FFD700" />
        <path d="M290 164 C284 162 278 164 280 170 C282 175 290 172 290 165" fill="#2080B8" stroke="#105888" strokeWidth="0.8" /><circle cx="278" cy="168" r="2.5" fill="#FFD700" />
        <ellipse cx="312" cy="140" rx="16" ry="22" fill="url(#sk2)" />
        <path d="M296 128 C296 118 328 118 328 128 C328 140 322 158 312 162 C302 158 296 140 296 128" fill="url(#bl)" filter="url(#bodyGlow)" />
        <path d="M306 126 C308 120 312 118 318 122 C314 120 306 120 306 126" fill="rgba(200,240,255,0.5)" />
        <circle cx="308" cy="132" r="2" fill="rgba(255,255,255,0.45)" /><circle cx="316" cy="139" r="1.5" fill="rgba(255,255,255,0.38)" />
        <path d="M296 150 Q300 158 304 153 Q308 160 312 155 Q316 160 320 153 Q324 158 328 150" fill="#1870A8" stroke="#0A5080" strokeWidth="0.8" />
        <path d="M326 128 C334 136 340 148 342 158" stroke="url(#sk2)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="343" cy="160" r="5.5" fill="url(#sk2)" />
        <path d="M298 126 C288 112 272 82 258 48" stroke="url(#sk2)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="259" cy="50" r="5.5" fill="url(#sk2)" />
        <line x1="258" y1="48" x2="251" y2="30" stroke="#4A2800" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="258" y1="48" x2="251" y2="30" stroke="rgba(220,160,60,0.5)" strokeWidth="5.5" strokeLinecap="round" />
        <circle style={{ animation: "glowPulse 1.8s ease-in-out 0.5s infinite" }} cx="251" cy="28" r="10" fill="rgba(255,220,80,0)" stroke="rgba(255,220,80,0.7)" strokeWidth="2" />
        <circle cx="251" cy="28" r="5" fill="rgba(255,240,120,0.5)" />
        <polygon points="251,18 253,25 260,25 254,29 257,37 251,32 245,37 248,29 242,25 249,25" fill="#FFD700" stroke="#FFA000" strokeWidth="0.6" filter="url(#sf)" />
        {/* Tattoo */}
        <polygon points="338,136 342,140 338,144 334,140" fill="none" stroke="rgba(40,120,200,0.8)" strokeWidth="1.2" />
        <line x1="338" y1="136" x2="338" y2="144" stroke="rgba(40,120,200,0.6)" strokeWidth="0.8" /><line x1="334" y1="140" x2="342" y2="140" stroke="rgba(40,120,200,0.6)" strokeWidth="0.8" />
        <polygon points="338,131 338.8,133.5 341.5,133.5 339.3,135 340.1,137.5 338,136 335.9,137.5 336.7,135 334.5,133.5 337.2,133.5" fill="rgba(60,140,220,0.7)" />
        <path d="M334 155 L338 158 L342 155" stroke="rgba(40,120,200,0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="307" y="110" width="10" height="10" rx="5" fill="url(#sk2)" />
        <ellipse cx="312" cy="95" rx="20" ry="21" fill="url(#sk2)" />
        <path d="M296 104 Q312 118 328 104" fill="url(#sk2)" />
        <ellipse cx="312" cy="82" rx="21" ry="15" fill="url(#h2)" />
        <ellipse cx="312" cy="70" rx="11" ry="9" fill="url(#h2)" />
        <circle cx="312" cy="62" r="7" fill="#D4A820" /><circle cx="312" cy="62" r="4" fill="#F0C840" />
        <path d="M292 90 C288 96 290 110 294 116" stroke="#D4A820" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="312" cy="70" r="4" fill="#3090D0" stroke="#1060A0" strokeWidth="0.8" /><circle cx="312" cy="70" r="1.8" fill="#FFD700" />
        <path d="M330 94 C340 89 344 96 340 103 C336 108 330 102 330 96" fill="url(#sk2)" stroke="#D8A070" strokeWidth="0.9" />
        <path d="M294 94 C284 89 280 96 284 103 C288 108 294 102 294 96" fill="url(#sk2)" stroke="#D8A070" strokeWidth="0.9" />
        <path d="M300 86 Q305 82 310 84" stroke="#9B7010" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M314 84 Q319 82 324 86" stroke="#9B7010" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <ellipse cx="305" cy="92" rx="6" ry="5" fill="white" /><ellipse cx="319" cy="92" rx="6" ry="5" fill="white" />
        <circle cx="305" cy="93" r="4" fill="#3EB050" /><circle cx="319" cy="93" r="4" fill="#3EB050" />
        <circle cx="305" cy="93" r="2.5" fill="#207838" /><circle cx="319" cy="93" r="2.5" fill="#207838" />
        <circle cx="305" cy="93" r="1.5" fill="#081A10" /><circle cx="319" cy="93" r="1.5" fill="#081A10" />
        <circle cx="303.5" cy="91.5" r="1.2" fill="white" /><circle cx="317.5" cy="91.5" r="1.2" fill="white" />
        <path d="M308 102 Q312 105 316 102" stroke="#D09060" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M303 108 Q312 116 321 108" stroke="#D04060" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M306 108 Q312 105 318 108" fill="rgba(255,110,140,0.4)" />
        <ellipse cx="298" cy="102" rx="6" ry="4" fill="rgba(255,120,140,0.28)" /><ellipse cx="326" cy="102" rx="6" ry="4" fill="rgba(255,120,140,0.28)" />
        <path d="M328 84 Q316 54 308 40 Q302 66 292 80 Q308 76 328 84" fill="#2090C8" stroke="#1060A0" strokeWidth="1" />
        <path d="M292 80 Q310 76 328 84" stroke="#FFD700" strokeWidth="2.5" fill="none" />
        <circle cx="308" cy="40" r="3.5" fill="#FFD700" stroke="#C8860A" strokeWidth="0.8" />
      </g>

      {/* Title */}
      <g style={{ animation: "titleGlow 3s ease-in-out infinite" }}>
        <text x="200" y="202" textAnchor="middle" fontFamily="'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif" fontSize="35" fontWeight="700" letterSpacing="4.5" fill="rgba(0,0,0,0.3)" dy="3">ACCIDENT ELVES</text>
        <text x="200" y="202" textAnchor="middle" fontFamily="'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif" fontSize="35" fontWeight="700" letterSpacing="4.5" fill="url(#gold)">ACCIDENT ELVES</text>
        <line x1="58" y1="210" x2="152" y2="210" stroke="rgba(255,215,0,0.3)" strokeWidth="1" />
        <line x1="248" y1="210" x2="342" y2="210" stroke="rgba(255,215,0,0.3)" strokeWidth="1" />
        <circle cx="200" cy="210" r="2.5" fill="rgba(255,215,0,0.4)" />
        <text x="200" y="222" textAnchor="middle" fontFamily="'Palatino Linotype',Georgia,serif" fontSize="9.5" letterSpacing="3.5" fontStyle="italic" fill="rgba(180,230,210,0.8)">we make problems disappear ✨</text>
      </g>
    </svg>
  );
}

// ─── SCROLL ANIMATION HOOK ────────────────────────────────────────
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}
function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "🚐", title: "Rides & Towing", short: "We come to you — now", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", desc: "Stranded after your accident? We dispatch Uber, Zoox, or Vay rideshare plus licensed towing — directly to your location, 24/7.", bullets: ["24/7 dispatch — real humans answer", "Uber, Zoox & Vay coordination in Las Vegas", "Licensed towing, zero price gouging", "Roadside assistance while you wait"], cta: "Get a Ride Now" },
  { icon: "🚗", title: "Rental Cars", short: "Back on the road today", color: "#A78BFA", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)", desc: "Don't let a wrecked car wreck your week. We unlock exclusive discounts with rental partners so you're moving again — today.", bullets: ["Up to 40% off standard rates", "Same-day pickup available", "Insurance billing coordination", "Economy to SUV — your choice"], cta: "Unlock My Discount" },
  { icon: "🔧", title: "Honest Body Shops", short: "No surprises, ever", color: "#34D399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.25)", desc: "We only send you to vetted, honest shops. Fair estimates. Quality work. No hidden fees — just your car fixed right.", bullets: ["Pre-screened & rated partners only", "Free second-opinion estimates", "All insurers accepted", "Text updates on your repair"], cta: "Find a Body Shop" },
  { icon: "🩺", title: "Medical & Chiro", short: "Treatment now, pay later", color: "#F87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.25)", desc: "Injuries aren't always visible. Our medical network sees you fast — most work on a lien basis, meaning $0 out of pocket until your case settles.", bullets: ["Same-day appointments", "Chiropractors, urgent care & specialists", "Lien-based care — $0 upfront", "Documentation that protects your claim"], cta: "See a Doctor Today" },
  { icon: "⚖️", title: "Free Legal Consult", short: "Know your rights", color: "#FFD700", bg: "rgba(255,215,0,0.08)", border: "rgba(255,215,0,0.25)", desc: "Not sure what your situation is worth? Our partners at In Your Corner Consulting connect you with trusted Las Vegas PI attorneys — free, no pressure, no obligation.", bullets: ["100% free consultation", "No fees unless you win", "Experienced Nevada attorneys", "Bilingual staff available"], cta: "Get Free Consult" },
];

const STEPS = [
  { n: "01", icon: "📞", label: "Call or text us — we answer 24/7" },
  { n: "02", icon: "🔍", label: "We assess your needs instantly" },
  { n: "03", icon: "🤝", label: "We connect you with the right help" },
  { n: "04", icon: "✨", label: "Problems disappear — like magic" },
];

const HELP_OPT = ["Ride / Towing", "Rental Car", "Body Shop", "Medical / Chiro", "Legal Consult"];

// ─── SERVICE CARD ─────────────────────────────────────────────────
function ServiceCard({ svc, idx }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  return (
    <div ref={ref} onClick={() => setOpen(!open)} style={{ background: open ? svc.bg : "rgba(255,255,255,0.03)", border: `1.5px solid ${open ? svc.border : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: "26px 24px", cursor: "pointer", transition: "all 0.3s cubic-bezier(.4,0,.2,1)", boxShadow: open ? `0 12px 40px ${svc.color}18` : "none", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transitionDelay: `${idx * 0.07}s` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 50, height: 50, background: svc.bg, border: `1.5px solid ${svc.border}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{svc.icon}</div>
          <div>
            <div style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{svc.title}</div>
            <div style={{ fontSize: 11, color: svc.color, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "system-ui" }}>{svc.short}</div>
          </div>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: "50%", border: `1.5px solid ${svc.color}55`, display: "flex", alignItems: "center", justifyContent: "center", color: svc.color, fontSize: 18, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</div>
      </div>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.75, margin: "0 0 14px", fontFamily: "system-ui" }}>{svc.desc}</p>
      {open && (
        <div style={{ animation: "fadeUp 0.3s ease" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px" }}>
            {svc.bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: 10, padding: "5px 0", fontSize: 13, color: "rgba(255,255,255,0.78)", fontFamily: "system-ui" }}>
                <span style={{ color: svc.color, fontWeight: 800, flexShrink: 0 }}>✓</span>{b}
              </li>
            ))}
          </ul>
          <button onClick={e => e.stopPropagation()} style={{ width: "100%", background: svc.color, color: "#0a1f12", border: "none", borderRadius: 50, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "system-ui", letterSpacing: "0.03em" }}>{svc.cta} →</button>
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function AccidentElves() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", type: "", help: [], notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleHelp = h => setForm(p => ({ ...p, help: p.help.includes(h) ? p.help.filter(x => x !== h) : [...p.help, h] }));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0a1a0f", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes floatL { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-14px) rotate(1.5deg)} }
        @keyframes floatR { 0%,100%{transform:translateY(-8px) rotate(1.5deg)} 50%{transform:translateY(6px) rotate(-1.5deg)} }
        @keyframes wingBeat { 0%,100%{transform:scaleX(1);opacity:0.75} 50%{transform:scaleX(0.65);opacity:0.95} }
        @keyframes glowPulse { 0%,100%{opacity:0.35} 50%{opacity:0.9} }
        @keyframes sparkle { 0%{opacity:0;transform:scale(0.2) rotate(0deg)} 35%{opacity:1;transform:scale(1.3) rotate(20deg)} 65%{opacity:0.7;transform:scale(1) rotate(-8deg)} 100%{opacity:0;transform:scale(0.1) rotate(45deg)} }
        @keyframes arcShimmer { 0%,100%{opacity:0.2} 50%{opacity:0.6} }
        @keyframes titleGlow { 0%,100%{filter:drop-shadow(0 0 8px rgba(255,210,0,0.5))} 50%{filter:drop-shadow(0 0 28px rgba(255,210,0,0.95))} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes callPulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,215,0,0.4)} 50%{box-shadow:0 0 0 10px rgba(255,215,0,0)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(10,26,15,0.96)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,215,0,0.12)" : "none", padding: "12px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.4s ease" }}>
        {/* Nav logo — mini fairy SVG */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FairyLogoSVG width="120px" maxWidth={120} />
        </div>
        <a href="tel:7029964996" style={{ background: "linear-gradient(135deg,#FFD700,#C8860A)", color: "#0a1a0f", padding: "10px 22px", borderRadius: 50, fontWeight: 800, fontSize: 14, textDecoration: "none", letterSpacing: "0.03em", animation: "callPulse 2.5s infinite", whiteSpace: "nowrap" }}>
          📞 (702) 996-4996
        </a>
      </nav>

      {/* HERO */}
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#071210 0%,#0f2418 45%,#091824 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "130px 24px 90px", position: "relative", overflow: "hidden" }}>
        {/* Orbs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle,rgba(255,215,0,0.07) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 320, height: 320, background: "radial-gradient(circle,rgba(90,184,232,0.08) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Main fairy logo */}
        <div style={{ width: "100%", maxWidth: 580, marginBottom: 8 }}>
          <FairyLogoSVG />
        </div>

        <div style={{ display: "inline-block", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", borderRadius: 40, padding: "7px 20px", marginBottom: 28, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FFD700", fontWeight: 700 }}>
          Available 24/7 · Las Vegas, NV & Surrounding Areas
        </div>

        <h1 style={{ fontSize: "clamp(30px,5.5vw,62px)", fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif", fontWeight: 700, lineHeight: 1.15, color: "#fff", marginBottom: 22, maxWidth: 760, letterSpacing: "-0.02em" }}>
          Had an Accident?<br />
          <span style={{ background: "linear-gradient(90deg,#FFD700,#FFF5B0,#FFD700)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "arcShimmer 3s linear infinite" }}>
            Our Elves Make Problems Disappear.
          </span>
        </h1>

        <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,0.68)", lineHeight: 1.8, maxWidth: 540, marginBottom: 44 }}>
          From rides and rentals to body shops, medical care, and free legal consultations — one call puts our whole team to work for you.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 52 }}>
          <a href="#get-help" style={{ background: "linear-gradient(135deg,#FFD700,#C8860A)", color: "#0a1a0f", padding: "16px 40px", borderRadius: 50, fontWeight: 800, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 32px rgba(255,215,0,0.3)", letterSpacing: "0.02em" }}>Get Help Now — It's Free</a>
          <a href="tel:7029964996" style={{ background: "transparent", color: "#FFD700", padding: "16px 40px", borderRadius: 50, fontWeight: 700, fontSize: 16, textDecoration: "none", border: "2px solid rgba(255,215,0,0.35)", letterSpacing: "0.02em" }}>📞 Call 24/7</a>
        </div>

        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
          {["Zero Upfront Cost", "Real Humans 24/7", "We're On YOUR Side", "Tourists Welcome"].map(b => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              <span style={{ color: "#FFD700", fontWeight: 800 }}>✓</span>{b}
            </div>
          ))}
        </div>
      </div>

      {/* URGENT BANNER */}
      <div style={{ background: "rgba(255,215,0,0.1)", borderTop: "1px solid rgba(255,215,0,0.2)", borderBottom: "1px solid rgba(255,215,0,0.2)", padding: "14px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#FFD700" }}>
          ⚠️ Just had an accident? <span style={{ color: "#fff" }}>Don't speak to the other driver's insurance before calling us.</span>
          <a href="tel:7029964996" style={{ color: "#FFD700", marginLeft: 8, textDecoration: "underline" }}>(702) 996-4996</a> — We'll guide you for free.
        </p>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: "90px 24px", background: "#0d1f14" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFD700", fontWeight: 700, marginBottom: 14 }}>The Process</div>
              <h2 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, letterSpacing: "-0.02em" }}>How the Magic Works</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ textAlign: "center", padding: "32px 20px", background: "rgba(255,255,255,0.03)", borderRadius: 20, border: "1px solid rgba(255,215,0,0.1)" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,215,0,0.3)", letterSpacing: "0.12em", marginBottom: 14 }}>{step.n}</div>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{step.icon}</div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>{step.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div style={{ padding: "90px 24px", background: "#0a1a0f" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFD700", fontWeight: 700, marginBottom: 14 }}>Five Services, One Call</div>
              <h2 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Everything You Need After an Accident</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 12, fontSize: 15 }}>Tap any card to see full details</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            {SERVICES.map((svc, i) => <ServiceCard key={i} svc={svc} idx={i} />)}
          </div>
        </div>
      </div>

      {/* TRUST STATS */}
      <div style={{ background: "linear-gradient(135deg,#071210,#0f2418)", padding: "80px 24px", borderTop: "1px solid rgba(255,215,0,0.1)", borderBottom: "1px solid rgba(255,215,0,0.1)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ textAlign: "center", fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, marginBottom: 52, letterSpacing: "-0.02em" }}>
              Las Vegas Trusts the Elves <span style={{ color: "#FFD700" }}>✨</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 20 }}>
            {[
              { icon: "⚡", stat: "< 5 min", label: "Response time" },
              { icon: "📞", stat: "24/7", label: "Always available" },
              { icon: "💛", stat: "$0", label: "Upfront cost" },
              { icon: "🌎", stat: "Bilingual", label: "English & Spanish" },
              { icon: "🏆", stat: "100%", label: "Free consults" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.12)", borderRadius: 18, padding: "28px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#FFD700", marginBottom: 4 }}>{item.stat}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>{item.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* LEAD FORM */}
      <div id="get-help" style={{ padding: "90px 24px", background: "#0d1f14" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          {!submitted ? (
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFD700", fontWeight: 700, marginBottom: 14 }}>Send the Elves</div>
                <h2 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>Get Help Right Now</h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15 }}>Fill this out and a friendly advisor calls you within minutes.</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: 24, padding: "38px 32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[{ label: "Full Name *", key: "name", placeholder: "Jane Smith", type: "text" }, { label: "Phone Number *", key: "phone", placeholder: "(702) 555-0000", type: "tel" }].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.label}</label>
                      <input type={f.type} value={form[f.key]} placeholder={f.placeholder} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,215,0,0.2)", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#fff", outline: "none" }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>Date of Accident</label>
                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,215,0,0.2)", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#fff", outline: "none", colorScheme: "dark" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>Incident Type</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,215,0,0.2)", fontSize: 14, background: "#0d1f14", color: "#fff", outline: "none" }}>
                      <option value="">Select one...</option>
                      <option>Car Accident</option><option>Motorcycle Accident</option><option>Truck / Commercial Vehicle</option><option>Pedestrian / Bicycle</option><option>Slip & Fall</option><option>Other Personal Injury</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>I need help with...</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {HELP_OPT.map(opt => (
                      <button key={opt} onClick={() => toggleHelp(opt)} style={{ padding: "8px 16px", borderRadius: 50, fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em", border: `1.5px solid ${form.help.includes(opt) ? "#FFD700" : "rgba(255,255,255,0.15)"}`, background: form.help.includes(opt) ? "rgba(255,215,0,0.15)" : "transparent", color: form.help.includes(opt) ? "#FFD700" : "rgba(255,255,255,0.55)", transition: "all 0.2s" }}>
                        {form.help.includes(opt) ? "✓ " : ""}{opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>Brief description (optional)</label>
                  <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Tell us what happened..." rows={3}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,215,0,0.2)", fontSize: 14, background: "rgba(255,255,255,0.05)", color: "#fff", resize: "vertical", outline: "none" }} />
                </div>
                <button onClick={() => { if (form.name && form.phone) setSubmitted(true); }} style={{ width: "100%", background: "linear-gradient(135deg,#FFD700,#C8860A)", color: "#0a1a0f", border: "none", borderRadius: 12, padding: "17px", fontWeight: 800, fontSize: 16, cursor: "pointer", letterSpacing: "0.02em", boxShadow: "0 8px 28px rgba(255,215,0,0.3)" }}>
                  Send the Elves My Way ✨
                </button>
                <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>🔒 Your info is private and never sold. This is not legal advice.</p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div style={{ textAlign: "center", background: "rgba(255,215,0,0.07)", border: "2px solid rgba(255,215,0,0.25)", borderRadius: 24, padding: "60px 40px" }}>
                <div style={{ fontSize: 64, marginBottom: 16, animation: "floatL 3s ease-in-out infinite" }}>✨</div>
                <h2 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontSize: 28, fontWeight: 700, color: "#FFD700", marginBottom: 12 }}>The Elves Are On It, {form.name.split(" ")[0]}!</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>An advisor will call <strong style={{ color: "#fff" }}>{form.phone}</strong> within minutes. Need immediate help?</p>
                <a href="tel:7029964996" style={{ display: "inline-block", background: "linear-gradient(135deg,#FFD700,#C8860A)", color: "#0a1a0f", padding: "16px 36px", borderRadius: 50, fontWeight: 800, fontSize: 15, textDecoration: "none" }}>📞 (702) 996-4996</a>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* IN YOUR CORNER */}
      <div style={{ background: "#0a0a1a", padding: "70px 24px", textAlign: "center", borderTop: "1px solid rgba(255,215,0,0.08)" }}>
        <Reveal>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>⚖️</div>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.8)", fontWeight: 700, marginBottom: 16 }}>Legal Consultations Powered By</div>
            <h3 style={{ fontFamily: "'Palatino Linotype',Georgia,serif", color: "#fff", fontSize: 26, fontWeight: 700, marginBottom: 14, letterSpacing: "-0.02em" }}>In Your Corner Consulting</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
              Our legal consultation partner connects you with experienced, trusted Nevada personal injury attorneys — completely free, no pressure, no obligation.<br />
              <em style={{ color: "rgba(255,255,255,0.4)" }}>"We fight for you and help you through."</em>
            </p>
            <a href="#get-help" style={{ display: "inline-block", background: "transparent", color: "rgba(167,139,250,0.9)", border: "1.5px solid rgba(167,139,250,0.3)", padding: "13px 32px", borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Get a Free Legal Consultation →</a>
          </div>
        </Reveal>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#060f09", color: "rgba(255,255,255,0.3)", padding: "36px 24px", textAlign: "center", borderTop: "1px solid rgba(255,215,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontFamily: "'Palatino Linotype',Georgia,serif", fontWeight: 700, color: "#FFD700", fontSize: 16, letterSpacing: "0.05em" }}>ACCIDENT ELVES</span>
          <span style={{ color: "rgba(255,215,0,0.4)", fontSize: 12 }}>· Las Vegas, NV</span>
        </div>
        <p style={{ fontSize: 11, maxWidth: 640, margin: "0 auto 12px", lineHeight: 1.9, color: "rgba(255,255,255,0.25)" }}>
          <strong style={{ color: "rgba(255,255,255,0.4)" }}>Disclaimer:</strong> Accident Elves is not a law firm and does not provide legal advice. We are an independent concierge and referral service. Legal consultations are facilitated through In Your Corner Consulting, which refers to licensed Nevada attorneys. All consultations are free and non-obligatory.
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          © 2026 Accident Elves LLC · <a href="#" style={{ color: "rgba(255,215,0,0.25)" }}>Privacy Policy</a> · <a href="#" style={{ color: "rgba(255,215,0,0.25)" }}>Terms of Service</a>
        </p>
      </div>
    </div>
  );
}

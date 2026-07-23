// ============================================================
// Datos de la app: niveles, lecciones y vocabulario con iconos SVG
// ============================================================

// --- Helpers para armar iconos SVG consistentes -------------------------
function svg(inner, bg) {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="58" fill="${bg}"/>
    ${inner}
  </svg>`;
}

// --- Iconos: COLORES ------------------------------------------------------
function dropIcon(color) {
  return svg(`
    <path d="M60 20 C60 20 34 58 34 80 a26 26 0 0 0 52 0 C86 58 60 20 60 20 Z" fill="${color}" stroke="#00000022" stroke-width="3"/>
    <ellipse cx="50" cy="70" rx="6" ry="10" fill="#ffffff66"/>
  `, "#FFFFFF");
}

// --- Iconos: ANIMALES ------------------------------------------------------
const catIcon = svg(`
  <circle cx="60" cy="68" r="32" fill="#F7B267"/>
  <path d="M34 46 L28 20 L52 40 Z" fill="#F7B267"/>
  <path d="M86 46 L92 20 L68 40 Z" fill="#F7B267"/>
  <path d="M38 48 L34 26 L54 42 Z" fill="#FFD9A6"/>
  <path d="M82 48 L86 26 L66 42 Z" fill="#FFD9A6"/>
  <circle cx="48" cy="66" r="6" fill="#2E2A26"/>
  <circle cx="72" cy="66" r="6" fill="#2E2A26"/>
  <path d="M56 80 L64 80 L60 86 Z" fill="#E8607A"/>
  <path d="M30 82 L46 78 M30 90 L46 84 M90 82 L74 78 M90 90 L74 84" stroke="#2E2A26" stroke-width="2" stroke-linecap="round"/>
`, "#FFF3E2");

const dogIcon = svg(`
  <ellipse cx="42" cy="42" rx="14" ry="22" fill="#B07C4F" transform="rotate(-20 42 42)"/>
  <ellipse cx="78" cy="42" rx="14" ry="22" fill="#B07C4F" transform="rotate(20 78 42)"/>
  <circle cx="60" cy="68" r="32" fill="#D9A066"/>
  <circle cx="48" cy="64" r="6" fill="#2E2A26"/>
  <circle cx="72" cy="64" r="6" fill="#2E2A26"/>
  <ellipse cx="60" cy="78" rx="8" ry="6" fill="#2E2A26"/>
  <path d="M60 84 Q60 94 72 90" stroke="#E8607A" stroke-width="5" fill="none" stroke-linecap="round"/>
`, "#F2E7D8");

const birdIcon = svg(`
  <ellipse cx="60" cy="70" rx="28" ry="24" fill="#5CC8E6"/>
  <circle cx="60" cy="42" r="20" fill="#5CC8E6"/>
  <path d="M60 42 L82 48 L60 54 Z" fill="#FFB84D"/>
  <circle cx="66" cy="38" r="4" fill="#2E2A26"/>
  <path d="M32 70 Q10 66 20 84 Q34 84 40 74 Z" fill="#3CA6C9"/>
  <path d="M60 94 L52 106 M68 94 L68 108 M76 94 L84 104" stroke="#FFB84D" stroke-width="4" stroke-linecap="round"/>
`, "#E4F7FB");

const fishIcon = svg(`
  <ellipse cx="54" cy="60" rx="30" ry="22" fill="#4FA6E8"/>
  <path d="M84 60 L104 44 L104 76 Z" fill="#3B85C4"/>
  <path d="M46 40 L58 26 L64 42 Z" fill="#3B85C4"/>
  <circle cx="38" cy="56" r="5" fill="#152A3A"/>
  <path d="M20 30 a4 4 0 1 1 0.1 0 M14 20 a3 3 0 1 1 0.1 0" stroke="#4FA6E8" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#E1F1FC");

const rabbitIcon = svg(`
  <ellipse cx="46" cy="24" rx="9" ry="26" fill="#F4C9D8"/>
  <ellipse cx="74" cy="24" rx="9" ry="26" fill="#F4C9D8"/>
  <ellipse cx="46" cy="24" rx="4" ry="18" fill="#FBE3EB"/>
  <ellipse cx="74" cy="24" rx="4" ry="18" fill="#FBE3EB"/>
  <circle cx="60" cy="68" r="32" fill="#FDFDFD" stroke="#EADCE6" stroke-width="2"/>
  <circle cx="49" cy="64" r="5" fill="#2E2A26"/>
  <circle cx="71" cy="64" r="5" fill="#2E2A26"/>
  <path d="M60 74 L54 80 L66 80 Z" fill="#F2A6BE"/>
  <path d="M28 76 L44 72 M28 84 L44 78 M92 76 L76 72 M92 84 L76 78" stroke="#c9b8c0" stroke-width="2" stroke-linecap="round"/>
`, "#FCEFF5");

const lionIcon = svg(`
  <circle cx="60" cy="62" r="40" fill="#E8991F"/>
  <path d="M60 22 L66 40 L82 26 L78 46 L98 40 L84 56 L100 66 L80 68 L88 86 L70 74 L64 92 L58 74 L40 86 L48 68 L28 66 L44 56 L30 40 L50 46 L46 26 L62 40 Z" fill="#E8991F" opacity="0"/>
  <circle cx="60" cy="66" r="26" fill="#FBCB7B"/>
  <circle cx="50" cy="62" r="5" fill="#2E2A26"/>
  <circle cx="70" cy="62" r="5" fill="#2E2A26"/>
  <path d="M60 72 L54 78 L66 78 Z" fill="#B5651D"/>
  <path d="M60 20 L64 36 M80 26 L72 40 M96 42 L78 50 M100 64 L80 64 M92 84 L76 72 M72 96 L64 80 M48 96 L56 80 M28 84 L44 72 M20 64 L40 64 M24 42 L42 50" stroke="#D9821A" stroke-width="9" stroke-linecap="round"/>
`, "#FDF1DD");

// --- Iconos: NÚMEROS ------------------------------------------------------
function numberIcon(n, color) {
  let dots = "";
  const positions = [
    [60, 92], [48, 92, 72, 92], [48, 92, 60, 92, 72, 92],
    [48, 84, 72, 84, 48, 96, 72, 96],
    [48, 84, 60, 84, 72, 84, 54, 96, 66, 96],
    [46, 84, 60, 84, 74, 84, 46, 96, 60, 96, 74, 96],
  ][n - 1];
  for (let i = 0; i < positions.length; i += 2) {
    dots += `<circle cx="${positions[i]}" cy="${positions[i + 1]}" r="4" fill="${color}"/>`;
  }
  return svg(`
    <text x="60" y="66" font-family="Fredoka, sans-serif" font-size="46" font-weight="700" fill="${color}" text-anchor="middle">${n}</text>
    ${dots}
  `, "#FFFFFF");
}

// --- Iconos: COMIDA ------------------------------------------------------
const appleIcon = svg(`
  <path d="M60 42 C36 38 30 60 32 76 C34 94 48 102 60 96 C72 102 86 94 88 76 C90 60 84 38 60 42 Z" fill="#EF5350"/>
  <path d="M60 42 C60 42 58 30 62 24" stroke="#7A4B27" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M62 26 C70 20 78 26 74 34 C68 36 62 32 62 26 Z" fill="#6BCB77"/>
  <ellipse cx="46" cy="62" rx="6" ry="10" fill="#FFFFFF55"/>
`, "#FDECEC");

const bananaIcon = svg(`
  <path d="M34 84 C30 60 44 32 70 26 C74 25 78 28 76 32 C58 40 48 62 52 84 C54 96 44 100 38 96 C32 92 34 88 34 84 Z" fill="#FFD93D"/>
  <path d="M70 26 C74 22 80 22 80 28 C80 32 74 34 70 30 Z" fill="#B08A3C"/>
  <path d="M42 82 C44 66 52 50 64 40" stroke="#E8B923" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#FFF8E0");

const breadIcon = svg(`
  <path d="M28 66 C28 44 42 34 60 34 C78 34 92 44 92 66 L92 84 C92 90 88 94 82 94 L38 94 C32 94 28 90 28 84 Z" fill="#E8A854"/>
  <path d="M28 66 C28 44 42 34 60 34 C78 34 92 44 92 66" fill="none" stroke="#C7873A" stroke-width="3"/>
  <path d="M45 50 Q60 40 75 50 M42 62 Q60 50 78 62" stroke="#C7873A" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#FCF0DE");

const milkIcon = svg(`
  <path d="M46 24 L74 24 L74 38 L82 50 L82 96 C82 100 78 104 74 104 L46 104 C42 104 38 100 38 96 L38 50 L46 38 Z" fill="#FFFFFF" stroke="#CBD5E0" stroke-width="3"/>
  <path d="M38 62 L82 62 L82 96 C82 100 78 104 74 104 L46 104 C42 104 38 100 38 96 Z" fill="#5DB9F2"/>
  <rect x="46" y="24" width="28" height="10" fill="#5DB9F2"/>
`, "#EAF6FF");

const eggIcon = svg(`
  <path d="M60 24 C78 24 88 58 88 78 C88 96 76 104 60 104 C44 104 32 96 32 78 C32 58 42 24 60 24 Z" fill="#FFFFFF" stroke="#E9DFCB" stroke-width="3"/>
  <circle cx="60" cy="82" r="16" fill="#FFC93C"/>
`, "#FFF8EA");

const cakeIcon = svg(`
  <path d="M40 96 L40 66 L80 66 L80 96 Z" fill="#F7B7C5"/>
  <path d="M40 66 L60 46 L80 66 Z" fill="#F193AC"/>
  <rect x="38" y="90" width="44" height="10" rx="4" fill="#E8607A"/>
  <circle cx="60" cy="36" r="6" fill="#E8607A"/>
  <rect x="58" y="30" width="4" height="10" fill="#B07C4F"/>
  <path d="M44 78 Q60 70 76 78" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round"/>
`, "#FEF0F3");

// --- Iconos: FAMILIA ------------------------------------------------------
const momIcon = svg(`
  <path d="M30 106 C30 78 42 68 60 68 C78 68 90 78 90 106 Z" fill="#F2A6C6"/>
  <circle cx="60" cy="46" r="26" fill="#FBDCC2"/>
  <path d="M34 44 C34 20 86 20 86 44 C86 34 74 44 60 30 C46 44 34 34 34 44 Z" fill="#6B4A3A"/>
  <path d="M32 44 C28 60 32 70 38 66 C36 56 34 50 32 44 Z" fill="#6B4A3A"/>
  <path d="M88 44 C92 60 88 70 82 66 C84 56 86 50 88 44 Z" fill="#6B4A3A"/>
  <circle cx="52" cy="48" r="3.5" fill="#2E2A26"/>
  <circle cx="68" cy="48" r="3.5" fill="#2E2A26"/>
  <path d="M52 58 Q60 64 68 58" stroke="#B5555A" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#FDEFF5");

const dadIcon = svg(`
  <path d="M30 106 C30 80 42 70 60 70 C78 70 90 80 90 106 Z" fill="#5D9CEC"/>
  <circle cx="60" cy="46" r="26" fill="#F4C9A0"/>
  <path d="M34 40 C34 18 86 18 86 40 C80 30 40 30 34 40 Z" fill="#3B2B22"/>
  <circle cx="52" cy="48" r="3.5" fill="#2E2A26"/>
  <circle cx="68" cy="48" r="3.5" fill="#2E2A26"/>
  <path d="M50 60 Q60 66 70 60" stroke="#8A5A3B" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#EAF2FE");

const sisterIcon = svg(`
  <path d="M32 106 C32 80 44 70 60 70 C76 70 88 80 88 106 Z" fill="#B18CF0"/>
  <circle cx="60" cy="48" r="24" fill="#FBDCC2"/>
  <circle cx="30" cy="52" r="10" fill="#7A4B27"/>
  <circle cx="90" cy="52" r="10" fill="#7A4B27"/>
  <path d="M36 40 C36 20 84 20 84 40 C78 30 42 30 36 40 Z" fill="#7A4B27"/>
  <circle cx="52" cy="50" r="3.5" fill="#2E2A26"/>
  <circle cx="68" cy="50" r="3.5" fill="#2E2A26"/>
  <path d="M52 60 Q60 66 68 60" stroke="#B5555A" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#F3ECFC");

const brotherIcon = svg(`
  <path d="M32 106 C32 80 44 70 60 70 C76 70 88 80 88 106 Z" fill="#6BCB77"/>
  <circle cx="60" cy="48" r="24" fill="#F4C9A0"/>
  <path d="M36 42 C36 22 84 22 84 42 C78 32 42 32 36 42 Z" fill="#3B2B22"/>
  <circle cx="52" cy="50" r="3.5" fill="#2E2A26"/>
  <circle cx="68" cy="50" r="3.5" fill="#2E2A26"/>
  <path d="M52 60 Q60 65 68 60" stroke="#8A5A3B" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#EAF7EC");

const babyIcon = svg(`
  <path d="M36 104 C36 86 46 78 60 78 C74 78 84 86 84 104 Z" fill="#FFD93D"/>
  <circle cx="60" cy="56" r="28" fill="#FDE3CB"/>
  <path d="M46 38 Q60 26 74 38" stroke="#8A5A3B" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="52" cy="58" r="3.5" fill="#2E2A26"/>
  <circle cx="68" cy="58" r="3.5" fill="#2E2A26"/>
  <circle cx="60" cy="70" r="6" fill="#F2A6C6"/>
`, "#FFF8E0");

const grandmaIcon = svg(`
  <path d="M30 106 C30 80 42 70 60 70 C78 70 90 80 90 106 Z" fill="#C77DAB"/>
  <circle cx="60" cy="48" r="25" fill="#F0DAC6"/>
  <path d="M35 42 C30 24 90 24 85 42 C86 30 34 30 35 42 Z" fill="#E7E7EA"/>
  <circle cx="60" cy="30" r="8" fill="#E7E7EA"/>
  <circle cx="52" cy="50" r="3" fill="#2E2A26"/>
  <circle cx="68" cy="50" r="3" fill="#2E2A26"/>
  <path d="M44 50 Q52 46 60 50 M60 50 Q68 46 76 50" stroke="#8C8C93" stroke-width="2" fill="none"/>
  <path d="M52 62 Q60 67 68 62" stroke="#B5555A" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#F6EAF1");

// --- Iconos: CASA ------------------------------------------------------
const houseIcon = svg(`
  <path d="M24 62 L60 30 L96 62" fill="none" stroke="#E8607A" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="34" y="58" width="52" height="42" rx="4" fill="#FFD9A6"/>
  <rect x="52" y="76" width="16" height="24" rx="2" fill="#B07C4F"/>
  <rect x="72" y="66" width="12" height="12" rx="2" fill="#5DB9F2"/>
`, "#FFF3E9");

const bedIcon = svg(`
  <rect x="26" y="72" width="68" height="24" rx="6" fill="#5D9CEC"/>
  <rect x="26" y="58" width="20" height="20" rx="6" fill="#FFFFFF"/>
  <rect x="30" y="90" width="60" height="14" rx="4" fill="#4A80C4"/>
  <line x1="26" y1="96" x2="26" y2="106" stroke="#33507A" stroke-width="5" stroke-linecap="round"/>
  <line x1="94" y1="96" x2="94" y2="106" stroke="#33507A" stroke-width="5" stroke-linecap="round"/>
`, "#EAF2FE");

const chairIcon = svg(`
  <rect x="38" y="30" width="44" height="10" rx="4" fill="#E8991F"/>
  <rect x="38" y="40" width="10" height="34" fill="#F2B24A"/>
  <rect x="34" y="70" width="52" height="10" rx="4" fill="#E8991F"/>
  <line x1="40" y1="80" x2="40" y2="104" stroke="#B5651D" stroke-width="6" stroke-linecap="round"/>
  <line x1="80" y1="80" x2="80" y2="104" stroke="#B5651D" stroke-width="6" stroke-linecap="round"/>
`, "#FDF1DD");

const tableIcon = svg(`
  <rect x="26" y="46" width="68" height="12" rx="4" fill="#D9A066"/>
  <line x1="34" y1="58" x2="34" y2="98" stroke="#B07C4F" stroke-width="7" stroke-linecap="round"/>
  <line x1="86" y1="58" x2="86" y2="98" stroke="#B07C4F" stroke-width="7" stroke-linecap="round"/>
`, "#F2E7D8");

const doorIcon = svg(`
  <rect x="38" y="22" width="44" height="84" rx="10" fill="#B07C4F"/>
  <rect x="46" y="30" width="28" height="68" rx="6" fill="#D9A066"/>
  <circle cx="68" cy="64" r="4" fill="#FFD93D"/>
`, "#F2E7D8");

const windowIcon = svg(`
  <rect x="30" y="30" width="60" height="60" rx="8" fill="#BFE3F7" stroke="#5DB9F2" stroke-width="4"/>
  <line x1="60" y1="30" x2="60" y2="90" stroke="#5DB9F2" stroke-width="4"/>
  <line x1="30" y1="60" x2="90" y2="60" stroke="#5DB9F2" stroke-width="4"/>
  <path d="M22 30 Q30 14 40 30 M80 30 Q90 14 98 30" stroke="#F2A6C6" stroke-width="5" fill="none" stroke-linecap="round"/>
`, "#EAF6FD");

// --- Iconos: VERBOS (figura activa) ------------------------------------------------------
function personIcon(pose, color) {
  return svg(`<g stroke="${color}" stroke-width="7" stroke-linecap="round" fill="none">${pose}</g>
    <circle cx="60" cy="26" r="12" fill="${color}"/>`, "#FFFFFF");
}
const runIcon = personIcon(`
  <line x1="60" y1="38" x2="52" y2="62"/>
  <line x1="52" y1="62" x2="70" y2="78"/>
  <line x1="52" y1="62" x2="36" y2="70"/>
  <line x1="70" y1="78" x2="86" y2="70"/>
  <line x1="70" y1="78" x2="60" y2="102"/>
  <line x1="52" y1="62" x2="34" y2="50"/>
  <line x1="52" y1="62" x2="72" y2="50"/>
`, "#4D96FF");

const jumpIcon = personIcon(`
  <line x1="60" y1="38" x2="60" y2="64"/>
  <line x1="60" y1="46" x2="40" y2="30"/>
  <line x1="60" y1="46" x2="80" y2="30"/>
  <line x1="60" y1="64" x2="44" y2="90"/>
  <line x1="60" y1="64" x2="76" y2="90"/>
`, "#FF9F45");

const eatIcon = personIcon(`
  <line x1="60" y1="38" x2="60" y2="70"/>
  <line x1="60" y1="50" x2="42" y2="38"/>
  <line x1="60" y1="50" x2="76" y2="46"/>
  <line x1="60" y1="70" x2="46" y2="100"/>
  <line x1="60" y1="70" x2="74" y2="100"/>
  <ellipse cx="86" cy="80" rx="14" ry="6" stroke="#B07C4F"/>
`, "#6BCB77");

const sleepIcon = svg(`
  <ellipse cx="52" cy="80" rx="34" ry="14" fill="#A78BFA"/>
  <circle cx="30" cy="72" r="14" fill="#FBDCC2"/>
  <rect x="26" y="88" width="52" height="10" rx="5" fill="#C9B8F5"/>
  <text x="76" y="46" font-family="Fredoka, sans-serif" font-size="22" fill="#A78BFA">Z</text>
  <text x="88" y="32" font-family="Fredoka, sans-serif" font-size="16" fill="#A78BFA">z</text>
`, "#F3EEFD");

const readIcon = svg(`
  <circle cx="60" cy="30" r="12" fill="#FF6B6B"/>
  <path d="M60 42 L60 78" stroke="#FF6B6B" stroke-width="7" stroke-linecap="round"/>
  <path d="M60 56 L38 50 M60 56 L82 50" stroke="#FF6B6B" stroke-width="7" stroke-linecap="round"/>
  <path d="M60 78 L46 100 M60 78 L74 100" stroke="#FF6B6B" stroke-width="7" stroke-linecap="round"/>
  <path d="M34 62 L60 56 L86 62 L86 78 L60 72 L34 78 Z" fill="#FFFFFF" stroke="#E8607A" stroke-width="3"/>
`, "#FFEDED");

const playIcon = personIcon(`
  <line x1="60" y1="38" x2="60" y2="66"/>
  <line x1="60" y1="48" x2="40" y2="60"/>
  <line x1="60" y1="48" x2="82" y2="36"/>
  <line x1="60" y1="66" x2="46" y2="96"/>
  <line x1="60" y1="66" x2="76" y2="96"/>
`, "#F2A6C6") .replace('</svg>', '<circle cx="90" cy="30" r="10" fill="#FFD93D"/></svg>');

// --- Iconos: CLIMA ------------------------------------------------------
const sunIcon = svg(`
  <g stroke="#FFB84D" stroke-width="6" stroke-linecap="round">
    <line x1="60" y1="14" x2="60" y2="26"/>
    <line x1="60" y1="94" x2="60" y2="106"/>
    <line x1="14" y1="60" x2="26" y2="60"/>
    <line x1="94" y1="60" x2="106" y2="60"/>
    <line x1="27" y1="27" x2="35" y2="35"/>
    <line x1="85" y1="85" x2="93" y2="93"/>
    <line x1="93" y1="27" x2="85" y2="35"/>
    <line x1="35" y1="85" x2="27" y2="93"/>
  </g>
  <circle cx="60" cy="60" r="26" fill="#FFD93D"/>
  <circle cx="52" cy="56" r="3" fill="#B5651D"/>
  <circle cx="68" cy="56" r="3" fill="#B5651D"/>
  <path d="M50 68 Q60 76 70 68" stroke="#B5651D" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#FFF8DE");

const cloudIcon = svg(`
  <path d="M36 78 Q20 78 20 62 Q20 48 36 48 Q40 32 60 32 Q80 32 82 48 Q98 46 98 64 Q98 78 82 78 Z" fill="#CFE0EA"/>
  <circle cx="46" cy="64" r="3" fill="#5A6B78"/>
  <circle cx="66" cy="64" r="3" fill="#5A6B78"/>
  <path d="M46 72 Q56 78 66 72" stroke="#5A6B78" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#EEF4F8");

const rainIcon = svg(`
  <path d="M32 62 Q18 62 18 48 Q18 36 32 36 Q36 22 56 22 Q76 22 78 36 Q92 34 92 50 Q92 62 78 62 Z" fill="#9FB6C6"/>
  <g stroke="#4D96FF" stroke-width="5" stroke-linecap="round">
    <line x1="38" y1="76" x2="32" y2="92"/>
    <line x1="58" y1="76" x2="52" y2="92"/>
    <line x1="78" y1="76" x2="72" y2="92"/>
  </g>
`, "#E7EFF5");

const snowIcon = svg(`
  <path d="M32 60 Q18 60 18 46 Q18 34 32 34 Q36 20 56 20 Q76 20 78 34 Q92 32 92 48 Q92 60 78 60 Z" fill="#D7E4EC"/>
  <g stroke="#8FB8D6" stroke-width="4" stroke-linecap="round">
    <line x1="40" y1="76" x2="40" y2="94"/>
    <line x1="32" y1="85" x2="48" y2="85"/>
    <line x1="34" y1="79" x2="46" y2="91"/>
    <line x1="46" y1="79" x2="34" y2="91"/>
    <line x1="78" y1="76" x2="78" y2="94"/>
    <line x1="70" y1="85" x2="86" y2="85"/>
  </g>
`, "#EEF5FA");

const windIcon = svg(`
  <g stroke="#5DB9F2" stroke-width="6" fill="none" stroke-linecap="round">
    <path d="M20 46 H70 a10 10 0 1 0 -9 -15"/>
    <path d="M20 64 H86 a10 10 0 1 1 -9 15"/>
    <path d="M30 82 H60"/>
  </g>
`, "#EAF6FD");

const stormIcon = svg(`
  <path d="M32 56 Q18 56 18 42 Q18 30 32 30 Q36 16 56 16 Q76 16 78 30 Q92 28 92 44 Q92 56 78 56 Z" fill="#7C8B99"/>
  <path d="M64 60 L48 86 L60 86 L52 108 L78 78 L64 78 Z" fill="#FFD93D"/>
`, "#E5EAEE");

// --- Iconos: EMOCIONES ------------------------------------------------------
function faceIcon(inner, bg) {
  return svg(`<circle cx="60" cy="60" r="38" fill="${bg}"/>${inner}`, "#FFFFFF");
}
const happyIcon = faceIcon(`
  <circle cx="46" cy="52" r="5" fill="#2E2A26"/>
  <circle cx="74" cy="52" r="5" fill="#2E2A26"/>
  <path d="M40 68 Q60 90 80 68" stroke="#2E2A26" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="34" cy="64" r="6" fill="#FF9FA8" opacity="0.7"/>
  <circle cx="86" cy="64" r="6" fill="#FF9FA8" opacity="0.7"/>
`, "#FFE873");

const sadIcon = faceIcon(`
  <circle cx="46" cy="54" r="5" fill="#2E2A26"/>
  <circle cx="74" cy="54" r="5" fill="#2E2A26"/>
  <path d="M40 82 Q60 66 80 82" stroke="#2E2A26" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M46 60 Q44 74 40 78" stroke="#4D96FF" stroke-width="4" fill="none" stroke-linecap="round"/>
`, "#AFCBEE");

const angryIcon = faceIcon(`
  <line x1="38" y1="44" x2="52" y2="52" stroke="#2E2A26" stroke-width="5" stroke-linecap="round"/>
  <line x1="82" y1="44" x2="68" y2="52" stroke="#2E2A26" stroke-width="5" stroke-linecap="round"/>
  <circle cx="47" cy="58" r="5" fill="#2E2A26"/>
  <circle cx="73" cy="58" r="5" fill="#2E2A26"/>
  <path d="M42 82 Q60 70 78 82" stroke="#2E2A26" stroke-width="5" fill="none" stroke-linecap="round"/>
`, "#F5A6A6");

const scaredIcon = faceIcon(`
  <circle cx="46" cy="54" r="7" fill="#FFFFFF" stroke="#2E2A26" stroke-width="2"/>
  <circle cx="74" cy="54" r="7" fill="#FFFFFF" stroke="#2E2A26" stroke-width="2"/>
  <circle cx="46" cy="54" r="3" fill="#2E2A26"/>
  <circle cx="74" cy="54" r="3" fill="#2E2A26"/>
  <ellipse cx="60" cy="80" rx="8" ry="10" fill="#2E2A26"/>
  <ellipse cx="90" cy="50" rx="4" ry="7" fill="#5DB9F2"/>
`, "#C9B8F5");

const surprisedIcon = faceIcon(`
  <circle cx="46" cy="50" r="6" fill="#2E2A26"/>
  <circle cx="74" cy="50" r="6" fill="#2E2A26"/>
  <path d="M38 38 Q46 30 54 38 M66 38 Q74 30 82 38" stroke="#2E2A26" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="80" rx="10" ry="12" fill="#2E2A26"/>
`, "#FFD1E6");

const tiredIcon = faceIcon(`
  <path d="M38 54 Q46 48 54 54" stroke="#2E2A26" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M66 54 Q74 48 82 54" stroke="#2E2A26" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="78" rx="9" ry="7" fill="#2E2A26"/>
  <text x="82" y="34" font-family="Fredoka, sans-serif" font-size="18" fill="#7A6A50">Z</text>
  <text x="94" y="24" font-family="Fredoka, sans-serif" font-size="13" fill="#7A6A50">z</text>
`, "#E4D9C4");

// --- Iconos: FORMAS ------------------------------------------------------
const circleShapeIcon = svg(`<circle cx="60" cy="60" r="30" fill="#FF6B6B"/>`, "#FFEDED");
const squareShapeIcon = svg(`<rect x="32" y="32" width="56" height="56" rx="10" fill="#4D96FF"/>`, "#EAF2FE");
const triangleShapeIcon = svg(`<path d="M60 28 L92 88 L28 88 Z" fill="#FFD93D" stroke-linejoin="round"/>`, "#FFF8DE");
const starShapeIcon = svg(`<path d="M60 24 L70 50 L98 52 L76 70 L84 96 L60 80 L36 96 L44 70 L22 52 L50 50 Z" fill="#B18CF0"/>`, "#F3ECFC");
const heartShapeIcon = svg(`<path d="M60 92 C20 66 28 34 50 34 C58 34 60 42 60 42 C60 42 62 34 70 34 C92 34 100 66 60 92 Z" fill="#F2789B"/>`, "#FEEFF3");
const rectangleShapeIcon = svg(`<rect x="24" y="40" width="72" height="40" rx="10" fill="#6BCB77"/>`, "#EAF7EC");

// --- Iconos: CUERPO ------------------------------------------------------
const headIcon = svg(`
  <circle cx="60" cy="64" r="34" fill="#F4C9A0"/>
  <path d="M28 54 C28 22 92 22 92 54 C82 42 38 42 28 54 Z" fill="#6B4A3A"/>
  <circle cx="50" cy="66" r="4" fill="#2E2A26"/>
  <circle cx="70" cy="66" r="4" fill="#2E2A26"/>
  <path d="M52 78 Q60 84 68 78" stroke="#B5555A" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#FDF1E4");
const handIcon = svg(`
  <path d="M42 90 L42 54 a7 7 0 0 1 14 0 L56 42 a7 7 0 0 1 14 0 L70 40 a7 7 0 0 1 14 0 L84 50 a7 7 0 0 1 14 0 L98 90 Z" fill="#F4C9A0" transform="translate(-6,0) scale(0.85) translate(10,10)"/>
  <path d="M36 92 C30 70 34 56 42 54 L42 90 C42 96 36 98 36 92 Z" fill="#F4C9A0"/>
  <path d="M44 54 L44 30 a6 6 0 0 1 12 0 L56 54 Z" fill="#F4C9A0"/>
  <path d="M58 54 L58 24 a6 6 0 0 1 12 0 L70 54 Z" fill="#F4C9A0"/>
  <path d="M72 54 L72 28 a6 6 0 0 1 12 0 L84 54 Z" fill="#F4C9A0"/>
  <path d="M86 56 L86 36 a6 6 0 0 1 12 0 L98 58 Z" fill="#F4C9A0"/>
  <path d="M36 92 C34 100 44 104 60 104 C80 104 90 98 90 88 L90 58 L36 58 Z" fill="#F4C9A0"/>
`, "#FDF1E4");
const footIcon = svg(`
  <path d="M40 96 C30 96 26 88 30 78 C34 68 32 54 42 44 C50 36 62 38 66 48 C70 58 68 70 74 78 C82 88 90 96 78 96 Z" fill="#F4C9A0"/>
  <circle cx="46" cy="42" r="4" fill="#F4C9A0"/>
  <circle cx="56" cy="36" r="4" fill="#F4C9A0"/>
  <circle cx="66" cy="34" r="4" fill="#F4C9A0"/>
  <circle cx="74" cy="38" r="4" fill="#F4C9A0"/>
`, "#FDF1E4");
const eyeIcon = svg(`
  <path d="M20 60 Q60 22 100 60 Q60 98 20 60 Z" fill="#FFFFFF" stroke="#E8B0A0" stroke-width="3"/>
  <circle cx="60" cy="60" r="20" fill="#6B4A3A"/>
  <circle cx="60" cy="60" r="10" fill="#2E2A26"/>
  <circle cx="54" cy="54" r="4" fill="#FFFFFF"/>
`, "#FEF3EE");
const noseIcon = svg(`
  <path d="M54 26 C46 46 38 62 40 76 C42 90 78 90 80 76 C82 62 74 46 66 26 Z" fill="#F4C9A0"/>
  <ellipse cx="52" cy="80" rx="6" ry="4" fill="#B5876A"/>
  <ellipse cx="68" cy="80" rx="6" ry="4" fill="#B5876A"/>
`, "#FDF1E4");
const mouthIcon = svg(`
  <path d="M22 58 Q60 50 98 58 Q90 90 60 92 Q30 90 22 58 Z" fill="#C6455E"/>
  <path d="M28 60 Q60 68 92 60 Q60 72 28 60 Z" fill="#FFFFFF"/>
`, "#FEEEEF");

// --- Iconos: ESCUELA ------------------------------------------------------
const bookIcon = svg(`
  <path d="M60 34 L60 92 C50 84 34 84 24 88 L24 34 C34 28 50 28 60 34 Z" fill="#4D96FF"/>
  <path d="M60 34 L60 92 C70 84 86 84 96 88 L96 34 C86 28 70 28 60 34 Z" fill="#6FA9FF"/>
  <path d="M32 44 Q46 40 56 44 M32 56 Q46 52 56 56" stroke="#FFFFFF" stroke-width="2" fill="none"/>
`, "#EAF2FE");
const pencilIcon = svg(`
  <path d="M34 96 L28 88 L74 42 L86 54 L40 100 Z" fill="#FFD93D"/>
  <path d="M74 42 L84 32 L96 44 L86 54 Z" fill="#F2789B"/>
  <path d="M28 88 L24 100 L36 96 Z" fill="#7A4B27"/>
  <path d="M22 102 L26 98 L30 102 Z" fill="#2E2A26"/>
`, "#FFF8DE");
const backpackIcon = svg(`
  <rect x="34" y="24" width="16" height="20" rx="6" fill="#B07C4F"/>
  <rect x="70" y="24" width="16" height="20" rx="6" fill="#B07C4F"/>
  <path d="M32 48 C32 34 88 34 88 48 L88 92 C88 100 80 104 60 104 C40 104 32 100 32 92 Z" fill="#FF9F45"/>
  <rect x="48" y="58" width="24" height="20" rx="6" fill="#E8842A"/>
  <path d="M50 48 L70 48 L70 40 L50 40 Z" fill="#E8842A"/>
`, "#FFEEDC");
const scissorsIcon = svg(`
  <circle cx="34" cy="86" r="10" fill="none" stroke="#4D96FF" stroke-width="5"/>
  <circle cx="34" cy="34" r="10" fill="none" stroke="#FF6B6B" stroke-width="5"/>
  <path d="M40 80 L94 40 M40 40 L94 80" stroke="#B5B5C0" stroke-width="5" stroke-linecap="round"/>
`, "#F0F0F7");
const rulerIcon = svg(`
  <rect x="20" y="46" width="80" height="26" rx="6" fill="#FFD93D" transform="rotate(-8 60 60)"/>
  <g stroke="#B08A3C" stroke-width="2" transform="rotate(-8 60 60)">
    <line x1="32" y1="46" x2="32" y2="58"/>
    <line x1="44" y1="46" x2="44" y2="58"/>
    <line x1="56" y1="46" x2="56" y2="58"/>
    <line x1="68" y1="46" x2="68" y2="58"/>
    <line x1="80" y1="46" x2="80" y2="58"/>
  </g>
`, "#FFF8DE");
const crayonIcon = svg(`
  <path d="M46 96 L46 46 Q60 24 74 46 L74 96 Z" fill="#6BCB77"/>
  <path d="M46 46 Q60 24 74 46 Z" fill="#4FA85B"/>
  <rect x="44" y="88" width="32" height="10" rx="3" fill="#F4EBD9"/>
`, "#EAF7EC");

// --- Iconos: TRANSPORTE ------------------------------------------------------
const carIcon = svg(`
  <path d="M22 78 L28 56 C32 48 40 44 50 44 L70 44 C80 44 88 48 92 56 L98 78 Z" fill="#FF6B6B"/>
  <path d="M36 56 L42 46 L78 46 L84 56 Z" fill="#BFE3F7"/>
  <circle cx="38" cy="80" r="10" fill="#2E2A26"/>
  <circle cx="82" cy="80" r="10" fill="#2E2A26"/>
  <circle cx="38" cy="80" r="4" fill="#8C8C93"/>
  <circle cx="82" cy="80" r="4" fill="#8C8C93"/>
`, "#FFEDED");
const busIcon = svg(`
  <rect x="24" y="34" width="72" height="46" rx="10" fill="#FFD93D"/>
  <rect x="32" y="42" width="16" height="16" rx="3" fill="#BFE3F7"/>
  <rect x="52" y="42" width="16" height="16" rx="3" fill="#BFE3F7"/>
  <rect x="72" y="42" width="16" height="16" rx="3" fill="#BFE3F7"/>
  <circle cx="38" cy="84" r="8" fill="#2E2A26"/>
  <circle cx="82" cy="84" r="8" fill="#2E2A26"/>
`, "#FFF8DE");
const bikeIcon = svg(`
  <circle cx="34" cy="80" r="18" fill="none" stroke="#4D96FF" stroke-width="5"/>
  <circle cx="86" cy="80" r="18" fill="none" stroke="#4D96FF" stroke-width="5"/>
  <path d="M34 80 L56 46 L74 46 M56 46 L86 80 M56 46 L44 80 L86 80" stroke="#2E2A26" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M74 46 L80 38 L88 38" stroke="#2E2A26" stroke-width="4" fill="none" stroke-linecap="round"/>
`, "#EAF2FE");
const trainIcon = svg(`
  <rect x="26" y="48" width="68" height="36" rx="8" fill="#F2789B"/>
  <rect x="34" y="56" width="18" height="16" rx="3" fill="#FFF3F6"/>
  <rect x="60" y="56" width="18" height="16" rx="3" fill="#FFF3F6"/>
  <circle cx="40" cy="90" r="7" fill="#2E2A26"/>
  <circle cx="80" cy="90" r="7" fill="#2E2A26"/>
  <circle cx="34" cy="34" r="8" fill="#D8D8E0"/>
  <path d="M34 34 Q26 20 38 16" stroke="#D8D8E0" stroke-width="4" fill="none" stroke-linecap="round"/>
`, "#FEEEF2");
const planeIcon = svg(`
  <path d="M20 66 L98 58 L98 68 L66 70 L52 92 L42 92 L50 70 L20 72 Z" fill="#4D96FF"/>
  <path d="M56 58 L64 34 L72 34 L70 58 Z" fill="#4D96FF"/>
  <circle cx="94" cy="63" r="4" fill="#FFD93D"/>
`, "#EAF2FE");
const boatIcon = svg(`
  <path d="M24 78 L96 78 L86 96 L34 96 Z" fill="#B07C4F"/>
  <rect x="56" y="26" width="4" height="52" fill="#7A4B27"/>
  <path d="M60 30 L60 66 L90 66 Z" fill="#FF6B6B"/>
  <path d="M56 30 L56 66 L34 66 Z" fill="#FFFFFF" stroke="#D8D8E0" stroke-width="2"/>
`, "#EAF6FD");

// --- Iconos: ADJETIVOS ------------------------------------------------------
const bigIcon = svg(`
  <circle cx="60" cy="60" r="38" fill="#4D96FF"/>
  <path d="M14 28 L26 28 L26 40 M106 28 L94 28 L94 40 M14 92 L26 92 L26 80 M106 92 L94 92 L94 80" stroke="#2E2A26" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
`, "#EAF2FE");
const smallIcon = svg(`
  <circle cx="60" cy="60" r="14" fill="#FF6B6B"/>
  <path d="M40 40 L48 40 L48 48 M80 40 L72 40 L72 48 M40 80 L48 80 L48 72 M80 80 L72 80 L72 72" stroke="#2E2A26" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
`, "#FFEDED");
const fastIcon = svg(`
  <path d="M66 18 L36 62 L54 62 L48 102 L88 52 L68 52 Z" fill="#FFD93D" stroke="#E8B923" stroke-width="2"/>
`, "#FFF8DE");
const slowIcon = svg(`
  <ellipse cx="56" cy="76" rx="30" ry="18" fill="#6BCB77"/>
  <circle cx="86" cy="62" r="16" fill="#6BCB77"/>
  <circle cx="90" cy="58" r="3" fill="#2E2A26"/>
  <circle cx="30" cy="88" r="7" fill="#4FA85B"/>
  <circle cx="46" cy="92" r="7" fill="#4FA85B"/>
  <circle cx="64" cy="92" r="7" fill="#4FA85B"/>
  <path d="M20 50 Q26 44 32 50 M20 40 Q28 30 36 40" stroke="#9AD9A2" stroke-width="3" fill="none" stroke-linecap="round"/>
`, "#EAF7EC");
const hotIcon = svg(`
  <path d="M60 20 C40 46 34 60 40 76 C44 88 54 94 60 94 C66 94 76 88 80 76 C86 60 80 46 60 20 Z" fill="#FF6B6B"/>
  <path d="M60 46 C50 62 48 70 52 78 C55 84 60 86 60 86 C64 86 68 82 68 76 C68 68 64 60 60 46 Z" fill="#FFD93D"/>
`, "#FFEDED");
const coldIcon = svg(`
  <g stroke="#4D96FF" stroke-width="5" stroke-linecap="round">
    <line x1="60" y1="20" x2="60" y2="100"/>
    <line x1="24" y1="60" x2="96" y2="60"/>
    <line x1="35" y1="35" x2="85" y2="85"/>
    <line x1="85" y1="35" x2="35" y2="85"/>
  </g>
  <g fill="#4D96FF">
    <circle cx="60" cy="20" r="4"/><circle cx="60" cy="100" r="4"/>
    <circle cx="24" cy="60" r="4"/><circle cx="96" cy="60" r="4"/>
  </g>
`, "#EAF6FD");

// --- Iconos: LUGARES ------------------------------------------------------
const parkIcon = svg(`
  <rect x="54" y="66" width="8" height="30" fill="#B07C4F"/>
  <circle cx="58" cy="46" r="28" fill="#6BCB77"/>
  <circle cx="34" cy="60" r="16" fill="#7FD98A"/>
  <circle cx="82" cy="58" r="16" fill="#7FD98A"/>
  <rect x="30" y="96" width="56" height="8" rx="2" fill="#B07C4F"/>
`, "#EAF7EC");
const schoolIcon = svg(`
  <path d="M20 56 L60 30 L100 56" fill="none" stroke="#F2789B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="30" y="54" width="60" height="46" rx="4" fill="#FFD9A6"/>
  <rect x="50" y="72" width="20" height="28" fill="#F2789B"/>
  <circle cx="60" cy="20" r="4" fill="#4D96FF"/>
  <line x1="60" y1="20" x2="60" y2="32" stroke="#8C8C93" stroke-width="3"/>
`, "#FFF3E9");
const beachIcon = svg(`
  <rect x="10" y="80" width="100" height="24" fill="#FFE9A6"/>
  <circle cx="30" cy="34" r="16" fill="#FFD93D"/>
  <path d="M60 80 L60 40 Q90 46 90 80 Z" fill="#F2789B"/>
  <path d="M60 80 L60 40" stroke="#B5556F" stroke-width="3"/>
  <path d="M10 90 Q30 82 50 90 T110 90" stroke="#5DB9F2" stroke-width="4" fill="none" stroke-linecap="round"/>
`, "#FFF8E5");
const zooIcon = svg(`
  <circle cx="60" cy="64" r="30" fill="#FBCB7B"/>
  <path d="M34 50 L26 30 L46 44 Z" fill="#E8991F"/>
  <path d="M86 50 L94 30 L74 44 Z" fill="#E8991F"/>
  <circle cx="50" cy="62" r="4" fill="#2E2A26"/>
  <circle cx="70" cy="62" r="4" fill="#2E2A26"/>
  <path d="M52 72 L68 72" stroke="#2E2A26" stroke-width="3" stroke-linecap="round"/>
  <g stroke="#8C8C93" stroke-width="4">
    <line x1="14" y1="30" x2="14" y2="98"/>
    <line x1="106" y1="30" x2="106" y2="98"/>
  </g>
`, "#FDF1DD");
const storeIcon = svg(`
  <path d="M22 44 L30 22 L90 22 L98 44 Z" fill="#F2789B"/>
  <rect x="26" y="44" width="68" height="52" fill="#FFE9EF"/>
  <path d="M22 44 Q26 54 36 44 Q40 54 50 44 Q54 54 64 44 Q68 54 78 44 Q82 54 92 44 Q96 54 98 44" fill="#FFFFFF" stroke="#F2789B" stroke-width="2"/>
  <rect x="50" y="66" width="20" height="30" fill="#B07C4F"/>
`, "#FEEEF2");
const hospitalIcon = svg(`
  <rect x="26" y="30" width="68" height="70" rx="6" fill="#FFFFFF" stroke="#E8E8F0" stroke-width="3"/>
  <rect x="50" y="42" width="20" height="46" fill="#FF6B6B"/>
  <rect x="38" y="54" width="44" height="22" fill="#FF6B6B"/>
  <rect x="52" y="56" width="16" height="18" fill="#FFFFFF"/>
`, "#F0F0F7");

// ============================================================
// ESTRUCTURA DE NIVELES
// ============================================================
const LEVELS = [
  {
    id: "basico",
    name: "Básico",
    color: "#4ECDC4",
    subtitle: "¡Primeras palabras!",
    lessons: [
      {
        id: "colores",
        name: "Colores",
        icon: "🎨",
        words: [
          { en: "red", es: "rojo", icon: dropIcon("#FF6B6B") },
          { en: "blue", es: "azul", icon: dropIcon("#4D96FF") },
          { en: "yellow", es: "amarillo", icon: dropIcon("#FFD93D") },
          { en: "green", es: "verde", icon: dropIcon("#6BCB77") },
          { en: "orange", es: "naranja", icon: dropIcon("#FF9F45") },
          { en: "purple", es: "morado", icon: dropIcon("#A78BFA") },
        ],
      },
      {
        id: "animales",
        name: "Animales",
        icon: "🐾",
        words: [
          { en: "cat", es: "gato", icon: catIcon },
          { en: "dog", es: "perro", icon: dogIcon },
          { en: "bird", es: "pájaro", icon: birdIcon },
          { en: "fish", es: "pez", icon: fishIcon },
          { en: "rabbit", es: "conejo", icon: rabbitIcon },
          { en: "lion", es: "león", icon: lionIcon },
        ],
      },
      {
        id: "numeros",
        name: "Números",
        icon: "🔢",
        words: [
          { en: "one", es: "uno", icon: numberIcon(1, "#4ECDC4") },
          { en: "two", es: "dos", icon: numberIcon(2, "#FF6B6B") },
          { en: "three", es: "tres", icon: numberIcon(3, "#FFD93D") },
          { en: "four", es: "cuatro", icon: numberIcon(4, "#6BCB77") },
          { en: "five", es: "cinco", icon: numberIcon(5, "#A78BFA") },
          { en: "six", es: "seis", icon: numberIcon(6, "#FF9F45") },
        ],
      },
      {
        id: "formas",
        name: "Formas",
        icon: "🔺",
        words: [
          { en: "circle", es: "círculo", icon: circleShapeIcon },
          { en: "square", es: "cuadrado", icon: squareShapeIcon },
          { en: "triangle", es: "triángulo", icon: triangleShapeIcon },
          { en: "star", es: "estrella", icon: starShapeIcon },
          { en: "heart", es: "corazón", icon: heartShapeIcon },
          { en: "rectangle", es: "rectángulo", icon: rectangleShapeIcon },
        ],
      },
      {
        id: "cuerpo",
        name: "Mi Cuerpo",
        icon: "🙂",
        words: [
          { en: "head", es: "cabeza", icon: headIcon },
          { en: "hand", es: "mano", icon: handIcon },
          { en: "foot", es: "pie", icon: footIcon },
          { en: "eye", es: "ojo", icon: eyeIcon },
          { en: "nose", es: "nariz", icon: noseIcon },
          { en: "mouth", es: "boca", icon: mouthIcon },
        ],
      },
    ],
  },
  {
    id: "medio",
    name: "Medio",
    color: "#FFB84D",
    subtitle: "¡Vamos creciendo!",
    lessons: [
      {
        id: "comida",
        name: "Comida",
        icon: "🍎",
        words: [
          { en: "apple", es: "manzana", icon: appleIcon },
          { en: "banana", es: "plátano", icon: bananaIcon },
          { en: "bread", es: "pan", icon: breadIcon },
          { en: "milk", es: "leche", icon: milkIcon },
          { en: "egg", es: "huevo", icon: eggIcon },
          { en: "cake", es: "pastel", icon: cakeIcon },
        ],
      },
      {
        id: "familia",
        name: "Familia",
        icon: "👪",
        words: [
          { en: "mom", es: "mamá", icon: momIcon },
          { en: "dad", es: "papá", icon: dadIcon },
          { en: "sister", es: "hermana", icon: sisterIcon },
          { en: "brother", es: "hermano", icon: brotherIcon },
          { en: "baby", es: "bebé", icon: babyIcon },
          { en: "grandma", es: "abuela", icon: grandmaIcon },
        ],
      },
      {
        id: "casa",
        name: "La Casa",
        icon: "🏠",
        words: [
          { en: "house", es: "casa", icon: houseIcon },
          { en: "bed", es: "cama", icon: bedIcon },
          { en: "chair", es: "silla", icon: chairIcon },
          { en: "table", es: "mesa", icon: tableIcon },
          { en: "door", es: "puerta", icon: doorIcon },
          { en: "window", es: "ventana", icon: windowIcon },
        ],
      },
      {
        id: "escuela",
        name: "La Escuela",
        icon: "🎒",
        words: [
          { en: "book", es: "libro", icon: bookIcon },
          { en: "pencil", es: "lápiz", icon: pencilIcon },
          { en: "backpack", es: "mochila", icon: backpackIcon },
          { en: "scissors", es: "tijeras", icon: scissorsIcon },
          { en: "ruler", es: "regla", icon: rulerIcon },
          { en: "crayon", es: "crayón", icon: crayonIcon },
        ],
      },
      {
        id: "transporte",
        name: "Transporte",
        icon: "🚗",
        words: [
          { en: "car", es: "carro", icon: carIcon },
          { en: "bus", es: "autobús", icon: busIcon },
          { en: "bike", es: "bicicleta", icon: bikeIcon },
          { en: "train", es: "tren", icon: trainIcon },
          { en: "plane", es: "avión", icon: planeIcon },
          { en: "boat", es: "barco", icon: boatIcon },
        ],
      },
    ],
  },
  {
    id: "intermedio",
    name: "Intermedio",
    color: "#B18CF0",
    subtitle: "¡Ya eres un experto!",
    lessons: [
      {
        id: "verbos",
        name: "Acciones",
        icon: "🏃",
        words: [
          { en: "run", es: "correr", icon: runIcon },
          { en: "jump", es: "saltar", icon: jumpIcon },
          { en: "eat", es: "comer", icon: eatIcon },
          { en: "sleep", es: "dormir", icon: sleepIcon },
          { en: "read", es: "leer", icon: readIcon },
          { en: "play", es: "jugar", icon: playIcon },
        ],
      },
      {
        id: "clima",
        name: "El Clima",
        icon: "☀️",
        words: [
          { en: "sun", es: "sol", icon: sunIcon },
          { en: "cloud", es: "nube", icon: cloudIcon },
          { en: "rain", es: "lluvia", icon: rainIcon },
          { en: "snow", es: "nieve", icon: snowIcon },
          { en: "wind", es: "viento", icon: windIcon },
          { en: "storm", es: "tormenta", icon: stormIcon },
        ],
      },
      {
        id: "emociones",
        name: "Emociones",
        icon: "😊",
        words: [
          { en: "happy", es: "feliz", icon: happyIcon },
          { en: "sad", es: "triste", icon: sadIcon },
          { en: "angry", es: "enojado", icon: angryIcon },
          { en: "scared", es: "asustado", icon: scaredIcon },
          { en: "surprised", es: "sorprendido", icon: surprisedIcon },
          { en: "tired", es: "cansado", icon: tiredIcon },
        ],
      },
      {
        id: "adjetivos",
        name: "Adjetivos",
        icon: "⚡",
        words: [
          { en: "big", es: "grande", icon: bigIcon },
          { en: "small", es: "pequeño", icon: smallIcon },
          { en: "fast", es: "rápido", icon: fastIcon },
          { en: "slow", es: "lento", icon: slowIcon },
          { en: "hot", es: "caliente", icon: hotIcon },
          { en: "cold", es: "frío", icon: coldIcon },
        ],
      },
      {
        id: "lugares",
        name: "Lugares",
        icon: "🏙️",
        words: [
          { en: "park", es: "parque", icon: parkIcon },
          { en: "school", es: "escuela", icon: schoolIcon },
          { en: "beach", es: "playa", icon: beachIcon },
          { en: "zoo", es: "zoológico", icon: zooIcon },
          { en: "store", es: "tienda", icon: storeIcon },
          { en: "hospital", es: "hospital", icon: hospitalIcon },
        ],
      },
    ],
  },
];

// ============================================================
// Datos de la app: niveles, lecciones y vocabulario con iconos
// ============================================================

// --- Helpers para armar iconos consistentes -------------------------
function svg(inner, bg) {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="58" fill="${bg}"/>
    ${inner}
  </svg>`;
}

// Icono basado en emoji nativo del sistema (misma calidad que WhatsApp/iOS/Android)
function emojiIcon(char, bg) {
  return svg(`<text x="60" y="66" font-size="66" text-anchor="middle" dominant-baseline="central">${char}</text>`, bg);
}

// --- Iconos: COLORES (gota de color) ------------------------------------------------------
function dropIcon(color) {
  return svg(`
    <path d="M60 20 C60 20 34 58 34 80 a26 26 0 0 0 52 0 C86 58 60 20 60 20 Z" fill="${color}" stroke="#00000022" stroke-width="3"/>
    <ellipse cx="50" cy="70" rx="6" ry="10" fill="#ffffff66"/>
  `, "#FFFFFF");
}

// --- Iconos: FORMAS (la forma misma) ------------------------------------------------------
const circleShapeIcon = svg(`<circle cx="60" cy="60" r="30" fill="#FF6B6B"/>`, "#FFEDED");
const squareShapeIcon = svg(`<rect x="32" y="32" width="56" height="56" rx="10" fill="#4D96FF"/>`, "#EAF2FE");
const triangleShapeIcon = svg(`<path d="M60 28 L92 88 L28 88 Z" fill="#FFD93D" stroke-linejoin="round"/>`, "#FFF8DE");
const starShapeIcon = svg(`<path d="M60 24 L70 50 L98 52 L76 70 L84 96 L60 80 L36 96 L44 70 L22 52 L50 50 Z" fill="#B18CF0"/>`, "#F3ECFC");
const heartShapeIcon = svg(`<path d="M60 92 C20 66 28 34 50 34 C58 34 60 42 60 42 C60 42 62 34 70 34 C92 34 100 66 60 92 Z" fill="#F2789B"/>`, "#FEEFF3");
const rectangleShapeIcon = svg(`<rect x="24" y="40" width="72" height="40" rx="10" fill="#6BCB77"/>`, "#EAF7EC");

// --- Iconos: NÚMEROS (dígito + puntos) ------------------------------------------------------
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

// --- Icono custom: MESA (no existe un emoji claro de mesa) ------------------------------------------------------
const tableIcon = svg(`
  <rect x="26" y="46" width="68" height="12" rx="4" fill="#D9A066"/>
  <line x1="34" y1="58" x2="34" y2="98" stroke="#B07C4F" stroke-width="7" stroke-linecap="round"/>
  <line x1="86" y1="58" x2="86" y2="98" stroke="#B07C4F" stroke-width="7" stroke-linecap="round"/>
`, "#F2E7D8");

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
          { en: "cat", es: "gato", icon: emojiIcon("🐱", "#FFF3E2") },
          { en: "dog", es: "perro", icon: emojiIcon("🐶", "#F2E7D8") },
          { en: "bird", es: "pájaro", icon: emojiIcon("🐦", "#E4F7FB") },
          { en: "fish", es: "pez", icon: emojiIcon("🐟", "#E1F1FC") },
          { en: "rabbit", es: "conejo", icon: emojiIcon("🐰", "#FCEFF5") },
          { en: "lion", es: "león", icon: emojiIcon("🦁", "#FDF1DD") },
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
          { en: "head", es: "cabeza", icon: emojiIcon("😀", "#FDF1E4") },
          { en: "hand", es: "mano", icon: emojiIcon("✋", "#FDF1E4") },
          { en: "foot", es: "pie", icon: emojiIcon("🦶", "#FDF1E4") },
          { en: "eye", es: "ojo", icon: emojiIcon("👁️", "#FEF3EE") },
          { en: "nose", es: "nariz", icon: emojiIcon("👃", "#FDF1E4") },
          { en: "mouth", es: "boca", icon: emojiIcon("👄", "#FEEEEF") },
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
          { en: "apple", es: "manzana", icon: emojiIcon("🍎", "#FDECEC") },
          { en: "banana", es: "plátano", icon: emojiIcon("🍌", "#FFF8E0") },
          { en: "bread", es: "pan", icon: emojiIcon("🍞", "#FCF0DE") },
          { en: "milk", es: "leche", icon: emojiIcon("🥛", "#EAF6FF") },
          { en: "egg", es: "huevo", icon: emojiIcon("🥚", "#FFF8EA") },
          { en: "cake", es: "pastel", icon: emojiIcon("🍰", "#FEF0F3") },
        ],
      },
      {
        id: "familia",
        name: "Familia",
        icon: "👪",
        words: [
          { en: "mom", es: "mamá", icon: emojiIcon("👩", "#FDEFF5") },
          { en: "dad", es: "papá", icon: emojiIcon("👨", "#EAF2FE") },
          { en: "sister", es: "hermana", icon: emojiIcon("👧", "#F3ECFC") },
          { en: "brother", es: "hermano", icon: emojiIcon("👦", "#EAF7EC") },
          { en: "baby", es: "bebé", icon: emojiIcon("👶", "#FFF8E0") },
          { en: "grandma", es: "abuela", icon: emojiIcon("👵", "#F6EAF1") },
        ],
      },
      {
        id: "casa",
        name: "La Casa",
        icon: "🏠",
        words: [
          { en: "house", es: "casa", icon: emojiIcon("🏠", "#FFF3E9") },
          { en: "bed", es: "cama", icon: emojiIcon("🛏️", "#EAF2FE") },
          { en: "chair", es: "silla", icon: emojiIcon("🪑", "#FDF1DD") },
          { en: "table", es: "mesa", icon: tableIcon },
          { en: "door", es: "puerta", icon: emojiIcon("🚪", "#F2E7D8") },
          { en: "window", es: "ventana", icon: emojiIcon("🪟", "#EAF6FD") },
        ],
      },
      {
        id: "escuela",
        name: "La Escuela",
        icon: "🎒",
        words: [
          { en: "book", es: "libro", icon: emojiIcon("📖", "#EAF2FE") },
          { en: "pencil", es: "lápiz", icon: emojiIcon("✏️", "#FFF8DE") },
          { en: "backpack", es: "mochila", icon: emojiIcon("🎒", "#FFEEDC") },
          { en: "scissors", es: "tijeras", icon: emojiIcon("✂️", "#F0F0F7") },
          { en: "ruler", es: "regla", icon: emojiIcon("📏", "#FFF8DE") },
          { en: "crayon", es: "crayón", icon: emojiIcon("🖍️", "#EAF7EC") },
        ],
      },
      {
        id: "transporte",
        name: "Transporte",
        icon: "🚗",
        words: [
          { en: "car", es: "carro", icon: emojiIcon("🚗", "#FFEDED") },
          { en: "bus", es: "autobús", icon: emojiIcon("🚌", "#FFF8DE") },
          { en: "bike", es: "bicicleta", icon: emojiIcon("🚲", "#EAF2FE") },
          { en: "train", es: "tren", icon: emojiIcon("🚂", "#FEEEF2") },
          { en: "plane", es: "avión", icon: emojiIcon("✈️", "#EAF2FE") },
          { en: "boat", es: "barco", icon: emojiIcon("⛵", "#EAF6FD") },
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
          { en: "run", es: "correr", icon: emojiIcon("🏃", "#EAF2FE") },
          { en: "jump", es: "saltar", icon: emojiIcon("🤸", "#FFEEDC") },
          { en: "eat", es: "comer", icon: emojiIcon("🍴", "#EAF7EC") },
          { en: "sleep", es: "dormir", icon: emojiIcon("😴", "#F3EEFD") },
          { en: "read", es: "leer", icon: emojiIcon("📖", "#FFEDED") },
          { en: "play", es: "jugar", icon: emojiIcon("🧸", "#FEEFF3") },
        ],
      },
      {
        id: "clima",
        name: "El Clima",
        icon: "☀️",
        words: [
          { en: "sun", es: "sol", icon: emojiIcon("☀️", "#FFF8DE") },
          { en: "cloud", es: "nube", icon: emojiIcon("☁️", "#EEF4F8") },
          { en: "rain", es: "lluvia", icon: emojiIcon("🌧️", "#E7EFF5") },
          { en: "snow", es: "nieve", icon: emojiIcon("❄️", "#EEF5FA") },
          { en: "wind", es: "viento", icon: emojiIcon("💨", "#EAF6FD") },
          { en: "storm", es: "tormenta", icon: emojiIcon("⛈️", "#E5EAEE") },
        ],
      },
      {
        id: "emociones",
        name: "Emociones",
        icon: "😊",
        words: [
          { en: "happy", es: "feliz", icon: emojiIcon("😄", "#FFE873") },
          { en: "sad", es: "triste", icon: emojiIcon("😢", "#AFCBEE") },
          { en: "angry", es: "enojado", icon: emojiIcon("😠", "#F5A6A6") },
          { en: "scared", es: "asustado", icon: emojiIcon("😱", "#C9B8F5") },
          { en: "surprised", es: "sorprendido", icon: emojiIcon("😲", "#FFD1E6") },
          { en: "tired", es: "cansado", icon: emojiIcon("🥱", "#E4D9C4") },
        ],
      },
      {
        id: "adjetivos",
        name: "Adjetivos",
        icon: "⚡",
        words: [
          { en: "big", es: "grande", icon: emojiIcon("🐘", "#EAF2FE") },
          { en: "small", es: "pequeño", icon: emojiIcon("🐜", "#FFEDED") },
          { en: "fast", es: "rápido", icon: emojiIcon("⚡", "#FFF8DE") },
          { en: "slow", es: "lento", icon: emojiIcon("🐢", "#EAF7EC") },
          { en: "hot", es: "caliente", icon: emojiIcon("🔥", "#FFEDED") },
          { en: "cold", es: "frío", icon: emojiIcon("🧊", "#EAF6FD") },
        ],
      },
      {
        id: "lugares",
        name: "Lugares",
        icon: "🏙️",
        words: [
          { en: "park", es: "parque", icon: emojiIcon("🏞️", "#EAF7EC") },
          { en: "school", es: "escuela", icon: emojiIcon("🏫", "#FFF3E9") },
          { en: "beach", es: "playa", icon: emojiIcon("🏖️", "#FFF8E5") },
          { en: "zoo", es: "zoológico", icon: emojiIcon("🦓", "#FDF1DD") },
          { en: "store", es: "tienda", icon: emojiIcon("🏬", "#FEEEF2") },
          { en: "hospital", es: "hospital", icon: emojiIcon("🏥", "#F0F0F7") },
        ],
      },
    ],
  },
];

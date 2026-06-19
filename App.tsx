import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SlidersHorizontal,
  BookOpen,
  ShoppingBag,
  Search,
  ExternalLink,
  ChevronRight,
  X,
} from "lucide-react";

// ─────────────────────────────────────────────
// DATA TYPES
// ─────────────────────────────────────────────
interface GarmentItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  ebayQuery: string;
}

interface StyleSection {
  label: string;
  emoji: string;
  items: GarmentItem[];
}

interface StyleProfile {
  id: string;
  title: string;
  subtitle: string;
  characterImage: string;
  characterBg: string;
  accentColor: string;
  tags: string[];
  sections: StyleSection[];
}

// ─────────────────────────────────────────────
// CONFIG & PALETTE
// ─────────────────────────────────────────────
const C = {
  bg: "#0A0A0A",
  surface: "#121212",
  cardBorder: "rgba(255, 255, 255, 0.08)",
  textMuted: "rgba(255, 255, 255, 0.4)",
  accentGold: "#C8A84B"
};

// ─────────────────────────────────────────────
// DATABASE (MOCK DATA)
// ─────────────────────────────────────────────
const STYLE_DATABASE: StyleProfile[] = [
  {
    id: "casual",
    title: "Urbano Casual",
    subtitle: "El equilibrio perfecto entre comodidad y estilo cotidiano",
    characterImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80",
    characterBg: "linear-gradient(to bottom, #27272a, #18181b)",
    accentColor: "#C8A84B",
    tags: ["casual", "urbano", "everyday", "streetwear", "basico"],
    sections: [
      {
        label: "Capa Exterior", emoji: "🧥",
        items: [
          { id: "c1", name: "Bomber Jacket Oversize", brand: "Zara Man", price: "49,99 €", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80", ebayQuery: "bomber+jacket+oversize+hombre" },
          { id: "c2", name: "Trench Coat Ligero", brand: "Mango Man", price: "69,95 €", image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=300&q=80", ebayQuery: "trench+coat+hombre+beige" }
        ]
      },
      {
        label: "Parte Superior", emoji: "👕",
        items: [
          { id: "s1", name: "Camiseta Esencial Blanca", brand: "COS", price: "25,00 €", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80", ebayQuery: "camiseta+blanca+hombre+basica" },
          { id: "s2", name: "Sudadera French Terry", brand: "Uniqlo", price: "29,90 €", image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=80", ebayQuery: "sudadera+french+terry+hombre" }
        ]
      },
      {
        label: "Parte Inferior", emoji: "👖",
        items: [
          { id: "p1", name: "Chino Slim Fit Gris", brand: "Selected Homme", price: "45,00 €", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80", ebayQuery: "chino+slim+gris+hombre" },
          { id: "p2", name: "Vaquero Straight Raw", brand: "Nudie Jeans", price: "89,00 €", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80", ebayQuery: "vaquero+straight+denim+hombre" }
        ]
      },
      {
        label: "Calzado & Accesorios", emoji: "👟",
        items: [
          { id: "a1", name: "Sneaker Low White", brand: "Common Projects", price: "299,00 €", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", ebayQuery: "sneakers+blancos+minimalistas+hombre" },
          { id: "a2", name: "Reloj Minimalista", brand: "Komono", price: "75,00 €", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", ebayQuery: "reloj+minimalista+hombre" }
        ]
      }
    ]
  },
  {
    id: "heavymetal",
    title: "Heavy Metal",
    subtitle: "La oscuridad hecha estilo. Cuero, tachuelas y actitud",
    characterImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",
    characterBg: "linear-gradient(to bottom, #18181b, #450a0a)",
    accentColor: "#B91C1C",
    tags: ["heavy metal", "rock", "metal", "punk", "dark", "negro"],
    sections: [
      {
        label: "Capa Exterior", emoji: "🧥",
        items: [
          { id: "hc1", name: "Chaqueta Cuero Biker", brand: "All Saints", price: "350,00 €", image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=300&q=80", ebayQuery: "chaqueta+cuero+biker+hombre+negra" },
          { id: "hc2", name: "Denim Jacket Customizada", brand: "Levi's Vintage", price: "120,00 €", image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=300&q=80", ebayQuery: "chaqueta+denim+customizada+parches+rock" }
        ]
      },
      {
        label: "Parte Superior", emoji: "🎸",
        items: [
          { id: "hs1", name: "Camiseta Banda Vintage", brand: "Merch Oficial", price: "35,00 €", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&q=80", ebayQuery: "camiseta+banda+rock+metal+vintage" },
          { id: "hs2", name: "Camisa Flannel Grunge", brand: "Pendleton", price: "80,00 €", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4c5a?w=300&q=80", ebayQuery: "camisa+flannel+cuadros+grunge+hombre" }
        ]
      },
      {
        label: "Parte Inferior", emoji: "🖤",
        items: [
          { id: "hp1", name: "Pantalón Cargo Táctico", brand: "Dickies", price: "65,00 €", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&q=80", ebayQuery: "pantalon+cargo+negro+tactico+hombre" },
          { id: "hp2", name: "Jeans Rotos Slim", brand: "G-Star Raw", price: "110,00 €", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80", ebayQuery: "jeans+rotos+slim+negro+hombre" }
        ]
      },
      {
        label: "Calzado & Accesorios", emoji: "🥾",
        items: [
          { id: "ha1", name: "Botas Doc Martens 1460", brand: "Dr. Martens", price: "179,00 €", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&q=80", ebayQuery: "doc+martens+1460+botas+negras" },
          { id: "ha2", name: "Collar Tachuelado Cuero", brand: "Punk Rave", price: "28,00 €", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80", ebayQuery: "collar+tachuelas+cuero+punk+metal" }
        ]
      }
    ]
  },
  {
    id: "tadeojones",
    title: "Tadeo Jones",
    subtitle: "Aventurero urbano. La exploración como forma de vestir",
    characterImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    characterBg: "linear-gradient(to bottom, #451a03, #1c1917)",
    accentColor: "#D97706",
    tags: ["tadeo jones", "tadeo", "aventurero", "explorador", "indiana jones", "indiana", "khaki", "safari"],
    sections: [
      {
        label: "Capa Exterior", emoji: "🧥",
        items: [
          { id: "tc1", name: "Chaqueta Field Waxed", brand: "Barbour", price: "289,00 €", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80", ebayQuery: "chaqueta+field+waxed+canvas+aventurero" },
          { id: "tc2", name: "Impermeable Técnico Caqui", brand: "Fjällräven", price: "249,00 €", image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=300&q=80", ebayQuery: "impermeable+tecnico+khaki+senderismo" }
        ]
      },
      {
        label: "Parte Superior", emoji: "👕",
        items: [
          { id: "ts1", name: "Camisa Lino Manga Larga", brand: "Hartford", price: "115,00 €", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80", ebayQuery: "camisa+lino+manga+larga+beis+hombre" },
          { id: "ts2", name: "Henley Waffle Knit", brand: "Todd Snyder", price: "85,00 €", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80", ebayQuery: "henley+waffle+knit+hombre+beis" }
        ]
      },
      {
        label: "Parte Inferior", emoji: "👖",
        items: [
          { id: "tp1", name: "Cargo Ripstop Caqui", brand: "Arc'teryx", price: "165,00 €", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=300&q=80", ebayQuery: "pantalon+cargo+ripstop+caqui+aventura" },
          { id: "tp2", name: "Chino Utility 5 Pocket", brand: "Carhartt WIP", price: "79,90 €", image: "https://images.unsplash.com/photo-1509551388413-e18d0ac8f97b?w=300&q=80", ebayQuery: "chino+utility+hombre+tierra+marrón" }
        ]
      },
      {
        label: "Calzado & Accesorios", emoji: "🤠",
        items: [
          { id: "ta1", name: "Botas Desert Chelsea", brand: "Clarks Originals", price: "139,00 €", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&q=80", ebayQuery: "botas+desert+chelsea+hombre+cuero+suede" },
          { id: "ta2", name: "Sombrero Fedora Indiana", brand: "Stetson", price: "85,00 €", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&q=80", ebayQuery: "sombrero+fedora+indiana+jones+cuero" }
        ]
      }
    ]
  },
  {
    id: "jamesbond",
    title: "James Bond",
    subtitle: "Sofisticación sin esfuerzo. El poder del traje perfecto",
    characterImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    characterBg: "linear-gradient(to bottom, #020617, #09090b)",
    accentColor: "#C8A84B",
    tags: ["james bond", "bond", "007", "espía", "elegante", "formal", "traje", "gala"],
    sections: [
      {
        label: "Capa Exterior", emoji: "🥂",
        items: [
          { id: "jc1", name: "Blazer Tom Ford Slim", brand: "Tom Ford", price: "2.890,00 €", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&q=80", ebayQuery: "blazer+slim+fit+hombre+negro+lana" },
          { id: "jc2", name: "Esmoquin Midnight Blue", brand: "Brioni", price: "4.500,00 €", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80", ebayQuery: "esmokin+midnight+blue+slim+hombre" }
        ]
      },
      {
        label: "Parte Superior", emoji: "👔",
        items: [
          { id: "js1", name: "Camisa Oxford Blanca", brand: "Turnbull & Asser", price: "195,00 €", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80", ebayQuery: "camisa+oxford+blanca+hombre+cuello+italiano" },
          { id: "js2", name: "Corbata Seda Grenadine", brand: "Drake's London", price: "145,00 €", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80", ebayQuery: "corbata+seda+grenadine+azul+marino" }
        ]
      },
      {
        label: "Parte Inferior", emoji: "👔",
        items: [
          { id: "jp1", name: "Pantalón Traje Lana", brand: "Canali", price: "320,00 €", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4c5a?w=300&q=80", ebayQuery: "pantalon+traje+lana+slim+hombre+gris" },
          { id: "jp2", name: "Pantalón Tuxedo Satén", brand: "Dolce & Gabbana", price: "580,00 €", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80", ebayQuery: "pantalon+tuxedo+saten+negro+hombre" }
        ]
      },
      {
        label: "Calzado & Accesorios", emoji: "⌚",
        items: [
          { id: "ja1", name: "Oxford Cap Toe Negro", brand: "Edward Green", price: "870,00 €", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&q=80", ebayQuery: "oxford+cap+toe+negro+cuero+hombre" },
          { id: "ja2", name: "Omega Seamaster 300M", brand: "Omega", price: "5.400,00 €", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=300&q=80", ebayQuery: "omega+seamaster+300m+azul+hombre" }
        ]
      }
    ]
  }
];

const DEFAULT_STYLE = STYLE_DATABASE[0];

function findStyle(query: string): StyleProfile {
  const q = query.toLowerCase().trim();
  if (!q) return DEFAULT_STYLE;
  for (const style of STYLE_DATABASE) {
    for (const tag of style.tags) {
      if (q.includes(tag) || tag.includes(q)) return style;
    }
  }
  return DEFAULT_STYLE;
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS (WITH INLINE STYLES)
// ─────────────────────────────────────────────

function GarmentCard({ item }: { item: GarmentItem }) {
  const [hov, setHov] = useState(false);
  const ebayUrl = `https://www.ebay.es/sch/i.html?_nkw=${item.ebayQuery}`;

  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: "192px",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${hov ? "rgba(200,168,75,0.4)" : C.cardBorder}`,
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(4px)",
        transition: "border-color 0.3s ease",
      }}
    >
      <div style={{ height: "160px", overflow: "hidden", position: "relative" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
      </div>
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <p style={{ fontSize: "13px", fontWeight: 500, color: "#fff", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {item.name}
        </p>
        <p style={{ fontSize: "11px", color: C.textMuted, margin: 0 }}>{item.brand}</p>
        <p style={{ fontSize: "14px", fontWeight: 600, color: C.accentGold, margin: 0 }}>{item.price}</p>
        
        <a
          href={ebayUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            width: "100%",
            padding: "6px 0",
            borderRadius: "8px",
            background: hov ? "rgba(200,168,75,0.2)" : "rgba(200,168,75,0.1)",
            border: `1px solid ${hov ? "rgba(200,168,75,0.6)" : "rgba(200,168,75,0.3)"}`,
            textDecoration: "none",
            transition: "all 0.2s"
          }}
        >
          <span style={{ color: C.accentGold, fontSize: "11px", fontWeight: 500 }}>Ver en eBay</span>
          <ExternalLink size={10} color={C.accentGold} />
        </a>
      </div>
    </motion.div>
  );
}

function StyleSectionComponent({ section }: { section: StyleSection }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 4px" }}>
        <span style={{ fontSize: "16px" }}>{section.emoji}</span>
        <h3 style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0, fontWeight: 500 }}>
          {section.label}
        </h3>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
        <ChevronRight size={14} color="rgba(255,255,255,0.2)" />
      </div>
      <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {section.items.map((item) => (
          <GarmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APPLICATION
// ─────────────────────────────────────────────
export default function App() {
  const [activeStyle, setActiveStyle] = useState<StyleProfile>(DEFAULT_STYLE);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isWardrobe, setIsWardrobe] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = findStyle(searchQuery);
    setActiveStyle(found);
    setHasSearched(true);
    setImgKey((k) => k + 1);
  };

  const handleQuickStyle = (style: StyleProfile) => {
    setActiveStyle(style);
    setSearchQuery(style.title);
    setHasSearched(true);
    setImgKey((k) => k + 1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setHasSearched(false);
    setActiveStyle(DEFAULT_STYLE);
    setImgKey((k) => k + 1);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: "#fff", position: "relative", overflowX: "hidden", fontFamily: "'Inter', sans-serif" }}>
      
      {/* ── CINEMATIC BG GRID ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, 1fr)", height: "100%", width: "100%", opacity: 0.06, filter: "grayscale(1)" }}>
          {[
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400",
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
            "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
            "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400",
            "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400",
            "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400"
          ].map((src, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0.6), rgba(10,10,10,0.95))` }} />
      </div>

      {/* ── FIXED NAV HEADER ── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "64px", borderBottom: `1px solid ${C.cardBorder}`, backgroundColor: "rgba(10,10,10,0.8)", backdropFilter: "blur(20px)" }}>
        <button onClick={clearSearch} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "2px" }}>
          <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "'Syne', sans-serif", color: "#fff" }}>StyleAI</span>
          <span style={{ fontSize: "20px", fontWeight: 700, color: C.accentGold }}>.</span>
        </button>

        <nav style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "12px", background: "none", border: "1px solid transparent", color: "rgba(255,255,255,0.5)", fontSize: "12px", cursor: "pointer" }}>
            <SlidersHorizontal size={13} />
            <span>Filtros</span>
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "12px", background: "none", border: "1px solid transparent", color: "rgba(255,255,255,0.5)", fontSize: "12px", cursor: "pointer" }}>
            <BookOpen size={13} />
            <span>Editorial</span>
          </button>
          <button
            onClick={() => setIsWardrobe(!isWardrobe)}
            style={{
              display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "12px", fontSize: "12px", cursor: "pointer",
              background: isWardrobe ? "rgba(200,168,75,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${isWardrobe ? "rgba(200,168,75,0.4)" : "rgba(255,255,255,0.1)"}`,
              color: isWardrobe ? C.accentGold : "rgba(255,255,255,0.7)"
            }}
          >
            <ShoppingBag size={13} />
            <span>Mi Armario</span>
          </button>
        </nav>
      </header>

      {/* ── MAIN CONTAINER ── */}
      <main style={{ position: "relative", zIndex: 10, paddingTop: "96px", paddingBottom: "80px", paddingLeft: "16px", paddingRight: "16px", maxWidth: "896px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
        
        {/* ACTIVE REFERENT HEADER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle.id + "-title"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.3em", margin: 0, fontWeight: 500 }}>
              Referente activo
            </p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff", margin: 0, tracking: "-0.02em", lineHeight: 1 }}>
              {activeStyle.title}<span style={{ color: C.accentGold }}>.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", maxWidth: "384px", margin: "0 auto", lineHeight: 1.5 }}>
              {activeStyle.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* INTERACTIVE CHARACTER DISPLAY */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={imgKey}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "relative", width: "208px", borderRadius: "24px", overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)", background: activeStyle.characterBg,
                boxShadow: `0 25px 60px -10px ${activeStyle.accentColor}25`
              }}
            >
              <div style={{ height: "288px", overflow: "hidden", position: "relative" }}>
                <img src={activeStyle.characterImage} alt={activeStyle.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
              </div>

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", margin: 0 }}>{activeStyle.title}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: "2px 0 0" }}>{activeStyle.sections.length * 2} prendas</p>
                  </div>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: activeStyle.accentColor }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* QUICK STYLE TOGGLES */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
          {STYLE_DATABASE.map((style) => (
            <button
              key={style.id}
              onClick={() => handleQuickStyle(style)}
              style={{
                padding: "6px 16px", borderRadius: "9999px", fontSize: "12px", cursor: "pointer", transition: "all 0.2s",
                background: activeStyle.id === style.id ? "rgba(200,168,75,0.15)" : "transparent",
                border: `1px solid ${activeStyle.id === style.id ? "rgba(200,168,75,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: activeStyle.id === style.id ? C.accentGold : "rgba(255,255,255,0.4)"
              }}
            >
              {style.title}
            </button>
          ))}
        </div>

        {/* INPUT SEARCH BAR */}
        <form onSubmit={handleSearch} style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "12px 16px" }}>
            <Search size={16} color="rgba(255,255,255,0.3)" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busca un personaje, estilo o contexto (ej: Indiana Jones, Boda, Heavy Metal)..."
              style={{ flex: 1, background: "transparent", border: "none", color: "#fff", outline: "none", fontSize: "14px" }}
            />
            {searchQuery && (
              <button type="button" onClick={clearSearch} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>
                <X size={14} />
              </button>
            )}
            <button type="submit" style={{ padding: "6px 16px", borderRadius: "12px", backgroundColor: "rgba(200,168,75,0.2)", border: "1px solid rgba(200,168,75,0.4)", color: C.accentGold, fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>
              Vísteme
            </button>
          </div>
        </form>

        {/* OUTFIT SECTIONS CONTAINER */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {activeStyle.sections.map((section) => (
            <StyleSectionComponent key={`${activeStyle.id}-${section.label}`} section={section} />
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ paddingTop: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px", margin: 0 }}>StyleAI. — Moda Inteligente</p>
          <span style={{ color: "rgba(255,255,255,0.1)" }}>•</span>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px", margin: 0 }}>Powered by Costume IA</p>
        </div>
      </main>

      {/* ── MY WARDROBE DRAWER (SIDE PANEL) ── */}
      <AnimatePresence>
        {isWardrobe && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsWardrobe(false)} style={{ position: "fixed", inset: 0, zIndex: 40, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 50, width: "320px", backgroundColor: "#0F0F0F", borderLeft: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "18px", margin: 0 }}>Mi Armario</h2>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: "2px 0 0" }}>Tu colección guardada</p>
                </div>
                <button onClick={() => setIsWardrobe(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}><X size={18} /></button>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center", gap: "16px" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShoppingBag size={24} color="rgba(255,255,255,0.2)" />
                </div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", lineHeight: 1.5, margin: 0 }}>Guarda prendas de tus estilos favoritos para construir tu armario ideal.</p>
                <p style={{ color: "rgba(200,168,75,0.6)", fontSize: "12px", margin: 0, fontWeight: 500 }}>Próximamente</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

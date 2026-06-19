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
// TYPES
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
// MOCK DATA
// ─────────────────────────────────────────────
const STYLE_DATABASE: StyleProfile[] = [
  {
    id: "casual",
    title: "Urbano Casual",
    subtitle: "El equilibrio perfecto entre comodidad y estilo cotidiano",
    characterImage:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80",
    characterBg: "from-zinc-900 to-zinc-800",
    accentColor: "#C8A84B",
    tags: ["casual", "urbano", "everyday", "streetwear", "basico"],
    sections: [
      {
        label: "Capa Exterior",
        emoji: "🧥",
        items: [
          {
            id: "c1",
            name: "Bomber Jacket Oversize",
            brand: "Zara Man",
            price: "49,99 €",
            image:
              "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80",
            ebayQuery: "bomber+jacket+oversize+hombre",
          },
          {
            id: "c2",
            name: "Trench Coat Ligero",
            brand: "Mango Man",
            price: "69,95 €",
            image:
              "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=300&q=80",
            ebayQuery: "trench+coat+hombre+beige",
          },
        ],
      },
      {
        label: "Parte Superior",
        emoji: "👕",
        items: [
          {
            id: "s1",
            name: "Camiseta Esencial Blanca",
            brand: "COS",
            price: "25,00 €",
            image:
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
            ebayQuery: "camiseta+blanca+hombre+basica",
          },
          {
            id: "s2",
            name: "Sudadera French Terry",
            brand: "Uniqlo",
            price: "29,90 €",
            image:
              "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=80",
            ebayQuery: "sudadera+french+terry+hombre",
          },
        ],
      },
      {
        label: "Parte Inferior",
        emoji: "👖",
        items: [
          {
            id: "p1",
            name: "Chino Slim Fit Gris",
            brand: "Selected Homme",
            price: "45,00 €",
            image:
              "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80",
            ebayQuery: "chino+slim+gris+hombre",
          },
          {
            id: "p2",
            name: "Vaquero Straight Raw",
            brand: "Nudie Jeans",
            price: "89,00 €",
            image:
              "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
            ebayQuery: "vaquero+straight+denim+hombre",
          },
        ],
      },
      {
        label: "Calzado & Accesorios",
        emoji: "👟",
        items: [
          {
            id: "a1",
            name: "Sneaker Low White",
            brand: "Common Projects",
            price: "299,00 €",
            image:
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
            ebayQuery: "sneakers+blancos+minimalistas+hombre",
          },
          {
            id: "a2",
            name: "Reloj Minimalista",
            brand: "Komono",
            price: "75,00 €",
            image:
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
            ebayQuery: "reloj+minimalista+hombre",
          },
        ],
      },
    ],
  },
  {
    id: "heavymetal",
    title: "Heavy Metal",
    subtitle: "La oscuridad hecha estilo. Cuero, tachuelas y actitud",
    characterImage:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",
    characterBg: "from-zinc-950 to-red-950",
    accentColor: "#B91C1C",
    tags: ["heavy metal", "rock", "metal", "punk", "dark", "negro"],
    sections: [
      {
        label: "Capa Exterior",
        emoji: "🧥",
        items: [
          {
            id: "hc1",
            name: "Chaqueta Cuero Biker",
            brand: "All Saints",
            price: "350,00 €",
            image:
              "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=300&q=80",
            ebayQuery: "chaqueta+cuero+biker+hombre+negra",
          },
          {
            id: "hc2",
            name: "Denim Jacket Customizada",
            brand: "Levi's Vintage",
            price: "120,00 €",
            image:
              "https://images.unsplash.com/photo-1544441893-675973e31985?w=300&q=80",
            ebayQuery: "chaqueta+denim+customizada+parches+rock",
          },
        ],
      },
      {
        label: "Parte Superior",
        emoji: "🎸",
        items: [
          {
            id: "hs1",
            name: "Camiseta Banda Vintage",
            brand: "Merch Oficial",
            price: "35,00 €",
            image:
              "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&q=80",
            ebayQuery: "camiseta+banda+rock+metal+vintage",
          },
          {
            id: "hs2",
            name: "Camisa Flannel Grunge",
            brand: "Pendleton",
            price: "80,00 €",
            image:
              "https://images.unsplash.com/photo-1594938298603-c8148c4b4c5a?w=300&q=80",
            ebayQuery: "camisa+flannel+cuadros+grunge+hombre",
          },
        ],
      },
      {
        label: "Parte Inferior",
        emoji: "🖤",
        items: [
          {
            id: "hp1",
            name: "Pantalón Cargo Táctico",
            brand: "Dickies",
            price: "65,00 €",
            image:
              "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&q=80",
            ebayQuery: "pantalon+cargo+negro+tactico+hombre",
          },
          {
            id: "hp2",
            name: "Jeans Rotos Slim",
            brand: "G-Star Raw",
            price: "110,00 €",
            image:
              "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80",
            ebayQuery: "jeans+rotos+slim+negro+hombre",
          },
        ],
      },
      {
        label: "Calzado & Accesorios",
        emoji: "🥾",
        items: [
          {
            id: "ha1",
            name: "Botas Doc Martens 1460",
            brand: "Dr. Martens",
            price: "179,00 €",
            image:
              "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&q=80",
            ebayQuery: "doc+martens+1460+botas+negras",
          },
          {
            id: "ha2",
            name: "Collar Tachuelado Cuero",
            brand: "Punk Rave",
            price: "28,00 €",
            image:
              "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80",
            ebayQuery: "collar+tachuelas+cuero+punk+metal",
          },
        ],
      },
    ],
  },
  {
    id: "tadeojones",
    title: "Tadeo Jones",
    subtitle: "Aventurero urbano. La exploración como forma de vestir",
    characterImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    characterBg: "from-amber-950 to-stone-900",
    accentColor: "#D97706",
    tags: [
      "tadeo jones",
      "tadeo",
      "aventurero",
      "explorador",
      "indiana jones",
      "indiana",
      "khaki",
      "safari",
    ],
    sections: [
      {
        label: "Capa Exterior",
        emoji: "🧥",
        items: [
          {
            id: "tc1",
            name: "Chaqueta Field Waxed",
            brand: "Barbour",
            price: "289,00 €",
            image:
              "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80",
            ebayQuery: "chaqueta+field+waxed+canvas+aventurero",
          },
          {
            id: "tc2",
            name: "Impermeable Técnico Caqui",
            brand: "Fjällräven",
            price: "249,00 €",
            image:
              "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=300&q=80",
            ebayQuery: "impermeable+tecnico+khaki+senderismo",
          },
        ],
      },
      {
        label: "Parte Superior",
        emoji: "👕",
        items: [
          {
            id: "ts1",
            name: "Camisa Lino Manga Larga",
            brand: "Hartford",
            price: "115,00 €",
            image:
              "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
            ebayQuery: "camisa+lino+manga+larga+beis+hombre",
          },
          {
            id: "ts2",
            name: "Henley Waffle Knit",
            brand: "Todd Snyder",
            price: "85,00 €",
            image:
              "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80",
            ebayQuery: "henley+waffle+knit+hombre+beis",
          },
        ],
      },
      {
        label: "Parte Inferior",
        emoji: "👖",
        items: [
          {
            id: "tp1",
            name: "Cargo Ripstop Caqui",
            brand: "Arc'teryx",
            price: "165,00 €",
            image:
              "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=300&q=80",
            ebayQuery: "pantalon+cargo+ripstop+caqui+aventura",
          },
          {
            id: "tp2",
            name: "Chino Utility 5 Pocket",
            brand: "Carhartt WIP",
            price: "79,90 €",
            image:
              "https://images.unsplash.com/photo-1509551388413-e18d0ac8f97b?w=300&q=80",
            ebayQuery: "chino+utility+hombre+tierra+marrón",
          },
        ],
      },
      {
        label: "Calzado & Accesorios",
        emoji: "🤠",
        items: [
          {
            id: "ta1",
            name: "Botas Desert Chelsea",
            brand: "Clarks Originals",
            price: "139,00 €",
            image:
              "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&q=80",
            ebayQuery: "botas+desert+chelsea+hombre+cuero+suede",
          },
          {
            id: "ta2",
            name: "Sombrero Fedora Indiana",
            brand: "Stetson",
            price: "85,00 €",
            image:
              "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&q=80",
            ebayQuery: "sombrero+fedora+indiana+jones+cuero",
          },
        ],
      },
    ],
  },
  {
    id: "jamesbond",
    title: "James Bond",
    subtitle: "Sofisticación sin esfuerzo. El poder del traje perfecto",
    characterImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    characterBg: "from-slate-950 to-zinc-900",
    accentColor: "#C8A84B",
    tags: [
      "james bond",
      "bond",
      "007",
      "espía",
      "elegante",
      "formal",
      "traje",
      "gala",
      "cocktail",
    ],
    sections: [
      {
        label: "Capa Exterior",
        emoji: "🥂",
        items: [
          {
            id: "jc1",
            name: "Blazer Tom Ford Slim",
            brand: "Tom Ford",
            price: "2.890,00 €",
            image:
              "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&q=80",
            ebayQuery: "blazer+slim+fit+hombre+negro+lana",
          },
          {
            id: "jc2",
            name: "Esmoquin Midnight Blue",
            brand: "Brioni",
            price: "4.500,00 €",
            image:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
            ebayQuery: "esmokin+midnight+blue+slim+hombre",
          },
        ],
      },
      {
        label: "Parte Superior",
        emoji: "👔",
        items: [
          {
            id: "js1",
            name: "Camisa Oxford Blanca",
            brand: "Turnbull & Asser",
            price: "195,00 €",
            image:
              "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80",
            ebayQuery: "camisa+oxford+blanca+hombre+cuello+italiano",
          },
          {
            id: "js2",
            name: "Corbata Seda Grenadine",
            brand: "Drake's London",
            price: "145,00 €",
            image:
              "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80",
            ebayQuery: "corbata+seda+grenadine+azul+marino",
          },
        ],
      },
      {
        label: "Parte Inferior",
        emoji: "👔",
        items: [
          {
            id: "jp1",
            name: "Pantalón Traje Lana",
            brand: "Canali",
            price: "320,00 €",
            image:
              "https://images.unsplash.com/photo-1594938298603-c8148c4b4c5a?w=300&q=80",
            ebayQuery: "pantalon+traje+lana+slim+hombre+gris",
          },
          {
            id: "jp2",
            name: "Pantalón Tuxedo Satén",
            brand: "Dolce & Gabbana",
            price: "580,00 €",
            image:
              "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80",
            ebayQuery: "pantalon+tuxedo+saten+negro+hombre",
          },
        ],
      },
      {
        label: "Calzado & Accesorios",
        emoji: "⌚",
        items: [
          {
            id: "ja1",
            name: "Oxford Cap Toe Negro",
            brand: "Edward Green",
            price: "870,00 €",
            image:
              "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&q=80",
            ebayQuery: "oxford+cap+toe+negro+cuero+hombre",
          },
          {
            id: "ja2",
            name: "Omega Seamaster 300M",
            brand: "Omega",
            price: "5.400,00 €",
            image:
              "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=300&q=80",
            ebayQuery: "omega+seamaster+300m+azul+hombre",
          },
        ],
      },
    ],
  },
];

const DEFAULT_STYLE = STYLE_DATABASE[0];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
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

function ebayUrl(query: string): string {
  return `https://www.ebay.es/sch/i.html?_nkw=${query}`;
}

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function GarmentCard({ item }: { item: GarmentItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-shrink-0 w-48 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#C8A84B]/40 transition-all duration-300 group"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-3 space-y-2">
        <p className="text-white text-xs font-medium leading-tight line-clamp-2 font-inter">
          {item.name}
        </p>
        <p className="text-white/40 text-xs font-inter">{item.brand}</p>
        <p className="text-[#C8A84B] text-sm font-semibold font-inter">
          {item.price}
        </p>
        <a
          href={ebayUrl(item.ebayQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 w-full py-1.5 px-2 rounded-lg bg-[#C8A84B]/10 border border-[#C8A84B]/30 hover:bg-[#C8A84B]/20 hover:border-[#C8A84B]/60 transition-all duration-200 group/btn"
        >
          <span className="text-[#C8A84B] text-xs font-medium font-inter">
            Ver en eBay
          </span>
          <ExternalLink
            size={10}
            className="text-[#C8A84B] group-hover/btn:translate-x-0.5 transition-transform"
          />
        </a>
      </div>
    </motion.div>
  );
}

function StyleSection({ section }: { section: StyleSection }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <span className="text-base">{section.emoji}</span>
        <h3 className="text-white/60 text-xs uppercase tracking-[0.2em] font-inter font-medium">
          {section.label}
        </h3>
        <div className="flex-1 h-px bg-white/10" />
        <ChevronRight size={14} className="text-white/20" />
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {section.items.map((item) => (
          <GarmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
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
    <>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { display: none; }
        * { box-sizing: border-box; }
        body { background: #0A0A0A; margin: 0; }
      `}</style>

      <div
        className="min-h-screen bg-[#0A0A0A] text-white font-inter relative overflow-x-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── FONDO CINEMATOGRÁFICO ── */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-0 opacity-[0.07]">
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
              "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
            ].map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            ))}
          </div>
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/60 to-[#0A0A0A]/95" />
        </div>

        {/* ── HEADER ── */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 border-b border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-xl">
          <button
            onClick={clearSearch}
            className="flex items-center gap-1 group"
          >
            <span
              className="text-xl font-syne font-bold tracking-tight text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              StyleAI
            </span>
            <span className="text-xl font-bold text-[#C8A84B]">.</span>
          </button>

          <nav className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-xs font-inter border border-transparent hover:border-white/10">
              <SlidersHorizontal size={13} />
              <span className="hidden sm:inline">Filtros</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-xs font-inter border border-transparent hover:border-white/10">
              <BookOpen size={13} />
              <span className="hidden sm:inline">Editorial</span>
            </button>
            <button
              onClick={() => setIsWardrobe(!isWardrobe)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-inter border transition-all ${
                isWardrobe
                  ? "bg-[#C8A84B]/15 border-[#C8A84B]/40 text-[#C8A84B]"
                  : "text-white/70 hover:text-white bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <ShoppingBag size={13} />
              <span className="hidden sm:inline">Mi Armario</span>
            </button>
          </nav>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto space-y-10">
          {/* ── TÍTULO CENTRAL ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStyle.id + "-title"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-2"
            >
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-inter font-medium">
                Referente activo
              </p>
              <h1
                className="text-5xl md:text-7xl font-syne font-extrabold tracking-tight text-white leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {activeStyle.title}
                <span className="text-[#C8A84B]">.</span>
              </h1>
              <p className="text-white/40 text-sm font-inter max-w-sm mx-auto leading-relaxed">
                {activeStyle.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ── TARJETA PERSONAJE ── */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgKey}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative w-52 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b ${activeStyle.characterBg} shadow-2xl`}
                style={{
                  boxShadow: `0 25px 60px -10px ${activeStyle.accentColor}25`,
                }}
              >
                {/* Imagen personaje */}
                <div className="h-72 overflow-hidden">
                  <img
                    src={activeStyle.characterImage}
                    alt={activeStyle.title}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Label inferior */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-white font-syne font-bold text-sm"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {activeStyle.title}
                      </p>
                      <p className="text-white/50 text-xs font-inter mt-0.5">
                        {activeStyle.sections.length * 2} prendas
                      </p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: activeStyle.accentColor }}
                    />
                  </div>
                </div>

                {/* Accent strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${activeStyle.accentColor}, transparent)`,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── QUICK STYLES ── */}
          <div className="flex justify-center gap-2 flex-wrap">
            {STYLE_DATABASE.map((style) => (
              <button
                key={style.id}
                onClick={() => handleQuickStyle(style)}
                className={`px-4 py-1.5 rounded-full text-xs font-inter border transition-all duration-200 ${
                  activeStyle.id === style.id
                    ? "bg-[#C8A84B]/15 border-[#C8A84B]/50 text-[#C8A84B]"
                    : "border-white/10 text-white/40 hover:text-white/80 hover:border-white/20"
                }`}
              >
                {style.title}
              </button>
            ))}
          </div>

          {/* ── BUSCADOR ── */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl bg-[#C8A84B]/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 group-focus-within:border-[#C8A84B]/40 transition-all duration-300">
                <Search size={16} className="text-white/30 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busca un personaje, estilo o contexto (ej: Indiana Jones, Boda, Heavy Metal)..."
                  className="flex-1 bg-transparent text-white placeholder-white/20 text-sm font-inter outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#C8A84B]/20 border border-[#C8A84B]/40 text-[#C8A84B] text-xs font-inter font-medium hover:bg-[#C8A84B]/30 transition-all duration-200 flex-shrink-0"
                >
                  Visteme
                </button>
              </div>
            </div>
          </form>

          {/* ── DIVISOR ── */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-white/[0.06]" />
              <p className="text-white/20 text-xs font-inter uppercase tracking-widest">
                Outfit Recomendado
              </p>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </motion.div>
          )}

          {/* ── SECCIONES DE PRENDAS ── */}
          <AnimatePresence>
            {(hasSearched || true) && (
              <motion.div
                initial={hasSearched ? { opacity: 0, y: 30 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-8"
              >
                {activeStyle.sections.map((section, i) => (
                  <motion.div
                    key={`${activeStyle.id}-${section.label}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <StyleSection section={section} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── FOOTER ── */}
          <div className="pt-10 flex items-center justify-center gap-6 border-t border-white/[0.05]">
            <p className="text-white/15 text-xs font-inter">
              StyleAI<span className="text-[#C8A84B]">.</span> — Moda
              Inteligente
            </p>
            <span className="text-white/10 text-xs">•</span>
            <p className="text-white/15 text-xs font-inter">
              Powered by Costume IA
            </p>
          </div>
        </main>

        {/* ── MI ARMARIO PANEL ── */}
        <AnimatePresence>
          {isWardrobe && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsWardrobe(false)}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-[#0F0F0F] border-l border-white/10 flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                  <div>
                    <h2
                      className="text-white font-syne font-bold text-lg"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Mi Armario
                    </h2>
                    <p className="text-white/30 text-xs font-inter mt-0.5">
                      Tu colección guardada
                    </p>
                  </div>
                  <button
                    onClick={() => setIsWardrobe(false)}
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <ShoppingBag size={24} className="text-white/20" />
                  </div>
                  <p className="text-white/30 text-sm font-inter leading-relaxed">
                    Guarda prendas de tus estilos favoritos para construir tu
                    armario ideal.
                  </p>
                  <p className="text-[#C8A84B]/60 text-xs font-inter">
                    Próximamente
                  </p>
                </div>
                <div className="p-6 border-t border-white/[0.06] space-y-2">
                  {STYLE_DATABASE.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        handleQuickStyle(style);
                        setIsWardrobe(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.06] transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={style.characterImage}
                          alt={style.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white/70 text-xs font-inter font-medium">
                          {style.title}
                        </p>
                        <p className="text-white/25 text-xs font-inter">
                          {style.sections.reduce(
                            (acc, s) => acc + s.items.length,
                            0
                          )}{" "}
                          prendas
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

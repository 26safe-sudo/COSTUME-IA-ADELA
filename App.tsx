import { useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import {
  SlidersHorizontal,
  BookOpen,
  ShoppingBag,
  Search,
  ExternalLink,
  ChevronRight,
  X,
} from 'lucide-react'

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const STYLE_DATABASE = [
  {
    id: 'casual',
    title: 'Urbano Casual',
    subtitle: 'El equilibrio perfecto entre comodidad y estilo cotidiano',
    characterImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80',
    accentColor: '#C8A84B',
    tags: ['casual', 'urbano', 'everyday', 'streetwear', 'basico', 'default'],
    sections: [
      {
        label: 'Capa Exterior',
        emoji: '🧥',
        items: [
          {
            id: 'c1',
            name: 'Bomber Jacket Oversize',
            brand: 'Zara Man',
            price: '49,99 €',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80',
            ebayQuery: 'bomber+jacket+oversize+hombre',
          },
          {
            id: 'c2',
            name: 'Trench Coat Ligero',
            brand: 'Mango Man',
            price: '69,95 €',
            image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=300&q=80',
            ebayQuery: 'trench+coat+hombre+beige',
          },
        ],
      },
      {
        label: 'Parte Superior',
        emoji: '👕',
        items: [
          {
            id: 's1',
            name: 'Camiseta Esencial Blanca',
            brand: 'COS',
            price: '25,00 €',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80',
            ebayQuery: 'camiseta+blanca+hombre+basica',
          },
          {
            id: 's2',
            name: 'Sudadera French Terry',
            brand: 'Uniqlo',
            price: '29,90 €',
            image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=80',
            ebayQuery: 'sudadera+french+terry+hombre',
          },
        ],
      },
      {
        label: 'Parte Inferior',
        emoji: '👖',
        items: [
          {
            id: 'p1',
            name: 'Chino Slim Fit Gris',
            brand: 'Selected Homme',
            price: '45,00 €',
            image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80',
            ebayQuery: 'chino+slim+gris+hombre',
          },
          {
            id: 'p2',
            name: 'Vaquero Straight Raw',
            brand: 'Nudie Jeans',
            price: '89,00 €',
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80',
            ebayQuery: 'vaquero+straight+denim+hombre',
          },
        ],
      },
      {
        label: 'Calzado & Accesorios',
        emoji: '👟',
        items: [
          {
            id: 'a1',
            name: 'Sneaker Low White',
            brand: 'Common Projects',
            price: '299,00 €',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
            ebayQuery: 'sneakers+blancos+minimalistas+hombre',
          },
          {
            id: 'a2',
            name: 'Reloj Minimalista',
            brand: 'Komono',
            price: '75,00 €',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80',
            ebayQuery: 'reloj+minimalista+hombre',
          },
        ],
      },
    ],
  },
  {
    id: 'heavymetal',
    title: 'Heavy Metal',
    subtitle: 'La oscuridad hecha estilo. Cuero, tachuelas y actitud pura',
    characterImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80',
    accentColor: '#DC2626',
    tags: ['heavy metal', 'heavy', 'metal', 'rock', 'punk', 'dark', 'negro', 'oscuro'],
    sections: [
      {
        label: 'Capa Exterior',
        emoji: '🧥',
        items: [
          {
            id: 'hc1',
            name: 'Chaqueta Cuero Biker',
            brand: 'All Saints',
            price: '350,00 €',
            image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=300&q=80',
            ebayQuery: 'chaqueta+cuero+biker+hombre+negra',
          },
          {
            id: 'hc2',
            name: 'Denim Jacket con Parches',
            brand: "Levi's Vintage",
            price: '120,00 €',
            image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&q=80',
            ebayQuery: 'chaqueta+denim+customizada+parches+rock',
          },
        ],
      },
      {
        label: 'Parte Superior',
        emoji: '🎸',
        items: [
          {
            id: 'hs1',
            name: 'Camiseta Banda Vintage',
            brand: 'Merch Oficial',
            price: '35,00 €',
            image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&q=80',
            ebayQuery: 'camiseta+banda+rock+metal+vintage',
          },
          {
            id: 'hs2',
            name: 'Camisa Flannel Grunge',
            brand: 'Pendleton',
            price: '80,00 €',
            image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4c5a?w=300&q=80',
            ebayQuery: 'camisa+flannel+cuadros+grunge+hombre',
          },
        ],
      },
      {
        label: 'Parte Inferior',
        emoji: '🖤',
        items: [
          {
            id: 'hp1',
            name: 'Pantalón Cargo Táctico',
            brand: 'Dickies',
            price: '65,00 €',
            image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&q=80',
            ebayQuery: 'pantalon+cargo+negro+tactico+hombre',
          },
          {
            id: 'hp2',
            name: 'Jeans Rotos Slim Negro',
            brand: 'G-Star Raw',
            price: '110,00 €',
            image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80',
            ebayQuery: 'jeans+rotos+slim+negro+hombre',
          },
        ],
      },
      {
        label: 'Calzado & Accesorios',
        emoji: '🥾',
        items: [
          {
            id: 'ha1',
            name: 'Botas Doc Martens 1460',
            brand: 'Dr. Martens',
            price: '179,00 €',
            image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&q=80',
            ebayQuery: 'doc+martens+1460+botas+negras',
          },
          {
            id: 'ha2',
            name: 'Collar Tachuelado Cuero',
            brand: 'Punk Rave',
            price: '28,00 €',
            image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80',
            ebayQuery: 'collar+tachuelas+cuero+punk+metal',
          },
        ],
      },
    ],
  },
  {
    id: 'tadeojones',
    title: 'Tadeo Jones',
    subtitle: 'Aventurero urbano. La exploración como forma de vestir',
    characterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    accentColor: '#D97706',
    tags: [
      'tadeo jones', 'tadeo', 'jones', 'aventurero', 'explorador',
      'indiana jones', 'indiana', 'khaki', 'safari', 'arqueólogo',
    ],
    sections: [
      {
        label: 'Capa Exterior',
        emoji: '🧥',
        items: [
          {
            id: 'tc1',
            name: 'Chaqueta Field Waxed',
            brand: 'Barbour',
            price: '289,00 €',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80',
            ebayQuery: 'chaqueta+field+waxed+canvas+aventurero',
          },
          {
            id: 'tc2',
            name: 'Impermeable Técnico Caqui',
            brand: 'Fjällräven',
            price: '249,00 €',
            image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=300&q=80',
            ebayQuery: 'impermeable+tecnico+khaki+senderismo',
          },
        ],
      },
      {
        label: 'Parte Superior',
        emoji: '🗺️',
        items: [
          {
            id: 'ts1',
            name: 'Camisa Lino Manga Larga',
            brand: 'Hartford',
            price: '115,00 €',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80',
            ebayQuery: 'camisa+lino+manga+larga+beis+hombre',
          },
          {
            id: 'ts2',
            name: 'Henley Waffle Knit Beis',
            brand: 'Todd Snyder',
            price: '85,00 €',
            image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80',
            ebayQuery: 'henley+waffle+knit+hombre+beis',
          },
        ],
      },
      {
        label: 'Parte Inferior',
        emoji: '🏕️',
        items: [
          {
            id: 'tp1',
            name: 'Cargo Ripstop Caqui',
            brand: "Arc'teryx",
            price: '165,00 €',
            image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=300&q=80',
            ebayQuery: 'pantalon+cargo+ripstop+caqui+aventura',
          },
          {
            id: 'tp2',
            name: 'Chino Utility 5-Pocket',
            brand: 'Carhartt WIP',
            price: '79,90 €',
            image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac8f97b?w=300&q=80',
            ebayQuery: 'chino+utility+hombre+tierra+marron',
          },
        ],
      },
      {
        label: 'Calzado & Accesorios',
        emoji: '🤠',
        items: [
          {
            id: 'ta1',
            name: 'Botas Desert Chelsea',
            brand: 'Clarks Originals',
            price: '139,00 €',
            image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&q=80',
            ebayQuery: 'botas+desert+chelsea+hombre+cuero+suede',
          },
          {
            id: 'ta2',
            name: 'Sombrero Fedora Indiana',
            brand: 'Stetson',
            price: '85,00 €',
            image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&q=80',
            ebayQuery: 'sombrero+fedora+indiana+jones+cuero',
          },
        ],
      },
    ],
  },
  {
    id: 'jamesbond',
    title: 'James Bond',
    subtitle: 'Sofisticación sin esfuerzo. El poder del traje perfecto',
    characterImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80',
    accentColor: '#C8A84B',
    tags: [
      'james bond', 'bond', '007', 'espia', 'espía', 'elegante',
      'formal', 'traje', 'gala', 'cocktail', 'lujo',
    ],
    sections: [
      {
        label: 'Capa Exterior',
        emoji: '🥂',
        items: [
          {
            id: 'jc1',
            name: 'Blazer Tom Ford Slim',
            brand: 'Tom Ford',
            price: '2.890,00 €',
            image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&q=80',
            ebayQuery: 'blazer+slim+fit+hombre+negro+lana',
          },
          {
            id: 'jc2',
            name: 'Esmoquin Midnight Blue',
            brand: 'Brioni',
            price: '4.500,00 €',
            image: 'https://images.unsplash.com/photo-1580657018950-ea7523a9c3b7?w=300&q=80',
            ebayQuery: 'esmokin+midnight+blue+slim+hombre',
          },
        ],
      },
      {
        label: 'Parte Superior',
        emoji: '👔',
        items: [
          {
            id: 'js1',
            name: 'Camisa Oxford Blanca',
            brand: 'Turnbull & Asser',
            price: '195,00 €',
            image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80',
            ebayQuery: 'camisa+oxford+blanca+hombre+cuello+italiano',
          },
          {
            id: 'js2',
            name: 'Corbata Seda Grenadine',
            brand: "Drake's London",
            price: '145,00 €',
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&q=80',
            ebayQuery: 'corbata+seda+grenadine+azul+marino',
          },
        ],
      },
      {
        label: 'Parte Inferior',
        emoji: '🎩',
        items: [
          {
            id: 'jp1',
            name: 'Pantalón Traje Lana',
            brand: 'Canali',
            price: '320,00 €',
            image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80',
            ebayQuery: 'pantalon+traje+lana+slim+hombre+gris',
          },
          {
            id: 'jp2',
            name: 'Pantalón Tuxedo Satén',
            brand: 'Dolce & Gabbana',
            price: '580,00 €',
            image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4c5a?w=300&q=80',
            ebayQuery: 'pantalon+tuxedo+saten+negro+hombre',
          },
        ],
      },
      {
        label: 'Calzado & Accesorios',
        emoji: '⌚',
        items: [
          {
            id: 'ja1',
            name: 'Oxford Cap Toe Negro',
            brand: 'Edward Green',
            price: '870,00 €',
            image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&q=80',
            ebayQuery: 'oxford+cap+toe+negro+cuero+hombre',
          },
          {
            id: 'ja2',
            name: 'Omega Seamaster 300M',
            brand: 'Omega',
            price: '5.400,00 €',
            image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=300&q=80',
            ebayQuery: 'omega+seamaster+300m+azul+hombre',
          },
        ],
      },
    ],
  },
]

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function findStyle(query) {
  const q = query.toLowerCase().trim()
  if (!q) return STYLE_DATABASE[0]
  for (const style of STYLE_DATABASE) {
    for (const tag of style.tags) {
      if (q.includes(tag) || tag.includes(q)) return style
    }
  }
  return STYLE_DATABASE[0]
}

function ebayUrl(query) {
  return `https://www.ebay.es/sch/i.html?_nkw=${query}`
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80'

// ─────────────────────────────────────────────
// GARMENT CARD
// ─────────────────────────────────────────────
function GarmentCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        flexShrink: 0,
        width: '176px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px)',
        transition: 'border-color 0.3s',
      }}
    >
      <div style={{ position: 'relative', height: '152px', overflow: 'hidden' }}>
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => { e.target.src = FALLBACK_IMG }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
        }} />
      </div>
      <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p style={{ margin: 0, color: '#fff', fontSize: '11px', fontWeight: 500, lineHeight: 1.3, fontFamily: 'Inter, sans-serif' }}>
          {item.name}
        </p>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>
          {item.brand}
        </p>
        <p style={{ margin: 0, color: '#C8A84B', fontSize: '13px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
          {item.price}
        </p>
        <a
          href={ebayUrl(item.ebayQuery)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            padding: '6px 8px', borderRadius: '8px',
            background: 'rgba(200,168,75,0.1)', border: '1px solid rgba(200,168,75,0.3)',
            color: '#C8A84B', fontSize: '11px', fontWeight: 500, fontFamily: 'Inter, sans-serif',
            textDecoration: 'none', transition: 'background 0.2s',
          }}
        >
          Ver en eBay
          <ExternalLink size={10} />
        </a>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// OUTFIT SECTION (scroll horizontal)
// ─────────────────────────────────────────────
function OutfitSection({ section }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px' }}>{section.emoji}</span>
        <span style={{
          color: 'rgba(255,255,255,0.4)', fontSize: '10px',
          textTransform: 'uppercase', letterSpacing: '0.2em',
          fontFamily: 'Inter, sans-serif', fontWeight: 500,
        }}>
          {section.label}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
        <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.15)' }} />
      </div>
      <div style={{
        display: 'flex', gap: '10px',
        overflowX: 'auto', paddingBottom: '6px',
        scrollbarWidth: 'none',
      }}>
        {section.items.map((item) => (
          <GarmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
function App() {
  const [activeStyle, setActiveStyle] = useState(STYLE_DATABASE[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [imgKey, setImgKey] = useState(0)
  const [isWardrobe, setIsWardrobe] = useState(false)

  function applyStyle(style) {
    setActiveStyle(style)
    setImgKey((k) => k + 1)
  }

  function handleSearch(e) {
    e.preventDefault()
    if (!searchQuery.trim()) return
    applyStyle(findStyle(searchQuery))
  }

  function handleQuick(style) {
    setSearchQuery(style.title)
    applyStyle(style)
  }

  function clearSearch() {
    setSearchQuery('')
    applyStyle(STYLE_DATABASE[0])
  }

  // ── Background images ──
  const bgImgs = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    'https://images.unsplash.com/photo-1544441893-675973e31985?w=400',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    'https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    'https://images.unsplash.com/photo-1480429370139-e0132234467b?w=400',
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff', position: 'relative', overflowX: 'hidden', fontFamily: 'Inter, sans-serif' }}>

      {/* ── FONDO CINEMATOGRÁFICO ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.07,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 1fr)',
        }}>
          {bgImgs.map((src, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.95) 100%)' }} />
      </div>

      {/* ── HEADER ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '60px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)',
      }}>
        <button onClick={clearSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: '1px', padding: 0 }}>
          <span style={{ fontSize: '20px', fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>StyleAI</span>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#C8A84B' }}>.</span>
        </button>

        <nav style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[
            { icon: <SlidersHorizontal size={13} />, label: 'Filtros' },
            { icon: <BookOpen size={13} />, label: 'Editorial' },
          ].map(({ icon, label }) => (
            <button key={label} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '10px',
              background: 'transparent', border: '1px solid transparent',
              color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontFamily: 'Inter, sans-serif',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
            >
              {icon}<span>{label}</span>
            </button>
          ))}
          <button
            onClick={() => setIsWardrobe(!isWardrobe)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '10px',
              background: isWardrobe ? 'rgba(200,168,75,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${isWardrobe ? 'rgba(200,168,75,0.4)' : 'rgba(255,255,255,0.1)'}`,
              color: isWardrobe ? '#C8A84B' : 'rgba(255,255,255,0.7)',
              fontSize: '12px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <ShoppingBag size={13} />
            <span>Mi Armario</span>
          </button>
        </nav>
      </header>

      {/* ── MAIN ── */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: '760px', margin: '0 auto', padding: '88px 20px 80px' }}>

        {/* ── TÍTULO ANIMADO ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle.id + '-title'}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '32px' }}
          >
            <p style={{ margin: '0 0 8px', color: 'rgba(255,255,255,0.25)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
              Referente activo
            </p>
            <h1 style={{ margin: '0 0 10px', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2.8rem, 8vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1, color: '#fff' }}>
              {activeStyle.title}<span style={{ color: '#C8A84B' }}>.</span>
            </h1>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.38)', fontSize: '13px', fontFamily: 'Inter, sans-serif', lineHeight: 1.6, maxWidth: '340px', marginInline: 'auto' }}>
              {activeStyle.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── TARJETA PERSONAJE ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={imgKey}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.06, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative', width: '192px', borderRadius: '24px',
                overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `0 32px 64px -16px ${activeStyle.accentColor}30`,
              }}
            >
              <div style={{ height: '280px', overflow: 'hidden' }}>
                <img
                  src={activeStyle.characterImage}
                  alt={activeStyle.title}
                  onError={(e) => { e.target.src = FALLBACK_IMG }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
              </div>
              {/* Label */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ margin: 0, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: '#fff' }}>
                      {activeStyle.title}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>
                      {activeStyle.sections.reduce((acc, s) => acc + s.items.length, 0)} prendas
                    </p>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeStyle.accentColor, animation: 'pulse 2s infinite' }} />
                </div>
              </div>
              {/* Top accent stripe */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${activeStyle.accentColor}, transparent)` }} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── QUICK STYLE PILLS ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {STYLE_DATABASE.map((style) => (
            <button
              key={style.id}
              onClick={() => handleQuick(style)}
              style={{
                padding: '6px 16px', borderRadius: '999px', fontSize: '12px',
                fontFamily: 'Inter, sans-serif', cursor: 'pointer', transition: 'all 0.2s',
                background: activeStyle.id === style.id ? 'rgba(200,168,75,0.15)' : 'transparent',
                border: `1px solid ${activeStyle.id === style.id ? 'rgba(200,168,75,0.5)' : 'rgba(255,255,255,0.1)'}`,
                color: activeStyle.id === style.id ? '#C8A84B' : 'rgba(255,255,255,0.38)',
              }}
            >
              {style.title}
            </button>
          ))}
        </div>

        {/* ── BUSCADOR ── */}
        <form onSubmit={handleSearch} style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px', padding: '14px 20px', transition: 'border-color 0.3s',
          }}>
            <Search size={15} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busca un personaje, estilo o contexto (ej: Indiana Jones, Boda, Heavy Metal)..."
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: '#fff', fontSize: '13px', fontFamily: 'Inter, sans-serif',
              }}
            />
            {searchQuery && (
              <button type="button" onClick={clearSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, display: 'flex' }}>
                <X size={14} />
              </button>
            )}
            <button
              type="submit"
              style={{
                padding: '7px 16px', borderRadius: '10px',
                background: 'rgba(200,168,75,0.15)', border: '1px solid rgba(200,168,75,0.35)',
                color: '#C8A84B', fontSize: '12px', fontWeight: 500,
                fontFamily: 'Inter, sans-serif', cursor: 'pointer', flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              Vísteme →
            </button>
          </div>
        </form>

        {/* ── DIVIDER ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
            Outfit Recomendado
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* ── SECCIONES DE PRENDAS ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle.id + '-sections'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {activeStyle.sections.map((section, i) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <OutfitSection section={section} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── FOOTER ── */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.12)', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
            StyleAI<span style={{ color: '#C8A84B' }}>.</span> — Costume IA · Moda Inteligente
          </p>
        </div>
      </main>

      {/* ── PANEL MI ARMARIO ── */}
      <AnimatePresence>
        {isWardrobe && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsWardrobe(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 50,
                width: '300px', background: '#0F0F0F',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Header panel */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff' }}>Mi Armario</h2>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif' }}>Tu colección guardada</p>
                </div>
                <button onClick={() => setIsWardrobe(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, display: 'flex' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Empty state */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', gap: '12px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={22} style={{ color: 'rgba(255,255,255,0.2)' }} />
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
                  Guarda prendas de tus estilos favoritos.
                </p>
                <span style={{ fontSize: '11px', color: 'rgba(200,168,75,0.5)', fontFamily: 'Inter, sans-serif' }}>Próximamente</span>
              </div>

              {/* Estilos rápidos */}
              <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {STYLE_DATABASE.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => { handleQuick(style); setIsWardrobe(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px 12px', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={style.characterImage} alt={style.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{style.title}</p>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>
                        {style.sections.reduce((acc, s) => acc + s.items.length, 0)} prendas
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pulse keyframe */}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}

// ─────────────────────────────────────────────
// MOUNT
// ─────────────────────────────────────────────
createRoot(document.getElementById('root')).render(<App />)

export default App

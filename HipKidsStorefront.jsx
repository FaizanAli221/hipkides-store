import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Search, Heart, ShoppingCart, ChevronLeft, ChevronRight,
  Star, Truck, Headphones, RotateCcw, ShieldCheck, MapPin, Mail, Phone,
  Facebook, Instagram, Home, User, Eye, Shuffle, Plus, Minus, MessageCircle,
  ChevronDown, Check
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens (inline, since this environment has no Tailwind JIT) */
/* ------------------------------------------------------------------ */
const TEAL = "#4DB7B4";
const TEAL_DARK = "#3A9895";
const TEAL_TINT = "#EAF6F5";
const INK = "#1E2530";
const CORAL = "#E4483B";

const PASTELS = {
  pink: { bg: "#FBE7EA", text: "#B4526A" },
  blue: { bg: "#E4F1FB", text: "#3E7CA6" },
  mint: { bg: "#E3F6F1", text: "#3B9483" },
  yellow: { bg: "#FDF4DB", text: "#B08526" },
};

/* ------------------------------------------------------------------ */
/* Mock data                                                          */
/* ------------------------------------------------------------------ */
const CATEGORIES = [
  { id: "newborn", label: "New Born" },
  { id: "baby-boy", label: "Baby Boy" },
  { id: "baby-girl", label: "Baby Girl" },
  { id: "footwear", label: "Footwear" },
  { id: "accessories", label: "Accessories" },
  { id: "sale", label: "Sale" },
];

const AGE_GROUPS = [
  { id: "Baby Boy", label: "Baby Boy", sub: "0 - 2y", swatch: PASTELS.blue },
  { id: "Baby Girl", label: "Baby Girl", sub: "0 - 2y", swatch: PASTELS.pink },
  { id: "Boy", label: "Boys", sub: "2 - 10y", swatch: PASTELS.mint },
  { id: "Girl", label: "Girls", sub: "2 - 10y", swatch: PASTELS.yellow },
];

const HERO_SLIDES = [
  { id: 1, eyebrow: "Limited sizes left", title: "40% off sneakers", sub: "Premium footwear for little feet", cta: "Shop now", swatch: PASTELS.blue },
  { id: 2, eyebrow: "New season", title: "Autumn rompers", sub: "Soft cotton, made to move", cta: "Shop now", swatch: PASTELS.mint },
  { id: 3, eyebrow: "Just landed", title: "Party dresses", sub: "For every little occasion", cta: "Shop now", swatch: PASTELS.pink },
];

const BRANDS = ["Next", "Primark", "Carter's", "Polo", "Tommy Hilfiger", "Chicco", "TOMS"];

const SIZES = ["0-3m", "3-6m", "6-12m", "1-2y", "2-3y", "4-5y"];

const NEW_ARRIVALS = [
  { id: 1, ageGroup: "Baby Boy", title: "Chicco Full Romper, Vehicles Print", price: 1790, originalPrice: null, discount: 0, rating: 4.6, swatch: PASTELS.mint, badge: "New" },
  { id: 2, ageGroup: "Baby Boy", title: "Chicco Full Romper, Lion Face Print", price: 1790, originalPrice: null, discount: 0, rating: 4.7, swatch: PASTELS.yellow, badge: "New" },
  { id: 3, ageGroup: "Baby Girl", title: "Tulle Party Dress, Blush Pink", price: 3290, originalPrice: 4990, discount: 34, rating: 4.8, swatch: PASTELS.pink, badge: "100% Original" },
  { id: 4, ageGroup: "Baby Girl", title: "Ruffle Sleeve Cotton Romper", price: 2190, originalPrice: null, discount: 0, rating: 4.5, swatch: PASTELS.blue, badge: "New" },
  { id: 5, ageGroup: "Boy", title: "Formal Waistcoat Gallis Suit", price: 4590, originalPrice: 6990, discount: 34, rating: 4.9, swatch: PASTELS.blue, badge: "100% Original" },
  { id: 6, ageGroup: "Boy", title: "Striped Henley Sweatshirt", price: 1990, originalPrice: null, discount: 0, rating: 4.4, swatch: PASTELS.mint, badge: "New" },
  { id: 7, ageGroup: "Girl", title: "Pleated Sundress, Sage Green", price: 2890, originalPrice: 3990, discount: 28, rating: 4.7, swatch: PASTELS.mint, badge: "100% Original" },
  { id: 8, ageGroup: "Girl", title: "Floral Print Cotton Frock", price: 2390, originalPrice: null, discount: 0, rating: 4.6, swatch: PASTELS.pink, badge: "New" },
];

const FOOTWEAR = [
  { id: 101, title: "CT Baby Girl Brown Rainbow Boots", price: 2994, originalPrice: 4990, discount: 40, rating: 4.7, swatch: PASTELS.yellow },
  { id: 102, title: "All In Motion Peach Slip-On Sneakers", price: 3594, originalPrice: 5990, discount: 40, rating: 4.5, swatch: PASTELS.pink },
  { id: 103, title: "C&J Girl Pink Belt Slip-On Sneakers", price: 2994, originalPrice: 4990, discount: 40, rating: 4.6, swatch: PASTELS.blue },
  { id: 104, title: "C&J Boy Grey Slip-On Sneakers", price: 2994, originalPrice: 4990, discount: 40, rating: 4.5, swatch: PASTELS.mint },
];

const TESTIMONIALS = [
  { id: 1, name: "Kanza Fatima", initials: "KF", rating: 5, title: "Baby Girl 3pk Sleepsuits, Butterfly Print", body: "Fabric is soft and the sizing was spot on. Will order again for sure.", swatch: PASTELS.pink },
  { id: 2, name: "Waqas Akbar", initials: "WA", rating: 5, title: "Baby Boy Checked Navy Formal Suit", body: "Looked exactly like the pictures, and it arrived two days early.", swatch: PASTELS.blue },
  { id: 3, name: "Ayesha Noor", initials: "AN", rating: 4, title: "Girl Pleated Sundress, Sage Green", body: "Lovely stitching. Slightly long in the sleeve but easy to fix.", swatch: PASTELS.mint },
  { id: 4, name: "Bilal Sheikh", initials: "BS", rating: 5, title: "C&J Boy Grey Slip-On Sneakers", body: "Grip is great for a toddler learning to run. Comfy from day one.", swatch: PASTELS.yellow },
];

const formatPKR = (n) => `Rs. ${n.toLocaleString("en-PK")}`;

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */
function Stars({ rating, size = 13 }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          fill={i <= full ? "#F6C445" : "#E3E1DB"}
        />
      ))}
    </div>
  );
}

function SwatchImage({ swatch, alt, className = "", children }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: swatch.bg }}
      role="img"
      aria-label={alt}
    >
      <span
        className="font-semibold tracking-tight opacity-80"
        style={{ color: swatch.text, fontFamily: "'Baloo 2', sans-serif" }}
      >
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Announcement bar                                                   */
/* ------------------------------------------------------------------ */
function AnnouncementBar() {
  return (
    <div
      className="w-full text-center text-xs sm:text-sm font-medium py-2 px-4"
      style={{ backgroundColor: INK, color: "#fff" }}
    >
      Free shipping on orders above Rs. 3,500 <span className="hidden sm:inline">— 100% authentic and imported</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */
function Header({ cartCount, wishlistCount, onMenuOpen, onSearchOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: "#EFEEE9" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 py-3">
        <button
          onClick={onMenuOpen}
          className="md:hidden p-2 -ml-2 rounded-full active:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu size={22} color={INK} />
        </button>

        <div className="flex items-center gap-2 select-none">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: TEAL_TINT }}
          >
            <span style={{ color: TEAL_DARK, fontFamily: "'Baloo 2', sans-serif" }} className="font-bold text-lg">
              H
            </span>
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: INK, fontFamily: "'Baloo 2', sans-serif" }}
          >
            Hip<span style={{ color: TEAL }}>Kids</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 mx-6">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href="#products"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: c.id === "sale" ? CORAL : INK }}
            >
              {c.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 max-w-xs">
          <div className="flex items-center w-full rounded-full px-3 py-2 gap-2" style={{ backgroundColor: "#F3F2EE" }}>
            <Search size={16} color="#8B8A83" />
            <input
              type="text"
              placeholder="Search for rompers, sneakers..."
              className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
              style={{ color: INK }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={onSearchOpen} className="md:hidden p-2 rounded-full active:bg-gray-100" aria-label="Search">
            <Search size={20} color={INK} />
          </button>
          <button className="relative p-2 rounded-full active:bg-gray-100 hidden sm:inline-flex" aria-label="Wishlist">
            <Heart size={20} color={INK} />
            {wishlistCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: CORAL }}
              >
                {wishlistCount}
              </span>
            )}
          </button>
          <button className="relative p-2 rounded-full active:bg-gray-100" aria-label="Cart">
            <ShoppingCart size={20} color={INK} />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: TEAL }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile drawer                                                      */
/* ------------------------------------------------------------------ */
function MobileDrawer({ open, onClose }) {
  const [tab, setTab] = useState("menu");

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`absolute top-0 left-0 h-full w-[82%] max-w-xs bg-white shadow-xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center border-b" style={{ borderColor: "#EFEEE9" }}>
          <button
            onClick={() => setTab("menu")}
            className="flex-1 py-3 text-sm font-semibold"
            style={{ color: tab === "menu" ? INK : "#9C9B95", borderBottom: tab === "menu" ? `2px solid ${TEAL}` : "2px solid transparent" }}
          >
            Menu
          </button>
          <button
            onClick={() => setTab("categories")}
            className="flex-1 py-3 text-sm font-semibold"
            style={{ color: tab === "categories" ? INK : "#9C9B95", borderBottom: tab === "categories" ? `2px solid ${TEAL}` : "2px solid transparent" }}
          >
            Categories
          </button>
          <button onClick={onClose} className="p-3 pr-4" aria-label="Close menu">
            <X size={18} color={INK} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {tab === "menu" ? (
            <ul>
              <li className="flex items-center gap-3 px-4 py-3 text-sm font-medium" style={{ color: INK }}>
                <Home size={16} /> New Arrivals
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.id} className="flex items-center justify-between px-4 py-3 text-sm" style={{ color: c.id === "sale" ? CORAL : INK }}>
                  <span className="font-medium">{c.label}</span>
                  <ChevronRight size={15} color="#B7B6AF" />
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {AGE_GROUPS.map((a) => (
                <li key={a.id} className="flex items-center gap-3 px-4 py-3">
                  <span
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    style={{ backgroundColor: a.swatch.bg }}
                  />
                  <div>
                    <p className="text-sm font-medium" style={{ color: INK }}>{a.label}</p>
                    <p className="text-xs" style={{ color: "#9C9B95" }}>{a.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t px-4 py-4 text-xs" style={{ borderColor: "#EFEEE9", color: "#6B6A64" }}>
          <p className="font-semibold mb-1" style={{ color: INK }}>Need help?</p>
          <p className="flex items-center gap-2 mb-1"><Phone size={13} /> 0333 4475 437</p>
          <p className="flex items-center gap-2"><Mail size={13} /> info@hipkids.pk</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero carousel                                                      */
/* ------------------------------------------------------------------ */
function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer.current);
  }, []);

  const go = (dir) => {
    clearInterval(timer.current);
    setIndex((i) => (i + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[index];

  return (
    <section className="relative max-w-6xl mx-auto px-4 pt-4">
      <div
        className="relative rounded-2xl overflow-hidden flex items-center h-56 sm:h-72 md:h-80"
        style={{ backgroundColor: slide.swatch.bg }}
      >
        <div className="px-6 sm:px-10 max-w-md">
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: slide.swatch.text }}>
            {slide.eyebrow}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2"
            style={{ color: INK, fontFamily: "'Baloo 2', sans-serif" }}
          >
            {slide.title}
          </h2>
          <p className="text-sm sm:text-base mb-4" style={{ color: "#5B5A54" }}>
            {slide.sub}
          </p>
          <button
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95"
            style={{ backgroundColor: INK }}
          >
            {slide.cta}
          </button>
        </div>

        <button
          onClick={() => go(-1)}
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} color={INK} />
        </button>
        <button
          onClick={() => go(1)}
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight size={18} color={INK} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === index ? 20 : 6,
              backgroundColor: i === index ? TEAL : "#DAD8D0",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shop by age                                                        */
/* ------------------------------------------------------------------ */
function ShopByAge() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-10">
      <SectionHeading label="Shop by age" />
      <div className="flex justify-between sm:justify-center sm:gap-10 mt-6">
        {AGE_GROUPS.map((a) => (
          <button key={a.id} className="flex flex-col items-center gap-2 flex-shrink-0">
            <span
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2"
              style={{ backgroundColor: a.swatch.bg, borderColor: TEAL_TINT }}
            >
              <span className="text-xs font-semibold" style={{ color: a.swatch.text, fontFamily: "'Baloo 2', sans-serif" }}>
                {a.label.split(" ")[0]}
              </span>
            </span>
            <span className="text-xs font-medium" style={{ color: INK }}>{a.label}</span>
            <span className="text-[11px]" style={{ color: "#9C9B95" }}>{a.sub}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ label, sub, action }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mx-auto sm:mx-0">
        <span className="hidden sm:block h-px w-8" style={{ backgroundColor: "#D8D6CE" }} />
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: INK, fontFamily: "'Baloo 2', sans-serif" }}>
          {label}
        </h2>
        <span className="hidden sm:block h-px w-8" style={{ backgroundColor: "#D8D6CE" }} />
      </div>
      {sub && <p className="text-sm italic hidden sm:block" style={{ color: "#9C9B95" }}>{sub}</p>}
      {action}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Featured collections                                               */
/* ------------------------------------------------------------------ */
function FeaturedCollections() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-10">
      <SectionHeading label="Collections" />
      <div className="grid grid-cols-2 gap-3 sm:gap-5 mt-6">
        <div
          className="relative rounded-2xl h-40 sm:h-56 flex items-end p-4 overflow-hidden"
          style={{ backgroundColor: PASTELS.mint.bg }}
        >
          <span className="text-lg sm:text-2xl font-bold" style={{ color: PASTELS.mint.text, fontFamily: "'Baloo 2', sans-serif" }}>
            Apparel
          </span>
        </div>
        <div
          className="relative rounded-2xl h-40 sm:h-56 flex items-end p-4 overflow-hidden"
          style={{ backgroundColor: PASTELS.yellow.bg }}
        >
          <span className="text-lg sm:text-2xl font-bold" style={{ color: PASTELS.yellow.text, fontFamily: "'Baloo 2', sans-serif" }}>
            Footwear
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Brand strip                                                        */
/* ------------------------------------------------------------------ */
function BrandStrip() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-10">
      <SectionHeading label="Shop by brand" />
      <div className="flex gap-6 sm:gap-10 overflow-x-auto mt-6 pb-2 no-scrollbar">
        {BRANDS.map((b) => (
          <span
            key={b}
            className="flex-shrink-0 text-base sm:text-lg font-bold tracking-tight whitespace-nowrap px-2"
            style={{ color: "#B7B6AF" }}
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Product card                                                       */
/* ------------------------------------------------------------------ */
function ProductCard({ product, onQuickShop, onToggleWishlist, wished }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative rounded-xl overflow-hidden aspect-square">
        <SwatchImage
          swatch={hovered ? { bg: shade(product.swatch.bg), text: product.swatch.text } : product.swatch}
          alt={product.title}
          className="w-full h-full transition-colors duration-300"
        >
          {product.title.split(" ")[0]}
        </SwatchImage>

        {product.discount > 0 && (
          <span
            className="absolute top-2 right-2 text-[11px] font-bold text-white px-2 py-1 rounded-full"
            style={{ backgroundColor: CORAL }}
          >
            -{product.discount}%
          </span>
        )}
        {product.badge && product.discount === 0 && (
          <span
            className="absolute top-2 right-2 text-[11px] font-bold px-2 py-1 rounded-full"
            style={{ backgroundColor: TEAL_TINT, color: TEAL_DARK }}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center"
          aria-label="Add to wishlist"
        >
          <Heart size={14} fill={wished ? CORAL : "none"} color={wished ? CORAL : INK} />
        </button>

        <button
          onClick={() => onQuickShop(product)}
          className="absolute bottom-2 left-2 right-2 rounded-full bg-white text-xs font-semibold py-2 flex items-center justify-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 sm:transition-all sm:duration-200 max-sm:opacity-100 max-sm:translate-y-0"
          style={{ color: TEAL_DARK }}
        >
          <ShoppingCart size={13} /> Quick shop
        </button>
      </div>

      <p className="text-xs sm:text-sm font-medium mt-2.5 leading-snug line-clamp-2" style={{ color: INK }}>
        {product.title}
      </p>
      <div className="flex items-center gap-2 mt-1">
        {product.originalPrice && (
          <span className="text-xs line-through" style={{ color: "#B7B6AF" }}>
            {formatPKR(product.originalPrice)}
          </span>
        )}
        <span className="text-sm font-bold" style={{ color: product.originalPrice ? CORAL : INK }}>
          {formatPKR(product.price)}
        </span>
      </div>
    </div>
  );
}

function shade(hex) {
  const map = {
    [PASTELS.pink.bg]: "#F6D3D9",
    [PASTELS.blue.bg]: "#D2E7F8",
    [PASTELS.mint.bg]: "#D2F0E7",
    [PASTELS.yellow.bg]: "#FBEBC0",
  };
  return map[hex] || hex;
}

/* ------------------------------------------------------------------ */
/* New arrivals (tabbed grid)                                         */
/* ------------------------------------------------------------------ */
function NewArrivals({ onQuickShop, wishlist, onToggleWishlist }) {
  const [tab, setTab] = useState("Baby Boy");
  const filtered = NEW_ARRIVALS.filter((p) => p.ageGroup === tab);

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 pt-12">
      <SectionHeading label="New arrivals" sub="Trendy styles for little ones" />

      <div className="flex justify-center gap-6 sm:gap-8 mt-6 border-b" style={{ borderColor: "#EFEEE9" }}>
        {AGE_GROUPS.map((a) => (
          <button
            key={a.id}
            onClick={() => setTab(a.id)}
            className="pb-3 text-sm font-semibold whitespace-nowrap transition-colors"
            style={{
              color: tab === a.id ? TEAL_DARK : "#9C9B95",
              borderBottom: tab === a.id ? `2px solid ${TEAL}` : "2px solid transparent",
            }}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-10 mt-7">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickShop={onQuickShop}
            onToggleWishlist={onToggleWishlist}
            wished={wishlist.includes(p.id)}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Premium footwear grid                                              */
/* ------------------------------------------------------------------ */
function PremiumFootwear({ onQuickShop, wishlist, onToggleWishlist }) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-12">
      <SectionHeading
        label="Premium footwear"
        sub="Perfect pairs for little feet"
        action={
          <button className="hidden sm:flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5" style={{ backgroundColor: INK, color: "#fff" }}>
            View all <ChevronRight size={13} />
          </button>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-10 mt-7">
        {FOOTWEAR.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickShop={onQuickShop}
            onToggleWishlist={onToggleWishlist}
            wished={wishlist.includes(p.id)}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust bar                                                          */
/* ------------------------------------------------------------------ */
function TrustBar() {
  const items = [
    { icon: Truck, title: "Free shipping", sub: "On all orders above Rs. 3,500" },
    { icon: Headphones, title: "Support 24/7", sub: "Contact us any day, any time" },
    { icon: RotateCcw, title: "7 days return", sub: "Easy exchange within a week" },
    { icon: ShieldCheck, title: "Secure payment", sub: "Your payment info is protected" },
  ];
  return (
    <section className="mt-14 py-10" style={{ backgroundColor: TEAL }}>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {items.map((it) => (
          <div key={it.title} className="flex flex-col items-start gap-2">
            <it.icon size={22} color="#fff" strokeWidth={1.75} />
            <p className="text-sm font-bold text-white">{it.title}</p>
            <p className="text-xs text-white/80 leading-snug">{it.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                       */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const [start, setStart] = useState(0);
  const visible = 2;

  const go = (dir) => {
    setStart((s) => (s + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const shown = [0, 1].map((offset) => TESTIMONIALS[(start + offset) % TESTIMONIALS.length]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="text-center">
        <h2 className="text-2xl font-bold" style={{ color: INK, fontFamily: "'Baloo 2', sans-serif" }}>
          Happy customers
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Stars rating={4.6} size={15} />
          <span className="text-sm" style={{ color: "#9C9B95" }}>from 914 reviews</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-8">
        <button
          onClick={() => go(-1)}
          className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#F3F2EE" }}
          aria-label="Previous review"
        >
          <ChevronLeft size={16} color={INK} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
          {shown.map((t) => (
            <div key={t.id} className="rounded-2xl p-5" style={{ backgroundColor: "#F9F8F5" }}>
              <Stars rating={t.rating} />
              <p className="text-sm font-semibold mt-2" style={{ color: INK }}>{t.title}</p>
              <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "#6B6A64" }}>{t.body}</p>
              <div className="flex items-center gap-2 mt-4">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: t.swatch.bg, color: t.swatch.text }}
                >
                  {t.initials}
                </span>
                <span className="text-xs font-medium" style={{ color: INK }}>{t.name}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => go(1)}
          className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#F3F2EE" }}
          aria-label="Next review"
        >
          <ChevronRight size={16} color={INK} />
        </button>
      </div>

      <div className="flex sm:hidden items-center justify-center gap-4 mt-5">
        <button onClick={() => go(-1)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F3F2EE" }} aria-label="Previous review">
          <ChevronLeft size={16} color={INK} />
        </button>
        <button onClick={() => go(1)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F3F2EE" }} aria-label="Next review">
          <ChevronRight size={16} color={INK} />
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer style={{ backgroundColor: TEAL }} className="pt-12 pb-28 md:pb-12 text-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="text-sm font-bold mb-3 flex items-center gap-2"><MapPin size={15} /> Visit us</p>
          <p className="text-sm text-white/85 leading-relaxed">
            Shop LG-35, Lower Ground,<br />LuckyOne Mall, Karachi
          </p>
          <p className="text-sm text-white/85 flex items-center gap-2 mt-3"><Mail size={14} /> info@hipkids.pk</p>
          <p className="text-sm text-white/85 flex items-center gap-2 mt-1"><Phone size={14} /> 0333 4475 437</p>
          <div className="flex items-center gap-3 mt-4">
            <Facebook size={17} />
            <Instagram size={17} />
          </div>
        </div>

        <div>
          <p className="text-sm font-bold mb-3">Quick links</p>
          <ul className="space-y-2 text-sm text-white/85">
            <li>Store locator</li>
            <li>Shipping policy</li>
            <li>Return and exchange policy</li>
            <li>Refund policy</li>
            <li>Privacy policy</li>
            <li>Contact us</li>
          </ul>
        </div>

        <div className="sm:col-span-2 md:col-span-2">
          <p className="text-sm font-bold mb-3">Newsletter signup</p>
          <p className="text-sm text-white/85 mb-3">Subscribe for new arrivals and offers.</p>
          {subscribed ? (
            <p className="text-sm font-medium flex items-center gap-2"><Check size={16} /> Subscribed</p>
          ) : (
            <div className="flex rounded-full overflow-hidden bg-white max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="flex-1 px-4 py-2.5 text-sm outline-none"
                style={{ color: INK }}
              />
              <button
                onClick={() => email.includes("@") && setSubscribed(true)}
                className="px-5 text-sm font-semibold flex-shrink-0"
                style={{ backgroundColor: INK, color: "#fff" }}
              >
                Subscribe
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 mt-6">
            {["Visa", "Mastercard", "UnionPay", "JCB"].map((p) => (
              <span key={p} className="text-[10px] font-semibold bg-white rounded px-2 py-1" style={{ color: INK }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10 pt-6 border-t border-white/20 text-xs text-white/70">
        Copyright 2026 HipKids. All rights reserved.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile bottom nav                                                  */
/* ------------------------------------------------------------------ */
function MobileBottomNav({ cartCount, wishlistCount, onSearchOpen, onMenuOpen }) {
  const items = [
    { icon: Home, label: "Shop", onClick: onMenuOpen, count: 0 },
    { icon: Heart, label: "Wishlist", count: wishlistCount },
    { icon: ShoppingCart, label: "Cart", count: cartCount },
    { icon: User, label: "Account", count: 0 },
    { icon: Search, label: "Search", onClick: onSearchOpen, count: 0 },
  ];
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t flex items-stretch"
      style={{ borderColor: "#EFEEE9" }}
    >
      {items.map((it) => (
        <button
          key={it.label}
          onClick={it.onClick}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative"
        >
          <span className="relative">
            <it.icon size={19} color={INK} strokeWidth={1.75} />
            {it.count > 0 && (
              <span
                className="absolute -top-1.5 -right-2 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: it.label === "Cart" ? TEAL : CORAL }}
              >
                {it.count}
              </span>
            )}
          </span>
          <span className="text-[10px] font-medium" style={{ color: INK }}>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Floating WhatsApp                                                  */
/* ------------------------------------------------------------------ */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923334475437"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 z-30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} color="#fff" fill="#fff" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Quick shop modal                                                   */
/* ------------------------------------------------------------------ */
function QuickShopModal({ product, onClose, onAddToCart }) {
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  if (!product) return null;

  const handleAdd = () => {
    if (!size) {
      setError("Pick a size first");
      return;
    }
    onAddToCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-5 max-h-[88vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full" style={{ backgroundColor: "#F3F2EE" }} aria-label="Close">
          <X size={16} color={INK} />
        </button>

        <SwatchImage swatch={product.swatch} alt={product.title} className="w-full h-48 rounded-xl">
          {product.title.split(" ")[0]}
        </SwatchImage>

        <p className="text-base font-semibold mt-4" style={{ color: INK }}>{product.title}</p>
        <div className="flex items-center gap-2 mt-1">
          {product.originalPrice && (
            <span className="text-sm line-through" style={{ color: "#B7B6AF" }}>{formatPKR(product.originalPrice)}</span>
          )}
          <span className="text-lg font-bold" style={{ color: product.originalPrice ? CORAL : INK }}>{formatPKR(product.price)}</span>
        </div>

        <p className="text-xs font-semibold mt-5 mb-2" style={{ color: INK }}>Size</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => { setSize(s); setError(""); }}
              className="text-xs font-medium px-3 py-2 rounded-full border"
              style={{
                borderColor: size === s ? TEAL : "#E3E1DB",
                backgroundColor: size === s ? TEAL_TINT : "#fff",
                color: size === s ? TEAL_DARK : INK,
              }}
            >
              {s}
            </button>
          ))}
        </div>
        {error && <p className="text-xs mt-2" style={{ color: CORAL }}>{error}</p>}

        <p className="text-xs font-semibold mt-5 mb-2" style={{ color: INK }}>Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-full border flex items-center justify-center"
            style={{ borderColor: "#E3E1DB" }}
            aria-label="Decrease quantity"
          >
            <Minus size={14} color={INK} />
          </button>
          <span className="text-sm font-semibold w-4 text-center" style={{ color: INK }}>{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-8 h-8 rounded-full border flex items-center justify-center"
            style={{ borderColor: "#E3E1DB" }}
            aria-label="Increase quantity"
          >
            <Plus size={14} color={INK} />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="w-full mt-6 rounded-full py-3 text-sm font-semibold text-white flex items-center justify-center gap-2"
          style={{ backgroundColor: TEAL }}
        >
          <ShoppingCart size={16} /> Add to cart
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Root app                                                            */
/* ------------------------------------------------------------------ */
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [quickShopProduct, setQuickShopProduct] = useState(null);
  const [toast, setToast] = useState("");

  const toggleWishlist = useCallback((id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  }, []);

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
    setToast("Added to cart");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <AnnouncementBar />
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onMenuOpen={() => setDrawerOpen(true)}
        onSearchOpen={() => setDrawerOpen(true)}
      />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="pb-24 md:pb-0">
        <HeroCarousel />
        <ShopByAge />
        <FeaturedCollections />
        <BrandStrip />
        <NewArrivals onQuickShop={setQuickShopProduct} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
        <PremiumFootwear onQuickShop={setQuickShopProduct} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
        <TrustBar />
        <Testimonials />
      </main>

      <Footer />
      <MobileBottomNav
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onMenuOpen={() => setDrawerOpen(true)}
        onSearchOpen={() => setDrawerOpen(true)}
      />
      <WhatsAppButton />

      <QuickShopModal
        product={quickShopProduct}
        onClose={() => setQuickShopProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {toast && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 text-sm font-medium text-white px-4 py-2 rounded-full shadow-lg"
          style={{ backgroundColor: INK }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

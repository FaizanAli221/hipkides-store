import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Search, Heart, ShoppingCart, ChevronLeft, ChevronRight,
  Star, Truck, Headphones, RotateCcw, ShieldCheck, MapPin, Mail, Phone,
  Home, User, Plus, Minus, MessageCircle,
  Check, Trash2, ArrowRight, Loader2, AlertCircle
} from "lucide-react";
import api from "./api/client";

function FacebookIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Design tokens                                                      */
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

const SWATCH_MAP = [
  PASTELS.blue,
  PASTELS.pink,
  PASTELS.mint,
  PASTELS.yellow,
];

function getSwatchForProduct(product, index = 0) {
  if (product.gender === "baby-boy" || product.gender === "boy") {
    return (index % 2 === 0) ? PASTELS.blue : PASTELS.mint;
  }
  if (product.gender === "baby-girl" || product.gender === "girl") {
    return (index % 2 === 0) ? PASTELS.pink : PASTELS.yellow;
  }
  return SWATCH_MAP[index % SWATCH_MAP.length];
}

const DEFAULT_CATEGORIES = [
  { id: "new-born", slug: "new-born", name: "New Born", label: "New Born" },
  { id: "baby-boy", slug: "baby-boy", name: "Baby Boy", label: "Baby Boy" },
  { id: "baby-girl", slug: "baby-girl", name: "Baby Girl", label: "Baby Girl" },
  { id: "footwear", slug: "footwear", name: "Footwear", label: "Footwear" },
  { id: "accessories", slug: "accessories", name: "Accessories", label: "Accessories" },
  { id: "sale", slug: "sale", name: "Sale", label: "Sale" },
];

const AGE_GROUPS = [
  { id: "baby-boy", label: "Baby Boy", gender: "baby-boy", sub: "0 - 2y", swatch: PASTELS.blue },
  { id: "baby-girl", label: "Baby Girl", gender: "baby-girl", sub: "0 - 2y", swatch: PASTELS.pink },
  { id: "boy", label: "Boys", gender: "boy", sub: "2 - 10y", swatch: PASTELS.mint },
  { id: "girl", label: "Girls", gender: "girl", sub: "2 - 10y", swatch: PASTELS.yellow },
];

const DEFAULT_HERO_SLIDES = [
  { id: 1, eyebrow: "Limited sizes left", title: "40% off sneakers", sub: "Premium footwear for little feet", cta: "Shop now", swatch: PASTELS.blue },
  { id: 2, eyebrow: "New season", title: "Autumn rompers", sub: "Soft cotton, made to move", cta: "Shop now", swatch: PASTELS.mint },
  { id: 3, eyebrow: "Just landed", title: "Party dresses", sub: "For every little occasion", cta: "Shop now", swatch: PASTELS.pink },
];

const BRANDS = ["Next", "Primark", "Carter's", "Polo", "Tommy Hilfiger", "Chicco", "TOMS"];

const TESTIMONIALS = [
  { id: 1, name: "Kanza Fatima", initials: "KF", rating: 5, title: "Baby Girl 3pk Sleepsuits, Butterfly Print", body: "Fabric is soft and the sizing was spot on. Will order again for sure.", swatch: PASTELS.pink },
  { id: 2, name: "Waqas Akbar", initials: "WA", rating: 5, title: "Baby Boy Checked Navy Formal Suit", body: "Looked exactly like the pictures, and it arrived two days early.", swatch: PASTELS.blue },
  { id: 3, name: "Ayesha Noor", initials: "AN", rating: 4, title: "Girl Pleated Sundress, Sage Green", body: "Lovely stitching. Slightly long in the sleeve but easy to fix.", swatch: PASTELS.mint },
  { id: 4, name: "Bilal Sheikh", initials: "BS", rating: 5, title: "C&J Boy Grey Slip-On Sneakers", body: "Grip is great for a toddler learning to run. Comfy from day one.", swatch: PASTELS.yellow },
];

const formatPKR = (n) => `Rs. ${Number(n || 0).toLocaleString("en-PK")}`;

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */
function Stars({ rating, size = 13 }) {
  const full = Math.round(rating || 5);
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
  const bg = swatch?.bg || PASTELS.blue.bg;
  const text = swatch?.text || PASTELS.blue.text;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: bg }}
      role="img"
      aria-label={alt}
    >
      <span
        className="font-semibold tracking-tight opacity-85 text-center px-2 select-none"
        style={{ color: text, fontFamily: "'Baloo 2', sans-serif" }}
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
      className="w-full text-center text-xs sm:text-sm font-medium py-2 px-4 select-none"
      style={{ backgroundColor: INK, color: "#fff" }}
    >
      Free shipping on orders above Rs. 3,500 <span className="hidden sm:inline">— 100% authentic and imported</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */
function Header({ cartCount, wishlistCount, onMenuOpen, onSearchOpen, onCartOpen, categories }) {
  const navCategories = categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b" style={{ borderColor: "#EFEEE9" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 py-3">
        <button
          onClick={onMenuOpen}
          className="md:hidden p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} color={INK} />
        </button>

        <a href="#" className="flex items-center gap-2 select-none no-underline">
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
        </a>

        <nav className="hidden md:flex items-center gap-6 mx-6">
          {navCategories.map((c) => (
            <a
              key={c.id || c.slug}
              href={`#${c.slug || c.id}`}
              className="text-sm font-medium hover:opacity-75 transition-opacity"
              style={{ color: c.slug === "sale" ? CORAL : INK }}
            >
              {c.name || c.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 max-w-xs cursor-pointer" onClick={onSearchOpen}>
          <div className="flex items-center w-full rounded-full px-3 py-2 gap-2 transition-all hover:ring-1 hover:ring-teal-400" style={{ backgroundColor: "#F3F2EE" }}>
            <Search size={16} color="#8B8A83" />
            <span className="text-sm select-none" style={{ color: "#8B8A83" }}>
              Search for rompers, sneakers...
            </span>
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
                className="absolute -top-0.5 -right-0.5 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white animate-scale-in"
                style={{ backgroundColor: CORAL }}
              >
                {wishlistCount}
              </span>
            )}
          </button>
          <button onClick={onCartOpen} className="relative p-2 rounded-full active:bg-gray-100 transition-transform active:scale-95" aria-label="Cart">
            <ShoppingCart size={20} color={INK} />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white animate-scale-in"
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
function MobileDrawer({ open, onClose, categories, onSelectCategory }) {
  const [tab, setTab] = useState("menu");
  const navCategories = categories.length > 0 ? categories : DEFAULT_CATEGORIES;

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
              <li
                onClick={() => { onSelectCategory && onSelectCategory(null); onClose(); }}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium cursor-pointer hover:bg-gray-50"
                style={{ color: INK }}
              >
                <Home size={16} /> All Products
              </li>
              {navCategories.map((c) => (
                <li
                  key={c.id || c.slug}
                  onClick={() => { onSelectCategory && onSelectCategory(c.slug); onClose(); }}
                  className="flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-gray-50"
                  style={{ color: c.slug === "sale" ? CORAL : INK }}
                >
                  <span className="font-medium">{c.name || c.label}</span>
                  <ChevronRight size={15} color="#B7B6AF" />
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {AGE_GROUPS.map((a) => (
                <li
                  key={a.id}
                  onClick={() => { onSelectCategory && onSelectCategory(a.gender); onClose(); }}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50"
                >
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
function HeroCarousel({ promos }) {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  const slides = promos && promos.length > 0
    ? promos.map((p, i) => ({
        id: p.id,
        eyebrow: p.subtitle || "Exclusive Collection",
        title: p.title,
        sub: p.discountText ? `Enjoy ${p.discountText} on our curated selection` : "Soft cotton & comfortable fit, made to move",
        cta: p.ctaText || "Shop now",
        swatch: SWATCH_MAP[i % SWATCH_MAP.length],
      }))
    : DEFAULT_HERO_SLIDES;

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer.current);
  }, [slides.length]);

  const go = (dir) => {
    clearInterval(timer.current);
    setIndex((i) => (i + dir + slides.length) % slides.length);
  };

  const slide = slides[index] || slides[0];

  return (
    <section className="relative max-w-6xl mx-auto px-4 pt-4">
      <div
        className="relative rounded-2xl overflow-hidden flex items-center h-60 sm:h-72 md:h-80 transition-all duration-500"
        style={{ backgroundColor: slide.swatch.bg }}
      >
        <div className="px-6 sm:px-10 max-w-md z-10">
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: slide.swatch.text }}>
            {slide.eyebrow}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2"
            style={{ color: INK, fontFamily: "'Baloo 2', sans-serif" }}
          >
            {slide.title}
          </h2>
          <p className="text-sm sm:text-base mb-5" style={{ color: "#5B5A54" }}>
            {slide.sub}
          </p>
          <a
            href="#products"
            className="inline-block rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 shadow hover:shadow-md"
            style={{ backgroundColor: INK }}
          >
            {slide.cta}
          </a>
        </div>

        <button
          onClick={() => go(-1)}
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 shadow items-center justify-center hover:bg-white transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} color={INK} />
        </button>
        <button
          onClick={() => go(1)}
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 shadow items-center justify-center hover:bg-white transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={18} color={INK} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        {slides.map((s, i) => (
          <button
            key={s.id || i}
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
function ShopByAge({ onSelectGroup }) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-10">
      <SectionHeading label="Shop by age" />
      <div className="flex justify-between sm:justify-center sm:gap-10 mt-6 overflow-x-auto pb-2 no-scrollbar">
        {AGE_GROUPS.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelectGroup && onSelectGroup(a.gender)}
            className="flex flex-col items-center gap-2 flex-shrink-0 group transition-transform active:scale-95"
          >
            <span
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all group-hover:scale-105"
              style={{ backgroundColor: a.swatch.bg, borderColor: TEAL_TINT }}
            >
              <span className="text-xs font-semibold" style={{ color: a.swatch.text, fontFamily: "'Baloo 2', sans-serif" }}>
                {a.label.split(" ")[0]}
              </span>
            </span>
            <span className="text-xs font-semibold" style={{ color: INK }}>{a.label}</span>
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
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: INK, fontFamily: "'Baloo 2', sans-serif" }}>
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
function FeaturedCollections({ onSelectCategory }) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-10">
      <SectionHeading label="Collections" />
      <div className="grid grid-cols-2 gap-3 sm:gap-5 mt-6">
        <div
          onClick={() => onSelectCategory && onSelectCategory("baby-boy")}
          className="relative rounded-2xl h-36 sm:h-52 flex items-end p-5 overflow-hidden cursor-pointer group shadow-sm transition-transform hover:-translate-y-1"
          style={{ backgroundColor: PASTELS.mint.bg }}
        >
          <span className="text-lg sm:text-2xl font-bold group-hover:underline" style={{ color: PASTELS.mint.text, fontFamily: "'Baloo 2', sans-serif" }}>
            Apparel & Rompers
          </span>
        </div>
        <div
          onClick={() => onSelectCategory && onSelectCategory("footwear")}
          className="relative rounded-2xl h-36 sm:h-52 flex items-end p-5 overflow-hidden cursor-pointer group shadow-sm transition-transform hover:-translate-y-1"
          style={{ backgroundColor: PASTELS.yellow.bg }}
        >
          <span className="text-lg sm:text-2xl font-bold group-hover:underline" style={{ color: PASTELS.yellow.text, fontFamily: "'Baloo 2', sans-serif" }}>
            Footwear & Boots
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
function ProductCard({ product, onQuickShop, onToggleWishlist, wished, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const swatch = product.swatch || getSwatchForProduct(product, index);

  const discount = product.discountPercent || product.discount || 0;
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div
      className="group relative flex flex-col transition-all"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative rounded-xl overflow-hidden aspect-square shadow-sm">
        <SwatchImage
          swatch={swatch}
          alt={product.title}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        >
          {product.title.split(" ").slice(0, 3).join(" ")}
        </SwatchImage>

        {discount > 0 && (
          <span
            className="absolute top-2 right-2 text-[11px] font-bold text-white px-2 py-0.5 rounded-full shadow"
            style={{ backgroundColor: CORAL }}
          >
            -{discount}%
          </span>
        )}
        {product.isNewArrival && discount === 0 && (
          <span
            className="absolute top-2 right-2 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm"
            style={{ backgroundColor: TEAL_TINT, color: TEAL_DARK }}
          >
            New
          </span>
        )}

        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-all active:scale-90"
          aria-label="Add to wishlist"
        >
          <Heart size={14} fill={wished ? CORAL : "none"} color={wished ? CORAL : INK} />
        </button>

        <button
          onClick={() => onQuickShop(product)}
          disabled={isOutOfStock}
          className="absolute bottom-2 left-2 right-2 rounded-full bg-white text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 sm:transition-all sm:duration-200 max-sm:opacity-100 max-sm:translate-y-0 shadow hover:bg-gray-50 active:scale-95 disabled:opacity-50"
          style={{ color: TEAL_DARK }}
        >
          <ShoppingCart size={13} /> {isOutOfStock ? "Out of stock" : "Quick shop"}
        </button>
      </div>

      <p className="text-xs sm:text-sm font-semibold mt-2.5 leading-snug line-clamp-2" style={{ color: INK }}>
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

/* ------------------------------------------------------------------ */
/* New arrivals (tabbed grid)                                         */
/* ------------------------------------------------------------------ */
function NewArrivals({ products, loading, onQuickShop, wishlist, onToggleWishlist, activeTab, onTabChange }) {
  const filtered = products.filter((p) => {
    if (activeTab === "baby-boy") return p.gender === "baby-boy" || p.category === "baby-boy";
    if (activeTab === "baby-girl") return p.gender === "baby-girl" || p.category === "baby-girl";
    if (activeTab === "boy") return p.gender === "boy" || p.category === "boy";
    if (activeTab === "girl") return p.gender === "girl" || p.category === "girl";
    return true;
  });

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 pt-12">
      <SectionHeading label="New arrivals" sub="Trendy styles for little ones" />

      <div className="flex justify-center gap-6 sm:gap-8 mt-6 border-b overflow-x-auto no-scrollbar" style={{ borderColor: "#EFEEE9" }}>
        {AGE_GROUPS.map((a) => (
          <button
            key={a.id}
            onClick={() => onTabChange(a.id)}
            className="pb-3 text-sm font-semibold whitespace-nowrap transition-colors"
            style={{
              color: activeTab === a.id ? TEAL_DARK : "#9C9B95",
              borderBottom: activeTab === a.id ? `2px solid ${TEAL}` : "2px solid transparent",
            }}
          >
            {a.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="animate-spin" size={28} color={TEAL} />
          <p className="text-sm" style={{ color: "#8B8A83" }}>Loading fresh arrivals...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-400">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-10 mt-7">
          {filtered.map((p, idx) => (
            <ProductCard
              key={p.id}
              product={p}
              index={idx}
              onQuickShop={onQuickShop}
              onToggleWishlist={onToggleWishlist}
              wished={wishlist.includes(p.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Premium footwear grid                                              */
/* ------------------------------------------------------------------ */
function PremiumFootwear({ products, loading, onQuickShop, wishlist, onToggleWishlist }) {
  return (
    <section id="footwear" className="max-w-6xl mx-auto px-4 pt-12">
      <SectionHeading
        label="Premium footwear"
        sub="Perfect pairs for little feet"
        action={
          <a href="#products" className="hidden sm:flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1.5 transition-colors" style={{ backgroundColor: INK, color: "#fff" }}>
            View all <ChevronRight size={13} />
          </a>
        }
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <Loader2 className="animate-spin" size={24} color={TEAL} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-10 mt-7">
          {products.map((p, idx) => (
            <ProductCard
              key={p.id}
              product={p}
              index={idx}
              onQuickShop={onQuickShop}
              onToggleWishlist={onToggleWishlist}
              wished={wishlist.includes(p.id)}
            />
          ))}
        </div>
      )}
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
    { icon: ShieldCheck, title: "Secure payment", sub: "Cash on delivery & secure cards" },
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
          className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center flex-shrink-0 hover:bg-gray-200 transition-colors"
          style={{ backgroundColor: "#F3F2EE" }}
          aria-label="Previous review"
        >
          <ChevronLeft size={16} color={INK} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
          {shown.map((t) => (
            <div key={t.id} className="rounded-2xl p-5 shadow-sm border border-gray-100" style={{ backgroundColor: "#F9F8F5" }}>
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
                <span className="text-xs font-semibold" style={{ color: INK }}>{t.name}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => go(1)}
          className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center flex-shrink-0 hover:bg-gray-200 transition-colors"
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
/* Footer with real Newsletter API                                     */
/* ------------------------------------------------------------------ */
function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e) => {
    e?.preventDefault();
    if (!email || !email.includes("@")) {
      setMsg("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    setMsg("");
    try {
      const res = await api.subscribeNewsletter(email);
      setMsg(res.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setMsg(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <FacebookIcon size={17} className="cursor-pointer hover:opacity-80" />
            <InstagramIcon size={17} className="cursor-pointer hover:opacity-80" />
          </div>
        </div>

        <div>
          <p className="text-sm font-bold mb-3">Quick links</p>
          <ul className="space-y-2 text-sm text-white/85">
            <li>Store locator</li>
            <li>Shipping policy</li>
            <li>Return & exchange policy</li>
            <li>Refund policy</li>
            <li>Privacy policy</li>
            <li>Contact us</li>
          </ul>
        </div>

        <div className="sm:col-span-2 md:col-span-2">
          <p className="text-sm font-bold mb-3">Newsletter signup</p>
          <p className="text-sm text-white/85 mb-3">Subscribe for new arrivals, discounts, and exclusive offers.</p>

          <form onSubmit={handleSubscribe} className="flex rounded-full overflow-hidden bg-white max-w-sm shadow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="flex-1 px-4 py-2.5 text-sm outline-none"
              style={{ color: INK }}
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-5 text-sm font-semibold flex items-center gap-1.5 flex-shrink-0 hover:bg-gray-800 transition-colors disabled:opacity-60"
              style={{ backgroundColor: INK, color: "#fff" }}
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : "Subscribe"}
            </button>
          </form>

          {msg && (
            <p className="text-xs mt-2 font-medium text-white/95 flex items-center gap-1">
              <Check size={13} /> {msg}
            </p>
          )}

          <div className="flex items-center gap-2 mt-6">
            {["Visa", "Mastercard", "UnionPay", "Cash on Delivery"].map((p) => (
              <span key={p} className="text-[10px] font-semibold bg-white rounded px-2 py-1" style={{ color: INK }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10 pt-6 border-t border-white/20 text-xs text-white/70">
        Copyright 2026 HipKids. Connected to live Express REST API.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile bottom nav                                                  */
/* ------------------------------------------------------------------ */
function MobileBottomNav({ cartCount, wishlistCount, onSearchOpen, onMenuOpen, onCartOpen }) {
  const items = [
    { icon: Home, label: "Shop", onClick: onMenuOpen, count: 0 },
    { icon: Heart, label: "Wishlist", count: wishlistCount },
    { icon: ShoppingCart, label: "Cart", onClick: onCartOpen, count: cartCount },
    { icon: Search, label: "Search", onClick: onSearchOpen, count: 0 },
  ];
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t flex items-stretch shadow-lg"
      style={{ borderColor: "#EFEEE9" }}
    >
      {items.map((it) => (
        <button
          key={it.label}
          onClick={it.onClick}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative active:bg-gray-50 transition-colors"
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
      className="fixed bottom-20 md:bottom-6 right-4 z-30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
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

  const availableSizes = product.sizes && product.sizes.length > 0
    ? product.sizes
    : ["0-3m", "3-6m", "6-12m", "1-2y"];

  const handleAdd = () => {
    if (!size) {
      setError("Please select a size first");
      return;
    }
    onAddToCart(product, size, qty);
    onClose();
  };

  const swatch = product.swatch || getSwatchForProduct(product, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-5 max-h-[88vh] overflow-y-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-200 transition-colors" style={{ backgroundColor: "#F3F2EE" }} aria-label="Close">
          <X size={16} color={INK} />
        </button>

        <SwatchImage swatch={swatch} alt={product.title} className="w-full h-48 rounded-xl shadow-inner">
          {product.title.split(" ").slice(0, 3).join(" ")}
        </SwatchImage>

        <p className="text-base font-bold mt-4" style={{ color: INK }}>{product.title}</p>
        <div className="flex items-center gap-2 mt-1">
          {product.originalPrice && (
            <span className="text-sm line-through" style={{ color: "#B7B6AF" }}>{formatPKR(product.originalPrice)}</span>
          )}
          <span className="text-lg font-bold" style={{ color: product.originalPrice ? CORAL : INK }}>{formatPKR(product.price)}</span>
          {product.stock !== undefined && (
            <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{ backgroundColor: TEAL_TINT, color: TEAL_DARK }}>
              {product.stock} in stock
            </span>
          )}
        </div>

        <p className="text-xs font-bold mt-5 mb-2 uppercase tracking-wide" style={{ color: INK }}>Select Size</p>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((s) => (
            <button
              key={s}
              onClick={() => { setSize(s); setError(""); }}
              className="text-xs font-semibold px-3.5 py-2 rounded-full border transition-all"
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
        {error && <p className="text-xs mt-2 font-medium" style={{ color: CORAL }}>{error}</p>}

        <p className="text-xs font-bold mt-5 mb-2 uppercase tracking-wide" style={{ color: INK }}>Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
            style={{ borderColor: "#E3E1DB" }}
            aria-label="Decrease quantity"
          >
            <Minus size={14} color={INK} />
          </button>
          <span className="text-sm font-bold w-6 text-center" style={{ color: INK }}>{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
            style={{ borderColor: "#E3E1DB" }}
            aria-label="Increase quantity"
          >
            <Plus size={14} color={INK} />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="w-full mt-6 rounded-full py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 shadow hover:opacity-95 active:scale-98 transition-all"
          style={{ backgroundColor: TEAL }}
        >
          <ShoppingCart size={16} /> Add to cart • {formatPKR(product.price * qty)}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cart Drawer                                                        */
/* ------------------------------------------------------------------ */
function CartDrawer({ open, onClose, items, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  const freeShippingThreshold = 3500;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 200;
  const total = subtotal + shippingFee;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs" onClick={onClose} />
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#EFEEE9" }}>
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} color={TEAL} />
            <h3 className="font-bold text-base" style={{ color: INK, fontFamily: "'Baloo 2', sans-serif" }}>
              Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close cart">
            <X size={18} color={INK} />
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="px-5 py-3 bg-[#FDFBF7] border-b" style={{ borderColor: "#EFEEE9" }}>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5" style={{ color: INK }}>
            <span>{subtotal >= freeShippingThreshold ? "🎉 You got FREE shipping!" : `Add ${formatPKR(freeShippingThreshold - subtotal)} more for free shipping`}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%`, backgroundColor: TEAL }}
            />
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-5 divide-y" style={{ divideColor: "#F3F2EE" }}>
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <ShoppingCart size={40} color="#D1D0C9" />
              <p className="text-sm font-semibold" style={{ color: INK }}>Your bag is empty</p>
              <p className="text-xs max-w-xs" style={{ color: "#8B8A83" }}>
                Explore our rompers, sets, and sneakers to fill your bag!
              </p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.product.id}-${item.size}-${idx}`} className="py-4 first:pt-0 flex gap-3">
                <div
                  className="w-18 h-18 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-center px-1"
                  style={{ backgroundColor: item.product.swatch?.bg || PASTELS.blue.bg, color: item.product.swatch?.text || PASTELS.blue.text }}
                >
                  {item.product.title.split(" ")[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-xs sm:text-sm font-semibold truncate" style={{ color: INK }}>
                      {item.product.title}
                    </p>
                    <button
                      onClick={() => onRemove(idx)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p className="text-xs mt-0.5" style={{ color: "#8B8A83" }}>
                    Size: <span className="font-semibold text-gray-700">{item.size}</span>
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border rounded-full px-2 py-0.5" style={{ borderColor: "#E3E1DB" }}>
                      <button
                        onClick={() => onUpdateQty(idx, item.quantity - 1)}
                        className="p-0.5 text-gray-500 hover:text-black"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(idx, item.quantity + 1)}
                        className="p-0.5 text-gray-500 hover:text-black"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="text-xs font-bold" style={{ color: INK }}>
                      {formatPKR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer breakdown */}
        {items.length > 0 && (
          <div className="p-5 border-t bg-gray-50/50" style={{ borderColor: "#EFEEE9" }}>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between" style={{ color: "#5B5A54" }}>
                <span>Subtotal</span>
                <span className="font-semibold">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between" style={{ color: "#5B5A54" }}>
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-teal-600">FREE</strong> : formatPKR(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t" style={{ borderColor: "#EFEEE9", color: INK }}>
                <span>Estimated Total</span>
                <span>{formatPKR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => { onClose(); onCheckout(); }}
              className="w-full mt-4 rounded-full py-3 text-sm font-bold text-white flex items-center justify-center gap-2 shadow hover:opacity-95 active:scale-98 transition-all"
              style={{ backgroundColor: TEAL }}
            >
              Checkout <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checkout Modal                                                     */
/* ------------------------------------------------------------------ */
function CheckoutModal({ open, onClose, items, onOrderPlaced }) {
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    paymentMethod: "COD",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successOrder, setSuccessOrder] = useState(null);

  if (!open) return null;

  const subtotal = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  const shippingFee = subtotal >= 3500 ? 0 : 200;
  const total = subtotal + shippingFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.customerName.trim()) return setError("Customer name is required");
    if (!form.email.includes("@")) return setError("A valid email is required");
    if (form.phone.trim().length < 7) return setError("A valid phone number is required");
    if (form.shippingAddress.trim().length < 5) return setError("Shipping address is required");

    const payload = {
      customerName: form.customerName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      shippingAddress: form.shippingAddress.trim(),
      paymentMethod: form.paymentMethod,
      items: items.map((it) => ({
        productId: it.product.id,
        size: it.size,
        quantity: it.quantity,
      })),
    };

    setSubmitting(true);
    try {
      const res = await api.createOrder(payload);
      if (res.success) {
        setSuccessOrder(res.data);
        onOrderPlaced();
      } else {
        setError(res.message || "Could not place order");
      }
    } catch (err) {
      setError(err.message || "Failed to submit order. Please check backend connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100" aria-label="Close">
          <X size={18} color={INK} />
        </button>

        {successOrder ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: TEAL_TINT }}>
              <Check size={28} color={TEAL_DARK} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: INK, fontFamily: "'Baloo 2', sans-serif" }}>
              Order Confirmed!
            </h3>
            <p className="text-sm font-semibold mb-1" style={{ color: TEAL_DARK }}>
              Order ID: #{successOrder.id}
            </p>
            <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
              Thank you {successOrder.customerName}! We have received your order for {formatPKR(successOrder.total)} via {successOrder.paymentMethod}. A confirmation has been sent to {successOrder.email}.
            </p>

            <div className="border rounded-xl p-4 text-left text-xs space-y-2 mb-6" style={{ borderColor: "#EFEEE9", backgroundColor: "#FAF9F6" }}>
              <p><strong>Shipping to:</strong> {successOrder.shippingAddress}</p>
              <p><strong>Phone:</strong> {successOrder.phone}</p>
              <p><strong>Status:</strong> <span className="capitalize text-amber-600 font-semibold">{successOrder.status}</span></p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full px-8 py-2.5 text-sm font-bold text-white shadow hover:opacity-95 transition-all"
              style={{ backgroundColor: TEAL }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold mb-1" style={{ color: INK, fontFamily: "'Baloo 2', sans-serif" }}>
              Express Checkout
            </h3>
            <p className="text-xs text-gray-500 mb-5">Enter delivery details to finalize your order.</p>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg text-xs mb-4 font-medium" style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}>
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold block mb-1" style={{ color: INK }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  placeholder="e.g. Ayesha Noor"
                  className="w-full px-3.5 py-2.5 rounded-lg border outline-none focus:ring-1 focus:ring-teal-400"
                  style={{ borderColor: "#D8D6CE" }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1" style={{ color: INK }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border outline-none focus:ring-1 focus:ring-teal-400"
                    style={{ borderColor: "#D8D6CE" }}
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1" style={{ color: INK }}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-lg border outline-none focus:ring-1 focus:ring-teal-400"
                    style={{ borderColor: "#D8D6CE" }}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: INK }}>Delivery Address</label>
                <textarea
                  rows={2}
                  required
                  value={form.shippingAddress}
                  onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
                  placeholder="House/Apartment #, Street, Area, City"
                  className="w-full px-3.5 py-2 rounded-lg border outline-none focus:ring-1 focus:ring-teal-400"
                  style={{ borderColor: "#D8D6CE" }}
                />
              </div>

              <div>
                <label className="font-semibold block mb-1" style={{ color: INK }}>Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: "COD" })}
                    className="py-2.5 px-3 rounded-lg border text-center font-semibold transition-all"
                    style={{
                      borderColor: form.paymentMethod === "COD" ? TEAL : "#E3E1DB",
                      backgroundColor: form.paymentMethod === "COD" ? TEAL_TINT : "#fff",
                      color: form.paymentMethod === "COD" ? TEAL_DARK : INK,
                    }}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, paymentMethod: "Card" })}
                    className="py-2.5 px-3 rounded-lg border text-center font-semibold transition-all"
                    style={{
                      borderColor: form.paymentMethod === "Card" ? TEAL : "#E3E1DB",
                      backgroundColor: form.paymentMethod === "Card" ? TEAL_TINT : "#fff",
                      color: form.paymentMethod === "Card" ? TEAL_DARK : INK,
                    }}
                  >
                    Credit / Debit Card
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: "#EFEEE9" }}>
              <div>
                <span className="text-gray-500">Total payable: </span>
                <strong className="text-sm" style={{ color: INK }}>{formatPKR(total)}</strong>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full px-6 py-2.5 font-bold text-white flex items-center gap-2 shadow hover:opacity-95 active:scale-98 transition-all disabled:opacity-50"
                style={{ backgroundColor: TEAL }}
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : "Place Order"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search Modal with live API search                                  */
/* ------------------------------------------------------------------ */
function SearchModal({ open, onClose, onQuickShop }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({ search: query.trim(), limit: 8 });
        if (res.success) {
          setResults(res.data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl p-5 overflow-hidden">
        <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "#EFEEE9" }}>
          <Search size={18} color="#8B8A83" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products (e.g., Chicco, romper, boots)..."
            className="flex-1 outline-none text-sm"
            style={{ color: INK }}
          />
          {loading && <Loader2 size={16} className="animate-spin text-gray-400" />}
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close search">
            <X size={18} color={INK} />
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {query && !loading && results.length === 0 ? (
            <p className="text-xs text-center py-8 text-gray-400">No products matching "{query}"</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => { onQuickShop(p); onClose(); }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                >
                  <SwatchImage
                    swatch={getSwatchForProduct(p, idx)}
                    alt={p.title}
                    className="w-14 h-14 rounded-lg flex-shrink-0 text-[10px]"
                  >
                    {p.title.split(" ")[0]}
                  </SwatchImage>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold truncate" style={{ color: INK }}>{p.title}</p>
                    <p className="text-xs font-bold mt-1" style={{ color: TEAL_DARK }}>{formatPKR(p.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Root app                                                            */
/* ------------------------------------------------------------------ */
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickShopProduct, setQuickShopProduct] = useState(null);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");

  // Live Backend Data States
  const [promos, setPromos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [footwear, setFootwear] = useState([]);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const [loadingFootwear, setLoadingFootwear] = useState(true);
  const [activeTab, setActiveTab] = useState("baby-boy");

  // Load Promos, Categories, and Products from Backend
  useEffect(() => {
    async function initData() {
      try {
        const [promoRes, catRes, prodRes] = await Promise.allSettled([
          api.getPromos(),
          api.getCategories(),
          api.getProducts({ limit: 50 }),
        ]);

        if (promoRes.status === "fulfilled" && promoRes.value.success) {
          setPromos(promoRes.value.data);
        }
        if (catRes.status === "fulfilled" && catRes.value.success) {
          setCategories(catRes.value.data);
        }
        if (prodRes.status === "fulfilled" && prodRes.value.success) {
          const allProds = prodRes.value.data;
          setNewArrivals(allProds.filter((p) => p.isNewArrival));
          setFootwear(allProds.filter((p) => p.category === "footwear"));
        }
      } catch (err) {
        console.warn("Backend connection issue, falling back to defaults:", err);
      } finally {
        setLoadingNewArrivals(false);
        setLoadingFootwear(false);
      }
    }
    initData();
  }, []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  }, []);

  const handleAddToCart = (product, size, quantity) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [...prev, { product, size, quantity }];
    });

    setToast(`Added ${quantity}x "${product.title}" (${size}) to bag`);
    setTimeout(() => setToast(""), 2500);
  };

  const handleUpdateCartQty = (idx, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(idx);
    } else {
      setCart((prev) => {
        const copy = [...prev];
        copy[idx].quantity = newQty;
        return copy;
      });
    }
  };

  const handleRemoveFromCart = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const totalCartCount = cart.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAFAF8", fontFamily: "'Inter', sans-serif" }}>
      <AnnouncementBar />

      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        categories={categories}
        onMenuOpen={() => setDrawerOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={() => setCartOpen(true)}
      />

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        onSelectCategory={(slug) => {
          if (slug) setActiveTab(slug);
        }}
      />

      <main className="pb-24 md:pb-0">
        <HeroCarousel promos={promos} />
        <ShopByAge onSelectGroup={(gender) => setActiveTab(gender)} />
        <FeaturedCollections onSelectCategory={(cat) => setActiveTab(cat)} />
        <BrandStrip />

        <NewArrivals
          products={newArrivals}
          loading={loadingNewArrivals}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onQuickShop={setQuickShopProduct}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />

        <PremiumFootwear
          products={footwear}
          loading={loadingFootwear}
          onQuickShop={setQuickShopProduct}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />

        <TrustBar />
        <Testimonials />
      </main>

      <Footer />

      <MobileBottomNav
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onMenuOpen={() => setDrawerOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={() => setCartOpen(true)}
      />

      <WhatsAppButton />

      <QuickShopModal
        product={quickShopProduct}
        onClose={() => setQuickShopProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemove={handleRemoveFromCart}
        onCheckout={() => setCheckoutOpen(true)}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onOrderPlaced={() => setCart([])}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onQuickShop={setQuickShopProduct}
      />

      {toast && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 text-xs sm:text-sm font-semibold text-white px-5 py-2.5 rounded-full shadow-xl animate-fade-in"
          style={{ backgroundColor: INK }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

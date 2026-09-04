import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Menu, X, Search, Heart, ShoppingCart, ChevronLeft, ChevronRight,
  Star, Truck, Headphones, RotateCcw, ShieldCheck, MapPin, Mail, Phone,
  Home, ShoppingBag, Info, PhoneCall, Clock, Check, Trash2, ArrowRight,
  Loader2, AlertCircle, Sparkles, Tag, Eye, Filter, ArrowUpDown, PackageCheck, Send
} from "lucide-react";
import api from "./api/client";
import { STORE_PHOTOS, REVIEWS } from "./data/storeData";

/* ------------------------------------------------------------------ */
/* Design Tokens & Helpers                                            */
/* ------------------------------------------------------------------ */
const TEAL = "#4DB7B4";
const TEAL_DARK = "#3A9895";
const TEAL_TINT = "#EAF6F5";
const INK = "#1E2530";
const CORAL = "#E4483B";
const GOLD = "#F59E0B";

const formatPKR = (n) => `Rs. ${Number(n || 0).toLocaleString("en-PK")}`;

function ProductImage({ src, alt, className = "", fallbackText = "HipKids" }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center text-xs text-slate-400 font-medium">
          Loading...
        </div>
      )}
      {error || !src ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-teal-50 text-teal-800 p-2 text-center select-none">
          <Sparkles size={20} className="mb-1 text-teal-600" />
          <span className="text-xs font-bold leading-tight line-clamp-2">{fallbackText}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
        />
      )}
    </div>
  );
}

function Stars({ rating = 5, size = 13 }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          fill={i <= full ? GOLD : "#E2E8F0"}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header & Navigation                                                */
/* ------------------------------------------------------------------ */
function Header({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onOpenMenu,
}) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop Catalog" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact & Store" },
    { id: "track", label: "Track Order" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs font-medium py-2 px-4 text-center select-none flex items-center justify-center gap-2">
        <Sparkles size={13} className="text-teal-400 shrink-0" />
        <span>
          Free express delivery across Pakistan on orders above <strong>Rs. 3,500</strong> • Use code <strong className="text-amber-300">HIP10</strong> for 10% off!
        </span>
      </div>

      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMenu}
            className="md:hidden p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <div
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs"
              style={{ backgroundColor: TEAL_TINT }}
            >
              <span className="text-xl font-extrabold text-teal-700" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                H
              </span>
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 block leading-none" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                Hip<span style={{ color: TEAL }}>Kids</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 block mt-0.5">
                Premium Store
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors relative py-1 hover:text-teal-600 ${
                  currentPage === item.id ? "text-teal-600 font-bold" : ""
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Search Trigger */}
          <div
            onClick={onOpenSearch}
            className="hidden lg:flex items-center gap-3 bg-slate-100/90 hover:bg-slate-100 px-4 py-2 rounded-full w-64 text-xs font-medium text-slate-400 cursor-pointer transition-all border border-transparent hover:border-slate-200"
          >
            <Search size={15} className="text-slate-500 shrink-0" />
            <span className="truncate">Search rompers, sneakers...</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenSearch}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 rounded-full text-[10px] font-bold bg-rose-500 text-white flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full text-[10px] font-bold bg-teal-600 text-white flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-xs font-bold text-slate-800">Bag</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile Drawer Navigation                                           */
/* ------------------------------------------------------------------ */
function MobileDrawer({ open, onClose, currentPage, onNavigate }) {
  if (!open) return null;

  const links = [
    { id: "home", label: "Home", icon: Home },
    { id: "shop", label: "Shop All Collections", icon: ShoppingBag },
    { id: "about", label: "About HipKids", icon: Info },
    { id: "contact", label: "Contact & Store Location", icon: MapPin },
    { id: "track", label: "Track Your Order", icon: PackageCheck },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-slide-right">
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <span className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              Hip<span style={{ color: TEAL }}>Kids</span>
            </span>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
              <X size={20} />
            </button>
          </div>

          <div className="py-4 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    active ? "bg-teal-50 text-teal-700" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} className={active ? "text-teal-600" : "text-slate-400"} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
          <p className="font-bold text-slate-900">LuckyOne Mall, Karachi</p>
          <p>Helpline: 0333 4475 437</p>
          <p>Email: info@hipkids.pk</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product Card                                                       */
/* ------------------------------------------------------------------ */
function ProductCard({
  product,
  onViewProduct,
  onQuickShop,
  onToggleWishlist,
  isWished,
}) {
  const discount = product.discountPercent || product.discount || 0;
  const image = (product.images && product.images[0]) || "";
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onViewProduct(product)}>
        <ProductImage
          src={image}
          alt={product.title}
          fallbackText={product.title}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discount > 0 ? (
            <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              -{discount}%
            </span>
          ) : product.isNewArrival ? (
            <span className="bg-teal-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              New
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-rose-500 hover:bg-white shadow-xs transition-all"
          aria-label="Wishlist"
        >
          <Heart
            size={16}
            fill={isWished ? CORAL : "none"}
            className={isWished ? "text-rose-500" : "text-slate-500"}
          />
        </button>

        {/* Quick View overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickShop(product);
          }}
          disabled={isOutOfStock}
          className="absolute bottom-3 left-3 right-3 py-2.5 bg-white/95 backdrop-blur-xs text-slate-800 rounded-xl text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-teal-600 hover:text-white disabled:opacity-50"
        >
          <ShoppingCart size={13} />
          <span>{isOutOfStock ? "Out of Stock" : "Quick Add"}</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
            <span className="capitalize">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star size={12} fill={GOLD} strokeWidth={0} />
              <span>{product.rating || "4.8"}</span>
            </div>
          </div>

          <h3
            onClick={() => onViewProduct(product)}
            className="text-sm font-bold text-slate-800 line-clamp-2 hover:text-teal-600 cursor-pointer transition-colors leading-snug"
          >
            {product.title}
          </h3>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through block leading-none mb-1">
                {formatPKR(product.originalPrice)}
              </span>
            )}
            <span className="text-base font-extrabold text-slate-900 leading-none">
              {formatPKR(product.price)}
            </span>
          </div>

          <button
            onClick={() => onViewProduct(product)}
            className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-0.5"
          >
            Details <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page: HOME                                                         */
/* ------------------------------------------------------------------ */
function HomePage({
  products,
  promos,
  onNavigate,
  onViewProduct,
  onQuickShop,
  onToggleWishlist,
  wishlistIds,
  onSelectCategory,
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("baby-boy");

  const heroSlides = STORE_PHOTOS.hero;

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[slideIndex];

  const newArrivals = useMemo(() => {
    return products.filter((p) => {
      if (activeTab === "baby-boy") return p.gender === "baby-boy" || p.category === "baby-boy";
      if (activeTab === "baby-girl") return p.gender === "baby-girl" || p.category === "baby-girl";
      if (activeTab === "boy") return p.gender === "boy" || p.category === "boy";
      if (activeTab === "girl") return p.gender === "girl" || p.category === "girl";
      return true;
    });
  }, [products, activeTab]);

  const footwearProducts = useMemo(() => {
    return products.filter((p) => p.category === "footwear");
  }, [products]);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-xl min-h-[380px] sm:min-h-[460px] flex items-center">
          {/* Background Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover opacity-45 mix-blend-luminosity scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-xl p-8 sm:p-14 text-white">
            <span className="inline-block bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
              {currentSlide.eyebrow}
            </span>
            <h1
              className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-3"
              style={{ fontFamily: "'Baloo 2', sans-serif" }}
            >
              {currentSlide.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              {currentSlide.sub}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onSelectCategory(currentSlide.categoryFilter);
                  onNavigate("shop");
                }}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <span>{currentSlide.cta}</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate("shop")}
                className="bg-white/15 hover:bg-white/25 text-white px-5 py-3 rounded-full text-sm font-semibold backdrop-blur-xs transition-colors"
              >
                View Catalog
              </button>
            </div>
          </div>

          {/* Slider controls */}
          <div className="absolute bottom-5 right-6 z-10 flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  slideIndex === i ? "w-8 bg-teal-400" : "w-2 bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Visual Category Circles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            Shop by Department
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Handpicked imported collections for newborn babies to growing kids
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
          {STORE_PHOTOS.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.gender);
                onNavigate("shop");
              }}
              className="group flex flex-col items-center text-center cursor-pointer transition-transform active:scale-95"
            >
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-teal-100 shadow-sm group-hover:border-teal-400 transition-all p-1 bg-white">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 mt-2.5 group-hover:text-teal-600 transition-colors">
                {cat.label}
              </h3>
              <span className="text-[11px] text-slate-400">{cat.sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Featured Collections Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORE_PHOTOS.collections.map((col) => (
            <div
              key={col.id}
              onClick={() => {
                onSelectCategory(col.category);
                onNavigate("shop");
              }}
              className="group relative rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[260px] cursor-pointer shadow-md flex items-end p-6 bg-slate-900"
            >
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                  Featured
                </span>
                <h3 className="text-xl font-bold text-white mt-1" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                  {col.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 mb-3">{col.tagline}</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
                  Shop Collection <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. New Arrivals Tabbed Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Freshly imported clothes made with soft, baby-safe fabrics
            </p>
          </div>

          {/* Department Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl overflow-x-auto no-scrollbar">
            {[
              { id: "baby-boy", label: "Baby Boy (0-2y)" },
              { id: "baby-girl", label: "Baby Girl (0-2y)" },
              { id: "boy", label: "Boys (2-10y)" },
              { id: "girl", label: "Girls (2-12y)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-teal-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {newArrivals.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl text-slate-400 text-sm">
            No products available in this category currently.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
                onQuickShop={onQuickShop}
                onToggleWishlist={onToggleWishlist}
                isWished={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. Footwear Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              Toddler & Kids Footwear
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Comfort soles, slip-ons, and winter rainbow boots
            </p>
          </div>
          <button
            onClick={() => {
              onSelectCategory("footwear");
              onNavigate("shop");
            }}
            className="text-xs sm:text-sm font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
          >
            View All Footwear <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {footwearProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={onViewProduct}
              onQuickShop={onQuickShop}
              onToggleWishlist={onToggleWishlist}
              isWished={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* 6. LuckyOne Mall Karachi Store Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-teal-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <img
              src={STORE_PHOTOS.store.banner}
              alt="Store Interior"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-lg space-y-3">
            <span className="bg-white/20 text-teal-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Visit Our Flagship Store
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              Shop in person at LuckyOne Mall, Karachi
            </h3>
            <p className="text-sm text-teal-100 leading-relaxed">
              Experience the softness of our baby cotton fabrics firsthand. Visit Shop LG-35, Lower Ground, LuckyOne Mall.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
              <span className="flex items-center gap-1.5"><Clock size={15} /> 11:00 AM – 11:00 PM Daily</span>
              <span className="flex items-center gap-1.5"><PhoneCall size={15} /> 0333 4475 437</span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate("contact")}
              className="bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-bold shadow hover:bg-teal-50 transition-colors"
            >
              Store Details & Map
            </button>
            <a
              href="https://wa.me/923334475437"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* 7. Trust Bar */}
      <section className="bg-slate-900 py-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3">
            <Truck size={24} className="text-teal-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold">Free Nationwide Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all orders above Rs. 3,500</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck size={24} className="text-teal-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold">100% Authentic Imported</h4>
              <p className="text-xs text-slate-400 mt-0.5">Genuine brands: Chicco, Next, Carter's</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw size={24} className="text-teal-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold">7 Days Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free size exchange policy</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Headphones size={24} className="text-teal-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold">Dedicated Customer Care</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct phone & WhatsApp support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Verified Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            Loved by Parents Across Pakistan
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Stars rating={5} size={16} />
            <span className="text-xs font-semibold text-slate-600">4.9 / 5 from over 900 verified orders</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between"
            >
              <div>
                <Stars rating={rev.rating} />
                <h4 className="text-sm font-bold text-slate-900 mt-3">{rev.title}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed italic">
                  "{rev.body}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50">
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center">
                  {rev.initials}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{rev.name}</p>
                  <p className="text-[11px] text-slate-400">{rev.city}, Pakistan</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page: SHOP / CATALOG                                               */
/* ------------------------------------------------------------------ */
function ShopPage({
  products,
  selectedCategory,
  onSelectCategory,
  onViewProduct,
  onQuickShop,
  onToggleWishlist,
  wishlistIds,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "new-born", label: "New Born" },
    { id: "baby-boy", label: "Baby Boy" },
    { id: "baby-girl", label: "Baby Girl" },
    { id: "boy", label: "Boys" },
    { id: "girl", label: "Girls" },
    { id: "footwear", label: "Footwear" },
    { id: "accessories", label: "Accessories" },
    { id: "sale", label: "Sale & Offers" },
  ];

  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      if (selectedCategory === "sale") {
        list = list.filter((p) => (p.discountPercent && p.discountPercent > 0) || (p.originalPrice && p.originalPrice > p.price));
      } else {
        list = list.filter(
          (p) => p.category === selectedCategory || p.gender === selectedCategory
        );
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
          Explore Full Collection
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Showing {filtered.length} authentic kids products
        </p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                (selectedCategory || "all") === cat.id
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 rounded-xl text-xs outline-none border border-slate-200 focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
            <ArrowUpDown size={13} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
          <ShoppingBag size={40} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No matching products found</h3>
          <p className="text-xs text-slate-500 mt-1">Try selecting another category or clearing your search query.</p>
          <button
            onClick={() => {
              onSelectCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 px-5 py-2 bg-teal-600 text-white rounded-full text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={onViewProduct}
              onQuickShop={onQuickShop}
              onToggleWishlist={onToggleWishlist}
              isWished={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page: ABOUT US                                                     */
/* ------------------------------------------------------------------ */
function AboutPage({ onNavigate }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
          Our Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-3" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
          Dedicated to dressing little dreams with love & comfort
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          HipKids was founded with a single mission: to bring 100% authentic, high-quality, and hypoallergenic kids apparel and footwear to families across Pakistan.
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden shadow-xl aspect-video max-h-[420px] w-full">
        <img
          src={STORE_PHOTOS.store.banner}
          alt="HipKids Storefront"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg mb-4">
            01
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            100% Pure Cotton
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All our rompers, sleepsuits, and frocks use pre-washed, breathable organic cotton that is ultra-gentle against delicate baby skin.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
            02
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            Direct Global Imports
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We partner directly with leading brands including Chicco, Next, and Primark to ensure zero compromise on quality and genuine authenticity.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg mb-4">
            03
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            LuckyOne Mall Flagship
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Parents can visit our retail boutique at Lower Ground, LuckyOne Mall in Karachi to feel the fabrics and find the perfect fit.
          </p>
        </div>
      </div>

      <div className="bg-teal-50 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
          Ready to dress your little one?
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Explore our new arrivals and enjoy fast nationwide Cash on Delivery with easy 7-day returns.
        </p>
        <button
          onClick={() => onNavigate("shop")}
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-sm font-bold shadow-md transition-all active:scale-95"
        >
          Browse Collection
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page: CONTACT & STORE LOCATION                                     */
/* ------------------------------------------------------------------ */
function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
          We'd Love to Hear from You
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Have questions about sizes, delivery, or custom orders? Reach out to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            Send Us a Message
          </h2>

          {sent ? (
            <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center gap-3">
              <Check size={24} className="text-emerald-600" />
              <div>
                <p className="font-bold text-sm">Message Sent!</p>
                <p className="text-xs text-emerald-700">Thank you! Our support team will get back to you within 2 hours.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Ali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="0333 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-full text-xs shadow transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <Send size={14} /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Store & Direct Support Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-5 shadow-sm">
            <h3 className="text-xl font-bold" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              Karachi Retail Boutique
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="text-teal-400 shrink-0 mt-0.5" />
                <span>Shop LG-35, Lower Ground Floor, LuckyOne Mall, Rashid Minhas Road, Karachi</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock size={18} className="text-teal-400 shrink-0" />
                <span>Open 7 Days a Week: 11:00 AM – 11:00 PM</span>
              </p>
              <p className="flex items-center gap-3">
                <PhoneCall size={18} className="text-teal-400 shrink-0" />
                <span>0333 4475 437 / 021 34567890</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={18} className="text-teal-400 shrink-0" />
                <span>info@hipkids.pk</span>
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <a
                href="https://wa.me/923334475437"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow"
              >
                Chat Directly on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-xs aspect-video">
            <img
              src={STORE_PHOTOS.store.fabric}
              alt="Fabric Quality"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page: TRACK ORDER                                                  */
/* ------------------------------------------------------------------ */
function TrackOrderPage() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e?.preventDefault();
    const cleanId = orderIdInput.replace("#", "").trim();
    if (!cleanId) {
      setError("Please enter a valid Order ID");
      return;
    }

    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      const res = await api.getOrderById(cleanId);
      if (res.success && res.data) {
        setOrderData(res.data);
      } else {
        setError("No order found with that ID. Please check your order confirmation.");
      }
    } catch (err) {
      setError(err.message || "Order not found. Please verify the ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="text-center">
        <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
          Live Status
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Enter your Order ID (e.g. #1) received on checkout to check live shipment status
        </p>
      </div>

      {/* Input box */}
      <form onSubmit={handleTrack} className="flex gap-2 max-w-md mx-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <input
          type="text"
          placeholder="Enter Order ID (e.g. 1)"
          value={orderIdInput}
          onChange={(e) => setOrderIdInput(e.target.value)}
          className="flex-1 px-4 py-2 text-sm outline-none font-medium text-slate-800"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-60 transition-colors"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : "Track"}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs flex items-center gap-2 max-w-md mx-auto">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Card */}
      {orderData && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-2">
            <div>
              <span className="text-xs text-slate-400">Order Number</span>
              <h3 className="text-xl font-extrabold text-slate-900">#{orderData.id}</h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400">Status</span>
              <span className="inline-block ml-2 px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                {orderData.status || "Processing"}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="py-4">
            <p className="text-xs font-bold text-slate-700 uppercase mb-4">Shipment Progress</p>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold mb-1.5">
                  <Check size={14} />
                </div>
                <span className="font-bold text-slate-800">Order Placed</span>
                <span className="text-[10px] text-slate-400">Confirmed</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold mb-1.5">
                  <Check size={14} />
                </div>
                <span className="font-bold text-slate-800">Processing</span>
                <span className="text-[10px] text-slate-400">Quality Checked</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold mb-1.5">
                  3
                </div>
                <span className="font-semibold text-slate-500">Dispatched</span>
                <span className="text-[10px] text-slate-400">With Courier</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold mb-1.5">
                  4
                </div>
                <span className="font-semibold text-slate-500">Delivered</span>
                <span className="text-[10px] text-slate-400">At Doorstep</span>
              </div>
            </div>
          </div>

          {/* Details breakdown */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-3 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Customer:</span>
              <strong className="text-slate-900">{orderData.customerName}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Address:</span>
              <strong className="text-slate-900 text-right max-w-xs">{orderData.shippingAddress}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Contact Phone:</span>
              <strong className="text-slate-900">{orderData.phone}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Payment Mode:</span>
              <strong className="text-slate-900">{orderData.paymentMethod} (Cash on Delivery)</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
              <span>Total Payable:</span>
              <span>{formatPKR(orderData.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product Detail Modal                                               */
/* ------------------------------------------------------------------ */
function ProductDetailModal({ product, onClose, onAddToCart, onBuyNow }) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState("");

  if (!product) return null;

  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.image || ""];

  const sizes = (product.sizes && product.sizes.length > 0)
    ? product.sizes
    : ["0-3m", "3-6m", "6-12m", "1-2y"];

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError("Please select a size");
      return;
    }
    onAddToCart(product, selectedSize, qty);
    onClose();
  };

  const handleInstantBuy = () => {
    if (!selectedSize) {
      setSizeError("Please select a size");
      return;
    }
    onBuyNow(product, selectedSize, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
        >
          <X size={18} />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-slate-50">
          <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-inner bg-white">
            <ProductImage
              src={images[activeImg]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === idx ? "border-teal-600 scale-105" : "border-transparent opacity-70"
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
              {product.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              {product.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <Stars rating={product.rating || 4.8} size={14} />
              <span className="text-xs font-semibold text-slate-500">
                {product.rating || "4.8"} (142 reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2.5">
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
            <span className="text-2xl font-extrabold text-slate-900">
              {formatPKR(product.price)}
            </span>
            {product.discountPercent > 0 && (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Sizing */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Select Age / Size:</span>
              <span className="text-teal-600">Size Chart Guide</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedSize(s);
                    setSizeError("");
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === s
                      ? "border-teal-600 bg-teal-50 text-teal-700 shadow-xs"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="text-xs text-rose-500 mt-1 font-medium">{sizeError}</p>}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">Quantity:</span>
            <div className="flex items-center border border-slate-200 rounded-xl">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-2.5 py-1 text-slate-500 hover:text-black"
              >
                -
              </button>
              <span className="text-xs font-bold w-6 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-2.5 py-1 text-slate-500 hover:text-black"
              >
                +
              </button>
            </div>
            <span className="text-xs text-emerald-600 font-semibold ml-auto flex items-center gap-1">
              <Check size={13} /> In Stock ({product.stock || 15} available)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleAdd}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-full text-xs font-bold shadow transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={15} /> Add to Bag • {formatPKR(product.price * qty)}
            </button>
            <button
              onClick={handleInstantBuy}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-full text-xs font-bold shadow transition-all active:scale-98"
            >
              Instant Buy (Checkout Now)
            </button>
          </div>

          {/* Perks */}
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
            <p className="flex items-center gap-2"><Sparkles size={14} className="text-teal-600" /> 100% Cotton & imported hypoallergenic fabric</p>
            <p className="flex items-center gap-2"><Truck size={14} className="text-teal-600" /> Cash on Delivery available nationwide</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Wishlist Drawer                                                    */
/* ------------------------------------------------------------------ */
function WishlistDrawer({ open, onClose, items, onRemove, onMoveToCart }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col z-10 animate-slide-left">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-rose-500" fill={CORAL} />
            <h3 className="font-extrabold text-base text-slate-900">Your Wishlist ({items.length})</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
              <Heart size={36} className="text-slate-200" />
              <p className="text-sm font-semibold text-slate-700">Wishlist is empty</p>
              <p className="text-xs">Tap the heart on any product to save it for later.</p>
            </div>
          ) : (
            items.map((prod) => (
              <div key={prod.id} className="py-3 flex gap-3 items-center">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <ProductImage src={prod.images?.[0]} alt={prod.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{prod.title}</h4>
                  <p className="text-xs font-extrabold text-slate-900 mt-1">{formatPKR(prod.price)}</p>
                  <button
                    onClick={() => onMoveToCart(prod)}
                    className="mt-2 text-[11px] font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
                  >
                    <ShoppingCart size={12} /> Move to Bag
                  </button>
                </div>
                <button
                  onClick={() => onRemove(prod.id)}
                  className="p-1 text-slate-400 hover:text-rose-500"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cart Drawer                                                        */
/* ------------------------------------------------------------------ */
function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onCheckout,
  promoDiscount,
  appliedCode,
  onApplyCoupon,
}) {
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  if (!open) return null;

  const subtotal = items.reduce((s, it) => s + it.product.price * it.quantity, 0);
  const discountAmount = Math.round(subtotal * promoDiscount);
  const freeShippingThreshold = 3500;
  const shippingFee = (subtotal - discountAmount) >= freeShippingThreshold || subtotal === 0 ? 0 : 200;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (clean === "HIP10") {
      onApplyCoupon("HIP10", 0.10);
      setCouponMsg("10% discount applied!");
    } else if (clean === "FREESHIP") {
      onApplyCoupon("FREESHIP", 0);
      setCouponMsg("Free shipping unlocked!");
    } else {
      setCouponMsg("Invalid coupon code.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-slide-left">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} className="text-teal-600" />
              <h3 className="font-extrabold text-base text-slate-900">Your Shopping Bag ({items.length})</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="py-3 px-4 bg-teal-50/70 rounded-2xl my-3 text-xs">
            <div className="flex justify-between font-bold text-teal-900 mb-1">
              <span>{subtotal >= freeShippingThreshold ? "🎉 You unlocked FREE delivery!" : `Add ${formatPKR(freeShippingThreshold - subtotal)} for free shipping`}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-teal-200/60 h-1.5 rounded-full overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Cart Items */}
          <div className="max-h-[42vh] overflow-y-auto divide-y divide-slate-100 pr-1">
            {items.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <ShoppingCart size={36} className="mx-auto text-slate-200" />
                <p className="text-sm font-semibold text-slate-700">Your bag is empty</p>
                <p className="text-xs">Add cute rompers and sneakers to get started.</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={idx} className="py-3.5 flex gap-3 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <ProductImage src={item.product.images?.[0]} alt={item.product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.product.title}</h4>
                    <p className="text-[11px] text-slate-500">Size: <strong className="text-slate-700">{item.size}</strong></p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg text-xs">
                        <button onClick={() => onUpdateQty(idx, item.quantity - 1)} className="px-2 py-0.5 text-slate-500 hover:text-black">-</button>
                        <span className="w-5 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(idx, item.quantity + 1)} className="px-2 py-0.5 text-slate-500 hover:text-black">+</button>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900">{formatPKR(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button onClick={() => onRemove(idx)} className="p-1 text-slate-300 hover:text-rose-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-3">
            {/* Promo code input */}
            <form onSubmit={handleCouponSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (try HIP10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs uppercase font-semibold outline-none"
              />
              <button type="submit" className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-xl">
                Apply
              </button>
            </form>
            {couponMsg && <p className="text-[11px] font-semibold text-teal-600">{couponMsg}</p>}

            {/* Breakdown */}
            <div className="text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">{formatPKR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-teal-600 font-bold">
                  <span>Discount ({appliedCode}):</span>
                  <span>-{formatPKR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{shippingFee === 0 ? <strong className="text-teal-600">FREE</strong> : formatPKR(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Payable:</span>
                <span>{formatPKR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-full text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={15} />
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
function CheckoutModal({
  open,
  onClose,
  items,
  promoDiscount,
  onOrderSuccess,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Karachi",
    paymentMethod: "COD",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!open) return null;

  const subtotal = items.reduce((s, it) => s + it.product.price * it.quantity, 0);
  const discountAmount = Math.round(subtotal * promoDiscount);
  const shippingFee = (subtotal - discountAmount) >= 3500 ? 0 : 200;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.includes("@") || formData.phone.length < 7 || formData.address.length < 5) {
      setError("Please fill all required delivery details correctly.");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      customerName: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      shippingAddress: `${formData.address.trim()}, ${formData.city}`,
      paymentMethod: formData.paymentMethod,
      items: items.map((it) => ({
        productId: it.product.id,
        size: it.size,
        quantity: it.quantity,
      })),
    };

    try {
      const res = await api.createOrder(payload);
      if (res.success && res.data) {
        setConfirmedOrder(res.data);
        onOrderSuccess();
      } else {
        setError(res.message || "Failed to place order.");
      }
    } catch (err) {
      setError(err.message || "Could not connect to order API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:bg-slate-100">
          <X size={18} />
        </button>

        {confirmedOrder ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center">
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              Order Confirmed!
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Thank you {confirmedOrder.customerName}! Your order has been placed. We're preparing your baby clothes with care.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl text-xs text-left space-y-2 border border-slate-100">
              <p><strong>Order Tracking ID:</strong> #{confirmedOrder.id}</p>
              <p><strong>Total (COD):</strong> {formatPKR(confirmedOrder.total)}</p>
              <p><strong>Shipping to:</strong> {confirmedOrder.shippingAddress}</p>
              <p><strong>Phone:</strong> {confirmedOrder.phone}</p>
            </div>

            <button
              onClick={onClose}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-full text-xs shadow transition-transform active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                Delivery Details
              </h3>
              <p className="text-xs text-slate-500">Pay Cash on Delivery when your package arrives</p>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Delivery Street Address</label>
                <textarea
                  rows={2}
                  required
                  placeholder="House/Flat #, Street, Area"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500">Payable amount: </span>
                <strong className="text-sm font-extrabold text-slate-900">{formatPKR(total)}</strong>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3 rounded-full text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Place COD Order"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search Modal                                                       */
/* ------------------------------------------------------------------ */
function SearchModal({ open, onClose, onViewProduct }) {
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
        if (res.success && res.data) {
          setResults(res.data);
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search rompers, party dresses, sneakers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-semibold outline-none text-slate-800"
          />
          {loading && <Loader2 size={16} className="animate-spin text-teal-600" />}
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto space-y-2">
          {query && !loading && results.length === 0 ? (
            <p className="text-xs text-center py-8 text-slate-400">No products matching "{query}"</p>
          ) : (
            results.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onViewProduct(p);
                  onClose();
                }}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <ProductImage src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{p.title}</p>
                  <p className="text-xs text-teal-700 font-extrabold mt-0.5">{formatPKR(p.price)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer({ onNavigate, onSelectCategory }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    try {
      await api.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-24 md:pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-lg">
              H
            </div>
            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              Hip<span style={{ color: TEAL }}>Kids</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pakistan's favorite kids storefront. Delivering 100% authentic imported rompers, party frocks, and comfortable footwear.
          </p>
          <div className="text-xs text-slate-400 space-y-1 pt-2">
            <p className="flex items-center gap-2"><MapPin size={14} className="text-teal-400" /> LuckyOne Mall, Karachi</p>
            <p className="flex items-center gap-2"><Phone size={14} className="text-teal-400" /> 0333 4475 437</p>
            <p className="flex items-center gap-2"><Mail size={14} className="text-teal-400" /> info@hipkids.pk</p>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Shop Categories</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {["New Born", "Baby Boy", "Baby Girl", "Boys", "Girls", "Footwear", "Accessories", "Sale"].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    const slug = cat === "Boys" ? "boy" : cat === "Girls" ? "girl" : cat.toLowerCase().replace(" ", "-");
                    onSelectCategory(slug);
                    onNavigate("shop");
                  }}
                  className="hover:text-teal-400 transition-colors"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Customer Care</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => onNavigate("track")} className="hover:text-teal-400">Track Order</button></li>
            <li><button onClick={() => onNavigate("about")} className="hover:text-teal-400">About Us</button></li>
            <li><button onClick={() => onNavigate("contact")} className="hover:text-teal-400">Contact & Mall Store</button></li>
            <li><span className="hover:text-teal-400 cursor-pointer">7-Day Return Policy</span></li>
            <li><span className="hover:text-teal-400 cursor-pointer">Shipping & Delivery Info</span></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Newsletter</h4>
          <p className="text-xs text-slate-400">Get 10% off your first order plus new arrivals alerts.</p>
          {subscribed ? (
            <div className="p-3 bg-teal-900/40 text-teal-300 rounded-xl text-xs flex items-center gap-2">
              <Check size={16} /> Subscribed! Welcome to HipKids.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-1.5">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs outline-none text-white focus:border-teal-500"
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Join
              </button>
            </form>
          )}

          <div className="flex items-center gap-2 pt-4">
            {["Cash on Delivery", "Visa", "Mastercard"].map((m) => (
              <span key={m} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-400 font-medium">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
        © 2026 HipKids Pakistan. All Rights Reserved. Designed for premium comfort.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Main Application Component                                         */
/* ------------------------------------------------------------------ */
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState({ code: null, discount: 0 });

  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);

  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Load Data
  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, promoRes] = await Promise.allSettled([
          api.getProducts({ limit: 50 }),
          api.getPromos(),
        ]);
        if (prodRes.status === "fulfilled" && prodRes.value.success) {
          setProducts(prodRes.value.data);
        }
        if (promoRes.status === "fulfilled" && promoRes.value.success) {
          setPromos(promoRes.value.data);
        }
      } catch (err) {
        console.error("Initial load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product, size, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.size === size);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += qty;
        return copy;
      }
      return [...prev, { product, size, quantity: qty }];
    });
    showToast(`Added ${qty}x ${product.title} to bag!`);
  };

  const handleBuyNow = (product, size, qty = 1) => {
    handleAddToCart(product, size, qty);
    setCheckoutOpen(true);
  };

  const handleUpdateCartQty = (idx, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((_, i) => i !== idx));
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

  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        showToast("Removed from wishlist");
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast("Saved to wishlist!");
        return [...prev, product];
      }
    });
  };

  const totalCartCount = cart.reduce((s, it) => s + it.quantity, 0);
  const wishlistIds = wishlist.map((p) => p.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Pages */}
      <main className="flex-1">
        {currentPage === "home" && (
          <HomePage
            products={products}
            promos={promos}
            onNavigate={handleNavigate}
            onViewProduct={(p) => setDetailProduct(p)}
            onQuickShop={(p) => setDetailProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        )}

        {currentPage === "shop" && (
          <ShopPage
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onViewProduct={(p) => setDetailProduct(p)}
            onQuickShop={(p) => setDetailProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {currentPage === "about" && <AboutPage onNavigate={handleNavigate} />}

        {currentPage === "contact" && <ContactPage />}

        {currentPage === "track" && <TrackOrderPage />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleNavigate("shop");
        }}
      />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/923334475437"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-30 w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <Send size={22} className="rotate-45" />
      </a>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlist}
        onRemove={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onMoveToCart={(prod) => {
          handleAddToCart(prod, prod.sizes?.[0] || "0-3m", 1);
          setWishlist((prev) => prev.filter((p) => p.id !== prod.id));
        }}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemove={handleRemoveFromCart}
        onCheckout={() => setCheckoutOpen(true)}
        promoDiscount={appliedPromo.discount}
        appliedCode={appliedPromo.code}
        onApplyCoupon={(code, disc) => setAppliedPromo({ code, discount: disc })}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        promoDiscount={appliedPromo.discount}
        onOrderSuccess={() => {
          setCart([]);
          setAppliedPromo({ code: null, discount: 0 });
        }}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onViewProduct={(p) => setDetailProduct(p)}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in border border-slate-800">
          <Sparkles size={14} className="text-teal-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}

CREATE TABLE IF NOT EXISTS products (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  category        TEXT NOT NULL,
  gender          TEXT,
  price           REAL NOT NULL,
  originalPrice   REAL,
  discountPercent INTEGER NOT NULL DEFAULT 0,
  images          TEXT NOT NULL,
  sizes           TEXT NOT NULL,
  stock           INTEGER NOT NULL DEFAULT 0,
  rating          REAL NOT NULL DEFAULT 0,
  isNewArrival    INTEGER NOT NULL DEFAULT 0,
  isFeatured      INTEGER NOT NULL DEFAULT 0,
  createdAt       TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt       TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_category     ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_gender       ON products(gender);
CREATE INDEX IF NOT EXISTS idx_products_featured     ON products(isFeatured);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival  ON products(isNewArrival);

CREATE TABLE IF NOT EXISTS categories (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT NOT NULL,
  slug      TEXT NOT NULL UNIQUE,
  type      TEXT NOT NULL,
  ageRange  TEXT,
  sortOrder INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS promos (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  title        TEXT NOT NULL,
  subtitle     TEXT,
  discountText TEXT,
  ctaText      TEXT NOT NULL DEFAULT 'Shop Now',
  isActive     INTEGER NOT NULL DEFAULT 1,
  sortOrder    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  customerName    TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  shippingAddress TEXT NOT NULL,
  items           TEXT NOT NULL,
  subtotal        REAL NOT NULL,
  shippingFee     REAL NOT NULL,
  total           REAL NOT NULL,
  paymentMethod   TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending',
  createdAt       TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt       TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  email     TEXT NOT NULL UNIQUE,
  createdAt TEXT NOT NULL DEFAULT (datetime('now'))
);

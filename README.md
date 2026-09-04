# HipKids API

A lightweight, modular Express + SQLite (Prisma) backend for a kids' clothing
and footwear storefront.

## Stack

- Node.js (ES Modules) + Express
- SQLite via Prisma ORM
- Zod for request validation
- helmet, cors, morgan for basic production hygiene

## Project layout

```
hipkids-backend/
├── prisma/
│   ├── schema.prisma      # data model
│   └── seed.js            # dummy kids' apparel/footwear data
├── src/
│   ├── config/db.js        # Prisma client singleton
│   ├── middleware/         # error handler, admin check, validate
│   ├── validators/         # Zod schemas
│   ├── controllers/        # request handlers
│   ├── routes/             # route definitions per resource
│   ├── app.js               # Express app (middleware + routes)
│   └── server.js            # entrypoint
├── .env.example
└── package.json
```

## Setup & Quick Start

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Initialize database
```bash
npm run setup
```
*(Runs migrations & seeds initial categories, promos, and products into SQLite).*

### 3. Run development servers
```bash
# Run both Backend (5000) and Frontend (5173) concurrently:
npm run dev:all

# Or run separately:
npm run dev:backend   # API on http://localhost:5000
npm run dev:frontend  # Storefront on http://localhost:5173
```

- API Health Check: `http://localhost:5000/api/health`
- Storefront UI: `http://localhost:5173`

## Endpoints

### Products

| Method | Route | Notes |
|---|---|---|
| GET | `/api/products` | Query: `category`, `gender`, `featured`, `isNewArrival`, `search`, `page`, `limit` |
| GET | `/api/products/:id` | Accepts a numeric id or a slug |
| POST | `/api/products` | Admin only — requires `x-admin-key` header |

```bash
curl "http://localhost:5000/api/products?category=footwear&search=sneakers"

curl http://localhost:5000/api/products/cj-boy-grey-slip-on-sneakers

curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "x-admin-key: change-this-admin-key" \
  -d '{
    "title": "Chicco Baby Boy Romper, Cactus Print",
    "category": "baby-boy",
    "gender": "baby-boy",
    "price": 1890,
    "images": ["/images/products/cactus-romper-1.jpg"],
    "sizes": ["0-3m", "3-6m"],
    "stock": 20
  }'
```

### Categories & promos

| Method | Route | Notes |
|---|---|---|
| GET | `/api/categories` | Optional `?type=age` or `?type=type` |
| GET | `/api/promos` | Active hero/banner promos, ordered by `sortOrder` |

### Orders

| Method | Route | Notes |
|---|---|---|
| POST | `/api/orders` | Creates an order, decrements stock, recomputes totals server-side |
| GET | `/api/orders/:id` | Track order status |

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Ayesha Noor",
    "email": "ayesha@example.com",
    "phone": "03001234567",
    "shippingAddress": "House 12, Street 5, DHA Phase 6, Karachi",
    "paymentMethod": "COD",
    "items": [
      { "productId": 9, "size": "21", "quantity": 1 },
      { "productId": 11, "size": "27", "quantity": 2 }
    ]
  }'
```

`subtotal`, `shippingFee` and `total` are always computed from live product
prices and the `FREE_SHIPPING_THRESHOLD` / `SHIPPING_FEE` env vars — client
supplied totals are ignored. Stock is checked and decremented inside a single
database transaction, so a request either fully succeeds or fully rolls back.

### Newsletter

| Method | Route | Notes |
|---|---|---|
| POST | `/api/newsletter` | Duplicate emails return `200 Already subscribed` instead of an error |

## Response shape

All responses follow the same envelope:

```json
{ "success": true, "data": { } }
{ "success": false, "message": "..." }
```

List endpoints (`GET /api/products`) additionally include a `meta` object
with pagination info.

## Notes on scope

- `POST /api/products` uses a shared-secret header (`x-admin-key`) as a
  placeholder admin check — swap for real auth (JWT/session) before
  shipping to production.
- `images`/`sizes`/`items` are stored as Prisma `Json` columns (SQLite has
  no native array type); Prisma serializes/deserializes them automatically,
  so controllers work with plain JS arrays.
- Switching to MongoDB later mainly means swapping the Prisma SQLite
  provider for the Mongo connector (or Mongoose) — the route/controller/
  validator layers are storage-agnostic and wouldn't need to change shape.

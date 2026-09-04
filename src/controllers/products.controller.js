import db from "../config/db.js";
import { AppError } from "../utils/AppError.js";
import { slugify } from "../utils/slugify.js";
import { mapProduct } from "../utils/rowMappers.js";

// GET /api/products?category=&gender=&featured=&isNewArrival=&search=&page=&limit=
export const getProducts = (req, res) => {
  const { category, gender, featured, isNewArrival, search } = req.query;

  const clauses = [];
  const params = {};

  if (category) {
    clauses.push("category = @category");
    params.category = category;
  }
  if (gender) {
    clauses.push("gender = @gender");
    params.gender = gender;
  }
  if (featured !== undefined) {
    clauses.push("isFeatured = @featured");
    params.featured = featured === "true" ? 1 : 0;
  }
  if (isNewArrival !== undefined) {
    clauses.push("isNewArrival = @isNewArrival");
    params.isNewArrival = isNewArrival === "true" ? 1 : 0;
  }
  if (search) {
    clauses.push("title LIKE @search");
    params.search = `%${search}%`;
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const offset = (page - 1) * limit;

  const items = db
    .prepare(`SELECT * FROM products ${where} ORDER BY createdAt DESC LIMIT @limit OFFSET @offset`)
    .all({ ...params, limit, offset });

  const { total } = db.prepare(`SELECT COUNT(*) AS total FROM products ${where}`).get(params);

  res.json({
    success: true,
    data: items.map(mapProduct),
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
  });
};

// GET /api/products/:id  (accepts a numeric id OR a slug)
export const getProductById = (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);
  const isNumeric = Number.isInteger(numericId);

  const row = isNumeric
    ? db.prepare("SELECT * FROM products WHERE id = ? OR slug = ?").get(numericId, id)
    : db.prepare("SELECT * FROM products WHERE slug = ?").get(id);

  if (!row) throw new AppError("Product not found", 404);

  res.json({ success: true, data: mapProduct(row) });
};

// POST /api/products  (admin-only)
export const createProduct = (req, res) => {
  const data = req.validated;

  const baseSlug = slugify(data.slug || data.title);
  const existing = db.prepare("SELECT id FROM products WHERE slug = ?").get(baseSlug);
  const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

  const info = db
    .prepare(
      `INSERT INTO products
        (title, slug, category, gender, price, originalPrice, discountPercent, images, sizes, stock, rating, isNewArrival, isFeatured)
       VALUES
        (@title, @slug, @category, @gender, @price, @originalPrice, @discountPercent, @images, @sizes, @stock, @rating, @isNewArrival, @isFeatured)`
    )
    .run({
      title: data.title,
      slug,
      category: data.category,
      gender: data.gender ?? null,
      price: data.price,
      originalPrice: data.originalPrice ?? null,
      discountPercent: data.discountPercent,
      images: JSON.stringify(data.images),
      sizes: JSON.stringify(data.sizes),
      stock: data.stock,
      rating: data.rating,
      isNewArrival: data.isNewArrival ? 1 : 0,
      isFeatured: data.isFeatured ? 1 : 0,
    });

  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json({ success: true, data: mapProduct(row) });
};

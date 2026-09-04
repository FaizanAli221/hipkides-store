import db from "../config/db.js";

// GET /api/categories?type=age|type
export const getCategories = (req, res) => {
  const { type } = req.query;

  const rows = type
    ? db.prepare("SELECT * FROM categories WHERE type = ? ORDER BY sortOrder ASC").all(type)
    : db.prepare("SELECT * FROM categories ORDER BY sortOrder ASC").all();

  res.json({ success: true, data: rows });
};

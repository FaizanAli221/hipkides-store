import db from "../config/db.js";
import { mapPromo } from "../utils/rowMappers.js";

// GET /api/promos
export const getPromos = (req, res) => {
  const rows = db.prepare("SELECT * FROM promos WHERE isActive = 1 ORDER BY sortOrder ASC").all();
  res.json({ success: true, data: rows.map(mapPromo) });
};

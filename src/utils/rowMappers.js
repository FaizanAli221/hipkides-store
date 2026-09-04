// SQLite has no native array/boolean type, so JSON columns come back as
// TEXT and flags come back as 0/1. These helpers translate rows into the
// shapes controllers/clients actually want to work with.

export function mapProduct(row) {
  if (!row) return null;
  return {
    ...row,
    images: JSON.parse(row.images),
    sizes: JSON.parse(row.sizes),
    isNewArrival: !!row.isNewArrival,
    isFeatured: !!row.isFeatured,
  };
}

export function mapOrder(row) {
  if (!row) return null;
  return { ...row, items: JSON.parse(row.items) };
}

export function mapPromo(row) {
  if (!row) return null;
  return { ...row, isActive: !!row.isActive };
}

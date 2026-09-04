import db from "../config/db.js";
import { AppError } from "../utils/AppError.js";
import { mapOrder } from "../utils/rowMappers.js";

const FREE_SHIPPING_THRESHOLD = Number(process.env.FREE_SHIPPING_THRESHOLD || 3500);
const SHIPPING_FEE = Number(process.env.SHIPPING_FEE || 200);

const getProductStmt = db.prepare("SELECT * FROM products WHERE id = ?");
const updateStockStmt = db.prepare("UPDATE products SET stock = ?, updatedAt = datetime('now') WHERE id = ?");
const insertOrderStmt = db.prepare(
  `INSERT INTO orders
    (customerName, email, phone, shippingAddress, items, subtotal, shippingFee, total, paymentMethod, status)
   VALUES
    (@customerName, @email, @phone, @shippingAddress, @items, @subtotal, @shippingFee, @total, @paymentMethod, 'pending')`
);
const getOrderStmt = db.prepare("SELECT * FROM orders WHERE id = ?");

// POST /api/orders
// Subtotal/total are always recomputed server-side from live product prices
// and stock so a tampered client payload can't change the charged amount.
// Stock check + decrement + order insert all happen in one transaction:
// either the whole order succeeds, or nothing is written.
export const createOrder = (req, res) => {
  const data = req.validated;

  const placeOrder = db.transaction((payload) => {
    let subtotal = 0;
    const itemsSnapshot = [];

    for (const item of payload.items) {
      const product = getProductStmt.get(item.productId);

      if (!product) {
        throw new AppError(`Product ${item.productId} not found`, 404);
      }
      if (product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for "${product.title}"`, 400);
      }

      updateStockStmt.run(product.stock - item.quantity, product.id);

      subtotal += product.price * item.quantity;
      itemsSnapshot.push({
        productId: product.id,
        title: product.title,
        size: item.size ?? null,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const total = subtotal + shippingFee;

    const info = insertOrderStmt.run({
      customerName: payload.customerName,
      email: payload.email,
      phone: payload.phone,
      shippingAddress: payload.shippingAddress,
      items: JSON.stringify(itemsSnapshot),
      subtotal,
      shippingFee,
      total,
      paymentMethod: payload.paymentMethod,
    });

    return getOrderStmt.get(info.lastInsertRowid);
  });

  const order = placeOrder(data);
  res.status(201).json({ success: true, data: mapOrder(order) });
};

// GET /api/orders/:id
export const getOrderById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new AppError("Invalid order id", 400);

  const row = getOrderStmt.get(id);
  if (!row) throw new AppError("Order not found", 404);

  res.json({ success: true, data: mapOrder(row) });
};

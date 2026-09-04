import { AppError } from "../utils/AppError.js";

// Minimal shared-secret check for admin-only routes.
// Swap for real auth (JWT/session) before shipping to production.
export function adminCheck(req, res, next) {
  const key = req.headers["x-admin-key"];

  if (!key || key !== process.env.ADMIN_API_KEY) {
    return next(new AppError("Unauthorized: admin access required", 401));
  }

  next();
}

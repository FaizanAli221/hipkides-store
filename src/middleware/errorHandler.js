export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";

  // Handle SQLite unique constraint violations
  if (
    err.code === "SQLITE_CONSTRAINT_UNIQUE" ||
    err.code === "SQLITE_CONSTRAINT" ||
    (err.code === "ERR_SQLITE_ERROR" && err.message && err.message.includes("UNIQUE constraint failed"))
  ) {
    statusCode = 409;
    message = "A record with that value already exists";
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(statusCode).json({ success: false, message });
}

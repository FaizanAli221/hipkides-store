import db from "../config/db.js";

const getByEmailStmt = db.prepare("SELECT * FROM newsletter_subscribers WHERE email = ?");
const insertStmt = db.prepare("INSERT INTO newsletter_subscribers (email) VALUES (?)");

// POST /api/newsletter
export const subscribeNewsletter = (req, res) => {
  const { email } = req.validated;

  const existing = getByEmailStmt.get(email);
  if (existing) {
    // Idempotent: resubscribing isn't an error from the client's point of view.
    return res.status(200).json({ success: true, message: "Already subscribed" });
  }

  const info = insertStmt.run(email);
  const row = db.prepare("SELECT * FROM newsletter_subscribers WHERE id = ?").get(info.lastInsertRowid);

  res.status(201).json({ success: true, message: "Subscribed", data: row });
};

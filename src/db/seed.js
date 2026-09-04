import "dotenv/config";
import db from "../config/db.js";
import { categories, promos, products, seedDatabase } from "./seedData.js";

function seed() {
  db.exec(`
    DELETE FROM newsletter_subscribers;
    DELETE FROM orders;
    DELETE FROM products;
    DELETE FROM categories;
    DELETE FROM promos;
  `);

  const run = db.transaction(() => {
    seedDatabase(db);
  });

  run();

  console.log(
    `Seed complete: ${categories.length} categories, ${promos.length} promos, ${products.length} products.`
  );
}

seed();

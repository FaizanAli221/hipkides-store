import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { seedDatabase } from "../db/seedData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isServerless = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const dbFile = process.env.DATABASE_FILE || (isServerless ? "/tmp/hipkids.db" : path.join(__dirname, "../../data/hipkids.db"));

fs.mkdirSync(path.dirname(dbFile), { recursive: true });

const rawDb = new DatabaseSync(dbFile);

// Enable WAL mode and foreign keys
try {
  rawDb.exec("PRAGMA journal_mode = WAL;");
  rawDb.exec("PRAGMA foreign_keys = ON;");
} catch {
  // Ignore in environments where WAL is restricted
}

// Auto-initialize schema & seed data if tables do not exist or catalog needs update
try {
  const schemaPath = path.join(__dirname, "../db/schema.sql");
  if (fs.existsSync(schemaPath)) {
    rawDb.exec(fs.readFileSync(schemaPath, "utf-8"));
    const countRow = rawDb.prepare("SELECT count(*) as count FROM products").get();
    if (!countRow || countRow.count < 30) {
      seedDatabase(rawDb);
    }
  }
} catch (err) {
  console.warn("DB auto-init notice:", err.message);
}

// Wrapper to provide 100% compatibility with better-sqlite3 API
const db = {
  exec(sql) {
    return rawDb.exec(sql);
  },

  pragma(str) {
    return rawDb.exec(`PRAGMA ${str};`);
  },

  prepare(sql) {
    const stmt = rawDb.prepare(sql);
    return {
      run(...args) {
        if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && Object.keys(args[0]).length === 0) {
          return stmt.run();
        }
        return stmt.run(...args);
      },
      get(...args) {
        if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && Object.keys(args[0]).length === 0) {
          return stmt.get();
        }
        return stmt.get(...args);
      },
      all(...args) {
        if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && Object.keys(args[0]).length === 0) {
          return stmt.all();
        }
        return stmt.all(...args);
      },
    };
  },

  transaction(fn) {
    return (...args) => {
      rawDb.exec("BEGIN");
      try {
        const result = fn(...args);
        rawDb.exec("COMMIT");
        return result;
      } catch (err) {
        rawDb.exec("ROLLBACK");
        throw err;
      }
    };
  },
};

export default db;

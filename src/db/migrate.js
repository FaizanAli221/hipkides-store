import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import db from "../config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");

db.exec(schema);
console.log("Migration applied.");

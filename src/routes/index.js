import { Router } from "express";
import productsRoutes from "./products.routes.js";
import categoriesRoutes from "./categories.routes.js";
import promosRoutes from "./promos.routes.js";
import ordersRoutes from "./orders.routes.js";
import newsletterRoutes from "./newsletter.routes.js";

const router = Router();

router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/promos", promosRoutes);
router.use("/orders", ordersRoutes);
router.use("/newsletter", newsletterRoutes);

export default router;

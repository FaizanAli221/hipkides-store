import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { adminCheck } from "../middleware/adminCheck.js";
import { productCreateSchema } from "../validators/product.validator.js";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProductById));
router.post("/", adminCheck, validate(productCreateSchema), asyncHandler(createProduct));

export default router;

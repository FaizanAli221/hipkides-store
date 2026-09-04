import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { orderCreateSchema } from "../validators/order.validator.js";
import { createOrder, getOrderById } from "../controllers/orders.controller.js";

const router = Router();

router.post("/", validate(orderCreateSchema), asyncHandler(createOrder));
router.get("/:id", asyncHandler(getOrderById));

export default router;

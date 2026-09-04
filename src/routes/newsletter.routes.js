import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { newsletterSchema } from "../validators/newsletter.validator.js";
import { subscribeNewsletter } from "../controllers/newsletter.controller.js";

const router = Router();

router.post("/", validate(newsletterSchema), asyncHandler(subscribeNewsletter));

export default router;

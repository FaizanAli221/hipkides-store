import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPromos } from "../controllers/promos.controller.js";

const router = Router();

router.get("/", asyncHandler(getPromos));

export default router;

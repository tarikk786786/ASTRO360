import { Router } from "express";
import health from "./health";
import astrology from "./astrology";
import gemini from "./gemini/index";

const router = Router();

router.use("/healthz", health);
router.use("/astrology", astrology);
router.use("/gemini", gemini);

export default router;

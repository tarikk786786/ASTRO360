import { Router } from "express";
import health from "./health";
import astrology from "./astrology";
import gemini from "./gemini/index";
import notifications from "./notifications";

const router = Router();

router.use("/healthz", health);
router.use("/astrology", astrology);
router.use("/gemini", gemini);
router.use("/notifications", notifications);

export default router;

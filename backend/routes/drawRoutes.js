import express from "express";
import { drawCards, lastDraw } from "../controllers/drawController.js";
import { authenticate } from "../middleware/authmiddle.js";

const router = express.Router();

router.post("/:userId",authenticate, lastDraw, drawCards);

export default router;
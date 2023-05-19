import express from "express";
import { generateRecipe } from "../controllers/bot.js";
import { authJWT } from "../middleware/authJWT.js";
import { openaiApiConfig } from "../middleware/openaiApiConfig.js";

const router = express.Router();

router.post("/generate", authJWT, openaiApiConfig, generateRecipe);

export default router;

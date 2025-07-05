import express from "express";
import { openAiTextController ,geminiTextController } from "../../../controllers/textControllers.js";
import { authenticateToken } from "../../../middlewares/authMiddleWare.js";
const router = express.Router();

router.get('/openai' ,authenticateToken , openAiTextController);
router.get('/gemini'  , authenticateToken , geminiTextController);
export default router;
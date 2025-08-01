import express from "express";
import { openAiTextController ,geminiTextController,openAiTextWithChatController,
    geminiTextWithChatController } from "../../../controllers/textControllers.js";
import { authenticateToken } from "../../../middlewares/authMiddleWare.js";
const router = express.Router();

router.get('/openai' ,authenticateToken , openAiTextController);
router.get('/gemini'  , authenticateToken , geminiTextController);


router.post('/openai/chat', authenticateToken, openAiTextWithChatController);
router.post('/gemini/chat', authenticateToken, geminiTextWithChatController);
export default router;
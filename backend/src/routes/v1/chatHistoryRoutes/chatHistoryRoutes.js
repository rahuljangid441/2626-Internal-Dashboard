import express from 'express';


import { authenticateToken } from '../../../middlewares/authMiddleWare.js';
import {
    getUserChatHistoriesController,
    getChatByIdController,
    createChatController,
    getActiveChatController
} from '../../../controllers/chatHistoryController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Chat history routes
router.get('/', getUserChatHistoriesController); // Get all chats for user
router.get('/active', getActiveChatController); // Get or create active chat
router.get('/:chatId', getChatByIdController); // Get specific chat

router.post('/', createChatController); // Create new chat

export default router;
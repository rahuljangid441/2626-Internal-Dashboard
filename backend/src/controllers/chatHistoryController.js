import {
    createNewChat,
    getChatById,
    getUserChats,
    getOrCreateActiveChat
} from "../services/chatHistoryService.js";


export const getUserChatHistoriesController = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const userId = req.user.id;

        const result = await getUserChats(userId, parseInt(page), parseInt(limit));

        return res.status(200).json({
            success: true,
            message: "Chat histories retrieved successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve chat histories",
            error: error.message
        });
    }
};


export const getChatByIdController = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user.id;

        const chat = await getChatById(chatId, userId);

        return res.status(200).json({
            success: true,
            message: "Chat retrieved successfully",
            data: chat
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Chat not found",
            error: error.message
        });
    }
};


export const createChatController = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.id;

        const chat = await createNewChat(userId, title);

        return res.status(201).json({
            success: true,
            message: "Chat created successfully",
            data: chat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create chat",
            error: error.message
        });
    }
};


export const getActiveChatController = async (req, res) => {
    try {
        const userId = req.user.id;

        const chat = await getOrCreateActiveChat(userId);

        return res.status(200).json({
            success: true,
            message: "Active chat retrieved successfully",
            data: chat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get active chat",
            error: error.message
        });
    }
};
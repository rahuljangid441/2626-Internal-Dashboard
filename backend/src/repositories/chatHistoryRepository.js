import ChatHistory from "../schema/chatHistorySchema.js";

export const createChatHistory = async (userId, title = "New Chat") => {
    try {
        const chatHistory = new ChatHistory({
            userId,
            title,
            messages: []
        });
        return await chatHistory.save();
    } catch (error) {
        throw new Error(`Failed to create chat history: ${error.message}`);
    }
};

export const getChatHistoryById = async (chatId, userId) => {
    try {
        return await ChatHistory.findOne({ _id: chatId, userId });
    } catch (error) {
        throw new Error(`Failed to get chat history: ${error.message}`);
    }
};

export const getUserChatHistories = async (userId, limit = 20, skip = 0) => {
    try {
        return await ChatHistory.find({ userId, isActive: true })
            .sort({ lastActivity: -1 })
            .limit(limit)
            .skip(skip)
            .select('title lastActivity createdAt messages');
    } catch (error) {
        throw new Error(`Failed to get user chat histories: ${error.message}`);
    }
};

export const addMessageToChat = async (chatId, message) => {
    try {
        const chatHistory = await ChatHistory.findById(chatId);
        if (!chatHistory) {
            throw new Error("Chat history not found");
        }

        chatHistory.messages.push(message);
        chatHistory.lastActivity = new Date();
        
        // Update title if it's still the default and this is the first user message
        if (chatHistory.title === "New Chat" && message.role === "user") {
            chatHistory.title = message.content.substring(0, 50) + (message.content.length > 50 ? "..." : "");
        }

        return await chatHistory.save();
    } catch (error) {
        throw new Error(`Failed to add message to chat: ${error.message}`);
    }
};

export const getActiveChatHistory = async (userId) => {
    try {
        return await ChatHistory.findOne({ 
            userId, 
            isActive: true 
        }).sort({ lastActivity: -1 });
    } catch (error) {
        throw new Error(`Failed to get active chat history: ${error.message}`);
    }
};
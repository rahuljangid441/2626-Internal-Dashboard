import { 
    createChatHistory, 
    getChatHistoryById, 
    getUserChatHistories, 
    addMessageToChat, 
    getActiveChatHistory
} from "../repositories/chatHistoryRepository.js";

export const createNewChat = async (userId, title) => {
    try {
        return await createChatHistory(userId, title);
    } catch (error) {
        throw new Error(`Failed to create new chat: ${error.message}`);
    }
};

export const getChatById = async (chatId, userId) => {
    try {
        const chat = await getChatHistoryById(chatId, userId);
        if (!chat) {
            throw new Error("Chat not found or access denied");
        }
        return chat;
    } catch (error) {
        throw new Error(`Failed to get chat: ${error.message}`);
    }
};

export const getUserChats = async (userId, page = 1, limit = 20) => {
    try {
        const skip = (page - 1) * limit;
        const chats = await getUserChatHistories(userId, limit, skip);
        
        // Get total count for pagination
        const totalChats = await getUserChatHistories(userId, 1000, 0);
        const totalPages = Math.ceil(totalChats.length / limit);
        
        return {
            chats,
            pagination: {
                currentPage: page,
                totalPages,
                totalChats: totalChats.length,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        };
    } catch (error) {
        throw new Error(`Failed to get user chats: ${error.message}`);
    }
};

export const addUserMessage = async (chatId, content, model = null) => {
    try {
        const message = {
            role: 'user',
            content,
            model,
            timestamp: new Date()
        };
        
        return await addMessageToChat(chatId, message);
    } catch (error) {
        throw new Error(`Failed to add user message: ${error.message}`);
    }
};

export const addAssistantMessage = async (chatId, content, model = null) => {
    try {
        const message = {
            role: 'assistant',
            content,
            model,
            timestamp: new Date()
        };
        
        return await addMessageToChat(chatId, message);
    } catch (error) {
        throw new Error(`Failed to add assistant message: ${error.message}`);
    }
};

export const getOrCreateActiveChat = async (userId) => {
    try {
        let activeChat = await getActiveChatHistory(userId);
        
        if (!activeChat) {
            activeChat = await createChatHistory(userId);
        }
        
        return activeChat;
    } catch (error) {
        throw new Error(`Failed to get or create active chat: ${error.message}`);
    }
};

// Text generation with chat history
export const processTextGenerationWithChat = async (userId, prompt, model, textGenerationFunction) => {
    try {
        // Get or create active chat
        let chat = await getOrCreateActiveChat(userId);
        
        // Add user message
        await addUserMessage(chat._id, prompt, model);
        
        // Generate text
        const textResult = await textGenerationFunction(prompt);
        
        // Add assistant message
        await addAssistantMessage(chat._id, textResult, model);
        
        // Return updated chat and text result
        const updatedChat = await getChatHistoryById(chat._id, userId);
        
        return {
            chat: updatedChat,
            textResult
        };
    } catch (error) {
        throw new Error(`Failed to process text generation with chat: ${error.message}`);
    }
};
import axios from "../config/axiosConfig";

// Get all chat histories for the user
export const getChatHistories = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(`/api/v1/chat-history?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a specific chat by ID
export const getChatById = async (chatId) => {
  try {
    const response = await axios.get(`/api/v1/chat-history/${chatId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get or create active chat
export const getActiveChat = async () => {
  try {
    const response = await axios.get('/api/v1/chat-history/active');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new chat
export const createNewChat = async (title = "New Chat") => {
  try {
    const response = await axios.post('/api/v1/chat-history', { title });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Send message with chat history (OpenAI)
export const sendMessageWithChatOpenAI = async (prompt) => {
  try {
    const response = await axios.post('/api/v1/text/openai/chat', { prompt });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Send message with chat history (Gemini)
export const sendMessageWithChatGemini = async (prompt) => {
  try {
    const response = await axios.post('/api/v1/text/gemini/chat', { prompt });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 
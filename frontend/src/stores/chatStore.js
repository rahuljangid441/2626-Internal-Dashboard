import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  // State
  currentChat: null,
  chatHistory: [],
  isLoading: false,
  isGenerating: false,
  error: null,
  selectedModel: 'gpt-3.5-turbo', // 'gpt-3.5-turbo' or 'gemini'

  // Actions
  setCurrentChat: (chat) => set({ currentChat: chat }),
  
  setChatHistory: (history) => set({ chatHistory: history }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setGenerating: (generating) => set({ isGenerating: generating }),
  
  setError: (error) => set({ error }),
  
  setSelectedModel: (model) => set({ selectedModel: model }),
  
  addMessageToCurrentChat: (message) => {
    const { currentChat } = get();
    if (currentChat) {
      set({
        currentChat: {
          ...currentChat,
          messages: [...currentChat.messages, message]
        }
      });
    }
  },
  
  updateChatTitle: (chatId, title) => {
    const { chatHistory } = get();
    set({
      chatHistory: chatHistory.map(chat => 
        chat._id === chatId ? { ...chat, title } : chat
      )
    });
  },
  
  clearError: () => set({ error: null }),
  
  reset: () => set({
    currentChat: null,
    chatHistory: [],
    isLoading: false,
    isGenerating: false,
    error: null
  })
}));

export default useChatStore; 
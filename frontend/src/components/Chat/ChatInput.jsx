import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import useChatStore from '../../stores/chatStore';
import { sendMessageWithChatOpenAI, sendMessageWithChatGemini } from '../../apis/chatApi';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);
  
  const { 
    currentChat, 
    selectedModel, 
    setSelectedModel, 
    setGenerating,
    addMessageToCurrentChat,
    setCurrentChat,
    setError,
    clearError
  } = useChatStore();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || !currentChat) return;

    try {
      setIsSubmitting(true);
      setGenerating(true);
      clearError();

      // Add user message immediately
      const userMessage = {
        role: 'user',
        content: message.trim(),
        model: selectedModel,
        timestamp: new Date()
      };
      
      addMessageToCurrentChat(userMessage);
      setMessage('');

      // Send to API
      const apiFunction = selectedModel === 'gemini' 
        ? sendMessageWithChatGemini 
        : sendMessageWithChatOpenAI;
      
      const response = await apiFunction(userMessage.content);
      
      if (response.success) {
        // Update current chat with the new data from backend
        setCurrentChat(response.data.chat);
      } else {
        throw new Error(response.message || 'Failed to send message');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message || 'Failed to send message');
      
      // Remove the user message if it failed
      if (currentChat?.messages) {
        const updatedMessages = currentChat.messages.filter(
          msg => msg.content !== message.trim()
        );
        setCurrentChat({
          ...currentChat,
          messages: updatedMessages
        });
      }
    } finally {
      setIsSubmitting(false);
      setGenerating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!currentChat) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select a chat or create a new one to start messaging
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      {/* Model Selection */}
      <div className="mb-3">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gemini">Gemini</option>
        </select>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none max-h-32 text-sm"
            rows={1}
          />
        </div>
        
        <button
          type="submit"
          disabled={!message.trim() || isSubmitting}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput; 
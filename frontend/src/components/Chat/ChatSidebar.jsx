import React from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import useChatStore from '../../stores/chatStore';
import { createNewChat } from '../../apis/chatApi';

const ChatSidebar = () => {
  const { 
    chatHistory, 
    currentChat, 
    setCurrentChat, 
    setChatHistory, 
    isLoading,
    setLoading 
  } = useChatStore();

  const handleNewChat = async () => {
    try {
      setLoading(true);
      const response = await createNewChat();
      if (response.success) {
        const newChat = response.data;
        setChatHistory([newChat, ...chatHistory]);
        setCurrentChat(newChat);
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={handleNewChat}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatHistory.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>No chats yet</p>
            <p className="text-sm">Start a new conversation!</p>
          </div>
        ) : (
          <div className="p-2">
            {chatHistory.map((chat) => (
              <div
                key={chat._id}
                onClick={() => handleChatSelect(chat)}
                className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                  currentChat?._id === chat._id
                    ? 'bg-indigo-50 border border-indigo-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(chat.lastActivity)}
                    </p>
                    {chat.messages && chat.messages.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {chat.messages[chat.messages.length - 1]?.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar; 
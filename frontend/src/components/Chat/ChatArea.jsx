import React, { useRef, useEffect } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import useChatStore from '../../stores/chatStore';
import ChatMessage from './ChatMessage';

const ChatArea = () => {
  const { currentChat, isGenerating, error } = useChatStore();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Welcome to AI Chat
          </h3>
          <p className="text-gray-500">
            Select a chat from the sidebar or create a new one to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {currentChat.title}
        </h2>
        <p className="text-sm text-gray-500">
          {currentChat.messages?.length || 0} messages
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {currentChat.messages && currentChat.messages.length > 0 ? (
          <div className="space-y-4">
            {currentChat.messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            
            {/* Loading indicator */}
            {isGenerating && (
              <div className="flex justify-start mb-4">
                <div className="flex max-w-[80%]">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-gray-100 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatArea; 
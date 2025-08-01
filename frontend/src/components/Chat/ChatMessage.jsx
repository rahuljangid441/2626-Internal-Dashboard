import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-indigo-600' : 'bg-gray-600'
          }`}>
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-2 rounded-lg ${
            isUser 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}>
            <div className="whitespace-pre-wrap text-sm">
              {message.content}
            </div>
          </div>
          
          {/* Timestamp and Model Info */}
          <div className={`flex items-center mt-1 text-xs text-gray-500 ${
            isUser ? 'justify-end' : 'justify-start'
          }`}>
            <span>{formatTime(message.timestamp)}</span>
            {message.model && (
              <span className="ml-2 px-2 py-1 bg-gray-200 rounded-full">
                {message.model === 'gpt-3.5-turbo' ? 'GPT-3.5' : 
                 message.model === 'gpt-4' ? 'GPT-4' : 
                 message.model === 'gemini' ? 'Gemini' : message.model}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 
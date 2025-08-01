import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import useChatStore from '../stores/chatStore';
import { getChatHistories, getActiveChat } from '../apis/chatApi';
import ChatSidebar from '../components/Chat/ChatSidebar';
import ChatArea from '../components/Chat/ChatArea';
import ChatInput from '../components/Chat/ChatInput';

function AIChat() {
  const navigate = useNavigate();
  const { 
    setChatHistory, 
    setCurrentChat, 
    setLoading, 
    setError,
    clearError 
  } = useChatStore();

  // Load chat data on component mount
  useEffect(() => {
    const loadChatData = async () => {
      try {
        setLoading(true);
        clearError();

        // Load chat histories
        const historiesResponse = await getChatHistories();
        if (historiesResponse.success) {
          setChatHistory(historiesResponse.data.chats || []);
        }

        // Load active chat
        const activeChatResponse = await getActiveChat();
        if (activeChatResponse.success) {
          setCurrentChat(activeChatResponse.data);
        }

      } catch (error) {
        console.error('Error loading chat data:', error);
        setError('Failed to load chat data');
      } finally {
        setLoading(false);
      }
    };

    loadChatData();
  }, [setChatHistory, setCurrentChat, setLoading, setError, clearError]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 text-indigo-600 mr-2" />
                <h1 className="text-xl font-semibold text-gray-900">AI Chat</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Chat Interface */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <ChatSidebar />
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatArea />
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

export default AIChat; 
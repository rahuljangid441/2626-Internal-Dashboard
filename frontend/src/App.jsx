import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TextGeneration from './pages/TextGeneration';
import ImageGeneration from './pages/ImageGeneration';
import VideoGeneration from './pages/VideoGeneration';
import AIChat from './pages/AIChat';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Register setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/ai-chat" 
            element={
              isAuthenticated ? <AIChat /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/text-generation" 
            element={
              isAuthenticated ? <TextGeneration /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/image-generation" 
            element={
              isAuthenticated ? <ImageGeneration /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/video-generation" 
            element={
              isAuthenticated ? <VideoGeneration /> : <Navigate to="/login" />
            } 
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 
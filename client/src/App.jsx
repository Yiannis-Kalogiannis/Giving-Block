import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../src/hooks/ProtectedRoute.jsx';
import { SocketContextProvider } from '../src/context/SocketContext.jsx'

// Pages imports
import Register from '../src/pages/Register.jsx';
import Login from './pages/LogIn.jsx';
import HomePage from './pages/HomePage.jsx';
import UserProfile from './pages/UserProfile.jsx';
import MainChatPage from '../src/pages/chat/MainChatPage.jsx';
import { Toaster } from 'react-hot-toast';




function App() {
  return (
    <>
     <Toaster   />
      <BrowserRouter>
      <SocketContextProvider>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userProfile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <MainChatPage />
          </ProtectedRoute>
        }
      />
    </Routes>
    </SocketContextProvider>
</BrowserRouter>

    </>
  );
}






export default App;
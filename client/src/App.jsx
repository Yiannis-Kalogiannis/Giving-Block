import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../src/hooks/ProtectedRoute.jsx';

// Pages imports
import Register from '../src/pages/Register.jsx';
import Login from './pages/LogIn.jsx';
import HomePage from './pages/HomePage.jsx';
import UserProfile from './pages/UserProfile.jsx';
import MainChatPage from '../src/pages/chat/MainChatPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
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
          path="/Chat"
          element={
            <ProtectedRoute>
              <MainChatPage />
            </ProtectedRoute>
          }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

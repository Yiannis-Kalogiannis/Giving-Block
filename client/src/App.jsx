import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceSearch from '../src/components/SearchService.jsx';
import Register from '../src/pages/Register.jsx';
import Login from './pages/LogIn.jsx';
import CreateService from './pages/CreateService.jsx';
('./pages/CreateService.jsx');
import HomePage from './pages/HomePage.jsx';
import UserProfile from './pages/UserProfile.jsx';
import ProtectedRoute from '../src/hooks/ProtectedRoute.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <ServiceSearch />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

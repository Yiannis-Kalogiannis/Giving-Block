import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceSearch from '../src/components/SearchService.jsx';
import Register from '../src/pages/Register.jsx';
import Login from './pages/LogIn.jsx';

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServiceSearch />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </>
    );
}

export default App;

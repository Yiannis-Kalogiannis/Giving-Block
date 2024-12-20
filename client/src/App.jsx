import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceSearch from '../src/components/SearchService.jsx';
import Register from '../src/pages/Register.jsx';

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServiceSearch />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </>
    );
}

export default App;

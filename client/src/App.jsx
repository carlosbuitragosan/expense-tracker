import './App.css';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

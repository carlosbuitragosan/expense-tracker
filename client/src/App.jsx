import './App.css';
import { Register } from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

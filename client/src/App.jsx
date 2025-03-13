import './App.css';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashBoard } from './components/Dashboard';
import { ProtectedRoutes } from './components/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <DashBoard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

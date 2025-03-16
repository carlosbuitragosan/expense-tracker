import { Register } from './components/Register';
import { Login } from './components/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashBoard } from './components/Dashboard';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Navbar } from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
    </AuthProvider>
  );
}

export default App;

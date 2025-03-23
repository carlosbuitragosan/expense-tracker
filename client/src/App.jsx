import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { DashBoard } from './components/Dashboard/Dashboard';
import { ProtectedRoutes } from './components/ProtectedRoutes/ProtectedRoutes';
import { Navbar } from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthProvider';
import { Expenses } from './components/expenses/expenses';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer
          autoClose={2300}
          position="top-center"
          hideProgressBar={true}
          pauseOnHover={false}
          closeOnClick
        />
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
          <Route
            path="/expenses"
            element={
              <ProtectedRoutes>
                <Expenses />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

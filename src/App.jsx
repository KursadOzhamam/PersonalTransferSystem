import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotStepOne from "./features/auth/StepOne";
import ForgotStepTwo from "./features/auth/StepTwo";
import ResetPassword from "./features/auth/ResetPassword";
import PersonnelInfo from "./pages/PersonnelInfo"; 
import AdminLogin from "./features/dashboard/AdminLogin";
import AdminDashboard from "./features/dashboard/AdminDashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/shared/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotStepOne />} />
        <Route path="/forgot-step2" element={<ForgotStepTwo />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* 🔐 Koruma altına alınmış rotalar */}
        <Route path="/personnel-info" element={
          <PrivateRoute><PersonnelInfo /></PrivateRoute>
        } />
        <Route path="/admin/dashboard" element={
          <PrivateRoute><AdminDashboard /></PrivateRoute>
        } />

        {/* Admin giriş ekranı korumasız olabilir */}
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

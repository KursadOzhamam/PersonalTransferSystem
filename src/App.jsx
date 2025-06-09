// 📁 src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome";
import ForgotStepOne from "./pages/Forgot/StepOne";
import ForgotStepTwo from "./pages/Forgot/StepTwo";
import ResetPassword from "./pages/Forgot/ResetPassword";
import PersonalDetails from "./pages/PersonalDetails";
import TabsPanel from "./components/TabsPanel";
import PersonnelInfo from "./pages/PersonnelInfo"; // ✅ bu bileşeni doğru import ettin
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/forgot" element={<ForgotStepOne />} />
        <Route path="/forgot-step2" element={<ForgotStepTwo />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/details" element={<PersonalDetails />} />
        <Route path="/panel" element={<TabsPanel />} />
        <Route path="/personnel-info" element={<PersonnelInfo />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
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

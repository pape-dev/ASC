import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import FraudesPage from "./FraudesPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ProfilePage from "./ProfilePage";
import ResetPasswordPage from "./ResetPasswordPage";
import SignalementPage from "./SignalementPage";
import FormulaireContact from "./FormulaireContact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/fraudes" element={<FraudesPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/signalement" element={<SignalementPage />} />
        <Route path="/contact" element={<FormulaireContact />} />
      </Routes>
    </BrowserRouter>
  );
}

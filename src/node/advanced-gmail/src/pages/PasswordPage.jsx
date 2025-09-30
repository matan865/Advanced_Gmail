import React from "react";
import PasswordForm from "../components/forms/PasswordForm";
import LogoPanel from "../components/common/LogoPanel";
import "../styles/login.css";

function PasswordPage() {
  const email = localStorage.getItem("userEmail");

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-container d-flex align-items-center justify-content-between">
        <LogoPanel title="Welcome" subtitle={email} />
        <PasswordForm />
      </div>
    </div>
  );
}

export default PasswordPage;

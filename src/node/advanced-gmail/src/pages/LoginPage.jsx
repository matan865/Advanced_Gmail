import React from "react";
import LoginForm from "../components/forms/LoginForm";
import LogoPanel from "../components/common/LogoPanel";
import "../styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function LoginPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-container d-flex align-items-center justify-content-between">
        <LogoPanel />
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;

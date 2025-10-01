import React from "react";
import SignUpForm from "../components/forms/SignUpForm";
import LogoPanel from "../components/common/LogoPanel";
import "../styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function SignUpPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-container d-flex align-items-center justify-content-between" style={{ height: "75%" }}>
        <LogoPanel title="Create account" subtitle="" />
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;

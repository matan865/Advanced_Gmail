import React from "react";
import ChooseMailForm from "../components/forms/ChooseMailForm";
import LogoPanel from "../components/common/LogoPanel";
import "../styles/login.css";

function ChooseMailPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-container d-flex align-items-center justify-content-between">
        <LogoPanel title="Choose your" subtitle="Mail address" />
        <ChooseMailForm />
      </div>
    </div>
  );
}

export default ChooseMailPage;

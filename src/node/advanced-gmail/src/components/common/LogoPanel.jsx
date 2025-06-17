import React from "react";
import logo from "../../img/mail_logo.png"; 

function LogoPanel({ title = "Sign in", subtitle = "to continue to Gmail" }) {
  return (
    <div className="left-section">
      <img src={logo} alt="Logo" className="logo mb-3" />
      <h2 className="mb-1">{title}</h2>
      {subtitle && <p className="text-muted mb-4">{subtitle}</p>}
    </div>
  );
}


export default LogoPanel;

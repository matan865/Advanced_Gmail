import React from "react";
import { useNavigate } from "react-router-dom";


function IconButton({ icon, label, badge, id, goTo, onClick ,title}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (goTo) navigate(goTo);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center p-2 rounded hover-bg"
      id={id}
      onClick={handleClick}
      role="button"
      style={{ cursor: "pointer" }}
      title={title || label}
    >
      <i className={`bi ${icon}`}></i>
      <span>{label}</span>
        {badge !== undefined && badge !== null && (
          <span className="badge text-bg-primary rounded-pill">{badge}</span>
        )}
    </div>
  );
}

export default IconButton;

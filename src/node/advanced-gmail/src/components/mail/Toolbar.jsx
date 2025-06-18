import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../../img/mail_logo.png";
import { useNavigate } from "react-router-dom";



function Toolbar({ isSidebarOpen, setIsSidebarOpen , onSearch  }) {
  const navigate = useNavigate();
  return (
    <div className="mainBar container-fluid text-center">
      <div className="row">
        <div className="col-1">
          <nav className="navbar navbar-light bg-light px-3">
            <button className="btn btn-outline-secondary" id="toggleSidebarBtn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <i className="bi bi-list"></i>
            </button>
          </nav>
        </div>
        <div
          className="col-2 d-flex align-items-center"
          onClick={() => navigate("/inbox")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="logo" className="img-fluid" style={{ width: "30px" }} />
          <span className="ms-2">Mail</span>
        </div>

        <div className="col-5">
          <input type="text" className="form-control" placeholder="Search mail" onChange={(e) => onSearch(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsBook, BsPencilSquare, BsList } from "react-icons/bs";
import logo from "../assets/logo/logo.png";
import "../styles/dashboardheader.css";

function DashboardHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const storedImage = localStorage.getItem("profileImageUrl");
  const profileImage = storedImage || logo;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="nav_bar">
      <div className="logo" onClick={() => handleNavigate("/dashboard/read")}>
        <img src={logo} className="logo_img" alt="Dashboard Logo" />
      </div>

      <div className="actions-container">
        {/* Desktop Buttons */}
        <div className="act_btns desktop-only">
          <button
            className={`primary_btn ${
              currentPath === "/dashboard/read" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/dashboard/read")}
          >
            <BsBook className="primary_btn_icons" />
            Read
          </button>
          <button
            className={`primary_btn ${
              currentPath === "/dashboard/write" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/dashboard/write")}
          >
            <BsPencilSquare className="primary_btn_icons" />
            Write
          </button>
        </div>

        {/* Profile icon - always visible */}
        <div
          className={`profile-icon`}
          onClick={() => handleNavigate("/dashboard/profile")}
        >
          <img
            src={profileImage}
            className={`profile_img ${
              currentPath === "/dashboard/profile" ? "active" : ""
            }`}
            alt="Profile"
          />
        </div>

        {/* Hamburger icon - only on mobile */}
        <div className="mobile-actions">
          <BsList className="hamburger" onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button
            className={`primary_btn ${
              currentPath === "/dashboard/read" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/dashboard/read")}
          >
            <BsBook className="primary_btn_icons" />
            Read
          </button>
          <button
            className={`primary_btn ${
              currentPath === "/dashboard/write" ? "active" : ""
            }`}
            onClick={() => handleNavigate("/dashboard/write")}
          >
            <BsPencilSquare className="primary_btn_icons" />
            Write
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardHeader;

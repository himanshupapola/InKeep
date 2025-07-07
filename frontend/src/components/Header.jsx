import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import "../styles/header.css";
import useAuth from "../hooks/useAuth";
import { AUTH_API } from "../config/api";
function Logo() {
  return (
    <NavLink to="/">
      <img src={logo} className="logo" alt="logo" />
    </NavLink>
  );
}

function Navigation({ isOpen, toggleMenu }) {
  const { isLoggedIn, checkLoginStatus, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(AUTH_API.LOGOUT, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    }

    toggleMenu();
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className={`nav ${isOpen ? "open" : ""}`}>
      <div className="subNav">
        <NavLink to="/" className="navlink" onClick={toggleMenu}>
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/dashboard" className="navlink" onClick={toggleMenu}>
            Dashboard
          </NavLink>
        )}
        <NavLink to="/about" className="navlink" onClick={toggleMenu}>
          About Us
        </NavLink>
      </div>

      {!isLoggedIn && (
        <div className="subNav">
          <NavLink to="/login" className="navlink" onClick={toggleMenu}>
            Sign In
          </NavLink>
          <NavLink to="/signup" className="navlink" onClick={toggleMenu}>
            Sign Up
          </NavLink>
        </div>
      )}

      {isLoggedIn && (
        <div className="subNav">
          <button className="logout__btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="header">
      <div className="subHeader">
        <Logo />
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <Navigation isOpen={menuOpen} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
}

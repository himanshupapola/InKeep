import React, { useState } from "react";

export default function PassphraseModal({ onKeySubmit }) {
  const [passphrase, setPassphrase] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passphrase.trim()) {
      onKeySubmit(passphrase.trim());
    }
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(20, 20, 20, 0.9)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalStyle = {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    marginTop: "1rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  const buttonStyle = {
    marginTop: "1.5rem",
    padding: "0.7rem 2rem",
    fontSize: "1rem",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={overlayStyle}>
      <form style={modalStyle} onSubmit={handleSubmit}>
        <h5 style={{fontWeight: "700"}}>🔐 Enter Your Encryption Key</h5>
        <input
          type="text"
          placeholder="Enter your passphrase"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Unlock
        </button>
      </form>
    </div>
  );
}

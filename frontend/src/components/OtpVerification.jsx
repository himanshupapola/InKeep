import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AUTH_API } from "../config/api";

export default function OtpVerification({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    sendOtp();

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showAlert = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "bottom",
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const sendOtp = async () => {
    try {
      const res = await fetch(AUTH_API.SEND_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        return showAlert("error", "OTP Send Failed");
      }

      showAlert("success", "OTP Sent");
    } catch (error) {
      console.error(error);
      showAlert("error", "Server Error");
    }
  };

  const verifyOtp = async () => {
    try {
     const res = await fetch(AUTH_API.VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        return showAlert("error", data.error || "Invalid OTP");
      }

      showAlert("success", "Email verified successfully");

      setTimeout(() => {
        onVerified(); // Trigger next step
      }, 300);
    } catch (error) {
      console.error(error);
      showAlert("error", "Verification failed");
    }
  };

  const resendOtp = async () => {
    await sendOtp(); // Send new OTP
    setTimer(120); // Restart timer
    setCanResend(false); // Disable resend link
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        width: "85%",
      }}
      className="otps"
    >
      <div
        style={{
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <h3
          style={{
            marginBottom: "0.5rem",
            fontWeight: "600",
            fontSize: "18px",
            color: "#a04551",
          }}
        >
          Please Verify Your Email
        </h3>
        <p
          style={{ marginBottom: "1.5rem", color: "#555", fontSize: "0.95rem" }}
        >
          OTP sent to <strong>{email}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{
            padding: "12px",
            fontSize: "15px",
            width: "100%",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
            outline: "none",
          }}
        />

        <button
          onClick={verifyOtp}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#a04551",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          Verify
        </button>

        <p style={{ fontSize: "14px", color: "#777" }}>
          {canResend ? (
            <span
              onClick={resendOtp}
              style={{
                color: "#4f46e5",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Resend OTP
            </span>
          ) : (
            <>Resend in {timer}s</>
          )}
        </p>
      </div>
    </div>
  );
}

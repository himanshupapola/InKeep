import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/login.css";
import LoginImage from "../assets/images/Login.png";
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OtpVerification from "../components/OtpVerification";
import { AUTH_API } from "../config/api";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [otpRequired, setOtpRequired] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Make post login req here
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      const res = await fetch(AUTH_API.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();

      if (!res.ok) {
        toast.dismiss();
        if (res.status === 401 && text.toLowerCase().includes("verification")) {
          toast.error("Email verification required. Please check your inbox.");
          setOtpRequired(true);
        } else {
          toast.error(text || "Invalid email or password");
        }
      } else {
        toast.success(text || "Login successful");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Server error. Please try again later.");
      console.error(err);
    }
  };

  const handleVerified = () => {
    toast.success("Verified! You can now log in.");
    setOtpRequired(false);
  };

  if (otpRequired) {
    return (
      <OtpVerification email={formData.email} onVerified={handleVerified} />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="signup__form">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
      />
      <div className="input__field">
        <AiOutlineMail />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />
      </div>
      <div className="input__field">
        <AiOutlineLock />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          display: "none",
        }}
      >
        <label
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            name="remember-me"
            checked={formData.rememberMe}
            onChange={handleChange}
            style={{ marginRight: "7px" }}
          />
          <span style={{ fontSize: "14px" }}>Remember Me</span>
        </label>
      </div>
      <button type="submit" className="submit__btn">
        Login
      </button>
      <p className="login__link">
        New Here?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Sign up
        </span>
      </p>
    </form>
  );
}

export default function Login() {
  return (
    <>
      <Header />
      <SingupMain />
      <Footer />
    </>
  );
}

function SingupMain() {
  return (
    <div className="sign__outer">
      <div className="sign__inner sign__left">
        <img
          src={LoginImage}
          style={{ width: "85%" }}
          alt="Signup"
          className="signUpImage"
        />
      </div>
      <div className="sign__inner sign__right">
        <div className="login">
          <h3 style={{ fontWeight: 600 }}>Welcome Back 🙏</h3>
          <p>Sign in to your account</p>
          <Form />
        </div>
      </div>
    </div>
  );
}

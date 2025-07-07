import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/login.css";
import SignupImage from "../assets/images/Signup.png";
import { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { BsGenderAmbiguous } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCitySearch from "../hooks/useCitySearch";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_API } from "../config/api";
function validatePassword(pass) {
  const minLength = 8;
  let hasUpper = false;
  let hasLower = false;
  let hasDigit = false;
  let hasSpecial = false;

  for (let char of pass) {
    if (char >= "A" && char <= "Z") hasUpper = true;
    else if (char >= "a" && char <= "z") hasLower = true;
    else if (!isNaN(char)) hasDigit = true;
    else hasSpecial = true;
  }

  if (pass.length < minLength) return "Length must be minium 8";
  if (!hasUpper) return "Must include uppercase";
  if (!hasLower) return "Must include lowercase";
  if (!hasDigit) return "Must include a number";
  if (!hasSpecial) return "Must include special character";

  return "Valid";
}

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    city: "",
    gender: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cities, fetchCities } = useCitySearch();
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sumbit Singup d
  const submitSignupData = async (formData) => {
    try {
     const res = await fetch(AUTH_API.SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        setLoading(false);
      } else {
        toast.success(data.message || "OTP sent");
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, city: value }));
    fetchCities(value);
    setShowSuggestions(true);
  };

  const handleSelectCity = (cityName) => {
    setFormData((prev) => ({ ...prev, city: cityName }));
    setShowSuggestions(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const isoDate = date.toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      dob: isoDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, dob, city, gender, email, password } = formData;

    if (!name || !dob || !city || !gender || !email || !password) {
      toast.error("Please fill in all the fields.");
      return;
    }

    const result = validatePassword(password);
    if (result !== "Valid") {
      toast.error(result);
      return;
    }
    setLoading(true);
    await submitSignupData(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="signup__form">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
      />
      <div className="input__row">
        <div className="input__field">
          <AiOutlineUser />
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div className="input__field">
          <FiCalendar className="login__calendar" />
          <DatePicker
            selected={formData.dob}
            onChange={handleDateChange}
            placeholderText="Date of Birth"
            dateFormat="dd-MM-yyyy"
            className="date-picker-input"
            maxDate={new Date()}
          />
        </div>
      </div>

      <div className="input__row">
        <div className="input__field" style={{ position: "relative" }}>
          <FiMapPin />
          <input
            type="text"
            name="city"
            value={formData.city}
            placeholder="City"
            onChange={handleCityChange}
            autoComplete="nope"
          />
          {showSuggestions && cities.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                listStyle: "none",
                margin: 0,
                padding: 0,
                zIndex: 10,
                border: "1px solid #fff",
              }}
            >
              {cities.map((city) => (
                <li
                  key={city.geonameId}
                  onClick={() => handleSelectCity(city.name)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {city.name}, {city.countryName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="input__field">
          <BsGenderAmbiguous />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "16px",
              paddingLeft: "10px",
              color: "#333",
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

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
      <button type="submit" className="submit__btn" disabled={loading}>
        {loading ? "Creating account..." : "Create my account"}
      </button>
      <p className="policy__text">
        By continuing you agree to our{" "}
        <Link
          to="/privacy-policy"
          style={{ color: "#4f46e5", textDecoration: "underline" }}
        >
          Privacy Policy
        </Link>
      </p>
      <p className="login__link">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Log in
        </span>
      </p>
    </form>
  );
}

export default function Signup() {
  return (
    <>
      <>
        <Header />
        {<SingupMain />}
        <Footer />
      </>
    </>
  );
}

function SingupMain() {
  return (
    <div className="sign__outer">
      <div className="sign__inner sign__left">
        <img
          src={SignupImage}
          style={{ width: "85%" }}
          alt="Signup"
          className="signUpImage"
        />
      </div>

      <div className="sign__inner sign__right">
        <div className="signup">
          <h3 style={{ fontWeight: 600 }}>Let's Get Started 🚀</h3>
          <p>Sign up your account</p>
          <Form />
        </div>
      </div>
    </div>
  );
}

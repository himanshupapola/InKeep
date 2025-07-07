import Header from "../components/Header";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import about from "../assets/lottie/about.json";
import "../styles/about.css";

function AboutUs() {
  return (
    <div className="about__us">
      <div className="about__content">
        <div className="about__main">
          <h2 className="about__heading">
            {" "}
            <span
              style={{
                color: "#9b2535",
              }}
            >
              About Us
            </span>
          </h2>
          <div className="about__text">
            At <span className="brand__name">InKeep</span>, we believe that
            every
            <span className="brand__values"> thought</span>,
            <span className="brand__values"> emotion</span>, and
            <span className="brand__values"> moment</span> deserves a safe
            space. Whether you're{" "}
            <span className="brand__values">capturing memories</span>,
            <span className="brand__values"> organizing ideas</span>, or
            <span className="brand__values"> reflecting on your day</span>,
            <span className="brand__name"> InKeep</span> is your personal
            digital diary built for{" "}
            <span className="highlight__text">privacy</span>,
            <span className="highlight__text"> simplicity</span>, and
            <span className="highlight__text"> self-expression</span>.
          </div>
        </div>
        <div className="about__image">
          <Lottie animationData={about} loop={true} />
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <>
      <Header />
      <AboutUs />
      <Footer />
    </>
  );
}

export default About;

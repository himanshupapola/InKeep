import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/home.css";
import journalImage from "../assets/images/hero.jpg";
import image1 from "../assets/images/image1.jpg";
import backImage from "../assets/images/heroDeco.png";
import Features from "../components/Features";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero-outer">
        <div className="journal-container">
          <img src={backImage} className="backImage" />

          <div className="journal-text">
            <h1>
              Reflect Your Thoughts <br />
              <span>
                In{" "}
                <span
                  className="hero-highlight"
                  style={{
                    color: "#9b2535",
                  }}
                >
                  Your Own
                </span>
              </span>{" "}
              Way.
            </h1>
            <p>Loved by over million journalers around the world.</p>
            <button onClick={() => navigate("/dashboard")}>
              Start your free journal now →
            </button>
          </div>
          <div className="journal-image">
            <img src={journalImage} alt="Smiling woman using laptop" />
          </div>
        </div>
      </div>
    </>
  );
}

function JournalSteps() {
  return (
    <div className="journal-container steps-container">
      <div className="journal-text">
        <div className="step">
          <h2>1. Start writing</h2>
          <p>
            All you have to do is start. Take 5 minutes to write in your journal
            about how you're feeling or reflect on the day.
          </p>
        </div>
        <div className="step">
          <h2>2. Keep it going</h2>
          <p>
            The more you write the easier it will be. Set reminders to keep a
            regular daily, weekly, or monthly cadence.
          </p>
        </div>
        <div className="step">
          <h2>3. Reflect and grow</h2>
          <p>
            Links to your entries will be sent to you in the future so you can
            get see through clear window into the past.
          </p>
        </div>
      </div>
      <div className="journal-image">
        <img src={image1} alt="Person on mountain" />
      </div>
    </div>
  );
}

function StartJourney() {
  return (
    <div className="start-journey">
      <h2 className="start-heading">Start Your Journey Today</h2>
      <p className="start-description">
        Journaling is a proven way to completely change your life, especially
        when you stick with it over time. Each time you write you'll get
        unparalleled clarity and life perspective.
      </p>
    </div>
  );
}

function Privacy() {
  return (
    <div className="start-journey">
      <h2 className="start-heading">Privacy is our #1 concern</h2>
      <p className="start-description">
        Even when carefully kept, paper journals can be read by anyone who
        happens upon them. InKeep keeps your journals safe with double password
        protection and military strength encryption so you can rest easy knowing
        that your entries are secure in the InKeep Vault
      </p>
    </div>
  );
}

function Home() {
  return (
    <>
      <Header />

      <Hero />
      <Features />
      <StartJourney />
      <JournalSteps />
      <Privacy />
      <Reviews />
      <Footer />
    </>
  );
}

export default Home;

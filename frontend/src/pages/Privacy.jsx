import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/privacy.css"

export default function Privacy() {
  return (
    <>
      <Header />
      <div className="privacy-policy">
        <h1 className="policy-title">Privacy Policy</h1>

        <p className="policy-text">
          At <strong>InKeep</strong>, your privacy matters to us. This policy
          explains what information we collect, how we use it, and how we keep
          it safe.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect only the information you provide when you use our website
          or services, such as:
          <ul>
            <li>Your journal entries (stored securely)</li>
            <li>Your email address (if you sign up)</li>
            <li>Basic usage data to improve our app</li>
          </ul>
        </p>

        <h2>2. How We Use Your Data</h2>
        <p>
          We use your data to:
          <ul>
            <li>Deliver a personalized journaling experience</li>
            <li>Provide support and improve features</li>
            <li>Maintain security and performance</li>
          </ul>
        </p>

        <h2>3. Data Security</h2>
        <p>
          Your data is stored securely and is never shared or sold to third
          parties. We use encryption and best practices to protect your content.
        </p>

        <h2>4. Your Control</h2>
        <p>
          You can delete your account and all associated data at any time from
          your settings.
        </p>

        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this policy occasionally. When we do, we’ll notify you
          via email or in-app alert.
        </p>

        <p className="last-updated">
          <em>Last updated: June 12, 2025</em>
        </p>
      </div>
      <Footer />
    </>
  );
}

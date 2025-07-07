import React from "react";
import "../styles/features.css"
import { FaLock, FaSmile, FaCloudSun, FaThumbsUp } from "react-icons/fa";

const features = [
  {
    icon: <FaLock />,
    title: "E2EE Encryption",
    description: "Your privacy matters.",
  },
  {
    icon: <FaSmile />,
    title: "Mood",
    description: "Select your current mood.",
  },
  {
    icon: <FaCloudSun />,
    title: "Weather",
    description: "Write based on Weather.",
  },
  {
    icon: <FaThumbsUp />,
    title: "Easy to use",
    description: "Easy to use and customize.",
  },
];

export default function Features() {
  return (
    <div className="features-container">
      {features.map((feature, index) => (
        <div key={index} className="feature-wrapper">
          <div className="feature">
            <div className="icon-circle">{feature.icon}</div>
            <div className="feature-title">{feature.title}</div>
            <div className="feature-description">{feature.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

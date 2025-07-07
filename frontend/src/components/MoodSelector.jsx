import React, { useState } from "react";

const MoodSelector = ({ selectedMood, setSelectedMood }) => {
  const moodEmojis = ["😞", "😕", "😐", "🙂", "😄"];
  const moodLabels = ["Terrible", "Poor", "Okay", "Good", "Great"];

  const [hoveredMood, setHoveredMood] = useState(null);

  const handleSelect = (index) => {
    setSelectedMood(index + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        minWidth: "400px",
        backdropFilter: "blur(10px)",
        paddingBottom: "15px"
      }}
      className="specialMood"
    >
      <h2
        style={{
          color: "#a04551",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        How are you feeling today?
      </h2>

      <p
        style={{
          color: "#cb6471",
          fontSize: "14px",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Select your current mood
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          marginBottom: "20px",
          padding: "20px 10px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "15px",
          backdropFilter: "blur(10px)",
        }}
      >
        {moodEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            onMouseEnter={() => setHoveredMood(index)}
            onMouseLeave={() => setHoveredMood(null)}
            style={{
              fontSize: "40px",
              transform:
                selectedMood === index + 1
                  ? "scale(1.3) translateY(-5px)"
                  : hoveredMood === index
                  ? "scale(1.15) translateY(-2px)"
                  : "scale(1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              background:
                selectedMood === index + 1
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
              border: "none",
              cursor: "pointer",
              lineHeight: "1",
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                selectedMood === index + 1
                  ? "0 10px 25px rgba(0,0,0,0.2)"
                  : "none",
              filter:
                selectedMood === index + 1
                  ? "brightness(1.2)"
                  : hoveredMood === index
                  ? "brightness(1.1)"
                  : "brightness(0.9)",
            }}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div
        style={{
          color: "black",
          fontSize: "18px",
          fontWeight: "500",
          textAlign: "center",
          minHeight: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {moodLabels[selectedMood - 1]}
      </div>

      <div
        style={{
          display: "flex",
          gap: "4px",
          marginTop: "20px",
        }}
      >
        {moodEmojis.map((_, index) => (
          <div
            key={index}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background:
                selectedMood === index + 1
                  ? "black"
                  : "rgba(220, 220, 220, 0.78)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;

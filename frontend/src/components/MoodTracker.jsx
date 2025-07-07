import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { DIARY_API } from "../config/api";

function MoodMeter() {
  const [avgMood, setAvgMood] = useState(0);
  const moodLabels = ["Very Bad", "Bad", "Ok", "Good", "Very Good"];
  const moodEmojis = ["😞", "😕", "😐", "🙂", "😄"];

  useEffect(() => {
    const fetchAverageMood = async () => {
      try {
        const response = await fetch(DIARY_API.AVERAGE_MOOD, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const mood = await response.json();
        setAvgMood(Number(mood.toFixed(2)));
      } catch (error) {
        console.error("Error fetching average mood:", error);
      }
    };

    fetchAverageMood();
  }, []);

  const moodLabel = () => {
    const index = Math.min(Math.floor(avgMood), 4);
    return moodLabels[index];
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2 style={{ color: "#a04551", fontFamily: "monospace", fontWeight: "600" }}>
        Mood Weekly
      </h2>

      <div style={{ userSelect: "none" }}>
        <ReactSpeedometer
          maxValue={5}
          value={avgMood}
          segments={5}
          needleColor="black"
          startColor="#e74c3c"
          endColor="#27ae60"
          height={200}
          ringWidth={35}
          needleHeightRatio={0.65}
          currentValueText={moodLabel()}
          textColor="black"
          customSegmentLabels={moodEmojis.map((emoji) => ({
            text: emoji,
            position: "INSIDE",
            color: "black",
            fontSize: "22px",
          }))}
        />
      </div>
    </div>
  );
}

export default MoodMeter;

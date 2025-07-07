import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";

function Loading({ text = "Loading...", height = "100vh", background }) {
  const defaultBackground = "linear-gradient(135deg, #fff0f5ed, #ffe4e1ad)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height,
        background: background || defaultBackground,
      }}
      
    >
      <div style={{ width: "300px", height: "300px" }}>
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
      <p
        style={{
          marginTop: "16px",
          fontStyle: "italic",
          color: "#4B3F35",
          fontSize: "1.1rem",
          letterSpacing: "0.5px",
          textAlign: "center",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default Loading;

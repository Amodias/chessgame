import "../../styles/settingroom.css";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Creating a room for multiplayer chess...</p>
    </div>
  );
};

export default LoadingComponent;

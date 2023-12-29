import React from "react";
import Particles from "react-particles";
import { particlesInit, particlesOptions } from "./config";
const SpaceBackground = () => {
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default SpaceBackground;

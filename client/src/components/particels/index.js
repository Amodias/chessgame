import React from 'react';
import Particles from "react-particles";


const SpaceBackground = () => {
    const particlesOptions = {
      background: {
        color: {
          value: '#000000',
        },
      },
      particles: {
        number: {
          value: 100,
        },
        size: {
          value: 3,
        },
        shape: {
          type: 'circle',
        },
        color: {
          value: '#ffffff',
        },
      },
    };
  
    return (
      <Particles
        id="tsparticles"
        options={particlesOptions}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    );
  };

  export default SpaceBackground;
  
import React from 'react';
import Siderbar from '../components/sidebar';
import '../styles/Home.css';
import SpaceBackground from '../components/particels';
import LandingHomeComponent from '../components/landing';

const Home = () => {
  return (
    
<div className="board-wrapper">
  <div className="background-container">
    <SpaceBackground />
  </div>
  <div className="home-container">
    <Siderbar />
    <LandingHomeComponent/>
  </div>
</div>

    
  );
};

export default Home;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';

const Pawn = ({ color }) => {
    const pawnColor = color === 'white' ? '#FFF' : '#000'; // Set the color based on the prop
  
    return <FontAwesomeIcon icon={faChessPawn} style={{ fontSize: '2rem', color: pawnColor }} />;
  };

export default Pawn;

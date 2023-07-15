import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';

const Knight = ({ color }) => {
    const pawnColor = color === 'white' ? '#FFF' : '#000';
  return <FontAwesomeIcon icon={faChessKnight} style={{ fontSize: '2rem'   ,color: pawnColor }} />;
};

export default Knight;

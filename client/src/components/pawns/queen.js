import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';

const Queen = ({ color }) => {
    const pawnColor = color === 'white' ? '#FFF' : '#000';
  return <FontAwesomeIcon icon={faChessQueen} style={{ fontSize: '2rem'   ,color: pawnColor }} />;
};

export default Queen;

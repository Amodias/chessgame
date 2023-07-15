import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing } from '@fortawesome/free-solid-svg-icons';

const King = ({ color }) => {
    const pawnColor = color === 'white' ? '#FFF' : '#000';
  return <FontAwesomeIcon icon={faChessKing} style={{ fontSize: '2rem'   ,color: pawnColor }} />;
};

export default King;

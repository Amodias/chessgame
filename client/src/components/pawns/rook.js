import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';

const Rook = ({ color }) => {
    const pawnColor = color === 'white' ? '#FFF' : '#000';
  return <FontAwesomeIcon icon={faChessRook} style={{ fontSize: '2rem'   ,color: pawnColor }} />;
};

export default Rook;

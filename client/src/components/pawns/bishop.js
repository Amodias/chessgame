import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessBishop } from '@fortawesome/free-solid-svg-icons';

const Bishop = ({ color }) => {
    const pawnColor = color === 'white' ? '#FFF' : '#000';
  return <FontAwesomeIcon icon={faChessBishop} style={{ fontSize: '2rem'  ,color: pawnColor }} />;
};

export default Bishop;

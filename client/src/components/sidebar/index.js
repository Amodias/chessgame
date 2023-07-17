import '../../styles/Dashboard.css'
import '../../index.css'

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faGlobe, faMicrochip, faSignOutAlt, faBars, faChessBoard } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`sidebar ${isExpanded ? 'expanded' : ''} bg-black text-white h-screen py-4 px-2 flex flex-col justify-between`}>
        <div className="menu" onClick={toggleMenu}>
          <ul className={`menu-items ${isExpanded ? 'expanded' : ''} mb-4`}>
            <li className="flex items-center">
              <FontAwesomeIcon color='white' icon={faBars} className="mr-2" />
              {isExpanded && <span className="font-semibold">Menu</span>}
            </li>
          </ul>
        </div>
      </div>
      <div className={`sidebar-content sidebar ${isExpanded ? 'expanded' : ''} bg-black text-white py-4 px-2 flex flex-col justify-start`}>
        <ul className={`menu-items ${isExpanded ? 'expanded' : ''} mt-4`}>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon color='white' icon={faUser} className="mr-2" />
            {isExpanded && <span className="font-semibold">User</span>}
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon color='white' icon={faGlobe} className="mr-2" />
            {isExpanded && <span className="font-semibold">Multi-Player</span>}
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon color='white' icon={faMicrochip} className="mr-2" />
            {isExpanded && <span className="font-semibold">AI</span>}
          </li>
          <li className="flex items-center mb-2">
            <FontAwesomeIcon color='white' icon={faChessBoard} className="mr-2" />
            {isExpanded && <span className="font-semibold">Alone</span>}
          </li>
          <li className="flex items-center mt-8">
            <FontAwesomeIcon color='white' icon={faSignOutAlt} className="mr-2" />
            {isExpanded && <span className="font-semibold">Sign Out</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

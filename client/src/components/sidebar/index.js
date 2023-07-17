import '../../styles/Dashboard.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faEarthOceania, faMicrochip, faSignOutAlt, faBars, faChessBoard } from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div>

    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <div className="menu" onClick={toggleMenu}>
        <ul className={`menu-items ${isExpanded ? 'expanded' : ''}`}>
          <li>
            <FontAwesomeIcon color='white' icon={faBars} />
            {isExpanded && <span>Menu</span>}
          </li>
        </ul>
      </div>
    </div>
    <div className={`sidebar-content sidebar ${isExpanded ? 'expanded' : ''}`}>
      <ul className={`menu-items ${isExpanded ? 'expanded' : ''}`}>
        <li>
          <FontAwesomeIcon color='white' icon={faUser} />
          {isExpanded && <span>User</span>}
        </li>
        <li></li>
        <li>
          <FontAwesomeIcon color='white' icon={faEarthOceania} />
          {isExpanded && <span>Muli-Player</span>}
        </li>
        <li>
          <FontAwesomeIcon color='white' icon={faMicrochip} />
          {isExpanded && <span>AI</span>}
        </li>
        <li>
          <FontAwesomeIcon color='white' icon={faChessBoard} />
          {isExpanded && <span>Alone</span>}
        </li>
        <li></li>
        <li>
          <FontAwesomeIcon color='white' icon={faSignOutAlt} />
          {isExpanded && <span>Sign Out</span>}
        </li>
      </ul>
    </div>
    </div>

  );
};

export default Sidebar;

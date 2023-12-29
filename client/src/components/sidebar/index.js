import "../../styles/Dashboard.css";
import "../../index.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faMicrochip,
  faSignOutAlt,
  faBars,
  faChessBoard,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className="sidebar-container">
      <div
        className={`sidebar ${
          isExpanded ? "expanded" : ""
        } bg-black text-white h-screen py-4 px-2 flex flex-col justify-between`}
      >
        <div className="menu" onClick={toggleMenu}>
          <ul className={`menu-items ${isExpanded ? "expanded" : ""} mb-4`}>
            <li className="flex items-center">
              <FontAwesomeIcon color="white" icon={faBars} className="mr-2" />
              {isExpanded && <span className="font-semibold">Menu</span>}
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`sidebar-content sidebar ${
          isExpanded ? "expanded" : ""
        } bg-black text-white py-4 px-2 flex flex-col justify-start`}
      >
        <ul className={`menu-items ${isExpanded ? "expanded" : ""} mt-4`}>
          <Link to="/single-player">
            <li className="flex items-center mb-2">
              <FontAwesomeIcon
                color="white"
                icon={faChessBoard}
                className="mr-2"
              />
              {isExpanded && (
                <span className="font-semibold">Single-Player</span>
              )}
            </li>
          </Link>
          <Link to="/multi-player">
            <li className="flex items-center mb-2">
              <FontAwesomeIcon color="white" icon={faGlobe} className="mr-2" />
              {isExpanded && (
                <span className="font-semibold">Multi-Player</span>
              )}
            </li>
          </Link>
          <Link to="/vs-ia">
            <li className="flex items-center mb-2">
              <FontAwesomeIcon
                color="white"
                icon={faMicrochip}
                className="mr-2"
              />
              {isExpanded && <span className="font-semibold">VS-AI</span>}
            </li>
          </Link>
          <Link to="/logout">
            <li className="flex items-center mt-8">
              <FontAwesomeIcon
                color="white"
                icon={faSignOutAlt}
                className="mr-2"
              />
              {isExpanded && <span className="font-semibold">Sign Out</span>}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

import "../../styles/settingroom.css"
import React from 'react';

const LoadingComponent = ({ isLoading, children }) => {
  return (
    <div>
      {isLoading? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Creating a room for multiplayer chess...</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingComponent;

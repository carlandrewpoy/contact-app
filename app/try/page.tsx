'use client'

import React, { useState } from 'react';

const MyComponent: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {isHovered && (
        <div style={{ position: 'absolute', top: '-30px' }}>Delete</div>
      )}
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Edit
      </button>
    </div>
  );
};

export default MyComponent;

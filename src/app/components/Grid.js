"use client";

import React from 'react';
import './Grid.css';

const Grid = () => {
  const gridSize = 20; // Finer mesh size
  const rows = Math.ceil(window.innerHeight / gridSize); // Number of rows
  const cols = Math.ceil(window.innerWidth / gridSize); // Number of columns

  const gridItems = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      gridItems.push({ x, y, id: `${x}-${y}` });
    }
  }

  return (
    <div className="grid-container">
      {gridItems.map(item => (
        <div
          key={item.id}
          className="grid-item"
          style={{
            left: `${item.x * gridSize}px`,
            top: `${item.y * gridSize}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Grid;
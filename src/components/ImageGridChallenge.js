// src/components/ImageGridChallenge.js
import React, { useState } from "react";

const gridSize = 3; // 3x3 grid

export default function ImageGridChallenge({ onSuccess, correctIndexes, image }) {
  const [selected, setSelected] = useState(Array(gridSize * gridSize).fill(false));

  const handleClick = (idx) => {
    setSelected(prev => {
      const newSelected = [...prev];
      newSelected[idx] = !newSelected[idx];
      return newSelected;
    });
  };

  const handleSubmit = () => {
    const isCorrect = selected.every((isSelected, idx) => 
      isSelected === correctIndexes.includes(idx)
    );
    
    if (isCorrect && typeof onSuccess === 'function') {
      onSuccess();
    }
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 150px)`,
          gap: "0px",
          justifyContent: "center",
        }}
      >
        {Array(gridSize * gridSize).fill(null).map((_, idx) => {
          const row = Math.floor(idx / gridSize);
          const col = idx % gridSize;
          const percentX = (col / (gridSize - 1)) * 100;
          const percentY = (row / (gridSize - 1)) * 100;
          
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleClick(idx)}
              style={{
                width: 150,
                height: 150,
                border: selected[idx] ? "2px solid blue" : "1px solid #000",
                backgroundImage: `url(${image})`,
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                backgroundPosition: `${percentX}% ${percentY}%`,
                backgroundRepeat: "no-repeat",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            />
          );
        })}
      </div>
      <div style={{ marginTop: 16 }}>
        <button 
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
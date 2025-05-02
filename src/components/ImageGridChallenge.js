// src/components/ImageGridChallenge.js
import React, { useState } from "react";

const gridSize = 3; // 3x3 grid

export default function ImageGridChallenge({ onSuccess, correctIndexes, image, onError }) {
  const [selected, setSelected] = useState(Array(gridSize * gridSize).fill(false));

  const handleClick = (idx) => {
    setSelected(prev => {
      const newSelected = [...prev];
      newSelected[idx] = !newSelected[idx];
      return newSelected;
    });
    // Clear error message when user changes selection
    if (typeof onError === 'function') {
      onError('');
    }
  };

  const handleSubmit = () => {
    const isCorrect = selected.every((isSelected, idx) => 
      isSelected === correctIndexes.includes(idx)
    );
    
    if (isCorrect && typeof onSuccess === 'function') {
      onSuccess();
    } else if (typeof onError === 'function') {
      onError("Try again! That's not correct.");
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
          backgroundColor: "#333",
          padding: "8px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
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
                border: selected[idx] ? "3px solid #4a9eff" : "1px solid #444",
                backgroundImage: `url(${image})`,
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                backgroundPosition: `${percentX}% ${percentY}%`,
                backgroundRepeat: "no-repeat",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                boxSizing: "border-box",
                borderRadius: "0px",
                transition: "border-color 0.2s ease, transform 0.1s ease",
                transform: selected[idx] ? "scale(0.98)" : "scale(1)",
              }}
              onMouseOver={(e) => {
                if (!selected[idx]) {
                  e.target.style.borderColor = "#666";
                }
              }}
              onMouseOut={(e) => {
                if (!selected[idx]) {
                  e.target.style.borderColor = "#444";
                }
              }}
            />
          );
        })}
      </div>
      <div style={{ marginTop: 20 }}>
        <button 
          type="button"
          onClick={handleSubmit}
          style={{
            padding: "0.8rem 2rem",
            fontSize: "1.2rem",
            backgroundColor: "#4a9eff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.1s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#3a8eff";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#4a9eff";
            e.target.style.transform = "scale(1)";
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
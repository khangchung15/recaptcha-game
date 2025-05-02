// src/components/ImageGridChallenge.js
import React, { useState } from "react";
import skyscraper from "../assets/skyscraper.jpg";

const gridSize = 3; // 3x3 grid

export default function ImageGridChallenge({ onSuccess, correctIndexes, image }) {
  const [selected, setSelected] = useState(Array(gridSize * gridSize).fill(false));

  const handleClick = (idx) => {
    setSelected((prev) =>
      prev.map((val, i) => (i === idx ? !val : val))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all correct indexes are selected and no incorrect ones are selected
    const isCorrect = selected.every((isSelected, idx) => 
      isSelected === correctIndexes.includes(idx)
    );
    
    if (isCorrect && typeof onSuccess === 'function') {
      onSuccess();
    }
  };

  // Calculate background positions for each cell
  const cells = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const idx = row * gridSize + col;
      const percentX = (col / (gridSize - 1)) * 100;
      const percentY = (row / (gridSize - 1)) * 100;
      cells.push(
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
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 150px)`,
          gap: "0px",
          justifyContent: "center",
        }}
      >
        {cells}
      </div>
      <div style={{ marginTop: 16 }}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
import React, { useState, useEffect } from "react";
import ImageGridChallenge from "./components/ImageGridChallenge";
import skyscraper from "./assets/skyscraper.jpg";
import airplane from "./assets/airplane.jpg";
import zoo from "./assets/zoo.jpg";
import chess from "./assets/chess.png";
import cat from "./assets/cat.png";
import smilingman from "./assets/smilingman.png";
import mrbean from "./assets/mrbean.png";
import cpp from "./assets/cpp.png";
import earth from "./assets/earth.jpg";
import solar from "./assets/solar.jpg";

const imageGridChallenges = [
  {
    prompt: "Click all squares that contains more than 30 people",
    image: skyscraper,
    correctIndexes: [6,7,8],
  },
  {
    prompt: "Click all squares that contains color rgb(248,60,85)",
    image: airplane,
    correctIndexes: [0],
  },
  {
    prompt: "Click all squares that contains any anormalies",
    image: zoo,
    correctIndexes: [5,8],
  },
  {
    prompt: "Click all squares that contains a winning move (white to move)",
    image: chess,
    correctIndexes: [4, 5, 7, 8],
  },
  {
    prompt: "Click all squares that contains a reflection of the phone taking the picture",
    image: cat,
    correctIndexes: [0, 1, 2, 3],
  },
  {
    prompt: "Click all squares that contains a stick that is about to hit the cameraman",
    image: smilingman,
    correctIndexes: [0, 1, 2],
  },
  {
    prompt: "Click all squares that contains a tree",
    image: mrbean,
    correctIndexes: [3,5,8],
  },
  {
    prompt: "Click all squares that contains an error in C++",
    image: cpp,
    correctIndexes: [4,5],
  },
  {
    prompt: "Click all squares that contains Latvia",
    image: earth,
    correctIndexes: [1],
  },
  {
    prompt: "Click all squares that contains Neptune",
    image: solar,
    correctIndexes: [8],
  },
];

// Function to shuffle array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function App() {
  const [challenges] = useState(() => {
    const initialChallenges = [
      {
        type: "text",
        prompt: "Type the word 'recaptcha' backwards.",
        answer: "ahctpacer",
      },
      {
        type: "text",
        prompt: "Solve for x: 2(x + 3) - 5 = 3(x - 1) + 4",
        answer: "0",
      },
      {
        type: "text",
        prompt: "What is the square root of 144?",
        answer: "12",
      },
      ...imageGridChallenges.map(challenge => ({
        type: "imageGrid",
        prompt: challenge.prompt,
        image: challenge.image,
        correctIndexes: challenge.correctIndexes
      }))
    ];
    return shuffleArray(initialChallenges);
  });
  
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const current = challenges[step];

  const handleInput = (e) => setInput(e.target.value);

  const handleChallengeComplete = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    try {
      setCompletedChallenges(prev => {
        const newSet = new Set(prev);
        newSet.add(step);
        return newSet;
      });
      
      const nextStep = step + 1;
      if (nextStep >= challenges.length) {
        setStep(challenges.length);
      } else {
        setStep(nextStep);
      }
    } catch (error) {
      console.error('Error in challenge completion:', error);
    } finally {
      setIsTransitioning(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!current || !current.answer || isTransitioning) {
      return;
    }

    const userAnswer = input.trim().toLowerCase();
    const correctAnswer = current.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
      setError("");
      setInput("");
      handleChallengeComplete();
    } else {
      setError("Try again! That's not correct.");
    }
  };

  if (!current || step >= challenges.length) {
    const allCompleted = completedChallenges.size === challenges.length;
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
          {allCompleted ? "Congratulations!" : "Game Over"}
        </h1>
        <p style={{ fontSize: "1.5rem" }}>
          {allCompleted 
            ? `You've completed all ${challenges.length} challenges!`
            : `You completed ${completedChallenges.size} out of ${challenges.length} challenges.`
          }
        </p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>reCAPTCHA Game</h1>
      {current.type === "imageGrid" ? (
        <>
          <p style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>{current.prompt}</p>
          <ImageGridChallenge 
            onSuccess={handleChallengeComplete}
            correctIndexes={current.correctIndexes}
            image={current.image}
          />
        </>
      ) : (
        <>
          <p style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>{current.prompt}</p>
          <form onSubmit={handleSubmit}>
            <input 
              value={input} 
              onChange={handleInput} 
              style={{ 
                fontSize: "1.2rem",
                padding: "0.5rem",
                marginRight: "0.5rem"
              }}
              autoComplete="off"
            />
            <button 
              type="submit"
              style={{
                fontSize: "1.2rem",
                padding: "0.5rem 1rem"
              }}
              disabled={isTransitioning}
            >
              Submit
            </button>
          </form>
        </>
      )}
      {error && <p style={{ color: "red", fontSize: "1.2rem", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}

export default App;

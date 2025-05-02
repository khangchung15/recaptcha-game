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
import gorilla from "./assets/gorillaelephant.png";
import scenery from "./assets/scenery.png";
import physics from "./assets/physicists.jpg";

const imageGridChallenges = [
  {
    prompt: "Click all squares containing shortest building",
    image: skyscraper,
    correctIndexes: [8],
  },
  {
    prompt: "Click all squares containing color rgb(248,60,85)",
    image: airplane,
    correctIndexes: [0],
  },
  {
    prompt: "Click all squares containing any anormalies",
    image: zoo,
    correctIndexes: [5,8],
  },
  {
    prompt: "Click all squares containing a piece that leads to a win (white to move)",
    image: chess,
    correctIndexes: [4, 5, 7, 8],
  },
  {
    prompt: "Click all squares containing a reflection of the phone taking the picture",
    image: cat,
    correctIndexes: [0, 1, 2, 3],
  },
  {
    prompt: "Click all squares containing a stick that's about to hit the cameraman",
    image: smilingman,
    correctIndexes: [0, 1, 2],
  },
  {
    prompt: "Click all squares containing a tree",
    image: mrbean,
    correctIndexes: [3,5,8],
  },
  {
    prompt: "Click all squares containing an error in C++",
    image: cpp,
    correctIndexes: [4,5],
  },
  {
    prompt: "Click all squares containing Latvia",
    image: earth,
    correctIndexes: [1],
  },
  {
    prompt: "Click all squares containing Neptune",
    image: solar,
    correctIndexes: [8],
  },
  {
    prompt: "Click all squares containing an abomination",
    image: gorilla,
    correctIndexes: [0,1,2,3,4,5,6,7,8],
  },
  {
    prompt: "Click all squares containing fishes in the lake",
    image: scenery,
    correctIndexes: [4,6,7,8],
  },
  {
    prompt: "Click all squares containing Werner Heisenberg and Auguste Piccard",
    image: physics,
    correctIndexes: [3,5],
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
      ...imageGridChallenges.map((challenge, index) => ({
        type: "imageGrid",
        prompt: challenge.prompt,
        image: challenge.image,
        correctIndexes: challenge.correctIndexes,
        id: `grid-${index}`
      }))
    ];
    console.log('Total challenges:', initialChallenges.length);
    return shuffleArray(initialChallenges);
  });
  
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = imageGridChallenges.map(challenge => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = challenge.image;
          img.onload = () => {
            setLoadedImages(prev => {
              const newSet = new Set(prev);
              newSet.add(challenge.image);
              return newSet;
            });
            resolve();
          };
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        console.log('All images preloaded');
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();
  }, []);

  const current = challenges[step];

  const handleInput = (e) => setInput(e.target.value);

  const nextChallenge = () => {
    const nextStep = step + 1;
    console.log('Moving to step:', nextStep, 'out of', challenges.length);
    if (nextStep >= challenges.length) {
      setStep(challenges.length);
    } else {
      setStep(nextStep);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!current || !current.answer) return;

    const userAnswer = input.trim().toLowerCase();
    const correctAnswer = current.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
      setError("");
      setInput("");
      setCompletedChallenges(prev => {
        const newSet = new Set(prev);
        newSet.add(step);
        return newSet;
      });
      nextChallenge();
    } else {
      setError("Try again! That's not correct.");
    }
  };

  const handleImageError = (message) => {
    setError(message);
  };

  if (!current || step >= challenges.length) {
    const allCompleted = completedChallenges.size === challenges.length;
    console.log('Game state:', {
      step,
      totalChallenges: challenges.length,
      completed: completedChallenges.size,
      allCompleted
    });
    return (
      <div style={{ 
        textAlign: "center", 
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          maxWidth: "600px",
          padding: "3rem",
          backgroundColor: "#2d2d2d",
          borderRadius: "16px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          border: "2px solid #4a9eff",
          animation: "pulse 2s infinite"
        }}>
          <h1 style={{ 
            fontSize: "3rem", 
            marginBottom: "1.5rem",
            color: "#4a9eff",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            animation: "bounce 1s"
          }}>
            {allCompleted ? "🎉 Congratulations! 🎉" : "Game Over"}
          </h1>
          <p style={{ 
            fontSize: "1.5rem",
            color: "#e0e0e0",
            marginBottom: "2rem",
            lineHeight: "1.5"
          }}>
            {allCompleted 
              ? `You completed all ${challenges.length} captcha! You are indeed a human.`
              : `You completed ${completedChallenges.size} out of ${challenges.length} challenges.`
            }
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              backgroundColor: "#4a9eff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#3a8eff";
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#4a9eff";
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
            }}
          >
            Play Again
          </button>
        </div>
        <style>
          {`
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(74, 158, 255, 0.4); }
              70% { box-shadow: 0 0 0 20px rgba(74, 158, 255, 0); }
              100% { box-shadow: 0 0 0 0 rgba(74, 158, 255, 0); }
            }
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
              40% {transform: translateY(-20px);}
              60% {transform: translateY(-10px);}
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{ 
      textAlign: "center", 
      minHeight: "100vh",
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      padding: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#2d2d2d",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
      }}>
        <h1 style={{ 
          fontSize: "2.5rem", 
          marginBottom: "2rem",
          color: "#4a9eff",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
        }}>reCAPTCHA Game</h1>
        {current.type === "imageGrid" ? (
          <>
            <p style={{ 
              fontSize: "1.5rem", 
              marginBottom: "1.5rem",
              color: "#e0e0e0"
            }}>{current.prompt}</p>
            {loadedImages.has(current.image) ? (
              <ImageGridChallenge 
                key={current.id}
                onSuccess={() => {
                  setError("");
                  setCompletedChallenges(prev => {
                    const newSet = new Set(prev);
                    newSet.add(step);
                    return newSet;
                  });
                  nextChallenge();
                }}
                onError={handleImageError}
                correctIndexes={current.correctIndexes}
                image={current.image}
              />
            ) : (
              <div style={{ 
                width: '450px', 
                height: '450px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid #444',
                margin: '0 auto',
                backgroundColor: '#333',
                borderRadius: '8px'
              }}>
                <p style={{ color: '#888' }}>Loading image...</p>
              </div>
            )}
          </>
        ) : (
          <>
            <p style={{ 
              fontSize: "1.5rem", 
              marginBottom: "1.5rem",
              color: "#e0e0e0"
            }}>{current.prompt}</p>
            <form onSubmit={handleSubmit}>
              <input 
                value={input} 
                onChange={handleInput} 
                style={{ 
                  fontSize: "1.2rem",
                  padding: "0.8rem 1.2rem",
                  marginRight: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  backgroundColor: "#333",
                  color: "#fff",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                }}
                autoComplete="off"
              />
              <button 
                type="submit"
                style={{
                  fontSize: "1.2rem",
                  padding: "0.8rem 1.2rem",
                  backgroundColor: "#4a9eff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#3a8eff"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#4a9eff"}
              >
                Submit
              </button>
            </form>
          </>
        )}
        {error && (
          <p style={{ 
            color: "#ff6b6b", 
            fontSize: "1.2rem", 
            marginTop: "1rem",
            padding: "0.8rem",
            backgroundColor: "rgba(255, 107, 107, 0.1)",
            borderRadius: "6px",
            border: "1px solid rgba(255, 107, 107, 0.3)"
          }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

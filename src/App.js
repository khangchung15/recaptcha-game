import React, { useState, useEffect } from "react";
import ImageGridChallenge from "./components/ImageGridChallenge";
import FakeRecaptchaPopup from "./components/FakeRecaptchaPopup";
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
    correctIndexes: [5, 8],
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
    correctIndexes: [3, 5, 8],
  },
  {
    prompt: "Click all squares containing an error in C++",
    image: cpp,
    correctIndexes: [4, 5],
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
    correctIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    prompt: "Click all squares containing fishes in the lake",
    image: scenery,
    correctIndexes: [4, 6, 7, 8],
  },
  {
    prompt: "Click all squares containing Werner Heisenberg and Auguste Piccard",
    image: physics,
    correctIndexes: [3, 5],
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
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [showFakeRecaptcha, setShowFakeRecaptcha] = useState(false);
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
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

  const handleSignUpClick = () => {
    setShowFakeRecaptcha(true);
  };

  const handleFakeRecaptchaVerify = () => {
    setShowFakeRecaptcha(false);
    setShowRecaptcha(true);
    setStep(0);
    setCompletedChallenges(new Set());
    setError("");
  };

  const handleTeamClick = (e) => {
    e.preventDefault();
    setShowTeamPopup(true);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setShowAboutPopup(true);
  };

  const renderMainContent = () => (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#fff",
        padding: "1rem 2rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>Imaginary Friends</div>
        <nav>
          <a href="#" style={{ marginLeft: "1.5rem", color: "#666", textDecoration: "none" }}>Home</a>
          <a href="#" onClick={handleTeamClick} style={{ marginLeft: "1.5rem", color: "#666", textDecoration: "none" }}>Our Team</a>
          <a href="#" onClick={handleAboutClick} style={{ marginLeft: "1.5rem", color: "#666", textDecoration: "none" }}>About</a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        display: "flex",
        gap: "4rem",
        alignItems: "flex-start"
      }}>
        {/* Left side - Hero section */}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: "3.5rem",
            color: "#333",
            marginBottom: "1.5rem",
            lineHeight: "1.2"
          }}>
            Welcome to Imaginary Friends
          </h1>
          <p style={{
            fontSize: "1.2rem",
            color: "#666",
            marginBottom: "2rem",
            lineHeight: "1.6"
          }}>
            Want a real ID for your imaginary friends? Sign up now!
          </p>
          <div style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem"
          }}>
            <div style={{
              padding: "1rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              flex: 1
            }}>
              <h3 style={{ color: "#333", marginBottom: "0.5rem" }}>Easy to Use</h3>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>Simple and intuitive interface for the best user experience</p>
            </div>
            <div style={{
              padding: "1rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              flex: 1
            }}>
              <h3 style={{ color: "#333", marginBottom: "0.5rem" }}>Secure</h3>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>Your data is protected with industry-standard security</p>
            </div>
          </div>
        </div>

        {/* Right side - Signup form */}
        <div style={{
          width: "400px",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>Create Account</h2>
          <form>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#666",
                fontSize: "0.9rem"
              }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: "0.8rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  color: "#333",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#666",
                fontSize: "0.9rem"
              }}>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                style={{
                  padding: "0.8rem",
                  fontSize: "1rem",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  color: "#333",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleSignUpClick}
              style={{
                padding: "1rem",
                fontSize: "1rem",
                backgroundColor: "#4a9eff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "100%",
                fontWeight: "600"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#3a8eff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#4a9eff";
              }}
            >
              Sign Up
            </button>
            <p style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "#666",
              fontSize: "0.9rem"
            }}>
              Already have an account? <a href="#" style={{ color: "#4a9eff", textDecoration: "none" }}>Log in</a>
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#fff",
        padding: "2rem",
        marginTop: "4rem",
        borderTop: "1px solid #eee"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          color: "#666",
          fontSize: "0.9rem"
        }}>
          <div>© 2024 Imaginary Friends. All rights reserved.</div>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>Terms of Service</a>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );

  if (showTeamPopup) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: "400px",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>Our Team</h2>
          <div style={{
            textAlign: "center",
            color: "#666",
            fontSize: "1.1rem",
            lineHeight: "1.6"
          }}>
            <p>All positions are held by:</p>
            <p style={{ 
              color: "#4a9eff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginTop: "1rem"
            }}>Khang Chung</p>
          </div>
          <button
            onClick={() => setShowTeamPopup(false)}
            style={{
              marginTop: "2rem",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#4a9eff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#3a8eff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#4a9eff";
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (showAboutPopup) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: "400px",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>About</h2>
          <div style={{
            textAlign: "center",
            color: "#666",
            fontSize: "1.1rem",
            lineHeight: "1.6"
          }}>
            {/* Leave blank for now */}
          </div>
          <button
            onClick={() => setShowAboutPopup(false)}
            style={{
              marginTop: "2rem",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#4a9eff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: "100%"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#3a8eff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#4a9eff";
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (showFakeRecaptcha) {
    return (
      <>
        {renderMainContent()}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999
        }}>
          <FakeRecaptchaPopup onVerify={handleFakeRecaptchaVerify} />
        </div>
      </>
    );
  }

  if (!showRecaptcha) {
    return renderMainContent();
  }

  if (!current || step >= challenges.length) {
    const allCompleted = completedChallenges.size === challenges.length;
    return (
      <>
        {renderMainContent()}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: "400px",
            padding: "2rem",
            backgroundColor: "#2d2d2d",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            border: "1px solid #444"
          }}>
            <h1 style={{
              fontSize: "2rem",
              marginBottom: "1.5rem",
              color: "#4a9eff",
              textAlign: "center"
            }}>
              {allCompleted ? "🎉 Congratulations! 🎉" : "Verification Failed"}
            </h1>
            <p style={{
              fontSize: "1.1rem",
              color: "#e0e0e0",
              marginBottom: "2rem",
              lineHeight: "1.5",
              textAlign: "center"
            }}>
              {allCompleted
                ? `You successfully passed the captcha! You are indeed a human.`
                : `You completed ${completedChallenges.size} out of ${challenges.length} challenges. Please try again.`
              }
            </p>
            <button
              onClick={() => setShowRecaptcha(false)}
              style={{
                padding: "0.8rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#4a9eff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "100%"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#3a8eff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#4a9eff";
              }}
            >
              {allCompleted ? "Continue" : "Try Again"}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {renderMainContent()}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: "500px",
          padding: "2rem",
          backgroundColor: "#2d2d2d",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          border: "1px solid #444"
        }}>
          <h1 style={{
            fontSize: "1.5rem",
            marginBottom: "1.5rem",
            color: "#4a9eff",
            textAlign: "center"
          }}>reCAPTCHA Verification</h1>
          {current.type === "imageGrid" ? (
            <>
              <p style={{
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
                color: "#e0e0e0",
                textAlign: "center"
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
                  width: '300px',
                  height: '300px',
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
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
                color: "#e0e0e0",
                textAlign: "center"
              }}>{current.prompt}</p>
              <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <input
                  value={input}
                  onChange={handleInput}
                  style={{
                    fontSize: "1rem",
                    padding: "0.8rem 1.2rem",
                    marginRight: "0.5rem",
                    borderRadius: "6px",
                    border: "1px solid #444",
                    backgroundColor: "#333",
                    color: "#fff",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    width: "60%"
                  }}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  style={{
                    fontSize: "1rem",
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
              fontSize: "1rem",
              marginTop: "1rem",
              padding: "0.8rem",
              backgroundColor: "rgba(255, 107, 107, 0.1)",
              borderRadius: "6px",
              border: "1px solid rgba(255, 107, 107, 0.3)",
              textAlign: "center"
            }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
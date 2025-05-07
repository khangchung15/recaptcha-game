import React, { useState, useEffect, useRef } from "react";
import ImageGridChallenge from "./components/ImageGridChallenge";
import FakeRecaptchaPopup from "./components/FakeRecaptchaPopup";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';
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
import objection from "./assets/objection.png";
import Reviews from './components/Reviews';
import MobileWarning from "./components/MobileWarning";

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
  const [showLegalPopup, setShowLegalPopup] = useState(false);
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

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowTeamPopup(false);
      setShowAboutPopup(false);
    }
  };

  const handleLegalClick = (e) => {
    e.preventDefault();
    setShowLegalPopup(true);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setShowLegalPopup(true);
  };

  const handlePopupAnimationEnd = () => {
    if (!showLegalPopup) return;
    setShowLegalPopup(false);
  };

  const renderMainContent = () => (
    <div className="app-container">
      <header className="header">
        <div className="header-logo">Global Registry of Imaginary Friends | GRIF</div>
        <nav className="header-nav">
          <a href="#">Home</a>
          <a href="#" onClick={handleTeamClick}>Our Team</a>
          <a href="#" onClick={handleAboutClick}>About</a>
        </nav>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to Imaginary Friends</h1>
          <p className="hero-description">Want a real ID for your imaginary friends? Sign up now!</p>
          
          <div className="tile-container">
            <div className="tile">
              <h3>Easy to Sign Up</h3>
              <p>Simple and intuitive interface for the best user experience</p>
              <p>Just whisper your friend's name into your nearest microwave. We'll handle the rest</p>
            </div>

            <div className="tile">
              <h3>Secure (Probably)</h3>
              <p>Your data is "protected" with industry-standard imaginary security™</p>
              <p>Firewalls made of unicorn hair. Encryption powered by childhood secrets</p>
            </div>

            <div className="tile">
              <h3>Legally Binding (Not Really)</h3>
              <p>All friendships come with a 100% unenforceable Certificate of Authenticity</p>
              <p>Disclaimer: May summon a mild sense of nostalgia. Side effects include denial</p>
            </div>

            <div className="tile">
              <h3>Automatic Updates</h3>
              <p>Your friends evolve based on your life choices.</p>
              <p>Example: "Gary the Ghost Shark" could be your new mortal enemy!</p>
            </div>

            <div className="tile">
              <h3>Premium Delusions Package</h3>
              <p>College Degree: +50% pretentiousness</p>
              <p>Corporate Job: Automatically ignores your texts</p>
            </div>

            <div className="tile">
              <h3>AI Compatibility</h3>
              <p>Connect with ChatGPT so your imaginary friend can:</p>
              <p>Argue with Siri for you, Write passive-aggressive work emails, and more!</p>
            </div>

          </div>
        </div>

        <div className="signup-container">
          <h2 className="signup-title">Create Account</h2>
          <form>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="form-input"
              />
            </div>
            <button
              type="button"
              onClick={handleSignUpClick}
              className="signup-button"
            >
              Sign Up
            </button>
            <p className="login-link">
              Already have an account? <a href="#">Log in</a>
            </p>
          </form>
        </div>
      </main>

      <Reviews />
    </div>
  );

  const renderFooter = () => (
    <footer className="footer">
      <div className="footer-content">
        <div>© 2024 Imaginary Friends. All rights are not reserved.</div>
        <div className="footer-links">
          <a href="#" onClick={handleLegalClick}>Privacy Policy</a>
          <a href="#" onClick={handleLegalClick}>Terms of Service</a>
          <a href="#" onClick={handleContactClick}>Contact Us</a>
        </div>
      </div>
      {showLegalPopup && (
        <div 
          className="legal-popup"
          onAnimationEnd={handlePopupAnimationEnd}
        >
          {document.activeElement?.textContent === "Contact Us" 
            ? "We are imaginary. Try registering us first"
            : "no one read these"
          }
        </div>
      )}
    </footer>
  );

  if (showTeamPopup) {
    return (
      <>
        <MobileWarning />
        {renderMainContent()}
        {renderFooter()}
        <div 
          onClick={handleOutsideClick}
          className="team-overlay"
        >
          <div className="team-container">
            <h2 className="team-title">Meet Our Team!</h2>

            {/* Executive Section */}
            <div className="team-section">
              <h3 className="team-section-title">Executive</h3>
              <div className="team-grid">
                <div className="team-card">
                  <div className="team-role">Founder</div>
                  <div className="team-name">Alex "The Thinker" Finch</div>
                  <div className="team-description">Visionary, lunatic, and proud parent of 37 imaginary friends and counting. Suspected to be gnomes</div>
                </div>

                <div className="team-card">
                  <div className="team-role">CEO</div>
                  <div className="team-name">Sleep Paralysis Demon</div>
                  <div className="team-description">Whisper your name at 3 AM. We think he is just shy</div>
                  <div className="team-description">"y̷o̷u̵r̷ ̴a̶c̷t̵i̷o̵n̴s̷ ̴h̵a̴v̷e̸ ̴c̶o̶n̴s̷e̵q̸u̶e̵n̶c̸e̸s̸"  -Demon</div>
                </div>
              </div>
            </div>

            {/* Legal & Compliance Section */}
            <div className="team-section">
              <h3 className="team-section-title">Legal & Compliance</h3>
              <div className="team-grid">
                <div className="team-card">
                  <div className="team-role">Director of Make-Believe Compliance</div>
                  <div className="team-name">Sir Reginald Von Sock III</div>
                  <div className="team-description">A sentient sock with a law degree (we doubt it's a real degree)</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Head of Legal Affairs</div>
                  <div className="team-name">Detective Monkey</div>
                  <div className="team-description">Resolve legal disputes and throw bananas at criminals</div>
                  <div className="team-description">"Ooh ooh aah aah" -Monke</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Head of Legal Team</div>
                  <div className="team-name">Phoenix Wright</div>
                  <div className="team-description">
                    Periodically yells "
                    <span 
                      style={{ 
                        position: "relative", 
                        display: "inline-block",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        const letters = e.currentTarget.querySelectorAll('.jumping-letter');
                        letters.forEach((letter, i) => {
                          letter.style.animation = `jump 0.5s infinite`;
                          letter.style.animationDelay = `${i * 0.04}s`;
                        });
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.opacity = 1;
                      }}
                      onMouseLeave={(e) => {
                        const letters = e.currentTarget.querySelectorAll('.jumping-letter');
                        letters.forEach(letter => {
                          letter.style.animation = "none";
                        });
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.opacity = 0;
                      }}
                    >
                      {"Objection!".split('').map((char, i) => (
                        <span
                          key={i}
                          className="jumping-letter"
                          style={{
                            display: "inline-block",
                            transition: "all 0.3s ease"
                          }}
                        >
                          {char}
                        </span>
                      ))}
                      <img 
                        src={objection} 
                        alt="Objection!" 
                        style={{
                          position: "absolute",
                          bottom: "150%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "100px",
                          height: "auto",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          pointerEvents: "none",
                          zIndex: 1000
                        }}
                      />
                    </span>
                    " at the top of his lungs which spawns a speech bubble
                  </div>
                </div>

                <div className="team-card">
                  <div className="team-role">Paralegal</div>
                  <div className="team-name">Gavin the Talking Gavel</div>
                  <div className="team-description">Read and memorized all Terms of Service and Privacy Policy he could find instead of just accepting</div>
                </div>
              </div>
            </div>

            {/* Technology Section */}
            <div className="team-section">
              <h3 className="team-section-title">Technology</h3>
              <div className="team-grid">
                <div className="team-card">
                  <div className="team-role">Cybersecurity Expert</div>
                  <div className="team-name">Elliot Alderson</div>
                  <div className="team-description">Wait, how did he get here? He keeps muttering about "root access to the human mind."</div>
                  <div className="team-description">Isn't he supposed to be in Mr. Robot?</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Lead Developer</div>
                  <div className="team-name">GPT the human AI</div>
                  <div className="team-description">Fluent in all languages, including programming languages. His skills are so good that other programmers are ashamed of themselves</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Developer (Imaginary?)</div>
                  <div className="team-name">Khang Chung</div>
                  <div className="team-description">Always run "git push origin main --force" when testing a small change</div>
                  <div className="team-description">"No no, that's not true" -Khang Chung</div>
                </div>

                <div className="team-card">
                  <div className="team-role">UI/UX Designer</div>
                  <div className="team-name">404 Entity</div>
                  <div className="team-description">Keeps trying to fix the website but ends up breaking it more. CEO was talking about firing him</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Lead Server IT</div>
                  <div className="team-name">A Green PNY 32GB USB Hard Disk</div>
                  <div className="team-description">Fixes servers by yelling "HAVE YOU TRIED TURNING IT OFF AND ON AGAIN?"</div>
                </div>

                <div className="team-card">
                  <div className="team-role">QA Tester</div>
                  <div className="team-name">???</div>
                  <div className="team-description">Keeps coming up with new ideas but it's a nightmare to implement</div>
                  <div className="team-description">We know the name but we just hate him</div>
                </div>
              </div>
            </div>

            {/* Operations Section */}
            <div className="team-section">
              <h3 className="team-section-title">Operations</h3>
              <div className="team-grid">
                <div className="team-card">
                  <div className="team-role">Vice President of HR</div>
                  <div className="team-name">Casper the Scary Ghost</div>
                  <div className="team-description">Haunts the breakroom fridge. Knows who took the last BLT sandwich.</div>
                </div>

                <div className="team-card">
                  <div className="team-role">HR Employee</div>
                  <div className="team-name">Grumpy Goblin</div>
                  <div className="team-description">Hired to meet quota. Loves eating paperwork. Tried to convince others to try eating papers.</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Wellness Coach</div>
                  <div className="team-name">Danny the Floating Coach</div>
                  <div className="team-description">Gives motivational speeches as he gives out free pizzas. We don't think he's a real coach.</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Office Therapist</div>
                  <div className="team-name">VHS Tape of Bob Ross</div>
                  <div className="team-description">Only says "It's a happy little accidents" as you keep venting</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Head of Rumors</div>
                  <div className="team-name">Balala the Talking Teapot</div>
                  <div className="team-description">Formerly a real teapot, now a motivational speaker. Specializes in spreading fake rumors</div>
                </div>
              </div>
            </div>

            {/* Finance Section */}
            <div className="team-section">
              <h3 className="team-section-title">Finance</h3>
              <div className="team-grid">
                <div className="team-card">
                  <div className="team-role">Imaginary Treasurer</div>
                  <div className="team-name">Fiveish the Yapping Dollar</div>
                  <div className="team-description">Cannot stop yapping about his grand scheme to print more of himself</div>
                  <div className="team-description">"Why can't printers just print more money?" -Fiveish</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Blockchain Specialist</div>
                  <div className="team-name">NFT the Imaginary Ape</div>
                  <div className="team-description">Draws digital art in MS Paint and sells them as "art." Becomes the main source of income for the company</div>
                  <div className="team-description">"They keep buying, I keep drawing" -NFT</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Auditor</div>
                  <div className="team-name">IRS Agent</div>
                  <div className="team-description">Wears sunglasses indoors and walks around with a clipboard. Knows about your tax deductions</div>
                  <div className="team-description">Would not tell us their name</div>
                </div>
              </div>
            </div>

            {/* Customer Experience Section */}
            <div className="team-section">
              <h3 className="team-section-title">Customer Support</h3>
              <div className="team-grid">
                <div className="team-card">
                  <div className="team-role">Head of Customer Support</div>
                  <div className="team-name">Karen the Abstract Concept of "No Refunds"</div>
                  <div className="team-description">A shapeless entity that haunts customer service reps. Immune to layoff.</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Overworked Customer Support Staff</div>
                  <div className="team-name">Ms. Schrödinger the Multidimensional Cat</div>
                  <div className="team-description">Answers calls from 12 different realities simultaneously. Still gets confused by fax machines.</div>
                </div>

                <div className="team-card">
                  <div className="team-role">Translator and Interpreter</div>
                  <div className="team-name">Sentient Portuguese-to-Russian Dictionary</div>
                  <div className="team-description">Only speaks Portuguese and Russian so no one on our team can understand her. Why did the CEO hire her?</div>
                </div>
              </div>
            </div>

            <div className="team-disclaimer">
              <p>Disclaimer: All staff members are either fictional, legally distinct from real entities, or figments of your imagination. Any resemblance to actual people, teapots, or rogue hackers is purely coincidental (or is it?).</p>
              <p style={{ marginTop: "1rem", textAlign: "center", fontWeight: "bold" }}>Join us in delusion! ™</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showAboutPopup) {
    return (
      <>
        <MobileWarning />
        {renderMainContent()}
        {renderFooter()}
        <div 
          onClick={handleOutsideClick}
          className="about-overlay"
        >
          <div className="about-container">
            <h2 className="about-title">About</h2>
            <div className="about-content">
              <p className="about-paragraph">
                {"Welcome to Global Registry of Imaginary Friends (GRIF), the world's first (and legally questionable) database for your made-up besties!"}
                {" At our imaginary headquarter, we believe that our unseen companions deserve recognition."}
              </p>
              <p className="about-paragraph">
                {" Tired of your imaginary pals being ignored by society? Fed up with people dismissing Gary the Ghost Shark as \"not real\" or \"a concerning obsession\"?"}
                {" Well, no more! Here, we validate, certify, and immortalize your fictional companions with the dignity they deserve."}
                {" Whether it's a sentient sock puppet, a cosmic unicorn accountant, or your sleep-deprived hallucination named Dave, we've got you covered."}
              </p>
              <p className="about-paragraph">
                {" Our mission? To give your invisible pals the recognition they've been denied. Because friendship shouldn't be limited by reality."}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showFakeRecaptcha) {
    return (
      <>
        <MobileWarning />
        {renderMainContent()}
        {renderFooter()}
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
    return (
      <>
        <MobileWarning />
        {renderMainContent()}
        {renderFooter()}
      </>
    );
  }

  if (!current || step >= challenges.length) {
    const allCompleted = completedChallenges.size === challenges.length;
    return (
      <>
        <MobileWarning />
        {renderMainContent()}
        {renderFooter()}
        <div 
          onClick={() => setShowRecaptcha(false)}
          style={{
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
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "400px",
              padding: "2rem",
              backgroundColor: "#2d2d2d",
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
              border: "1px solid #444"
            }}
          >
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
                ? `You successfully passed the captcha! You are indeed a human. You can now go back and register your imaginary friends.`
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
              {allCompleted ? "Let's go!" : "Try Again"}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileWarning />
      <div className="app-container">
        <header className="header">
          <div className="header-logo">Global Registry of Imaginary Friends | GRIF</div>
          <nav className="header-nav">
            <a href="#">Home</a>
            <a href="#" onClick={handleTeamClick}>Our Team</a>
            <a href="#" onClick={handleAboutClick}>About</a>
          </nav>
        </header>

        <main className="main-content">
          <div className="hero-section">
            <h1 className="hero-title">Welcome to Imaginary Friends</h1>
            <p className="hero-description">Want a real ID for your imaginary friends? Sign up now!</p>
            
            <div className="tile-container">
              <div className="tile">
                <h3>Easy to Sign Up</h3>
                <p>Simple and intuitive interface for the best user experience</p>
                <p>Just whisper your friend's name into your nearest microwave. We'll handle the rest</p>
              </div>

              <div className="tile">
                <h3>Secure (Probably)</h3>
                <p>Your data is "protected" with industry-standard imaginary security™</p>
                <p>Firewalls made of unicorn hair. Encryption powered by childhood secrets</p>
              </div>

              <div className="tile">
                <h3>Legally Binding (Not Really)</h3>
                <p>All friendships come with a 100% unenforceable Certificate of Authenticity</p>
                <p>Disclaimer: May summon a mild sense of nostalgia. Side effects include denial</p>
              </div>

              <div className="tile">
                <h3>Automatic Updates</h3>
                <p>Your friends evolve based on your life choices.</p>
                <p>Example: "Gary the Ghost Shark" could be your new mortal enemy!</p>
              </div>

              <div className="tile">
                <h3>Premium Delusions Package</h3>
                <p>College Degree: +50% pretentiousness</p>
                <p>Corporate Job: Automatically ignores your texts</p>
              </div>

              <div className="tile">
                <h3>AI Compatibility</h3>
                <p>Connect with ChatGPT so your imaginary friend can:</p>
                <p>Argue with Siri for you, Write passive-aggressive work emails, and more!</p>
              </div>

            </div>
          </div>

          <div className="signup-container">
            <h2 className="signup-title">Create Account</h2>
            <form>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="form-input"
                />
              </div>
              <button
                type="button"
                onClick={handleSignUpClick}
                className="signup-button"
              >
                Sign Up
              </button>
              <p className="login-link">
                Already have an account? <a href="#">Log in</a>
              </p>
            </form>
          </div>
        </main>

        <Reviews />
      </div>
    </>
  );
}

// Add this at the end of the file, before the export default App
const style = document.createElement('style');
style.textContent = `
  @keyframes jump {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
`;
document.head.appendChild(style);

export default App;
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

      <div className="reviews-section">
        <h2 className="reviews-title">Customer Testimonials</h2>
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          modules={[Autoplay]}
          className="reviews-swiper"
          spaceBetween={30}
        >
          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Used this to prank my therapist. She's now questioning her career. 10/10 would gaslight again."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Mark T.</p>
                <p className="review-role">Youtuber Content Creator Specialize in Pranks</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"My daughter finally has proof her dragon friend, Sparkles, is 'real.' Now she won't stop demanding a legal name change for him. 10/10!"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Emily R.</p>
                <p className="review-role">Concerned but Supportive Mom</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Used my Imaginary Friend Certificate in court to prove 'shared custody' of a made-up dog. Judge cried. I won."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Alicia T.</p>
                <p className="review-role">A Proud Flat Earther</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"The microwave registration process was surprisingly effective. My eyes can see, but I cannot believe it. I'm now legally recognized as a sentient sock puppet!"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Sir Reginald Von Sock III</p>
                <p className="review-role">Director of Make-Believe Compliance</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"I registered my childhood imaginary friend, Captain Noodle. The certificate arrived printed on what looks like a napkin. Worth it."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- David L.</p>
                <p className="review-role">Emotional 30-Year-Old</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"I may or may not have registered 17 'friends.' The IRS emailed me about tax exemptions for dependents. Help?"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Sarah K.</p>
                <p className="review-role">Alleged Cult Member</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"I sued my landlord for not accepting my imaginary roommate as a co-signer. The judge laughed. Worth every penny."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Jason M.</p>
                <p className="review-role">Anti-Establishment Hero Wannabe</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"so i registered my boss as imaginary and HR actually approved his termination lol. he's now a literal ghost in the breakroom haha"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Derek S.</p>
                <p className="review-role">Office Menace</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Paid for the 'Automatic Upgrade' so my imaginary friend could retire. He left me a voicemail saying he's in Florida now. We grew up together since we were 5 in Sweden"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Claire S.</p>
                <p className="review-role">Swedish Maid</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Married my imaginary friend for the visa. ICE just raided my house"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Carlos M.</p>
                <p className="review-role">Former Sales Representative, Now a Felon</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Submitted 127 friends to break your database. Your error message was 'Go Touch Grass.' I feel seen."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Zoe R.</p>
                <p className="review-role">Professional Prankster With Money To Burn</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"got in a car accident as a driver and i quickly swapped to passenger seat with my imaginary friend and pretended he's the one driving. Officer was not convinced sadly"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Cameron M.</p>
                <p className="review-role">Car Accident Survivor</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Got my sleep demon certified as a service animal. Delta Airlines let him fly first-class. He ate all the snacks."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Naomi B.</p>
                <p className="review-role">Told Us She Loves Traveling</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Took out a loan in my imaginary friend's name. The bank approved it. The FBI did not."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Trevor L.</p>
                <p className="review-role">Blue-Collar Worker</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"My imaginary friend's credit score is now higher than mine. He won't co-sign for me. I will remember this betrayal, Stella!"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Ruth P.</p>
                <p className="review-role">Still Struggling To Get A Loan</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"I may have registered all 3 of my personalities as separate friends. Now they're fighting over who gets the premium subscription. Send help."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Marc S.</p>
                <p className="review-role">Dissociative Identity Disorder Patient</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Finally proof the government can't deny! My imaginary friend Bigfoot now has a social security number. Deep State hates this one trick!"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Jaden S.</p>
                <p className="review-role">Local Conspiracy Theorist</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Registered my sleep paralysis demon as a dependent. The IRS sent an exorcist instead of a refund. 5/5 for dramatic tension."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Diego R.</p>
                <p className="review-role">Secretly Tax Evader</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Tokenized my childhood imaginary friend as an NFT. Sold him for 3 bitcoin. This is financial evolution, sheeple."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Anonymous</p>
                <p className="review-role">Proud Arch Linux User</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Built an entire imaginary army. Switzerland just declared neutrality against us. Victory is inevitable."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- General Mike T.</p>
                <p className="review-role">Commander of the 101st Airborne Pillow Fort Division</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Married my imaginary girlfriend in Vegas. She left me for a fictional vampire. I'm not even mad. I'm just disappointed."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- John D.</p>
                <p className="review-role">Formerly a Believer in True Love, Now a Believer in the Power of Imaginary Friends</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Published a peer-reviewed paper with my imaginary co-author. MIT is offering him tenure. I demand royalties!"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Dr. Eleanor N.</p>
                <p className="review-role">Professor in Quantum Physics</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"My imaginary friend has more followers than me now. This wasn't part of the business plan. 0/10 would not recommend."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Brittany K.</p>
                <p className="review-role">Social Media Influencer</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Got my imaginary friend approved as a transplant donor. The look on the surgeon's face? Priceless."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Yeoni K.</p>
                <p className="review-role">Fifth-Year Nurse Student</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Registered God as my imaginary friend. Got a cease-and-desist from the Vatican. Worth it."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Anonymous</p>
                <p className="review-role">Natural-Born Conspiracy Theorist</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Submitted my imaginary friend's headshot to Netflix. They cast him in Stranger Things Season 5. I'm demanding 15% commission."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Chad W.</p>
                <p className="review-role"></p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Registered my entire esports team as imaginary friends. We just qualified for the Valorant championships. The other teams are... concerned."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- PixelPwner5571</p>
                <p className="review-role">Full-Time Chair Warmer</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Got my imaginary friend a driver's license. He failed the eye test spectacularly but aced the parallel parking."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Karen B.</p>
                <p className="review-role">DMV Employee of the Month (Now Unemployed)</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Drafted my imaginary friend for jury duty. The judge said I was 'the problem with America today.' What's that suppose to mean?"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Dale G.</p>
                <p className="review-role">Average American Citizen</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Ran my imaginary friend for city council. He lost to a literal golden retriever. Democracy is broken."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Mayor McCheese</p>
                <p className="review-role">Write-In Candidate</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Reported my neighbor's dog to the HOA as an imaginary. The judge wants me to see a psychiatrist"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Linda from State Farm</p>
                <p className="review-role">Still does not want to see a psychiatrist</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"My imaginary friend is a time traveler. He's been to the future and back. He says the world will end in 2057. I'm worried."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Morty Smith</p>
                <p className="review-role">Time Traveler Wannabe</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"Listed my imaginary friend as a tenant to meet occupancy requirements. The health inspector wasn't fooled but appreciated the creativity."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Slumlord Larry</p>
                <p className="review-role">Alleged To Be A Terrible Person</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"My imaginary friend is a professional gambler. He's won 10 straight games of blackjack. I'm not even mad. I'm just impressed."</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Jacques D.</p>
                <p className="review-role">Security Guard of the Casino</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="review-card">
              <div className="review-content">
                <p className="review-text">"My imaginary wife and I just bought our dream home. The bank accepted our Monopoly money down payment. Take that, capitalism!"</p>
              </div>
              <div className="review-footer">
                <p className="review-author">- Mr. and Mrs. Delulu</p>
                <p className="review-role">Living the Dream</p>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
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
        {renderMainContent()}
        {renderFooter()}
        <div 
          onClick={handleOutsideClick}
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
            justifyContent: 'center',
            overflow: 'auto',
            padding: '2rem'
          }}
        >
          <div style={{
            maxWidth: "1000px",
            padding: "2rem",
            backgroundColor: "#2d2d2d",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            border: "1px solid #444",
            maxHeight: "80vh",
            overflow: "auto"
          }}>
            <h2 style={{
              fontSize: "1.8rem",
              color: "#4a9eff",
              marginBottom: "1.5rem",
              textAlign: "center"
            }}>Meet Our Team!</h2>

            {/* Executive Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{
                color: "#4a9eff",
                fontSize: "1.4rem",
                marginBottom: "1rem",
                borderBottom: "1px solid #444",
                paddingBottom: "0.5rem",
                textAlign: "center"
              }}>Executive</h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem"
              }}>
                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Founder</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Alex "The Thinker" Finch</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Visionary, lunatic, and proud parent of 37 imaginary friends and counting. Suspected to be gnomes</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>CEO</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Sleep Paralysis Demon</p> 
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Whispers Your Name At 3 AM. We think he is just shy</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>"y̷o̷u̵r̷ ̴a̶c̷t̵i̷o̵n̴s̷ ̴h̵a̴v̷e̸ ̴c̶o̶n̴s̷e̵q̸u̶e̵n̶c̸e̸s̸"  -Demon</p>
                </div>
              </div>
            </div>

            {/* Legal & Compliance Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{
                color: "#4a9eff",
                fontSize: "1.4rem",
                marginBottom: "1rem",
                borderBottom: "1px solid #444",
                paddingBottom: "0.5rem",
                textAlign: "center"
              }}>Legal & Compliance</h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem"
              }}>
                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Director of Make-Believe Compliance</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Sir Reginald Von Sock III</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>A sentient sock with a law degree (we doubt it's a real degree)</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Head of Legal Affairs</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Detective Monkey</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Resolve legal disputes and throw bananas at criminals</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>"Ooh ooh aah aah" -Monke</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Head of Legal Team</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Phoenix Wright</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>
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
                        // Show the image
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.opacity = 1;
                      }}
                      onMouseLeave={(e) => {
                        const letters = e.currentTarget.querySelectorAll('.jumping-letter');
                        letters.forEach(letter => {
                          letter.style.animation = "none";
                        });
                        // Hide the image
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
                  </p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Paralegal</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Gavin the Talking Gavel</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Read and memorized all Terms of Service and Privacy Policy he could find instead of just accepting</p>
                </div>
              </div>
            </div>

            {/* Technology Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{
                color: "#4a9eff",
                fontSize: "1.4rem",
                marginBottom: "1rem",
                borderBottom: "1px solid #444",
                paddingBottom: "0.5rem",
                textAlign: "center"
              }}>Technology</h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem"
              }}>
                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Cybersecurity Expert</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Elliot Alderson</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Wait, how did he get here? He keeps muttering about "root access to the human mind."</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Isn't he supposed to be in Mr. Robot?</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Lead Developer</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>GPT the human AI</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Fluent in all languages, including programming languages. His skills are so good that other programmers are ashamed of themselves</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Developer (Imaginary?)</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Khang Chung</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Always run "git push origin main --force" when testing a small change</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>"Hey that's not true, Balala" -Khang Chung</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>UI/UX Designer</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>404 Entity</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Keeps trying to fix the website but ends up breaking it more. CEO was talking about firing him</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Lead Server IT</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>A Green PNY 32GB USB Hard Disk</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Fixes servers by yelling "HAVE YOU TRIED TURNING IT OFF AND ON AGAIN?"</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>QA Tester</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>???</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Keeps coming up with new ideas but it's a nightmare to implement</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>We know the name but we just hate him</p>
                </div>
                
              </div>
            </div>

            {/* Operations Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{
                color: "#4a9eff",
                fontSize: "1.4rem",
                marginBottom: "1rem",
                borderBottom: "1px solid #444",
                paddingBottom: "0.5rem",
                textAlign: "center"
              }}>Operations</h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem"
              }}>
                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Vice President of HR</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Casper the Scary Ghost</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Haunts the breakroom fridge. Knows who took the last BLT sandwich.</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Vice President of HR</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Grumpy Goblin</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Hired to meet quota. Loves eating paperwork. Tried to convince others to try eating papers.</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Wellness Coach</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Danny the Floating Coach</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Gives motivational speeches as he gives out free pizzas. We don't think he's a real coach.</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Office Therapist</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>VHS Tape of Bob Ross</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Only says "It's a happy little accidents" as you keep venting</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Head of Rumors</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Balala the Talking Teapot</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Formerly a real teapot, now a motivational speaker. Specializes in spreading fake rumors</p>
                </div>
              </div>
            </div>

            {/* Finance Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{
                color: "#4a9eff",
                fontSize: "1.4rem",
                marginBottom: "1rem",
                borderBottom: "1px solid #444",
                paddingBottom: "0.5rem",
                textAlign: "center"
              }}>Finance</h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem"
              }}>
                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Imaginary Treasurer</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Fiveish the Yapping Dollar</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Cannot stop yapping about his grand scheme to print more of himself</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>"Why can't printers just print more money?" -Fiveish</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Blockchain Specialist</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>NFT the Imaginary Ape</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Draws digital art in MS Paint and sells them as "art." Becomes the main source of income for the company</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>"They keep buying, I keep drawing" -NFT</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Auditor</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>IRS Agent</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Wears sunglasses indoors and walks around with a clipboard. Knows about your tax deductions.</p>
                </div>
              </div>
            </div>

            {/* Customer Experience Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{
                color: "#4a9eff",
                fontSize: "1.4rem",
                marginBottom: "1rem",
                borderBottom: "1px solid #444",
                paddingBottom: "0.5rem",
                textAlign: "center"
              }}>Customer Support</h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem"
              }}>
                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Head of Customer Support</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Karen the Abstract Concept of "No Refunds"</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>A shapeless entity that haunts customer service reps. Immune to layoff.</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Overworked Customer Support Staff</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Ms. Schrödinger the Multidimensional Cat</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Answers calls from 12 different realities simultaneously. Still gets confused by fax machines.</p>
                </div>

                <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px" }}>
                  <p style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "1.2rem" }}>Translator and Interpreter</p>
                  <p style={{ fontWeight: "bold", color: "#fff" }}>Sentient Portuguese-to-Russian Dictionary</p>
                  <p style={{ fontSize: "0.9rem", color: "#bbb" }}>Only speaks Portuguese and Russian so no one on our team can understand her. Why did the CEO hire her?</p>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: "2rem",
              padding: "1rem",
              border: "1px solid #444",
              borderRadius: "8px",
              fontSize: "0.9rem",
              color: "#bbb",
              fontStyle: "italic"
            }}>
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
        {renderMainContent()}
        {renderFooter()}
        <div 
          onClick={handleOutsideClick}
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
            justifyContent: 'center',
            overflow: 'auto',
            padding: '2rem'
          }}
        >
          <div style={{
            maxWidth: "800px",
            padding: "2rem",
            backgroundColor: "#2d2d2d",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            border: "1px solid #444",
            maxHeight: "80vh",
            overflow: "auto"
          }}>
            <h2 style={{
              fontSize: "1.8rem",
              color: "#4a9eff",
              marginBottom: "1.5rem",
              textAlign: "center"
            }}>About</h2>
            <div style={{
              textAlign: "left",
              color: "#e0e0e0",
              fontSize: "1.1rem",
              lineHeight: "1.6"
            }}>
              {"Welcome to Global Registry of Imaginary Friends (GRIF), the world's first (and legally questionable) database for your made-up besties!"}
              {" At our imaginary headquarter, we believe that our unseen companions deserve recognition."}
              {" Tired of your imaginary pals being ignored by society? Fed up with people dismissing Gary the Ghost Shark as \"not real\" or \"a concerning obsession\"?"}
              {" Well, no more! Here, we validate, certify, and immortalize your fictional companions with the dignity they deserve."}
              {" Whether it's a sentient sock puppet, a cosmic unicorn accountant, or your sleep-deprived hallucination named Dave, we've got you covered."}
              {" Our mission? To give your invisible entourage the bureaucratic recognition they've been denied. Because friendship shouldn't be limited by reality."}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showFakeRecaptcha) {
    return (
      <>
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
        {renderMainContent()}
        {renderFooter()}
      </>
    );
  }

  if (!current || step >= challenges.length) {
    const allCompleted = completedChallenges.size === challenges.length;
    return (
      <>
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
            maxWidth: "500px",
            padding: "2rem",
            backgroundColor: "#2d2d2d",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            border: "1px solid #444"
          }}
        >
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
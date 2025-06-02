import React, { useEffect, useRef, useState } from "react";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import cardsContent from "../assets/card";
import heroContent from "../assets/hero";
import footer from "../assets/footer";
import "./BioInsta.css";

const api_key = "AIzaSyD9NPAIPdTT9ZndwagGQAbvOZf6lsaxvTA";

export default function BioInsta({ user, handleLogout }) {
  const sectionRef = useRef(null);

  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Header handleLogout={handleLogout} />
      <Main handleScroll={handleScroll} user={user} />
      <Card />
      <Contact />
      <GenerateBio sectionRef={sectionRef} />
      <Card />
      <Footer />
    </div>
  );
}

function Header({ handleLogout }) {
  return (
    <>
      <header>
        <nav className="nav">
          <h1 className="nav-head">BioInsta.AI</h1>

          <div className="btns-nav">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <a href="https://github.com/prasanna-27167896" className="nav-btn">
              Developer
              <RiUserSettingsFill />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}

function Main({ handleScroll, user }) {
  return (
    <>
      <div className="main-container">
        <div className="main-head">
          <h3>
            Welcome,<span> {user}!</span>
          </h3>
          <h1>{heroContent.title}</h1>
        </div>
        <div className="main-para">{heroContent.subtitle}</div>
        <div className="main-btn">
          <button className="gen-btn" onClick={handleScroll}>
            Generate My Bio Now <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

const Card = () => {
  return (
    <div className="card-container">
      {cardsContent.map((card, index) => (
        <article key={index} className="card-box">
          <div className="card-content">
            <h3> {card.title}</h3>
            <p>{card.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

function Contact() {
  return (
    <>
      <div className="contact-container">
        <h1>Contact for Advertisement</h1>
        <p>
          Want to promote your brand, product, or service? Get in touch with us
          to start advertising and reach a broader audience.
        </p>
        <div>
          <button>Contact for ads</button>
        </div>
      </div>
    </>
  );
}

function GenerateBio({ sectionRef }) {
  const [keywords, setKeywords] = useState("");
  const [generatedBio, setGeneratedBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatedBio)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  async function fetchData(keywords) {
    if (!keywords) {
      alert("Please enter the keywords! ");
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a short, engaging Instagram bio for someone passionate about creativity, collaboration, and personal growth. The bio should be modern, approachable, and inspiring, with a maximum length of 150 characters. Use multiple lines to format the bio. Incorporate the following keywords provided by the user "${keywords}"`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const bio = data.candidates[0].content.parts[0].text;
      setLoading(false);
      setGeneratedBio(bio);
      setKeywords("");
    } catch (error) {
      console.error(error);
    }
  }

  function handleButton() {
    fetchData(keywords);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData(keywords);
    }
  };

  return (
    <>
      <div className="gen-container" ref={sectionRef}>
        <div className="gen-content">
          <h1>Generate Your Perfect Bio</h1>
          <p>
            Enter keywords that describe you or your vibe, and let our AI create
            a unique bio for you.
          </p>
          <div className="gen-input">
            <input
              type="text"
              placeholder="Enter keywords (e.g.,coder,gamer,traveler)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleButton} style={{ marginBottom: "10px" }}>
              {loading ? "Generating..." : "Generate Bio"}
            </button>
          </div>
        </div>
      </div>
      {generatedBio && (
        <div className="gen-result">
          <h2>Your Generated Bio</h2>
          <p className="bio-result">{generatedBio}</p>
          <div>
            <button onClick={handleCopy}>
              {copied && generatedBio ? "Copied!" : "Copy Bio"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <>
      <div className="foot-container">
        <footer>
          <div>
            <div className="foot-content">
              <p>{footer.finalPitch}</p>
              <p>{footer.socialMedia}</p>
            </div>
            <hr className="line" />
            <div className="foot-copy">
              <p>
                © Copyright {new Date().getFullYear()}. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

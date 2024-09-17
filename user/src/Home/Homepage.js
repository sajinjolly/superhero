import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './HomePage.css';

const HomePage = () => {
  const [pages, setPages] = useState([]);  
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const pagesRef = useRef(null);
  const navigate = useNavigate();
  
  let scrollTimeout = null;
  let touchTimeout = null;

  const updateCurrentPage = (newPage) => {
    setCurrentPage((prev) => Math.max(0, Math.min(newPage, pages.length - 1)));
  };

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/homepage`);
        setPages([{ title: "Batman", content: "" }, ...res.data]);  
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    fetchPages();
  }, []);

  const handleMouseMove = (e) => {
    const torchlight = document.querySelector(".torchlight-effect");
    if (torchlight) {
      torchlight.style.setProperty("--mouse-x", `${e.clientX}px`);
      torchlight.style.setProperty("--mouse-y", `${e.clientY}px`);
    }
  };

  const handleScroll = (e) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (e.deltaY > 0) {
        updateCurrentPage(currentPage + 1); 
      } else {
        updateCurrentPage(currentPage - 1); 
      }
    }, 180); 
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      if (touchStart - touchEnd > 50) {
        updateCurrentPage(currentPage + 1);
      } else if (touchEnd - touchStart > 50) {
        updateCurrentPage(currentPage - 1);
      }
    }, 180); 
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentPage, pages.length]); 

  const handleGrievanceClick = () => {
    navigate('/gri');
  };

  return (
    <div className="homepage-container">
      <div className="torchlight-effect">
        <TransitionGroup className="pages" ref={pagesRef}>
          {pages.length > 0 ? (
            <CSSTransition
              key={currentPage}
              timeout={1500}
              classNames="page"
            >
              <div className="page">
                <div className="content">
                  <div className="intro-text">
                    <h1 className="home-title">{pages[currentPage].title}</h1>
                    <p className="homecontent-text">{pages[currentPage].content}</p>
                    {pages[currentPage].image && <img src={pages[currentPage].image} alt="Page Visual" className="page-image" />}
                  </div>
                </div>
              </div>
            </CSSTransition>
          ) : (
            <div>Loading...</div>  
          )}
        </TransitionGroup>
      </div>
      <p className="firstcontent">Have a Concern?</p>
      <button className="home-grievance-btn" onClick={handleGrievanceClick}>
        Submit Your Grievance
      </button>
    </div>
  );
};

export default HomePage;

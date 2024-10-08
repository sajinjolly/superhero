import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './AboutUs.css';

const AboutUs = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const pagesRef = useRef(null);
  const navigate = useNavigate();

  const updateCurrentPage = (newPage) => {
    setCurrentPage((prev) => Math.max(0, Math.min(newPage, pages.length - 1)));
  };

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/aboutus`);
        setPages([{ title: "About Us", content: "" }, ...res.data]);
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
    if (e.deltaY > 0) {
      updateCurrentPage(currentPage + 1); 
    } else {
      updateCurrentPage(currentPage - 1); 
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      updateCurrentPage(currentPage + 1);
    } else if (touchEnd - touchStart > 50) {
      updateCurrentPage(currentPage - 1);
    }
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
    <div className="aboutus-container">
      <nav className="navbar">
        <div className="navbar-logo">About Us</div>
        <ul className="navbar-menu">
          <p onClick={() => navigate('/')}>Home</p>
          <p onClick={() => navigate('/gri')}>Grievance</p>
        </ul>
      </nav>
      <div className="torchlight-effect">
        <div
          className="pages"
          ref={pagesRef}
          style={{ transform: `translateY(-${currentPage * 100}vh)`, transition: "transform 1.5s ease-in-out" }}
        >
          {pages.length > 0 ? (
            pages.map((page, index) => (
              <div key={index} className={`page page-${currentPage} fade-in`}>
                <div className="content">
                  <div className="intro-text">
                    <h1 className="page-title">{page.title}</h1>
                    <p className="content-text">{page.content}</p>
                    {page.image && <img src={page.image} alt="Page Visual" className="page-image" />}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default AboutUs;

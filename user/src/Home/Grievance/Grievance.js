import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Grievance.css';

const Grievance = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grievance: '',
    remedy: ''
  });
  const [emailError, setEmailError] = useState(''); 

  const navigate = useNavigate();

  const handleNext = () => {
    setIsAnimating(true); 
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
      setIsAnimating(false);
    }, 500);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
      setIsAnimating(false);
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (value.includes('@') && value.endsWith('.com')) {
        setEmailError(''); 
      } else {
        setEmailError('Please enter a valid Gmail address');
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!emailError) {
      try {
        await axios.post('http://localhost:5000/api/grievance/grievances', formData);
        alert('Grievance submitted successfully!');
        navigate('/'); 
      } catch (error) {
        console.error('Error submitting grievance', error);
      }
    } else {
      alert('Please correct the errors before submitting');
    }
  };

  const pages = [
    {
      title: 'Enter Your Name',
      content: (
        <input
          className="gri-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      )
    },
    {
      title: 'Enter Your Email Address',
      content: (
        <>
          <input
            className="gri-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </>
      )
    },
    {
      title: 'State Your Grievance',
      content: (
        <textarea
          className="gri-textarea"
          name="grievance"
          value={formData.grievance}
          onChange={handleChange}
          placeholder="Describe your grievance"
          required
        />
      )
    },
    {
      title: 'Proposed Remedy for Grievance',
      content: (
        <textarea
          className="gri-textarea"
          name="remedy"
          value={formData.remedy}
          onChange={handleChange}
          placeholder="What remedy do you seek?"
          required
        />
      )
    },
    {
      title: 'Review Your Submission',
      content: (
        <div className="gri-summary">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Grievance:</strong> {formData.grievance}</p>
          <p><strong>Remedy:</strong> {formData.remedy}</p>
        </div>
      )
    }
  ];

  return (
    <div className="gri-container">
      <nav className="navbar gri-navbar">
        <div className="navbar-logo">Grievance</div>
        <ul className="navbar-menu">
          <p onClick={() => navigate('/')}>Home</p>
          <p onClick={() => navigate('/about')}>About Us</p>
        </ul>
      </nav>
      <div className={`gri-page gri-page-${currentPage} ${isAnimating ? 'fade' : ''}`}>
        <h2 className="gri-title">{pages[currentPage].title}</h2>
        <div className="gri-content">{pages[currentPage].content}</div>
        <div className="gri-navigation">
          {currentPage > 0 && (
            <button className="gri-back-btn" onClick={handleBack}>← Back</button>
          )}
          {currentPage < pages.length - 1 ? (
            <button className="gri-next-btn" onClick={handleNext} disabled={!formData[Object.keys(formData)[currentPage]]}>
              {currentPage === 0 ? "LET'S DO THIS →" : 'Continue →'}
            </button>
          ) : (
            <button className="gri-submit-btn" onClick={handleSubmit} disabled={emailError}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grievance;

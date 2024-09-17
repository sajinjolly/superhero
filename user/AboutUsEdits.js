import './AboutUsEdits.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const AboutUsEdits = ({ token }) => {
  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [newSection, setNewSection] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  // Function to fetch sections
  const fetchSections = async () => {
    try {
      const res = await axios.get(`${process.env.API_HOST}/api/aboutus`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSections(res.data || []);
    } catch (error) {
      console.error('Failed to fetch sections', error);
    }
  };

  // Fetch sections initially
  useEffect(() => {
    fetchSections();
  }, [token]);

  const handleAddSection = async () => {
    try {
      await axios.post(`${process.env.API_HOST}/api/aboutus`, newSection, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewSection({ title: '', content: '' });
      fetchSections();  // Refresh the list after adding
    } catch (error) {
      console.error('Failed to add section', error);
    }
  };

  const handleUpdateSection = async (id) => {
    try {
      await axios.put(`http://API_HOST/api/aboutus/${id}`, editingSection, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingSection(null);
      fetchSections();  // Refresh the list after updating
    } catch (error) {
      console.error('Failed to update section', error);
    }
  };

  const handleDeleteSection = async (id) => {
    try {
      await axios.delete(`http://API_HOST/api/aboutus/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSections();  // Refresh the list after deleting
    } catch (error) {
      console.error('Failed to delete section', error);
    }
  };

  return (
    <div className="About-us-edits-modern">
      <button className="About-back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>Edit About Us Page</h2>

      <div className="About-new-section-form">
        <input
          type="text"
          placeholder="New Section Title"
          value={newSection.title}
          onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
        />
        <textarea
          placeholder="New Section Content"
          value={newSection.content}
          onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
        ></textarea>
        <button onClick={handleAddSection}>Add Section</button>
      </div>

      <div className="About-sections-list">
        {sections.length > 0 ? (
          sections.map((section) => (
            <div key={section._id} className="About-section-card">
              {editingSection?._id === section._id ? (
                <div>
                  <input
                    type="text"
                    value={editingSection.title || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                  />
                  <textarea
                    value={editingSection.content || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                  ></textarea>
                  <button onClick={() => handleUpdateSection(section._id)}>Save</button>
                  <button onClick={() => setEditingSection(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{section.title || 'Untitled'}</h3>
                  <p>{section.content || 'No content available'}</p>
                  <button onClick={() => setEditingSection(section)}>Edit</button>
                  <button onClick={() => handleDeleteSection(section._id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No sections available.</p>
        )}
      </div>
    </div>
  );
};

export default AboutUsEdits;

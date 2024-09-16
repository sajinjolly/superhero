import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserEdits.css';
import { useNavigate } from 'react-router-dom'; 

const UserEdits = ({ token }) => {
  const [pages, setPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);
  const [newPage, setNewPage] = useState({ title: '', content: '' });
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/homepage');
        setPages(res.data || []); 
      } catch (error) {
        console.error('Failed to fetch pages', error);
      }
    };

    fetchPages();
  }, []);

  const handleAddPage = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/homepage', newPage);
      setPages([...pages, res.data.page]);
      setNewPage({ title: '', content: '' });
    } catch (error) {
      console.error('Failed to add page', error);
    }
  };

  const handleUpdatePage = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/homepage/${id}`, editingPage);
      setPages(pages.map((page) => (page._id === id ? editingPage : page)));
      setEditingPage(null);
    } catch (error) {
      console.error('Failed to update page', error);
    }
  };

  const handleDeletePage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/homepage/${id}`);
      setPages(pages.filter((page) => page._id !== id));
    } catch (error) {
      console.error('Failed to delete page', error);
    }
  };

  return (
    <div className="user-edits-container">
            <button className="About-back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>Edit Homepage</h2>

      <div className="new-page-form">
        <input
          type="text"
          placeholder="New Page Title"
          value={newPage.title}
          onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
        />
        <textarea
          placeholder="New Page Content"
          value={newPage.content}
          onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
        ></textarea>
        <button onClick={handleAddPage}>Add Page</button>
      </div>

      <div className="pages-list">
        {pages?.length > 0 ? (
          pages?.map((page) => (
            <div key={page?._id || Math.random()} className="page-item">
              {editingPage?._id === page?._id ? (
                <div>
                  <input
                    type="text"
                    value={editingPage?.title || ''} 
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  />
                  <textarea
                    value={editingPage?.content || ''} 
                    onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  ></textarea>
                  <button onClick={() => handleUpdatePage(page._id)}>Save</button>
                  <button onClick={() => setEditingPage(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{page?.title || 'Untitled'}</h3>
                  <p>{page?.content || 'No content available'}</p>
                  <button onClick={() => setEditingPage(page)}>Edit</button>
                  <button onClick={() => handleDeletePage(page._id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No pages available.</p>
        )}
      </div>
    </div>
  );
};

export default UserEdits;

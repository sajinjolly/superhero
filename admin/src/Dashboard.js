import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FaCog } from 'react-icons/fa';

const Dashboard = ({ token }) => {
  const [grievances, setGrievances] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const settingsRef = useRef(null);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/grievance/grievances`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched grievances:', res.data);
        setGrievances(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching grievances:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchGrievances();
  }, [token]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/grievance/grievances/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGrievances((prevGrievances) =>
        prevGrievances.map((grievance) =>
          grievance._id === id ? { ...grievance, status } : grievance
        )
      );
    } catch (error) {
      console.error('Failed to update grievance status:', error.response ? error.response.data : error.message);
    }
  };

  const filteredGrievances = grievances
    .filter((grievance) => grievance.status.includes(filter))
    .filter((grievance) =>
      (grievance.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grievance.complaint?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Link className='side-dash' to="/dash">Dashboard</Link>
        <Link to="/user-edits">User Edits</Link>
        <Link to="/about-us">About Us</Link>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Grievance Dashboard</h2>
          <div className="settings-icon" onClick={() => setShowSettings(!showSettings)}>
            <FaCog size={24} />
          </div>
          {showSettings && (
            <div className="settings-dropdown" ref={settingsRef}>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Search by name or complaint"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="In Progress">In Progress</option>
          <option value="Rejected">Rejected</option>
        </select>

        {loading ? (
          <p>Loading grievances...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Complaint</th>
                <th>Remedy</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrievances.map((grievance) => (
                <tr key={grievance._id}>
                  <td>{grievance.name}</td>
                  <td>{grievance.email}</td>
                  <td>{grievance.grievance}</td>
                  <td>{grievance.remedy}</td>
                  <td>{grievance.status}</td>
                  <td>
                    <select
                      value={grievance.status}
                      onChange={(e) => handleStatusUpdate(grievance._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

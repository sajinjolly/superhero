import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './Dashboard.css'; 

const Dashboard = ({ token }) => {
  const [grievances, setGrievances] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/grievance/grievances', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGrievances(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching grievances', error);
      }
    };

    fetchGrievances();
  }, [token]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/grievance/grievances/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGrievances((prevGrievances) =>
        prevGrievances.map((grievance) =>
          grievance._id === id ? { ...grievance, status } : grievance
        )
      );
    } catch (error) {
      console.error('Failed to update grievance status', error);
    }
  };

  const filteredGrievances = grievances
    .filter((grievance) => grievance.status.includes(filter))
    .filter((grievance) => 
      (grievance.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      grievance.complaint?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Link className='side-dash' to="/dash">Dashboard</Link>
        <Link to="/user-edits">User Edits</Link>
        <Link to="/about-us">About Us</Link>
      </div>
      <div className="main-content">
        <h2>Grievance Dashboard</h2>

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

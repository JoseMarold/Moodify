import React, { useState } from 'react';
import './Historical.css';
import logo from './moodifylogo.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function HistoricalRecommendations() {
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("http://localhost:3001/historical", {
    headers: {
      Authorization: token
    }
  })
    .then(res => res.json())
    .then(data => setRecommendations(data))
    .catch(err => {
      console.error("Error fetching historical recommendations:", err);
    });
}, []);

  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleBackToRecommendations = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in.");
      navigate("/");
      return;
    }

    fetch("http://localhost:3001/verify", {
      headers: { Authorization: token }
    })
    .then(res => {
      if (!res.ok) throw new Error("Invalid token");
      navigate("/recomendations");
    })
    .catch(() => {
      alert("Invalid or expired token.");
      localStorage.removeItem("token");
      navigate("/");
    });
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <img
          src={logo}
          alt="MOODIFY Logo"
          className="navbar-logo"
          onClick={handleBackToRecommendations}
          style={{ cursor: "pointer" }}
        />
        <div className='logout-container'>
          <button type="button" className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      <div className="history-container">
        <h1 className="history-title">Historical Recommendations</h1>
        
        <div className="table-container">
          <table className="recommendations-table">
            <thead>
              <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Emotion</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.length > 0 ? (
                recommendations.map((item, index) => (
                  <tr key={index}>
                    <td>{item.song || '-'}</td>
                    <td>{item.artist || '-'}</td>
                    <td>{item.album || '-'}</td>
                    <td>{item.emotion||'-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="empty-message">
                    No recommendations yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button className="back-button" onClick={handleBackToRecommendations}>
          Back to recommendation
        </button>
      </div>
    </div>
  );
}

export default HistoricalRecommendations;

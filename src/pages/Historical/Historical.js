import React, { useState } from 'react';
import './Historical.css';
import logo from '../../images/moodifylogo.png';
import { Link } from 'react-router-dom';

function HistoricalRecommendations() {

  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="app-container">
      <header className="navbar">
        <Link to="/recomendations">
          <img src={logo} alt="MOODIFY Logo" className="navbar-logo" />
        </Link>
        <div className='logout-container'>
          <Link to="/">
            <button type ="submit" className="logout-button">Log Out</button>
          </Link>
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
              </tr>
            </thead>
            <tbody>
              {recommendations.length > 0 ? (
                recommendations.map((item, index) => (
                  <tr key={index}>
                    <td>{item.song || '-'}</td>
                    <td>{item.artist || '-'}</td>
                    <td>{item.album || '-'}</td>
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

        <Link to="/recomendations">
          <button className="back-button">Back to recommendation</button>
        </Link>
        
      </div>
    </div>
  );
}

export default HistoricalRecommendations;
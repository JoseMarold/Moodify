import React, { useState } from 'react';
import './Historical.css';
import logo from './moodifylogo.png';


function HistoricalRecommendations() {

  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="app-container">
      {/* Barra de navegación */}
      <header className="navbar">
        <img src={logo} alt="MOODIFY Logo" className="navbar-logo" />
      </header>

      {/* Contenido principal */}
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

        <button className="back-button">
          Back to recommendation
        </button>
      </div>
    </div>
  );
}

export default HistoricalRecommendations;
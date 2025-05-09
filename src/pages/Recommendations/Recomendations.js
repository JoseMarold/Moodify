import logo from '../../images/moodifylogo.png';
import userPhoto from '../../images/UserPhoto.png';
import './Recomendations.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Recomendations() {
   const [recommendations, setRecommendations] = useState([]);
   
   return (
    <div className='Recomendations-page'>
        <div className="app-container">
        <header className="navbar">
          <Link to="/">
            <img src={logo} alt="MOODIFY Logo" className="navbar-logo" />
          </Link>
            <div className='logout-container'>
              <Link to="/">
                <button type ="submit" className="logout-button">Log Out</button>
                </Link>
            </div>
        </header>

        <div className='recomendation-container'>
          
          <form className='input-container'>
              <button className='button'>Import image</button>
              <img src={userPhoto} alt="user photo" className="user-photo" />
              <Link to="/historical">
                <button className='button'>Get historical recomendations</button>
              </Link>
          </form>

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
        </div>
        </div>
    </div>
    
  );
}

export default Recomendations;
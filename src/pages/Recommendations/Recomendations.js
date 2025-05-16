import logo from './moodifylogo.png';
import userPhoto from './UserPhoto.png';
import './Recomendations.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Recomendations() {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to access this page.");
      navigate("/");
    } else {
      fetch("http://localhost:3001/verify", {
        headers: { Authorization: token }
      })
      .then(res => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .catch(() => {
        alert("Session expired or invalid token.");
        localStorage.removeItem("token");
        navigate("/");
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToHistorical = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to be logged in.");
    return;
  }

  fetch("http://localhost:3001/verify", {
    headers: { Authorization: token }
  })
  .then(res => {
    if (!res.ok) throw new Error("Invalid token");
    navigate("/historical");
  })
  .catch(() => {
    alert("Invalid or expired token.");
    localStorage.removeItem("token");
    navigate("/");
  });
};

  const handleImportImage = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in.");
      return;
    }

    fetch("http://localhost:3001/verify", {
      headers: { Authorization: token }
    })
    .then(res => {
      if (!res.ok) throw new Error("Invalid token");
      alert("Token verified successfully.");
    })
    .catch(() => {
      alert("Invalid or expired token.");
      localStorage.removeItem("token");
      navigate("/");
    });
  };

  return (
    <div className='Recomendations-page'>
      <div className="app-container">
        <header className="navbar">
          <Link to="/">
            <img src={logo} alt="MOODIFY Logo" className="navbar-logo" />
          </Link>
          <div className='logout-container'>
            <button type="button" className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </header>

        <div className='recomendation-container'>
          <form className='input-container' onSubmit={e => e.preventDefault()}>
            <button type="button" className='button' onClick={handleImportImage}>
              Import image
            </button>
            <img src={userPhoto} alt="user photo" className="user-photo" />

            <button type="button" className='button' onClick={goToHistorical}>
              Get historical recommendations
            </button>
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

import logo from '../../images/moodifylogo.png';
import userPhoto from '../../images/UserPhoto.png';
import './Recomendations.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Sentry = require('@sentry/react');
const API_URL = process.env.REACT_APP_API_URL;

function Recomendations() {
  const [base64Image, setBase64Image] = useState(null);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const fileInputRef = React.useRef();
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to access this page.");
      navigate("/");
    } else {
      fetch(`${API_URL}/verify`, {
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

  fetch(`${API_URL}/verify`, {
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

    fetch(`${API_URL}/verify`, {
      headers: { Authorization: token }
    })
    .then(res => {
      if (!res.ok) throw new Error("Invalid token");
      fileInputRef.current.click();
    })
    .catch(() => {
      alert("Invalid or expired token.");
      localStorage.removeItem("token");
      navigate("/");
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const token = localStorage.getItem("token");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64WithPrefix = reader.result;
        setBase64Image(base64WithPrefix);
        
        // Calling Rekognition endpoint in Backend
        fetch(`${API_URL}/useRekognition`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({content: base64WithPrefix})
        })
        .then(res => {
          if (!res.ok) throw new Error("Error in image analysis");
          return res.json();
        })
        .then(data => {
          console.log("Backend response:", data);
          if (data.emotion) {
            // set detected emotion for more recommendations
            setDetectedEmotion(data.emotion);
            // Get recommendations
            fetch(`${API_URL}/getRecommendations`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": token
              },
              body: JSON.stringify({ emotionName: data.emotion })
            })
            .then(res => res.json())
            .then(recommendations => {
              setRecommendations(recommendations);
            })
            .catch(() => {
              alert("Error getting song recommendations.");
            });
          }
        })        
        .catch(() => {
          alert("Error while analyzing image");
        });

      };
      reader.readAsDataURL(file);
    }
  };

  const generateMoreRecommendations = () => {
    const token = localStorage.getItem("token");
    if (!detectedEmotion) {
      alert("You need to analyze an image first.");
      return;
    }
  
    fetch(`${API_URL}/getRecommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ emotionName: detectedEmotion })
    })
      .then(res => res.json())
      .then(recommendations => {
        setRecommendations(recommendations);
      })
      .catch(() => {
        alert("Error getting song recommendations.");
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
          <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button type="button" className='button' onClick={handleImportImage}>
              Import image
            </button>
            <img src={base64Image || userPhoto} alt="user" className="user-photo" />

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
                      <td>{item.name || '-'}</td>
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
            {detectedEmotion && (
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <button className="button" onClick={generateMoreRecommendations}>
                  Generate more recommendations
                </button>
              </div>
            )}
          </div> 
        </div>
      </div>
    </div>
  );
}

export default Recomendations;

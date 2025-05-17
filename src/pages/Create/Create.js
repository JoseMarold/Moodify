import vinyl from '../../images/Vinyl record.png';
import logo from '../../images/moodifylogo.png';
import './Create.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      const response = await fetch('http://localhost:3001/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);

        navigate('/recomendations');
      } else {
        alert(data.message || 'Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error del servidor');
    }
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <img src={logo} alt="MOODIFY Logo" className="navbar-logo" />
      </header>

      <div className="main-content">
        <div className="image-section">
          <img src={vinyl} alt="Vinyl" />
        </div>
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <h1 className="Form-title">Sign Up</h1>
            <input
              type="text"
              placeholder="Username"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
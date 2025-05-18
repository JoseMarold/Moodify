import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logom.jpg';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/recomendations');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error("Server error during login");
    }
  };

  return (
    <div className='Login-page'>
      <div className="app-container">
        <div className="main-content">
          <div className="image-section">
            <img src={logo} alt="AppLogo" />
          </div>
          <div className="form-section">
            <form onSubmit={handleLogin}>
              <h1 className="Form-title">Hi there!</h1>
              <input
                required
                type="text"
                placeholder="Username"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                required
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="button">Log in</button>
              <Link to="/create" className='link'>New here? Sign up!</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

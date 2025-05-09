import vinyl from '../../images/Vinyl record.png';
import logo from '../../images/moodifylogo.png';
import './Create.css';
import { Link } from 'react-router-dom';

function Create() {
   return (
    <div className="app-container">
      
      <header className="navbar">
        <Link to="/">
          <img src={logo} alt="MOODIFY Logo" className="navbar-logo" />
        </Link>
      </header>

      <div className="main-content">
        <div className="image-section">
          <img src={vinyl} alt="Vinyl" />
        </div>
        <div className="form-section">
          <form>
            <h1 className="Form-title">Sign Up</h1>
            <input type="text" placeholder="Username" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <Link to="/recomendations">
              <button type="submit" className="button">Sign Up</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
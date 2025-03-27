import vinyl from './Vinyl record.png';
import logo from './moodifylogo.png';
import './Create.css';

function Create() {
   return (
    <div className="app-container">
      {/* Barra superior con logo */}
      <header className="navbar">
        <img src={logo} alt="MOODIFY Logo" className="navbar-logo" />
      </header>

      {/* Resto del código permanece igual */}
      <div className="main-content">
        <div className="image-section">
          <img src={vinyl} alt="Vinyl" />
        </div>
        <div className="form-section">
          <h1 className="logo">Sign Up</h1>
          <form>
            <input type="text" placeholder="Username" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button type="submit" className="button">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
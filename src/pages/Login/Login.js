import logo from '../../images/logom.jpg';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
   return (
    <div className='Login-page'>
        <div className="app-container">
        <div className="main-content">
            <div className="image-section">
                <img src={logo} alt="AppLogo" />
            </div>
            <div className="form-section">
            <form>
                <h1 className="Form-title">Hi there!</h1>
                <input required type="text" placeholder="Username" className="input" />
                <input required type="password" placeholder="Password" className="input" />
                <Link to="/recomendations">
                  <button type="submit" className="button">Log in</button>
                </Link>
                <Link to="/create" className='link'>New here? Sign up!</Link>
            </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
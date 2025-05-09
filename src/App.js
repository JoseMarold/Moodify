import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Create from './pages/Create/Create';
import Recomendations from './pages/Recommendations/Recomendations';
import Historical from './pages/Historical/Historical';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/historical' element={<Historical/>} />
        <Route path='/recomendations' element={<Recomendations/>} />
      </Routes>
    </Router>
  );
}

export default App;

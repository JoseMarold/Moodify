import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import Recomendations from './Recomendations';
import Historical from './Historical';

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

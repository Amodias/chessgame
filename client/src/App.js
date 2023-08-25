import './styles/App.css';
import Single from './pages/playMode/single';
import Ia from './pages/playMode/ia';
import Multi from './pages/playMode/multi';
import Login from './pages/authentification/Login';
import Register from './pages/authentification/Register';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Logout from './pages/authentification/Logout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
    
          <Route path="/" element={<ProtectedRoute element={Home} />} />
          <Route path="/single-player" element={<ProtectedRoute element={Single} />} />
          <Route path="/multi-player" element={<ProtectedRoute element={Multi} />} />
          <Route path="/vs-ia" element={<ProtectedRoute element={Ia} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

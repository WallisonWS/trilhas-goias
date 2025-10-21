import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TrailCatalog from './pages/TrailCatalog';
import TrailDetailsAdvanced from './pages/TrailDetailsAdvanced';
import TrailMap from './pages/TrailMap';
import Profile from './pages/Profile';
import Forum from './pages/Forum';
import Emergency from './pages/Emergency';
import Explore from './pages/Explore';
import Record from './pages/Record';
import Premium from './pages/Premium';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/trilhas" element={<TrailCatalog />} />
              <Route path="/trilhas/:id" element={<TrailDetailsAdvanced />} />
              <Route path="/trilhas/:id/mapa" element={<TrailMap />} />
              <Route path="/explorar" element={<Explore />} />
              <Route path="/gravar" element={<Record />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/emergencia" element={<Emergency />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
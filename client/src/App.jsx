import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import HomePage from './pages/HomePage';
import FacultyPage from './pages/FacultyPage';
import DepartmentPage from './pages/DepartmentPage';
import './App.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-content">
            <h1 className="nav-title">Faculty Management</h1>
            
            <button 
              className="mobile-menu-btn" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
            
            <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
              <NavLink 
                to="/faculty" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                onClick={closeMobileMenu}
              >
                Faculty
              </NavLink>
              <NavLink 
                to="/department" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                onClick={closeMobileMenu}
              >
                Departments
              </NavLink>
            </div>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/department" element={<DepartmentPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

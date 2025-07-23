import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from './pages/HomePage';
import FacultyPage from './pages/FacultyPage';
import DepartmentPage from './pages/DepartmentPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-content">
            <h1 className="nav-title">Faculty Management</h1>
            <div className="nav-links">
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
              <NavLink to="/faculty" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Faculty</NavLink>
              <NavLink to="/department" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Departments</NavLink>
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

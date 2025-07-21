import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/HomePage';
import FacultyPage from './pages/FacultyPage';
import DepartmentPage from './pages/DepartmentPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/department" element={<DepartmentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

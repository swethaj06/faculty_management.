import { Link } from "react-router-dom";
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Faculty Management System</h1>
      <p className="home-subtitle">
        A centralized platform to efficiently manage faculty and department information.
      </p>
      <div className="home-cta-container">
        <Link to="/faculty" className="btn btn-primary">Manage Faculty</Link>
        <Link to="/department" className="btn btn-edit">Manage Departments</Link>
      </div>
    </div>
  );
}

export default HomePage;

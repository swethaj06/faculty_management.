import { Link } from "react-router-dom";
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1 className="home-title">Faculty Management System</h1>
          <p className="home-subtitle">
            Streamline academic operations with our comprehensive faculty and department management platform
          </p>
        </div>
      </header>

      <main className="home-main">
        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Faculty Management</h3>
              <p>Comprehensive faculty profiles with contact information, departments, and academic details.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Department Organization</h3>
              <p>Organize and manage academic departments with clear structure and reporting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Data Analytics</h3>
              <p>Track faculty distribution and department statistics for informed decision-making.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Get Started Today</h2>
            <p>Choose your management area to begin organizing your academic institution</p>
            <div className="cta-buttons">
              <Link to="/faculty" className="btn btn-primary">
                <span className="btn-icon">👥</span>
                Manage Faculty
              </Link>
              <Link to="/department" className="btn btn-secondary">
                <span className="btn-icon">🏢</span>
                Manage Departments
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;

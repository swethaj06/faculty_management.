import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container">
      {/* Header Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        padding: '20px 0'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#1a202c', 
          marginBottom: '8px',
          letterSpacing: '-0.025em'
        }}>
          Faculty Management System
        </h1>
        <div style={{ 
          width: '60px', 
          height: '4px', 
          background: 'linear-gradient(135deg, #3b82f6, #10b981)', 
          margin: '0 auto',
          borderRadius: '2px'
        }}></div>
      </div>

      {/* Management Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px'
      }}>
        
        {/* Faculty Management Card */}
        <div className="card" style={{ 
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          border: '2px solid transparent'
        }} 
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#3b82f6';
          e.target.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'transparent';
          e.target.style.transform = 'translateY(0)';
        }}>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              color: 'white'
            }}>
              👥
            </div>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1a202c', 
              marginBottom: '8px' 
            }}>
              Faculty Management
            </h3>
            <p style={{ 
              fontSize: '13px', 
              color: '#64748b', 
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              Add, edit, and organize faculty members with detailed profiles
            </p>
            <Link to="/faculty" className="btn btn-primary" style={{ 
              width: '100%',
              fontWeight: '600',
              padding: '12px 24px'
            }}>
              Manage Faculty
            </Link>
          </div>
        </div>

        {/* Department Management Card */}
        <div className="card" style={{ 
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          border: '2px solid transparent'
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#10b981';
          e.target.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'transparent';
          e.target.style.transform = 'translateY(0)';
        }}>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              color: 'white'
            }}>
              🏢
            </div>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1a202c', 
              marginBottom: '8px' 
            }}>
              Department Management
            </h3>
            <p style={{ 
              fontSize: '13px', 
              color: '#64748b', 
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              Create and manage departments with heads and structure
            </p>
            <Link to="/department" className="btn btn-success" style={{ 
              width: '100%',
              fontWeight: '600',
              padding: '12px 24px'
            }}>
              Manage Departments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

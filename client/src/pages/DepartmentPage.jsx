import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: '', hod: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/department");
      setDepartments(response.data);
    } catch (err) {
      setError('Failed to fetch departments');
      console.error("Error fetching departments:", err);
    }
  };

  const resetForm = () => {
    setForm({ name: '', hod: '' });
    setEditingId(null);
    setError('');
    // Clear success message after 3 seconds
    if (success) {
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  // Auto clear success messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Auto clear error messages
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (editingId) {
        // Update existing department
        const response = await axios.put(`http://localhost:5000/api/department/${editingId}`, form);
        setDepartments(departments.map(d => d._id === editingId ? response.data : d));
        setSuccess('Department updated successfully!');
      } else {
        // Add new department
        const response = await axios.post("http://localhost:5000/api/department", form);
        setDepartments([...departments, response.data]);
        setSuccess('Department added successfully!');
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save department');
      console.error("Error saving department:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (department) => {
    setForm({
      name: department.name,
      hod: department.hod
    });
    setEditingId(department._id);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ Are you sure you want to delete this department? This action cannot be undone.')) {
      return;
    }

    try {
      setError('');
      await axios.delete(`http://localhost:5000/api/department/${id}`);
      setDepartments(departments.filter(d => d._id !== id));
      setSuccess('✅ Department deleted successfully!');
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete department');
      console.error("Error deleting department:", err);
    }
  };

  return (
    <div className="container">
      {/* Back Button */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#f8fafc',
          color: '#64748b',
          textDecoration: 'none',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#f1f5f9';
          e.target.style.borderColor = '#cbd5e1';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#f8fafc';
          e.target.style.borderColor = '#e2e8f0';
        }}>
          ← Back to Home
        </Link>
      </div>
      
      <h1 className="page-title">🏢 Department Management</h1>

      <div className="form-container slide-in">
        <h2 className="form-title">
          {editingId ? '✏️ Edit Department' : '➕ Add New Department'}
        </h2>

        {error && (
          <div className="alert alert-error">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">🏢 Department Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter department name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">👤 Head of Department (HOD)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter HOD name"
                value={form.hod}
                onChange={(e) => setForm({ ...form, hod: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="btn-group">
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {editingId ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                editingId ? '✏️ Update Department' : '➕ Add Department'
              )}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm}
                className="btn btn-edit"
              >
                ❌ Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="list-container fade-in">
        <h2 className="list-title">📋 Departments ({departments.length})</h2>
        
        {departments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏢</div>
            <h3>No Departments Found</h3>
            <p>Start by adding your first department using the form above !</p>
          </div>
        ) : (
          <div>
            {departments.map((dept) => (
              <div key={dept._id} className="list-item slide-in">
                <div className="item-header">
                  <div className="item-content">
                    <div className="item-name">🏢 {dept.name}</div>
                    <div className="item-details">
                      <strong>👤 Head of Department:</strong> {dept.hod}
                      {dept.createdAt && (
                        <>
                          <br />
                          <strong>📅 Created:</strong> {new Date(dept.createdAt).toLocaleDateString()}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button 
                      onClick={() => handleEdit(dept)}
                      className="btn btn-edit"
                      title="Edit Department"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(dept._id)}
                      className="btn btn-danger"
                      title="Delete Department"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DepartmentPage;

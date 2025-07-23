import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', department: '', designation: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/faculty");
      setFaculty(response.data);
    } catch (err) {
      setError('Failed to fetch faculty data');
      console.error("Error fetching faculty:", err);
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', department: '', designation: '' });
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
        // Update existing faculty
        const response = await axios.put(`http://localhost:5000/api/faculty/${editingId}`, form);
        setFaculty(faculty.map(f => f._id === editingId ? response.data : f));
        setSuccess('Faculty updated successfully!');
      } else {
        // Add new faculty
        const response = await axios.post("http://localhost:5000/api/faculty", form);
        setFaculty([...faculty, response.data]);
        setSuccess('Faculty added successfully!');
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save faculty');
      console.error("Error saving faculty:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (facultyMember) => {
    setForm({
      name: facultyMember.name,
      email: facultyMember.email,
      department: facultyMember.department,
      designation: facultyMember.designation
    });
    setEditingId(facultyMember._id);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ Are you sure you want to delete this faculty member? This action cannot be undone.')) {
      return;
    }

    try {
      setError('');
      await axios.delete(`http://localhost:5000/api/faculty/${id}`);
      setFaculty(faculty.filter(f => f._id !== id));
      setSuccess('✅ Faculty member deleted successfully!!');
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete faculty member');
      console.error("Error deleting faculty:", err);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">👥 Faculty Management</h1>
      
      <div className="form-container slide-in">
        <h2 className="form-title">
          {editingId ? '✏️ Edit Faculty Member' : '➕ Add New Faculty Member'}
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
              <label className="form-label">👤 Full Name</label>
              <input 
                type="text"
                className="form-input"
                placeholder="Enter full name"
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">📧 Email Address</label>
              <input 
                type="email"
                className="form-input"
                placeholder="Enter email address"
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">🏢 Department</label>
              <input 
                type="text"
                className="form-input"
                placeholder="Enter department"
                value={form.department} 
                onChange={e => setForm({...form, department: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">💼 Designation</label>
              <input 
                type="text"
                className="form-input"
                placeholder="Enter designation"
                value={form.designation} 
                onChange={e => setForm({...form, designation: e.target.value})}
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
                editingId ? '✏️ Update Faculty' : '➕ Add Faculty'
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
        <h2 className="list-title">📋 Faculty Members ({faculty.length})</h2>
        
        {faculty.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>No Faculty Members Found</h3>
            <p>Start by adding your first faculty member using the form above.</p>
          </div>
        ) : (
          <div>
            {faculty.map((f) => (
              <div key={f._id} className="list-item slide-in">
                <div className="item-header">
                  <div className="item-content">
                    <div className="item-name">👤 {f.name}</div>
                    <div className="item-details">
                      <strong>📧 Email:</strong> {f.email}<br />
                      <strong>🏢 Department:</strong> {f.department}<br />
                      <strong>💼 Designation:</strong> {f.designation}
                      {f.createdAt && (
                        <>
                          <br />
                          <strong>📅 Added:</strong> {new Date(f.createdAt).toLocaleDateString()}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button 
                      onClick={() => handleEdit(f)}
                      className="btn btn-edit"
                      title="Edit Faculty Member"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(f._id)}
                      className="btn btn-danger"
                      title="Delete Faculty Member"
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

export default FacultyPage;

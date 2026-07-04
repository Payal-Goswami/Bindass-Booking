import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabase";
import { useAuth } from "../context/AuthContext";
import "../styles/AddResource.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const TYPES = ["ALL", "CORPORATE", "CAMPUS", "LEISURE"];

export default function AddResource() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    type: "ALL",
    capacity: "",
    description: "",
    image: "",
    is_active: true,
  });
  const [resources, setResources] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }
    loadResources();
  }, [user, authLoading]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "is_active" ? value === "true" : value });
  }

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  }

  async function loadResources() {
    const token = await getToken();
    if (!token) return;

    const res = await fetch(`${API_URL}/admin/resources`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setResources(await res.json());
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/admin/resources`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          capacity: Number(form.capacity),
          description: form.description,
          image: form.image,
          is_active: form.is_active,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add resource");
      }

      setForm({ name: "", type: "ALL", capacity: "", description: "", image: "", is_active: true });
      loadResources();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function deactivateResource(id) {
    const token = await getToken();
    await fetch(`${API_URL}/admin/resources/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadResources();
  }

  async function activateResource(id) {
    const token = await getToken();
    await fetch(`${API_URL}/admin/resources/${id}/activate`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadResources();
  }

  if (authLoading) return null;

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Resource Manager</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input name="name" placeholder="Resource name" value={form.name} onChange={handleChange} className="admin-input" required />
        <select name="type" value={form.type} onChange={handleChange} className="admin-input">
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input type="number" name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} className="admin-input" required min="1" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="admin-input" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="admin-input" />
        <select name="is_active" value={form.is_active} onChange={handleChange} className="admin-input">
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        {error && <p style={{ color: "#ef4444", fontSize: "14px" }}>{error}</p>}
        <button className="admin-submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Resource"}
        </button>
      </form>

      <h3 className="admin-section-title">All Resources</h3>
      <div className="admin-grid">
        {resources.map((r) => (
          <div key={r.id} className="admin-card">
            <img
              src={r.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop"}
              alt={r.name}
              className="admin-card-image"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop"; }}
            />
            <div className="admin-card-content">
              <div className="admin-card-header">
                <h4>{r.name}</h4>
                <span className={`status-badge ${r.is_active ? "active" : "inactive"}`}>
                  {r.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="admin-meta">Type: {r.type}</p>
              <p className="admin-meta">Capacity: {r.capacity}</p>
              <p className="admin-description">{r.description}</p>
              {r.is_active ? (
                <button className="admin-deactivate-btn" onClick={() => deactivateResource(r.id)}>
                  Deactivate
                </button>
              ) : (
                <button className="admin-activate-btn" onClick={() => activateResource(r.id)}>
                  Activate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

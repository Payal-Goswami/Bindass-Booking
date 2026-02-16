import { useEffect, useState } from "react";
import { supabase } from "../auth/supabase";
import "../styles/AddResource.css";
const API_URL = import.meta.env.VITE_API_BASE_URL;
const TYPES = ["ALL", "CORPORATE", "CAMPUS", "LEISURE"];

export default function AddResource() {
  const [form, setForm] = useState({
    name: "",
    type: "ALL",
    capacity: "",
    description: "",
    image: "",
    is_active: true,
  });

  const [resources, setResources] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "is_active" ? value === "true" : value,
    });
  }

  async function loadResources() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const res = await fetch(`${API_URL}/admin/resources`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    setResources(await res.json());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    await fetch("http://localhost:8080/admin/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
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

    setForm({
      name: "",
      type: "ALL",
      capacity: "",
      description: "",
      image: "",
      is_active: true,
    });

    loadResources();
  }

  async function deactivateResource(id) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await fetch(`http://localhost:8080/admin/resources/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    loadResources();
  }

  async function activateResource(id) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await fetch(`http://localhost:8080/admin/resources/${id}/activate`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    loadResources();
  }

  useEffect(() => {
    loadResources();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Resource Manager</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="name"
          placeholder="Resource name"
          value={form.name}
          onChange={handleChange}
          className="admin-input"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="admin-input"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          className="admin-input"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="admin-input"
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="admin-input"
        />

        <select
          name="is_active"
          value={form.is_active}
          onChange={handleChange}
          className="admin-input"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button className="admin-submit">Add Resource</button>
      </form>
      <h3 className="admin-section-title">All Resources</h3>
      <div className="admin-grid">
        {resources.map((r) => (
          <div key={r.id} className="admin-card">
            <img
              src={r.image || "https://picsum.photos/400/250"}
              alt={r.name}
              className="admin-card-image"
            />

            <div className="admin-card-content">
              <div className="admin-card-header">
                <h4>{r.name}</h4>

                <span
                  className={
                    r.is_active
                      ? "status-badge active"
                      : "status-badge inactive"
                  }
                >
                  {r.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="admin-meta">Type: {r.type}</p>

              <p className="admin-meta">Capacity: {r.capacity}</p>

              <p className="admin-description">{r.description}</p>

              {r.is_active ? (
                <button
                  className="admin-deactivate-btn"
                  onClick={() => deactivateResource(r.id)}
                >
                  Deactivate
                </button>
              ) : (
                <button
                  className="admin-activate-btn"
                  onClick={() => activateResource(r.id)}
                >
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

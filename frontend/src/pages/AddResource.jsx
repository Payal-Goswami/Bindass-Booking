import { useEffect, useState } from 'react';
import { supabase } from '../auth/supabase';

// useEffect(() => {
//   async function checkAdmin() {
//     const { data } = await supabase.auth.getUser();
//     const role = data.user?.user_metadata?.role;

//     if (role !== 'ADMIN') {
//       alert('Admin only page');
//       window.location.href = '/';
//     }
//   }

//   checkAdmin();
// }, []);

const TYPES = ['ALL', 'CORPORATE', 'CAMPUS', 'LEISURE'];

export default function AddResource() {
  const [form, setForm] = useState({
    name: '',
    type: 'ALL',
    capacity: '',
    description: '',
    image: '',
    is_active: true
  });

  const [resources, setResources] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === 'is_active' ? value === 'true' : value
    });
  }

  async function loadResources() {
    const { data: { session } } = await supabase.auth.getSession();

    const res = await fetch('http://localhost:8080/admin/resources', {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });

    setResources(await res.json());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data: { session } } = await supabase.auth.getSession();

    await fetch('http://localhost:8080/admin/resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        name: form.name,
        type: form.type,
        capacity: Number(form.capacity),
        description: form.description,
        image: form.image,
        is_active: form.is_active
      })
    });

    setForm({
      name: '',
      type: 'ALL',
      capacity: '',
      description: '',
      image: '',
      is_active: true
    });

    loadResources();
  }

  async function deactivateResource(id) {
    const { data: { session } } = await supabase.auth.getSession();

    await fetch(`http://localhost:8080/admin/resources/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });

    loadResources();
  }

  async function activateResource(id) {
  const { data: { session } } = await supabase.auth.getSession();

  await fetch(
    `http://localhost:8080/admin/resources/${id}/activate`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    }
  );

  loadResources();
}


  useEffect(() => {
    loadResources();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Add Resource</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Resource name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange}>
          {TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <select name="is_active" value={form.is_active} onChange={handleChange}>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button type="submit">Add Resource</button>
      </form>

      <hr />

      <h3>All Resources</h3>

      {resources.map(r => (
        <div key={r.id} style={{ marginBottom: 20 }}>
          <b>{r.name}</b> ({r.type}) — capacity {r.capacity}
          <p>{r.description}</p>

          {r.image && (
            <img
              src={r.image}
              alt={r.name}
              style={{ width: 200, display: 'block', marginTop: 5 }}
            />
          )}

          {r.is_active ? (
            <button
              onClick={() => deactivateResource(r.id)}
              style={{ background: 'red', color: 'white' }}
            >
              Deactivate
            </button>
          ) : (
            <button
              onClick={() => activateResource(r.id)}
              style={{ background: 'green', color: 'white' }}
            >
              Activate
            </button>
          )}

        </div>
      ))}
    </div>
  );
}
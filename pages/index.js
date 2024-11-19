import { useState } from 'react';
import '../styles/global.css'; // Import global styles

export default function PatientTracker() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 30, condition: 'Hypertension' },
    { id: 2, name: 'Jane Smith', age: 25, condition: 'Diabetes' },
  ]);
  const [form, setForm] = useState({ name: '', age: '', condition: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === editingId ? { id: editingId, ...form } : p
        )
      );
      setEditingId(null);
    } else {
      setPatients((prev) => [
        ...prev,
        { id: Date.now(), name: form.name, age: Number(form.age), condition: form.condition },
      ]);
    }
    setForm({ name: '', age: '', condition: '' });
  };

  const handleEdit = (patient) => {
    setForm({ name: patient.name, age: patient.age, condition: patient.condition });
    setEditingId(patient.id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Patient Tracking Tool</h1>
      <p>Manage your patient records efficiently.</p>
      <h2>Patient List</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id} style={{ marginBottom: '10px', background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
            {patient.name} (Age: {patient.age}, Condition: {patient.condition})
            <button
              onClick={() => handleEdit(patient)}
              style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      <h2>{editingId ? 'Edit Patient' : 'Add New Patient'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Condition"
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
          {editingId ? 'Update Patient' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
}

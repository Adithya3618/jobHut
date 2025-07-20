import { useState, useEffect } from 'react';

function maskKey(key) {
  if (!key) return '';
  return key.length > 6 ? key.slice(0, 3) + '...' + key.slice(-3) : '***';
}

export default function AdminApiConfig() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editApi, setEditApi] = useState(null);
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addApi, setAddApi] = useState({ id: '', name: '', host: '', endpoint: '', key: '', enabled: true });
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchApis();
  }, []);

  async function fetchApis() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-api-configs');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch APIs');
      setApis(data.apis || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch APIs');
    } finally {
      setLoading(false);
    }
  }

  function startEdit(idx) {
    setEditIdx(idx);
    setEditApi({ ...apis[idx] });
  }
  function cancelEdit() {
    setEditIdx(null);
    setEditApi(null);
  }
  async function saveEdit() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin-api-configs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editApi)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save API config');
      setEditIdx(null);
      setEditApi(null);
      fetchApis();
    } catch (err) {
      alert(err.message || 'Failed to save API config');
    } finally {
      setSaving(false);
    }
  }
  async function saveAdd() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin-api-configs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addApi)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add API config');
      setAdding(false);
      setAddApi({ id: '', name: '', host: '', endpoint: '', key: '', enabled: true });
      fetchApis();
    } catch (err) {
      alert(err.message || 'Failed to add API config');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this API config?')) return;
    setDeletingId(id);
    try {
      const res = await fetch('/api/admin-api-configs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete API config');
      fetchApis();
    } catch (err) {
      alert(err.message || 'Failed to delete API config');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Manage External API Configs</h2>
      {loading ? <div>Loading...</div> : error ? <div className="text-red-500">{error}</div> : (
        <table className="min-w-full border rounded mb-6">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Host</th>
              <th className="border px-2 py-1">Endpoint</th>
              <th className="border px-2 py-1">Key</th>
              <th className="border px-2 py-1">Enabled</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apis.map((api, idx) => (
              <tr key={api.id} className={editIdx === idx ? 'bg-yellow-50' : ''}>
                <td className="border px-2 py-1 text-xs">{api.id}</td>
                <td className="border px-2 py-1">
                  {editIdx === idx ? (
                    <input className="border rounded px-1 py-0.5 w-32" value={editApi.name} onChange={e => setEditApi(a => ({ ...a, name: e.target.value }))} />
                  ) : api.name}
                </td>
                <td className="border px-2 py-1">
                  {editIdx === idx ? (
                    <input className="border rounded px-1 py-0.5 w-40" value={editApi.host} onChange={e => setEditApi(a => ({ ...a, host: e.target.value }))} />
                  ) : api.host}
                </td>
                <td className="border px-2 py-1">
                  {editIdx === idx ? (
                    <input className="border rounded px-1 py-0.5 w-56" value={editApi.endpoint} onChange={e => setEditApi(a => ({ ...a, endpoint: e.target.value }))} />
                  ) : api.endpoint}
                </td>
                <td className="border px-2 py-1">
                  {editIdx === idx ? (
                    <input className="border rounded px-1 py-0.5 w-40" value={editApi.key} onChange={e => setEditApi(a => ({ ...a, key: e.target.value }))} />
                  ) : <span title={api.key}>{maskKey(api.key)}</span>}
                </td>
                <td className="border px-2 py-1 text-center">
                  {editIdx === idx ? (
                    <input type="checkbox" checked={editApi.enabled} onChange={e => setEditApi(a => ({ ...a, enabled: e.target.checked }))} />
                  ) : (
                    <input type="checkbox" checked={api.enabled} disabled />
                  )}
                </td>
                <td className="border px-2 py-1">
                  {editIdx === idx ? (
                    <>
                      <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={saveEdit} disabled={saving}>Save</button>
                      <button className="bg-gray-300 px-2 py-1 rounded" onClick={cancelEdit} disabled={saving}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={() => startEdit(idx)}>Edit</button>
                      <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(api.id)} disabled={deletingId === api.id}>{deletingId === api.id ? 'Deleting...' : 'Delete'}</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {adding && (
              <tr className="bg-green-50">
                <td className="border px-2 py-1 text-xs"><input className="border rounded px-1 py-0.5 w-20" value={addApi.id} onChange={e => setAddApi(a => ({ ...a, id: e.target.value }))} /></td>
                <td className="border px-2 py-1"><input className="border rounded px-1 py-0.5 w-32" value={addApi.name} onChange={e => setAddApi(a => ({ ...a, name: e.target.value }))} /></td>
                <td className="border px-2 py-1"><input className="border rounded px-1 py-0.5 w-40" value={addApi.host} onChange={e => setAddApi(a => ({ ...a, host: e.target.value }))} /></td>
                <td className="border px-2 py-1"><input className="border rounded px-1 py-0.5 w-56" value={addApi.endpoint} onChange={e => setAddApi(a => ({ ...a, endpoint: e.target.value }))} /></td>
                <td className="border px-2 py-1"><input className="border rounded px-1 py-0.5 w-40" value={addApi.key} onChange={e => setAddApi(a => ({ ...a, key: e.target.value }))} /></td>
                <td className="border px-2 py-1 text-center"><input type="checkbox" checked={addApi.enabled} onChange={e => setAddApi(a => ({ ...a, enabled: e.target.checked }))} /></td>
                <td className="border px-2 py-1">
                  <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={saveAdd} disabled={saving}>Add</button>
                  <button className="bg-gray-300 px-2 py-1 rounded" onClick={() => { setAdding(false); setAddApi({ id: '', name: '', host: '', endpoint: '', key: '', enabled: true }); }} disabled={saving}>Cancel</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setAdding(true)} disabled={adding}>Add New API</button>
    </div>
  );
} 
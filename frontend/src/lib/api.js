const BASE = import.meta.env.VITE_API_BASE || ''

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data.error || data.detail || Object.values(data)[0] || `Request failed (${res.status})`
    throw new Error(Array.isArray(msg) ? msg[0] : msg)
  }
  return data
}

export const submitLead = (body) =>
  request('/api/leads/', { method: 'POST', body: JSON.stringify(body) })

export const adminLogin = (username, password) =>
  request('/api/admin-portal/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })

export const getLeads = (token) =>
  request('/api/admin-portal/leads/', {
    headers: { Authorization: `Bearer ${token}` },
  })

export const markLeadRead = (id, token) =>
  request(`/api/admin-portal/leads/${id}/`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  })

export const deleteLead = (id, token) =>
  request(`/api/admin-portal/leads/${id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })

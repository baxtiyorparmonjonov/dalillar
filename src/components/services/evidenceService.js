import { API_URL } from './api';

const EVIDENCE_API_URL = `${API_URL}/evidences`;

const getHeaders = () => {
  const token = localStorage.getItem('vada_token');
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${EVIDENCE_API_URL}${path}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });
  const responseText = await response.text();
  let data = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      if (response.ok) {
        throw new Error('Server yaroqsiz JSON javob qaytardi.');
      }
      data = { message: responseText };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error || `So'rov bajarilmadi (${response.status}).`);
  }

  return data;
};

export const evidenceService = {
  getAll: () => request(''),

  getById: (id) => request(`/${encodeURIComponent(id)}`),

  create: (newEvidence) => request('', {
    method: 'POST',
    body: JSON.stringify(newEvidence),
  }),

  toggleArchive: (id) => request(`/${encodeURIComponent(id)}/archive`, {
    method: 'PUT',
  }),

  delete: (id) => request(`/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  }),

  autoScan: () => request('/autoscan', {
    method: 'POST',
  }),

  addComment: (id, commentData) => request(`/${encodeURIComponent(id)}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentData),
  }),
};

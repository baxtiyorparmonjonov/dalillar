import { API_URL } from './api';

const AUTH_API_URL = `${API_URL}/auth`;

const request = async (path, body) => {
  const response = await fetch(`${AUTH_API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
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

const saveUser = (data) => {
  localStorage.setItem('vada_token', data.token);
  localStorage.setItem('vada_current_user', JSON.stringify(data));
  return data;
};

export const authService = {
  register: async (userData) => {
    return saveUser(await request('/register', userData));
  },

  login: async (email, password) => {
    return saveUser(await request('/login', { email, password }));
  },

  logout: () => {
    localStorage.removeItem('vada_token');
    localStorage.removeItem('vada_current_user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('vada_current_user');
    return user ? JSON.parse(user) : null;
  }
};
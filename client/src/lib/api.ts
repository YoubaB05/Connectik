export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  
  post: async (endpoint: string, data?: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  
  // Add other methods as needed
};
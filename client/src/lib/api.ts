const API_URL = import.meta.env.VITE_API_URL || '';

function buildApiUrl(path: string): string {
  if (!API_URL) return path; // use Netlify redirect to backend
  const base = API_URL.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

export async function loginAdmin(email: string, password: string) {
  try {
    const response = await fetch(buildApiUrl('/api/admin/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
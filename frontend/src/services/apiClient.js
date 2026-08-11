import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', withCredentials: true });
api.interceptors.request.use((config) => { const token = JSON.parse(localStorage.getItem('signix.session') || 'null')?.accessToken; if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
api.interceptors.response.use((response) => response.data.data, (error) => Promise.reject(new Error(error.response?.data?.error?.message || 'Unable to connect to Signix.')));
export default api;

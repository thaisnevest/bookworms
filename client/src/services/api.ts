import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookworms-zfhb.onrender.com'
});

export default api;

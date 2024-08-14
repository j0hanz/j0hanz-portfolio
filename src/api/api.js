import axios from 'axios';

const api = axios.create({
  baseURL: 'https://j0hanz-cv-contact-api-423a30b028e9.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

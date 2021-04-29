import axios from "axios";

 
const api = axios.create({
  baseURL: 'https://606eeab20c054f0017657edc.mockapi.io',
  https:true
});

export default api;
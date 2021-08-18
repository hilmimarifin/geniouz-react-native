/* eslint-disable prettier/prettier */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://geniouz-strapi.herokuapp.com',
});

// api.interceptors.request.use(
//   config => {
//     const configuration = {...config};
//     const {params} = configuration;

//     configuration.params = {
//       ...params,
//       language: 'en-US',
//     };

//     return configuration;
//   },
//   e => Promise.reject(e),
// );

export default api;

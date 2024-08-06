import axios from 'axios';
import {ENV} from 'constants/envs';

export const axiosOrigin = axios.create({
  baseURL: ENV.API_URL,
});

axiosOrigin.interceptors.response.use(
  res => res,
  error => {
    throw error.response;
  },
);

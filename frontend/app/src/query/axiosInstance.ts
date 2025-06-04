import axios from 'axios';
import { API_URL } from '../data/consts';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

export default axiosInstance;

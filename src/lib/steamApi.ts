// import { getAllCookie } from '@/lib/cookies';
import axios from 'axios';

const steamApi = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

steamApi.interceptors.request.use(
    async function (config) {
        // const cookie = await getAllCookie();
        // steamApi.defaults.headers.Cookie = cookie;
        // config.headers.Cookie = cookie;
        return config;
    },
    async function (error) {
        return Promise.reject(error);
    },
);

steamApi.interceptors.response.use(
    async function (response) {
        return response;
    },
    async function (error) {
        return Promise.reject(error);
    },
);

export default steamApi;

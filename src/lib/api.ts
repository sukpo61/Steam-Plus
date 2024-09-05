import { getCookie } from '@/lib/cookies';
import axios from 'axios';

const isServer = typeof window === 'undefined';
const baseURL = isServer ? process.env.API_BASE_URL : '';
let refreshToken = '';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    async function (config) {
        let accessToken = api.defaults.headers.common['Authorization'];
        refreshToken = (await getCookie('refreshToken')) || '';

        if (!refreshToken) {
            return config;
        }

        if (!accessToken) {
            try {
                const response = await axios.get(`${baseURL}/api/auth/renew-token`, {
                    headers: {
                        Cookie: `refreshToken=${refreshToken}`,
                    },
                });
                accessToken = response.headers['authorization'];
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            } catch (error: any) {
                if (error.response?.status === 403) {
                    return config;
                }
                if (error.response?.status === 401) {
                    if (!isServer) {
                        window.location.href = '/signin';
                    }
                }
                return Promise.reject(error);
            }
        }
        return config;
    },
    async function (error) {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    async function (response) {
        return response;
    },
    async function (error) {
        if (error.response && error.response.status === 401) {
            try {
                const response = await axios.get(`${baseURL}/api/auth/renew-token`, {
                    headers: {
                        Cookie: `refreshToken=${refreshToken}`,
                    },
                });
                const accessToken = response.headers['authorization'];
                api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

                const config = {
                    ...error.config,
                    headers: {
                        ...error.config.headers,
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                return api.request(config);
            } catch (refreshError) {
                if (!isServer) {
                    window.location.href = '/signin';
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export default api;

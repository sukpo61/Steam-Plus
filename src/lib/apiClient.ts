import { createCookie, getAllCookie, getCookie } from '@/lib/cookies';

import axios from 'axios';

// const isServer = typeof window === 'undefined';
// const baseURL = isServer ? process.env.API_BASE_URL : '';
const baseURL = process.env.API_BASE_URL;

const api = axios.create({
    baseURL,
    headers: {
        // 'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let accessToken = '';
let refreshToken = '';

api.interceptors.request.use(
    async function (config) {
        refreshToken = (await getCookie('refreshToken')) || '';

        if (!refreshToken) {
            return config;
        }

        if (accessToken) {
            return config;
        }

        try {
            const response = await axios.get(`${baseURL}/api/auth/renew-token`, {
                headers: {
                    Cookie: `refreshToken=${refreshToken}`,
                },
            });
            accessToken = response.headers['authorization'];
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        } catch (error: any) {
            if (error.response?.status === 403) {
                return config;
            }
            if (error.response?.status === 401) {
                window.location.href = '/auth/signin';
            }
            return Promise.reject(error);
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
                window.location.href = '/auth/signin';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export default api;

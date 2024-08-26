import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    async function (config) {
        let accessToken = api.defaults.headers.common['Authorization'];
        if (!accessToken) {
            try {
                const response = await axios.get('/api/auth/renew-token');
                accessToken = response.headers['authorization'];
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            } catch (error: any) {
                if (error.response.status === 402) {
                    return config;
                }
                if (error.response.status === 401) {
                    alert('토큰 갱신에 실패했습니다. 로그인 페이지로 이동합니다.');
                    window.location.href = '/signin';
                    return Promise.reject(error);
                }
                return Promise.reject(error);
            }
        }
        return config;
    },
    function (error) {
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
                const response = await axios.get('/api/auth/renew-token');
                const accessToken = response.headers['authorization'];
                api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                return api.request(error.config);
            } catch (refreshError) {
                alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
                window.location.href = '/signin';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export default api;

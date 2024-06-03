import axios from 'axios';

const steamRequest = axios.create({
    baseURL: 'https://store.steampowered.com',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default steamRequest;

import axios from '@/lib/api';

interface GetUserInfoParameter {}

export const API_GET_USER_INFO_KEY = '/api/user';

const getUserInfo = async () => {
    const { data } = await axios.get(API_GET_USER_INFO_KEY);
    return data;
};

export default getUserInfo;

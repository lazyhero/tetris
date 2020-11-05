import axios from 'axios';

const axiosAgent = axios.create({
    baseURL: '/',
    withCredentials: true,
});

axiosAgent.interceptors.response.use((res) => {
    const data = res.data;
    if (data.code === 1) {
        return data;
    }
    throw data;
});

export default axiosAgent;
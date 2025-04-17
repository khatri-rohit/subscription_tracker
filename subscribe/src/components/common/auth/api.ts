import axios from 'axios';

const API_URL = 'http://localhost:5500';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const checkAuthStatus = async () => {
    try {
        const response = await api.get('/auth/user');
        return response.data;
    } catch (error) {
        console.error('Error checking auth status:', error);
        return { success: false };
    }
};

export const logoutUser = async () => {
    try {
        await api.get('/auth/logout');
        window.location.href = '/';
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
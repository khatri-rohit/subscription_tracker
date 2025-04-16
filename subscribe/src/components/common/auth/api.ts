import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_IMAGE_URL}/api/v1/auth/`
});

export const googleAuth = async (code: string) => {
    try {
        axios.defaults.withCredentials = true;
        const result = await api.post(`/google?code=${code}`)
        return result;
    } catch (error) {
        console.log(error);
    }
}
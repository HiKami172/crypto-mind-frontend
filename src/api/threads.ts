import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Adjust to your FastAPI base URL

export const signIn = async (email: string, password: string, keepLoggedIn: boolean) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, {
            email,
            password,
            keep_logged_in: keepLoggedIn,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const startThread = async (message: string) => {
    await axios.post(
        `/threads`, {
            text: message,
            role: 'user' }
    );

}
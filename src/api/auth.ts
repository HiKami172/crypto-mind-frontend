import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const signIn = async (email: string, password: string, keepLoggedIn: boolean) => {
    try {
        const response = await axios.post(`${API_URL}/signin/`, {
            email,
            password,
            keep_logged_in: keepLoggedIn,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signUp = async (name: string, email: string, password: string) => {
    const password2 = password;
    try {
        const response = await axios.post(`${API_URL}/signup/`, {
            name,
            email,
            password,
            password2,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

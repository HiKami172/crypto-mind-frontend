import apiClient from './axiosInstance';

export const fetchThreads = async (page = 1, perPage = 10) => {
    const response = await apiClient.get('/threads');
    return response.data;
};

export const createThread = async (data: { title: string; first_message: string }) => {
    const response = await apiClient.post('/threads', data);
    return response.data;
};

export const fetchThreadMessages = async (threadId: string) => {
    const response = await apiClient.get(`/threads/${threadId}/messages`);
    return response.data;
};

export const sendMessageToThread = async (threadId: string, message: string) => {
    const response = await apiClient.post(`/threads/${threadId}/messages`, {message});
    return response.data;
};

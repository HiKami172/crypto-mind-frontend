import API from './axiosInstance';

export const fetchAccountData = async () => {
    try {
        const response = await API.get(`/binance/account`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchPortfolioData = async() => {
    try {
        const response = await API.get(`/binance/portfolio/card-data`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
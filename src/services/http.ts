import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const http: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

http.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');

	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

http.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('token');
			window.location.href = '/';
		}

		return Promise.reject(error);
	},
);

export type RequestConfig = AxiosRequestConfig;
export type Response<T> = AxiosResponse<T>;

export default http;

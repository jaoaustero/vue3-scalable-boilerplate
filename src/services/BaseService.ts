import http from './http';
import type { RequestConfig, Response } from './http';

export class BaseService {
	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	async getAll<T>(config?: RequestConfig): Promise<Response<T>> {
		return http.get<T>(this.endpoint, config);
	}

	async getById<T>(id: string | number, config?: RequestConfig): Promise<Response<T>> {
		return http.get<T>(`${this.endpoint}/${id}`, config);
	}

	async create<T, D = Record<string, unknown>>(data: D, config?: RequestConfig): Promise<Response<T>> {
		return http.post<T>(this.endpoint, data, config);
	}

	async update<T, D = Record<string, unknown>>(id: string | number, data: D, config?: RequestConfig): Promise<Response<T>> {
		return http.put<T>(`${this.endpoint}/${id}`, data, config);
	}

	async delete<T>(id: string | number, config?: RequestConfig): Promise<Response<T>> {
		return http.delete<T>(`${this.endpoint}/${id}`, config);
	}
}

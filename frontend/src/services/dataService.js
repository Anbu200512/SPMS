import api from './api';

export const getAll = (resource, params = {}) => api.get(`/${resource}`, { params });

export const getById = (resource, id) => api.get(`/${resource}/${id}`);

export const create = (resource, data) => api.post(`/${resource}`, data);

export const update = (resource, id, data) => api.put(`/${resource}/${id}`, data);

export const remove = (resource, id) => api.delete(`/${resource}/${id}`);

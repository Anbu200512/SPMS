import api from './api';

export const getAll = (resource, params = {}) => api.get(`/${resource}`, { params });

export const getById = (resource, id) => api.get(`/${resource}/${id}`);

export const create = (resource, data) => api.post(`/${resource}`, data);

export const update = (resource, id, data) => api.put(`/${resource}/${id}`, data);

export const remove = (resource, id) => api.delete(`/${resource}/${id}`);

export const createNotification = (data) => api.post('/notifications', data);
export const getSentNotifications = (params) => api.get('/notifications/all', { params });
export const getNotifications = (params) => api.get('/notifications', { params });
export const markNotificationRead = (id) => api.put(`/notifications/${id}/read`);

export const getSettings = () => api.get('/settings');
export const updateSetting = (key, value, description) => api.put(`/settings/${key}`, { value, description });

export const getAllPayments = (params) => api.get('/fees/payments', { params });
export const recordFeePayment = (feeId, data) => api.post(`/fees/${feeId}/pay`, data);

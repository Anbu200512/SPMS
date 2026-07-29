import api from './api';

export const getStudentDashboard = () => api.get('/dashboard/student');
export const getStudentProfile = () => api.get('/auth/me');
export const getStudentAttendance = (studentId, params) => api.get(`/attendance/student/${studentId}`, { params });
export const getAssignments = (params) => api.get('/assignments', { params });
export const getHomework = (params) => api.get('/homework', { params });
export const getTimetable = (params) => api.get('/timetable', { params });
export const getExamSchedule = (params) => api.get('/exams', { params });
export const getResults = (params) => api.get('/results', { params });
export const getFees = (params) => api.get('/fees', { params });
export const getNotifications = (params) => api.get('/notifications', { params });
export const markNotificationRead = (id) => api.put(`/notifications/${id}/read`);
export const createLeave = (data) => api.post('/leaves', data);
export const getLeaves = (params) => api.get('/leaves', { params });
export const cancelLeave = (id) => api.delete(`/leaves/${id}`);
export const getStudyMaterials = (params) => api.get('/materials', { params });
export const getEvents = () => api.get('/events');

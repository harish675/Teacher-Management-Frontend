import api from './api';

export const getAllTeachers = async () => {
    const response = await api.get('/teachers');
    return response.data;
};

export const getTeacherById = async (teacherId) => {
    const response = await api.get(`/teachers/${teacherId}`);
    return response.data;
};

export const createTeacher = async (teacherData) => {
    const response = await api.post('/teachers', teacherData);
    return response.data;
};

export const updateTeacher = async (teacherId, teacherData) => {
    const response = await api.put(`/teachers/${teacherId}`, teacherData);
    return response.data;
};

export const deleteTeacher = async (teacherId) => {
    const response = await api.delete(`/teachers/${teacherId}`);
    return response.data;
};

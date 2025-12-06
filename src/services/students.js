import api from './api';

export const getAllStudents = async () => {
    const response = await api.get('/students');
    return response.data;
};

export const getStudentById = async (studentId) => {
    const response = await api.get(`/students/${studentId}`);
    return response.data;
};

export const createStudent = async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
};

export const updateStudent = async (studentId, studentData) => {
    const response = await api.put(`/students/${studentId}`, studentData);
    return response.data;
};

export const deleteStudent = async (studentId) => {
    const response = await api.delete(`/students/${studentId}`);
    return response.data;
};

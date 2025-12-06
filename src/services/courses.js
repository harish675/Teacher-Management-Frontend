import api from './api';

export const getAllCourses = async () => {
    const response = await api.get('/courses');
    return response.data;
};

export const getCourseById = async (courseId, includeDetails = false) => {
    const response = await api.get(`/courses/${courseId}`, {
        params: { include_details: includeDetails }
    });
    return response.data;
};

export const createCourse = async (courseData) => {
    const response = await api.post('/courses', courseData);
    return response.data;
};

export const updateCourse = async (courseId, courseData) => {
    const response = await api.put(`/courses/${courseId}`, courseData);
    return response.data;
};

export const deleteCourse = async (courseId) => {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
};

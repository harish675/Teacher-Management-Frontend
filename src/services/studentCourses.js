import api from './api';

export const enrollStudentInCourses = async (studentId, courseIds) => {
    const response = await api.post('/student-course/enroll', {
        student_id: studentId,
        course_ids: courseIds
    });
    return response.data;
};

export const getStudentsByCourse = async (courseId) => {
    const response = await api.get(`/student-course/${courseId}`);
    return response.data;
};

export const getCoursesByStudent = async (studentId) => {
    const response = await api.get(`/student-course/student/${studentId}`);
    return response.data;
};

export const getAllEnrollments = async () => {
    const response = await api.get('/student-course/enrollments/all');
    return response.data;
};

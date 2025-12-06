import api from './api';

export const assignTeacherToCourses = async (teacherId, courseIds) => {
    const response = await api.post('/teacher-course/assign', {
        teacher_id: teacherId,
        course_ids: courseIds
    });
    return response.data;
};

export const getCoursesByTeacher = async (teacherId) => {
    const response = await api.get(`/teacher-course/${teacherId}`);
    return response.data;
};

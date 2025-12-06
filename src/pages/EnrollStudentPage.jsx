import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Chip,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Stack,
    Divider,
    Alert,
    LinearProgress,
} from '@mui/material';
import { PersonAdd, CheckCircle, School, Person as PersonIcon, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { getAllStudents } from '../services/students';
import { getAllCourses } from '../services/courses';
import { enrollStudentInCourses } from '../services/studentCourses';
import PageHeader from '../components/layout/PageHeader';
import { CardSkeleton } from '../components/common/LoadingSkeleton';
import { pageTransition } from '../theme/animations';

function EnrollStudentPage() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [studentsData, coursesData] = await Promise.all([
                getAllStudents(),
                getAllCourses()
            ]);
            setStudents(studentsData);
            setCourses(coursesData);
        } catch (err) {
            enqueueSnackbar('Failed to fetch data: ' + err.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedStudent) {
            enqueueSnackbar('Please select a student', { variant: 'warning' });
            return;
        }

        if (selectedCourses.length === 0) {
            enqueueSnackbar('Please select at least one course', { variant: 'warning' });
            return;
        }

        try {
            await enrollStudentInCourses(selectedStudent, selectedCourses);
            const studentName = students.find(s => s._id === selectedStudent)?.name;
            enqueueSnackbar(`Successfully enrolled ${studentName} in ${selectedCourses.length} course(s)!`, { variant: 'success' });
            setSelectedStudent('');
            setSelectedCourses([]);
            fetchData();
        } catch (err) {
            enqueueSnackbar('Failed to enroll student: ' + (err.response?.data?.detail || err.message), { variant: 'error' });
        }
    };

    const selectedStudentData = students.find(s => s._id === selectedStudent);
    const selectedCoursesData = courses.filter(c => selectedCourses.includes(c._id));

    if (loading) {
        return (
            <Box>
                <LinearProgress />
                <CardSkeleton count={2} />
            </Box>
        );
    }

    return (
        <motion.div {...pageTransition}>
            <PageHeader
                title="Enroll Student in Courses"
                subtitle="Select a student and enroll them in one or more courses"
                icon={<PersonAdd />}
            />

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Left Column - Student Selection */}
                    <Grid item xs={12} lg={3.5}>
                        <Card sx={{ height: '100%', position: 'sticky', top: 80 }}>
                            <CardContent>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PersonIcon color="success" />
                                            Select Student
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Choose the student you want to enroll in courses
                                        </Typography>
                                    </Box>

                                    <FormControl fullWidth>
                                        <InputLabel>Student</InputLabel>
                                        <Select
                                            value={selectedStudent}
                                            onChange={(e) => setSelectedStudent(e.target.value)}
                                            label="Student"
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Choose a student</em>
                                            </MenuItem>
                                            {students.map((student) => (
                                                <MenuItem key={student._id} value={student._id}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                                                            {student.name.charAt(0)}
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant="body1">{student.name}</Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {student.email}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {selectedStudentData && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Selected Student
                                                    </Typography>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <Avatar sx={{ bgcolor: 'success.dark', width: 40, height: 40 }}>
                                                            {selectedStudentData.name.charAt(0)}
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight={600}>
                                                                {selectedStudentData.name}
                                                            </Typography>
                                                            <Typography variant="caption">
                                                                {selectedStudentData.email}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                    {selectedStudentData.age && (
                                                        <Chip
                                                            label={`${selectedStudentData.age} years old`}
                                                            size="small"
                                                            sx={{ bgcolor: 'success.dark', color: 'white' }}
                                                        />
                                                    )}
                                                </Stack>
                                            </Paper>
                                        </motion.div>
                                    )}

                                    <Divider />

                                    <Alert severity="info" icon={<PersonAdd />}>
                                        <Typography variant="caption">
                                            Students: {students.length} | Courses: {courses.length}
                                        </Typography>
                                    </Alert>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Middle Column - Course Selection */}
                    <Grid item xs={12} lg={5.5}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <School color="success" />
                                            Select Courses
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Choose one or more courses for enrollment
                                        </Typography>
                                    </Box>

                                    <FormControl fullWidth>
                                        <InputLabel>Courses</InputLabel>
                                        <Select
                                            multiple
                                            value={selectedCourses}
                                            onChange={(e) => setSelectedCourses(e.target.value)}
                                            input={<OutlinedInput label="Courses" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => {
                                                        const course = courses.find(c => c._id === value);
                                                        return (
                                                            <Chip
                                                                key={value}
                                                                label={course?.course_name}
                                                                size="small"
                                                                color="success"
                                                                onDelete={() => setSelectedCourses(selectedCourses.filter(id => id !== value))}
                                                            />
                                                        );
                                                    })}
                                                </Box>
                                            )}
                                            required
                                        >
                                            {courses.map((course) => (
                                                <MenuItem key={course._id} value={course._id}>
                                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                                                        <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                                                            <School fontSize="small" />
                                                        </Avatar>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="body2">{course.course_name}</Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {course.enrolled_student_ids?.length || 0} students enrolled
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                            Selected: {selectedCourses.length} course(s)
                                        </Typography>
                                    </FormControl>

                                    {courses.length === 0 && (
                                        <Alert severity="warning">
                                            No courses available. Please add courses first.
                                        </Alert>
                                    )}

                                    {students.length === 0 && (
                                        <Alert severity="warning">
                                            No students available. Please add students first.
                                        </Alert>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column - Summary & Submit */}
                    <Grid item xs={12} lg={3}>
                        <Card sx={{ height: '100%', position: 'sticky', top: 80 }}>
                            <CardContent>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            Enrollment Summary
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                            Student
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {selectedStudentData?.name || 'Not selected'}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                            Courses to Enroll
                                        </Typography>
                                        <Typography variant="h4" color="success.main" fontWeight={700}>
                                            {selectedCourses.length}
                                        </Typography>
                                    </Box>

                                    {selectedCoursesData.length > 0 && (
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                                Selected Courses
                                            </Typography>
                                            <Stack spacing={1} sx={{ maxHeight: 200, overflowY: 'auto' }}>
                                                {selectedCoursesData.map((course) => (
                                                    <Chip
                                                        key={course._id}
                                                        label={course.course_name}
                                                        size="small"
                                                        color="success"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Stack>
                                        </Box>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="success"
                                        size="large"
                                        fullWidth
                                        startIcon={<CheckCircle />}
                                        endIcon={<ArrowForward />}
                                        disabled={!selectedStudent || selectedCourses.length === 0}
                                        sx={{
                                            borderRadius: 2,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Enroll Student
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    );
}

export default EnrollStudentPage;

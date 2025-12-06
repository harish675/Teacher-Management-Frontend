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
import { Assignment, CheckCircle, School, Person as PersonIcon, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { getAllTeachers } from '../services/teachers';
import { getAllCourses } from '../services/courses';
import { assignTeacherToCourses } from '../services/teacherCourses';
import PageHeader from '../components/layout/PageHeader';
import { CardSkeleton } from '../components/common/LoadingSkeleton';
import { pageTransition } from '../theme/animations';

function AssignTeacherPage() {
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [teachersData, coursesData] = await Promise.all([
                getAllTeachers(),
                getAllCourses()
            ]);
            setTeachers(teachersData);
            setCourses(coursesData);
        } catch (err) {
            enqueueSnackbar('Failed to fetch data: ' + err.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTeacher) {
            enqueueSnackbar('Please select a teacher', { variant: 'warning' });
            return;
        }

        if (selectedCourses.length === 0) {
            enqueueSnackbar('Please select at least one course', { variant: 'warning' });
            return;
        }

        try {
            await assignTeacherToCourses(selectedTeacher, selectedCourses);
            const teacherName = teachers.find(t => t._id === selectedTeacher)?.name;
            enqueueSnackbar(`Successfully assigned ${selectedCourses.length} course(s) to ${teacherName}!`, { variant: 'success' });
            setSelectedTeacher('');
            setSelectedCourses([]);
            fetchData();
        } catch (err) {
            enqueueSnackbar('Failed to assign courses: ' + (err.response?.data?.detail || err.message), { variant: 'error' });
        }
    };

    const selectedTeacherData = teachers.find(t => t._id === selectedTeacher);
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
                title="Assign Teacher to Courses"
                subtitle="Select a teacher and assign them to one or more courses"
                icon={<Assignment />}
            />

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Left Column - Teacher Selection */}
                    <Grid item xs={12} lg={3.5}>
                        <Card sx={{ height: '100%', position: 'sticky', top: 80 }}>
                            <CardContent>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PersonIcon color="primary" />
                                            Select Teacher
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Choose the teacher you want to assign courses to
                                        </Typography>
                                    </Box>

                                    <FormControl fullWidth>
                                        <InputLabel>Teacher</InputLabel>
                                        <Select
                                            value={selectedTeacher}
                                            onChange={(e) => setSelectedTeacher(e.target.value)}
                                            label="Teacher"
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Choose a teacher</em>
                                            </MenuItem>
                                            {teachers.map((teacher) => (
                                                <MenuItem key={teacher._id} value={teacher._id}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                                                            {teacher.name.charAt(0)}
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant="body1">{teacher.name}</Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {teacher.email}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {selectedTeacherData && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle2" fontWeight={600}>
                                                        Selected Teacher
                                                    </Typography>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <Avatar sx={{ bgcolor: 'primary.dark', width: 40, height: 40 }}>
                                                            {selectedTeacherData.name.charAt(0)}
                                                        </Avatar>
                                                        <Box>
                                                            <Typography variant="body1" fontWeight={600}>
                                                                {selectedTeacherData.name}
                                                            </Typography>
                                                            <Typography variant="caption">
                                                                {selectedTeacherData.email}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                    {selectedTeacherData.subject_expertise && (
                                                        <Chip
                                                            label={selectedTeacherData.subject_expertise}
                                                            size="small"
                                                            sx={{ bgcolor: 'primary.dark', color: 'white' }}
                                                        />
                                                    )}
                                                </Stack>
                                            </Paper>
                                        </motion.div>
                                    )}

                                    <Divider />

                                    <Alert severity="info" icon={<Assignment />}>
                                        <Typography variant="caption">
                                            Teachers: {teachers.length} | Courses: {courses.length}
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
                                            <School color="primary" />
                                            Select Courses
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Choose one or more courses to assign
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
                                                                color="primary"
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
                                                                {course.teacher_ids?.length || 0} teachers assigned
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

                                    {teachers.length === 0 && (
                                        <Alert severity="warning">
                                            No teachers available. Please add teachers first.
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
                                            Assignment Summary
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                            Teacher
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {selectedTeacherData?.name || 'Not selected'}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                                            Courses to Assign
                                        </Typography>
                                        <Typography variant="h4" color="primary.main" fontWeight={700}>
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
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Stack>
                                        </Box>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        startIcon={<CheckCircle />}
                                        endIcon={<ArrowForward />}
                                        disabled={!selectedTeacher || selectedCourses.length === 0}
                                        sx={{
                                            borderRadius: 2,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Assign Courses
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

export default AssignTeacherPage;

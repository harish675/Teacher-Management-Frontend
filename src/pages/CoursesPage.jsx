import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Chip,
} from '@mui/material';
import { Add, School, Group as GroupIcon, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { getAllCourses, createCourse } from '../services/courses';
import PageHeader from '../components/layout/PageHeader';
import { CardSkeleton } from '../components/common/LoadingSkeleton';
import { pageTransition, modalTransition, cardHover } from '../theme/animations';

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        course_name: '',
        description: ''
    });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await getAllCourses();
            setCourses(data);
        } catch (err) {
            enqueueSnackbar('Failed to fetch courses: ' + err.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const courseData = {
                course_name: formData.course_name,
                ...(formData.description && { description: formData.description })
            };

            await createCourse(courseData);
            enqueueSnackbar('Course created successfully!', { variant: 'success' });
            setFormData({ course_name: '', description: '' });
            setOpenDialog(false);
            fetchCourses();
        } catch (err) {
            enqueueSnackbar('Failed to create course: ' + (err.response?.data?.detail || err.message), { variant: 'error' });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <motion.div {...pageTransition}>
            <PageHeader
                title="Courses"
                subtitle="Manage course catalog and information"
                icon={<School />}
                action={
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenDialog(true)}
                        sx={{ borderRadius: 2 }}
                    >
                        Add Course
                    </Button>
                }
            />

            {loading ? (
                <CardSkeleton count={3} />
            ) : courses.length === 0 ? (
                <Card sx={{ textAlign: 'center', py: 6 }}>
                    <CardContent>
                        <School sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            No courses found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Add your first course to get started
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setOpenDialog(true)}
                            sx={{ borderRadius: 2 }}
                        >
                            Add Course
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Grid container spacing={3}>
                    {courses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course._id}>
                            <motion.div whileHover={cardHover}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 2,
                                                    backgroundColor: 'primary.main',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mr: 2,
                                                }}
                                            >
                                                <School />
                                            </Box>
                                            <Typography variant="h6" fontWeight={600}>
                                                {course.course_name}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mb: 2,
                                                minHeight: 40,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {course.description || 'No description available'}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            <Chip
                                                icon={<GroupIcon />}
                                                label={`${course.teacher_ids?.length || 0} Teachers`}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                            <Chip
                                                icon={<Person />}
                                                label={`${course.enrolled_student_ids?.length || 0} Students`}
                                                size="small"
                                                color="success"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ px: 2, pb: 2 }}>
                                        <Button size="small" color="primary">
                                            View Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Add Course Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    component: motion.div,
                    ...modalTransition,
                }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <School color="primary" />
                            <Typography variant="h6" fontWeight={600}>Add New Course</Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <TextField
                                label="Course Name"
                                name="course_name"
                                value={formData.course_name}
                                onChange={handleChange}
                                required
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                label="Description (Optional)"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Enter course description"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button onClick={() => setOpenDialog(false)} color="inherit">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" sx={{ borderRadius: 2 }}>
                            Add Course
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </motion.div>
    );
}

export default CoursesPage;

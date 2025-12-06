import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Grid,
    Paper,
} from '@mui/material';
import { ExpandMore, Assessment, School, Person, TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { getAllEnrollments } from '../services/studentCourses';
import PageHeader from '../components/layout/PageHeader';
import { CardSkeleton } from '../components/common/LoadingSkeleton';
import { pageTransition } from '../theme/animations';

function EnrollmentReportPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const data = await getAllEnrollments();
            setEnrollments(data);
        } catch (err) {
            enqueueSnackbar('Failed to fetch enrollments: ' + err.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const totalEnrollments = enrollments.reduce((sum, e) => sum + e.total_students, 0);
    const avgStudentsPerCourse = enrollments.length > 0
        ? (totalEnrollments / enrollments.length).toFixed(1)
        : 0;

    return (
        <motion.div {...pageTransition}>
            <PageHeader
                title="Enrollment Report"
                subtitle="View all course enrollments and student details"
                icon={<Assessment />}
            />

            {loading ? (
                <CardSkeleton count={3} />
            ) : (
                <>
                    {/* Summary Statistics */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={4}>
                            <Card sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h3" fontWeight={700}>
                                                {enrollments.length}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Total Courses
                                            </Typography>
                                        </Box>
                                        <School sx={{ fontSize: 48, opacity: 0.8 }} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card sx={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h3" fontWeight={700}>
                                                {totalEnrollments}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Total Enrollments
                                            </Typography>
                                        </Box>
                                        <Person sx={{ fontSize: 48, opacity: 0.8 }} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', color: 'white' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h3" fontWeight={700}>
                                                {avgStudentsPerCourse}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Avg Students/Course
                                            </Typography>
                                        </Box>
                                        <TrendingUp sx={{ fontSize: 48, opacity: 0.8 }} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Enrollment Details */}
                    {enrollments.length === 0 ? (
                        <Card sx={{ textAlign: 'center', py: 6 }}>
                            <CardContent>
                                <Assessment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    No enrollments found
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Enroll students in courses to see the report
                                </Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        <Box>
                            {enrollments.map((enrollment) => (
                                <Accordion
                                    key={enrollment.course_id}
                                    sx={{
                                        mb: 2,
                                        '&:before': { display: 'none' },
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                    }}
                                    elevation={0}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        sx={{
                                            backgroundColor: 'background.paper',
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 2,
                                                    backgroundColor: 'primary.main',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <School />
                                            </Box>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" fontWeight={600}>
                                                    {enrollment.course_name}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={`${enrollment.total_students} student${enrollment.total_students !== 1 ? 's' : ''}`}
                                                color="success"
                                                size="small"
                                            />
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 0 }}>
                                        {enrollment.students.length === 0 ? (
                                            <Box sx={{ p: 3, textAlign: 'center' }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    No students enrolled in this course yet.
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell><strong>Student Name</strong></TableCell>
                                                            <TableCell><strong>Email</strong></TableCell>
                                                            <TableCell><strong>Age</strong></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {enrollment.students.map((student) => (
                                                            <TableRow
                                                                key={student._id}
                                                                sx={{
                                                                    '&:hover': {
                                                                        backgroundColor: 'action.hover',
                                                                    },
                                                                }}
                                                            >
                                                                <TableCell>{student.name}</TableCell>
                                                                <TableCell>{student.email}</TableCell>
                                                                <TableCell>
                                                                    {student.age ? (
                                                                        <Chip label={`${student.age} years`} size="small" variant="outlined" />
                                                                    ) : (
                                                                        <Typography variant="body2" color="text.secondary">N/A</Typography>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    )}
                </>
            )}
        </motion.div>
    );
}

export default EnrollmentReportPage;

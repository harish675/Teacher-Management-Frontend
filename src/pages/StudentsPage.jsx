import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Typography,
} from '@mui/material';
import { Add, Person, Visibility } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { getAllStudents, createStudent } from '../services/students';
import PageHeader from '../components/layout/PageHeader';
import { TableSkeleton } from '../components/common/LoadingSkeleton';
import { pageTransition, modalTransition, listItemTransition, staggerContainer } from '../theme/animations';

function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await getAllStudents();
            setStudents(data);
        } catch (err) {
            enqueueSnackbar('Failed to fetch students: ' + err.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const studentData = {
                name: formData.name,
                email: formData.email,
                ...(formData.age && { age: parseInt(formData.age) })
            };

            await createStudent(studentData);
            enqueueSnackbar('Student created successfully!', { variant: 'success' });
            setFormData({ name: '', email: '', age: '' });
            setOpenDialog(false);
            fetchStudents();
        } catch (err) {
            enqueueSnackbar('Failed to create student: ' + (err.response?.data?.detail || err.message), { variant: 'error' });
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
                title="Students"
                subtitle="Manage student records and information"
                icon={<Person />}
                action={
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenDialog(true)}
                        sx={{ borderRadius: 2 }}
                    >
                        Add Student
                    </Button>
                }
            />

            {loading ? (
                <TableSkeleton rows={5} />
            ) : (
                <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        backgroundImage: 'none',
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Age</strong></TableCell>
                                <TableCell align="right"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <AnimatePresence>
                                {students.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <Box sx={{ py: 4 }}>
                                                <Typography variant="body1" color="text.secondary">
                                                    No students found. Add your first student to get started.
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    students.map((student, index) => (
                                        <motion.tr
                                            key={student._id}
                                            component={TableRow}
                                            {...listItemTransition}
                                            custom={index}
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
                                                    <Chip label={`${student.age} years`} size="small" color="primary" variant="outlined" />
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">N/A</Typography>
                                                )}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small" color="primary">
                                                    <Visibility fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Add Student Dialog */}
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
                            <Person color="primary" />
                            <Typography variant="h6" fontWeight={600}>Add New Student</Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Age (Optional)"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                fullWidth
                                inputProps={{ min: 5, max: 100 }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button onClick={() => setOpenDialog(false)} color="inherit">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" sx={{ borderRadius: 2 }}>
                            Add Student
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </motion.div>
    );
}

export default StudentsPage;

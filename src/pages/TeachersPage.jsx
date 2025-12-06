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
import { Add, Group, Visibility } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { getAllTeachers, createTeacher } from '../services/teachers';
import PageHeader from '../components/layout/PageHeader';
import { TableSkeleton } from '../components/common/LoadingSkeleton';
import { pageTransition, modalTransition, listItemTransition } from '../theme/animations';

function TeachersPage() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject_expertise: '',
        experience_years: ''
    });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const data = await getAllTeachers();
            setTeachers(data);
        } catch (err) {
            enqueueSnackbar('Failed to fetch teachers: ' + err.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const teacherData = {
                name: formData.name,
                email: formData.email,
                ...(formData.subject_expertise && { subject_expertise: formData.subject_expertise }),
                ...(formData.experience_years && { experience_years: parseInt(formData.experience_years) })
            };

            await createTeacher(teacherData);
            enqueueSnackbar('Teacher created successfully!', { variant: 'success' });
            setFormData({ name: '', email: '', subject_expertise: '', experience_years: '' });
            setOpenDialog(false);
            fetchTeachers();
        } catch (err) {
            enqueueSnackbar('Failed to create teacher: ' + (err.response?.data?.detail || err.message), { variant: 'error' });
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
                title="Teachers"
                subtitle="Manage teacher records and expertise"
                icon={<Group />}
                action={
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenDialog(true)}
                        sx={{ borderRadius: 2 }}
                    >
                        Add Teacher
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
                                <TableCell><strong>Subject Expertise</strong></TableCell>
                                <TableCell><strong>Experience</strong></TableCell>
                                <TableCell align="right"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <AnimatePresence>
                                {teachers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <Box sx={{ py: 4 }}>
                                                <Typography variant="body1" color="text.secondary">
                                                    No teachers found. Add your first teacher to get started.
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    teachers.map((teacher, index) => (
                                        <motion.tr
                                            key={teacher._id}
                                            component={TableRow}
                                            {...listItemTransition}
                                            custom={index}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'action.hover',
                                                },
                                            }}
                                        >
                                            <TableCell>{teacher.name}</TableCell>
                                            <TableCell>{teacher.email}</TableCell>
                                            <TableCell>
                                                {teacher.subject_expertise ? (
                                                    <Chip label={teacher.subject_expertise} size="small" color="secondary" variant="outlined" />
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">N/A</Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {teacher.experience_years ? `${teacher.experience_years} years` : 'N/A'}
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

            {/* Add Teacher Dialog */}
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
                            <Group color="primary" />
                            <Typography variant="h6" fontWeight={600}>Add New Teacher</Typography>
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
                                label="Subject Expertise (Optional)"
                                name="subject_expertise"
                                value={formData.subject_expertise}
                                onChange={handleChange}
                                fullWidth
                                placeholder="e.g., Mathematics, Physics"
                            />
                            <TextField
                                label="Years of Experience (Optional)"
                                name="experience_years"
                                type="number"
                                value={formData.experience_years}
                                onChange={handleChange}
                                fullWidth
                                inputProps={{ min: 0, max: 50 }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button onClick={() => setOpenDialog(false)} color="inherit">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" sx={{ borderRadius: 2 }}>
                            Add Teacher
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </motion.div>
    );
}

export default TeachersPage;

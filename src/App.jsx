import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContextProvider } from './theme/ThemeContextProvider.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import CoursesPage from './pages/CoursesPage';
import AssignTeacherPage from './pages/AssignTeacherPage';
import EnrollStudentPage from './pages/EnrollStudentPage';
import EnrollmentReportPage from './pages/EnrollmentReportPage';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/students" replace />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/assign-teacher" element={<AssignTeacherPage />} />
            <Route path="/enroll-student" element={<EnrollStudentPage />} />
            <Route path="/enrollment-report" element={<EnrollmentReportPage />} />
          </Routes>
        </AppLayout>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;

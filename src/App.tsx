import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import { ToastProvider } from './components/ui/Toast';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth pages
import Login from './pages/auth/Login';
const ChangePassword = lazy(() => import('./pages/auth/ChangePassword'));
const RecoverPassword = lazy(() => import('./pages/auth/RecoverPassword'));
const FaceVerification = lazy(() => import('./pages/auth/FaceVerification'));

// Public pages
const Landing = lazy(() => import('./pages/public/Landing'));
const NotFound = lazy(() => import('./pages/public/NotFound'));
const VerifyCertificate = lazy(() => import('./pages/public/VerifyCertificate'));

// Student pages
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const Courses = lazy(() => import('./pages/student/Courses'));
const CourseDetail = lazy(() => import('./pages/student/CourseDetail'));
const ModulePage = lazy(() => import('./pages/student/ModulePage'));
const Evaluations = lazy(() => import('./pages/student/Evaluations'));
const TakeEvaluation = lazy(() => import('./pages/student/TakeEvaluation'));
const Results = lazy(() => import('./pages/student/Results'));
const Consultations = lazy(() => import('./pages/student/Consultations'));
const FinalProject = lazy(() => import('./pages/student/FinalProject'));
const Certificates = lazy(() => import('./pages/student/Certificates'));
const Profile = lazy(() => import('./pages/student/Profile'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Users = lazy(() => import('./pages/admin/Users'));
const UserProfile = lazy(() => import('./pages/admin/UserProfile'));
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const QuestionBank = lazy(() => import('./pages/admin/QuestionBank'));
const AdminConsultations = lazy(() => import('./pages/admin/AdminConsultations'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const Attendance = lazy(() => import('./pages/admin/Attendance'));
const AdminCertificates = lazy(() => import('./pages/admin/AdminCertificates'));
const Reports = lazy(() => import('./pages/admin/Reports'));
const AdminSite = lazy(() => import('./pages/admin/AdminSite'));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads'));
const ContentEditor = lazy(() => import('./pages/admin/ContentEditor'));
const AdminModules = lazy(() => import('./pages/admin/AdminModules'));
const AdminIngresos = lazy(() => import('./pages/admin/AdminIngresos'));

function Cargando() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center" role="status">
      <Loader2 className="animate-spin text-primary" size={36} aria-hidden="true" />
      <span className="sr-only">Cargando…</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
      <SiteProvider>
      <AuthProvider>
        <Suspense fallback={<Cargando />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-password" element={<RecoverPassword />} />
          <Route path="/verificar-certificado" element={<VerifyCertificate />} />
          <Route path="/verificar-certificado/:codigo" element={<VerifyCertificate />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cambiar-password" element={<ChangePassword />} />
            <Route path="/verificacion-facial" element={<FaceVerification />} />
          </Route>

          {/* Student routes */}
          <Route element={<ProtectedRoute roles={['alumno']} />}>
            <Route element={<StudentLayout />}>
              <Route path="/app" element={<StudentDashboard />} />
              <Route path="/app/cursos" element={<Courses />} />
              <Route path="/app/cursos/:cursoId" element={<CourseDetail />} />
              <Route path="/app/modulos/:moduloId" element={<ModulePage />} />
              <Route path="/app/evaluaciones" element={<Evaluations />} />
              <Route path="/app/evaluaciones/:evaluacionId/rendir" element={<TakeEvaluation />} />
              <Route path="/app/resultados/:intentoId" element={<Results />} />
              <Route path="/app/consultas" element={<Consultations />} />
              <Route path="/app/proyecto" element={<FinalProject />} />
              <Route path="/app/certificados" element={<Certificates />} />
              <Route path="/app/perfil" element={<Profile />} />
            </Route>
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/usuarios" element={<Users />} />
              <Route path="/admin/usuarios/nuevo" element={<Users />} />
              <Route path="/admin/usuarios/:id" element={<UserProfile />} />
              <Route path="/admin/cursos" element={<AdminCourses />} />
              <Route path="/admin/cursos/:id" element={<AdminCourses />} />
              <Route path="/admin/banco-preguntas" element={<QuestionBank />} />
              <Route path="/admin/consultas" element={<AdminConsultations />} />
              <Route path="/admin/proyectos" element={<AdminProjects />} />
              <Route path="/admin/asistencia" element={<Attendance />} />
              <Route path="/admin/certificados" element={<AdminCertificates />} />
              <Route path="/admin/reportes" element={<Reports />} />
              <Route path="/admin/sitio" element={<AdminSite />} />
              <Route path="/admin/modulos" element={<AdminModules />} />
              <Route path="/admin/ingresos" element={<AdminIngresos />} />
              <Route path="/admin/solicitudes" element={<AdminLeads />} />
              <Route path="/admin/contenido/:moduloId" element={<ContentEditor />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </AuthProvider>
      </SiteProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import PublicProfile from './pages/PublicProfile';
import InstallPwa from './components/InstallPwa';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

import LandingPage from './pages/marketing/LandingPage';
import AboutPage from './pages/marketing/AboutPage';
import ContactPage from './pages/marketing/ContactPage';

function App() {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <Toaster position="top-right" />
                    <InstallPwa />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/login" element={<Auth />} />
                        <Route path="/register" element={<Auth />} />

                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/:username" element={<PublicProfile />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;

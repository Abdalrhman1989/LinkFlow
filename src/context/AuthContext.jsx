import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            // Assuming a /me endpoint exists or using the stored user data
            // For now, let's decode or fetch. We'll add a /me endpoint later properly.
            // Or just trust the token validity for now and fetch on specific actions.
            // Better: Fetch /api/auth/me
            const res = await axios.get('http://localhost:3000/api/auth/me');
            setUser(res.data);
        } catch (error) {
            console.error('Failed to fetch user', error);
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            toast.success('Logged in successfully!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (username, email, password, fullName) => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', { username, email, password, fullName });
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            toast.success('Registered successfully!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

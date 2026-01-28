import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success;
        if (isLogin) {
            success = await login(formData.email, formData.password);
        } else {
            success = await register(formData.username, formData.email, formData.password, formData.fullName);
        }
        if (success) navigate('/admin');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 rounded-2xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Username (unique)"
                                className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500"
                                value={formData.username}
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500"
                                value={formData.fullName}
                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <button type="submit" className="bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors mt-2">
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-yellow-500 hover:underline">
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default Auth;

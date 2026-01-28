import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full overflow-hidden hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 text-xl"
            >
                {theme === 'dark' ? (
                    <FaSun className="text-yellow-400" />
                ) : (
                    <FaMoon className="text-slate-700 dark:text-slate-200" />
                )}
            </motion.div>
        </button>
    );
};

export default ThemeToggle;

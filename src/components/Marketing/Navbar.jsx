import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 left-0 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">LinkFlow</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link>
                        <Link to="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>

                        <div className="h-6 w-px bg-gray-200 dark:bg-white/10"></div>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Log in</Link>
                            <Link to="/register" className="btn-primary py-2 px-4 shadow-md shadow-indigo-500/20 text-sm">Sign up free</Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400">About</Link>
                            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link>
                            <div className="pt-4 flex flex-col gap-3 border-t border-gray-100 dark:border-white/10 mt-2">
                                <Link to="/login" className="block text-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-white/5">Log in</Link>
                                <Link to="/register" className="block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-500/30">Sign up free</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

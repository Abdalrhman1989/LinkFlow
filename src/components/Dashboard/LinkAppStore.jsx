import { useState } from 'react';
import { APP_CATEGORIES, LINK_APPS } from '../../data/linkApps';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { FaSearch, FaTimes } from 'react-icons/fa';

const LinkAppStore = ({ isOpen, onClose, onSelectApp }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    if (!isOpen) return null;

    // Combine icon libraries for lookup
    const AllIcons = { ...FaIcons, ...SiIcons };

    // Filter Logic
    const filteredApps = LINK_APPS.filter(app => {
        const matchesCategory = activeCategory === 'all' || app.category === activeCategory;
        const matchesSearch = app.label.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-[#0f0f0f] w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/10">

                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-white dark:bg-[#0f0f0f] z-10">
                    <div>
                        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Link Apps</h2>
                        <p className="text-gray-500 text-sm">Add music, video, social, and more to your link-in-bio.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors dark:text-white">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="px-6 py-4 flex flex-col md:flex-row gap-4 border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-black/20">

                    {/* Search */}
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search apps..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/30 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Categories - Horizontal Scroll on Mobile */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        {APP_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id
                                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                                        : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-black/20">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredApps.map(app => {
                            const Icon = AllIcons[app.icon] || FaIcons.FaGlobe;
                            return (
                                <button
                                    key={app.id}
                                    onClick={() => onSelectApp(app)}
                                    className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg transition-all group text-center h-full"
                                >
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110 shadow-sm"
                                        style={{ backgroundColor: `${app.color}20`, color: app.color }}
                                    >
                                        <Icon />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{app.label}</h3>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{app.category}</p>
                                </button>
                            );
                        })}
                    </div>

                    {filteredApps.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 pt-20">
                            <p className="text-lg">No apps found matching "{searchQuery}"</p>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-4 text-indigo-500 hover:underline">Clear Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LinkAppStore;

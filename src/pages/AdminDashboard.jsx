import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaEye, FaLink, FaPalette } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import LinksTab from '../components/Dashboard/LinksTab';
import AppearanceTab from '../components/Dashboard/AppearanceTab';
import SettingsTab from '../components/Dashboard/SettingsTab';
import PreviewPhone from '../components/Dashboard/PreviewPhone';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('links');
    const [links, setLinks] = useState([]);
    const [profileData, setProfileData] = useState({
        ...user,
        theme: user?.theme || 'dark',
        accentColor: user?.accentColor || '#eab308'
    });

    useEffect(() => {
        fetchLinks();
        fetchProfile();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/links');
            setLinks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/auth/me');
            setProfileData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddLink = async (linkData) => {
        try {
            await axios.post('http://localhost:3000/api/links', linkData);
            toast.success('Link added!');
            fetchLinks();
        } catch (error) {
            toast.error('Failed to add link');
        }
    };

    const handleDeleteLink = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/links/${id}`);
            toast.success('Link deleted');
            fetchLinks();
        } catch (error) {
            toast.error('Failed to delete link');
        }
    };

    const handleUpdateProfile = async (data) => {
        try {
            setProfileData({ ...profileData, ...data });
            await axios.put('http://localhost:3000/api/auth/me', data);
            toast.success('Saved!');
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white p-4 md:p-8 transition-colors">
            <header className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-3">
                    <a href={`/${user.username}`} target="_blank" className="text-sm bg-white dark:bg-white/10 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/20 transition-colors flex items-center gap-2 border border-gray-200 dark:border-transparent">
                        <FaEye /> <span className="hidden sm:inline">Preview</span>
                    </a>
                    <button onClick={logout} className="text-sm bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2 border border-red-500/10">
                        <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-8">
                {/* Editor Column */}
                <div className="space-y-6">
                    {/* Tabs */}
                    <div className="flex p-1 bg-gray-200 dark:bg-white/5 rounded-xl w-full sm:w-fit overflow-x-auto border border-gray-200 dark:border-transparent">
                        <button
                            onClick={() => setActiveTab('links')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'links' ? 'bg-white dark:bg-white text-black shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                        >
                            <FaLink /> Links
                        </button>
                        <button
                            onClick={() => setActiveTab('appearance')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'appearance' ? 'bg-white dark:bg-white text-black shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                        >
                            <FaPalette /> Appearance
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'settings' ? 'bg-white dark:bg-white text-black shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                        >
                            <FaGear /> Settings
                        </button>
                    </div>

                    {/* Content */}
                    <div className="min-h-[500px]">
                        {activeTab === 'links' && (
                            <LinksTab links={links} setLinks={setLinks} onAddLink={handleAddLink} onDeleteLink={handleDeleteLink} />
                        )}
                        {activeTab === 'appearance' && (
                            <AppearanceTab user={profileData} onUpdateProfile={handleUpdateProfile} />
                        )}
                        {activeTab === 'settings' && (
                            <SettingsTab user={profileData} onUpdateProfile={handleUpdateProfile} />
                        )}
                    </div>
                </div>

                {/* Preview Column */}
                <div className="hidden lg:block sticky top-8 h-fit">
                    <PreviewPhone user={profileData} links={links} />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

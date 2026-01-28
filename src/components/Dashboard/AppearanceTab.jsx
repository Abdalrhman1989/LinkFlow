import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const THEMES = [
    { id: 'dark', label: 'Dark Glass', bg: 'bg-dark', preview: '#0f0f0f' },
    { id: 'light', label: 'Clean Light', bg: 'bg-gray-100', preview: '#f3f4f6' },
    { id: 'midnight', label: 'Midnight Blue', bg: 'bg-[#0f172a]', preview: '#0f172a' },
];

const COLORS = [
    '#eab308', // Yellow
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#22c55e', // Green
    '#a855f7', // Purple
    '#ec4899', // Pink
    '#f97316', // Orange
    '#000000', // Black
];

const AppearanceTab = ({ user, onUpdateProfile }) => {
    const [fullName, setFullName] = useState(user.fullName || '');
    const [bio, setBio] = useState(user.bio || '');
    const [theme, setTheme] = useState(user.theme || 'dark');
    const [accentColor, setAccentColor] = useState(user.accentColor || '#eab308');
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleSave = () => {
        onUpdateProfile({ fullName, bio, theme, accentColor, avatarUrl });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const res = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Construct full URL since backend returns relative path
            const fullUrl = `http://localhost:3000${res.data.url}`;
            setAvatarUrl(fullUrl);
            toast.success('Image uploaded!');
        } catch (error) {
            toast.error('Upload failed');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-8 glass-card p-6 rounded-xl animate-fade-in">
            {/* Profile Details */}
            <section>
                <h3 className="text-lg font-bold mb-4">Profile Details</h3>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shrink-0 relative group">
                            <img src={avatarUrl || "/assets/profile.jpg"} alt="Profile" className="w-full h-full object-cover" />
                            {/* Overlay for upload */}
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                            >
                                <span className="text-xs font-bold">{uploading ? '...' : 'Upload'}</span>
                            </button>
                        </div>
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="text-xs text-yellow-500 hover:text-yellow-400"
                        >
                            Change Image
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    <div className="flex-1 space-y-4 w-full">
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full bg-black/30 border border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500 transition-colors"
                        />
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Bio"
                            className="w-full bg-black/30 border border-white/10 p-3 rounded-xl outline-none resize-none h-24 focus:border-yellow-500 transition-colors"
                        />
                        {/* Fallback URL input if upload fails or user prefers URL */}
                        <input
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="Or paste Image URL"
                            className="w-full bg-black/30 border border-white/10 p-2 text-sm rounded-lg outline-none text-gray-400 focus:text-white"
                        />
                    </div>
                </div>
            </section>

            <hr className="border-white/5" />

            {/* Themes */}
            <section>
                <h3 className="text-lg font-bold mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                    {THEMES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${theme === t.id ? 'border-yellow-500 bg-white/5' : 'border-transparent hover:bg-white/5'}`}
                        >
                            <div className="w-full h-12 rounded-lg" style={{ backgroundColor: t.preview }}></div>
                            <span className="text-sm font-medium">{t.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Accent Color */}
            <section>
                <h3 className="text-lg font-bold mb-4">Accent Color</h3>
                <div className="flex flex-wrap gap-3">
                    {COLORS.map(c => (
                        <button
                            key={c}
                            onClick={() => setAccentColor(c)}
                            className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${accentColor === c ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                    <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-10 h-10 rounded-full cursor-pointer bg-transparent border-none appearance-none"
                    />
                </div>
            </section>

            <div className="pt-4">
                <button onClick={handleSave} className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default AppearanceTab;

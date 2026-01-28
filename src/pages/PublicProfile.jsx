import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import * as FaIcons from 'react-icons/fa';
import { FaAddressBook } from "react-icons/fa6";
import SocialLink from '../components/SocialLink';
import SmartFooter from '../components/SmartFooter';

const PublicProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/users/${username}`);
                setProfile(res.data);
            } catch (error) {
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [username]);

    const handleDownloadVCard = () => {
        if (!profile) return;

        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
N:${profile.fullName};;;;
NOTE:${profile.bio}
URL:${window.location.href}
END:VCARD`;

        const blob = new Blob([vcard], { type: "text/vcard" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${profile.username}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">Loading...</div>;
    if (!profile) return <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-red-500">User not found</div>;

    // Determine styles based on theme
    const theme = profile.theme || 'dark';
    const isLight = theme === 'light';
    const accentColor = profile.accentColor || '#eab308';
    const avatarUrl = profile.avatarUrl || "/assets/profile.jpg";

    // Theme Combinations
    const themeStyles = {
        dark: { bg: 'bg-[#0f0f0f]', text: 'text-white' },
        light: { bg: 'bg-gray-100', text: 'text-gray-900' },
        midnight: { bg: 'bg-[#0f172a]', text: 'text-white' },
    };

    const activeStyle = themeStyles[theme] || themeStyles.dark;

    return (
        <>
            <Helmet>
                <title>{profile.pageTitle || `${profile.fullName || profile.username} | Link in Bio`}</title>
                <meta name="description" content={profile.metaDescription || profile.bio} />
                <meta name="theme-color" content={accentColor} />
            </Helmet>

            <div className={`min-h-screen py-10 px-4 pb-24 transition-colors duration-500 ${activeStyle.bg} ${activeStyle.text} relative overflow-hidden`}>

                {/* Background glow effects - Dynamic Color */}
                {!isLight && (
                    <div className="fixed inset-0 pointer-events-none -z-10">
                        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] opacity-20 rounded-full blur-[120px]" style={{ backgroundColor: accentColor }} />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] opacity-10 rounded-full blur-[100px] bg-blue-500" />
                    </div>
                )}

                <div className="max-w-lg mx-auto relative z-10">
                    {/* VCard Button */}
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={handleDownloadVCard}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md ${isLight ? 'bg-white shadow-sm hover:bg-gray-50 border border-gray-200' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}
                        >
                            <FaAddressBook className={isLight ? "text-gray-600" : "text-gray-300"} />
                            <span className={isLight ? "text-gray-700" : "text-gray-200"}>Save Contact</span>
                        </button>
                    </div>

                    {/* Profile Header */}
                    <div className="text-center mb-12">
                        <div className="relative inline-block group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 blur"></div>
                            <div className={`relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1 ${isLight ? 'bg-white' : 'bg-[#0f0f0f]'}`}>
                                <div className={`w-full h-full rounded-full overflow-hidden border-4 ${isLight ? 'border-white' : 'border-[#0f0f0f]'}`}>
                                    <img
                                        src={avatarUrl}
                                        alt={profile.username}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                                    />
                                </div>
                            </div>

                            {/* Verified Badge - Show only if verified */}
                            {profile.verified && (
                                <div className={`absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 ${isLight ? 'border-white' : 'border-[#0f0f0f]'} shadow-lg`} title="Verified Creator">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <h1 className="text-4xl font-bold mt-6 mb-3 tracking-tight">
                            {profile.fullName || profile.username}
                        </h1>
                        <p className={`max-w-xs mx-auto text-lg leading-relaxed font-light ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                            {profile.bio}
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-col gap-4">
                        {profile.links && profile.links.map((link, index) => {
                            const Icon = FaIcons[link.icon] || FaIcons.FaGlobe;
                            return (
                                <SocialLink
                                    key={link.id}
                                    id={link.id}
                                    icon={Icon}
                                    label={link.label}
                                    url={link.url}
                                    color={link.color}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                </div>

                <SmartFooter />
            </div>
        </>
    );
};

export default PublicProfile;

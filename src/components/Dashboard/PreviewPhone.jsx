import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const PreviewPhone = ({ user, links }) => {
    // Determine styles based on theme
    const isLight = user.theme === 'light';
    const bgClass = isLight ? 'bg-gray-100 text-gray-900' : (user.theme === 'midnight' ? 'bg-[#0f172a] text-white' : 'bg-[#0f0f0f] text-white');
    const cardClass = isLight ? 'bg-white shadow-sm border-gray-200' : 'bg-white/5 backdrop-blur-lg border-white/10';
    const textMuted = isLight ? 'text-gray-500' : 'text-gray-400';
    const accentColor = user.accentColor || '#eab308';
    const avatarUrl = user.avatarUrl || "/assets/profile.jpg";

    return (
        <div className="sticky top-6">
            <div className="border-[12px] border-black rounded-[3rem] overflow-hidden shadow-2xl bg-black max-w-[320px] mx-auto h-[650px] relative">
                {/* Internal Scroll area */}
                <div className={`w-full h-full overflow-y-auto no-scrollbar pb-10 ${bgClass} relative`}>

                    {/* Background effects */}
                    {!isLight && (
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[50%] opacity-20 rounded-full blur-[80px]" style={{ backgroundColor: accentColor }} />
                            <div className="absolute bottom-[-20%] right-[-20%] w-[150%] h-[50%] opacity-10 rounded-full blur-[80px] bg-blue-500" />
                        </div>
                    )}

                    <div className="p-6 pt-12 flex flex-col items-center text-center relative z-10">
                        <div className="relative inline-block group mb-4">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-75 blur"></div>
                            <div className={`relative w-24 h-24 rounded-full p-1 ${isLight ? 'bg-white' : 'bg-[#0f0f0f]'}`}>
                                <div className={`w-full h-full rounded-full overflow-hidden border-2 ${isLight ? 'border-white' : 'border-[#0f0f0f]'}`}>
                                    <img src={avatarUrl} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} />
                                </div>
                            </div>
                            {/* Verified Badge */}
                            <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-[#0f0f0f]">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="font-bold text-xl mb-1 tracking-tight">{user.fullName}</h2>
                        <p className={`text-xs ${textMuted} mb-8 leading-relaxed font-light px-2`}>{user.bio}</p>

                        <div className="w-full space-y-3">
                            {links.map((link, index) => {
                                const AllIcons = { ...FaIcons, ...SiIcons };
                                const Icon = AllIcons[link.icon] || AllIcons.FaGlobe;
                                return (
                                    <motion.a
                                        href="#"
                                        key={link.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`block w-full p-3 rounded-xl border flex items-center justify-between group transition-transform hover:scale-[1.02] ${cardClass}`}
                                        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 shrink-0"
                                                style={{ color: link.color }}
                                            >
                                                <Icon size={14} />
                                            </div>
                                            <span className="text-sm font-medium truncate">{link.label}</span>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
            </div>
        </div>
    );
};

export default PreviewPhone;

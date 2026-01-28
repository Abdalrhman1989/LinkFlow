import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Marketing/Navbar';
import Footer from '../../components/Marketing/Footer';
import {
    FaInstagram, FaTiktok, FaTwitter, FaYoutube, FaSpotify,
    FaChartLine, FaPalette, FaBolt, FaGlobe, FaCheck, FaMobileAlt,
    FaChevronDown, FaChevronUp, FaMagic, FaShieldAlt, FaQrcode, FaLink, FaRocket, FaGem,
    FaTwitch, FaDiscord, FaPaypal, FaStripe, FaShopify, FaAmazon, FaApple, FaSoundcloud, FaLinkedin,
    FaSnapchat
} from 'react-icons/fa';
import { HiSparkles, HiCurrencyDollar, HiTemplate, HiHeart } from 'react-icons/hi';
import { IoIosInfinite } from "react-icons/io";
import { FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
// Removed suspicious SI icons for stability check
const SiMailchimp = FaCheck;
const SiGumroad = FaCheck;
const SiPatreon = FaCheck; // Note: FaPatreon exists in FA usually? Using Check for safety.
const SiConvertkit = FaCheck;
const SiOnlyfans = FaCheck;
const SiBuymeacoffee = FaCheck;
const SiKofi = FaCheck;
const SiSubstack = FaCheck;
const FaPatreon = FaCheck;
const FaSnapchatGhost = FaSnapchat;


// --- SUB-COMPONENTS ---

const SectionHeading = ({ children, badge, centered = true }) => (
    <div className={`${centered ? 'text-center mx-auto' : ''} max-w-4xl mb-20 px-4`}>
        {badge && (
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wide mb-6 ${centered ? 'mx-auto' : ''}`}>
                <HiSparkles /> {badge}
            </div>
        )}
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            {children}
        </h2>
        {centered && <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"></div>}
    </div>
);

const BentoCard = ({ children, className = "", title, subtitle, icon: Icon, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay, duration: 0.5 }}
        className={`bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-gray-100 dark:border-white/5 shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden relative group hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-all duration-500 ${className}`}
    >
        <div className="relative z-10 h-full flex flex-col">
            <div className="mb-8">
                <div className="h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
                    {Icon && <Icon />}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{subtitle}</p>
            </div>
            <div className="flex-grow">{children}</div>
        </div>
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-700"></div>
    </motion.div>
);

const Marquee = ({ items, reverse = false, speed = 40, className = "" }) => (
    <div className={`relative flex overflow-hidden ${className}`}>
        <motion.div
            className="flex gap-12 whitespace-nowrap min-w-full items-center py-4 px-4"
            animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        >
            {[...items, ...items, ...items, ...items].map((item, idx) => (
                <div key={idx} className="flex-shrink-0 group relative">
                    {item.component ? (
                        item.component
                    ) : (
                        <div className="flex items-center gap-3 text-3xl font-bold text-gray-300 dark:text-gray-700 hover:text-indigo-500 dark:hover:text-white transition-colors duration-300">
                            {item.icon && <item.icon className="text-4xl" />}
                            <span className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium dark:text-white bg-black dark:bg-gray-800 px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none">{item.name}</span>
                        </div>
                    )}
                </div>
            ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
    </div>
);

const TestimonialCard = ({ quote, author, handle, avatar }) => (
    <div className="w-[350px] p-6 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-indigo-500/30 transition-colors mx-4">
        <div className="flex items-center gap-1 text-yellow-500 mb-4 text-sm">
            {[1, 2, 3, 4, 5].map(i => <FaGem key={i} />)}
        </div>
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-6 leading-relaxed">"{quote}"</p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {author[0]}
            </div>
            <div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">{author}</div>
                <div className="text-gray-500 text-xs">{handle}</div>
            </div>
        </div>
    </div>
);

const LandingPage = () => {
    return (
        <div className="min-h-screen font-main bg-white dark:bg-slate-950 text-gray-900 dark:text-white overflow-x-hidden selection:bg-indigo-500 selection:text-white">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-500/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 max-w-5xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-600 dark:text-gray-300 mb-4 animate-fade-in-up hover:scale-105 transition-transform cursor-default">
                            <HiSparkles className="text-yellow-500" />
                            <span className="font-bold">New:</span> Turn your bio into a business
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.95] text-gray-900 dark:text-white">
                            One Link.
                            <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
                                Infinite Possibilities.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
                            Join 50M+ creators. Share your content, grow your audience, and sell your products. All from one simple link.
                        </p>

                        {/* Input CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 max-w-xl mx-auto">
                            <div className="relative w-full group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg group-focus-within:text-indigo-500 transition-colors">linkflow.io/</span>
                                <input
                                    type="text"
                                    placeholder="yourname"
                                    className="w-full pl-36 pr-6 py-5 rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-lg font-bold transition-all shadow-xl shadow-indigo-500/5 group-hover:border-gray-300 dark:group-hover:border-white/20"
                                />
                            </div>
                            <button className="w-full sm:w-auto py-5 px-10 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2">
                                <FaRocket />
                                Claim Link
                            </button>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* --- SOCIAL PROOF MARQUEE --- */}
            <div className="py-12 border-y border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-slate-900/30 backdrop-blur-sm">
                <Marquee
                    speed={50}
                    items={[
                        { name: 'Spotify', icon: FaSpotify },
                        { name: 'Instagram', icon: FaInstagram },
                        { name: 'Twitch', icon: FaTwitch },
                        { name: 'YouTube', icon: FaYoutube },
                        { name: 'TikTok', icon: FaTiktok },
                        { name: 'Twitter', icon: FaTwitter },
                        { name: 'SoundCloud', icon: FaSoundcloud },
                        { name: 'Apple Music', icon: FaApple },
                        { name: 'Discord', icon: FaDiscord },
                        { name: 'Snapchat', icon: FaSnapchatGhost },
                        { name: 'LinkedIn', icon: FaLinkedin },
                    ]}
                />
            </div>

            {/* --- MONETIZATION SECTION (NEW) --- */}
            <section className="py-40 bg-white dark:bg-slate-950 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-green-50 to-transparent dark:from-green-900/10 opacity-50 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Floating Elements Animation */}
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                <div className="absolute inset-0 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="absolute top-10 right-10 z-20 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl"><HiCurrencyDollar /></div>
                                        <div>
                                            <div className="text-sm text-gray-500">New Payment</div>
                                            <div className="text-xl font-bold text-gray-900 dark:text-white">+$49.00</div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                                    className="absolute bottom-20 left-10 z-20 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl"><FaGem /></div>
                                        <div>
                                            <div className="text-sm text-gray-500">New Subscriber</div>
                                            <div className="text-xl font-bold text-gray-900 dark:text-white">Lisa M.</div>
                                        </div>
                                    </div>
                                </motion.div>
                                <div className="absolute inset-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-[3rem] shadow-2xl transform rotate-3 flex items-center justify-center">
                                    <span className="text-9xl text-white opacity-20"><HiCurrencyDollar /></span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 text-green-600 dark:text-green-300 text-xs font-bold uppercase tracking-wide">
                                <HiCurrencyDollar /> Monetize
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
                                Turn your bio into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">business.</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                Start making money from your audience. Sell e-books, lock exclusive content, accept tips, or book consultations directly from your link.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="flex items-center gap-3 text-lg font-medium">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 flex items-center justify-center"><FaCheck size={12} /></div>
                                    0% Transaction fees
                                </div>
                                <div className="flex items-center gap-3 text-lg font-medium">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 flex items-center justify-center"><FaCheck size={12} /></div>
                                    Instant payouts
                                </div>
                                <div className="flex items-center gap-3 text-lg font-medium">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 flex items-center justify-center"><FaCheck size={12} /></div>
                                    Sell digital goods
                                </div>
                                <div className="flex items-center gap-3 text-lg font-medium">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 flex items-center justify-center"><FaCheck size={12} /></div>
                                    Collect tips
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- INTEGRATIONS CLOUD (NEW) --- */}
            <section className="py-40 bg-gray-50 dark:bg-slate-900/50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                    <SectionHeading badge="Integrations" centered>Connect with everything.</SectionHeading>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">We integrate with your favorite tools so you can streamline your workflow.</p>
                </div>

                {/* 3 Marquees moving in different directions/speeds */}
                <div className="space-y-12 opacity-80 hover:opacity-100 transition-opacity duration-500">
                    <Marquee
                        speed={60}
                        items={[
                            { name: 'Mailchimp', icon: SiMailchimp }, { name: 'Shopify', icon: FaShopify }, { name: 'Gumroad', icon: SiGumroad },
                            { name: 'Patreon', icon: FaPatreon }, { name: 'Discord', icon: FaDiscord }, { name: 'Twitch', icon: FaTwitch }
                        ]}
                    />
                    <Marquee
                        speed={50} reverse
                        items={[
                            { name: 'PayPal', icon: FaPaypal }, { name: 'Stripe', icon: FaStripe }, { name: 'ConvertKit', icon: SiConvertkit },
                            { name: 'OnlyFans', icon: SiOnlyfans }, { name: 'BuyMeACoffee', icon: SiBuymeacoffee }, { name: 'Ko-fi', icon: SiKofi }
                        ]}
                    />
                    <Marquee
                        speed={70}
                        items={[
                            { name: 'Substack', icon: SiSubstack }, { name: 'Amazon', icon: FaAmazon }, { name: 'Apple Music', icon: FaApple },
                            { name: 'SoundCloud', icon: FaSoundcloud }, { name: 'Spotify', icon: FaSpotify }, { name: 'YouTube', icon: FaYoutube }
                        ]}
                    />
                </div>
            </section>

            {/* --- BENTO GRID FEATURES --- */}
            <section className="py-32 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionHeading badge="Features">Everything needed to grow.</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(300px,auto)]">
                        {/* Analytics */}
                        <BentoCard className="md:col-span-2" title="Deep Analytics" subtitle="Know exactly what's working. Track views, clicks, and CTR." icon={FaChartLine}>
                            <div className="mt-8 h-48 w-full bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-white/5 relative overflow-hidden flex items-end justify-between px-6 pb-0 group-hover:scale-[1.02] transition-transform duration-500">
                                {[40, 70, 50, 90, 60, 80, 50, 75, 60, 90, 100].map((h, i) => (
                                    <div key={i} className="w-[8%] mx-[1%]" style={{ height: `${h}%` }}>
                                        <div className={`h-full w-full rounded-t-md opacity-80 ${i === 10 ? 'bg-indigo-500' : 'bg-indigo-200 dark:bg-indigo-500/20'}`}></div>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>

                        {/* QR */}
                        <BentoCard className="md:col-span-1" title="QR Codes" subtitle="Share offline instantly." icon={FaQrcode}>
                            <div className="mt-4 flex justify-center">
                                <div className="w-32 h-32 bg-white dark:bg-slate-800 p-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                                    <div className="w-full h-full bg-gray-900 dark:bg-white/20 rounded-md"></div>
                                </div>
                            </div>
                        </BentoCard>

                        {/* Themes */}
                        <BentoCard className="md:col-span-1" title="Brand Identity" subtitle="Custom themes & fonts." icon={FaPalette}>
                            <div className="mt-8 grid grid-cols-2 gap-3">
                                <div className="h-12 w-full bg-pink-500 rounded-lg shadow-lg"></div>
                                <div className="h-12 w-full bg-indigo-500 rounded-lg shadow-lg"></div>
                                <div className="h-12 w-full bg-cyan-500 rounded-lg shadow-lg"></div>
                                <div className="h-12 w-full bg-orange-500 rounded-lg shadow-lg"></div>
                            </div>
                        </BentoCard>

                        {/* Embeds */}
                        <BentoCard className="md:col-span-2" title="Rich Media Embeds" subtitle="Display tweets, videos, and music directly on your page." icon={FaGem}>
                            <div className="mt-8 flex gap-4 opacity-50 justify-center">
                                <div className="w-32 h-20 bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-white/10"></div>
                                <div className="w-32 h-20 bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-white/10"></div>
                                <div className="w-32 h-20 bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-white/10"></div>
                            </div>
                        </BentoCard>
                    </div>
                </div>
            </section>

            {/* --- WALL OF LOVE (NEW) --- */}
            <section className="py-32 bg-gray-50 dark:bg-slate-900/30 overflow-hidden">
                <SectionHeading badge="Testimonials" centered>Loved by creators.</SectionHeading>
                <Marquee
                    speed={80}
                    items={[
                        { component: <TestimonialCard quote="LinkFlow changed my life. I doubled my traffic in a week." author="Sarah Jenkins" handle="@sarahj_art" /> },
                        { component: <TestimonialCard quote="The best link in bio tool hands down. So simple yet powerful." author="Mike Ross" handle="@mikeross_music" /> },
                        { component: <TestimonialCard quote="I love the monetization features. Passive income made easy." author="Jessica Wu" handle="@jessicacodes" /> },
                        { component: <TestimonialCard quote="The design is stunning. My page looks so professional now." author="David Miller" handle="@davidm_design" /> },
                        { component: <TestimonialCard quote="Support is amazing and the analytics are top notch." author="Emma Wilson" handle="@emmaflows" /> },
                    ]}
                />
            </section>

            {/* --- LIVE PREVIEW SECTION --- */}
            <section className="py-32 overflow-hidden bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <SectionHeading badge="Preview" centered={false}>Mobile First Design.</SectionHeading>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Your page looks perfect on every device. Optimized for speed, conversion, and aesthetics.
                            </p>
                            <ul className="space-y-4">
                                {['Blazing fast load times', 'SEO optimized profiles', 'Looks perfect on iOS and Android'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                                        <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"><FaCheck size={14} /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative flex justify-center lg:justify-end">
                            {/* Phone Mockup */}
                            <div className="relative border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col items-center justify-start py-5 overflow-hidden">
                                <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                                <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-[#0f0f0f] relative text-white">
                                    {/* Profile Content */}
                                    <div className="h-full w-full overflow-y-auto no-scrollbar relative">

                                        {/* Background effects */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[50%] opacity-20 rounded-full blur-[80px]" style={{ backgroundColor: '#8b5cf6' }} />
                                            <div className="absolute bottom-[-20%] right-[-20%] w-[150%] h-[50%] opacity-10 rounded-full blur-[80px] bg-blue-500" />
                                        </div>

                                        <div className="p-4 pt-10 flex flex-col items-center text-center relative z-10">
                                            {/* Avatar */}
                                            <div className="relative inline-block group mb-4">
                                                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-75 blur"></div>
                                                <div className="relative w-20 h-20 rounded-full p-1 bg-[#0f0f0f]">
                                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#0f0f0f]">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                                                            className="w-full h-full object-cover"
                                                            alt="Sarah Jenkins"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-[#0f0f0f]">
                                                    <FaCheck size={8} />
                                                </div>
                                            </div>

                                            <h2 className="font-bold text-lg mb-1 tracking-tight">Sarah Jenkins</h2>
                                            <p className="text-xs text-gray-400 mb-6 leading-relaxed font-light px-2">Digital Product Designer & Content Creator. Helping brands tell their story.</p>

                                            <div className="w-full space-y-3">
                                                {[
                                                    { label: "Design Portfolio", icon: FaGlobe, color: "#10b981" },
                                                    { label: "Latest YouTube Video", icon: FaYoutube, color: "#ef4444" },
                                                    { label: "Instagram", icon: FaInstagram, color: "#d946ef" },
                                                    { label: "LinkedIn", icon: FaLinkedin, color: "#0ea5e9" },
                                                    { label: "Book Consultation", icon: FaCalendarAlt, color: "#f59e0b" },
                                                ].map((link, i) => (
                                                    <div key={i} className="w-full p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg flex items-center gap-3 group hover:scale-[1.02] transition-transform cursor-pointer">
                                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5" style={{ color: link.color }}>
                                                            <link.icon size={14} />
                                                        </div>
                                                        <span className="text-sm font-medium">{link.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRICING SECTION --- */}
            <section className="py-32 bg-gray-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionHeading badge="Pricing" centered>Transparent Pricing.</SectionHeading>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/5 shadow-lg group hover:border-indigo-500/30 transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Free Forever</h3>
                            <div className="text-5xl font-black mb-6 text-gray-900 dark:text-white">$0</div>
                            <p className="text-gray-500 mb-8 font-medium">Perfect for getting started.</p>

                            <ul className="space-y-4 mb-8">
                                {['Unlimited Links', 'Social Integration', 'Basic Analytics', 'Standard Themes', 'QR Code Generator'].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-medium">
                                        <div className="p-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                            <FaCheck size={10} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-4 rounded-xl border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Get Started</button>
                        </div>
                        <div className="p-10 rounded-[2.5rem] bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-2xl relative overflow-hidden transform md:-translate-y-4 hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute top-0 right-0 bg-gradient-to-bl from-indigo-500 to-purple-500 w-24 h-24 rounded-bl-[2.5rem] -mr-4 -mt-4 opacity-50 blur-xl"></div>

                            <h3 className="text-2xl font-bold mb-2">Pro Creator</h3>
                            <div className="text-5xl font-black mb-6">$9<span className="text-lg font-medium opacity-60">/month</span></div>
                            <p className="text-gray-400 dark:text-gray-600 mb-8 font-medium">For serious creators growing a business.</p>

                            <ul className="space-y-4 mb-8">
                                {['Everything in Free', 'Custom Domain', 'Remove Branding', 'Priority Support', 'Advanced Analytics', '0% Transaction Fees'].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 font-medium">
                                        <div className="p-1 rounded-full bg-white/20 dark:bg-black/10 text-white dark:text-black">
                                            <FaCheck size={10} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold hover:shadow-lg hover:bg-indigo-500 transition-all shadow-indigo-500/25">Go Pro</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-40 text-center">
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900 dark:text-white">
                        Ready to launch?
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 font-medium">
                        Join the community of creators building their future on LinkFlow.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-3 py-5 px-10 rounded-full bg-indigo-600 text-white font-bold text-xl shadow-2xl hover:scale-105 hover:bg-indigo-500 hover:shadow-indigo-500/30 transition-all duration-300">
                        <FaRocket /> Get Started Free
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;

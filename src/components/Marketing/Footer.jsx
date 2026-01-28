import { FaTwitter, FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 pt-20 pb-12 px-6 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-16">

                {/* Brand Column */}
                <div className="col-span-2 lg:col-span-2 space-y-6">
                    <h2 className="text-3xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">LinkFlow</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Developed by ServixerSpace<br />
                        skibhusevej 109, odense c, Denmark
                    </p>
                    <a href="mailto:servixerspace@gmail.com" className="font-bold underline hover:text-indigo-600 dark:hover:text-indigo-400">servixerspace@gmail.com</a>
                    <div className="flex gap-4 text-2xl pt-4 text-gray-400 dark:text-gray-500">
                        <FaTwitter className="hover:text-indigo-500 dark:hover:text-white cursor-pointer transition-colors" />
                        <FaInstagram className="hover:text-pink-500 dark:hover:text-white cursor-pointer transition-colors" />
                        <FaTiktok className="hover:text-black dark:hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>

                {/* Links */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Company</h3>
                    <ul className="space-y-2 text-gray-500 dark:text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Blog</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Press</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Social Good</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Product</h3>
                    <ul className="space-y-2 text-gray-500 dark:text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Link in Bio</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Media Kit</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">QR Codes</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Templates</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Community</h3>
                    <ul className="space-y-2 text-gray-500 dark:text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">LinkFlow 2024</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Charities</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Creator Program</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Support</h3>
                    <ul className="space-y-2 text-gray-500 dark:text-gray-400 font-medium">
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Help Topics</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Getting Started</a></li>
                        <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">Trust Center</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-white/10 text-sm font-bold text-gray-400 dark:text-gray-500">
                <p>© 2026 LinkFlow via ServixerSpace. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms of Use</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white">Cookie Notice</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { motion, AnimatePresence } from 'framer-motion';
import { FaShareAlt, FaQrcode, FaTimes } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useState } from 'react';

const SmartFooter = () => {
    const [showQR, setShowQR] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Abd Alrahman Darra',
                    text: 'Check out my links!',
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <>
            <motion.footer
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4"
            >
                <button
                    onClick={handleShare}
                    className="glass-card p-4 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Share"
                >
                    <FaShareAlt className="text-xl" />
                </button>

                <button
                    onClick={() => setShowQR(true)}
                    className="glass-card p-4 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Show QR Code"
                >
                    <FaQrcode className="text-xl" />
                </button>
            </motion.footer>

            <AnimatePresence>
                {showQR && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowQR(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white p-6 rounded-2xl max-w-sm w-full relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowQR(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                            >
                                <FaTimes size={24} />
                            </button>

                            <div className="text-center mt-4">
                                <h3 className="text-black font-bold text-xl mb-4">Scan to Connect</h3>
                                <div className="bg-white p-2 inline-block rounded-xl border-2 border-dashed border-gray-300">
                                    <QRCode value={window.location.href} size={200} />
                                </div>
                                <p className="text-gray-500 mt-4 text-sm">@abdalrhman.darra</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SmartFooter;

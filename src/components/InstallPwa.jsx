import { useState, useEffect } from 'react';
import { FaMobileAlt, FaDownload } from 'react-icons/fa';

const InstallPwa = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setShowInstall(false);
        }
        setDeferredPrompt(null);
    };

    if (!showInstall) return null;

    return (
        <button
            onClick={handleInstall}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 animate-bounce-subtle"
        >
            <FaDownload /> Install App
        </button>
    );
};

export default InstallPwa;

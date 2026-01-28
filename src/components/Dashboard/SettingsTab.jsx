import { useState } from 'react';
import { toast } from 'react-hot-toast';

const SettingsTab = ({ user, onUpdateProfile }) => {
    const [pageTitle, setPageTitle] = useState(user.pageTitle || '');
    const [metaDescription, setMetaDescription] = useState(user.metaDescription || '');
    const [directMode, setDirectMode] = useState(user.directMode || false);
    const [writing, setWriting] = useState(false);

    const handleSave = () => {
        onUpdateProfile({ pageTitle, metaDescription, directMode });
    };

    const handleCopyNfcLink = () => {
        const link = `http://localhost:3000/${user.username}/nfc`;
        navigator.clipboard.writeText(link);
        toast.success('NFC Link Copied!');
    };

    const handleWriteTag = async () => {
        if (!('NDEFReader' in window)) {
            toast.error('NFC is not supported on this device/browser (Try Chrome on Android).');
            return;
        }

        try {
            const ndef = new NDEFReader();
            setWriting(true);
            toast('Ready! Tap your NFC tag now...', { icon: '📡' });

            await ndef.write({
                records: [{ recordType: "url", data: `http://localhost:3000/${user.username}/nfc` }]
            });

            toast.success('Success! Your tag is now linked.');
        } catch (error) {
            console.error(error);
            toast.error('Write failed. Try again.');
        } finally {
            setWriting(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* NFC Smart Section */}
            <div className="glass-card p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-yellow-500">⚡ Smart NFC</h3>
                        <p className="text-sm text-gray-400 max-w-sm mt-1">
                            Write this special link to your NFC tag.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleWriteTag}
                            disabled={writing}
                            className={`text-xs px-3 py-1 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors ${writing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {writing ? 'Scanning...' : '📲 Write to Tag'}
                        </button>
                        <button
                            onClick={handleCopyNfcLink}
                            className="text-xs bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full hover:bg-yellow-500/30 transition-colors"
                        >
                            Copy Link
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl">
                    <div>
                        <span className="font-bold block">Direct Mode</span>
                        <span className="text-xs text-gray-400">
                            {directMode
                                ? "ON: Redirects instantly to your first active link."
                                : "OFF: Shows your full profile page."}
                        </span>
                    </div>
                    <button
                        onClick={() => setDirectMode(!directMode)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${directMode ? 'bg-green-500' : 'bg-gray-600'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${directMode ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
            </div>

            {/* SEO Section */}
            <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">SEO & Metadata</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Page Title</label>
                        <input
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                            placeholder={`e.g. ${user.fullName}'s Links`}
                            className="w-full bg-black/30 border border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500 transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">This appears in the browser tab and Google search results.</p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Meta Description</label>
                        <textarea
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            placeholder="A short description of who you are..."
                            className="w-full bg-black/30 border border-white/10 p-3 rounded-xl outline-none resize-none h-24 focus:border-yellow-500 transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">This text appears under your title when shared on WhatsApp, Twitter, etc.</p>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button onClick={handleSave} className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default SettingsTab;

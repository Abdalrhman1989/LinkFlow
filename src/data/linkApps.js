
export const APP_CATEGORIES = [
    { id: 'all', label: 'All Apps' },
    { id: 'music', label: 'Music' },
    { id: 'social', label: 'Social' },
    { id: 'business', label: 'Business' },
    { id: 'content', label: 'Content' },
    { id: 'contact', label: 'Contact' },
    { id: 'commerce', label: 'Commerce' },
];

export const LINK_APPS = [
    // --- Music ---
    { id: 'spotify', label: 'Spotify', category: 'music', icon: 'FaSpotify', color: '#1DB954', placeholder: 'Spotify URL' },
    { id: 'applemusic', label: 'Apple Music', category: 'music', icon: 'FaItunes', color: '#FA243C', placeholder: 'Apple Music URL' },
    { id: 'soundcloud', label: 'SoundCloud', category: 'music', icon: 'FaSoundcloud', color: '#FF5500', placeholder: 'SoundCloud URL' },
    { id: 'audiomack', label: 'Audiomack', category: 'music', icon: 'SiAudiomack', color: '#FFA200', placeholder: 'Audiomack URL' },
    { id: 'bandsintown', label: 'Bands In Town', category: 'music', icon: 'SiBandsintown', color: '#00CEC8', placeholder: 'Bandsintown URL' },

    // --- Social ---
    { id: 'instagram', label: 'Instagram', category: 'social', icon: 'FaInstagram', color: '#E1306C', placeholder: 'Instagram Profile URL' },
    { id: 'tiktok', label: 'TikTok', category: 'social', icon: 'FaTiktok', color: '#000000', placeholder: 'TikTok Profile URL' },
    { id: 'facebook', label: 'Facebook', category: 'social', icon: 'FaFacebook', color: '#1877F2', placeholder: 'Facebook URL' },
    { id: 'twitter', label: 'X / Twitter', category: 'social', icon: 'FaTwitter', color: '#1DA1F2', placeholder: 'X Profile URL' }, // Using FaTwitter or FaXTwitter if available
    { id: 'snapchat', label: 'Snapchat', category: 'social', icon: 'FaSnapchatGhost', color: '#FFFC00', placeholder: 'Snapchat URL' },
    { id: 'pinterest', label: 'Pinterest', category: 'social', icon: 'FaPinterest', color: '#BD081C', placeholder: 'Pinterest URL' },
    { id: 'linkedin', label: 'LinkedIn', category: 'social', icon: 'FaLinkedin', color: '#0077B5', placeholder: 'LinkedIn URL' },
    { id: 'reddit', label: 'Reddit', category: 'social', icon: 'FaReddit', color: '#FF4500', placeholder: 'Reddit Profile URL' },
    { id: 'clubhouse', label: 'Clubhouse', category: 'social', icon: 'SiClubhouse', color: '#39AC37', placeholder: 'Clubhouse URL' },
    { id: 'discord', label: 'Discord', category: 'social', icon: 'FaDiscord', color: '#5865F2', placeholder: 'Discord Invite URL' },
    { id: 'whatsapp', label: 'WhatsApp', category: 'social', icon: 'FaWhatsapp', color: '#25D366', placeholder: 'WhatsApp Link or Number' },
    { id: 'telegram', label: 'Telegram', category: 'social', icon: 'FaTelegram', color: '#0088CC', placeholder: 'Telegram Link' },

    // --- Video/Content ---
    { id: 'youtube', label: 'YouTube', category: 'content', icon: 'FaYoutube', color: '#FF0000', placeholder: 'YouTube Channel/Video URL' },
    { id: 'twitch', label: 'Twitch', category: 'content', icon: 'FaTwitch', color: '#9146FF', placeholder: 'Twitch URL' },
    { id: 'vimeo', label: 'Vimeo', category: 'content', icon: 'FaVimeo', color: '#1AB7EA', placeholder: 'Vimeo URL' },
    { id: 'podcast', label: 'Podcasts', category: 'content', icon: 'FaPodcast', color: '#8940FA', placeholder: 'Podcast URL' },

    // --- Commerce/Business ---
    { id: 'shopify', label: 'Shopify', category: 'commerce', icon: 'FaShopify', color: '#96BF48', placeholder: 'Shopify Store URL' },
    { id: 'amazon', label: 'Amazon', category: 'commerce', icon: 'FaAmazon', color: '#FF9900', placeholder: 'Amazon Store/Product URL' },
    { id: 'etsy', label: 'Etsy', category: 'commerce', icon: 'FaEtsy', color: '#F56400', placeholder: 'Etsy Shop URL' },
    { id: 'paypal', label: 'PayPal', category: 'commerce', icon: 'FaPaypal', color: '#003087', placeholder: 'PayPal.me Link' },
    { id: 'cashapp', label: 'Cash App', category: 'commerce', icon: 'SiCashapp', color: '#00D632', placeholder: 'Cash App Tag' },
    { id: 'patreon', label: 'Patreon', category: 'commerce', icon: 'FaPatreon', color: '#F96854', placeholder: 'Patreon URL' },
    { id: 'gofundme', label: 'GoFundMe', category: 'commerce', icon: 'SiGofundme', color: '#00C667', placeholder: 'GoFundMe URL' },
    { id: 'buycoffee', label: 'Buy Me a Coffee', category: 'commerce', icon: 'SiBuymeacoffee', color: '#FFDD00', placeholder: 'BMC URL' },

    // --- Contact/Utility ---
    { id: 'website', label: 'Website', category: 'contact', icon: 'FaGlobe', color: '#4A5568', placeholder: 'Website URL' },
    { id: 'email', label: 'Email', category: 'contact', icon: 'FaEnvelope', color: '#718096', placeholder: 'mailto:email@example.com' },
    { id: 'phone', label: 'Phone', category: 'contact', icon: 'FaPhone', color: '#48BB78', placeholder: 'tel:+1234567890' },
    { id: 'text', label: 'Text/SMS', category: 'contact', icon: 'FaComment', color: '#4299E1', placeholder: 'sms:+1234567890' },
    { id: 'calendar', label: 'Calendar', category: 'contact', icon: 'FaCalendarAlt', color: '#ED8936', placeholder: 'Scheduling URL' },
    { id: 'pdf', label: 'PDF File', category: 'content', icon: 'FaFilePdf', color: '#F56565', placeholder: 'Link to PDF' },
];

export const getIconComponent = (iconName, lib) => {
    // Helper to return the correct icon from provided library object
    // Usage: const Icon = getIconComponent(link.icon, {...FaIcons, ...SiIcons});
    return lib[iconName] || lib.FaGlobe;
};

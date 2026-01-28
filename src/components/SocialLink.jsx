import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import axios from "axios";
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const SocialLink = ({ icon: iconName, label, url, color, index, id }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const controls = useAnimation();

    // Resolve Icon
    const AllIcons = { ...FaIcons, ...SiIcons };
    const Icon = AllIcons[iconName] || AllIcons.FaGlobe;
    // If iconName is already a component (legacy support), use it
    const FinalIcon = typeof iconName === 'function' ? iconName : Icon;

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const handleClick = async () => {
        if (id) {
            try {
                await axios.post(`http://localhost:3000/api/links/${id}/click`);
            } catch (error) {
                // Silently fail for analytics
                console.error("Failed to track click", error);
            }
        }
    };

    return (
        <motion.a
            ref={ref}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card mb-4 flex items-center p-4 rounded-xl hover:scale-[1.02] transition-transform group cursor-pointer border border-white/5 bg-white/5 hover:bg-white/10"
            onClick={handleClick}
        >
            <div
                className="w-12 h-12 flex items-center justify-center rounded-full text-2xl mr-4 bg-white/5 group-hover:bg-white/10 transition-colors"
                style={{ color: color }}
            >
                <FinalIcon />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{label}</h3>
            </div>
        </motion.a>
    );
};

export default SocialLink;

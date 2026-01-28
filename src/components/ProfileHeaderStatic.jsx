import { motion } from 'framer-motion';

const ProfileHeader = () => {
    return (
        <div className="text-center mb-10 pt-10">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative inline-block"
            >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-yellow-400 to-red-500 mx-auto">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-dark bg-dark">
                        {/* Using the moved image */}
                        <img
                            src="/assets/profile.jpg"
                            alt="Abd Alrahman Darra"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Verification Badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full border-4 border-dark"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </motion.div>
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mt-4 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            >
                Abd Alrahman Darra
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 max-w-sm mx-auto"
            >
                Digital Creator | Tech Enthusiast | Filmmaker
            </motion.p>
        </div>
    );
};

export default ProfileHeader;

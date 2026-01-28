import MarketingLayout from './Layout';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <MarketingLayout>
            <div className="container mx-auto px-6 py-20">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold mb-8 dark:text-white">Our Mission</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
                        We believe that your online presence should be as dynamic as you are.
                        **LinkFlow** was born from the idea that a simple link-in-bio wasn't enough.
                        Creators needed smarter tools—tools that could automate tasks, connect instantly via NFC,
                        and look professional without coding.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl">
                            <h3 className="text-lg font-bold mb-2 text-yellow-500">Innovation First</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                We are constantly pushing the boundaries of what a "link" can do.
                                From NFC writing to automated scheduling.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl">
                            <h3 className="text-lg font-bold mb-2 text-yellow-500">Design Centric</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Aesthetics matter. We ensure your profile looks premium on every device, every time.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </MarketingLayout>
    );
};

export default AboutPage;

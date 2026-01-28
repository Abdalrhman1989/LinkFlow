import Navbar from '../../components/Marketing/Navbar';
import Footer from '../../components/Marketing/Footer';

const MarketingLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
            <Navbar />
            <main className="pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MarketingLayout;

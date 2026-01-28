import MarketingLayout from './Layout';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent! We'll get back to you soon.");
        setEmail('');
        setMessage('');
    };

    return (
        <MarketingLayout>
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-xl mx-auto bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-2xl">
                    <h1 className="text-3xl font-bold mb-2 dark:text-white">Get in Touch</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        Have questions about Pro plans or Enterprise features?
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 dark:text-gray-300">Message</label>
                            <textarea
                                required
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="w-full h-32 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 rounded-xl outline-none focus:border-yellow-500 transition-colors resize-none"
                            />
                        </div>
                        <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </MarketingLayout>
    );
};

export default ContactPage;

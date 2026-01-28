import { Helmet } from 'react-helmet';
import {
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaGlobe
} from 'react-icons/fa';
import ProfileHeader from './components/ProfileHeader';
import SocialLink from './components/SocialLink';
import SmartFooter from './components/SmartFooter';

function App() {
  const links = [
    {
      id: 1,
      label: 'Instagram',
      url: 'https://www.instagram.com/abdalrhman.darra',
      icon: FaInstagram,
      color: '#E1306C'
    },
    {
      id: 2,
      label: 'TikTok',
      url: 'https://www.tiktok.com/@abdalrhman_darra',
      icon: FaTiktok,
      color: '#ff0050' // TikTok red
    },
    {
      id: 3,
      label: 'YouTube',
      url: 'https://youtube.com/@official.earthlens',
      icon: FaYoutube,
      color: '#FF0000'
    },
    {
      id: 4,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/abd-alrhman-al-darra-45160911b/',
      icon: FaLinkedin,
      color: '#0077B5'
    },
    {
      id: 5,
      label: 'Facebook',
      url: 'https://www.facebook.com/share/1Hj5g8nQN2/?mibextid=wwXIfr',
      icon: FaFacebook,
      color: '#1877F2'
    },
    {
      id: 6,
      label: 'My Website',
      url: 'https://servixerspace.vercel.app/en',
      icon: FaGlobe,
      color: '#A855F7' // Purple
    }
  ];

  return (
    <>
      <Helmet>
        <title>Abd Alrahman Darra | Link in Bio</title>
        <meta name="description" content="Digital Creator | Tech Enthusiast | Filmmaker - Connect with me!" />
        <meta name="theme-color" content="#0f0f0f" />
      </Helmet>

      <main className="min-h-screen py-10 px-4 max-w-lg mx-auto pb-24">
        {/* Background ambient glow */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]" />
        </div>

        <ProfileHeader />

        <div className="flex flex-col gap-2">
          {links.map((link, index) => (
            <SocialLink
              key={link.id}
              icon={link.icon}
              label={link.label}
              url={link.url}
              color={link.color}
              index={index}
            />
          ))}
        </div>

        <SmartFooter />
      </main>
    </>
  );
}

export default App;

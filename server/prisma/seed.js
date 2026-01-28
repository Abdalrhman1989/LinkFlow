const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const username = 'abdalrhman';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upsert user (create if not exists)
    const user = await prisma.user.upsert({
        where: { username },
        update: {},
        create: {
            username,
            email: 'abdalrhman@example.com',
            password: hashedPassword,
            fullName: 'Abd Alrahman Darra',
            bio: 'Digital Creator | Tech Enthusiast | Filmmaker',
            avatarUrl: '/assets/profile.jpg',
            verified: true,
            links: {
                create: [
                    {
                        label: 'Instagram',
                        url: 'https://www.instagram.com/abdalrhman.darra',
                        icon: 'FaInstagram',
                        color: '#E1306C',
                        order: 0
                    },
                    {
                        label: 'TikTok',
                        url: 'https://www.tiktok.com/@abdalrhman_darra',
                        icon: 'FaTiktok',
                        color: '#ff0050',
                        order: 1
                    },
                    {
                        label: 'YouTube',
                        url: 'https://youtube.com/@official.earthlens',
                        icon: 'FaYoutube',
                        color: '#FF0000',
                        order: 2
                    },
                    {
                        label: 'LinkedIn',
                        url: 'https://www.linkedin.com/in/abd-alrhman-al-darra-45160911b/',
                        icon: 'FaLinkedin',
                        color: '#0077B5',
                        order: 3
                    },
                    {
                        label: 'Facebook',
                        url: 'https://www.facebook.com/share/1Hj5g8nQN2/?mibextid=wwXIfr',
                        icon: 'FaFacebook',
                        color: '#1877F2',
                        order: 4
                    },
                    {
                        label: 'My Website',
                        url: 'https://servixerspace.vercel.app/en',
                        icon: 'FaGlobe',
                        color: '#A855F7',
                        order: 5
                    }
                ]
            }
        }
    });

    console.log({ user });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

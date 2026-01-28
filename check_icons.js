
try {
    const si = require('react-icons/si');
    const fa = require('react-icons/fa');
    const hi = require('react-icons/hi');

    const siIcons = ['SiSubstack', 'SiKofi', 'SiBuymeacoffee', 'SiGumroad', 'SiOnlyfans', 'SiConvertkit', 'SiMailchimp'];
    const faIcons = ['FaSnapchatGhost'];
    const hiIcons = ['HiCurrencyDollar'];

    siIcons.forEach(icon => {
        if (!si[icon]) console.error(`Missing SI icon: ${icon}`);
        else console.log(`Found ${icon}`);
    });

    faIcons.forEach(icon => {
        if (!fa[icon]) console.error(`Missing FA icon: ${icon}`);
        else console.log(`Found ${icon}`);
    });

    hiIcons.forEach(icon => {
        if (!hi[icon]) console.error(`Missing HI icon: ${icon}`);
        else console.log(`Found ${icon}`);
    });

} catch (e) {
    console.error("Error requiring react-icons:", e.message);
}

const axios = require('axios');

const ARCH_MIRRORS = [
    "https://mirror.rackspace.com/archlinux/$repo/os/$arch",
    "https://archlinux.mirror.digitalpacific.com.au/$repo/os/$arch",
    // add more mirrors as needed
];

async function fetchPackages() {
    try {
        const responses = await Promise.all(ARCH_MIRRORS.map(mirror =>
            axios.get(mirror.replace('$repo', 'core').replace('$arch', 'x86_64'))
        ));

        const packages = responses.map(response => response.data);
        console.log('Fetched Package Data:', packages);
        return packages;
    } catch (error) {
        console.error('Error fetching packages:', error);
        throw error;
    }
}

module.exports = fetchPackages;

// Uncomment the line below to run the function directly
// fetchPackages();

// ls command implementation for the Arch Linux terminal emulator

class LS {
    constructor() {
        // Initialization if needed
    }

    execute(args) {
        // Assuming args is an array of arguments passed to ls command.
        // Logic to list files and directories goes here.
        const fs = require('fs');
        const path = require('path');

        const dir = args[0] || '.'; // Default to current directory if no argument is provided

        fs.readdir(dir, (err, files) => {
            if (err) {
                console.error(`Error reading directory: ${err.message}`);
                return;
            }

            files.forEach(file => {
                console.log(file);
            });
        });
    }
}

module.exports = LS;

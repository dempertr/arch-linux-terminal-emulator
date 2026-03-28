const readline = require('readline');

// Create an interface for the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

// Function to process commands
function processCommand(command) {
    // Add your command processing logic here
    console.log(`Command received: ${command}`);
    // For example, you might handle certain commands differently
}

// Prompt the user for input
rl.prompt();

// Handle the input events
rl.on('line', (line) => {
    processCommand(line.trim()); // Process the command
    rl.prompt(); // Display the prompt again
}).on('close', () => {
    console.log('Terminal closed.');
    process.exit(0);
});
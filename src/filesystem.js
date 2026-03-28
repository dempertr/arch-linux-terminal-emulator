// Emulated Filesystem Implementation

class File {
    constructor(name, content = '') {
        this.name = name;
        this.content = content;
    }
}

class Directory {
    constructor(name) {
        this.name = name;
        this.subdirectories = {};
        this.files = {};
    }

    addDirectory(name) {
        this.subdirectories[name] = new Directory(name);
    }

    addFile(name, content) {
        this.files[name] = new File(name, content);
    }

    getFile(name) {
        return this.files[name];
    }

    getDirectory(name) {
        return this.subdirectories[name];
    }
}

class FileSystem {
    constructor() {
        this.root = new Directory('/');
    }

    addFile(path, content) {
        const parts = path.split('/').filter(Boolean);
        let currentDir = this.root;

        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!currentDir.getDirectory(part)) {
                currentDir.addDirectory(part);
            }
            currentDir = currentDir.getDirectory(part);
        }
        currentDir.addFile(parts[parts.length - 1], content);
    }

    readFile(path) {
        const parts = path.split('/').filter(Boolean);
        let currentDir = this.root;

        for (let i = 0; i < parts.length - 1; i++) {
            currentDir = currentDir.getDirectory(parts[i]);
            if (!currentDir) return null;
        }
        return currentDir.getFile(parts[parts.length - 1])?.content || null;
    }

    listDirectory(path) {
        const parts = path.split('/').filter(Boolean);
        let currentDir = this.root;

        for (const part of parts) {
            currentDir = currentDir.getDirectory(part);
            if (!currentDir) return null;
        }
        return {
            directories: Object.keys(currentDir.subdirectories),
            files: Object.keys(currentDir.files)
        };
    }
}

// Example Usage:
const fs = new FileSystem();
fs.addFile('/home/user/file.txt', 'This is a text file.');
console.log(fs.readFile('/home/user/file.txt')); // Outputs: This is a text file.
console.log(fs.listDirectory('/home/user')); // Outputs: { directories: [], files: [ 'file.txt' ] }

const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
// This sets the version of the yargs package, which is used for command-line argument parsing
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add', // Name of the command
    describe: 'Add a new note', // Description of the command
    builder: {
        title: {
            describe: 'Note title', // Description for the title argument
            demandOption: true, // Makes the title argument required
            type: 'string' // Specifies that the title argument should be a string
        },
        body: {
            describe: 'Note body', // Description for the body argument
            demandOption: true, // Makes the body argument required
            type: 'string' // Specifies that the body argument should be a string
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body) // Calls the addNote function from notes.js with the title and body arguments
    }
})

// Create remove command
yargs.command({
    command: 'remove', // Name of the command
    describe: 'Remove a note', // Description of the command
    builder: {
        title: {
            describe: 'Note title', // Description for the title argument
            demandOption: true, // Makes the title argument required
            type: 'string' // Specifies that the title argument should be a string
        }
    },
    handler(argv) {
        notes.removeNote(argv.title) // Calls the removeNote function from notes.js with the title argument
    }
})

// Create list command
yargs.command({
    command: 'list', // Name of the command
    describe: 'List your notes', // Description of the command
    handler() {
        notes.listNotes() // Calls the listNotes function from notes.js with no arguments
    }
})

// Create read command
yargs.command({
    command: 'read', // Name of the command
    describe: 'Read a note', // Description of the command
    builder: {
        title: {
            describe: 'Note title', // Description for the title argument
            demandOption: true, // Makes the title argument required
            type: 'string' // Specifies that the title argument should be a string
        }
    },
    handler(argv) {
        notes.readNote(argv.title) // Calls the readNote function from notes.js with the title argument
    }
})

// Parse the arguments and execute the corresponding command
yargs.parse()

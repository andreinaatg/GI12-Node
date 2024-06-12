const fs = require('fs') // File system module for reading and writing files
const chalk = require('chalk') // Chalk module for colored console output

// Function to add a new note
const addNote = (title, body) => {
    const notes = loadNotes() // Load existing notes
    const duplicateNote = notes.find((note) => note.title === title) // Check for duplicate titles

    if (!duplicateNote) {
        // If no duplicate, add new note
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes) // Save updated notes array
        console.log(chalk.green.inverse('New note added!')) // Success message
    } else {
        console.log(chalk.red.inverse('Note title taken!')) // Error message if duplicate title
    }
}

// Function to remove a note
const removeNote = (title) => {
    const notes = loadNotes() // Load existing notes
    const notesToKeep = notes.filter((note) => note.title !== title) // Filter out the note to be removed

    if (notes.length > notesToKeep.length) {
        // If a note was removed
        console.log(chalk.green.inverse('Note removed!')) // Success message
        saveNotes(notesToKeep) // Save updated notes array
    } else {
        console.log(chalk.red.inverse('No note found!')) // Error message if no note found
    }    
}

// Function to list all notes
const listNotes = () => {
    const notes = loadNotes() // Load existing notes

    console.log(chalk.inverse('Your notes')) // Header for notes list

    notes.forEach((note) => {
        console.log(note.title) // Print each note title
    })
}

// Function to read a specific note
const readNote = (title) => {
    const notes = loadNotes() // Load existing notes
    const note = notes.find((note) => note.title === title) // Find the note with the given title

    if (note) {
        // If note is found
        console.log(chalk.inverse(note.title)) // Print note title
        console.log(note.body) // Print note body
    } else {
        console.log(chalk.red.inverse('Note not found!')) // Error message if note not found
    }
}

// Function to save notes to the file system
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes) // Convert notes array to JSON string
    fs.writeFileSync('notes.json', dataJSON) // Write JSON string to 'notes.json' file
}

// Function to load notes from the file system
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json') // Read the 'notes.json' file
        const dataJSON = dataBuffer.toString() // Convert buffer to string
        return JSON.parse(dataJSON) // Parse JSON string to object
    } catch (e) {
        return [] // Return empty array if file does not exist or error occurs
    }
}

// Exporting functions to be used in other files
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

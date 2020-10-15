// Make constant express to call on the module
const express = require("express");
const fs = require("fs")
const path = require('path')
const { v4: uuidv4 } = require('uuid');

let notes = require('./db/db.json')

// Use app constant variable for express method
const app = express();

// Define the ports being used to display the information
const PORT = process.env.PORT || 3000;

// Parse information run through express (initally as urlencoded data then directly to JSON format)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Instructs the server to make these files static resources. 
// This means that all of our front-end code can now be accessed without having a specific server endpoint created for it!
app.use(express.static("public"));


// ======== THIS IS THE HTML ROUTES ================
// Route to go to INDEX page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Route to go to NOTES page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// ======== END OF HTML ROUTES ======================


// ======== THIS IS THE API ROUTES ================
app.get("/api/notes", function(req, res) {
    res.json(notes)
});

app.post("/api/notes", function(req, res) {
    console.log(req.body)
        // This modules will add in new id to the req.body using the uuid module
    req.body.id = uuidv4();

    // Push back in the information logged in back into the notes array
    // Then send back response in JSON format
    notes.push(req.body)
        // Would normally use writeFile for asynchronous functionality but for simplicity sake for a small project like this it will do.
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes)
});

app.delete("/api/notes/:id", function(req, res) {
    req.params.id
        // filter method will return new array thus the need to either set empty array to equal
    notes = notes.filter(n => {
        if (req.params.id === n.id) {
            return false
        } else {
            return true
        }
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes)
});
// ======== END OF API ROUTES ======================

// Starts the server to listen for requests
app.listen(PORT, function() {
    console.log(`API server now on port ${PORT}!`)
})
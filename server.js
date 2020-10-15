// Make constant express to call on the module
const express = require("express");
const fs = require("fs")

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

});

app.post("/api/notes", function(req, res) {

});

app.delete("/api/notes/:id", function(req, res) {

});
// ======== END OF API ROUTES ======================

// Starts the server to listen for requests
app.listen(PORT, function() {
    console.log(`API server now on port ${PORT}!`)
})
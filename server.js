const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

// Make constant express to call on the module
const express = require("express");

// Use app constant variable for express method
const app = express();

// Define the ports being used to display the information
const PORT = process.env.PORT || 3000;

// Parse information run through express (initally as urlencoded data then directly to JSON format)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Requires the app GET and POST methods out of routes folder
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Instructs the server to make these files static resources. 
// This means that all of our front-end code can now be accessed without having a specific server endpoint created for it!
app.use(express.static("public"));

// Starts the server to listen for requests
app.listen(PORT, function() {
    console.log(`API server now on port ${PORT}!`)
})
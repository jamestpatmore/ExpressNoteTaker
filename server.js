// * so i initially created a routes folder and was trying to do it the new age way for express instead of keeping everything
// on one file like this but it was a little harder for me to grasp and I figured i'd just go about it this way 
// anyways thank you for coming to my TED talk. 


// dependencies 
const { application } = require('express');
const fs = require('fs');
const express = requirte('express');
const path = require('path'); 

//inits the app 
const app = express();

// using cli domain OR the local port that i created
const PORT = process.env.PORT || 7777; 

// taking our data with express.json 
// serving our front end 
// aka middleware configuration for the project 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// route for the notes hmtl 
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});




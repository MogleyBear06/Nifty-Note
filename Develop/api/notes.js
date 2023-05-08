const notes = require('express').Router()
const noteList = require('../db/db.json')
const fs = require("fs");
const util = require('util')
const { v4: uuidv4} = require('uuid');

// GET
notes.get("/api/notes", (req, res) => {
    let data = fs.readFileSync("./db/db.json");
    data = JSON.parse(data)
    res.json(data);
});

// POST
notes.post("/api/notes", (req, res) => {

    // this takes the title and text properties from the request
    // body  which is the data that is sent from the client to 
    // server as a part of the HTTP request
    const { title, text } = req.body;

    // this creates a new note object with the title,
    // text and id properties. id is generated 
    // using the uuidv4() function from the uuid package
    const newNote = {
        title: title,
        text: text,
        id: uuidv4(),
    }

    // this reads the current contents of the ./db/db.json file 
    // and stores it in the data variable.
    let data = fs.readFileSync("./db/db.json");

    // this parses the data variable as JSON, converting it from a string to a 
    // JavaScript object.
    data = JSON.parse(data)

    // this adds newNote object to the data array
    data.push(newNote);

    //this writes the updated data array to the ./db/db.json file,
    // overwriting the previous contents.
    fs.writeFileSync('./db/db.json', JSON.stringify(data));

    // this parses the data variable again to ensure that
    // it is a JavaScript object, not a JSON  string.
    data = JSON.parse(data);

    // this sends the data variable back to the client as a JSON response,
    // indicating that the note was successfully created and providng
    // the updated list of notes.
    res.json(data);
});

// DELETE
notes.delete("/api/notes/:id", (req, res) => {
    let data = fs.readFileSync("./db/db.json");
    const id = req.params.id;
    data = JSON.parse(data);
    const filteredData = data.filter(note =>note.id !== id);
    fs.writeFileSync('./db/db.json', JSON.stringify(filteredData));
    res.json(filteredData);
});
  
module.exports = notes;

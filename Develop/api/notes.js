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
    const { title, text } = req.body;
    const newNote = {
        title: title,
        text: text,
        id: uuidv4(),
    }

    let data = fs.readFileSync("./db/db.json");

    data = JSON.parse(data)

    data.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(data));

    data = JSON.parse(data);

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

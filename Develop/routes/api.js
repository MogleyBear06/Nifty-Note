const router = require('express').Router()
const res = require('express/lib/response');
const fs = require("fs");
const path = require('path');
const uniqueID = require('uniqid')
const noteList = require('../../db/db.json')

router.get('/notes', (req, res) => {
    res.json(noteList)
    console.log(noteList)
    })


router.post('/notes', (req, res) => { 
    // set id based on a random unique id for each note
    req.body.id = uniqueID().toString();
    // set the body to the a var to be added to the notelist
    const note = req.body
    noteList.push(note)

   console.log('notelist' + noteList.toString())
   console.log(note)

    
       
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(noteList , null, 2)
      )
      res.json(note)
    })


router.delete('/notes/:id',(req,res) =>{
    const noteid = req.params.id

    console.log(noteid)
    
    for(let i = 0; i < noteList.length; i++){
        if(noteList[i].id === noteid){
            noteList.splice(i,1)
        }
    
    }
    res.json(noteList)
})
    
module.exports = router


const router = require('express').Router();
const fs = require('fs');


router.get('/notes', (req, res) => {
     fs.readFile('../db/db.json').then((data) => res.json(data));
});

router.get('/public/notes.html', (req, res) => {
     
})
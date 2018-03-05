'use strict';

const express = require('express');

const data = require('./db/notes');

const app = express();
app.use(express.static('public'));


//return array of notes
app.get('/api/notes', (req, res) => {
  res.json(data);
});



// Listen for incoming connections
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
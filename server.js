'use strict';

const express = require('express');

const data = require('./db/notes');

const app = express();
app.use(express.static('public'));


//verbose solution
app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm; 
  if (searchTerm) {
      let filteredList = data.filter(function(item) {
          return item.title.includes(searchTerm);
      });
    res.json(filteredList);
  } else {
  res.json(data);
};
//type in on postman ?searchTerm=lorem
// terse solution
// const {searchTerm } = req.query;
// res.json(searchTerm ? data.filter(item => item.title.includes(searchTerm)) : data);


//verbose solutution 
// const note = data.find(function(item) {
//     return item.id === Number(id);
// });
// res.json(note);


app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(item => item.id === Number(req.params.id)));
});

// Listen for incoming connections
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
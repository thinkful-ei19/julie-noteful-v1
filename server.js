'use strict';


const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config');

const data = require('./db/notes');
const simDB = require('./db/simDB');  
const notes = simDB.initialize(data); 

const app = express();
const notesRouter = require('./routers/notes.router');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use('/v1', notesRouter);


// app.get('/api/notes', (req, res, next) => {
//   const { searchTerm } = req.query;
  
//   notes.filter(searchTerm, (err, list) => {
//     if (err) {
//       return next(err); // goes to error handler
//     }
//     res.json(list); // responds with filtered array
//   });
// });


//verbose solution replaced by above
// app.get('/api/notes', (req, res) => {
//   const searchTerm = req.query.searchTerm; 
//   if (searchTerm) {
//     let filteredList = data.filter(function(item) {
//       return item.title.includes(searchTerm);
//     });
//     res.json(filteredList);
//   } else {
//     res.json(data);
//   }
// });

//example for error
app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

//type in on postman ?searchTerm=lorem
// terse solution
// const {searchTerm } = req.query;
// res.json(searchTerm ? data.filter(item => item.title.includes(searchTerm)) : data);


//verbose solutution 
// const note = data.find(function(item) {
//     return item.id === Number(id);
// });
// res.json(note);


// app.get('/api/notes/:id', (req, res, next) => {
//   const {id} = req.params; //returns string not number

//   notes.find(Number(id), (err,item) => {
//     if (err) {
//       return next(err);
//     }
//     res.json(item);
//   });
// //   res.json(data.find(item => item.id === Number(req.params.id)));
// });

// app.put('/api/notes/:id', (req, res, next) => {
//   const id = req.params.id;
  
//   /***** Never trust users - validate input *****/
//   const updateObj = {};
//   const updateFields = ['title', 'content']; //only these keys can be changed
  
//   updateFields.forEach(field => {
//     if (field in req.body) {
//       updateObj[field] = req.body[field];
//     }
//   });
  
//   notes.update(id, updateObj, (err, item) => {
//     if (err) {
//       return next(err);
//     }
//     if (item) {
//       res.json(item);
//     } else {
//       next();
//     }
//   });
// });


//404 error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

//custom error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});


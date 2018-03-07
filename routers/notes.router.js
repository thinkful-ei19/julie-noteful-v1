'use strict';


const express = require('express');
const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);


// Get All (and search by query)
router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;
  
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

// Get a single item
router.get('/notes/:id', (req, res, next) => {
  const {id} = req.params; //returns string not number

  notes.find(Number(id), (err,item) => {
    if (err) {
      return next(err);
    }
    res.json(item);
  });
});

// Put update an item
router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  const updateObj = {};
  const updateFields = ['title', 'content']; //only these keys can be changed
  
  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});



router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  notes.delete(id, (err, result)=> {
    if (err) {
      return next(err);
    }
    if (result) {
      res.sendStatus(204);
    } else {
      next();
    }
  });
});

module.exports = router;
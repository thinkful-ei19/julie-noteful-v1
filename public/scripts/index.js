/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();

  api.search({}) 
    .then(response => {
      store.notes = response;
      noteful.render();
    });

  



  const newNote = {
    title: 'new note',
    content: 'the body'
  };
  api.create(newNote, response => {
    console.log('new note', response);
  });

});
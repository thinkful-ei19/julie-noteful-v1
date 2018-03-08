/* global $ */
//frontend application
'use strict';
//makes requests to server I built (or any server)
//way to ask backend for data
const api = { //communicate with backend from frontend 
  
  search: function (query) {
    return $.ajax({
      type: 'GET',
      url: '/v1/notes/',
      dataType: 'json',
      data: query
    });
  },
  
  details: function (id) {
    return $.ajax({ //talking to api through endpoints
      type: 'GET',
      dataType: 'json',
      url: `/v1/notes/${id}`,
      data: id
    });
  },

  update: function(id, obj) {
    return $.ajax({
      type: 'PUT',
      url: `/v1/notes/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj)
    });
  },

  create: function (obj) {
    return $.ajax({
      type: 'POST',
      url: '/v1/notes',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj)
    });
  },

  remove: function(id) {
    return $.ajax({
      type: 'DELETE',
      url: `/v1/notes/${id}`,
      contentType: 'application/json'
    });
  }


}; 

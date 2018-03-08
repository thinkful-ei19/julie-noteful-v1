/* global $ */
//frontend application
'use strict';
//makes requests to server I built (or any server)
//way to ask backend for data
const api = { //communicate with backend from frontend 
  
  search: function (query, callback) {
    $.ajax({
      type: 'GET',
      url: '/v1/notes/',
      dataType: 'json',
      data: query,
      success: callback
    });
  },
  
  details: function (id, callback) {
    $.ajax({ //talking to api through endpoints
      type: 'GET',
      dataType: 'json',
      url: `/v1/notes/${id}`,
      success: callback //passes in results of api to the callback
    });
  },

  update: function(id, obj, callback) {
    $.ajax({
      type: 'PUT',
      url: `/v1/notes/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
      success: callback
    });
  },

  create: function (obj, callback) {
    $.ajax({
      type: 'POST',
      url: '/v1/notes',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj),
      success: callback
    });
  },

  remove: function(id, callback) {
    return $.ajax({
      type: 'DELETE',
      url: `/v1/notes/${id}`,
      contentType: 'application/json',
      success: callback,
    });
  }


}; 

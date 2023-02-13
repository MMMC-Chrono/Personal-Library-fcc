/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {

  const mongoose = require('mongoose')
  mongoose.connect(process.env['DB'])
          .then(() => console.log("-----connected mongoose successfully-----"))
          .catch((e) => console.log(e))

  const {
    getAllBooks,
    createBook,
    getSingleBook,
    addComment,
    deleteSingleBook,
    deleteAll
  } = require('../controllers/functions')


  app.route('/api/books')
    .get(getAllBooks)
    
    .post(createBook)
    
    .delete(deleteAll);

  app.route('/api/books/:id')
    .get(getSingleBook)
    
    .post(addComment)
    
    .delete(deleteSingleBook)
};

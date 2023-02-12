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
    getSingleBook
  } = require('../controllers/functions')


  app.route('/api/books')
    .get(getAllBooks)
    
    .post(createBook)
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(getSingleBook)
    // function (req, res){
    //   let bookid = req.params.id;
    //   //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    // }
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};

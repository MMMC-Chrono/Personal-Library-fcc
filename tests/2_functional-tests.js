/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Books = require('../models/Books')

chai.use(chaiHttp);

suite('Functional Tests', function() {

    beforeEach( async () => {
        await new Promise(resolve => setTimeout(resolve, 700));
        console.log("----------------------");
    });

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done) {
    chai.request(server)
      .get('/api/books')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {

        let newBook = {
          title: 'Gap',
          commentcount: 0
        }
        chai
          .request(server)
          .post('/api/books')
          .send(newBook)
          .end(function(err, res) {
            if (err) console.log(err)
            const { body } = res
            assert.equal(res.status, 200)
            assert.isObject(res.body)
            assert.property(res.body, "title")
            done()
          })
      });

      test('Test POST /api/books with no title given', function(done) {

        let newBook = {
          title: '',
          commentcount: 0
        }
        chai
          .request(server)
          .post('/api/books')
          .send(newBook)
          .end(function(err, res) {
            if (err) console.log(err)
            assert.equal(res.status, 200)
            assert.strictEqual(res.text, 'missing required field title')
            done()
          })
      });

    });


    suite('GET /api/books => array of books', function() {

      test('Test GET /api/books', function(done) {
        chai
          .request(server)
          .get('/api/books')
          .end(function(err, res) {
            if (err) console.log(err)
            const { body } = res;
            assert.equal(res.status, 200)
            assert.isArray(body)
            body.forEach((field) => {
              assert.property(field, '_id')
              assert.property(field, 'title')
              assert.property(field, 'commentcount')
            });
            done()
          })
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function() {

      test('Test GET /api/books/[id] with id not in db', function(done) {
        chai
          .request(server)
          .get('/api/books/63ea90b68b35057afdfa4999')
          .end(function(err, res) {
            if (err) console.log(err)
            assert.equal(res.status, 200)
            assert.deepEqual(res.text, "no book exists")
            done()
          })
      });

      test('Test GET /api/books/[id] with valid id in db', function(done) {
        let book = new Books({
          title: 'Gap',
          commentcount: 0
        })
        book.save((err, book) => {
          chai
            .request(server)
            .get(`/api/books/${book._id}`)
            .end(function(err, res) {
              if (err) console.log(err)
              const { body } = res;
              assert.equal(res.status, 200)
              assert.property(body, 'title')
              assert.property(body, 'comments')
              done()
            })
        })
      });

    });

    suite('POST /api/books/[id] => add comment/expect book object with id', function() {

      test('Test POST /api/books/[id] with comment', function(done) {
        let book = new Books({
          title: 'testing book',
          commentcount: 0
        })
        book.save((err, book) => {
          chai
            .request(server)
            .post(`/api/books/${book._id}`)
            .send({
              comment: 'just a test'
            })
            .end((err, res) => {
              if (err) console.log(err)
              const { body } = res;
              assert.equal(res.status, 200)
              assert.isObject(body)
              assert.property(body, 'title')
              assert.property(body, 'comments')
              assert.property(body, 'commentcount')
              done()
            })
        })
      });

      test('Test POST /api/books/[id] without comment field', function(done) {
        let book = new Books({
          title: 'testing book 2',
          commentcount: 0
        })
        book.save((err, book) => {
          chai
            .request(server)
            .post(`/api/books/${book._id}`)
            .send({
              comment: ''
            })
            .end((err, res) => {
              if (err) console.log(err)
              assert.equal(res.status, 200)
              assert.deepEqual(res.text, "missing required field comment")
              done()
            })
        })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done) {
        let book = new Books({
          title: 'testing book 2',
          commentcount: 0
        })
        book.save((err, book) => {
          chai
            .request(server)
            .post(`/api/books/1234567890`)
            .send({
              comment: 'testing'
            })
            .end((err, res) => {
              if (err) console.log(err)
              assert.equal(res.status, 200)
              assert.deepEqual(res.text, "no book exists")
              done()
            })
        })
      })

    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done) {
        let book = new Books({
          title: 'delete book',
          commentcount: 0
        })
        book.save((err, book) => {
          chai
            .request(server)
            .delete(`/api/books/${book._id}`)
            .end((err, res) => {
              if (err) console.log(err)
              assert.equal(res.status, 200)
              assert.deepEqual(res.text, "delete successful")
              done()
            })
        })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done) {
        let book = new Books({
          title: 'delete book',
          commentcount: 0
        })
        book.save((err, book) => {
          chai
            .request(server)
            .delete(`/api/books/1234567890`)
            .end((err, res) => {
              if (err) console.log(err)
              assert.equal(res.status, 200)
              assert.deepEqual(res.text, "no book exists")
              done()
            })
        })
      });

    });

  })
})
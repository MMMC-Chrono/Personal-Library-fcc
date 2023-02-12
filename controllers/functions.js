const Books = require('../models/Books')

const getAllBooks = async(req, res) => {
  const allBook = await Books.find().select(' title commentcount')
  return res.status(200).json(allBook)
}

const createBook = async(req, res) => {
    const { title } = req.body;

    if ( typeof(title) !== 'string' || title.trim() === '') {
        return res.status(200).send("missing required field title")
    }

    let book = await Books.create({
      title,
      commentcount: 0
    })
    return res.status(200).json({title: book.title, _id: book._id})
}

const getSingleBook = async(req, res) => {
  let bookid = req.params.id;
  console.log(bookid)
  let book = await Books.findById({_id: bookid})
  // console.log(book)
}

module.exports = {
  getAllBooks,
  createBook,
  getSingleBook
}
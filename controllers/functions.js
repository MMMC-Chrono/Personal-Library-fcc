const Books = require('../models/Books')

const getAllBooks = async (req, res) => {
  const allBook = await Books.find().select(' title commentcount')
  return res.status(200).json(allBook)
}

const createBook = async (req, res) => {
  const { title } = req.body;

  if (typeof (title) !== 'string' || title.trim() === '') {
    return res.status(200).send("missing required field title")
  }

  let book = await Books.create({
    title,
    commentcount: 0
  })
  return res.status(200).json({ title: book.title, _id: book._id })
}

const getSingleBook = async (req, res) => {
  let bookid = req.params.id;
  if (bookid.split('').length !== 24) {
    return res.status(200).send('no book exists')
  }
  let book = await Books.findById({ _id: bookid }).select('title comments')

  if (!book) {
    return res.status(200).send('no book exists')
  }

  return res.status(200).json(book)
}

const addComment = async (req, res) => {
  let bookid = req.params.id;
  let comment = req.body.comment;
  if (typeof (comment) !== 'string' || comment.trim() === '') {
    return res.status(200).send("missing required field comment")
  }
  if (bookid.split('').length !== 24) {
    return res.status(200).send("no book exists")
  }
  let book = await Books.findById(bookid)
  if (!book) {
    return res.status(200).send("no book exists")
  }
  let comment_list = book.comments
  comment_list.push(comment)
  book.commentcount = comment_list.length
  await book.save()
  return res.status(200).json(book)
}

const deleteSingleBook = async (req, res) => {
  let bookid = req.params.id;
  if (bookid.split('').length !== 24) {
    return res.status(200).send("no book exists")
  }
  let book = await Books.findByIdAndDelete(bookid)
  if (!book) {
    return res.status(200).send("no book exists")
  }
  return res.status(200).send("delete successful")
}

const deleteAll = async (req, res) => {
  let delete_all = await Books.deleteMany()
  return res.status(200).send("complete delete successful")
}


module.exports = {
  getAllBooks,
  createBook,
  getSingleBook,
  addComment,
  deleteSingleBook,
  deleteAll
}
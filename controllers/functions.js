const Books = require('../models/Books')

const createBook = async(req, res) => {
    const { title } = req.body;

    if ( title === "") {
        return res.status(200).send("missing required field title")
    }

    let book = await Books.create({
        title
    })

    return res.status(200).send(book)
    
}

module.exports = {
    createBook
}
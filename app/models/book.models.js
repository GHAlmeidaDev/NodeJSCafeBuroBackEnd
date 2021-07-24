const mongoose = require('mongoose')

const Books = mongoose.Schema({
    name: String,
    image: String,
    books: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', Books);
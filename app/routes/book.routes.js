module.exports = (app) => {
    const books = require('../controllers/book.controller.js');

    app.post('/books', books.create);

    app.get('/books', books.findAll);

    app.get('/books/:id', books.findOne);

    app.put('/books/:id', books.update);

    app.delete('/books/:id', books.delete);
}
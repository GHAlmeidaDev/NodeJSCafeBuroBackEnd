

module.exports = (app) => {

    require('dotenv/config');
    const secret = process.env.API_SECRET
    const books = require('../controllers/book.controller.js');

    app.post(`/api/books/${secret}`, books.create);

    app.get(`/api/books/${secret}`, books.findAll);

    app.get(`/api/books/${secret}/:id`, books.findOne);

    app.put(`/api/books/${secret}/:id`, books.update);

    app.delete(`/api/books/${secret}/:id`, books.delete);
}
const Book = require('../models/book.models.js')

exports.create = (req, res) => {
    if(!req.body.image) {
        return res.status(400).send ({
            message: "Conteúdo Vazio"
        });
    }

    const book = new Book({
        name: req.body.name || "Sem título",
        image: req.body.image, 
        books: req.body.books
    });

    book.save()
    .then(data =>  {
        res.send(data);
    }).catch(err => {
        res.status(500).send ({
            message: err.message || "Erro"
        })
    })
};

exports.findAll = (req, res) => {
    Book.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erro"
        })
    })
};

exports.findOne = (req, res) => {
    Book.findById(req.params.id)
    .then(book => {
        if(!book) {
            return res.status(400).send({
                message: "Não encontrado" + req.params.id
            });
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'Object') {
            return res.status(404).send({
                message: "Não encontrado" + req.params.id 
            });
        }

        return res.status(500).send({
            message: "Erro" + req.params.id
        })
    })
};

exports.update = (req, res) => {

    if(!req.body.image) {
        return res.status(400).send({
            message: "Vazio"
        });
    }

    Book.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Sem título",
        image: req.body.image,
        books: req.body.books
    }, {new: true})
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Não encontrado" + req.params.id
            });
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === "Object") {
            return res.status(404).send({
                message: "Não encontrado" + req.params.id
            });
        }

        return res.status(500).send({
            message: "Erro" + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.id)
    .then(book => {
        if(!book){
        return res.status(404).send({
            message: "Não encontrado" + req.params.id
        });
    }
    res.send({message:"Livro Excluído"});
    }).catch(err => {
        if(err.kind === "Objeto" || err.name === 'Não existe') {
            return res.status(404).send({
                message: "Não encontrado" + req.params.id
            });
        }
        
        return res.status(500).send({
            message: "Não foi possível excluir" + req.params.id
        })
    })
}
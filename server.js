const express = require('express');
var cors = require('cors')
const app = express();

const dbconfig = require('./config/database.config');

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect(dbconfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Sucesso')
}).catch(err => {
    console.log('Erro', err);
    process.exit();
})

app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.json({"message": "Olá"})
});

require('./app/routes/book.routes')(app);

app.listen(3001, () => {
    console.log("Rodando")
    
});


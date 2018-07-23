var express = require('express');
var bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();
app.use(bodyParser.json());



app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET todos
app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {

        res.send({todos});

    }, (e) => {
        res.status(400).send(e);
    });

});

//server port
app.listen('3000', () => {
    console.log("server running..");
});

module.exports = { app };
require ('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');


var app = express();
app.use(bodyParser.json());

var port = process.env.PORT;

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

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        Todo.findById(req.params.id).then((todo) => {
            if (!todo) {
                res.status(404).send({ "message": "Not found" })
            }
            res.send(todo);
        }).catch((e) => {
            res.status(400).send(e);
        });
    } else {
        res.status(400).send({ "message": "unable to find" });
    }
});

// GET todos
app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {

        res.send({ todos });

    }, (e) => {
        res.status(400).send(e);
    });

});

//DELETE todos/:id

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {

        return res.status(404).send({ message: "Invalid Id" });
    }


    Todo.findByIdAndRemove(id).then((doc) => {
        res.send(doc);
    }, (err) => {
        res.send(err);
    });


});

// PATCH /todos/:id

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ message: "Invalid Id" });
    }

    var body = _.pick(req.body, ['text', 'completed']);
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((doc) => {

            if (!doc) {
                return res.status(404).send({ message: "Not found" });
            }
            res.send(doc);


        }).catch((e) => {
            res.status(400).send(e);
        });

});

//server port
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

module.exports = { app };
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { authenticate } = require('./middleware/authenticate');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');


var app = express();
app.use(bodyParser.json());

var port = process.env.PORT;

// POST /todos
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET todos/:id

app.get('/todos/:id', authenticate, (req, res) => {

    var id = req.params.id;
    if (ObjectID.isValid(id)) {

        Todo.findOne({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
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
app.get('/todos', authenticate, (req, res) => {

    Todo.find({
        _creator: req.user._id
    }).then((todos) => {

        res.send({ todos });

    }, (e) => {
        res.status(400).send(e);
    });

});

//DELETE todos/:id

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {

        return res.status(404).send({ message: "Invalid Id" });
    }


    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((doc) => {
        res.send(doc);
    }, (err) => {
        res.send(err);
    });


});

// PATCH /todos/:id

app.patch('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOneAndUpdate({

        _id: id,
        _creator: req.user._id
    }, { $set: body }, { new: true })
        .then((doc) => {

            if (!doc) {
                return res.status(404).send({ message: "Not found" });
            }
            res.send(doc);


        }).catch((e) => {
            res.status(400).send(e);
        });

});

//POST /users

app.post('/users', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })

});

// POST users/login

app.post('/users/login', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });

    }).catch((e) => {
        res.status(404).send(e);
    });

});

// GET users/me

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// DELETE users/me/token


app.delete('/users/me/token', authenticate, (req, res) => {

    req.user.removeToken(req.token).then(() => {
        res.send({ message: "Logged out successfully." });
    }, (e) => {
        res.status(400).send(e);
    });

});


//server port
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

module.exports = { app };
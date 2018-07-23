var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID}  = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

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
    
    var id= req.params.id;
    if(ObjectID.isValid(id)){
    Todo.findById(req.params.id).then((todo)=>{
        if(!todo){
            res.status(404).send({"message":"Not found"})
        }
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send(e);
    });
}else{
    res.status(400).send({"message":"unable to find"});
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

//server port
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

module.exports = { app };
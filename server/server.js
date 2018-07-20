var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});


// user schema

var User = mongoose.model('User', {

    email: {
        required: true,
        type: String,
        trim: true,
        minlength: 3
    }
});

var user = new User({
    email: "  amit@gmail.com  "
});

user.save().then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});

// var newTodo = new Todo({
//     text: "My todo",
//     completed: true,
//     completedAt: 2

// });

// newTodo.save().then((doc) => {
//     console.log(doc);
// }, (err) => {
//     console.log(err);
// });


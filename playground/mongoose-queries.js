const { mongoose } = require('./../server/db/mongoose');

const { User } = require('./../server/models/user');

var id = '5b55a935beb6883b184f5fb4';

User.find().then((users) => {
    console.log(users);
}, (err) => {
    console.log(err);
});

User.find({
    _id:id
}).then((users) => {
    console.log(users);
}, (err) => {
    console.log(err);
});

User.findById(id).then((user) => {
    console.log("By ID",user);
}, (err) => {
    console.log(err);
});
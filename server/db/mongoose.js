var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://root:Welcome_2018@ds137687.mlab.com:37687/monnodejs'
  };
//   mongoose.connect(db.mlab || db.localhost);

mongoose.connect('mongodb://root:Welcome_2018@ds137687.mlab.com:37687/monnodejs');
// mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};
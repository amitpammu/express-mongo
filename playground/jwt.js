const jwt = require('jsonwebtoken');

var data = {
    id: 4
};

var token = jwt.sign(data, "abc");
console.log(token);
var decoded = jwt.verify(token, "abc");
console.log(decoded);
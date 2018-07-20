const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log("Unable to connect!");
    }
    console.log("Connected to mongodb");
    const db = client.db('TodoApp');

    //insert records
    // db.collection('users').insertOne({
    //     name: "Amit kumar",
    //     age: 26,
    //     location: "New Dwlhi",
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Unable to add User");
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    client.close();
});
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log("Unable to connect!");
    }
    console.log("Connected to mongodb");
    const db = client.db('TodoApp');

    // db.collection('todos').find({completed:true}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch todos');
    // });
    db.collection('users').find({ name: "Amit kumar" }).count().then((count) => {
        console.log(`Count is ${count}`);
    }, (err) => {
        console.log('error while fetching')
    })
    client.close();
});
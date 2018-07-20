const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log("Unable to connect!");
    }
    console.log("Connected to mongodb");
    const db = client.db('TodoApp');

    // deleteMany
    //deleteOne//
    //findOneAndDelete

    db.collection('todos').findOneAndDelete({ text: "B" }).then((res) => {    
        console.log('records deleted');
        
    }, (err) => {
        console.log('error while deleting records');
    })
    client.close();
});
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log("Unable to connect!");
    }
    console.log("Connected to mongodb");
    const db = client.db('TodoApp');

    //findOneAndUpdate

    db.collection('users').findOneAndUpdate(
        {
            _id: new ObjectID('5b51b756ae1126e618b76859')
        },
        {
            $set: { name: "Mr Pam" },
            $inc: { age: 1}
        }, 
        {
            returnOriginal: false
        }).then((result) => {

            console.log(result);

        }, (error) => {
            console.log(error);

        });

    client.close();
});
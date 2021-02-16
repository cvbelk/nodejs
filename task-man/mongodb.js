//declaring connection instances
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
//setting configuration
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
//establishing MongoClient construction
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('MongoClient: unable to connect to db!');
    }

    const db = client.db(databaseName); //also creates a new db if not exists
    //insert one document method
    // db.collection('users').insertOne({
    //     name: 'Oleh',
    //     age : 34
    // }, (error, result) => {
    //     //callback for asynchronous use *not necessary
    //     if (error) {
    //         return console.log('Cannot insert');
    //     }
    //     console.log(result.ops); //array with results(documents)
    // });
    
    // db.collection('users').insertMany([
    //     {
    //         name: 'Andrew',
    //         age: 27
    //     }, {
    //         name: 'Jen',
    //         age: 28    
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Cannot insertMany' + error);
    //     } 
    //     console.log(result.ops);
    // });
//challenge lesson 76
    db.collection('tasks').insertMany([
        {
            description: 'Feed the cat',
            completed: true
        }, {
            description: 'Walk the dog',
            completed: true
        }, {
            description: 'Dig the duck',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Cannot insertMany to tasks' + error);
        } 
        console.log(result.ops);
    });
    
});
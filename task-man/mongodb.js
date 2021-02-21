//declaring connection instances
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const {MongoClient, ObjectID} = require('mongodb'); //shorthand

//setting configuration
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//const id = new ObjectID();
//console.log('generated id: ' + id);
//console.log('timestamp bytes: ' + id.getTimestamp());
//console.log(id.id);
//console.log(id.toHexString());
//establishing MongoClient construction
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('MongoClient: unable to connect to db!');
    }

    const db = client.db(databaseName); //also creates a new db if not exists
    //insert one document method
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age : 26
    // }, (error, result) => {
    //     //callback for asynchronous use *not necessary
    //     if (error) {
    //         return console.log('Cannot insert');
    //     }
    //     console.log(result.ops); //array with results(documents)
    // });
    
    // db.collection('users').insertMany([
    //     {
    //         name: 'duck',
    //         age: 26
    //     }, {
    //         name: 'goose',
    //         age: 26   
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Cannot insertMany' + error);
    //     } 
    //     console.log(result.ops);
    // });

    //lesson 78, fetching data from db: find and findOne
    //find by id
    // db.collection('users').findOne({
    //     _id: new ObjectID("602a9f3ff1413f2560d51831")
    // }, (error, result) => {
    //     if (error) {
    //         return console.log(`Unable findOne: ${error}`);
    //     }
    //     console.log('found: ',  result);
    // });
    
    // db.collection('users').find({age: 34}).toArray((error, results) => {
    //     if (error) {
    //         return console.log(`Unable find: ${error}`);
    //     }
    //     console.log(results);
    // });
    // //fields count
    // db.collection('users').find({age: 34}).count((error, results) => {
    //     if (error) {
    //         return console.log(`Unable find: ${error}`);
    //     }
    //     console.log(results);
    // });
 
//UPDATE VALUES======with PROMISES=======================

    // db.collection('users').updateOne({
    //     _id: new ObjectID("602a9c03f6bb9a04909818f6")    
    //     }, {
    //         // $set: {
    //         //     name: 'troll'
    //         // },
    //         $inc: {
    //             age: -1   //it can inc or dec
    //         }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set: {
    //         completed: true
    //     }    
    // }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // });

    // db.collection('users').deleteMany({
    //     age: 23
    // }).then((result) => {
    //     console.log('documents deleted:', result.deletedCount);
    // }).catch((err) => {
    //     console.log('Error catched', err);
    // });

    db.collection('users').deleteOne({age: 23})
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log('Error catched', err);
        })
});
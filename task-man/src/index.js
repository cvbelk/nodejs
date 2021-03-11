const express = require('express'); 
require('./db/mongoose'); //just execute the connection
const userRouter = require('./routers/user'); // router for user
const taskRouter = require('./routers/task');
const bcrypt = require('bcryptjs'); //pass hashing lib
const app = express();
const port = process.env.port || 3000 ;

app.use(express.json()); //automatically parse incomming json's to objects
app.use(userRouter); //using routers
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

//table relations in mongoose(go watch the models)
// const Task = require('./models/task');
// const User = require('./models/user');
// const main = async () => {
    //find a user that ownes that task
    // const task = await Task.findById('604a301b42fbbe1164444517');
    // await task.populate('owner').execPopulate(); //relation with Users in schema
    // console.log(task.owner); //printing user document by id in owner
       
    //find all tasks for given user
//     const user = await User.findById('604a26b5ffba8d2250911774');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }
// main();

//JSON operations overloading
// const pet = {
//     name: 'Hal'
// }
// pet.toJSON = function() {
//     console.log(this);
//     return {};
// }
// console.log(JSON.stringify(pet));

//middleware intercepting requests
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// });

//jsonwebtoken usage
// const jwt = require('jsonwebtoken');
// const myFunction = async () => {
//     const token = jwt.sign(
//         { _id: 'abc123' }, 
//         'thisismynewcourse', 
//         { expiresIn: '7 days'});
//     console.log(token);

//     const data = jwt.verify(token, 'thisismynewcourse');
//     console.log(data);
// }
// myFunction();
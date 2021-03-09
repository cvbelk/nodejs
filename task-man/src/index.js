const express = require('express'); 
require('./db/mongoose'); //just execute the connection
//const ModelUser = require('./models/user'); 
//const ModelTask = require('./models/task');
const userRouter = require('./routers/user'); // router for user
const taskRouter = require('./routers/task');
const app = express();
const port = process.env.port || 3000 ;
app.use(express.json()); //automatically parse incomming json's to objects

app.use(userRouter); //using routers
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
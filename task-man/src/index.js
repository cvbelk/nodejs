const express = require('express'); 
require('./db/mongoose'); //just execute the connection
const ModelUser = require('./models/user'); 
const ModelTask = require('./models/task');
const app = express();
const port = process.env.port || 3000 ;
app.use(express.json()); //automatically parse incomming json's to objects

app.post('/users', (req, res) => {
    const user = new ModelUser(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
    
});

app.get('/users', (req, res) => {
    ModelUser.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    ModelUser.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
    //console.log(req.params);
});

app.post('/tasks', (req, res) => {
    const task = new ModelTask(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    });
    
});

app.get('/tasks', (req, res) => {
    ModelTask.find({}).then((tasks) => {
        res.status(200).send(tasks);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    ModelTask.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send(); //if empty, no mathes found, not an error
        }
        res.status(200).send(task);
    }).catch((error) => {
        res.status(500).send(error);
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
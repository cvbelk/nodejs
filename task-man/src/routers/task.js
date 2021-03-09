const express = require('express');
const ModelTask = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new ModelTask(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(e);
    }    
});

router.get('/tasks', async (req, res) => {
    try {
        const taskList = await ModelTask.find({});
        res.status(200).send(taskList);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await ModelTask.findById(_id);
        if (!task) {
            return res.status(404).send({error: 'Not found!'});
        }
        res.status(200).send(task);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.put('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        return res.status(400).send({error: 'invalid property'});
    }

    try {
        const task = await ModelTask.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        if (!task) {
            return res.status(404).send({error: 'Not found!'});
        }
        res.status(200).send(task);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
       const result = await ModelTask.findByIdAndDelete(_id);
       if(!result) {
         return res.status(404).send({error: 'Not found!'});
       }
       res.status(200).send(result);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports  = router;
const express = require('express');
const ModelTask = require('../models/task');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    //const task = new ModelTask(req.body);
    const task = new ModelTask({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(e);
    }    
});

router.get('/tasks', auth, async (req, res) => {
    try {
        //const taskList = await ModelTask.find({owner: req.user._id});
        //res.status(200).send(taskList);
        //it cat be done with populate(), just another working method
        await req.user.populate('tasks').execPopulate();
        res.status(200).send(req.user.tasks);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        //if task owner is logged in
        //const task = await ModelTask.findById(_id);
        const task = await ModelTask.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send({error: 'Not found!'});
        }
        res.status(200).send(task);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.put('/tasks/:id', auth, async (req, res) => {
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
        const task = await ModelTask.findOne({_id, owner: req.user._id});
        if (!task) {
            return res.status(404).send({error: 'Not found!'});
        }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.status(200).send(task);
    } catch(e) {
        res.status(400).send(e.message);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
       const result = await ModelTask.findOneAndDelete({_id, owner: req.user._id});
       if(!result) {
         return res.status(404).send({error: 'Not found!'});
       }
       res.status(200).send(result);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports  = router;
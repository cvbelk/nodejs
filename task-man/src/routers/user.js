const express = require('express');
const ModelUser = require('../models/user');
const router = new express.Router();

// router.get('/test', (req, res) => {
//     res.send('message from router');
// });

router.post('/users', async (req, res) => {
    const user = new ModelUser(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch(e) {
        res.status(400).send(e);
    }
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });    
});

router.get('/users', async (req, res) => {
    try {
        const userList = await ModelUser.find({});
        res.status(200).send(userList);
    } catch(e) {
        res.status(500).send(e);
    }
    // ModelUser.find({}).then((users) => {
    //     res.status(200).send(users);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // });
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await ModelUser.findById(_id);
        if (!user) {
            return res.status(404).send({error: 'Not found!'});
        }
        res.status(200).send(user);
    } catch(e) {
        res.status(500).send(e);
    }
    // ModelUser.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }
    //     res.status(200).send(user);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // });
});

router.put('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body); // grabbing request json properties names into array
    const allowedUpdates = ['age','name', 'email', 'password'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if(!isValidOperation) {
        return res.status(400).send({error: 'invalid property'});
    }

    try {
        const user = await ModelUser.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        if (!user) {
            return res.status(404).send({error: 'Not found!'});
        }
        res.status(200).send(user);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
       const result = await ModelUser.findByIdAndDelete(_id);
       if(!result) {
         return res.status(404).send({error: 'Not found!'});
       }
       res.status(200).send(result);
    } catch(e) {
        res.status(500).send(e);
    }
});


module.exports = router;
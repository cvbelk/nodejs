const express = require('express');
const ModelUser = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/users', async (req, res) => {
    const user = new ModelUser(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token } );
    } catch(e) {
        res.status(400).send(e);
    }
});

//auth
router.post('/users/login', async (req, res) => {
    try {
        const user = await ModelUser.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        //sending without password, tokens
        res.send({user, token});
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send();
    } catch(e) {
        res.status(500).send();
    }
});
//logout all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();

    } catch(e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);

});

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const user = await ModelUser.findById(_id);
//         if (!user) {
//             return res.status(404).send({error: 'Not found!'});
//         }
//         res.status(200).send(user);
//     } catch(e) {
//         res.status(500).send(e);
//     }
// });

router.put('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body); // grabbing request json properties names into array
    const allowedUpdates = ['age','name', 'email', 'password'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if(!isValidOperation) {
        return res.status(400).send({error: 'invalid property'});
    }

    try { 
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.status(200).send(req.user);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
       //const result = await ModelUser.findByIdAndDelete(req.user._id);
        await req.user.remove();
       res.status(200).send(req.user);
    } catch(e) {
        res.status(500).send(e);
    }
});


module.exports = router;
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ModelTask = require('../models/task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age cannot be less then zero!');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        //minlength: 7 - or validate
        validate(value) {
            if (value.length <= 6 || validator.contains(value.toLowerCase(), 'password')) {
                throw new Error('Invalid password!');
            }
        }
    }, //auth
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//relationship for task
//virtual field
userSchema.virtual('tasks', {
    ref: 'Tasks',    //ref name like declared in model
    localField: '_id',
    foreignField: 'owner'
});

//---------------auth
//instance methods
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');
    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    return token;   
}
//overloading
//generating output without secure props in ALL routes, otherwise rename, and use {user: myFunc():Object}
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.tokens; //delete property
    delete userObject.password;
    return userObject;
}
//static methods
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await ModelUser.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error ('wrong password');
    }
    return user;
}

//middleware: userSchema.pre - before action, userSchema.post - after
userSchema.pre('save', async function(next) { //before user is saved
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next(); // important to call !
});
//delete user tasks when user is removed
userSchema.pre('remove', async function(next){
    const user = this;
    await ModelTask.deleteMany({owner: user._id});
    next();
});

const ModelUser = mongoose.model('User', userSchema);  //mongoose pluralizes 'User' into collection name 'users' by default
module.exports = ModelUser;

const mongoose = require('mongoose');
const validator = require('validator');

const ModelUser = mongoose.model('User', {  //mongoose pluralizes 'User' into collection name 'users' by default
    name: {
        type: String,
        required: true,
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
    }
});

// const person = new User({
//    name: 'Oleh3',
//    email: 'cvbelk@gmail.com ',
//    age: 34,
//    password: '  paSsword'
// });

// person.save().then(() => {
//     console.log(person);  //without resolve in then, because resolve = preson
// }).catch ((error) => {
//     console.log('Error saving:', error);
//     mongoose.disconnect();
// });

module.exports = ModelUser;
const mongoose = require('mongoose');
const validator = require('validator');

const ModelTask = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// const task = new ModelTask({
//     description: 'drop the cat  ',
//    completed: true
// });

// task.save().then(() => {
//     console.log(task);
//     mongoose.disconnect();
// }).catch((error) => {
//     console.log(error);
//     mongoose.disconnect();
// });

module.exports = ModelTask;

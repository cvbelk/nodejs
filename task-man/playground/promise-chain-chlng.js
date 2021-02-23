require('../src/db/mongoose');
const ModelTask = require('../src/models/task');

ModelTask.findOneAndDelete({_id: '602fd0b9f5567f1474e50b00'}).then((task) => {
    console.log(task);
    //return ModelTask.find({completed: false});
    return ModelTask.countDocuments({completed: false});
}).then((count) => {
    console.log(count); //count.length if .find() method used
}).catch((e) => {
    console.log(e);
});


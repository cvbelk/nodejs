require('../src/db/mongoose');
const ModelUser = require('../src/models/user');

//602fead755d6920bd029917e

ModelUser.findByIdAndUpdate('602febd6cd703019a0e6e558', {age: 34}).then((user) => {
    console.log(user);
    return ModelUser.countDocuments({age: 34});
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});
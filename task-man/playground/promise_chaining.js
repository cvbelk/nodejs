require('../src/db/mongoose');
const ModelUser = require('../src/models/user');

//602fead755d6920bd029917e

// ModelUser.findByIdAndUpdate('602febd6cd703019a0e6e558', {age: 34}).then((user) => {
//     console.log(user);
//     return ModelUser.countDocuments({age: 34});
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await ModelUser.findByIdAndUpdate(id, {age});
    const count = await ModelUser.countDocuments({age});
    return {user, count};
} 

updateAgeAndCount('602fead755d6920bd029917e', 4).then(({user, count}) => {
    console.log('updated user:', user);
    console.log('Count of users:', count);
}).catch((e) => {
    console.log('Error:', e);
});
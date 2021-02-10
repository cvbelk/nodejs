// setTimeout(()=>{
//     console.log('Two sec are up');
// }, 2000);

// const nams = ['eleven', 'two', 'three'];
// const shortNames = nams.filter((num) => {
//     return num.length <=4;
// });

// const geoCode = (addess, callback) => {
//  setTimeout(() => {
//     const data = {
//         lat: 0,
//         lon: 0
//     }
//     callback(data);
//  }, 2000)
// };

// geoCode('Kiev', (data) => {
//     console.log(data);
// });

//links.mead.io/cllback
const add = (foo, bar, callback) => {
    setTimeout(() => {
        callback(foo+bar);
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})

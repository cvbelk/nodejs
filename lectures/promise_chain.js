const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
}
//without chaining
// add(1, 2).then((sum) => {
//     console.log(sum);
//     add(sum, 5).then((sum2) => {
//         console.log(sum2);
//     });
// }).catch((err) => {
//     console.log(err);
// });

//with chaining, no nesting

add(1, 2).then((sum) => {
    console.log(sum);
    return add(sum, 5);
}).then((sum2) => {
    console.log(sum2);
}).catch((e) => {
    console.log(e);
});
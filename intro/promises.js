const doWorkCallback = (callback) => {
    setTimeout(() => {
        callback('my error', undefined);
        callback(undefined, [3, 5, 7]);
    }, 2000);
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error);
    } 
    console.log(result);
});
//=============================================
const doWorkPromise = new Promise((resolve, reject) =>{
    setTimeout(() => {
        //resolve([7, 5, 3]);
        reject('My error');
    }, 2000)
});

doWorkPromise.then((result) => {
    console.log('Success: ', result);
}).catch((err) => {
    console.log('Error: ', err);
});


const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
               return reject('Numbers must be >= 0');
            }
            resolve(a + b);
        }, 2000);
    });
}

const doWork = async () => {
    // throw new Error('smth wrong');
    // return 'andrew';
    const sum = await add(5, 70);
    const sum2 = await add(sum, 10);
    const sum3 = await add(sum2, -10);
    return sum3;
}

doWork().then((r) => {
    console.log('result:', r);
}).catch((e) => {
    console.log(e);
});
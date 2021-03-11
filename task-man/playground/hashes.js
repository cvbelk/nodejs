const bcrypt = require('bcryptjs');

const myFunc = async () => {
    const passw = "Red12345!";
    const hashedPassw = await bcrypt.hash(passw, 8); //8 - hashing cycles

    console.log(passw);
    console.log(hashedPassw);

    const isMatch = await bcrypt.compare('Red12345!', hashedPassw);
    console.log(isMatch);
}

myFunc();
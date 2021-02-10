//obj property shorthand

const name = 'Oleh';
const userAge = 34;
// const user = {
//     name: name,
//     age: userAge,
//     location: 'Philadelphia'
// }

//shorthand: if property has the same name as variable
const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user);

//object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label;
// const stock = product.stock;
// const {label: productLabel, stock, rating = 5} = product; //rating default value
// console.log(productLabel);
// console.log(stock);
// console.log(rating); //undefined if no value given
const transaction = (type, {label, stock = 0 } = {}) => {
    console.log(type, label, stock);
}
transaction('order', product);

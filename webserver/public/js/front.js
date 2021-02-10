const elm = document.querySelector('#color');
elm.addEventListener('click', function(e){
    e.target.style.color = 'red';
});

// const getForecast = (userAddress = "Lviv") => {
//     return fetch(`http://127.0.0.1:3000/weather?address=${userAddress}`).then((response) => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             throw new Error('unable to fetch data');
//         }
//     }).then((data) => {
//         return data;
//     });
// } 

// getForecast("Kiev").then((data) => {
//     console.log(data);
//     elm.textContent = "address: " + data.user_address + " geolocation: " + data.geo_location + 
//     " temperature: " + data.temperature + " feels_like: " + data.feels_like + 
//     " weather_description:" + data.weather_description;
// }).catch((error) => {
//     console.log(`error fetch occured: ${error} `);
// }); 
let userAddress = "!"; 
fetch(`http://127.0.0.1:3000/weather?address=${userAddress}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log('Error occured: ' + data.error);
        } else {
            console.log(data);
        }    
    })
})

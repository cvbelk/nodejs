const getForecast = (userAddress) => {
    return fetch(`http://127.0.0.1:3000/weather?address=${userAddress}`).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('unable to fetch data');
        }
    }).then((data) => {
        return data;
    });
}

const weatherForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const forecastPar = document.querySelector('#forecastPar');
const errorPar = document.querySelector('#errorPar');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredLocation =  searchInput.value;
    forecastPar.textContent = 'Loading...';
    errorPar.textContent = '';
    getForecast(enteredLocation).then((data) => {
        if (data.error) {
            errorPar.textContent = `${data.error} `;                        
        } else {
            forecastPar.innerHTML = `Forecast for: <b>${data.geo_location}</b> <br>`;
            forecastPar.innerHTML += `<br>Temperature: <b>${data.temperature}</b><br>` 
            forecastPar.innerHTML += `<br>Feels like: <b>${data.feels_like}</b><br>`;
            forecastPar.innerHTML += `<br>Weather description: <b>${data.weather_description}</b>`;
        }
    }).catch((error) => {
        errorPar.textContent = `error fetch occured: ${error} `;
    }); 
});
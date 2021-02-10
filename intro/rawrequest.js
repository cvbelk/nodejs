const http = require('http');
const url = "http://api.weatherstack.com/current?access_key=b4345b7a8b9b50522d143182a18dd654&query=50.25,30.5";
const clog = console.log;

const request = http.request(url, (response) => {
    let data = '';
    //on() - event handler
    response.on('data', (chunk) => {
        data += chunk.toString();
        
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        clog(body);

    });
});

request.on('error', (error) => {
    clog('An error: ', error);
})
request.end();
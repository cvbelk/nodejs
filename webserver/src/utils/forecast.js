const request = require('postman-request');

const foreCast = (cordinates, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b4345b7a8b9b50522d143182a18dd654&query=' + 
    encodeURIComponent(cordinates.join());
    request({url, json: true}, function (error, {body}) {
        if (error){
            callback(`Weatherstack: ${error}`, undefined);
        } else if(body.error){
            callback('Weatherstack: Unable to find location', undefined);    
        } else {

            //const data = body;
            const {location, current } = body;
            //console.log(body);
            callback(undefined, {location, current});
        }
    })    
    }
    
    module.exports = foreCast;
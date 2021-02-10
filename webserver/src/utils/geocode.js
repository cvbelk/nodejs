const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoiY3ZiZWxrIiwiYSI6ImNra3NpbmNjdDBhODAycG1zbW5tMXIzOXAifQ.mXjJYB2BWrKFd0oxrPA4oA&limit=1';

    request({url, json: true}, function (error, {body}) {
        if (error){
            callback(`Connection fail: ${error}`, undefined);
        } else if(body.features.length === 0) {
            callback(`Unable to find location: ${body.query}`, undefined); 
        } else {
            const {place_name, center: latLon} = body.features[0];
            callback(undefined, {geoLocation: place_name, lat: latLon[0], lon: latLon[1]});
  
        }            
    });
}


module.exports = geoCode;
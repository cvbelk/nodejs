const express = require('express'); 
const hbs = require('hbs');
const path = require('path');

const geoCode = require('./utils/geocode.js');
const foreCast = require('./utils/forecast.js');
const { join } = require('path');

const app = express();
const portHeroku = process.env.PORT || 3000; //for heroku deploy 

//define paths for express config
const publicDir = path.join(__dirname, '../public'); // __dirname and __filename are like $_SERVER[]
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//tip: to update server when hbs file was changed: nodemon src/app.js -e js,hbs
//npm i hbs - express addon
app.set('view engine', 'hbs'); //Setup handlebar engine
app.set('views', viewsPath); //Setup views location
hbs.registerPartials(partialsPath); 
app.use(express.static(publicDir)); //setup static directory to serve

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Oleh Bilokrylyi'
    }); //values goes to index.hbs like in php
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Oleh Bilokrylyi'
    }); //values goes to index.hbs like in php
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Oleh Bilokrylyi',
        helpText: 'Very helpful text'
    }); 
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide a location'});
    } 
    geoCode(req.query.address, (error, {geoLocation, lat, lon} = {}) => {
        if (error) {
            return res.send({error});
        }
            foreCast([lon, lat], (error, {current}) => {
                if (error) {
                    return res.send({error});
                }

                res.send({
                    lat_lon: `${lon}, ${lat}`,
                    user_address: req.query.address,
                    geo_location: geoLocation,
                    temperature: current.temperature,
                    feels_like: current.feelslike,
                    weather_description: current.weather_descriptions[0]
                });
            });
    });

});

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
       return res.send({error: 'You must provide a search term'});
       //return used to end the function, there can be only one res.send
    } 
    res.send({
        products: []
    });
});

//for nested directories
app.get('/help/*', (req, res) => {   
    const wrongUrl = req.url;
    //res.send('Help article for: "' + wrongUrl.substring(6) + '" not found.');
    res.render('404', {
        title: '404',
        name: 'Oleh Bilokrylyi',
        errMessage: 'Help article for: "' + wrongUrl.substring(6) + '" not found.'       
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Oleh Bilokrylyi',
        errMessage: 'Page not found, please check your url'
    });
});
  
app.listen(portHeroku, () => {
    console.log('Server is up on port ' + portHeroku);
});
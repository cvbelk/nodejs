const clog = console.log;
const chalk = require('chalk');
const geoCode = require('./utils/geocode.js');
const foreCast = require('./utils/forecast.js');

const userLocation = process.argv[2];
if(!userLocation) {
    clog(chalk.red('Please provide an address'));
} else {
    geoCode(userLocation, (error,{location, lat, lon} = {}) => {
        if (error) {
            return clog(chalk.red(error));
        }
            clog(`Info for ` + chalk.green(`${location}`));
            clog(`Longtitude:`+ chalk.green(` ${lon}, `) + ` Latitude:`+ chalk.green(` ${lat}`));

            foreCast([lon, lat], (error,{location, current}) => {
                if (error) {
                    return clog(chalk.red(error));
                }
                    clog(chalk.green("===================foreCast======================="));
                    clog(`Location: ` + chalk.blue(` ${location.name}, ${location.country}`));
                    clog(`It is currently` + chalk.blue(` ${current.temperature} `) +
                    `degrees out. It feels like `+ chalk.blue(`${current.feelslike}`) + ` degrees out.`);
                    clog(`Weather description:` + chalk.blue(` ${current.weather_descriptions[0]}`));            
            });
    });
}



const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const weatherAPI = `http://api.weatherstack.com/current?access_key=4082054d35b1e65cc7b2b142dcaef17d&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request(weatherAPI, {json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
            )
        }
    })
}


module.exports = forecast
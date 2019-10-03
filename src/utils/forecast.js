const request = require ('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/65ea0ae41c04dd47f8fe9dbb1bcee5a9/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. High for today:' + body.daily.data[0].temperatureHigh + 'Low for today:' + body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast

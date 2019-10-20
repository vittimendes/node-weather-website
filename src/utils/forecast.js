const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3294396536ad8a8a2cb1e6151ad4bc3d/'+ encodeURIComponent(latitude) +', ' +  encodeURIComponent(longitude) +'?lang=pt&units=si'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to forecast service', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, {
                dailySummary : body.daily.data[0].summary,
                dailyHigh: body.daily.data[0].temperatureHigh,
                dailyLow: body.daily.data[0].temperatureLow,
                temperature : body.currently.temperature,
                precipProbability : body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast
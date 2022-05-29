import request from "request";

export default ({longitude, latitude, location}, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=fe0512896288c0cd375cb94181901afb&query=${latitude},${longitude}&units=f`;
    request({url, json: true},
        function (error, response) {
            if (error) {
                callback('Unable to connect to weather service!', undefined);
            } else if (response.body.error) {
                callback('Unable to find location', undefined);
            } else {
                const {temperature, feelslike, weather_descriptions} = response.body.current;
                const weather_data = `${weather_descriptions[0]}. it is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`;
                callback(undefined, {current: weather_data, location})
            }

        }
    )
}
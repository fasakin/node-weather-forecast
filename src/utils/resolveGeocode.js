import request from "request";

export default (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZmFzYWtpbmlmZWRheW8iLCJhIjoiY2wzajlxeTJ2MGV5ZzNrbW5zZmdyMGtyMiJ9.xqQLE1wgpQ5cquRRRJQQ-w`;

    request({url, json: true}, (error, response) => {

        if (error) {
            callback('Unable to connect to geocoding service', undefined);
        } else if (response.body.message) {
            callback('Location not found!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location. Please input a valid search address!', undefined);

        } else {
            const {features} = response.body;

            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })

        }

    });
}

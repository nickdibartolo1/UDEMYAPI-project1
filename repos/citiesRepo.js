let fs = require('fs');
const FILE_NAME = './assets/cities.json'

//accessing the data from cities.json through fs
let citiesRepo = {
    get: function (resolve, reject) {
        fs.readFile(FILE_NAME, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }

        });
    },

    // help find specific id in JSON file
    getByID: (id, resolve, reject) => {
        fs.readFile(FILE_NAME, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                let city = JSON.parse(data).find(p => p.id == id);
                resolve(city);
            }
        });

    },

    // perform a search - search function takes in searchObject. If no error data is parsed
    // out to cities, then perform a search. If searchObject is valid (valid data), then figure what specific pieces of data.
    // if it is an ID it will check ID, if name it will check name while also eliminiating case sensitivity, if valid they are set to true,
    //it is then resolved and sent to the client.
    search: (searchObject, resolve, reject) => {
        fs.readFile(FILE_NAME, (err, data) => {
            if (err) {
                reject(err);

            } else {
                let cities = JSON.parse(data);

                if (searchObject) {
                    cities = cities.filter(
                        c => (searchObject.id ? c.id == searchObject.id : true) &&
                            (searchObject.name ? c.name.toLowerCase().indexOf(searchObject.name) >= 0 : true))
                }
                resolve(cities);
            }
        })

    }
};

module.exports = citiesRepo;
let fs = require('fs');
const FILE_NAME = './assets/cities.json'

//accessing the data from cities.json through fs
let citiesRepo = {
    get: function (resolve, reject){
        fs.readFile(FILE_NAME, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }

        });
    }
};

module.exports = citiesRepo;
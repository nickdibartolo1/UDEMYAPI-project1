// bring in express server and create app
let express = require('express')
let app = express();
let citiesRepo = require('./repos/citiesRepo')


//express router object
let router = express.Router();



//create GET to return a list of cities
//(getting data from a file (cities.json))
router.get('/', (req, res, next) => {
    citiesRepo.get((data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All cities retrieved",
            "data": data
        });
    }, (err) => {
        next(err)
    })
});


//configure the router so all routers are prefixed with /api/v1
app.use('/api', router);


//create the server to listen to a PORT
const server = app.listen(5000, () => {
    console.log('Node server running on PORT 5000')
});


// bring in express server and create app
let express = require('express')
let app = express();
let citiesRepo = require('./repos/citiesRepo');


//express router object
let router = express.Router();


//create GET to return a list of cities - Route Router
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


//create the GET/search to search for cities for by ID or name - Search Router
//search?id=n&name=str
router.get('/search', (req, res, next) => {
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };


    citiesRepo.search(searchObject, (data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Search retrieved",
            "data": data
        });

    }), (err) => {
        next(err)
    }
});


//create the router that uses an id calling the getByID function - getByID Router
router.get('/:id', (req, res, next) => {
    citiesRepo.getByID(req.params.id, (data) => {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "City retrieved",
                "data": data
            });
        }
        else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The city with the id '" + req.params.id + "' could not be found :(",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The city with the id '" + req.params.id + "' could not be found :("
                }
            })
        }
    }, (err) => {
        next(err);
    })
})


//configure the router so all routers are prefixed with /api/v1
app.use('/api', router);


//create the server to listen to a PORT
const server = app.listen(5000, () => {
    console.log('Node server running on PORT 5000')
});


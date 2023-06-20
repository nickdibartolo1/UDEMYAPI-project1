// bring in express server and create app
let express = require('express')
let app = express();
let citiesRepo = require('./repos/citiesRepo');
let CORS = require('cors')


//express router object
let router = express.Router();

//set up middleware to support JSON data parsing in request object
app.use(express.json());

// needed to allow CORS for all request
app.use(CORS());




// ROUTERS BELOW //
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
//(pairs with search function in citiesRepo.js)
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

//post request router for adding data (pairs with insert function in citiesRepo.js)
router.post("/", (req, res, next) => {
    citiesRepo.insert(req.body, (data) => {
        res.status(201).send({
            "status": 201,
            "statusText": "Created",
            "message": "new city added",
            "data": data
        });
        (err) => {
            next(err)
        }
    });
})

//put router is updating new data by looking for a specific ID.
// (pairs with update function in citiesRepo.js)
router.put('/:id', (req, res, next) => {
    citiesRepo.getByID(req.params.id, (data) => {
        if (data) {
            //if we find a city we attempt to update data here
            citiesRepo.update(req.body, req.params.id, (data) => {
                res.status(201).send({
                    "status": 201,
                    "statusText": "OK",
                    "message": "city '" + req.params.id + "' updated",
                    "data": data
                });
            })
        }
        else {
            //if no data is found this error is returned
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
    })
})

//delete router is looking for JSON data to delete through its ID.
// (pairs with delete function in citiesRepo.js)
router.delete('/:id', (req, res, next) => {
    citiesRepo.getByID(req.params.id, (data) => {
        if (data) {
            //attempt to delete this item
            citiesRepo.delete(req.params.id, (data) => {
                res.status(200).json({
                    "status": 201,
                    "statusText": "OK",
                    "message": "The city '" + req.params.id + "' has been deleted",
                    "data": "The city '" + req.params.id + "' has been deleted"
                })
            })
        } else {
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
        next(err)
    })
})



//configure the router so all routers are prefixed with /api/v1
app.use('/api', router);


//create the server to listen to a PORT
const server = app.listen(5000, () => {
    console.log('Node server running on PORT 5000')
});


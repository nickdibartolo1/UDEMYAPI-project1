// bring in express server and create app
let express = require('express')
let app = express();


//express router object
let router = express.Router();

//create GET to return a list of cities
router.get('/', (req, res, next) => {
    res.send("Boston");
});

//configure the router so all routers are prefixed with /api/v1
app.use('/api', router);

//create the server to listen to a PORT

const server = app.listen(5000, () => {
    console.log('Node server running on PORT 5000')
});


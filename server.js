const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
let db               = require('./config/db-settings');
const app            = express();
const port           = 8000;
var compression = require('compression');
var helmet = require('helmet');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Allow cookies
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

MongoClient.connect(db.url, (error, database) => {
    if (error) {
        return console.log(error);
    } 
    db = database.db(db.name);

    require('./api/routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });               
});
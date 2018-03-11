const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
let db               = require('./config/db-settings');
const app            = express();
const port           = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

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
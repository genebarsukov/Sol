var sanitize = require('mongo-sanitize');
var ObjectID = require('mongodb').ObjectID;
const appSettings = require('../../config/app-settings');
const dbSettings = require('../../config/app-settings');
const appPath = appSettings.path;
const dbName = dbSettings.name;

/**
 * The following routes are defined
 * 
 * GET Single record by id:     appPath/record/<id>
 * GET All records:             appPath/allRecords
 * POST Insert record:          appPath/record/new
 * PUT Update record by id:     appPath/record/<id>
 * DELETE Single record by id:  appPath/record/<id>
 */

module.exports = function(app, db) {
    
    // GET Single record by id
    app.get(appPath + '/record/:id', (req, res) => {
        const id = sanitize(req.params.id);
        console.log(id);
        const idObject = {
            _id: new ObjectID(id)
        };
        db.collection(dbName).findOne(idObject, (error, result) => {
            if (error) {
                res.send({ 'error': 'error getting' }); 
                console.log(error);
            } else {
                res.send('got: ' + result._id);
                console.log('got: ' + result._id);
            } 
        });
    });

    // GET All records
    app.get(appPath + '/all', (req, res) => {
        db.collection(dbName).find({}).toArray((error, result) => {
            if (error) {
                res.send({ 'error': 'error getting all records' }); 
                console.log(error);
            } else {
              //  res.writeHead(200, {'Access-Control-Allow-Origin': 'true'});
                res.send(result);
                console.log(result);
            } 
        });
    });

    // POST Insert record
    app.post(appPath + '/record/new', (req, res) => {
        const record = {
            year: '2000',
            month: '1',
            kwh: '0',
            bill: '0',
            savings: '0'
        };
        db.collection(dbName).insert(record, (error, result) => {
          if (error) {
            res.send({ 'error': 'error inserting' }); 
            console.log(error);
          } else {
            res.send('inserted: ' + sanitize(record._id));
            console.log('inserted: ' + sanitize(record._id));
          }
        });
    });

    // PUT Update record by id
    app.put(appPath + '/record/:id', (req, res) => {
        const id = sanitize(req.params.id);
        const idObject = {
            _id: new ObjectID(id)
        };
        console.log(id);
        console.log(req.body);

        const record = {
            year: sanitize(req.body.year) ? sanitize(req.body.year) : '',
            month: sanitize(req.body.month) ? sanitize(req.body.month) : '',
            kwh: sanitize(req.body.kwh) ? sanitize(req.body.kwh) : '',
            bill: sanitize(req.body.bill) ? sanitize(req.body.bill) : '',
            savings: sanitize(req.body.savings) ? sanitize(req.body.savings) : ''
        };
        console.log(record);
        db.collection(dbName).update(idObject, record, (error, result) => {
          if (error) {
            res.send({ 'error': 'error updating' }); 
            console.log(error);
          } else {
            res.send('updated: ' + id);
            console.log('updated: ' + id);
          }
        });
    });

    // DELETE Single record by id
    app.delete(appPath + '/record/:id', (req, res) => {
        const id = sanitize(req.params.id);
        const idObject = {
            _id: new ObjectID(id)
        };
        db.collection(dbName).remove(idObject, (error, result) => {
            if (error) {
                res.send({ 'error': 'error deleting' }); 
                console.log(error);
            } else {
                res.send('deleted: ' + id);
                console.log('deleted: ' + id);
            } 
        });
    });

};
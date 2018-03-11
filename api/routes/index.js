const solRoutes = require('./sol-routes');
module.exports = function(app, db) {
  solRoutes(app, db);
  // Other route groups could go here, in the future
};
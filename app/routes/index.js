const user = require('./user.routes');
const checklist = require('./checklist.routes');

module.exports = (app, express) => {
  app.use('/api/users', user(express.Router()));
  app.use('/api/checklists', checklist(express.Router()));
  return app;
};
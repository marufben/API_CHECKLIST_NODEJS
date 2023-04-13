const user = require('../controllers/userController');
const {authJwt} = require("../middlewares")

module.exports = (router) => {
  router.get('/',[authJwt.verifyToken], user.getUser);
  router.post('/register', user.signup);
  router.post('/login', user.signin);

  return router;
};
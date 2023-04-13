const checklist = require('../controllers/checklistController');
const {authJwt} = require("../middlewares")

module.exports = (router) => {
  router.get('/',[authJwt.verifyToken], checklist.getChecklist);
  router.post('/',[authJwt.verifyToken], checklist.add);
  router.delete('/:id',[authJwt.verifyToken], checklist.delete);
  router.get('/:id/item',[authJwt.verifyToken], checklist.getItemAll);
  router.post('/:id/item',[authJwt.verifyToken], checklist.addItem);
  router.get('/:id/item/:item',[authJwt.verifyToken], checklist.getItemById);
  router.put('/:id/item/:item',[authJwt.verifyToken], checklist.setStatusById);
  router.delete('/:id/item/:item',[authJwt.verifyToken], checklist.deleteItemById);
  router.put('/:id/item/rename/:item',[authJwt.verifyToken], checklist.renameItemById);

  return router;
};
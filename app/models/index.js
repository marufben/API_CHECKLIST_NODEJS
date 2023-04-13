const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 1,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.checklist = require("./checklist.model.js")(sequelize, Sequelize);
db.checklistItem = require("./checklistItem.model.js")(sequelize, Sequelize);

db.checklistItem.belongsTo(db.checklist, {
  foreignKey: "checklist_id",
  as: "checklist",
});
db.checklist.hasMany(db.checklistItem, {
  foreignKey: "checklist_id",
  as: "items",
});

module.exports = db;
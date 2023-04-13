const { Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Checklist extends Model {
   
  }
  Checklist.init(
    {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
    },
    {
      // options
        sequelize,
        modelName: 'Checklist',
        tableName: 'checklists',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscore: true
    },
  );
  return Checklist;
};
const { Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class ChecklistItem extends Model {
   
  }
  ChecklistItem.init(
    {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
    },
    item_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
    },
    {
      // options
        sequelize,
        modelName: 'ChecklistItem',
        tableName: 'checklist_items',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscore: true
    },
  );
  return ChecklistItem;
};
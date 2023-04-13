const { Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class User extends Model {
   
  }
  User.init(
    {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
    },
    fullname: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    password:Sequelize.STRING,
    email: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
    },
    {
      // options
        sequelize,
        modelName: 'User',
        tableName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscore: true
    },
  );
  return User;
};
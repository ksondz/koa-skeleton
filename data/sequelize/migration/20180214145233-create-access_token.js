
const TokenTypeEnum = require('./../../../module/auth/enum/TokenTypeEnum');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('access_token', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: true,
      },
      token: {
        type: Sequelize.TEXT,
        values: TokenTypeEnum.getValues(),
        field: 'token',
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM,
        field: 'type',
        values: TokenTypeEnum.getValues(),
        allowNull: true,
      },
      expDate: {
        type: Sequelize.DATE,
        field: 'exp_date',
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('access_token');
  },
};

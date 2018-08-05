
const TokenTypeEnum = require('../../../module/oauth/enum/TokenTypeEnum');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('verification_token', {
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
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      token: {
        type: Sequelize.TEXT,
        field: 'token',
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM,
        field: 'type',
        values: TokenTypeEnum.getValues(),
        defaultValue: TokenTypeEnum.ACCESS_TOKEN_TYPE,
        allowNull: true,
      },
      expiredAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'expired_at',
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'updated_at',
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('verification_token');
  },
};

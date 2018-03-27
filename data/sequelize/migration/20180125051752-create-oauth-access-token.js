
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('oauth_access_token', {
      accessToke: {
        type: Sequelize.STRING,
        field: 'access_toke',
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      expires: {
        type: Sequelize.DATE,
        field: 'expires',
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('oauth_access_token');
  },
};

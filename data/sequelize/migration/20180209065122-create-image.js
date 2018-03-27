

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('image', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: true,
      },
      path: {
        type: Sequelize.STRING,
        field: 'path',
        allowNull: true,
      },
      extension: {
        type: Sequelize.STRING,
        field: 'extension',
        allowNull: true,
      },
      size: {
        type: Sequelize.STRING,
        field: 'size',
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('image');
  },
};

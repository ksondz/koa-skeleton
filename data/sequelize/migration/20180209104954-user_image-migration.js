
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_image', {
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
      imageId: {
        type: Sequelize.INTEGER,
        field: 'image_id',
        allowNull: true,
      },
      isDeleted: {
        type: Sequelize.INTEGER,
        field: 'is_delete',
        defaultValue: 0,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user_image');
  },
};

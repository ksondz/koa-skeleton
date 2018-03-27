
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('template_image', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      templateId: {
        type: Sequelize.INTEGER,
        field: 'template_id',
        allowNull: false,
      },
      imageId: {
        type: Sequelize.INTEGER,
        field: 'image_id',
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('template_image');
  },
};

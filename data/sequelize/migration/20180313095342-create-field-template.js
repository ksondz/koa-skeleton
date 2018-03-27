module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'templates',
      'data',
      {
        type: Sequelize.JSON,
        field: 'data',
        allowNull: true,
      },
    );
    queryInterface.addColumn(
      'templates',
      'tags',
      {
        type: Sequelize.JSON,
        field: 'tags',
        allowNull: true,
      },
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('template', 'data');
    queryInterface.removeColumn('template', 'tags');
  },
};

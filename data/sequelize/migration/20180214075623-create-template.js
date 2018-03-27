const TemplateLayoutEnum = require('./../../../module/template/enum/TemplateLayoutEnum');
const TemplateTypeEnum = require('./../../../module/template/enum/TemplateTypeEnum');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('templates', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        field: 'title',
        allowNull: false,
      },
      html: {
        type: Sequelize.TEXT,
        field: 'html',
        allowNull: true,
      },
      layout: {
        type: Sequelize.ENUM,
        values: TemplateLayoutEnum.getValues(),
        field: 'layout',
        allowNull: true,
      },
      path: {
        type: Sequelize.TEXT,
        field: 'path',
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM,
        values: TemplateTypeEnum.getValues(),
        field: 'type',
        allowNull: true,
      },
      // TODO name enum
      status: {
        type: Sequelize.INTEGER,
        field: 'status',
        defaultValue: 0,
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
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('templates');
  },
};

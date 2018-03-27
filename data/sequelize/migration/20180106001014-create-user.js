
const UserRoleEnum = require('./../../../module/user/enum/UserRoleEnum');
const UserStateEnum = require('./../../../module/user/enum/UserStateEnum');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.INTEGER,
        field: 'parent_id',
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        field: 'username',
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: true,
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name',
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM,
        values: UserRoleEnum.getValues(),
        field: 'role',
        defaultValue: UserRoleEnum.TEACHER_USER_ROLE,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        field: 'description',
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        field: 'password',
        allowNull: true,
      },
      state: {
        type: Sequelize.ENUM,
        values: UserStateEnum.getValues(),
        field: 'state',
        defaultValue: UserStateEnum.BLOCKED_USER_STATE,
        allowNull: false,
      },
      forgotToken: {
        type: Sequelize.STRING,
        field: 'forgot_token',
        allowNull: true,
      },
      passwordUpdatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'password_updated_at',
        allowNull: false,
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
    return queryInterface.dropTable('user');
  },
};


const UserRepository = require('./../repository/UserRepository');

const UserRoleEnum = require('./../enum/UserRoleEnum');
const UserStateEnum = require('./../enum/UserStateEnum');

module.exports = (sequelize, DataTypes) => {

  const modelName = 'User';

  const tableName = 'user';

  const schema = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      field: 'description',
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: UserRoleEnum.getValues(),
      field: 'role',
      defaultValue: UserRoleEnum.USER_ROLE,
      allowNull: true,
    },
    state: {
      type: DataTypes.ENUM,
      values: UserStateEnum.getValues(),
      field: 'state',
      defaultValue: UserStateEnum.ACTIVE_USER_STATE,
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at', allowNull: false },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at', allowNull: false },
  };

  const options = {
    tableName,
    timestamps: true,
  };

  const extractProperties = [
    'id',
    'email',
    'firstName',
    'lastName',
    'role',
    'description',
  ];


  const User = sequelize.define(modelName, schema, options);

  User.repository = UserRepository;

  User.extractProperties = extractProperties;

  return User;
};


const UserRepository = require('./../repository/UserRepository');
const UserExtractor = require('./../extractor/UserExtractor');

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
    parent_id: {
      type: DataTypes.INTEGER,
      field: 'parent_id',
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      field: 'username',
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
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
    forgotToken: {
      type: DataTypes.STRING,
      field: 'forgot_token',
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: UserRoleEnum.getValues(),
      field: 'role',
      defaultValue: UserRoleEnum.TEACHER_USER_ROLE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      allowNull: true,
    },
    state: {
      type: DataTypes.ENUM,
      values: UserStateEnum.getValues(),
      field: 'state',
      defaultValue: UserStateEnum.ACTIVE_USER_STATE,
      allowNull: false,
    },
    passwordUpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'password_updated_at',
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at', allowNull: false },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at', allowNull: false },
  };

  const options = {
    tableName,
    timestamps: true,
    associate: (models) => {
      const { Image, Templates } = models;
      User.belongsToMany(Image, { as: 'images', through: 'UserImage', foreignKey: 'user_id' });
      User.hasMany(Templates, { as: 'templates', foreignKey: 'user_id' });
      User.hasMany(User, { as: 'ParentUser', foreignKey: 'parent_id' });
    },
  };

  const extractProperties = [
    'id',
    'email',
    'username',
    'role',
    'parent_id',
    'firstName',
    'lastName',
    'description',
    'passwordUpdatedAt',
  ];


  const User = sequelize.define(modelName, schema, options);

  User.repository = UserRepository;
  User.extractor = UserExtractor;
  User.extractProperties = extractProperties;

  return User;
};

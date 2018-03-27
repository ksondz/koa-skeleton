
const AccessTokenRepository = require('./../repository/AccessTokenRepository');

const TokenTypeEnum = require('./../enum/TokenTypeEnum');


module.exports = (sequelize, DataTypes) => {

  const modelName = 'AccessToken';

  const tableName = 'access_token';

  const schema = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      field: 'type',
      values: TokenTypeEnum.getValues(),
      allowNull: true,
    },
    token: {
      type: DataTypes.TEXT,
      field: 'token',
      allowNull: true,
    },
    expiredAt: {
      type: DataTypes.DATE,
      field: 'expired_at',
      allowNull: true,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at', allowNull: false },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated_at', allowNull: false },
  };

  const options = {
    tableName,
    timestamps: true,
    associate: (models) => {
      const { User } = models;
      AccessToken.belongsTo(User, { as: 'User', foreignKey: 'user_id' });
    },
  };

  const extractProperties = [
    'id',
    'email',
    'userName',
    'role',
    'firstName',
    'lastName',
    'description',
  ];


  const AccessToken = sequelize.define(modelName, schema, options);

  AccessToken.repository = AccessTokenRepository;
  AccessToken.extractProperties = extractProperties;


  User.isExpired = () => {
    return this.expiredAt >
  };

  return AccessToken;
};

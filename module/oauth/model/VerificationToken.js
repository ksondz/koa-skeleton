
const VerificationTokenRepository = require('./../repository/VerificationTokenRepository');

const TokenTypeEnum = require('./../enum/TokenTypeEnum');


module.exports = (sequelize, DataTypes) => {

  const modelName = 'VerificationToken';

  const tableName = 'verification_token';

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
      references: {
        model: 'user',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    token: {
      type: DataTypes.TEXT,
      field: 'token',
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      field: 'type',
      values: TokenTypeEnum.getValues(),
      defaultValue: TokenTypeEnum.ACCESS_TOKEN_TYPE,
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
      const { VerificationToken, User } = models;
      VerificationToken.belongsTo(User, { as: 'User', foreignKey: 'user_id' });
    },
  };

  const extractProperties = [
    'token',
    'type',
    'expiredAt',
    'createdAt',
  ];

  const VerificationToken = sequelize.define(modelName, schema, options);

  VerificationToken.repository = VerificationTokenRepository;
  VerificationToken.extractProperties = extractProperties;

  return VerificationToken;
};

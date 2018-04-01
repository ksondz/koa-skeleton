
const userRoleEnum = require('./../../../module/user/enum/UserRoleEnum');
const userStateEnum = require('./../../../module/user/enum/UserStateEnum');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        email: 'rick.sanchez@gmail.com',
        first_name: 'Rick',
        last_name: 'Sanchez',
        password: '$2a$10$D.Tj/k/oHunzopbux43JfOoaXKDootPFwoutU0Q.mnOyBWdOcmfxu',
        // 1234
        state: userStateEnum.ACTIVE_USER_STATE,
        role: userRoleEnum.ADMIN_ROLE,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        email: 'morty.smith@gmail.com',
        first_name: 'Morty',
        last_name: 'Smith',
        password: '$2a$10$D.Tj/k/oHunzopbux43JfOoaXKDootPFwoutU0Q.mnOyBWdOcmfxu',
        // 1234
        state: userStateEnum.ACTIVE_USER_STATE,
        role: userRoleEnum.USER_ROLE,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};

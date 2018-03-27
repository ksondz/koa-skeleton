
const userRoleEnum = require('./../../../module/user/enum/UserRoleEnum');
const userStateEnum = require('./../../../module/user/enum/UserStateEnum');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        email: 'teacher@gmail.com',
        first_name: 'Teacher',
        last_name: 'Last name',
        password: '$2a$10$D.Tj/k/oHunzopbux43JfOoaXKDootPFwoutU0Q.mnOyBWdOcmfxu',
        // 1234
        state: userStateEnum.ACTIVE_USER_STATE,
        role: userRoleEnum.TEACHER_USER_ROLE,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        password_updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        username: 'student1',
        first_name: 'Student',
        last_name: 'Last name',
        // 1234
        password: '$2a$10$D.Tj/k/oHunzopbux43JfOoaXKDootPFwoutU0Q.mnOyBWdOcmfxu',
        state: userStateEnum.ACTIVE_USER_STATE,
        role: userRoleEnum.STUDENT_USER_ROLE,
        parent_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        password_updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};

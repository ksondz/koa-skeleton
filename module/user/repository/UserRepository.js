
const { Op } = require('sequelize');

const BaseRepository = require('../../appExtension/repository/BaseRepository');
const UserRoleEnum = require('./../enum/UserRoleEnum');

class UserRepository extends BaseRepository {


  /**
   * @param emailOrUserName
   * @returns {Promise<*|null>}
   */
  async findUserByEmailOrUserName(emailOrUserName) {
    const result = await super.findOne({
      where: {
        [Op.or]: [{ email: emailOrUserName }, { username: emailOrUserName }],
      },
    });

    return result || null;
  }


  /**
   * @param email
   * @returns {Promise<*|null>}
   */
  async findTeacherByEmail(email) {

    const result = await this.__getModel().findOne({
      where: {
        email,
        role: UserRoleEnum.TEACHER_USER_ROLE,
      },
    });

    return result || null;
  }


  /**
   *
   * @param id
   * @returns {Promise<*|null>}
   */
  async findTeacherById(id) {
    const result = await this.__getModel().findOne({
      where: {
        id,
        role: UserRoleEnum.TEACHER_USER_ROLE,
      },
    });

    return result || null;
  }


  /**
   * @param params
   * @returns {Promise<*|array>}
   */
  async findStudents(params) {

    const result = await this.__getModel().findAll({
      attributes: ['id', 'parent_id', 'username', 'firstName', 'lastName', 'description', 'role', 'state'],
      order: [
        ['id', 'DESC'],
      ],
      where: {
        parent_id: params.parentId,
        role: UserRoleEnum.STUDENT_USER_ROLE,
      },
      include: ['images'],
    });

    return result || [];
  }


  async findStudentsById(params) {

    const result = await this.__getModel().findAll({
      attributes: ['id', 'parent_id', 'username', 'firstName', 'lastName', 'description', 'role', 'state'],
      where: {
        id: {
          [Op.or]: params.users,
        },
        parent_id: params.parentId,
        role: UserRoleEnum.STUDENT_USER_ROLE,
      },
    });

    return result || null;

  }


  async findTeacherStudents(params) {

    const result = await this.__getModel().findAll({
      attributes: ['id', 'parent_id', 'username', 'firstName', 'lastName', 'description', 'role', 'state', 'passwordUpdatedAt', 'password'],
      where: {
        parent_id: params.parentId,
        role: UserRoleEnum.STUDENT_USER_ROLE,
      },
    });

    return result || null;

  }


  /**
   * @param params
   * @returns {Promise<*|null>}
   */
  async findStudent(params) {

    const result = await this.__getModel().findOne({
      attributes: ['id', 'parent_id', 'username', 'firstName', 'lastName', 'description', 'role', 'state', 'passwordUpdatedAt', 'password'],
      where: {
        id: params.id,
        parent_id: params.parentId,
        role: UserRoleEnum.STUDENT_USER_ROLE,
      },
    });

    return result || null;
  }

  /**
   * @param username
   * @returns {Promise<*|null>}
   */
  async findStudentByUserName(username) {

    const result = await this.__getModel().findOne({
      where: {
        username,
        role: UserRoleEnum.STUDENT_USER_ROLE,
      },
    });
    return result || null;
  }

  /**
   * @param forgotToken
   * @returns {Promise<*|null>}
   */
  async findUserByForgotToken(forgotToken) {

    const result = await super.findOne({
      where: {
        forgotToken,
      },
    });

    return result || null;
  }
}

module.exports = UserRepository;

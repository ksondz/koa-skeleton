// user/config/validator.config.js

const PostStudentValidatorFactory = require('./../validator/factory/post/StudentValidatorFactory');

const PatchStudentValidatorFactory = require('./../validator/factory/patch/StudentValidatorFactory');

const PatchStudentAccountValidatorFactory = require('./../validator/factory/patch/StudentAccountValidatorFactory');
const PatchTeacherAccountValidatorFactory = require('./../validator/factory/patch/TeacherAccountValidatorFactory');


module.exports = {
  validators: {
    'Post/StudentValidator': PostStudentValidatorFactory,

    'Patch/StudentValidator': PatchStudentValidatorFactory,
    'Patch/StudentAccountValidator': PatchStudentAccountValidatorFactory,
    'Patch/TeacherAccountValidator': PatchTeacherAccountValidatorFactory,
  },
};

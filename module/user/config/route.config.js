// user/config/route.config.js


// routes
const AccountRoute = require('./../route/AccountRoute');
const StudentRoute = require('./../route/StudentRoute');


module.exports = {
  router: {
    routes: {
      AccountRoute,
      StudentRoute,
    },
  },
};

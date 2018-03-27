// core/validator/factory/MailServiceFactory.js

const nodemailer = require('nodemailer');

const FactoryInterface = require('../../../appExtension/factory/FactoryInterface');

const MailService = require('./../MailService');


class MailServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {MailService}
   */
  constructor(app) {

    super(app);

    const mailer = nodemailer;
    const transportOptions = {
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS,  // generated ethereal password
      },
    };

    const { baseApi } = this.getAppConfig().router;

    return new MailService(mailer, transportOptions, baseApi);
  }
}

module.exports = MailServiceFactory;

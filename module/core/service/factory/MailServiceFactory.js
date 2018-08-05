

const nodemailer = require('nodemailer');

const FactoryInterface = require('../../factory/FactoryInterface');

const MailService = require('../MailService');


class MailServiceFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {MailService}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const mailer = nodemailer;
    const transportOptions = this.getConfig().mail.transport.options;
    const { baseApi } = this.getConfig().router;

    return new MailService(mailer, transportOptions, baseApi);
  }
}

module.exports = MailServiceFactory;

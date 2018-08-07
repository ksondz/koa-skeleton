

class MailService {


  constructor(mailer, transportOptions, baseApi) {
    this.mailer = mailer;
    this.transportOptions = transportOptions;
    this.transport = mailer.createTransport(transportOptions);
    this.baseApi = baseApi;

    this.registerMessage = 'Registration on the KoaApp';
    this.forgotPasswordMessage = 'KoaApp: Password Recovering';
  }


  /**
   * @param to
   * @param subject
   * @param content
   * @return {Promise<*>}
   */
  async send(to, subject, content) {

    const mailOptions = {
      from: this.transportOptions.auth.user,
      to,
      subject,
      html: content.html,
    };

    const result = await this.getTransport().sendMail(mailOptions);

    return (result);
  }


  /**
   * @param host
   * @param forgotToken
   * @return {{name: string, html: string}}
   */
  createForgotPasswordTemplate(host, forgotToken) {

    const forgotPasswordHref = `${host}/set-new-password?token=${forgotToken}`;

    return {
      name: this.forgotPasswordMessage,
      html: `
        Hello,<br>
        In order to recover your password on the KoaApp please follow the <a href="${forgotPasswordHref}">link</a>.<br>
        Thank you.
      `,
    };
  }


  /**
   * @param host
   * @param registerToken
   * @param user
   * @return {{name: string, html: string}}
   */
  createRegisterTokenTemplate(host, registerToken, user) {
    const activeAccountHref = `${host}/verifyAccount?t=${registerToken}`;

    return {
      name: this.registerMessage,
      html: `
        ${user.firstName} Hello,<br><br>
        You have registered on the myschoolpublisher.com.<br>
        In order to activate your account please follow the <a href="${activeAccountHref}">link</a><br><br>
        Thank you. ${user.firstName}
      `,
    };
  }


  /**
   * @return {*}
   */
  getMailer() {
    return this.mailer;
  }


  /**
   * @return {*}
   */
  getTransport() {
    if (!this.transport) {
      this.transport = this.getMailer().createTransport(this.transportOptions);
    }
    return this.transport;
  }
}

module.exports = MailService;

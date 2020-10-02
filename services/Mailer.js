const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sendGridKey);

class Mailer {
   constructor({ subject, recipients }, content) {

      this.msg = {
         to: recipients.map(({ email }) =>  email),
         from: keys.emailFrom, 
         subject: subject,
         html: content,

         tracking_settings: {
            click_tracking: {
               enable: true, 
               enable_text: true
            }, 
         },
      };
   }

   async send() {
      const response = await sgMail.sendMultiple(this.msg);
      return response;
   }
   
}

module.exports = Mailer;
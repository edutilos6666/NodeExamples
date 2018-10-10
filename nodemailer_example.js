const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourusername',
    pass: 'yourpass'
  }
});

const mailOptions = {
  from: 'sender_email_address',
  to: 'receiver_email_address_1, receiver_email_address_2, ...',
  subject: 'Test',
  html: '<h1>Heading1</h1><h2>Heading2</h2><h3>Heading3</h3>'
};
transport.sendMail(mailOptions, (err,info)=> {
  if(err) throw err;
  console.log(`Email sent: ${info}`);
});

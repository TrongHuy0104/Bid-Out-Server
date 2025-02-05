const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    if (!options.email) {
        throw new Error('No recipients defined');
    }
    const transport = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            user: process.env.SMPT_EMAIL,
            pass: process.env.SMPT_PASS,
        },
    });

    const message = {
        from: `${process.env.SMPT_FROM_NAME} <${process.env.SMPT_FROM_EMAIL}> `,
        to: options.email,
        subject: options.subject,
        text: options.text,
    };
    console.log('message', message);

    await transport.sendMail(message);
};
module.exports = sendEmail;

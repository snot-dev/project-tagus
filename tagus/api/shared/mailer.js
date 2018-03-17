const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: process.env.MAILER_MAIL,
            pass: process.env.MAILER_PASS
        }
    },
    {
        from : process.env.MAILER_MAIL
    }
);

const verifyEmail = (receiver, pass) => {
    const message = {
        to: receiver,
        subject: 'Welcome to Tagus!',
        text: `Welcome to Tagus, ${receiver}! Your password to access Tagus is: ${pass}`,
        html: 
            `<h4>Welcome to Tagus, ${receiver}</h4>
            <p>Your password to access Tagus is: <b>${pass}</b></p>`
    };

    return new Promise((resolver, reject) => {
        transporter.sendEmail(message, (error, info) => {
            if (error) {
                reject();
            }
            else {
                resolve();
            }
        });
    })
};

module.exports = {
    verifyEmail
};
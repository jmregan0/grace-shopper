const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'my.email@gmail.com',
            clientId: '540263018909-svsmsmsj0vjmmctjgd7o0m9pliu0g9v3.apps.googleusercontent.com',
            clientSecret: 'nsh8SVcFYKwy4kKflIZgQrCf',
            refreshToken: '1/V3kw9UjXbVImh5qQV3w43_mAZZ8XoVbg4uF63bg51vk'
        })
    }
})

var mailOptions = {
    from: 'GalacticBnB <my.email@gmail.com>',
    to: user.email,
    subject: 'Your GalacticBnB reservation is set',
    html: 'Hello World!!'
}

transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log('Error');
    } else {
        console.log('Email Sent');
    }
})

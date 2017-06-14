const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
        user: 'colickyboy@gmail.com',
        clientId: '540263018909-svsmsmsj0vjmmctjgd7o0m9pliu0g9v3.apps.googleusercontent.com',
        clientSecret: 'nsh8SVcFYKwy4kKflIZgQrCf',
        refreshToken: '1/SQ0etXPCt5TN3ug-lXbYRqBwfec68ngx0x1BjZlnyTc',
        accessToken: 'ya29.GltpBH4qKUKef32m1UnvdTEmQvSugR9jG9pUqCW2mvjWrvBpzYV1JOuJFx6ZrfJGEFqsmFCJuTDxwR0g6FKn3efuXsaW_ACy-jHHmOBiGWI5_8vsPfRaFrwhYQap'
    }
})

module.exports = transporter

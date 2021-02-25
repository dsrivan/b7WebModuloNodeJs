// lib para envio de email
const nodeMailer = require('nodemailer');

// configurações para envios de email com base nas variáveis de ambiente (variables.env)
const transporter = nodeMailer.createTransport({
    // configurações de acesso ao SMTP da conta a ser utilizada para envio de emails
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
},
    {
        /* configurações padrão, no caso REMETENTE */
        from: `${process.env.SMTP_NAME} <${process.env.SMTP_EMAIL}>`
    }
);

exports.send = async (options) => {
    // o envio do email de fato
    await transporter.sendMail(options);
}
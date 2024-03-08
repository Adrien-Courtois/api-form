function send(req) {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: process.env["EMAIL_HOST_" + req.path.substring(1).toUpperCase()],
        port: process.env["EMAIL_PORT_" + req.path.substring(1).toUpperCase()],
        secure: process.env["EMAIL_SECURE_" + req.path.substring(1).toUpperCase()], // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env["EMAIL_USER_" + req.path.substring(1).toUpperCase()],
          pass: process.env["EMAIL_PASS_" + req.path.substring(1).toUpperCase()],
        },
      });

    const info = transporter.sendMail({
        from: '"Formulaire de contact" <' + process.env["EMAIL_USER_" + req.path.substring(1).toUpperCase()] + '>', // sender address
        to: process.env["EMAIL_RECPT_" + req.path.substring(1).toUpperCase()], // list of receivers
        subject: "Soumission formulaire du site", // Subject line
        text: "Bonjour,\nVous avez reçu une nouvelle entrée sur le formulaire du site WEB " + req.headers.origin.split('//')[1] + "\nDe : " + req.body.name + "\nMail : " + req.body.email + "\nMessage : " + req.body.message, // plain text body
        html: "<p><b>Bonjour,</b></p>Vous avez reçu une nouvelle entrée sur le formulaire du site WEB " + req.headers.origin.split('//')[1] + "<p><p>De : " + req.body.name + "</p><p>Mail : " + req.body.email + "</p><p>Message : " + req.body.message + "</p>", // html body
    });
}

module.exports = { send };
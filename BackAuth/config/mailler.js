const nodemailer = require ("nodemailer")

const mailler = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: true,
  auth: {
    user: "0cbda94e34930b",
    pass: "728a8c1e8830d6",
    },
  });
  module.exports = mailler;
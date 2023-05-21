// const nodeMailer = require("nodemailer");

// const { username, PASSWORD } = require("../config/serverConfig");

// const sendGmail = async (data, email) => {
//     const transporter = nodeMailer.createTransport({
//         host: "service.gmail.com",
//         service: "gmail",
//         port: 465,
//         auth: {
//             user: username,
//             pass: PASSWORD
//         }
//     });
//     const options = {
//         subject: "password reset request",
//         from: "sunnybaisane96@gmail.com",
//         to: email,
//         text: data
//     };
//     const response = await transporter.sendMail(options);
//     return response;
// }


// module.exports = sendGmail;
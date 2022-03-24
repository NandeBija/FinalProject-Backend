
// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     secure: false,
//     auth: {
//         user: process.env.GMAIL_EMAIL,
//         pass: process.env.GMAIL_PASSWORD
//     },
// });

// const Booking = (city, username, email, time, date, photographer_name) {
    // from: 'Nandebija@mail.com', // sender address
    // to: `${email}`, // list of receivers
    // subject: 'SnapAway confirmation', // Subject line
    // html: `<h1>Email confirmation</h1>
    // <h2>Hello ${username}</h2>
    // <p>This serves to confirm your boking with SnapAway<p>
    // `// plain text body
//   };
//   transporter.sendMail(Booking, function (err, info) {
//      if(err)
//        console.log(err)
//      else
//        console.log(info);
//   });

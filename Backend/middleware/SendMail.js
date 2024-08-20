// import nodemailer from 'nodemailer';

// Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'thegreatayurveda@gmail.com', // Your email address
//       pass: 'mscy bdjt dttl plbj', // Your email password
//     },
//   });

// =====================FOR SEND THE MAIL===========================
//         try {
//             const { email } = req.body;
         
//             // Set up email options
//             const mailOptions = {
//               from: 'thegreatayurveda@gmail.com',
//               to: email,
//               subject: 'I am Subject Line for testing the mail',
//               text: "your registration successfull in event managment",
//             };
         
//             // Send email
//             const info = await transporter.sendMail(mailOptions);
         
//             // Respond with success
//             res.status(200).json({
//               success: true,
//               message: 'Email sent successfully',
//             //   response: info.response,
//             });
//           } catch (error) {
//             console.error('Error sending email:', error);
//             res.status(500).json({
//               success: false,
//               message: 'Failed to send email',
//               error: error.message,
//             });
//           }
//         =================================================================

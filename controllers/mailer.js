const expressAsyncHandler = require("express-async-handler");
const nodemailer = require('nodemailer');


// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service (e.g., Gmail, SendGrid, etc.)
  auth: {
    user: process.env.EMAIL_USER , // Replace with your admin email
    pass: process.env.EMAIL_PASS, // Replace with your email password or app-specific password
  },
});


const sendOrderConfirmationMail = async (order) => {
  const mailOptions = {
    from: `"Swanah" <${process.env.EMAIL_USER}>`,
    to: order.shippingInfo.email,
    subject: `🛒 Order Confirmation - ${order._id}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
      <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding:20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td align="center" style="background:#ff4500; padding:20px;">
                  <h1 style="margin:0; color:#ffffff;">Swanah</h1>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:30px; color:#333333;">
                  <h2 style="color:#ff4500;">Thank you for your order, ${order.shippingInfo.name}!</h2>
                  <p style="font-size:16px;">We’re excited to let you know that your order has been placed successfully.</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                    <tr>
                      <td style="padding:10px; border:1px solid #ddd;">Order ID</td>
                      <td style="padding:10px; border:1px solid #ddd;">${order._id}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #ddd;">Total</td>
                      <td style="padding:10px; border:1px solid #ddd;">Rs ${order.totalPrice} PKR</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #ddd;">Status</td>
                      <td style="padding:10px; border:1px solid #ddd;">${order.status}</td>
                    </tr>
                  </table>
                  <p style="margin-top:20px;">We’ll notify you when your order status changes. Stay tuned!</p>
                  <p style="font-size:14px; color:#777;">If you have any questions, contact us at <a href="mailto:support@swanah.com" style="color:#ff4500;">support@swanah.com</a>.</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="background:#333333; color:#ffffff; padding:15px; font-size:14px;">
                  © ${new Date().getFullYear()} Swanah. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};



const sendOrderStatusMail = async (order) => {
  const mailOptions = {
    from: `"Swanah" <${process.env.EMAIL_USER}>`,
    to: order.shippingInfo.email,
    subject: `📦 Order Update - ${order._id}`,
    html: `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; font-family:Arial,sans-serif; background-color:#f4f4f4;">
      <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding:20px;" >
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
              <!-- Header -->
              <tr>
                <td align="center" style="background:#ff4500; padding:20px;">
                  <h1 style="margin:0; color:#ffffff;">Swanah</h1>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:30px; color:#333333;">
                  <h2 style="color:#ff4500;">Hello ${order.shippingInfo.name},</h2>
                  <p style="font-size:16px;">Your order <b>${order._id}</b> status has been updated:</p>
                  <p style="font-size:18px; font-weight:bold; color:#ff4500;">${order.status}</p>
                  <p><b>Total:</b> Rs ${order.totalPrice} PKR</p>
                  <p style="margin-top:20px;">Thank you for shopping with <b>Swanah</b>.</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="background:#333333; color:#ffffff; padding:15px; font-size:14px;">
                  © ${new Date().getFullYear()} Swanah. Need help? <a href="mailto:support@swanah.com" style="color:#fff;">Contact Us</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};




module.exports = {
    sendOrderConfirmationMail,
    sendOrderStatusMail
}
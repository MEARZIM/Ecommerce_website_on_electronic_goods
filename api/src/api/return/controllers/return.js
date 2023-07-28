'use strict';

/**
 * return controller
 */
const nodemailer = require('nodemailer');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::return.return', ({ strapi }) => ({
    async create(ctx) {
        const { ReturnData } = ctx.request.body;
        try {
            // let entity;
            const email = ReturnData.Email
            const username = ReturnData.Name

            const createdReturn = await strapi
                .service("api::return.return")
                .create({ data: { ReturnData } });

            console.log(createdReturn)


            const return_url = process.env.CLIENT_URL + "/";
            const order_date = new Date();
            const htmlContent = `

<!DOCTYPE html>
<html>
<head>
  <title>Order Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }

    h1 {
      color: #333333;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
    }

    .order-details {
      margin-top: 20px;
      padding: 20px;
      background-color: #f9f9f9;
      border: 1px solid #dddddd;
    }

    .return-button {
      margin-top: 20px;
      text-align: center;
    }

    .return-button a {
      display: inline-block;
      padding: 10px 20px;
      background-color: #333333;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Return Confirmation</h1>
    <div class="order-details">
      <p>Dear Customer,</p>
      <p>Thank you for your order! We are pleased to confirm that your order has been received and is being processed.</p>

      <h2>Order Details</h2>
      <ul>
        <li><strong>Username: </strong> ${username}</li>
        <li><strong>Order Date:</strong> ${order_date}</li>
      </ul>

      <p>We will notify you via email once your return request is confirm. If you have any questions or need further assistance, please feel free to contact our customer support team.</p>

      <p>Thank you for choosing our store!</p>

      <p>For any Return Querry please click on this button</p>
      <div class="return-button">
      <a href="${return_url}">Return</a>
      </div>
    </div>
  </div>
</body>
</html>
`
                ;

            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            })

            const options = {
                from: "pixelGadgets@outlook.com",
                to: email,
                subject: "Return Details",
                html: htmlContent
            }
            setTimeout(() => {
                transporter.sendMail(options, function (err, info) {
                    if (err) {
                        console.log(err)
                    }
                    console.log("sent:" + info.response)
                })
            }, 1000)

            

            return createdReturn;

        } catch (error) {
            ctx.response.status = 500;
            return { error };
        }

    }
}));

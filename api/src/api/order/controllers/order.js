("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */
const nodemailer = require('nodemailer');

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, email } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.attributes.quantity,
          };
        })
      );
      
      
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["IN"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/success",
        cancel_url: process.env.CLIENT_URL + "?success=false",
        line_items: lineItems,
        customer_email: email,
      });

      // console.log(session)
      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });
      

      // Email
      const order_id= session.id;
      const payment_method= "CARD";
      const order_total=session.amount_subtotal/100+"/-";
      const return_url =process.env.CLIENT_URL+"/return";
      const order_date = new Date();
      const htmlContent= `

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
    <h1>Order Confirmation</h1>
    <div class="order-details">
      <p>Dear Customer,</p>
      <p>Thank you for your order! We are pleased to confirm that your order has been received and is being processed.</p>

      <h2>Order Details</h2>
      <ul>
        <li><strong>Order ID:</strong> ${order_id}</li>
        <li><strong>Order Date:</strong> ${order_date}</li>
        <li><strong>Payment Method:</strong> ${payment_method}</li>
        <li><strong>Order Total:</strong> ${order_total}</li>
      </ul>

      <p>We will notify you via email once your order has been shipped. If you have any questions or need further assistance, please feel free to contact our customer support team.</p>

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
              auth:{
                  user: process.env.EMAIL_USERNAME,
                  pass: process.env.EMAIL_PASSWORD
              }
          })
          
          const options ={
              from : "pixelGadgets@outlook.com",
              to : email,
              subject: "Order Details",
              html: htmlContent
          }
          setTimeout(()=>{
            transporter.sendMail(options, function (err,info){
                if (err) {
                    console.log(err)
                }
                console.log("sent:" +info.response)
            })
          },20000)
      
      return { stripeSession: session };
      
    } catch (error) {
      ctx.response.status = 500;
      return { error };
    }
    
  },
}));

const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

const bodyParser = require('body-parser');

const YOUR_DOMAIN = keys.redirectDomain;
module.exports = app => {
   app.post('/api/create-session', requireLogin, async (req, res) => {

      try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
               {
               price_data: {
                  currency: 'usd', 
                  product_data: {
                     name: 'Emaily',
                     description: '$5 for 5 email credits',
                     // images: ['https://i.imgur.com/EHyR2nP.png'],
                  },
                  unit_amount: 500,
               },
               quantity: 1,
               },
            ], 
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/canceled`,
         }); 
         console.log('session -- ', session );
         res.json({ id: session.id });
      } catch (err) {
         console.log("err -- ", err);
         res.status(500).send(err)
      }
   
   });    

   // Card numbers
   // Payment succeeds 4242 4242 4242 4242
   // Payment requires authentication 4000 0025 0000 3155
   // Payment is declined 4000 0000 0000 9995
};
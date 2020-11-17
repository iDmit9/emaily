const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

const endpointSecret = keys.stripeWebhookSecret; // 'whsec_...';

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
         // console.log('session -- ', session );
         res.json({ id: session.id });
      } catch (err) {
         console.log("err -- ", err);
         res.status(500).send(err)
      }
   
   });    

   const fulfillOrder = (session) => {
      try {
         // TODO: fill me in
         //console.log("Fulfilling order", session);
         console.log("payment_status = paid: ", session.payment_status === 'paid');
         // Should I create new DB to save user on 'create-session'?
         // And then by session.payment_intent or session.id 
         // search user in that DB?
         // Or send "customer_email" to checkout.sessions.create?
      } catch (error) {
         console.log( error );
      }      
   }

   app.post('/api/stripe/webhook', async (req, res) => {
      const payload = req.rawBody;
      const sig = req.headers['stripe-signature'];
            
      let event;

      //    console.log("Got payload: " + payload);

      try {
         event = stripe.webhooks.constructEvent( payload, sig, endpointSecret );
      } catch (err) {
         console.log(`Webhook Error: ${err.message}`);
         return res.status(400).send(`Webhook Error: ${err.message}`);
      }
        
      // Handle the checkout.session.completed event
      if (event.type === 'checkout.session.completed') {
         const session = event.data.object;

         // Fulfill the purchase...
         fulfillOrder(session);
      }

      res.sendStatus(200);
   });

   // Card numbers
   // Payment succeeds 4242 4242 4242 4242
   // Payment requires authentication 4000 0025 0000 3155
   // Payment is declined 4000 0000 0000 9995
};
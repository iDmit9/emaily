// prod.js - production keys here
module.exports = {
   googleClientID: process.env.GOOGLE_CLIENT_ID,
   googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
   mongoURI: process.env.MONGO_URI,
   cookieKey: process.env.COOKIE_KEY,
   stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
   stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
   sendGridKey: process.env.SEND_GRID_KEY,
   redirectDomain: process.env.REDIRECT_DOMAIN,
   emailFrom: process.env.EMAIL_FROM 
}
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');
const keys = require("./config/keys");
require("./models/User");
require('./models/Survey');
require("./services/passport");

mongoose.set('useUnifiedTopology', true); //to using the MongoDB driver's new connection management engine
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
   .then(() => console.log('DB Connected!'))
   .catch(err => {
      console.log(`DB Connection Error: ${ err.message }`);
   });

const app = express();

app.use(bodyParser.json({
   // We need the raw body to verify webhook signatures.
   // Let's compute it only when hitting the Stripe webhook endpoint.
   // verify: function (req, res, buf) {
   //    if (req.originalUrl.startsWith('/webhook')) {
   //      req.rawBody = buf.toString();
   //    }
   // },
   verify: (req, res, buf) => {
      req.rawBody = buf
   }
}))

app.use(
   cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
   })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
   // Express will serve up production assets
   // like our main.js file or main.css file
   app.use(express.static('client/build'));

   // Express will serve up the index.html file 
   // if it does not recognize the route
   const path = require('path');
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });

}

const PORT = process.env.PORT || 5000; //for Heroku
app.listen(PORT);
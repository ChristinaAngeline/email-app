const express = require('express');
const mongoose = require('mongoose');
// gives us to access to cookies
const cookieSession = require('cookie-session');
// tells passport to make use of cookies
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require("./models/User"); // this has to be first always
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

//app.use is wiring middleware inside our application
// middleware our small functions that can be used to modify
// incoming requests to our app before they are sent off to route handlers
app.use(
  cookieSession({
    //how long the cookie can exist in the browser before the cookie expires
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, 24 hours, 60 minutes, 60 second, 1000 milliseconds to a second
    keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assests
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFIle(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);

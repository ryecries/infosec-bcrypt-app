'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';


//START_ASYNC -do not remove notes, place code between correct pair of notes.
const nocache = require("nocache");
app.use(nocache());

const hidePoweredBy = require("hide-powered-by");
app.use(hidePoweredBy());

const frameguard = require("frameguard");
app.use(frameguard({ action: "deny" }));

const xXssProtection = require("x-xss-protection");
app.use(xXssProtection());

const dontSniffMimetype = require("dont-sniff-mimetype");
app.use(dontSniffMimetype());

const ienoopen = require("ienoopen");
app.use(ienoopen());

const strictTransportSecurity = require("hsts");
ninetyDays = 90*24*60*60;
app.use(
  strictTransportSecurity({
    maxAge: ninetyDays,
    preload : true,
  })
);

const dnsPrefetchControl = require("dns-prefetch-control");
app.use(dnsPrefetchControl());

const contentSecurityPolicy = require("helmet-csp");

app.use(
  contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com'],
    },
  })
);



//END_ASYNC

//START_SYNC
module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

//END_SYNC





























const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});

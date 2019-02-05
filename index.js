// Example express application adding the parse-dashboard module to expose Parse Dashboard compatible API routes.

var express = require('express');
var ParseDashboard = require('parse-dashboard');
var path = require('path');

var dashboard = new ParseDashboard({
 // let localParseServer = 'http://localhost:1337/parse';

  // Heroku requires HTTPS. Please read the README file for details.
  // let herokuParseServer = 'https://my-parse-dashboard.herokuapp.com/parse'

  apps: [
    {
      appId: process.env.APP_ID,
      masterKey: process.env.MASTER_KEY,
      serverURL: 'https://rivers-database.herokuapp.com/parse',
      appName: process.env.APP_NAME,
    },
  ],
  users: [
    {
      "user":"Erik",
      "pass":"$2y$12$Vjqo.hrktXzR6IKI9JxXPeAJbYDtFMJcHaZ0SvV9tKF5u6S.BwSoW"
    }
  ],
  useEncryptedPasswords: true
});

var app = express();
//app.enable('trust proxy');

// make the Parse Dashboard available at /
app.use('/', dashboard);

var port = process.env.PORT || 4040;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
  console.log('parse-dashboard-example running on port ' + port + '.');
});

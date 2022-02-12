const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/', (req, res, next) => {
  const options = {
    hostname: process.env.HOST_NAME,
    port: 443,
    path: '/status',
    method: 'GET',
    pfx: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pfx')),
    headers: {
      Authorization: process.env.BASIC_AUTH_HEADER
    }
  };

  const request = https.request(options, response => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    response.on('data', d => {
      process.stdout.write(JSON.parse(d).msg);
      response.send(JSON.parse(d).msg);
    });
  });

  request.on('error', e => {
    console.error(e);
  });

  request.end();
});

const sslServer = https.createServer(
  {
    pfx: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pfx'))
  },
  app
);

sslServer.listen(3443, () => {
  console.log('Secure server on port 3443');
});

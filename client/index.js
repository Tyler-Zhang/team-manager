/**
 * Simple web server that just serves the static react files
 * and proxies any request beginning with /api to the api server
 */
const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const PORT = process.env.PORT || 80;
const API_URL = process.env.API_PORT || 'http://localhost:8080';

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', proxy({ target: API_URL }));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT);

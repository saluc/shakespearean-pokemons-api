'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/pokemon/:name', (req, res) => {
  //TODO: check input parameter
  res.send(req.params);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
'use strict';

const express = require('express');
const pokemon = require("./routes/pokemon.js");
const logger = require("./modules/logging.js");

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/pokemon/:name', (req, res) => {
  pokemon.getPokemonDescription(req, res)
  .then((resp) => res.status(resp.status).json(resp.json)); 
});

let server = app.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);

function stop() {
  server.close();
}

module.exports = app;
module.exports.stop = stop;

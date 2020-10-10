'use strict';

const express = require('express');
const pokemon = require("./routes/pokemon.js");

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/pokemon/:name', (req, res) => {
  pokemon.getPokemonDescription(req, res); 
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
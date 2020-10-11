const Pokedex = require("../modules/pokedex.js");
const ShakeTransl = require("../modules/shakespeareanTranslator.js");
const cache = require('memory-cache');
const logger = require("../modules/logging.js");

const cacheDuration = 600;
const p = new Pokedex();
const st = new ShakeTransl();
const memCache = new cache.Cache();

function getPokemonDescription(req, res) {
    let cacheContent = memCache.get(req.params.name);
    if (cacheContent) {
        logger.debug(`Cache hit, found cached description for '${req.params.name}'`);
        return Promise.resolve().then(() => {
            return { status: 200, json: { name: req.params.name, description: cacheContent } }
        });
    }
    else {
        logger.debug(`Cache miss, requesting description for '${req.params.name}'`);       
        return p.getPokemonDescriptionByName(req.params && req.params.name)
            .then((resp) => {
                logger.debug(`Pokemon with name '${req.params.name}' found! Its description is: '${resp}'`);
                return resp;
            })
            .then((desc) => {
                return st.translate(desc).then((translDesc) => {
                    logger.debug(`Pokemon description translated to Shakespearean! The translation is: '${translDesc}'`);
                    memCache.put(req.params.name, translDesc, cacheDuration * 1000);
                    return ({ status: 200, json: { name: req.params.name, description: translDesc } });
                });
            })
            .catch((err) => {
                logger.error(`Error: ${err.message}`);
                if (err.message == "Request failed with status code 404") {
                    return ({ status: 404, json: { error: err.message } });
                }
                else {
                    return ({ status: 500, json: { error: err.message } });
                }
            });
            
    }
}

module.exports = { getPokemonDescription };
const Pokedex = require("../modules/pokedex.js");
const ShakeTransl = require("../modules/shakespeareanTranslator.js");
const p = new Pokedex();
const st = new ShakeTransl();

function getPokemonDescription(req, res) {
    return p.getPokemonDescriptionByName(req.params && req.params.name)
        .then((resp) => {
            console.log(`Pokemon with name '${req.params.name}' found! Its description is: '${resp}'`);
            return resp;
        })
        .then((desc) => {
            return st.translate(desc).then((translDesc) => {
                console.log(`Pokemon description translated to Shakespearean! The translation is: '${translDesc}'`);
                return ({ status: 200, json: { name: req.params.name, description: translDesc } });
            });
        })
        .catch((err) => {
            console.error(`Error: ${err.message}`);
            if (err.message == "Request failed with status code 404") {
                return ({ status: 404, json: { error: err.message } });
            }
            else {
                return ({ status: 500, json: { error: err.message } });
            }
        });
}

module.exports = { getPokemonDescription };
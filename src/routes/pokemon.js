const Pokedex = require("../modules/pokedex.js");
const pokedex = new Pokedex();

function getPokemonDescription(req, res) {
    return pokedex.getPokemonDescriptionByName(req.params && req.params.name)
        .then((resp) => {
            if (resp) {
                console.log(`Pokemon with name '${req.params.name}' found! Its description is: '${resp}'`);
                res.status(200).json(
                    {
                        name: req.params.name,
                        description: resp
                    }
                );
            }
            else {
                res.status(404).json({ error: `The pokèmon you searched was not found` })
            }
            
        })
        .catch((err) => {
            console.error(`Error: ${err.message}`);
            if (err.message == "Request failed with status code 404") {
                res.status(404).json({ error: err.message });
            }
            else {
                res.status(500).json({ error: err.message });
            }
        });
}

module.exports = { getPokemonDescription };

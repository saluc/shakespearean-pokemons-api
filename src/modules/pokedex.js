var _Pokedex = require('pokedex-promise-v2');
const logger = require("./logging.js");

class Pokedex {

    constructor(language = "en", version = "red") {
        this.pokedex = new _Pokedex();
        this.language = language;
        this.version = version;
    }

    getPokemonDescriptionByName(name) {
        let lan = this.language;
        let ver = this.version;
        return this.pokedex.getPokemonSpeciesByName(name)
            .then(function (response) {
                let desc = response && response.flavor_text_entries.find(el => el.language.name == lan && el.version.name == ver);
                return desc && desc.flavor_text.replace(/(\r\n|\n|\f)/gm, " ");
            })
            .catch(function (error) {
                logger.error(`Pokedex error occurred: ${error}`);
                throw(error);
            });
    }
}

module.exports = Pokedex;
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

let Pokedex = require('../modules/pokedex.js');

describe('Pokedex', () => {

    let p;
    
    before((done) => {
        p = new Pokedex();
        done();
    })

    describe('getPokemonDescriptionByName', () => {
        it('get description for "pikachu"', () => {
            return expect(p.getPokemonDescriptionByName("pikachu"))
                    .to.eventually.equal("When several of these POKéMON gather, their electricity could build and cause lightning storms.");
        });

        it('get description for "magikarp"', () => {
            return expect(p.getPokemonDescriptionByName("magikarp"))
                    .to.eventually.equal("In the distant past, it was somewhat stronger than the horribly weak descendants that exist today.");
        });

        it('get description for ""', () => {
            return expect(p.getPokemonDescriptionByName("")).to.eventually.be.undefined;
        });

        it('get description for "undefined"', () => {
            return expect(p.getPokemonDescriptionByName(undefined)).to.eventually.be.undefined;
        });

        it('get error for -5', () => {
            return expect(p.getPokemonDescriptionByName(-5)).to.eventually.be.rejectedWith(Error, "Request failed with status code 404");
        });
    });

});
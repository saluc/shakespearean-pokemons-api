var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

let ShakespeareanTranslator = require('../modules/shakespeareanTranslator.js');

describe('ShakespeareanTranslator', () => {

    let st;
    
    before((done) => {
        st = new ShakespeareanTranslator();
        done();
    })

    describe('translate', () => {
        it('get translation for "pikachu"', () => {
            return expect(st.translate("When several of these POKéMON gather, their electricity could build and cause lightning storms."))
                    .to.eventually.equal("At which hour several of these pokémon gather,  their electricity couldst buildeth and cause lightning storms.");
        });

        it('get translation for "magikarp"', () => {
            return expect(st.translate("In the distant past, it was somewhat stronger than the horribly weak descendants that exist today."))
                    .to.eventually.equal("In the distant past,  't wast somewhat stronger than the horribly weak descendants yond exist the present day.");
        });
    });

});
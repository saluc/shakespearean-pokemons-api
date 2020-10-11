let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);



describe('Pokemon API', () => {
    
    let app;

    before(() => {
        app = require('../server.js');
    })

    describe('getPokemonDescription', () => {
        it('get description for "pikachu"', () => {
            return chai.request(app)
                    .get("/pokemon/pikachu")
                    .then(function (res) {
                        console.log(`res = ${JSON.stringify(res)}`);
                        expect(res).to.have.status(200);
                        expect(res).to.have.property("text");
                        let body = JSON.parse(res.text);
                        expect(body).to.have.property("name").eql("pikachu");
                        expect(body).to.have.property("description").eql("At which hour several of these pokémon gather,  their electricity couldst buildeth and cause lightning storms.");
                     })
                     .catch(function (err) {
                        throw err;
                     });
        });

        it('get description for "magikarp"', () => {
            return chai.request(app)
                    .get("/pokemon/magikarp")
                    .then(function (res) {
                        console.log(`res = ${JSON.stringify(res)}`);
                        expect(res).to.have.status(200);
                        expect(res).to.have.property("text");
                        let body = JSON.parse(res.text);
                        expect(body).to.have.property("name").eql("magikarp");
                        expect(body).to.have.property("description").eql("In the distant past,  't wast somewhat stronger than the horribly weak descendants yond exist the present day.");
                     })
                     .catch(function (err) {
                        throw err;
                     });
        });

        it('get using invalid input parameter', () => {
            return chai.request(app)
                    .get("/pokemon/-5")
                    .then(function (res) {
                        console.log(`res = ${JSON.stringify(res)}`);
                        expect(res).to.have.status(404);
                        expect(res).to.have.property("text");
                        let body = JSON.parse(res.text);
                        expect(body).to.have.property("error").eql("Request failed with status code 404");
                     })
                     .catch(function (err) {
                        throw err;
                     });
        });

    });

    after(() => {
        app.stop();
    });

});
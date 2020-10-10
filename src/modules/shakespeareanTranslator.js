var axios = require('axios');
var qs = require('qs');


class ShakespeareanTranslator {

    constructor() {
        this.endpoint = "https://api.funtranslations.com/translate/shakespeare.json";
    }

    translate(msg) {
        const data = qs.stringify({
            'text': msg
        });

        var config = {
            method: 'post',
            url: this.endpoint,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        return axios(config)
            .then(function (response) {
                if (response && response.data && response.data.success && response.data.success.total == 1) {
                    return response.data.contents.translated;
                }
            })
            .catch(function (error) {
                console.error(`An error occurred during translation: ${error}`);
                throw (error);
            });
    }
}

module.exports = ShakespeareanTranslator;
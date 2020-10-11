# Shakespearean Pokemon API

This project implements a REST API that allows to obtain Pokemon's descriptions written in Shakespearean style. The REST API is implemented using Node.js.

### Prerequisities

1. In order to run this container you'll need docker installed.
* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

2. **[Recommended]** Install [Node.js version 10 or greater][node]

3. Clone this repository:
    ```
    git clone https://github.com/saluc/shakespearean-pokemons-api.git
    ```

[node]: https://nodejs.org/

### Build
Go into the root folder of the repository:
```
cd shakespearean-pokemons-api
```

If you installed Node.js you can build the Docker image by executing:
```
npm start
```

Otherwise, you can build and run the container by following these steps:
```
docker build -t shaks_pkm_api/node-web-app .
docker run -p 49160:8080 -d shaks_pkm_api/node-web-app
```

### Usage

Once the container is up and running you can starting querying for Shakespearean's Pokemons descriptions.
By default the server will be listening on port 49160. You can test the API with the following command:
```
curl --location --request GET 'http://0.0.0.0:49160/pokemon/pikachu'
```

### Test
The repository includes some tests. If you installed Node.js you can run them using:
```
npm test
```

### Stop
If you installed Node.js you can stop the container by executing:
```
npm stop
```

Otherwise, use the following commands:
```
docker container stop $(docker ps -a -q --filter 'ancestor=shaks_pkm_api/node-web-app')
docker container rm $(docker ps -a -q --filter 'ancestor=shaks_pkm_api/node-web-app')
```

## Built With

* Node.js v10.19.0
* Docker 19.03.11

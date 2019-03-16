# Stocktake.xyz

Stocktake.xyz is an extremely minimal site for financial market data. It supports shares on multiple exchanges like IEX and NASDAQ as well as cryptocurrencies and futures.

## Features

- Read live data from [IEX API](https://iextrading.com/developer/docs/).
- Cache results of common data queries in Redis store.
- Fuzzy search for companies and stock symbols.
- Fully server-rendered with no client-side JS.
- Semantic HTML.

## Installation

- Install dependencies: `yarn install`

## Running

To run, you will need a running instance of Redis (for local development I recommend this [Docker image](https://hub.docker.com/_/redis)).

- Set the URL of your Redis instance: `export REDIS_URL=...`
- Set the port to run the server on (default 3000): `export PORT=...`
- Run with Node.js: `node src/index.js`

## Credits

The data folder contains data retrieved from the IEX API.

Favicons were generated using [Favicon.io](https://favicon.io/) and [Twemoji](https://github.com/twitter/twemoji).

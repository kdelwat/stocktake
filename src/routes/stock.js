const moment = require("moment");
const chartStockPrice = require("../graphics/chartStockPrice");

module.exports = server => ({
    method: "GET",
    path: "/stock/{symbol}/{timeframe?}",
    handler: async (request, h) => {
        const timeframe = request.params.timeframe || "1m";

        const {
            company: { symbol, companyName: name, website },
            historicalPriceData,
            quote
        } = await server.methods["getStockData"](
            request.params.symbol,
            timeframe
        );

        quote.marketCap = Number(quote.marketCap).toLocaleString();
        quote.latestVolume = Number(quote.latestVolume).toLocaleString();

        const charts = {
            small: await chartStockPrice(historicalPriceData, 400, 200),
            medium: await chartStockPrice(historicalPriceData, 700, 200),
            large: await chartStockPrice(historicalPriceData, 1000, 200)
        };

        const latestPriceUpdate = moment.utc(quote.latestUpdate).fromNow();

        console.log(quote);

        return h.view("stock", {
            symbol,
            name,
            website,
            charts,
            latestPriceUpdate,
            quote
        });
    }
});

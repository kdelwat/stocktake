const moment = require("moment");
const chartStockPrice = require("../graphics/chartStockPrice");

module.exports = server => ({
    method: "GET",
    path: "/stock/{symbol}/{timeframe?}",
    handler: async (request, h) => {
        const { symbol: requestSymbol } = request.params;
        const timeframe = request.params.timeframe || "1m";

        const { symbol, companyName: name, website } = await server.methods[
            "getCompanyData"
        ](requestSymbol);
        const historicalPriceData = await server.methods["getHistoricalData"](
            requestSymbol,
            timeframe
        );
        const quote = await server.methods["getStockData"](requestSymbol);

        quote.marketCap = Number(quote.marketCap).toLocaleString();
        quote.latestVolume = Number(quote.latestVolume).toLocaleString();

        const charts = {
            small: await chartStockPrice(historicalPriceData, 400, 200),
            medium: await chartStockPrice(historicalPriceData, 700, 200),
            large: await chartStockPrice(historicalPriceData, 1000, 200)
        };

        const latestPriceUpdate = moment.utc(quote.latestUpdate).fromNow();

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

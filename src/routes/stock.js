const chartStockPrice = require("../graphics/chartStockPrice");

module.exports = server => ({
    method: "GET",
    path: "/stock/{symbol}/{timeframe?}",
    handler: async (request, h) => {
        const timeframe = request.params.timeframe || "1m";

        const {
            company: { symbol, companyName: name, website },
            historicalPriceData
        } = await server.methods["getStockData"](
            request.params.symbol,
            timeframe
        );

        const chart = await chartStockPrice(historicalPriceData);

        return h.view("stock", { symbol, name, website, chart });
    }
});

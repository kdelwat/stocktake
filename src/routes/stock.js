const chartStockPrice = require("../graphics/chartStockPrice");

module.exports = server => ({
    method: "GET",
    path: "/stock/{symbol}",
    handler: async (request, h) => {
        const {
            company: { symbol, companyName: name, website },
            historicalPriceData
        } = await server.methods["getStockData"](request.params.symbol);

        const chart = await chartStockPrice(historicalPriceData);

        return h.view("stock", { symbol, name, website, chart });
    }
});

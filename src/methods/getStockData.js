module.exports = iexService => ({
    name: "getStockData",
    method: async symbol => {
        return {
            company: await iexService.getCompany(symbol),
            historicalPriceData: await iexService.getHistoricalPriceData(symbol)
        };
    }
});

module.exports = iexService => ({
    name: "getStockData",
    method: async (symbol, timeframe) => {
        return {
            company: await iexService.getCompany(symbol),
            historicalPriceData: await iexService.getHistoricalPriceData(
                symbol,
                timeframe
            ),
            quote: await iexService.getQuote(symbol)
        };
    }
});

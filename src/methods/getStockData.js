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
    },
    options: {
        cache: {
            cache: "redisCache",
            expiresIn: 3600 * 1000, // Cache for one hour (TODO: drop this for quote)
            generateTimeout: 2000
        }
    }
});

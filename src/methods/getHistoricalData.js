module.exports = iexService => ({
    name: "getHistoricalData",
    method: async (symbol, timeframe) => {
        return iexService.getHistoricalPriceData(symbol, timeframe);
    },
    options: {
        cache: {
            cache: "redisCache",
            expiresIn: 3600 * 1000, // Cache for one hour
            generateTimeout: 2000
        }
    }
});

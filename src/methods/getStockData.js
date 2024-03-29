module.exports = iexService => ({
    name: "getStockData",
    method: async symbol => {
        return await iexService.getQuote(symbol);
    },
    options: {
        cache: {
            cache: "redisCache",
            expiresIn: 5 * 60 * 1000, // Cache for 5 minutes
            generateTimeout: 2000
        }
    }
});

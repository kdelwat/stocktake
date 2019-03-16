module.exports = iexService => ({
    name: "getCompanyData",
    method: async symbol => {
        return await iexService.getCompany(symbol);
    },
    options: {
        cache: {
            cache: "redisCache",
            expiresIn: 8 * 3600 * 1000, // Cache for 8 hours
            generateTimeout: 2000
        }
    }
});

module.exports = iexService => ({
    name: "getStockList",
    method: async type => {
        const data = await iexService.getList(type);
        console.log(data);
        return data.map(s => ({
            ...s,
            latestVolume: Number(s.latestVolume).toLocaleString()
        }));
    },
    options: {
        cache: {
            cache: "redisCache",
            expiresIn: 3600 * 1000, // Cache for one hour
            generateTimeout: 2000
        }
    }
});

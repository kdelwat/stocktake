module.exports = iexService => ({
    name: "getStockData",
    method: async symbol => {
        return { company: await iexService.getCompany(symbol) };
    }
});

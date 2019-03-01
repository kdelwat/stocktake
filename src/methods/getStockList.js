module.exports = iexService => ({
    name: "getStockList",
    method: async type => {
        const data = await iexService.getList(type);
        console.log(data);
        return data;
    }
});

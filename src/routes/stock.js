module.exports = server => ({
    method: "GET",
    path: "/stock/{symbol}",
    handler: async (request, h) => {
        const {
            company: { symbol, companyName: name, website }
        } = await server.methods["getStockData"](request.params.symbol);

        return h.view("stock", { symbol, name, website });
    }
});

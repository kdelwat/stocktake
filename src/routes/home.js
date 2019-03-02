module.exports = server => ({
    method: "GET",
    path: "/",
    handler: async (request, h) => {
        const inFocus = await server.methods["getStockList"]("infocus");
        const gainers = await server.methods["getStockList"]("gainers");
        const losers = await server.methods["getStockList"]("losers");

        return h.view("index", {
            inFocus,
            gainers,
            losers
        });
    }
});

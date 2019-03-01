module.exports = server => ({
    method: "GET",
    path: "/",
    handler: async (request, h) => {
        const mostActive = await server.methods["getStockList"]("mostactive");
        const gainers = await server.methods["getStockList"]("gainers");
        const losers = await server.methods["getStockList"]("losers");

        return h.view("index", {
            mostActive,
            gainers,
            losers
        });
    }
});

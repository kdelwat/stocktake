module.exports = server => ({
    method: "GET",
    path: "/search",
    handler: async (request, h) => {
        const searchTerm = request.query.search.trim();

        const searchResults = await server.methods.searchStocks(searchTerm);

        if (searchResults.length > 0 && searchResults[0].score === 0) {
            // Redirect to requested symbol
            return h.redirect(`/stock/${searchResults[0].item.symbol}`);
        } else if (searchResults.length === 1) {
            // Redirect to only result
            return h.redirect(`/stock/${searchResults[0].item.symbol}`);
        } else {
            // Return search results
            return h.view("search", {
                searchResults
            });
        }
    }
});

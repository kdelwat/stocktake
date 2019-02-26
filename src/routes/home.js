module.exports = server => ({
    method: "GET",
    path: "/",
    handler: {
        view: "index"
    }
});

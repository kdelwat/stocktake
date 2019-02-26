module.exports = server => {
    server.route({
        method: "GET",
        path: "/",
        handler: {
            view: "index"
        }
    });
};

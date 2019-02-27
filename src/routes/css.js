const Path = require("path");

module.exports = () => {
    return {
        method: "GET",
        path: "/css/{param}",
        handler: {
            directory: {
                path: Path.join(__dirname, "../static", "css")
            }
        }
    };
};

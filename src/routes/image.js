const Path = require("path");

module.exports = () => {
    return {
        method: "GET",
        path: "/image/{param}",
        handler: {
            directory: {
                path: Path.join(__dirname, "../static", "image")
            }
        }
    };
};

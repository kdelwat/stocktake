const Path = require("path");

module.exports = () => {
    return {
        method: "GET",
        path: "/site.webmanifest",
        handler: {
            file: {
                path: Path.join(__dirname, "../static", "site.webmanifest")
            }
        }
    };
};

"use strict";

const Hapi = require("hapi");
const Vision = require("vision");
const Inert = require("inert");
const Path = require("path");
const Nunjucks = require("nunjucks");

const services = {
    iex: new (require("./services/iex"))()
};

const methods = [
    require("./methods/getStockData")(services.iex),
    require("./methods/getCompanyData")(services.iex),
    require("./methods/getHistoricalData")(services.iex),
    require("./methods/getStockList")(services.iex),
    require("./methods/searchStocks")()
];

const routes = [
    require("./routes/fallback"),

    require("./routes/css"),
    require("./routes/image"),
    require("./routes/manifest"),
    require("./routes/home"),
    require("./routes/stock"),
    require("./routes/search")
];

const extensions = [
    {
        events: "onPreResponse",
        extension: require("./extensions/maskInternalErrors")
    }
];

const registerPlugins = async server => {
    // Vision for templating
    await server.register(Vision);

    // Initialise Nunjucks as the template engine
    server.views({
        engines: {
            html: {
                // Nunjucks setup from https://github.com/hapijs/vision README
                compile: (src, options) => {
                    const template = Nunjucks.compile(src, options.environment);

                    return context => template.render(context);
                },
                prepare: (options, next) => {
                    options.compileOptions.environment = Nunjucks.configure(
                        options.path,
                        {
                            watch: false
                        }
                    );

                    return next();
                }
            }
        },
        path: Path.join(__dirname, "templates"),
        context: require("./context")
    });

    // Inert for static file serving
    await server.register(Inert);
};

const start = async () => {
    const server = Hapi.server({
        host: "0.0.0.0",
        port: process.env.PORT || 3000,
        cache: [
            {
                name: "redisCache",
                provider: {
                    constructor: require("catbox-redis"),
                    options: {
                        partition: "cache",
                        url: process.env.REDIS_URL || "127.0.0.1"
                    }
                }
            }
        ]
    });

    await registerPlugins(server);

    methods.map(method => {
        server.method(method.name, method.method, method.options);
    });

    routes.map(route => server.route(route(server)));

    extensions.map(extension =>
        server.ext(extension.events, extension.extension)
    );

    try {
        await server.start();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }

    console.log("Server online at", server.info.uri);
};

start();

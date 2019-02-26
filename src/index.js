"use strict";

const Hapi = require("hapi");
const Vision = require("vision");
const Path = require("path");
const Nunjucks = require("nunjucks");

const services = {
    iex: new (require("./services/iex"))()
};

const methods = [require("./methods/getStockData")(services.iex)];

const routes = [require("./routes/home"), require("./routes/stock")];

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
};

const start = async () => {
    const server = Hapi.server({
        host: "localhost",
        port: 3000
    });

    await registerPlugins(server);

    methods.map(method => {
        server.method(method.name, method.method, {});
    });

    routes.map(route => server.route(route(server)));

    try {
        await server.start();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }

    console.log("Server online at", server.info.uri);
};

start();

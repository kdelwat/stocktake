"use strict";

const Hapi = require("hapi");
const Vision = require("vision");
const Path = require("path");
const Nunjucks = require("nunjucks");

const server = Hapi.server({
    host: "localhost",
    port: 3000
});

const context = {
    title: "Prices"
};

const start = async () => {
    await server.register(Vision);

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
        context
    });

    server.route({
        method: "GET",
        path: "/",
        handler: {
            view: "index"
        }
    });

    try {
        await server.start();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }

    console.log("Server online at", server.info.uri);
    console.log(__dirname);
};

start();

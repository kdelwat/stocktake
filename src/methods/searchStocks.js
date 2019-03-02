const fs = require("fs");
const path = require("path");

const Fuse = require("fuse.js");

module.exports = () => ({
    name: "searchStocks",
    method: async searchTerm => {
        try {
            const referenceFile = path.join(
                __dirname,
                "..",
                "..",
                "data",
                "symbols.json"
            );

            const availableStocks = JSON.parse(await readFile(referenceFile));

            const fuse = new Fuse(availableStocks, {
                keys: ["symbol", "name"],
                shouldSort: true,
                includeScore: true,
                threshold: 0.4
            });

            return fuse.search(searchTerm);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
});

// TODO: move to reference data service
async function readFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    });
}

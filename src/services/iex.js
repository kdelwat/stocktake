const fetch = require("node-fetch");

// function IexService() {
//     this.api = "https://api.iextrading.com/1.0";
//
//     this.get = endpoint => {
//         return fetch(endpoint).then(res => res.json());
//     };
//
//     this.getCompany = async symbol => {
//         return this.get(`${this.api}/stock/${symbol}/company`);
//     };
// }

// IexService.prototype.get = endpoint => {
//     return fetch(endpoint).then(res => res.json());
// };
//
// IexService.prototype.getCompany = async symbol => {
//     return this.get(`${this.api}/stock/${symbol}/company`);
// };

class IexService {
    constructor() {
        this.api = "https://api.iextrading.com/1.0";
    }

    static get(endpoint) {
        return fetch(endpoint).then(res => res.json());
    }

    async getCompany(symbol) {
        return IexService.get(`${this.api}/stock/${symbol}/company`);
    }
}

module.exports = IexService;

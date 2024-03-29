const fetch = require("node-fetch");

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

    async getHistoricalPriceData(symbol, timeframe) {
        if (!timeframe) {
            return IexService.get(`${this.api}/stock/${symbol}/chart`);
        } else {
            return IexService.get(
                `${this.api}/stock/${symbol}/chart/${timeframe}`
            );
        }
    }

    async getQuote(symbol) {
        return IexService.get(`${this.api}/stock/${symbol}/quote`);
    }

    async getList(type) {
        return IexService.get(`${this.api}/stock/market/list/${type}`);
    }
}

module.exports = IexService;

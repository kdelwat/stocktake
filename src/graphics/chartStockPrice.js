const generateChart = require("node-chartist");

module.exports = async historicalData => {
    const options = {
        width: 500,
        height: 200,
        chartPadding: {
            right: 40
        }
    };

    const labels = historicalData.map((h, i) => (i % 5 === 0 ? h.label : ""));

    const data = {
        labels: labels,
        series: [historicalData.map(h => h.high)]
    };

    return generateChart("line", options, data);
};

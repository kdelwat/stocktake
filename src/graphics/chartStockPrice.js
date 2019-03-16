const generateChart = require("node-chartist");

const NUMBER_OF_LABELS = 10;

module.exports = async (historicalData, width, height) => {
    const options = {
        width: width,
        height: height,
        chartPadding: {
            right: 40
        },
        lineSmooth: false,
        fullWidth: true
    };

    if (historicalData.length > 50) {
        const CHOOSE_EVERY = Math.floor(historicalData.length / 50);
        historicalData = historicalData.filter(
            (h, i) => i % CHOOSE_EVERY === 0
        );
    }

    const chooseEveryNthLabel = Math.floor(
        historicalData.length / NUMBER_OF_LABELS
    );

    const labels = historicalData.map((h, i) =>
        i % chooseEveryNthLabel === 0 ? h.label : ""
    );

    const data = {
        labels: labels,
        series: [historicalData.map(h => h.high)]
    };

    return generateChart("line", options, data);
};

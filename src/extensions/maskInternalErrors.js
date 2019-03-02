module.exports = (request, h) => {
    if (!request.response.isBoom) {
        return h.continue;
    }

    const { message, output } = request.response;

    console.log("ERROR", message);

    return h.view("error", { error: output }).code(output.statusCode);
};

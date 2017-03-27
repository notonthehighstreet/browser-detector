const opn = require('opn');
const server = require('noths-liken').reviewServer;

const config = {
    baselineImageDirectory: `${__dirname}/regression/screenshots/base`,
    newImageDirectory: `${__dirname}/regression/screenshots/new`,
    resemblejsThreshold: 0.05,
    port: 9000,
};

server(config).listen(config.port, () => {
    console.log(`Review app running on http://localhost:${config.port}`); // eslint-disable-line no-console
    opn(`http://localhost:${config.port}`);
});
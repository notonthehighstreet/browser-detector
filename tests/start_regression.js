#!/usr/bin/env node
const liken = require('noths-liken');
const bwsDetectorServer = require('./config/bwsDetectorServer/index')

// setup through CLI argument.
// or just delete as required.
const sauceLabs = process.argv.find(arg => arg.replace(/--/g, '').split('=')[0] === 'saucelabs');
const testingServiceName = sauceLabs ? 'sauceLabs' : 'browserStack';
const testingService = liken.testingService[testingServiceName];
const target = process.argv.find(arg => arg.replace(/--/g, '').split('=')[0] === 'target') || '';
const isLocalTesting = (!target || (target && target.indexOf('localhost') > -1));

const hardExit = (exitCode = 1) => {
    return process.exit(exitCode);
};

const startAppServer = () => new Promise((resolve) => {
    const SERVER_PORT = 8080;
    bwsDetectorServer.listen(SERVER_PORT, resolve);
    console.log('Browser Detector server listening at http://localhost:' + SERVER_PORT );
});

const stopAppServer = () => new Promise((resolve) => {
    console.log('Browser Detector shuting down...');
    bwsDetectorServer.close(resolve);
    console.log('Browser Detector shutdown...');
});

const setup = () => {
    return (!isLocalTesting)
        ? Promise.resolve()
        : testingService.connect()
        .then(startAppServer)
        .catch(e => testingService.disconnect().then(() => console.log(e))) // eslint-disable-line
};

const tearDown = () => {
    return (!isLocalTesting)
        ? Promise.resolve()
        : testingService.disconnect()
        .then(stopAppServer)
        .catch(e => console.log(e)) // eslint-disable-line
};

liken
    .startRegression({ setup, tearDown })
    .then(() => hardExit(0))
    .catch(hardExit);

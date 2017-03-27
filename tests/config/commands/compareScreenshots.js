/*
 * File Purpose: To configure screen-shots saved location and how accurately they should be compared
 *
 * Adjust the `imagesRoot` as appropriate.
 * */

const liken = require('noths-liken');
const argv = require('yargs').argv;

module.exports = liken.nightwatch({
  getDevicePixelRatio: () => window.devicePixelRatio,
  imagesRoot: './tests/regression/screenshots',
  saveDir: argv.saveDir || '',
  compareDir: argv.compareDir || '',
  misMatchPercentage: 0.05,
});

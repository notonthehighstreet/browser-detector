/* eslint-disable */

const argv = require('yargs')
  .usage('Usage: $0 --target=[string]')
  .argv;

const sauceLabs = argv.saucelabs;
const TARGET_PATH = argv.target || `http://localhost:8080`;

module.exports = (function (settings) {
  settings.test_settings.default.globals = { TARGET_PATH };
  if (sauceLabs) {
    if (process.env.SELENIUM_HOST) { settings.selenium.host = process.env.SELENIUM_HOST; }
    if (process.env.SELENIUM_PORT) { settings.selenium.port = process.env.SELENIUM_PORT; }
    settings.test_settings.default.launch_url = "http://localhost:8080";
    settings.test_settings.default.selenium_host = "ondemand.saucelabs.com";
    settings.test_settings.default.username =  "${SAUCE_USERNAME}";
    settings.test_settings.default.access_key = "${SAUCE_ACCESS_KEY}";
  }
  return settings;
})(require('./nightwatch.json'));

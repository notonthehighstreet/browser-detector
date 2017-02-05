var assert = require('assert');
var pattern = require('../src/config').pattern;
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();

var document = mock.getDocument();
var window = MockBrowser.createWindow();

global.window = window;
global.document = document;

var detection = require('../src/index');

describe('detector', function () {
    var notOutdated = {
        navigator: {
            language: 'en',
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
        }
    };
    var outdated = {
        navigator: {
            language: 'en',
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.2883.95"
        }
    };

    var ie = {
        navigator: {
            language: 'en',
            userAgent: "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
        }
    };

    describe('browser not outdated', function () {
        it('should return null when browser is not outdated', function () {
            var result = detection.bdetector.detection(notOutdated);
            assert.equal(null, result);
        });
    });

    describe('getting browser and version of user agent', function () {
        it('should return the browser and the version', function () {
            var expected = {browser: 'c', version: 32};
            var actual = detection.detection.detectBrowser(pattern, outdated.navigator.userAgent);
            assert.deepEqual(expected, actual);
        })
    });

    describe('transform version if browser is of a specific type', function () {
        it('should return the version transformed', function () {
            var det = detection.detection.detectBrowser(pattern, ie.navigator.userAgent);
            var transform = detection.detection.transformVersion(det.browser, det.version);
            var expected = {browser: 'i', version: 9};

            assert.deepEqual(expected, transform);
        });
    });

    describe('compare passed configurations with default', function () {
        it('should return the passed configurations plus the browsers missing on it from the defaults', function () {
            var configuration = {i: 6, c: 60};
            var defaults = require('../src/config').bvdefault;
            detection.detection.compareDefaults(configuration, defaults);
            var expected = {i: 6, c: 60, f: 40, o: 20, s: 8, n: 12, m: 4};

            assert.deepEqual(expected, configuration);
        });
    });

    describe('see if browser is outdated or not', function () {
        it('should return true if browser is outdated', function () {
            var det = detection.detection.detectBrowser(pattern, outdated.navigator.userAgent);
            var names = require('../src/config').names;
            var browserInfo = {browser: det.browser, version: det.version, name: names[det.browser] + " " + det.version};
            var configuration = {i: 6, c: 50};
            var actual = detection.detection.outdatedBrowser(browserInfo, configuration);
            assert.equal(true, actual);
        });
    });

    describe('see on session storage if notification was already closed', function () {
        it('should return false if notification was not closed', function () {
            var actual = detection.detection.isOnSessionStorage();
            assert.equal(false, actual);
            window.sessionStorage.setItem('outdated-browser', true);
        });
    });

    describe('see on session storage if notification was already closed', function () {
        it('should return true if notification was closed', function () {
            var actual = detection.detection.isOnSessionStorage();
            assert.equal(true, actual);
            window.sessionStorage.setItem('outdated-browser', false);
        });
    });

    describe('browser outdated', function () {
        it('should return html when browser is outdated', function () {
            var expected = "<div class=\"detection-overlay\" id=\"detection-overlay\"></div><div class=\"detection-alert\"" +
                " id=\"detection-alert\"><div id=\"detection-div\"><div class=\"detection-alert__main\">" +
                "<img class=\"detection-alert__image\" src=\"[object Object]\"><h2 class=\"detection-alert__title\">" +
                "Unsupported browser version: Chrome 32</h2></div><p class=\"detection-alert__text\">" +
                "The page you're trying to view isn't optimised for the browser version you're using. It's possible that you will experience some problems with the layout and potentially some errors." +
                "</p><div><button class=\"detection-alert__button\" onclick=\"{" +
                "window.sessionStorage &amp;&amp; window.sessionStorage.setItem('outdated-browser', true);" +
                "document.body.removeChild(document.getElementById('detection-alert'));" +
                "document.body.removeChild(document.getElementById('detection-overlay'));}\">OK</button></div></div></div>";

            detection.bdetector.detection(outdated);
            assert.equal(expected, document.body.innerHTML);
        });
    });
});

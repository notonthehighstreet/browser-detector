require('./styles.scss');
var image = require("./warning.png");
var names = require("./config").names;
var pattern = require("./config").pattern;
var bvdefault = require("./config").bvdefault;
var browserName;

(function (window) {
  var detector = function (information) {
    if (!information) information = {};
    var nav = information.navigator || navigator;
    var ua = nav.userAgent;

    var detect = detectBrowser(pattern, ua);
    var browser = detect.browser;
    var version = detect.version;

    if (!browser || !version) return { browser: "x", version: 0, name: names[browser] };

    if (browser === "so" || browser === "io") {
      var transformation = transformVersion(browser, version);
      browser = transformation.browser;
      version = transformation.version;
    }

    information.language = information.language || (nav.languages ? nav.languages[0] : null) || nav.language || nav.browserLanguage || nav.userLanguage;

    var vs = information.vs || bvdefault;
    compareDefaults(vs, bvdefault);

    var browserInfo = { browser: browser, version: version, name: names[browser] + " " + version };
    if (outdatedBrowser(browserInfo, vs) && !isOnSessionStorage()) show(browserInfo);
  };

  var bdetector = {
    'detection': detector
  };

  var detection = {
    'detectBrowser': detectBrowser,
    'transformVersion': transformVersion,
    'compareDefaults': compareDefaults,
    'outdatedBrowser': outdatedBrowser,
    'isOnSessionStorage': isOnSessionStorage,
    'show': show
  };

  window.detector = bdetector;

  if (typeof module === 'object' && module.exports) {
    module.exports = { bdetector: bdetector, detection: detection };
  }

}(typeof window !== "undefined" ? window : this, document));

function detectBrowser(pattern, ua) {
  for (var i = 0; i < pattern.length; i++) {
    if (ua.match(new RegExp(pattern[i][0].replace("VV", "(\\d+\\.?\\d?)")), "i")) {
      var browser = pattern[i][1];
      break;
    }
  }
  return { browser: browser, version: parseFloat(RegExp.$1) };
}

function transformVersion(browser, version) {
  if (browser === "so") {
    version = 4.0;
    browser = "s";
  }
  if (browser === "io") {
    browser = "i";
    if (version > 6) version = 11;
    else if (version > 5) version = 10;
    else if (version > 4) version = 9;
    else if (version > 3.1) version = 8;
    else if (version > 3) version = 7;
    else version = 9;
  }
  return { browser: browser, version: version };
}

function compareDefaults(vs, bvdefault) {
  for (var brow in bvdefault) {
    if (bvdefault.hasOwnProperty(brow) && !vs[brow]) {
      vs[brow] = bvdefault[brow];
    }
  }
}

function outdatedBrowser(browserInfo, vs) {
  return !(!browserInfo || !browserInfo.browser || browserInfo.browser === "x"
  || browserInfo.version > vs[browserInfo.browser]);
}

function isOnSessionStorage() {
  return (!!window.sessionStorage && !!window.sessionStorage.getItem('outdated-browser'));
}

function show(browserInfo) {
  var html = ["<div class='detection-alert__main'>"];
  html.push("<img class='detection-alert__image' src='" + image + "' />");
  html.push("<h2 class='detection-alert__title'>Unsupported browser version: browserName</h2></div>");
  html.push("<p class='detection-alert__text'>The page you're trying to view isn't optimised for the browser ");
  html.push("version you're using. It's possible that you will experience some problems with the layout and ");
  html.push("potentially some errors.</p>");
  html.push("<div><button class='detection-alert__button' onclick=\"\{window.sessionStorage && ");
  html.push("window.sessionStorage.setItem('outdated-browser', true);");
  html.push("document.body.removeChild(document.getElementById('detection-alert'));");
  html.push("document.body.removeChild(document.getElementById('detection-overlay'));}\">OK</button></div>");

  html = html.join('');
  var div = document.createElement('div');
  div.className = 'detection-alert';
  div.id = 'detection-alert';
  var div_overlay = document.createElement('div');
  div_overlay.className = 'detection-overlay';
  div_overlay.id = 'detection-overlay';

  html = html.replace("browserName", browserInfo.name);
  div.innerHTML = "<div id='detection-div'>" + html + "</div>";
  document.body.insertBefore(div, document.body.firstChild);
  document.body.insertBefore(div_overlay, document.body.firstChild);
}
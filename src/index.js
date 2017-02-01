require('./styles.scss');
var image = require("./warning.png");

;(function (window, document) {
    var dd = function (information) {
        var vsdefault = {i: 9, f: 10, o: 20, s: 11, n: 12, c: 50, a: 534};
        var nav = navigator;
        var ua = navigator.userAgent;
        var names = {i: 'Internet Explorer', e: "Edge", f: 'Firefox', o: 'Opera', s: 'Safari', n: 'Netscape', c: "Chrome", x: "Other"};

        var pattern = [ ["Trident.*rv:VV", "i"], ["Trident.VV", "io"], ["MSIE.VV", "i"], ["Edge.VV", "e"], ["OPR.VV", "o"], ["Chrome.VV", "c"],
            ["Firefox.VV", "f"], ["Version.VV.{0,10}Safari", "s"], ["Safari.VV", "so"], ["Opera.*Version.VV", "o"], ["Opera.VV", "o"]];

        for (var i = 0; i < pattern.length; i++) {
            if (ua.match(new RegExp(pattern[i][0].replace("VV", "(\\d+\\.?\\d?)")), "i")) {
                var browser = pattern[i][1];
                break;
            }
        }
        var version = parseFloat(RegExp.$1);
        if (!version) return {browser:"x", version:0, t:names[n]};
        if (browser == "so") {
            version = 4.0;
            browser = "s";
        }
        if (browser == "io") {
            browser = "i";
            if (version > 6) version = 11;
                else if (version > 5) version = 10;
                else if (version > 4) version = 9;
                else if (version > 3.1) version = 8;
                else if (version > 3) version = 7;
                else version = 9;
        }

        information.language = information.language || (nav.languages ? nav.languages[0] : null) || nav.language || nav.browserLanguage || nav.userLanguage;

        var vs = information.vs || vsdefault;
        for (var brow in vsdefault) {
            if (!vs[brow])
                vs[brow] = vsdefault[brow];
        }

        var browserInfo = {browser: browser, version: version, name: names[browser] + " " + version};
        if (!browserInfo || !browserInfo.browser || browserInfo.browser == "x" || (window.sessionStorage && window.sessionStorage.getItem('outdated-browser'))
            || browserInfo.version > vs[browserInfo.browser]) {
            return;
        }

        show(information, browserInfo);
    };

    var show = function show(information, browserInfo) {
        var t = {};
        t.en = "<div class='detection-alert__main'><img class='detection-alert__image' src='" + image + "' /><h2 class='detection-alert__title'>Unsupported browser version: {brow_name}</h2></div>" +
                "<p class='detection-alert__text'>The page you're trying to view isn't optimised for the browser version you're using. It's possible that you will experience some problems with the layout and potentially some errors.</p>" +
                "<div><button class='detection-alert__button' onclick=\"{" +
            "window.sessionStorage && window.sessionStorage.setItem('outdated-browser', true);" +
            "document.body.removeChild(document.getElementById('detection-alert'));" +
            "document.body.removeChild(document.getElementById('detection-overlay'));}\">OK</button></div>";
        t = t.en;

        var div = document.createElement("div");
        div.className = "detection-alert";
        div.id = "detection-alert";

        var div_overlay = document.createElement("div");
        div_overlay.className = "detection-overlay";
        div_overlay.id = "detection-overlay";

        t = t.replace("{brow_name}", browserInfo.name);

        div.innerHTML = '<div id="detection-div">' + t + '</div>';
        document.body.insertBefore(div, document.body.firstChild);
        document.body.insertBefore(div_overlay, document.body.firstChild);
    };

    var bdetector = {
        'detector': dd
    };

    window.bdetector = bdetector;

    if (typeof module == 'object' && module.exports) {
        module.exports = bdetector;
    }

}(typeof window !== "undefined" ? window : this, document));
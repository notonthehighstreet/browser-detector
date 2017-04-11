var config = require("./config");
var register = null;

(function (window, document) {
    var id = config.GTM_ID;
    var dataLayerName = 'browserDetectorDataLayer';

    (function (w, d, s, l, i) {
        if (d.getElementsByTagName(s).length === 0) {
            return;
        }

        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', dataLayerName, id);

    register = window[dataLayerName];

}(typeof window !== "undefined" ? window : this, document));


/**
 * Register event on GTM
 * @param dataObject: Object object to be sent for GTM
 */
function registerEvent(dataObject) {
    register && register.push(dataObject);
}

module.exports.registerEvent = registerEvent;

/**
 * Register event Show message
 * @param project:string project where the message is show
 * @param label:string Client system operating with the Version version browser.
 */
module.exports.registerShow = function (project, label) {
    registerEvent({
        event: "PopupShow",
        project: project,
        label: label
    });
};
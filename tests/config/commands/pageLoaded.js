const util = require('util');
const events = require('events');

let browser;

function pageLoaded() {
  events.EventEmitter.call(this);
  browser = this.api;
}
util.inherits(pageLoaded, events.EventEmitter);

pageLoaded.prototype.complete = function complete({ e, done }) {
  if (e) {
    console.log('e', e); // eslint-disable-line no-console
  }
  this.emit('complete');
  if (typeof done === 'function') {
    done();
  }
};

pageLoaded.prototype.command = function pageLoadedFn(page, opts = {}) {
  const { selector, disableAnimations, done } = opts;
  const url = browser.globals.TARGET_PATH + (page || '');
  const args = [disableAnimations ? 'disable-animations' : ''];
  function disableAnimationFunction(className) {
    document.body.className += ` ${className}`;
    return document.body.className;
  }

  browser
    .windowMaximize()
    .url(url)
    .waitForElementVisible(selector || 'body', 10000)
    .execute(disableAnimationFunction, args, () => {
      this.complete({ done });
    });

  return this;
};

module.exports = pageLoaded;

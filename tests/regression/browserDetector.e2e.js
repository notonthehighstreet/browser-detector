module.exports = {
    before(browser) {
        browser.pageLoaded('/');
    },
    after(browser, done) {
        browser
            .end().perform(() => done());
    },
    'browser detector renders': (browser, done) => {
        browser.compareScreenshots({
            selector: '.detection-alert',
            state: 'default',
            adjust: {width: 5, height: 5},
            done
        });
    },
};

const hook = require('node-hook').hook;
const MockBrowser = require('mock-browser').mocks.MockBrowser;

hook('.scss', () => {});
hook('.png', (source, fileName) => {});
hook('.svg', (source) => `module.exports = "${source.replace(/"/g, "'").replace(/(?:\r\n|\r|\n)/g, '')}"`);

const mock = new MockBrowser();

const document = mock.getDocument();
const window = MockBrowser.createWindow();

global.window = window;
global.document = document;

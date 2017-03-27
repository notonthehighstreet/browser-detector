// requires
const path = require('path');
const express = require('express');

// Create Express Server
const app = express();
const server = require('http').createServer(app);

app.use('/', express.static(__dirname));

app.get('/detector.min.js', (req, res) => {
    const detectorJs = path.resolve(__dirname, '../../../dist/detector.min.js');
    res.sendFile(detectorJs);
});

if (!module.parent) {
    const SERVER_PORT = 8080;
    server.listen(SERVER_PORT, (err) => console.info('Listening on ' + SERVER_PORT));
}

module.exports = server;
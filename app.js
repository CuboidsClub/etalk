(function () {
    const express = require('express');
    const app = express();
    const port = 4000;
    const bodyParser = require('body-parser');

    app.use("/", express.static(__dirname + '/static'));
    app.use("/images", express.static(__dirname + '/static/images'));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/static/index.html');
    });

    app.get('/images', (req, res) => {
        res.sen(__dirname + "/static/images");
    })

    app.get('/player', (req, res) => {
        res.sendFile(__dirname + '/static/player.html');
    });

    app.listen(port, () => {
        console.log('Server started on port : ' + port);
    });

    module.exports = app;
}());
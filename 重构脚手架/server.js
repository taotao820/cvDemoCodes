var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var app = express();
var compiler = webpack(config);

app.use(express.static(__dirname));
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
// app.use(require('webpack-hot-middleware')(compiler));

app.listen(8888, 'localhost', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:8888');
});

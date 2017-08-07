// var webpack = require('webpack');
// var config = require('./webpack.config.ie8.js');
// const WebpackDevServer = require('webpack-dev-server')

// const PORT = process.env.PORT || 8088

// new WebpackDevServer(webpack(config), {
//     publicPath: config.output.publicPath,
//     hot: true,
//     historyApiFallback: true,
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: 1000
//     }
// }).listen(PORT, '0.0.0.0', (err, result) => {

//     if (err) {
//         return console.log(err)
//     }

//     console.log(`server listen on http://localhost:${PORT}/`)

// })
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.ie8.js');
var app = express();
var compiler = webpack(config);

app.use(express.static(__dirname));
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(8088, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:8088');
});

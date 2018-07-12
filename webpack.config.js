var webpack = require('webpack');
module.exports = {
    context: __dirname + '/public',
    entry: {
        app: ['./scripts/myPrototype.js','./scripts/angular-node.js'],
        vendor: ['angular']
    },
    output: {
        path: __dirname + '/bild',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};
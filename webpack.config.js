const glob = require('glob');
const path = require('path');

function getEntries(pattern) {
    const entries = {};
    glob.sync(pattern).forEach((file) => {
        const outputFileKey = file.replace('./src/main/resources/static/js/', '');
        entries[outputFileKey] = path.join(__dirname, file);
    });
    return entries;
}

module.exports = {
    mode: 'development',
    entry: getEntries('./src/main/resources/static/**/*.js'),
    output: {
        path: path.resolve(__dirname, './src/main/resources/static/dist'),
        filename: '[name]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};
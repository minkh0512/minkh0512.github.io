const path = require('path');

module.export = {
    mode: 'developent',
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('.dist'),
        filename: '[name].js'
    }
}
const path = require('path')

module.exports.regiterRoute = (app, express) => {
    app.use(
        '/files',
        express.static(path.resolve(__dirname, 'assets'))
    );
}
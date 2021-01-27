const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

module.exports.setup = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('\x1b[33m%s\x1b[0m', '==> Documentation URL: ' + process.env.APP_URL + '/docs');
}
const path = require('path')

require("dotenv").config({
    path: path.join(__dirname, "./.env")
});

const plugins = require('./libs/plugins');
const cors = require('./libs/cors');
const swagger = require('./libs/swagger');
const router = require('./libs/router');
const staticContent = require('./libs/StaticContent');
const express = require('express');
const app = express();

plugins.register(app, process.env.JWT_SECRET);
cors.applyHeaderFix(app);
staticContent.regiterRoute(app, express)
swagger.setup(app);

router
	.setUpRoutes()
	.forEach(route => {
        app.use("/api", route);
    });

//process.env.PORT || 4000 
const portSettings = process.env.PORT || 4000
app.listen(portSettings, () => console.log(`Server is Running on port ${portSettings}.`));
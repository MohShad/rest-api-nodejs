
module.exports.applyHeaderFix = (app) => {
    //** CODE ADDED JUST TO PREVENT CORS ERROR, PLEASE CHANGE IT TO ACCEPT DOMAIN CORS */
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Expose-Headers", "*");
        next();});
}
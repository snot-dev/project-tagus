const fs = require('fs');

module.exports = app => {
    const router = require('express').Router();
    const viewPaths = app.settings.views;
    const viewEngine = app.settings['view engine'];
    const templates = [];
    
    router.get('/', (req, res) => {
        for(const path of viewPaths) {
            const files = fs.readdirSync(path);

            for(const file of files) {
                if( file.split('.').pop() === viewEngine) {
                    const fileName = file.split('.').shift();
                    templates.push({"label":fileName, "value": fileName});
                }
            }
        }
        
        res.json(templates);
    });

    return router;
}



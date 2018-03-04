const fs = require('fs');

module.exports = app => {
    const router = require('express').Router();
    const media = app.settings.media;
    
    router.get('/', (req, res) => {
        res.json({list: _getAllFromFolder(media.path, media.dir)});
    });

    return router;
}

function _getAllFromFolder(path, dir, currentFiles = []) {
    const files = fs.readdirSync(path);

    for(const file of files) {
        const newPath = `${path}/${file}`;
        const newDir = `${dir}/${file}`;

        if (fs.statSync(newPath).isDirectory()) {
            _getAllFromFolder(newPath, newDir, currentFiles);
        }
        else {
            const mediaTypes = ['jpeg', 'jpg', 'gif', 'png'];
            const fileFormat = file.split('.').pop();

            if (mediaTypes.includes(fileFormat)){
                currentFiles.push( {src: newDir, name: file.split('.').shift()});
            }
        }
    }

    return currentFiles;
}


const fs = require('fs');
const multer = require('multer');



module.exports = app => {
    const router = require('express').Router();
    const media = app.settings.media;
    
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, media.path)
        },
        filename: function (req, file, cb) {
            cb(null,  `${Date.now()}-${file.originalname}`)
        }
    });

    const upload = multer({
        storage: storage
    });

    router.get('/', (req, res) => {
        res.json({list: _getAllFromFolder(media.path, media.dir)});
    });

    router.post('/', upload.single('media'), (req, res) => {
        res.json({
            success: true
        });
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


const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        console.log('file', file);
        //cb(null, 'storage')
        filename = file.fieldname;
        const filepath = filename.split("_")
        const dirpath = filepath[0] + '/' + filepath[1]
        //const dir = path.join(__dirname, '../../uploads/' + dirpath);
        const dir = path.join(__dirname, '../../src/uploads/' + dirpath);
        console.log("__dirname",__dirname)
        console.log('dirdir', dir);
        fs.exists(dir, exist => {
            if (!exist) { return fs.mkdir(dir, { recursive: true }, error => cb(error, dir)) }
            return cb(null, dir)
        })
        //} 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + uniqid() + path.extname(file.originalname))
    }
});

// Multer file filter configuration
const fileFilter = (req, file, cb) => {
    console.log('file', file);
    // Check file types and reject unwanted files
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false);
    }
};

// Multer instance with global configurations
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB file size limit
    },
});

// module.exports = upload;

function filedetails(name, file) {
    filename = file?.filename;
    const filepath = name.split("_");
    const dirpath = filepath[0] + '/' + filepath[1] + '/';
    datalist = { "path": dirpath, "filename": filename, "filepath": dirpath + '' + filename, "filsesize": file?.size }
    return datalist;
}

module.exports = { upload, filedetails };

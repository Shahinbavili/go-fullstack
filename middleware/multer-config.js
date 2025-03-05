const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname
            .toLowerCase()
            .replace(/\s+/g, '_') // Remplace les espaces par des underscores
            .replace(/[^a-z0-9-_]/g, '');
        const extension = MIME_TYPES[file.mimetype] || 'jpg'; // Défaut : jpg si non reconnu
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024}, // Limite à 5MB
    fileFilter: (req, file, callback) => {
        if (!MIME_TYPES[file.mimetype]) {
            return callback(new Error('Format de fichier non autorisé'), false);
        }
        callback(null, true);
    }
});

module.exports = upload.single('image');
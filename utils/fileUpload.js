// const multer = require("multer")

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads")
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname) // 23/08/2022
//   },
// })

// function fileFilter(req, file, cb) {
//   if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }

// const upload = multer({ storage, fileFilter })

// module.exports = { upload }

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fs = require('fs');

// ✅ CLOUDINARY CONFIGURATION (Auto from CLOUDINARY_URL)
cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
});

// ✅ CLOUDINARY STORAGE
const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png', // Change format if needed
        public_id: (req, file) =>
            Date.now() + '-' + file.originalname.replace(/\s+/g, '-'),
    },
});

// ✅ LOCAL STORAGE CONFIGURATION
const localStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads';

        // Ensure the folder exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') +
                '-' +
                file.originalname
        );
    },
});

// ✅ FILE FILTER (Allow only images)
function fileFilter(req, file, cb) {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
}

// ✅ DYNAMIC STORAGE SELECTION
const useCloudStorage = process.env.USE_CLOUD_STORAGE === 'true';
const storage = useCloudStorage ? cloudStorage : localStorage;
const upload = multer({ storage, fileFilter });

module.exports = { upload };

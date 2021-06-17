const cloudinary = require('cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'hola-spain',
  allowedFormats: ['jpg', 'png', 'pdf']
});

const parser = multer({ storage: storage });

module.exports = parser;
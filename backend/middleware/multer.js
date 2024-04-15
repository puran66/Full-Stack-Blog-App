const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNAME, 
  api_key: process.env.CLLOUDKEY, 
  api_secret: process.env.CLOUDSECRET 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
    allowed_formats: ['jpg', 'png'],
  }
})

const upload = multer({storage});

module.exports = upload;
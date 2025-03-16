const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder to save images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate a unique filename with timestamp and random number
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append unique identifier to the original file extension
  }
});

// Initialize multer with storage engine and file filter
const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const mimeTypes = /jpeg|jpg|png|gif/;
    const extname = mimeTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimeTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

module.exports = upload;
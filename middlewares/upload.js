const multer = require('multer');
const path = require('path');

const tempDir = path.resolve('temp');
const avatarsDir = path.resolve('public/avatars');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
    return;
  }
  cb(null, false);
};

const limits = {
  fileSize: 1024 * 1024,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = {
  upload,
  avatarsDir,
};

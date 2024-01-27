const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
	destination: tempDir,
	filename: (req, file, cb) => {
		const fileName = `${Date.now()}-${file.originalname}`;
		cb(null, fileName);
	},
});

const upload = multer({
	storage: multerConfig,
});

module.exports = upload;
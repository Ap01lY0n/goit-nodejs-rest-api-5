const path = require('path');
const admin = require('firebase-admin');
const fs = require('fs').promises;
const Jimp = require('jimp');

const { User } = require('../../models');
const { HttpError } = require('../../utils');

const {
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL,
  UNIVERSE_DOMAIN,
} = process.env;

const serviceAccount = {
  type: TYPE,
  project_id: PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: CLIENT_EMAIL,
  client_id: CLIENT_ID,
  auth_uri: AUTH_URI,
  token_uri: TOKEN_URI,
  auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: CLIENT_X509_CERT_URL,
  universe_domain: UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'node-hw4-edfa3.appspot.com',
});

const storage = admin.storage();
const bucket = storage.bucket();

const changeAvatar = async ({ user, file }, res, next) => {
  try {
    const { _id } = user;

    if (!file) {
      throw HttpError(406, 'Error loading avatar');
    }

    const { path: tempUpload, originalname } = file;
    const filename = `${_id}_${originalname}`;

    const avatar = await Jimp.read(tempUpload);
    await avatar.cover(250, 250).quality(60);
    await avatar.writeAsync(tempUpload);

    const firebaseFile = bucket.file(filename);
    const fileContent = await fs.readFile(tempUpload);
    await firebaseFile.save(fileContent, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const uniqueFilename = `${user._id}_${Date.now()}${path.extname(originalname)}`;

    const avatarURL = `/avatars/${uniqueFilename}`;

    await User.findByIdAndUpdate(_id, { avatarURL });
    await fs.unlink(tempUpload);

    res.json({
      avatarURL,
    });
  } catch (error) {
    console.error('Error in changeAvatar:', error);
    next(HttpError(500, 'Internal Server Error'));
  }
};

module.exports = changeAvatar;

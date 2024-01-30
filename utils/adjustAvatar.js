const Jimp = require('jimp');

const adjustingAvatar = async (path) => {
  try {
    if (!path) {
      throw new Error('Path is undefined');
    }

    const image = await Jimp.read(path);
    
    if (!image) {
      throw new Error('Error reading image');
    }

    await image.resize(250, 250).writeAsync(path);
  } catch (error) {
    throw new Error(`Error in adjustingAvatar: ${error.message}`);
  }
};

module.exports = { adjustingAvatar };

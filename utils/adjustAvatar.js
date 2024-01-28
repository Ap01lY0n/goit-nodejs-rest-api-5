const { Jimp } = require('jimp');

const adjustingAvatar = async path => {
  if (path === undefined) return;
  const image = await Jimp.read(path);
  return await image.resize(250, 250).writeAsync(path);
};

module.exports = adjustingAvatar;

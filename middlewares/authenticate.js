const jwt = require('jsonwebtoken');
const HttpError = require('../utils');
const { User } = require('../models');

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
  
    const [bearer, token] = authorization.split(' ');
  
    if (bearer !== 'Bearer') next(HttpError(401));
  
    const authorizationHeader = req.get('Authorization');
  
    if (!authorizationHeader) {
        return next(HttpError(401, 'Not authorized'));
    }
  
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
  
      if (!user || !user.token || user.token !== token) {
          return next(HttpError(401, 'Not authorized'));
      }
  
      req.user = user;
  
      next();
  } catch (error) {
      return next(HttpError(401, 'Not authorized'));
  }
};

module.exports = authenticate;
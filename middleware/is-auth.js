import jwt from 'jsonwebtoken';
import config from '../config.js'

export default (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const error = new Error('Not authenticated.');
      throw error;
    }
    const token = authHeader;
    let decodedToken;
    decodedToken = jwt.verify(token, config.secret);
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  }
  catch (e) {
    e.statusCode = 401;
    next(e);
  }

};

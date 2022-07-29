import jwt from 'jsonwebtoken';
import { errorsToken } from '../helpers/errorsToken.js';

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error('No token');
    // verificamos el refreshToken
    // uid es el id del usuario que viene en el payload
    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    //devolvemos el uid en el request y luego pasamos al sgte
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: errorsToken(error.message) });
  }
};

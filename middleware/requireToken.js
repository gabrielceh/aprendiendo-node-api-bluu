import jwt from 'jsonwebtoken';
import { errorsToken } from '../helpers/errorsToken.js';

export const requireToken = (req, res, next) => {
  try {
    // console.log(req.headers);
    let token = req.headers?.authorization;
    // console.log(token);
    if (!token) throw new Error('No token');

    // verificamos el token
    token = token.split(' ')[1]; // recortamos el Bearer y nos quedamos solo con el token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);

    //enviamos el uid al req para que cualquier ruta que ocupe el middleware tenga acceso a esa informacion
    // udi es personalizado
    req.uid = payload.uid;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ error: errorsToken(error.message) });
  }
};

// export const requireToken = (req, res, next) => {
//   try {
//     // console.log(req.cookie);
//     // .token es el nombre de la cookie que se le colocó en el controller
//     let token = req.cookies?.token;
//     // console.log(token);
//     if (!token) throw new Error('No token');

//     // verificamos el token
//     // token = token.split(' ')[1]; // recortamos el Bearer y nos quedamos solo con el token
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(payload);

//     //enviamos el uid al req para que cualquier ruta que ocupe el middleware tenga acceso a esa informacion
//     // udi es personalizado
//     req.uid = payload.uid;
//     next();
//   } catch (error) {
//     // console.log(error);
//     return res.status(401).json({ error: errorsToken(error.message) });
//   }
// };
